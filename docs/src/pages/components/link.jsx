import React from "react";
import { Link, ButtonLink, Notice, Text, Flex, Spin, Tooltip } from "@ec21rnc/ui";
import FileExportM from "@semcore/icon/FileExport/m";
import ArrowRightM from "@semcore/icon/ArrowRight/m";
import ArrowRightL from "@semcore/icon/ArrowRight/l";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code, Swatch } from "../../kit.jsx";

export const meta = { title: "Link" };

export default function LinkPage() {
  return (
    <Page meta={meta} lead="다른 화면이나 다른 사이트로 옮겨 가는 글자입니다. 화면에서 가장 조용한 누름 요소입니다. 무언가를 실행할 때는 Button이나 ButtonLink를 씁니다.">
      <Section title="구성">
        <Demo>
          <Link href="#link">거래처 목록</Link>
          <Link href="#link" addonLeft={FileExportM}>문서 내려받기</Link>
          <Link href="#link">
            <Link.Text>승인 내역 보기</Link.Text>
            <Link.Addon><ArrowRightM /></Link.Addon>
          </Link>
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>Link</Code>, <>링크 전체입니다. <Code>href</Code>로 갈 곳을 정합니다.</>],
            [<Code>Link.Text</Code>, "링크의 글자입니다. 덧붙이는 요소와 함께 쓸 때 글자를 감쌉니다."],
            [<Code>Link.Addon</Code>, <>글자 앞뒤의 아이콘 자리입니다. <Code>addonLeft</Code>, <Code>addonRight</Code>로 짧게 넣을 수도 있습니다.</>],
            [<Code>Link.ExternalIcon</Code>, "바깥 사이트로 나감을 알리는 아이콘입니다. 바깥 주소면 알아서 붙습니다."],
          ]}
        />
      </Section>

      <Section title="종류와 색">
        <Demo caption="기본 링크">
          <Link href="#link">거래처 상세</Link>
        </Demo>
        <Demo caption="맞춤 링크 — 글자색을 물려받는 링크">
          <Text size={200} color="var(--ec-text-secondary)">
            <Link href="#link" color="var(--ec-text-secondary)">이용 안내</Link>
          </Text>
        </Demo>
        <Demo caption="색 바탕 위 — 알림 상자(Notice) 안의 링크" gray>
          <Notice theme="info">
            <Notice.Content>
              <Notice.Text>
                승인 규칙이 바뀌었습니다. <Link href="#link">바뀐 내용 보기</Link>
              </Notice.Text>
            </Notice.Content>
          </Notice>
        </Demo>
        <Rules
          items={[
            <>기본 링크는 파란색(<Swatch token="text-link" /> <Code>--ec-text-link</Code>)입니다. 누를 수 있는 것이 파랑이라는 규칙을 따릅니다.</>,
            "맞춤 링크는 색이나 동작을 바꾼 링크입니다. 기본 링크의 규칙을 그대로 지키고, 꼭 필요한 곳에만 씁니다.",
            "마우스를 올렸을 때의 색과 아이콘 색은 알아서 계산됩니다. 따로 정하지 않습니다.",
            "기본 링크는 알림 상자처럼 색이 깔린 바탕 위에서도 그대로 쓸 수 있습니다.",
          ]}
        />
      </Section>

      <Section title="크기와 여백">
        <Demo>
          <Link href="#link" size={100} addonRight={ArrowRightM}>12px 링크</Link>
          <Link href="#link" size={200} addonRight={ArrowRightM}>14px 링크</Link>
          <Link href="#link" size={300} addonRight={ArrowRightM}>16px 링크</Link>
          <Link href="#link" size={400} addonRight={ArrowRightL}>20px 링크</Link>
        </Demo>
        <Table
          head={["글자 크기", "아이콘 크기"]}
          rows={[
            [<>12~16px (<Code>--ec-fs-100</Code> ~ <Code>--ec-fs-300</Code>)</>, "M"],
            [<>20px 이상 (<Code>--ec-fs-400</Code>부터)</>, "L"],
          ]}
        />
        <Rules
          items={[
            "링크 글자는 둘레 글자와 같은 크기로 씁니다.",
            "글자 앞뒤에 아이콘을 붙일 수 있습니다. 아이콘과 글자 사이는 언제나 4px입니다.",
            "아이콘은 링크를 누르면 일어나는 일을 나타내야 합니다.",
          ]}
        />
        <Demo caption="누른 뒤 시간이 걸리면 아이콘 자리에 돌아가는 표시를 둡니다">
          <Link href="#link">
            <Link.Addon><Spin size="xs" /></Link.Addon>
            <Link.Text>문서 내려받는 중</Link.Text>
          </Link>
        </Demo>
      </Section>

      <Section title="여러 링크를 나란히 놓기">
        <Demo caption="자리가 넉넉할 때 20px / 좁을 때 12px" column>
          <Flex gap={5}>
            <Link href="#link">도움말</Link>
            <Link href="#link">공지사항</Link>
            <Link href="#link">문의하기</Link>
          </Flex>
          <Flex gap={3}>
            <Link href="#link">도움말</Link>
            <Link href="#link">공지사항</Link>
            <Link href="#link">문의하기</Link>
          </Flex>
        </Demo>
        <P>한 줄에 놓인 링크 사이는 4px의 배수로 띄웁니다. 자리가 넉넉하면 20px, 좁으면 12px입니다.</P>
      </Section>

      <Section title="상태">
        <Demo>
          <Link href="#link">기본</Link>
          <Link href="#link" active>마우스 올림 · 누름</Link>
          <Tooltip title="열람 권한이 없습니다">
            <Link href="#link" disabled>비활성</Link>
          </Tooltip>
          <Link href="#link" enableVisited>가 본 링크</Link>
        </Demo>
        <Table
          head={["상태", "모양", "커서"]}
          rows={[
            ["기본", <><Code>--ec-text-link</Code> 색, 밑줄 없음</>, "손가락"],
            ["마우스 올림 · 누름", "색이 한 단계 진해지고 밑줄이 생깁니다. 아이콘이 있으면 글자와 함께 색이 바뀝니다. 둘은 누르는 영역 하나입니다.", "손가락"],
            ["비활성", "전체가 30%로 흐려집니다. 되도록 쓰지 않고, 쓸 때는 왜 막혔는지 설명 풍선으로 알립니다.", "기본"],
            ["가 본 링크", <>보라색으로 바뀝니다. <Code>enableVisited</Code>를 준 링크에만 나오는 선택 사항입니다.</>, "손가락"],
            ["가 본 링크 · 마우스 올림", "가 본 링크의 색 그대로 밑줄이 생깁니다. 선택 사항입니다.", "손가락"],
          ]}
        />
      </Section>

      <Section title="누르는 영역">
        <Rules
          items={[
            "누르는 영역은 넉넉하게 잡습니다. 손 움직임이 서툰 사용자나 휴대 기기에서도 눌려야 합니다.",
            "문단 밖에 따로 놓인 링크는 폭 44px, 높이 22px 이상이 되게 합니다.",
            "휴대 기기에서는 너무 크게 만들지도 않습니다. 화면을 쓸어 넘기다가 잘못 눌립니다.",
            "이름이 아주 짧은 링크는 누르기 어렵습니다. 이름을 늘리거나 누르는 영역을 넓힙니다.",
            "목록에서는 줄 전체를 링크로 만드는 편이 깔끔하고 누르기 쉽습니다.",
            "링크가 두 줄에 걸치면 줄 사이 빈 곳에서도 커서가 손가락 모양을 유지하게 합니다.",
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "다른 화면으로 가거나 모달을 여는 링크는 어떤 화면이 열리는지 이름에서 알 수 있어야 합니다.",
            "\"거래처 등록\", \"승인 내역 보기\"처럼 누르면 하게 되는 일을 적습니다. \"여기\", \"더 보기\"만 적지 않습니다.",
            "따옴표로 묶인 말이 링크면 따옴표까지 링크에 넣습니다.",
            "문장 부호는 링크에 넣지 않습니다. 문장 전체가 링크일 때만 넣습니다.",
            "문장이 메일 주소나 인터넷 주소 링크로 끝나면 마침표를 찍지 않습니다. 주소를 긁어 복사할 때 마침표가 딸려 갑니다.",
          ]}
        />
        <DoDont
          good={{
            demo: <Text size={200}>자세한 내용은 <Link href="#link">승인 규칙 안내</Link>에서 확인합니다.</Text>,
            text: "어디로 가는지 이름에 적습니다.",
          }}
          bad={{
            demo: <Text size={200}>자세한 내용은 <Link href="#link">여기</Link>를 누릅니다.</Text>,
            text: "뜻 없는 짧은 낱말을 링크로 만들지 않습니다. 누르기도, 알아보기도 어렵습니다.",
          }}
        />
      </Section>

      <Section title="Link와 ButtonLink">
        <Demo>
          <Link href="#link">거래처 상세로 이동</Link>
          <ButtonLink>목록 새로 고침</ButtonLink>
        </Demo>
        <P>
          Link는 어딘가로 가는 것이고, ButtonLink는 버튼을 둘 자리가 모자랄 때 쓰는 링크 모양의 버튼입니다. 겉모습이 아니라 누르면 일어나는 일로 고릅니다.
        </P>
        <Table
          head={["누르면 일어나는 일", "Link", "ButtonLink"]}
          rows={[
            ["시스템 안의 다른 화면으로 이동", "씀", "쓰지 않음"],
            ["바깥 사이트로 이동", "씀", "쓰지 않음"],
            ["메일 주소 열기, 파일 내려받기", "씀", "쓰지 않음"],
            ["화면 새로 고침", "쓰지 않음", "씀"],
            ["작은 상자·위젯의 내용 갱신", "쓰지 않음", "씀"],
            ["표 한 줄의 내용 갱신", "쓰지 않음", "씀"],
            ["모달 열기", "쓰지 않음", "씀"],
            ["드롭다운 열기", "쓰지 않음", "씀"],
            ["접힌 내용 펼치기", "쓰지 않음", "씀"],
            ["같은 화면에서 글 전체 보기", "쓰지 않음", "씀"],
            ["눌러서 여는 설명 풍선", "쓰지 않음", "씀"],
          ]}
        />
      </Section>

      <Section title="표 안의 링크">
        <Rules
          items={[
            "표 안의 동작은 자리가 되면 약한 버튼(tertiary)으로 둡니다. 자리가 모자라면 ButtonLink를 씁니다.",
            "표의 줄 안에서는 14px 링크를 씁니다.",
            <>바깥 사이트 주소가 값으로 들어간 칸에는 바깥 링크 아이콘을 M 크기, <Code>--ec-text-secondary</Code> 색으로 붙입니다. 글자와 4px(<Code>--ec-spacing-1x</Code>) 띄웁니다.</>,
          ]}
        />
      </Section>

      <Section title="바깥 사이트로 가는 링크">
        <Demo caption="안쪽 화면 / 바깥 사이트 / 주소가 그대로 글자인 경우">
          <Link href="#link">거래처 상세</Link>
          <Link href="https://example.com/notice" isExternal>국세청 공지</Link>
          <Link href="https://example.com" isExternal>example.com</Link>
        </Demo>
        <Table
          head={["경우", "모양"]}
          rows={[
            ["시스템 안의 화면으로만 감", "아이콘을 붙이지 않습니다. 글자에만 주소를 겁니다."],
            ["바깥 사이트로만 감", "글자 뒤에 바깥 링크 아이콘이 붙습니다. 아이콘은 언제나 회색입니다."],
            ["안쪽 화면과 바깥 사이트 둘 다", "글자와 아이콘에 서로 다른 주소를 겁니다. 글자는 안쪽 화면으로, 아이콘은 바깥 사이트로 갑니다. 둘의 색도 다릅니다."],
          ]}
        />
        <Rules
          items={[
            "바깥 사이트로 가는 링크는 언제나 새 탭에서 엽니다.",
            <>주소가 바깥 주소면 아이콘과 새 탭 열기가 알아서 붙습니다. 직접 정하려면 <Code>isExternal</Code>을 줍니다.</>,
            <>아이콘은 M 크기, <Code>--ec-text-secondary</Code> 색이고 글자와 4px 띄웁니다.</>,
            "아이콘에 마우스를 올리면 한 단계 진해집니다.",
            "꼭 필요하면 아이콘에 링크 색을 입혀 바깥 사이트임을 더 드러낼 수 있습니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <Link href="#link">문서 12건 보기</Link>,
            text: "다른 화면으로 옮겨 갈 때 씁니다.",
          }}
          bad={{
            demo: <Text size={200} color="var(--ec-text-link)">승인 대기</Text>,
            text: "어디로도 가지 않고 아무 일도 하지 않는 글자를 링크처럼 보이게 하지 않습니다.",
          }}
        />
      </Section>
    </Page>
  );
}

import React from "react";
import { SidePanel, Button, Flex, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "SidePanel" };

function BasicPanel() {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>거래처 정보 보기</Button>
      <SidePanel visible={visible} onClose={() => setVisible(false)} aria-label="거래처 정보">
        <SidePanel.Header title="거래처 정보" />
        <SidePanel.Body>
          <Flex direction="column" gap={2}>
            <Text size={200} color="text-secondary">담당자</Text>
            <Text size={200}>구매 1팀 담당자</Text>
            <Text size={200} color="text-secondary">최근 거래일</Text>
            <Text size={200}>2026-11-25</Text>
          </Flex>
        </SidePanel.Body>
        <SidePanel.Footer>
          <Button use="primary" theme="info" onClick={() => setVisible(false)}>닫기</Button>
        </SidePanel.Footer>
      </SidePanel>
    </>
  );
}

function PlainPanel() {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>도움말 열기</Button>
      <SidePanel visible={visible} onClose={() => setVisible(false)} aria-label="도움말">
        <SidePanel.Panel>
          <SidePanel.Close />
          <SidePanel.Header>
            <SidePanel.Title>도움말</SidePanel.Title>
          </SidePanel.Header>
          <SidePanel.Body>
            <Text size={200}>승인 요청은 문서 상세 화면의 오른쪽 위에서 보냅니다.</Text>
          </SidePanel.Body>
        </SidePanel.Panel>
      </SidePanel>
    </>
  );
}

function WidePanel() {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>알림 모아 보기</Button>
      <SidePanel visible={visible} onClose={() => setVisible(false)} w={400} placement="right" aria-label="알림">
        <SidePanel.Header title="알림" />
        <SidePanel.Body>
          <Flex direction="column" gap={3}>
            <Text size={200}>견적서 승인이 끝났습니다.</Text>
            <Text size={200}>발주서에 담당자가 지정되었습니다.</Text>
          </Flex>
        </SidePanel.Body>
      </SidePanel>
    </>
  );
}

export default function SidePanelPage() {
  return (
    <Page meta={meta} lead="화면 가장자리에서 밀려 나오는 패널입니다. 사용자가 보던 화면을 떠나지 않고 딸린 작업이나 보조 정보를 볼 때 씁니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "지금 보는 문서나 표와 관련된 작은 작업, 보조 정보, 참고 링크를 보여 줄 때 씁니다.",
            "가림막이 있더라도 사용자가 원래 화면의 맥락을 잃지 않게 하고 싶을 때 씁니다.",
            "시스템 전체의 알림 모음, 도움말, 새 소식 패널로 씁니다.",
            "좁은 화면에서는 메뉴나 필터를 담는 패널로 씁니다.",
          ]}
        />
        <P>반드시 읽어야 하는 내용이나 사용자의 답을 받아야 하는 내용은 Modal로 보여 줍니다.</P>
      </Section>

      <Section title="구성">
        <Demo caption="눌러서 엽니다">
          <BasicPanel />
        </Demo>
        <Table
          head={["부품", "역할"]}
          rows={[
            [<Code>SidePanel.Header</Code>, <>맨 위의 제목 줄입니다. <Code>title</Code>에 제목을 넘깁니다.</>],
            [<Code>SidePanel.Title</Code>, "제목 글자입니다. 제목 줄을 직접 꾸밀 때 씁니다."],
            [<Code>SidePanel.Close</Code>, "닫기 버튼입니다. 오른쪽 위에 놓입니다."],
            [<Code>SidePanel.Body</Code>, "본문입니다. 내용이 길면 이 안에서만 스크롤됩니다."],
            [<Code>SidePanel.Footer</Code>, "맨 아래의 동작 줄입니다."],
            [<Code>SidePanel.Overlay</Code>, "뒤 화면을 덮는 가림막입니다."],
            [<Code>SidePanel.Panel</Code>, "패널 상자입니다. 가림막 없이 패널만 띄울 때 직접 적습니다."],
          ]}
        />
      </Section>

      <Section title="여는 요소">
        <P>패널은 아래와 같은 요소를 눌러 엽니다.</P>
        <Rules
          items={[
            "상단바의 알림·새 소식 아이콘",
            "페이지 제목 옆의 보조 링크",
            "추가 정보를 숨겨 둔 버튼이나 링크",
            "누르면 자세한 내용을 보여 주는 차트의 막대나 점",
            "좁은 화면에서는 메뉴 버튼 등 다른 컨트롤",
          ]}
        />
      </Section>

      <Section title="가림막">
        <Demo caption="가림막 있음(기본) / 가림막 없음">
          <BasicPanel />
          <PlainPanel />
        </Demo>
        <Table
          head={["종류", "언제 쓰는가"]}
          rows={[
            ["가림막 없음", "화면의 문서·표·영역에 대한 보조 정보를 옆에 띄워 두고 함께 볼 때"],
            ["가림막 있음", "패널 안의 내용에 집중시켜야 할 때"],
          ]}
        />
      </Section>

      <Section title="크기와 여백">
        <Demo caption="w로 폭을 바꿉니다 — 400px">
          <WidePanel />
        </Demo>
        <Rules
          items={[
            <>폭은 고정입니다. 기본은 260px이고 <Code>w</Code>로 바꿉니다. 브라우저 창 크기가 바뀌어도 폭은 변하지 않습니다.</>,
            "폭 320px 화면에서는 패널이 화면의 80%를 넘지 않게 합니다. 바깥을 눌러 닫을 자리가 남아야 합니다.",
            "안쪽 여백은 기본값을 씁니다. 좁은 화면에서만 줄일 수 있고, 줄일 때도 4px의 배수로 맞춥니다.",
            <>나오는 방향은 <Code>placement</Code>로 정합니다(<Code>right</Code> 기본, <Code>left</Code>, <Code>top</Code>, <Code>bottom</Code>).</>,
          ]}
        />
        <Sub title="내용">
          <Rules
            items={[
              "패널 안에서도 제목의 위계가 보이게 글자 크기를 고릅니다. 크기는 우리 글자 크기 번호 안에서만 고릅니다.",
              "본문을 밀어도 제목 줄과 아래 동작 줄은 제자리에 고정합니다.",
            ]}
          />
        </Sub>
        <Sub title="아래 동작 줄">
          <Rules
            items={[
              "패널 전체에 해당하는 버튼, 진행 막대 등을 둡니다.",
              "컨트롤 크기는 M입니다. 좁은 화면에서는 상황에 따라 L을 쓸 수 있습니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="놓는 자리와 스크롤">
        <Rules
          items={[
            "특정 업무 화면에 딸린 패널은 상단바 아래, 그 화면 영역 안에서 엽니다. 시스템 전체에 해당하는 패널은 화면 전체 위에 엽니다.",
            "패널이 열려 있는 동안 초점은 패널 안에 머뭅니다. Tab으로 패널 안의 컨트롤을 차례로 옮겨 다닙니다.",
            "패널이 열리면 뒤 화면의 스크롤은 기본으로 막힙니다.",
            <>가림막이 없고 패널이 화면에 대한 도움말·보조 정보일 때만 <Code>disablePreventScroll</Code>로 뒤 화면 스크롤을 풉니다.</>,
            "가림막이 있는 패널은 뒤 화면 스크롤을 항상 막습니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Sub title="열기와 닫기">
          <P>패널은 사용자가 여는 요소를 눌렀을 때 엽니다. 꼭 알려야 할 내용이 있을 때에 한해 시스템이 먼저 열 수 있습니다.</P>
          <Table
            head={["닫는 방법", "비고"]}
            rows={[
              ["패널 안의 주요 버튼", "\"적용\", \"닫기\" 등"],
              ["닫기 버튼", <><Code>closable={"{false}"}</Code>로 숨길 수 있습니다.</>],
              ["패널 바깥(가림막) 누르기", "선택 사항"],
              ["Esc 키", "항상"],
            ]}
          />
          <P><Code>onClose</Code>는 어떤 방법으로 닫혔는지(<Code>onOutsideClick</Code>, <Code>onEscape</Code>, <Code>onCloseClick</Code>)를 첫 번째 값으로 알려 줍니다.</P>
        </Sub>
        <Sub title="불러오는 중과 오류">
          <Rules
            items={[
              "제목 줄은 불러오는 중, 내용 없음, 오류 상태에서도 항상 보여 줍니다.",
              "처음 불러올 때는 Skeleton으로 내용의 뼈대를 보여 줍니다.",
              "내용을 다시 불러올 때는 XXL 크기의 SpinContainer로 본문을 덮습니다.",
              "불러오다 오류가 나면 이유를 적은 문구와 \"다시 불러오기\" 버튼을 보여 줍니다. 자세한 규칙은 WidgetEmpty를 따릅니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "표에서 행을 눌렀을 때 그 행의 상세 정보를 옆 패널로 보여 줍니다. 표는 그대로 보입니다." }}
          bad={{ text: "\"삭제할까요?\"처럼 답을 받아야 하는 물음을 옆 패널에 넣지 않습니다. Modal을 씁니다." }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["상황", "쓸 것"]}
          rows={[
            ["화면을 떠나지 않고 보조 정보·딸린 작업을 볼 때", "SidePanel"],
            ["중요한 내용을 알리거나 답을 받아야 할 때", "Modal"],
            ["화면 전체를 써야 하는 긴 작업", "FullscreenModal"],
            ["여러 단계를 차례로 밟는 작업", "Wizard"],
          ]}
        />
      </Section>
    </Page>
  );
}

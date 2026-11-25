import React from "react";
import { Button, ButtonLink, Link, Breadcrumbs, ProductHead, ProductHeadTitle, noticeBubbleDefaultManager, Flex, Box } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "페이지 머리의 링크 순서", order: 18 };

const say = (text) => () => noticeBubbleDefaultManager.add({ children: text, initialAnimation: true, duration: 4000 });

export default function PageHeaderLinksPage() {
  return (
    <Page meta={meta} lead="페이지 머리(ProductHead)의 오른쪽 위에 두는 도움말·안내 링크와, 제목 줄에 두는 버튼의 종류와 순서입니다. 모든 화면에서 같은 순서를 지켜, 찾는 링크가 늘 같은 자리에 있게 합니다.">
      <Section title="자리">
        <Demo>
          <Box w="100%">
            <ProductHead>
              <ProductHead.Row>
                <Breadcrumbs>
                  <Breadcrumbs.Item href="#">거래처</Breadcrumbs.Item>
                  <Breadcrumbs.Item active>문서 관리</Breadcrumbs.Item>
                </Breadcrumbs>
                <ProductHead.Links>
                  <Link href="#">이전 화면으로 보기</Link>
                  <ButtonLink onClick={say("새 소식 창이 열립니다.")}>새 소식</ButtonLink>
                  <Link href="#">사용 설명서</Link>
                  <ButtonLink onClick={say("의견 보내기 폼이 열립니다.")}>의견 보내기</ButtonLink>
                </ProductHead.Links>
              </ProductHead.Row>
              <ProductHead.Row>
                <ProductHeadTitle tag="h3">문서 관리</ProductHeadTitle>
                <ProductHead.Buttons>
                  <Button use="primary" theme="info">문서 만들기</Button>
                  <Button>내보내기</Button>
                </ProductHead.Buttons>
              </ProductHead.Row>
            </ProductHead>
          </Box>
        </Demo>
        <Table
          head={["줄", "왼쪽", "오른쪽"]}
          rows={[
            ["첫째 줄", "현재 위치(Breadcrumbs)", <>덧붙이는 링크 — <Code>ProductHead.Links</Code></>],
            ["둘째 줄", <>화면 제목 — <Code>ProductHeadTitle</Code>, 작업 대상 고르기</>, <>화면의 동작 버튼 — <Code>ProductHead.Buttons</Code></>],
            ["셋째 줄 (있을 때)", "화면 전체에 걸리는 필터와 덧붙인 정보", "—"],
          ]}
        />
      </Section>

      <Section title="링크의 순서">
        <P>덧붙이는 링크는 왼쪽에서 오른쪽으로 아래 순서대로 놓습니다. 해당하는 것만 두되 순서는 바꾸지 않습니다.</P>
        <Table
          head={["순서", "링크", "누르면", "모양"]}
          rows={[
            ["1", "이전 화면으로 보기", "바뀌기 전의 옛 화면으로 갑니다. 새 화면으로 바꾼 뒤 한동안만 둡니다.", "Link"],
            ["2", "관련 도구", "이 화면과 함께 쓰는 다른 도구나 앱의 안내 화면을 엽니다.", "Link"],
            ["3", "연동 안내", "다른 시스템과 데이터를 주고받는 방법(API)을 설명한 화면을 엽니다.", "Link"],
            ["4", "모아 보기 자료", "\"이번 달 거래 상위 30곳\"처럼 미리 뽑아 둔 자료를 화면이나 모달로 엽니다.", "Link 또는 ButtonLink"],
            ["5", "안내 글", "이 기능을 소개하는 공지나 글을 엽니다. 글의 제목을 링크 글자로 씁니다.", "Link"],
            ["6", "새 소식", "이 화면에서 바뀐 점을 모은 모달을 엽니다.", "ButtonLink"],
            ["7", "교육 자료", "이 업무에 대한 교육 과정 화면을 엽니다.", "Link"],
            ["8", "자주 묻는 질문", "질문과 답을 모은 모달이나 화면을 엽니다.", "Link 또는 ButtonLink"],
            ["9", "둘러보기", "화면의 기능을 차례로 짚어 주는 안내를 시작합니다.", "ButtonLink"],
            ["10", "영상 안내", "쓰는 법을 담은 영상을 모달로 엽니다.", "ButtonLink"],
            ["11", "사용 설명서", "이 화면의 설명서 문서를 엽니다.", "Link"],
            ["12", "의견 보내기", "의견 보내기 폼을 엽니다. 있으면 언제나 맨 오른쪽 끝입니다.", "ButtonLink"],
          ]}
        />
        <Rules
          items={[
            "앞쪽은 이 화면 밖으로 나가는 것, 가운데는 새로 알리는 것, 뒤쪽은 도움을 받는 것, 맨 끝은 의견을 보내는 것입니다.",
            "네 개를 넘기지 않도록 합니다. 많으면 자주 쓰지 않는 것부터 뺍니다.",
            "\"의견 보내기\"는 다른 링크가 무엇이든 늘 맨 오른쪽입니다.",
          ]}
        />
      </Section>

      <Section title="링크의 모양">
        <Demo>
          <Link href="#">사용 설명서</Link>
          <ButtonLink onClick={say("의견 보내기 폼이 열립니다.")}>의견 보내기</ButtonLink>
        </Demo>
        <Rules
          items={[
            <>다른 화면으로 가는 것은 <Code>Link</Code>를 씁니다.</>,
            <>모달이나 폼을 열거나 화면의 무언가를 바꾸는 것은 <Code>ButtonLink</Code>를 씁니다. 모양은 링크지만 버튼으로 읽혀야 합니다.</>,
            <>글자는 14px(<Code>--ec-fs-200</Code>)입니다.</>,
            "현재 위치와 링크는 세로 가운데를 맞춥니다.",
            "링크 사이의 간격은 16px입니다.",
            "시스템 밖의 화면을 새 창으로 여는 링크에는 바깥 링크 아이콘을 붙입니다.",
          ]}
        />
      </Section>

      <Section title="제목 줄의 버튼">
        <Rules
          items={[
            "화면 전체에 대한 동작만 둡니다(문서 만들기, 내보내기, 설정). 표의 한 행에 대한 동작은 그 표에 둡니다.",
            "주요 버튼은 하나이고 버튼 묶음의 맨 앞에 둡니다. 다른 곳의 버튼 순서와 같습니다.",
            "보조 버튼은 주요 버튼 뒤에, 많이 쓰는 것부터 놓습니다.",
            "버튼은 M 크기입니다. 버튼 사이는 8px입니다.",
            "세 개를 넘으면 덜 쓰는 것을 \"더 보기\" 메뉴로 묶습니다.",
            "제목이 길어 버튼과 닿을 것 같으면 제목을 말줄임표로 자르고 버튼과 24px을 띄웁니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Flex gap={4}>
                <Link href="#">사용 설명서</Link>
                <ButtonLink>의견 보내기</ButtonLink>
              </Flex>
            ),
            text: "정해진 순서대로 놓고 \"의견 보내기\"를 맨 끝에 둡니다.",
          }}
          bad={{
            demo: (
              <Flex gap={4}>
                <ButtonLink>의견 보내기</ButtonLink>
                <Link href="#">사용 설명서</Link>
              </Flex>
            ),
            text: "화면마다 순서를 바꾸지 않습니다. 사용자는 자리로 기억합니다.",
          }}
        />
      </Section>
    </Page>
  );
}

import React from "react";
import { Row, Col, Box, Text } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, Code } from "../../kit.jsx";

export const meta = { title: "화면 폭", order: 2 };

const Cell = ({ children }) => (
  <Box p={3} style={{ background: "var(--ec-bg-selected)", borderRadius: 6 }}>
    <Text size={200}>{children}</Text>
  </Box>
);

export default function BreakpointsPage() {
  return (
    <Page meta={meta} lead="화면의 폭에 따라 배치를 바꾸는 기준입니다. 사내 시스템은 책상 위의 큰 화면에서 쓰는 것을 기본으로 합니다.">
      <Section title="기본 방침">
        <Rules
          items={[
            "큰 화면(데스크톱)을 먼저 설계합니다. 표와 필터가 많은 업무 화면은 넓은 폭이 필요합니다.",
            "노트북 화면(폭 1280px)에서 가로로 밀어 보지 않고 모든 업무를 할 수 있어야 합니다.",
            "태블릿·휴대폰에서 써야 하는 화면은 따로 정해 그 화면만 좁은 폭을 지원합니다.",
            "좁은 화면에서 손가락으로 누르는 컨트롤은 큰 크기(L · 44px)를 씁니다.",
          ]}
        />
      </Section>

      <Section title="기준 폭">
        <Table
          head={["이름", "폭", "대상", "배치"]}
          rows={[
            ["좁음", "768px 미만", "휴대폰", "한 단. 메뉴는 접어 둡니다. 표는 카드 목록으로 바꾸거나 가로로 밉니다."],
            ["보통", "768px ~ 1279px", "태블릿, 작은 노트북", "한 단 또는 두 단. 옆 메뉴는 아이콘만 보이게 줄입니다."],
            ["넓음", "1280px 이상", "노트북, 모니터", "기본 배치. 옆 메뉴와 본문을 함께 보여 줍니다."],
          ]}
        />
        <P>배치가 바뀌는 지점은 768px와 1280px 두 곳뿐입니다. 화면마다 다른 기준 폭을 새로 만들지 않습니다.</P>
      </Section>

      <Section title="본문의 폭">
        <Rules
          items={[
            "본문 영역은 화면이 아무리 넓어도 끝없이 늘어나지 않게 최대 폭을 둡니다. 표가 중심인 화면은 화면 폭을 다 쓰고, 폼과 글이 중심인 화면은 좁게 잡습니다.",
            "폼의 입력창은 내용의 길이에 맞는 폭으로 둡니다. 화면 폭에 맞춰 늘이지 않습니다.",
            "글 문단은 800px를 넘기지 않습니다.",
            "화면 좌우 여백은 넓음에서 32px, 좁음에서 16px입니다.",
          ]}
        />
      </Section>

      <Section title="격자">
        <P>
          여러 단으로 나눌 때는 12칸 격자(<Code>Row</Code>, <Code>Col</Code>)를 씁니다. <Code>span</Code>에 차지할 칸 수를 주고, 화면 폭에 따라 칸 수를 바꿀 수 있습니다.
        </P>
        <Demo column>
          <Row gutter={4}>
            <Col span={8}><Cell>8칸 (본문)</Cell></Col>
            <Col span={4}><Cell>4칸 (요약)</Cell></Col>
          </Row>
          <Row gutter={4}>
            <Col span={3}><Cell>3</Cell></Col>
            <Col span={3}><Cell>3</Cell></Col>
            <Col span={3}><Cell>3</Cell></Col>
            <Col span={3}><Cell>3</Cell></Col>
          </Row>
        </Demo>
        <Rules
          items={[
            "단 사이의 간격은 16px입니다.",
            "지표 카드처럼 같은 종류가 나란히 놓일 때는 폭을 똑같이 나눕니다(3칸씩 넷, 4칸씩 셋).",
            "좁은 화면에서는 단을 위아래로 쌓습니다. 중요한 것이 위로 오게 순서를 정합니다.",
          ]}
        />
      </Section>

      <Section title="좁아질 때 줄이는 순서">
        <Rules
          items={[
            "먼저 여백을 줄입니다.",
            "다음으로 옆 메뉴를 아이콘만 남기거나 숨깁니다.",
            "그다음 여러 단을 한 단으로 쌓습니다.",
            "표는 덜 중요한 열부터 숨기고, 숨긴 내용은 줄을 펼쳐 볼 수 있게 합니다.",
            "버튼의 글자를 지워 아이콘만 남기는 것은 마지막 수단입니다. 이때 설명 풍선을 답니다.",
            "글자 크기는 줄이지 않습니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

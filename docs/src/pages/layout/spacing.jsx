import React from "react";
import { Button, Input, Flex, Box, Text, Card } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "간격", order: 1 };

const Bar = ({ px }) => <Box inline h={16} w={px} style={{ background: "var(--ec-bg-selected)", borderRadius: 2 }} />;

export default function SpacingPage() {
  return (
    <Page meta={meta} lead="요소 사이의 거리를 정하는 규칙입니다. 간격이 일정하면 화면이 정돈되어 보이고, 가까운 것끼리 한 묶음으로 읽힙니다.">
      <Section title="4의 배수">
        <P>모든 간격은 4px의 배수입니다. 5px, 10px, 15px 같은 값은 쓰지 않습니다.</P>
        <Table
          head={["토큰", "값", "보기", "쓰는 곳"]}
          rows={[
            [<Code>--ec-spacing-1x</Code>, "4px", <Bar px={4} />, "아이콘과 글자 사이, 태그와 태그 사이"],
            [<Code>--ec-spacing-2x</Code>, "8px", <Bar px={8} />, "버튼과 버튼 사이, 이름표와 입력창 사이"],
            [<Code>--ec-spacing-3x</Code>, "12px", <Bar px={12} />, "한 줄에 놓인 컨트롤 사이"],
            [<Code>--ec-spacing-4x</Code>, "16px", <Bar px={16} />, "폼의 입력 줄 사이, 카드와 카드 사이"],
            [<Code>--ec-spacing-6x</Code>, "24px", <Bar px={24} />, "카드의 안쪽 여백, 폼의 묶음 사이"],
            [<Code>--ec-spacing-8x</Code>, "32px", <Bar px={32} />, "섹션과 섹션 사이, 화면의 좌우 여백"],
          ]}
        />
      </Section>

      <Section title="가까움이 묶음을 만든다">
        <Rules
          items={[
            "관계가 가까울수록 간격을 좁게, 멀수록 넓게 둡니다.",
            "묶음 안의 간격은 묶음 사이의 간격보다 항상 작아야 합니다.",
            "제목은 위쪽보다 아래쪽 내용에 더 가깝게 붙입니다. 제목 위 간격을 아래 간격보다 넓게 둡니다.",
          ]}
        />
        <DoDont
          good={{
            demo: (
              <Flex direction="column">
                <Text size={200} mb={2}>이름</Text>
                <Input w={200} mb={4}><Input.Value aria-label="이름" /></Input>
                <Text size={200} mb={2}>부서</Text>
                <Input w={200}><Input.Value aria-label="부서" /></Input>
              </Flex>
            ),
            text: "이름표는 자기 입력창에 가깝게(8px), 다음 줄과는 멀게(16px) 둡니다.",
          }}
          bad={{
            demo: (
              <Flex direction="column">
                <Text size={200} mb={3}>이름</Text>
                <Input w={200} mb={3}><Input.Value aria-label="이름" /></Input>
                <Text size={200} mb={3}>부서</Text>
                <Input w={200}><Input.Value aria-label="부서" /></Input>
              </Flex>
            ),
            text: "모든 간격이 같으면 이름표가 위 입력창의 것인지 아래 것인지 알 수 없습니다.",
          }}
        />
      </Section>

      <Section title="컴포넌트로 간격 주기">
        <P>
          모든 컴포넌트는 여백 속성을 받습니다. 숫자 1이 4px입니다. <Code>mb={"{4}"}</Code>는 아래 여백 16px입니다.
        </P>
        <Table
          head={["속성", "뜻"]}
          rows={[
            [<><Code>m</Code>, <Code>mt</Code>, <Code>mr</Code>, <Code>mb</Code>, <Code>ml</Code>, <Code>mx</Code>, <Code>my</Code></>, "바깥 여백 (전체, 위, 오른쪽, 아래, 왼쪽, 좌우, 위아래)"],
            [<><Code>p</Code>, <Code>pt</Code>, <Code>pr</Code>, <Code>pb</Code>, <Code>pl</Code>, <Code>px</Code>, <Code>py</Code></>, "안쪽 여백"],
            [<><Code>gap</Code> (Flex)</>, "안에 든 요소들 사이의 간격"],
            [<><Code>w</Code>, <Code>h</Code>, <Code>wMin</Code>, <Code>wMax</Code></>, "폭과 높이. 숫자는 px, 문자열은 그대로(\"100%\")"],
          ]}
        />
        <Demo caption="Flex의 gap으로 버튼 사이 8px">
          <Flex gap={2}>
            <Button use="primary" theme="info">저장</Button>
            <Button>취소</Button>
          </Flex>
        </Demo>
        <Rules
          items={[
            "나란히 놓인 요소 사이의 간격은 각 요소에 여백을 주지 말고 감싸는 Flex의 gap으로 줍니다. 요소를 빼거나 더해도 간격이 흐트러지지 않습니다.",
            "여백을 CSS로 직접 적어야 할 때는 간격 토큰을 씁니다.",
          ]}
        />
      </Section>

      <Section title="자주 쓰는 간격">
        <Table
          head={["자리", "간격"]}
          rows={[
            ["버튼과 버튼", "8px (M), 12px (L)"],
            ["이름표와 입력창 (세로 배치)", "8px"],
            ["폼의 입력 줄과 줄", "16px (M), 24px (L)"],
            ["폼의 마지막 줄과 버튼", "24px"],
            ["카드의 안쪽 여백", "24px"],
            ["카드와 카드", "16px"],
            ["페이지 제목과 본문", "24px"],
            ["섹션과 섹션", "32px"],
          ]}
        />
        <Demo gray>
          <Card w={320}>
            <Card.Header><Card.Title>카드 제목</Card.Title></Card.Header>
            <Card.Body>
              <Text tag="p" size={200} mt={0} mb={4}>안쪽 여백 24px.</Text>
              <Flex gap={2}><Button use="primary" theme="info">저장</Button><Button>취소</Button></Flex>
            </Card.Body>
          </Card>
        </Demo>
      </Section>
    </Page>
  );
}

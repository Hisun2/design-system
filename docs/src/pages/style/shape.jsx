import React from "react";
import { Button, Input, Tag, Badge, Card, Notice, Flex, Box, Text } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, Code } from "../../kit.jsx";

export const meta = { title: "모양", order: 6 };

export default function ShapePage() {
  return (
    <Page meta={meta} lead="컨트롤의 높이, 모서리, 그림자의 기준입니다. 컴포넌트에는 이미 적용되어 있고, 직접 만드는 요소도 이 값을 따릅니다.">
      <Section title="컨트롤의 높이">
        <Demo>
          <Button>M · 32px</Button>
          <Input w={160}><Input.Value placeholder="M · 32px" aria-label="기본 크기" /></Input>
          <Button size="l">L · 44px</Button>
          <Input w={160} size="l"><Input.Value placeholder="L · 44px" aria-label="큰 크기" /></Input>
        </Demo>
        <Table
          head={["크기", "높이", "글자", "쓰는 곳"]}
          rows={[
            ["M", "32px", "14px", "기본. 필터, 표, 폼 등 대부분의 자리"],
            ["L", "44px", "16px", "모달의 핵심 동작, 빈 화면, 손가락으로 누르는 화면"],
          ]}
        />
        <Rules
          items={[
            "버튼, 입력창, 선택 상자는 같은 크기 이름이면 높이가 같습니다. 한 줄에 나란히 놓아도 맞습니다.",
            "한 폼이나 한 묶음 안에서는 크기를 하나로 통일합니다.",
          ]}
        />
      </Section>

      <Section title="모서리">
        <Table
          head={["토큰", "값", "쓰는 곳"]}
          rows={[
            [<Code>--ec-radius-badge</Code>, "4px", "배지, Pills 안의 항목, 작은 표시"],
            [<Code>--ec-radius-control</Code>, "6px", "버튼, 입력창, 선택 상자, 드롭다운"],
            [<Code>--ec-radius-notice</Code>, "8px", "알림 상자"],
            [<Code>--ec-radius-card</Code>, "12px", "카드, 모달"],
            [<Code>--ec-radius-pill</Code>, "끝까지 둥글게", "태그, 개수 표시"],
          ]}
        />
        <Demo>
          <Badge type="new" />
          <Button>버튼</Button>
          <Tag>태그</Tag>
        </Demo>
        <P>안에 들어가는 것일수록 모서리가 작습니다. 카드(12px) 안의 버튼(6px), 버튼 안의 배지(4px) 순서입니다.</P>
      </Section>

      <Section title="카드와 알림 상자">
        <Demo gray column>
          <Card>
            <Card.Header><Card.Title>카드</Card.Title></Card.Header>
            <Card.Body>테두리와 그림자 없이, 회색 바탕 위의 흰 면으로 구분합니다.</Card.Body>
          </Card>
          <Notice theme="info"><Notice.Content><Notice.Text>알림 상자는 안쪽 여백 16px, 모서리 8px입니다.</Notice.Text></Notice.Content></Notice>
        </Demo>
        <Rules
          items={[
            "카드는 테두리와 그림자를 쓰지 않습니다. 화면 바탕(회색)과 카드(흰색)의 차이로 구분합니다.",
            "카드의 안쪽 여백은 24px, 카드 사이는 16px입니다.",
            "카드 안에 카드를 넣지 않습니다. 안에서 구분이 필요하면 구분선이나 여백을 씁니다.",
          ]}
        />
      </Section>

      <Section title="그림자">
        <Rules
          items={[
            "그림자는 \"다른 것 위에 떠 있다\"는 뜻입니다. 드롭다운, 설명 풍선, 모달처럼 실제로 겹쳐 뜨는 것에만 있습니다.",
            "화면에 놓여 있는 것(카드, 표, 버튼)에는 그림자를 주지 않습니다.",
            "그림자 값은 컴포넌트에 들어 있습니다. 직접 그림자를 만들지 않습니다.",
          ]}
        />
      </Section>

      <Section title="선">
        <Flex direction="column">
          <Rules
            items={[
              <>구분선은 1px, <Code>--ec-border</Code>입니다.</>,
              <>입력창의 테두리는 1px, <Code>--ec-border-control</Code>입니다. 구분선보다 조금 진해서 "입력할 수 있다"는 것이 보입니다.</>,
              "표는 가로줄만 씁니다. 세로줄은 쓰지 않습니다.",
              "영역을 나눌 때는 선보다 여백을 먼저 씁니다. 선이 많으면 화면이 복잡해 보입니다.",
            ]}
          />
          <Box><Text size={100} color="text-secondary">간격은 '간격' 장을 봅니다.</Text></Box>
        </Flex>
      </Section>
    </Page>
  );
}

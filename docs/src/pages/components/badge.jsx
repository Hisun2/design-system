import React from "react";
import { Badge, Button, Pills, Notice, Card, Text, Flex, Box } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Badge" };

export default function BadgePage() {
  return (
    <Page meta={meta} lead="기능이나 메뉴가 지금 어떤 단계에 있는지 알리는 작은 표시입니다. 새로 생긴 기능, 시험 중인 기능, 아직 쓸 수 없는 기능에 붙입니다.">
      <Section title="특징">
        <Rules
          items={[
            "사용자가 붙이거나 뗄 수 없습니다. 아래 종류의 기준에 따라 시스템이 붙입니다.",
            "누를 수 없습니다. 눌러서 무언가를 실행하거나 이동하지 않습니다.",
            "데이터를 거르는 데 쓰지 않습니다. 거르는 것은 필터가 맡습니다.",
            "문구를 바꿀 수 없습니다. 종류를 고르면 문구가 정해집니다.",
          ]}
        />
      </Section>

      <Section title="종류">
        <Demo>
          <Badge type="admin" />
          <Badge type="alpha" />
          <Badge type="beta" />
          <Badge type="new" />
          <Badge type="soon" />
          <Badge type="unavailable" />
        </Demo>
        <Table
          head={["종류", "type", "언제 붙이는가"]}
          rows={[
            [<Badge type="admin" />, <Code>admin</Code>, "관리자 권한이 있는 사람만 쓸 수 있는 기능. 다른 사용자에게는 기능 자체가 보이지 않습니다."],
            [<Badge type="alpha" />, <Code>alpha</Code>, "관리자와 미리 허락받은 일부 사용자만 쓰는 기능. 안정적이지 않고, 크게 바뀌거나 없어질 수 있습니다."],
            [<Badge type="beta" />, <Code>beta</Code>, "쓸모를 확인하려고 먼저 내놓은 기능. 모두 쓸 수 있지만 앞으로 크게 바뀔 수 있습니다."],
            [<Badge type="new" />, <Code>new</Code>, "시험을 마치고 모든 사용자에게 열린 새 기능. 새로 생겼음을 알려 눈길을 끕니다."],
            [<Badge type="soon" />, <Code>soon</Code>, "아직 쓸 수 없지만 미리 보여 주고 의견을 받으려는 기능."],
            [<Badge type="unavailable" />, <Code>unavailable</Code>, "규정이나 그 밖의 제한 때문에 쓸 수 없는 기능."],
          ]}
        />
        <P>종류는 이 여섯 가지로 고정입니다. 다른 문구가 필요하면 Badge가 아니라 Tag를 씁니다.</P>
      </Section>

      <Section title="크기">
        <P>크기는 한 가지뿐입니다. 놓이는 컨트롤의 크기와 상관없이 같은 크기로 씁니다.</P>
      </Section>

      <Section title="색 바탕 위에서">
        <Demo caption="밝은 바탕 (기본) / 색 바탕 (theme=&quot;invert&quot;)">
          <Badge type="new" />
          <Box p={3} style={{ background: "var(--ec-brand-navy)", borderRadius: "var(--ec-radius-control)" }}>
            <Badge type="new" theme="invert" />
          </Box>
        </Demo>
        <P>
          어두운 바탕이나 색 바탕 위에서는 <Code>theme="invert"</Code>로 색을 뒤집습니다. 여섯 종류 모두 뒤집을 수 있습니다.
        </P>
      </Section>

      <Section title="다른 컴포넌트 안에서">
        <P>기능의 단계는 대부분의 컨트롤 안에 표시할 수 있습니다.</P>
        <Sub title="버튼">
          <Demo>
            <Button><Button.Text>일괄 승인</Button.Text><Button.Addon><Badge type="beta" /></Button.Addon></Button>
          </Demo>
        </Sub>
        <Sub title="Pills">
          <Demo>
            <Pills defaultValue="list" aria-label="보기 방식">
              <Pills.Item value="list">목록</Pills.Item>
              <Pills.Item value="board">
                <Pills.Item.Text>보드</Pills.Item.Text>
                <Pills.Item.Addon><Badge type="new" /></Pills.Item.Addon>
              </Pills.Item>
            </Pills>
          </Demo>
        </Sub>
        <Sub title="알림 상자">
          <Demo column>
            <Notice>
              <Notice.Label><Badge type="new" /></Notice.Label>
              <Notice.Content>문서를 여러 건 골라 한 번에 승인할 수 있습니다.</Notice.Content>
            </Notice>
          </Demo>
        </Sub>
        <Sub title="제목 옆">
          <Demo column>
            <Card w={320}>
              <Card.Header>
                <Flex alignItems="center" gap={1}>
                  <Card.Title>거래처별 승인 현황</Card.Title>
                  <Badge type="beta" />
                </Flex>
              </Card.Header>
              <Card.Body>
                <Text size={200}>이번 달 승인 42건</Text>
              </Card.Body>
            </Card>
          </Demo>
          <P>페이지 제목, 첫 화면의 큰 제목, 카드 제목 옆에도 같은 방식으로 붙입니다.</P>
        </Sub>
      </Section>

      <Section title="위치와 여백">
        <Rules
          items={[
            "가리키는 요소의 오른쪽에 둡니다.",
            "알림 상자에서만 예외로 글 왼쪽에 둡니다.",
            "앞뒤 간격은 4px의 배수로 합니다. 글자 바로 옆이면 4px입니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <Button><Button.Text>일괄 승인</Button.Text><Button.Addon><Badge type="new" /></Button.Addon></Button>,
            text: "기능의 단계를 알릴 때만 붙입니다.",
          }}
          bad={{
            text: "\"승인 완료\", \"반려\" 같은 데이터의 상태를 Badge로 나타내지 않습니다. 데이터의 상태는 StatusTag로 표시합니다.",
          }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["컴포넌트", "쓰임"]}
          rows={[
            ["Badge", "기능·메뉴의 단계 표시. 문구 여섯 가지 고정."],
            ["Tag", "데이터를 주제별로 묶거나 이름표를 붙일 때. 문구를 자유롭게 씁니다."],
            ["StatusTag", "데이터의 상태(완료, 진행 중, 문제 있음 등) 표시."],
            ["Dot", "새 소식이 생겼음을 알리는 주황 점."],
          ]}
        />
      </Section>
    </Page>
  );
}

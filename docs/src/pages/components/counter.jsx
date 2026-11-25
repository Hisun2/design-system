import React from "react";
import { Counter, Button, Tag, Text, Flex } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Counter" };

export default function CounterPage() {
  return (
    <Page meta={meta} lead="개수를 보여 주는 작은 숫자 표시입니다. 버튼과 필터 안, 제목 옆, 입력 한도 표시에 씁니다.">
      <Section title="특징">
        <Rules
          items={[
            "보여 주기만 합니다. 누를 수 없습니다.",
            "컨트롤 안, 한도 진행 표시, 카드 제목, 표 머리 등 숫자가 따라붙는 곳이면 어디든 씁니다.",
            "값이 바뀌는 숫자에 씁니다. 바뀌지 않는 숫자는 그냥 글자로 적습니다.",
          ]}
        />
      </Section>

      <Section title="색">
        <Demo>
          <Counter size="l">12</Counter>
          <Counter size="l" theme="info">3</Counter>
          <Counter size="l" theme="warning">98</Counter>
          <Counter size="l" theme="danger">104</Counter>
        </Demo>
        <Table
          head={["theme", "모양", "언제 쓰는가"]}
          rows={[
            ["없음 (기본)", <>흰 바탕, <Code>--ec-border-control</Code> 테두리, <Code>--ec-text-secondary</Code> 글자</>, "보조 버튼 안, 입력창 옆"],
            [<Code>info</Code>, <>파란 바탕(<Code>--ec-control-primary-info</Code>), 흰 글자</>, "필터에서 고른 값의 수"],
            [<Code>warning</Code>, "주황 바탕, 흰 글자", "한도에 다다랐거나 거의 다다랐을 때"],
            [<Code>danger</Code>, <>빨간 바탕(<Code>--ec-control-primary-critical</Code>), 흰 글자</>, "한도를 넘었을 때"],
            ["뒤집힌 색", <>흰 바탕, <Code>--ec-text-primary</Code> 글자</>, "주요 버튼처럼 진한 바탕 위"],
          ]}
        />
        <Demo caption="진한 바탕의 버튼 안에서는 뒤집힌 색이 저절로 적용됩니다">
          <Button use="primary" theme="info">승인<Button.Addon><Counter>5</Counter></Button.Addon></Button>
          <Button>필터<Button.Addon><Counter theme="info">3</Counter></Button.Addon></Button>
        </Demo>
        <P>색은 Counter가 붙는 요소와 상황에 따라 고릅니다. 꾸미려고 색을 바꾸지 않습니다.</P>
      </Section>

      <Section title="크기">
        <Demo>
          <Counter size="s">7</Counter>
          <Counter size="m">7</Counter>
          <Counter size="l">7</Counter>
        </Demo>
        <Table
          head={["size", "높이", "글자", "어디에 쓰는가"]}
          rows={[
            [<Code>s</Code>, "16px", "10px", "기본값. M 크기 컨트롤 안"],
            [<Code>m</Code>, "20px", "100 (12px)", "L 크기 컨트롤 안, 이름표 옆"],
            [<Code>l</Code>, "24px", "200 (14px)", "큰 이름표나 제목 옆"],
          ]}
        />
      </Section>

      <Section title="글자로 쓰는 개수">
        <Demo column>
          <Flex alignItems="baseline" gap={2}>
            <Text size={300} bold>승인 대기 문서</Text>
            <Text size={300} color="var(--ec-text-secondary)">1,248</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Tag>거래처 <Text color="var(--ec-text-secondary)">24</Text></Tag>
          </Flex>
        </Demo>
        <Rules
          items={[
            "제목이나 문장 옆의 개수는 상자 없이 글자로만 적습니다.",
            "글자 크기는 붙어 있는 글자와 같게 합니다. 표 제목 옆이면 표 제목과 같은 크기입니다.",
            <>색은 <Code>--ec-text-secondary</Code>로 한 단계 낮춥니다.</>,
            "표 안에서는 태그 안에 글자로 개수를 넣어 데이터를 묶어 보여 줄 수 있습니다.",
            "숫자는 세 자리마다 쉼표를 찍습니다.",
          ]}
        />
      </Section>

      <Section title="위치">
        <P>언제나 붙는 요소의 오른쪽에 둡니다. 개수는 덧붙이는 정보이기 때문입니다.</P>
      </Section>

      <Section title="쓰임새">
        <Table
          head={["쓰임", "설명"]}
          rows={[
            ["결과의 개수", "표나 카드 제목 옆에 전체 건수를 보여 줍니다."],
            ["입력한 양", "입력창과 여러 줄 입력창에서 쓸 수 있는 글자 수를 보여 줍니다. 한도에 다다르거나 넘으면 색이 바뀝니다."],
            ["한도", "쓸 수 있는 양을 넘었을 때 색을 바꿔 알립니다."],
          ]}
        />
        <Sub title="한도를 알리는 색의 흐름">
          <Demo>
            <Counter size="l">42/100</Counter>
            <Counter size="l" theme="warning">100/100</Counter>
            <Counter size="l" theme="danger">104/100</Counter>
          </Demo>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <Button>필터<Button.Addon><Counter theme="info">3</Counter></Button.Addon></Button>,
            text: "글자 오른쪽에 둡니다. 필터에서 고른 수는 파란색으로 보여 줍니다.",
          }}
          bad={{
            demo: <Button><Button.Addon><Counter theme="danger">3</Counter></Button.Addon>필터</Button>,
            text: "글자 앞에 두지 않습니다. 한도와 상관없는 숫자에 빨간색을 쓰지 않습니다.",
          }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["컴포넌트", "쓰임"]}
          rows={[
            ["Counter", "개수 표시."],
            ["Dot", "새 소식이 생겼음을 알릴 때. 새 알림의 수는 Dot 안에 숫자를 넣어 보여 줍니다."],
            ["Tag", "데이터에 이름표를 붙일 때. 안에 글자로 개수를 넣을 수 있습니다."],
          ]}
        />
      </Section>
    </Page>
  );
}

import React from "react";
import { Accordion, Box, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Accordion" };

const items = [
  { value: "basic", title: "기본 정보", body: "거래처 이름, 사업자 번호, 대표자를 적는 영역입니다." },
  { value: "manager", title: "담당자", body: "담당자 이름과 연락처를 적는 영역입니다." },
  { value: "docs", title: "첨부 문서", body: "계약서와 증빙 문서를 올리는 영역입니다." },
];

function Sample({ use, defaultValue, disabledValue }) {
  return (
    <Box w={420}>
      <Accordion use={use} defaultValue={defaultValue}>
        {items.map((item) => (
          <Accordion.Item value={item.value} key={item.value} disabled={item.value === disabledValue}>
            <Accordion.Item.Toggle tag="h3">
              <Accordion.Item.ToggleButton>
                <Accordion.Item.Chevron />
                <Text size={300} ml={2}>{item.title}</Text>
              </Accordion.Item.ToggleButton>
            </Accordion.Item.Toggle>
            <Accordion.Item.Collapse>
              <Box p="12px 24px 24px">{item.body}</Box>
            </Accordion.Item.Collapse>
          </Accordion.Item>
        ))}
      </Accordion>
    </Box>
  );
}

function OneAtATime() {
  const [value, setValue] = React.useState("basic");
  return (
    <Box w={420}>
      <Accordion value={value} onChange={setValue}>
        {items.map((item) => (
          <Accordion.Item value={item.value} key={item.value}>
            <Accordion.Item.Toggle tag="h3">
              <Accordion.Item.ToggleButton>
                <Accordion.Item.Chevron />
                <Text size={300} ml={2}>{item.title}</Text>
              </Accordion.Item.ToggleButton>
            </Accordion.Item.Toggle>
            <Accordion.Item.Collapse>
              <Box p="12px 24px 24px">{item.body}</Box>
            </Accordion.Item.Collapse>
          </Accordion.Item>
        ))}
      </Accordion>
    </Box>
  );
}

export default function AccordionPage() {
  return (
    <Page meta={meta} lead="내용이 많은 영역을 제목만 남기고 접어 두었다가, 제목을 누르면 펼쳐 보여 주는 요소입니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "내용이 많아 한꺼번에 보여 주면 지금 할 일에 집중하기 어려울 때 씁니다. 표의 덧붙인 정보, 큰 카드의 부가 설명이 그런 예입니다.",
            "화면이 좁을 때 씁니다. 휴대폰에서는 아래로 내리는 것 말고는 이동 방법이 마땅치 않으므로, 접어 두면 내려야 할 길이가 줄어듭니다.",
            "접힌 제목들이 페이지의 작은 목차 노릇을 합니다. 사용자가 어떤 정보가 있는지 한눈에 알 수 있습니다.",
            "다른 화면으로 보내는 링크 대신 쓸 수 있습니다. 화면을 떠나지 않고 내용을 볼 수 있습니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>Accordion.Item</Code>, "접었다 펴는 한 칸입니다. value로 칸을 구분합니다."],
            [<Code>Accordion.Item.Toggle</Code>, "누르는 제목 줄입니다. tag로 제목 단계(h2~h6)를 정합니다."],
            [<Code>Accordion.Item.ToggleButton</Code>, "제목 줄 안에서 실제로 눌리는 부분입니다. 화살표와 글자를 이 안에 넣습니다."],
            [<Code>Accordion.Item.Chevron</Code>, "접힘·펼침을 알리는 화살표입니다."],
            [<Code>Accordion.Item.Collapse</Code>, "펼쳤을 때 보이는 내용 영역입니다."],
          ]}
        />
      </Section>

      <Section title="종류">
        <Demo caption="차분한 (use=&quot;secondary&quot;, 기본값)" column>
          <Sample />
        </Demo>
        <Demo caption="강조 (use=&quot;primary&quot;)" column>
          <Sample use="primary" />
        </Demo>
        <Table
          head={["종류", "모양", "언제 쓰는가"]}
          rows={[
            ["차분한", "제목 줄에 바탕이 없습니다. 화살표와 글자만 보입니다.", "카드나 표 안처럼 이미 틀이 있는 자리"],
            ["강조", "제목 줄에 회색 바탕이 깔립니다.", "페이지에서 접는 영역 자체가 주된 구조일 때"],
          ]}
        />
        <Rules
          items={[
            "폭은 정해져 있지 않습니다. 놓이는 자리에 맞춰 정합니다.",
            "제목 줄은 원하는 크기의 링크나 버튼 모양으로 바꿔 쓸 수 있습니다.",
            "제목 줄의 화살표와 글자는 모두 --ec-text-primary 색입니다.",
          ]}
        />
      </Section>

      <Section title="접는 내용">
        <Rules
          items={[
            "글, 표의 덧붙인 정보, 차트가 든 표 전체까지 거의 모든 내용을 접을 수 있습니다.",
            "접힌 영역 안의 제목은 페이지의 주요 제목과 같거나 더 크면 안 됩니다. 위아래 관계가 뒤집혀 보입니다.",
          ]}
        />
      </Section>

      <Section title="상태">
        <Demo caption="셋째 칸은 비활성입니다" column>
          <Sample defaultValue={["basic"]} disabledValue="docs" />
        </Demo>
        <Table
          head={["상태", "모양"]}
          rows={[
            ["기본", "화살표가 오른쪽을 봅니다."],
            ["마우스를 올림", "손 모양 커서로 바뀝니다. 제목 줄에 바탕이 있으면 한 단계 진한 색으로 바뀝니다."],
            ["펼침", "화살표가 90도 돌아 아래를 봅니다. 나머지 모양은 마우스를 올렸을 때와 같습니다."],
            ["비활성", "전체가 흐려지고 눌리지 않습니다."],
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "화살표와 글자는 누르는 영역이 같습니다. 어느 쪽을 눌러도 펼쳐집니다.",
            "한 칸을 펼쳐도 이미 펼친 다른 칸은 닫지 않습니다. 넓은 화면에서 사용자가 기대하는 동작입니다.",
            "휴대폰 화면과 메뉴에서는 새 칸을 펼칠 때 앞서 펼친 칸을 닫습니다. 내려야 할 길이가 줄어듭니다.",
            "휴대폰에서 펼친 내용이 길면, 화면을 내려도 펼친 칸의 제목이 화면 위쪽에 붙어 있게 합니다.",
            "내용이 나타나는 움직임과 화살표가 도는 움직임은 0.35초 동안 부드럽게 이어집니다.",
          ]}
        />
        <Sub title="한 번에 한 칸만 펼치기">
          <Demo column>
            <OneAtATime />
          </Demo>
          <P>
            <Code>value</Code>에 배열이 아닌 값 하나를 주면 한 번에 한 칸만 펼쳐집니다. 배열을 주면 여러 칸을 함께 펼칠 수 있습니다.
          </P>
        </Sub>
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "제목은 짧게 씁니다. \"담당자\", \"첨부 문서\"처럼 안에 든 내용을 가리키는 이름씨로 적습니다.",
            "\"더 보기\", \"자세히\"처럼 무엇이 들었는지 알 수 없는 제목은 쓰지 않습니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "보조 정보를 접어 화면 길이를 줄입니다. 꼭 봐야 하는 내용은 접지 않고 그대로 둡니다." }}
          bad={{ text: "저장 버튼이나 필수 입력창처럼 반드시 써야 하는 것을 접힌 영역 안에 숨기지 않습니다." }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["컴포넌트", "쓰임"]}
          rows={[
            ["Accordion", "덧붙인 정보를 접어 자리와 시간을 아낍니다. 내용이 주인공입니다."],
            ["Dropdown", "덧붙인 기능을 숨겨 둡니다. 누르면 내용이 화면 위에 떠서 나옵니다."],
          ]}
        />
      </Section>
    </Page>
  );
}

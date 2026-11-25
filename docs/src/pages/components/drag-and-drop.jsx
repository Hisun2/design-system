import React from "react";
import { DragAndDrop, Flex, Box, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "DragAndDrop" };

function move(list, from, to) {
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function ColumnList() {
  const [items, setItems] = React.useState(["거래처", "문서 번호", "담당자", "승인 상태"]);
  return (
    <DragAndDrop aria-label="표의 열 순서" onDnD={({ fromIndex, toIndex }) => setItems(move(items, fromIndex, toIndex))}>
      <Flex direction="column" w={240}>
        {items.map((name) => (
          <DragAndDrop.Draggable key={name} placement="left" aria-label={name} py={2} pl={6} pr={3}>
            <Text size={200}>{name}</Text>
          </DragAndDrop.Draggable>
        ))}
      </Flex>
    </DragAndDrop>
  );
}

function CardRow() {
  const [items, setItems] = React.useState(["승인 대기", "이번 달 문서", "신규 거래처"]);
  return (
    <DragAndDrop aria-label="카드 순서" onDnD={({ fromIndex, toIndex }) => setItems(move(items, fromIndex, toIndex))}>
      <Flex gap={4}>
        {items.map((name) => (
          <DragAndDrop.Draggable key={name} placement="top" aria-label={name} w={140} h={80} p={4} style={{ background: "var(--ec-bg-surface)", borderRadius: "var(--ec-radius-card)" }}>
            <Text size={200}>{name}</Text>
          </DragAndDrop.Draggable>
        ))}
      </Flex>
    </DragAndDrop>
  );
}

function Zones() {
  const [placed, setPlaced] = React.useState({ a: "계약서", b: null });
  const onDnD = ({ fromIndex, toIndex }) => {
    const keys = ["a", "b"];
    const from = keys[fromIndex];
    const to = keys[toIndex];
    if (from === to || !placed[from]) return;
    setPlaced({ ...placed, [to]: placed[from], [from]: placed[to] });
  };
  const titles = { a: "검토 중", b: "승인 완료" };
  return (
    <DragAndDrop aria-label="문서 단계 옮기기" onDnD={onDnD}>
      <Flex gap={4}>
        {["a", "b"].map((key) => (
          <DragAndDrop.DropZone key={key} aria-label={titles[key]} w={200} h={96} p={3} style={{ border: "1px dashed var(--ec-border-control)", borderRadius: "var(--ec-radius-control)" }}>
            {placed[key] ? (
              <DragAndDrop.Draggable placement="left" aria-label={placed[key]} py={2} pl={6} pr={3} style={{ background: "var(--ec-bg-surface)" }}>
                <Text size={200}>{placed[key]}</Text>
              </DragAndDrop.Draggable>
            ) : (
              <Text size={200} color="var(--ec-text-secondary)">{titles[key]} 문서를 여기에 놓습니다</Text>
            )}
          </DragAndDrop.DropZone>
        ))}
      </Flex>
    </DragAndDrop>
  );
}

export default function DragAndDropPage() {
  return (
    <Page meta={meta} lead="화면의 요소를 끌어다 다른 자리에 놓는 동작입니다. 순서를 바꾸거나, 다른 묶음으로 옮겨 속성을 바꿀 때 씁니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "가장 흔한 쓰임은 표에 보일 열의 순서를 바꾸는 목록입니다. \"표 설정\", \"열 관리\"라는 이름의 상자에 들어갑니다.",
            "대시보드의 카드 순서를 바꿀 때, 문서를 다른 단계로 옮길 때도 씁니다.",
          ]}
        />
        <P>실제 물건을 집어 옮기는 것을 흉내 낸 동작입니다. 그래서 두 가지를 반드시 지킵니다.</P>
        <Rules
          items={[
            "무엇을 끌 수 있고 어디에 놓을 수 있는지 분명히 보여 줍니다.",
            "끄는 동안에는 지금 옮기는 중이라는 것과 놓을 수 있는 자리를 눈에 보이게 알립니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>DragAndDrop</Code>, "끌 수 있는 요소와 놓는 자리를 함께 담는 틀입니다. 옮긴 결과는 onDnD로 받습니다."],
            [<Code>DragAndDrop.Draggable</Code>, "끌어서 옮기는 요소입니다."],
            [<Code>DragAndDrop.DropZone</Code>, "요소를 놓을 수 있는 자리입니다."],
          ]}
        />
      </Section>

      <Section title="집기">
        <Demo caption="줄에 마우스를 올리면 손잡이가 나옵니다. 끌어서 순서를 바꿉니다" column>
          <ColumnList />
        </Demo>
        <Table
          head={["상태", "모양"]}
          rows={[
            ["기본", "손잡이(점 여섯 개)는 숨어 있습니다."],
            ["마우스를 올림", "손잡이가 나타나고 커서가 펼친 손 모양이 됩니다."],
            ["집음", "커서가 쥔 손 모양이 됩니다. 집은 요소에 그림자가 생겨 떠 있는 것처럼 보입니다."],
          ]}
        />
        <Sub title="손잡이의 위치">
          <Demo gray caption="카드는 위쪽에 가로로 (placement=&quot;top&quot;)">
            <CardRow />
          </Demo>
          <Rules
            items={[
              <>목록의 줄에서는 왼쪽에 세로로 둡니다(<Code>placement="left"</Code>).</>,
              <>카드에서는 위쪽에 가로로 둡니다(<Code>placement="top"</Code>).</>,
              "손잡이가 놓일 자리만큼 안쪽 여백을 비워 둡니다. 글자와 겹치면 안 됩니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="끌기">
        <Rules
          items={[
            "끄는 길은 막지 않습니다. 원래 자리와 놓을 자리 사이 어디로든 자유롭게 움직일 수 있습니다.",
            "끄는 동안 옆의 요소들이 벌어져 놓일 자리를 미리 보여 줍니다.",
          ]}
        />
      </Section>

      <Section title="놓기">
        <Demo caption="문서를 다른 칸으로 끌어다 놓습니다">
          <Zones />
        </Demo>
        <Table
          head={["상태", "모양"]}
          rows={[
            ["기본", <>1px 점선 테두리(<Code>--ec-border-control</Code>). 안에 무엇을 놓을 수 있는지 <Code>--ec-text-secondary</Code> 색 글자로 적습니다. 끄는 것이 없을 때는 마우스를 올려도 바뀌지 않습니다.</>],
            ["다른 곳에서 끌어온 요소가 위에 있음", "놓는 자리의 바탕이 한 단계 진해집니다."],
            ["목록·격자 안에서 순서를 바꿈", <>옆 요소들이 벌어지며 놓을 자리가 그때그때 생깁니다. 그 자리의 바탕은 옅은 회색(<Code>--ec-bg-page</Code> 계열)입니다.</>],
            ["놓을 수 없는 자리 위", "커서가 금지 모양이 됩니다."],
          ]}
        />
      </Section>

      <Section title="키보드">
        <Rules
          items={[
            "마우스 없이도 옮길 수 있어야 합니다. 요소를 선택하고 스페이스로 집은 뒤 화살표로 옮기고, 다시 스페이스로 놓습니다.",
            "Esc를 누르면 옮기던 것을 그만두고 원래 자리로 돌아갑니다.",
            "요소와 놓는 자리마다 aria-label로 이름을 붙입니다. 화면을 읽어 주는 도구가 무엇을 어디로 옮겼는지 말해 줍니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "순서에 뜻이 있고 사용자가 그 순서를 정해야 할 때 씁니다. 옮긴 결과는 바로 반영합니다." }}
          bad={{ text: "끌어 놓기만이 유일한 방법이 되게 하지 않습니다. 삭제나 승인 같은 중요한 동작을 끌어 놓기로만 하게 만들지 않습니다." }}
        />
        <Rules
          items={[
            "끌 수 없는 항목이 섞여 있으면 손잡이를 보여 주지 않습니다.",
            "메뉴 항목을 끌어 옮길 때의 규칙은 DropdownMenu 문서를 봅니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

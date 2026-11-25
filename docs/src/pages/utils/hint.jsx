import React from "react";
import EditM from "@semcore/icon/Edit/m";
import TrashM from "@semcore/icon/Trash/m";
import { Button, Hint, Text, Box, Flex } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "설명 풍선(Hint)", order: 2 };

/** Hint를 직접 붙이는 예: 대상의 ref를 triggerRef로 넘깁니다. */
function HintOn({ label, placement, children }) {
  const ref = React.useRef(null);
  return (
    <>
      <Button ref={ref}>{children}</Button>
      <Hint triggerRef={ref} placement={placement}>{label}</Hint>
    </>
  );
}

export default function HintPage() {
  return (
    <Page meta={meta} lead="요소의 이름이나 가려진 글자를 한 줄로 보여 주는 작은 설명 풍선입니다. Tooltip보다 가볍고, 글자만 담습니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "보이는 글자가 없는 버튼, 링크, 그 밖의 컨트롤에 이름을 알려 줄 때. 아이콘만 있는 버튼이 대표적입니다.",
            "말줄임으로 잘린 글자의 전체 내용을 보여 줄 때.",
          ]}
        />
        <Demo caption="아이콘만 있는 버튼 — aria-label을 주면 설명 풍선이 자동으로 붙습니다">
          <Button addonLeft={EditM} aria-label="수정" />
          <Button addonLeft={TrashM} aria-label="삭제" />
        </Demo>
        <Demo caption="잘린 글자 — 마우스를 올리면 전체 글자가 나옵니다">
          <Box w={200}>
            <Text ellipsis>2026년 하반기 거래처별 납품 일정 정리 문서</Text>
          </Box>
        </Demo>
        <Rules
          items={[
            <>글자 없는 <Code>Button</Code>은 <Code>aria-label</Code>(또는 <Code>title</Code>)에 적은 이름이 설명 풍선으로 나옵니다. 따로 붙일 필요가 없습니다.</>,
            <><Code>Text</Code>에 <Code>ellipsis</Code>를 주면 글자가 잘렸을 때만 설명 풍선이 나옵니다.</>,
            <>그 밖의 요소에 직접 붙일 때는 <Code>Hint</Code>에 대상의 ref를 <Code>triggerRef</Code>로 넘깁니다.</>,
          ]}
        />
      </Section>

      <Section title="위치">
        <Demo caption="placement — 위(기본) / 아래 / 오른쪽">
          <HintOn label="위에 나옵니다">위</HintOn>
          <HintOn label="아래에 나옵니다" placement="bottom">아래</HintOn>
          <HintOn label="오른쪽에 나옵니다" placement="right">오른쪽</HintOn>
        </Demo>
        <Rules
          items={[
            "기본 위치는 대상의 위입니다.",
            <><Code>placement</Code>로 다른 위치를 고를 수 있습니다. 버튼은 <Code>hintPlacement</Code>로 줍니다.</>,
            "설명 풍선이 다른 요소, 특히 사용자가 바로 다음에 볼 내용을 가리지 않는 쪽에 둡니다.",
            "화면 가장자리에서 자리가 모자라면 자동으로 반대쪽에 나옵니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Table
          head={["", "조건"]}
          rows={[
            ["나타남", "대상에 마우스를 올렸을 때, 키보드로 대상에 옮겨 갔을 때"],
            ["사라짐", "마우스가 대상을 벗어났을 때, 대상이 키보드 선택을 잃었을 때, Esc를 눌렀을 때"],
          ]}
        />
        <Rules
          items={[
            "대상이 크면(긴 글자, 넓은 칸) 설명 풍선이 대상의 가운데가 아니라 마우스 가까이에 나옵니다.",
            <>나타나고 사라지기까지 잠깐의 지연이 있습니다. 마우스가 스쳐 지나갈 때 깜빡이지 않게 하기 위함입니다. <Code>timeout</Code>으로 바꿀 수 있지만 기본값을 씁니다.</>,
            "설명 풍선 안으로 마우스를 옮길 수 없습니다. 안에 누를 것을 넣지 않습니다.",
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "요소의 이름을 낱말 하나나 짧은 구로 적습니다(\"수정\", \"삭제\", \"새 창으로 열기\").",
            "문장으로 설명하지 않습니다. 마침표를 찍지 않습니다.",
            "화면에 이미 보이는 글자를 그대로 되풀이하지 않습니다. 잘린 글자의 전체 내용을 보여 주는 경우만 예외입니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <Button addonLeft={EditM} aria-label="수정" />,
            text: "글자 없는 컨트롤에는 반드시 이름을 달아 설명 풍선이 나오게 합니다.",
          }}
          bad={{
            demo: <Button title="문서를 저장합니다">저장</Button>,
            text: "글자가 있는 버튼에 같은 뜻의 설명 풍선을 덧붙이지 않습니다.",
          }}
        />
      </Section>

      <Section title="Tooltip과의 구분">
        <Table
          head={["", "설명 풍선(Hint)", "Tooltip"]}
          rows={[
            ["담는 것", "이름 또는 잘린 글자. 한 줄", "보충 설명. 여러 줄, 굵은 글자, 링크도 가능"],
            ["쓰임", "글자 없는 컨트롤, 말줄임된 글자", "뜻을 풀어 줘야 하는 항목, 비활성인 이유"],
            ["크기", "작음", "큼"],
          ]}
        />
        <P>이름만 알려 주면 되는 자리에는 설명 풍선을, 설명이 필요한 자리에는 Tooltip을 씁니다.</P>
      </Section>
    </Page>
  );
}

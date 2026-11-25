import React from "react";
import { Portal, PortalProvider, Button, Box, Flex, Text, Select } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "화면 맨 위에 그리기(Portal)", order: 5 };

const options = [
  { value: "a", children: "거래처" },
  { value: "b", children: "문서" },
  { value: "c", children: "담당자" },
];

const look = {
  p: 4,
  bg: "var(--ec-bg-surface)",
  border: "1px solid var(--ec-border)",
  borderRadius: "var(--ec-radius-notice)",
};

function PortalDemo({ disablePortal }) {
  const [shown, setShown] = React.useState(false);
  return (
    <Box {...look} overflow="hidden" w={260}>
      <Flex direction="column" gap={2} alignItems="flex-start">
        <Text size={200}>넘치는 부분을 잘라 내는 상자</Text>
        <Button onClick={() => setShown(!shown)}>{shown ? "알림 숨기기" : "알림 보이기"}</Button>
        {shown ? (
          <Portal disablePortal={disablePortal}>
            <Box {...look} position={disablePortal ? undefined : "fixed"} bottom={disablePortal ? undefined : 16} right={disablePortal ? undefined : 16} zIndex={10}>
              <Text size={200}>{disablePortal ? "상자 안에 그려졌습니다." : "문서의 맨 끝에 그려져 화면 오른쪽 아래에 떴습니다."}</Text>
            </Box>
          </Portal>
        ) : null}
      </Flex>
    </Box>
  );
}

function ProviderDemo() {
  const [node, setNode] = React.useState(null);
  return (
    <Box {...look} ref={setNode} w={260}>
      <PortalProvider value={node}>
        <Flex direction="column" gap={2} alignItems="flex-start">
          <Text size={200}>이 상자 안에 목록이 그려집니다</Text>
          <Select options={options} placeholder="대상 고르기" aria-label="대상" />
        </Flex>
      </PortalProvider>
    </Box>
  );
}

export default function PortalPage() {
  return (
    <Page meta={meta} lead="자식 요소를 부모의 자리 대신 문서의 다른 곳(기본은 body의 맨 끝)에 그리는 부품입니다. 드롭다운, 툴팁, 모달처럼 화면 위에 뜨는 것들이 부모에게 잘리거나 가려지지 않게 합니다.">
      <Section title="왜 필요한가">
        <Rules
          items={[
            "뜨는 요소를 부모 안에 그대로 그리면, 부모가 넘치는 부분을 잘라 내거나(스크롤 구역, 표의 칸) 쌓이는 순서가 낮을 때 잘리거나 다른 요소 밑에 깔립니다.",
            "문서의 맨 끝에 그리면 어떤 부모에게도 잘리지 않고 항상 맨 위에 보입니다.",
            "그려지는 자리만 바뀝니다. 컴포넌트의 부모·자식 관계는 그대로여서 사건(event)과 맥락(context)은 원래 부모로 전달됩니다.",
          ]}
        />
      </Section>

      <Section title="언제 쓰는가">
        <Rules
          items={[
            "대부분 직접 쓰지 않습니다. Modal, Dropdown, Select, Tooltip, 띄우는 상자(Popper)가 이미 안에서 쓰고 있습니다.",
            "직접 쓰는 것은 뜨는 요소를 새로 만들 때입니다.",
            "더 자주 하는 일은 이미 있는 컴포넌트가 어디에 그려질지를 바꾸는 것입니다. 아래의 두 가지 방법을 씁니다.",
          ]}
        />
      </Section>

      <Section title="기본 동작">
        <Demo caption="버튼을 누르면 알림이 상자 밖, 화면 오른쪽 아래에 나옵니다">
          <PortalDemo />
        </Demo>
        <P>
          <Code>Portal</Code>로 감싼 내용은 body의 맨 끝에 그려집니다. 위 예에서 알림은 넘치는 부분을 잘라 내는 상자 안에 적혀 있지만 잘리지 않습니다.
        </P>
      </Section>

      <Section title="그려지는 곳 바꾸기">
        <Sub title="제자리에 그리기 (disablePortal)">
          <Demo caption="disablePortal — 부모 안에 그대로 그립니다">
            <PortalDemo disablePortal />
          </Demo>
          <Rules
            items={[
              <><Code>disablePortal</Code>을 주면 옮기지 않고 부모 옆에 그대로 그립니다.</>,
              <>뜨는 컴포넌트들도 이 속성을 받습니다. 예: 모달 안의 선택 상자에 <Code>{"<Select disablePortal />"}</Code>.</>,
              "기준 요소가 따로 스크롤되는 구역 안에 있어, 뜨는 요소가 그 구역과 함께 움직여야 할 때 씁니다.",
              "제자리에 그리면 부모에게 잘릴 수 있습니다. 잘리지 않는지 확인합니다.",
            ]}
          />
        </Sub>
        <Sub title="정한 요소 안에 그리기 (PortalProvider)">
          <Demo caption="선택 상자의 목록이 body가 아니라 이 상자 안에 그려집니다">
            <ProviderDemo />
          </Demo>
          <Rules
            items={[
              <><Code>PortalProvider</Code>의 <Code>value</Code>에 요소(또는 그 ref)를 주면, 그 아래의 모든 Portal이 body 대신 그 요소 안에 그려집니다.</>,
              "모달 안의 선택 상자·드롭다운을 모달 안에 그리게 할 때 씁니다. 모달의 키보드 가두기와 쌓이는 순서 안에 함께 들어갑니다.",
              "컴포넌트 하나하나에 disablePortal을 주는 대신, 구역 전체에 한 번만 정할 수 있습니다.",
              <>Portal 하나만 다른 곳에 그리려면 <Code>nodeToMount</Code>에 요소를 줍니다.</>,
            ]}
          />
        </Sub>
      </Section>

      <Section title="속성">
        <Table
          head={["속성", "뜻"]}
          rows={[
            [<Code>disablePortal</Code>, "옮기지 않고 부모 자리에 그대로 그립니다."],
            [<Code>nodeToMount</Code>, "내용을 그릴 요소를 직접 정합니다."],
            [<Code>ignorePortalsStacking</Code>, "Portal 안의 Portal은 기본으로 바깥 Portal 안에 그려집니다. 이것을 주면 그 관계를 끊고 body에 바로 그립니다."],
            [<Code>onMount</Code>, "내용이 그려졌는지 여부가 바뀔 때 불립니다."],
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "뜨는 요소가 잘리거나 가려지면 먼저 그려지는 곳을 확인하고, PortalProvider나 disablePortal로 바로잡습니다." }}
          bad={{ text: "쌓이는 순서(z-index) 숫자를 크게 올려 해결하지 않습니다. 화면마다 숫자 경쟁이 생깁니다." }}
        />
      </Section>
    </Page>
  );
}

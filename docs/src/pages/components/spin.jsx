import React from "react";
import { Spin, Box, Flex, Text } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Spin" };

export default function SpinPage() {
  return (
    <Page meta={meta} lead="요소 하나가 값을 기다리는 중임을 알리는 도는 고리입니다. 표의 칸, 버튼, 입력창처럼 작은 자리에 씁니다. 표·폼·카드 전체를 기다릴 때는 SpinContainer를 씁니다.">
      <Section title="종류와 색">
        <Demo caption="기본 — 밝은 바탕">
          <Spin />
        </Demo>
        <Demo caption="theme=&quot;invert&quot; — 어둡거나 색이 있는 바탕">
          <Box p={4} bg="var(--ec-brand-navy)">
            <Spin theme="invert" />
          </Box>
        </Demo>
        <Rules
          items={[
            "색은 이 두 가지만 씁니다. 상태색이나 다른 색을 입히지 않습니다.",
            "어두운 바탕 위에서는 반드시 invert를 씁니다. 기본 색은 묻혀서 보이지 않습니다.",
          ]}
        />
      </Section>

      <Section title="크기">
        <Demo caption="XS / S / M(기본) / L / XL / XXL">
          <Flex gap={6} alignItems="center">
            <Spin size="xs" />
            <Spin size="s" />
            <Spin size="m" />
            <Spin size="l" />
            <Spin size="xl" />
            <Spin size="xxl" />
          </Flex>
        </Demo>
        <Table
          head={["크기", "쓰는 자리"]}
          rows={[
            ["XS", "버튼, 입력창, 탭의 개수 자리처럼 컨트롤 안"],
            ["S · M", "표의 칸, 작은 카드, 글자 옆"],
            ["L · XL", "카드와 영역의 가운데"],
            ["XXL", "표 전체, 페이지 전체 (SpinContainer의 기본 크기)"],
          ]}
        />
      </Section>

      <Section title="글자와 함께 쓰기">
        <Demo caption="글자를 오른쪽에 — 작은 영역">
          <Flex gap={2} alignItems="center">
            <Spin size="xs" />
            <Text size={200} color="text-secondary">불러오는 중…</Text>
          </Flex>
        </Demo>
        <Demo caption="글자를 아래에 — 큰 영역">
          <Flex direction="column" gap={2} alignItems="center">
            <Spin size="xl" />
            <Text size={200} color="text-secondary">문서를 불러오는 중…</Text>
          </Flex>
        </Demo>
        <Rules
          items={[
            <>글자 색은 <Code>--ec-text-secondary</Code>입니다. 화면의 주된 내용이 아니라 보조 안내이기 때문입니다.</>,
            "글자 크기는 14px(크기 번호 200) 이상으로 합니다.",
            "작은 요소·영역·카드에서는 글자를 고리 오른쪽에 둡니다.",
            "큰 영역이나 여러 요소를 묶은 영역에서는 글자를 고리 아래에 두고, 고리는 M 이상 네 가지 크기(M, L, XL, XXL) 가운데에서 고릅니다.",
            "영역 안에서 고리를 어디에 둘지는 SpinContainer의 규칙을 따릅니다.",
          ]}
        />
      </Section>

      <Section title="움직임">
        <P>고리는 300ms에 걸쳐 부드럽게 나타나고 사라집니다(ease-out). 금방 끝나는 일에서 고리가 깜빡이지 않게 하기 위함입니다.</P>
      </Section>

      <Section title="쓰는 법">
        <Rules
          items={[
            "고리는 얼마나 기다려야 하는지 짐작하게 돕는 표시입니다. 걸리는 시간을 알 수 없으면 \"불러오는 중…\"처럼 지금 무슨 일을 하는지 글자로 함께 적습니다.",
            "걸리는 시간을 알 수 있고 5초가 넘으면 ProgressBar를 씁니다.",
            <>부모 영역 가운데에 놓으려면 <Code>centered</Code>를 줍니다.</>,
          ]}
        />
        <DoDont
          good={{
            demo: (
              <Flex gap={2} alignItems="center">
                <Spin size="xs" />
                <Text size={200} color="text-secondary">거래처 목록을 불러오는 중…</Text>
              </Flex>
            ),
            text: "무엇을 기다리는지 글자로 함께 알립니다.",
          }}
          bad={{
            demo: (
              <Flex gap={4} alignItems="center">
                <Spin size="xs" />
                <Spin size="xs" />
                <Spin size="xs" />
              </Flex>
            ),
            text: "한 영역 안에 고리를 여러 개 돌리지 않습니다. 영역 전체를 SpinContainer 하나로 덮습니다.",
          }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["상황", "쓸 것"]}
          rows={[
            ["작은 요소 하나를 기다릴 때", "Spin"],
            ["표·폼·카드 전체를 다시 불러올 때", "SpinContainer"],
            ["영역을 처음 불러올 때", "Skeleton"],
            ["버튼을 누른 뒤 처리 중일 때", <>Button의 <Code>loading</Code></>],
            ["진행 정도를 알 수 있을 때", "ProgressBar"],
          ]}
        />
      </Section>
    </Page>
  );
}

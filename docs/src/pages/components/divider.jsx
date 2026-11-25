import React from "react";
import { Divider, Button, Text, Flex, Box } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Divider" };

export default function DividerPage() {
  return (
    <Page meta={meta} lead="내용이나 컴포넌트 사이를 가르는 선입니다. 눈으로 보기에도, 뜻으로도 앞뒤가 다른 묶음임을 알립니다.">
      <Section title="종류">
        <Demo caption="실선 (use=&quot;primary&quot;, 기본값)" column>
          <Box w={360}><Divider /></Box>
        </Demo>
        <Demo caption="점선 (use=&quot;secondary&quot;)" column>
          <Box w={360}><Divider use="secondary" /></Box>
        </Demo>
        <Table
          head={["종류", "언제 쓰는가"]}
          rows={[
            ["실선", "앞뒤 내용을 분명히 가를 때."],
            ["점선", "가르기는 하되 앞뒤가 서로 이어진 내용임을 보여 줄 때."],
          ]}
        />
      </Section>

      <Section title="색">
        <Demo caption="밝은 바탕 (기본) / 어두운 바탕 (theme=&quot;invert&quot;)">
          <Box w={200} p={4}><Divider /></Box>
          <Box w={200} p={4} style={{ background: "var(--ec-brand-navy)", borderRadius: "var(--ec-radius-control)" }}>
            <Divider theme="invert" />
          </Box>
        </Demo>
        <Rules
          items={[
            <>밝은 바탕에서는 기본 색을 씁니다. 선 색은 <Code>--ec-border</Code>입니다.</>,
            <>어두운 바탕이나 색 바탕에서는 <Code>theme="invert"</Code>로 뒤집습니다.</>,
            "선에 다른 색을 칠하지 않습니다.",
          ]}
        />
      </Section>

      <Section title="방향">
        <Demo caption="가로 (기본)" column>
          <Box w={360}>
            <Text size={200}>거래처 정보</Text>
            <Divider my={3} />
            <Text size={200}>담당자 정보</Text>
          </Box>
        </Demo>
        <Demo caption="세로 (orientation=&quot;vertical&quot;)">
          <Flex alignItems="center" h={32}>
            <Button use="tertiary" theme="muted">수정</Button>
            <Divider orientation="vertical" mx={2} />
            <Button use="tertiary" theme="muted">삭제</Button>
          </Flex>
        </Demo>
        <Rules
          items={[
            "가로 선은 놓인 자리의 폭을 모두 채웁니다.",
            "세로 선은 놓인 줄의 높이를 따릅니다. 나란히 놓인 컨트롤 묶음 사이에 씁니다.",
            "선 앞뒤 여백은 4px의 배수로 하고, 양쪽을 같게 둡니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <Table
          head={["경우", "쓰는 선"]}
          rows={[
            ["입력 폼과 그 옆의 연락처 안내처럼 서로 다른 내용을 가를 때", "실선"],
            ["입력 폼과 그 폼이 만드는 문서의 요약처럼, 나누되 서로 이어져 있음을 보여 줄 때", "점선"],
          ]}
        />
        <DoDont
          good={{ text: "여백만으로 구분이 안 될 때 씁니다. 먼저 간격을 넓혀 보고, 그래도 모자라면 선을 넣습니다." }}
          bad={{ text: "목록의 줄마다, 카드마다 선을 넣지 않습니다. 선이 많으면 화면이 잘게 쪼개져 보입니다." }}
        />
        <P>선은 꾸밈이 아닙니다. 화면을 읽어 주는 도구도 구분 선으로 알려 주므로, 뜻이 갈리는 자리에만 씁니다.</P>
      </Section>
    </Page>
  );
}

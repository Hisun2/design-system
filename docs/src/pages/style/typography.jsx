import React from "react";
import { Text, List, Flex } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "타이포그래피", order: 3 };

export default function TypographyPage() {
  return (
    <Page meta={meta} lead="글꼴, 글자 크기, 굵기의 기준입니다. 글자를 넣을 때는 Text 컴포넌트를 쓰고 크기는 번호로 고릅니다.">
      <Section title="글꼴">
        <Rules
          items={[
            "글꼴은 Spoqa Han Sans Neo 하나만 씁니다. 패키지에 들어 있어 따로 설치하지 않습니다.",
            "굵기는 400(본문), 500(버튼·태그·큰 숫자), 700(제목) 세 가지입니다. 이 글꼴에는 600이 없습니다.",
            "자주 쓰지 않는 글자는 글꼴 파일에 없어 맑은 고딕으로 표시될 수 있습니다.",
            "표와 지표의 숫자는 자릿수가 세로로 맞도록 폭이 같은 숫자로 표시됩니다(기본 설정).",
          ]}
        />
      </Section>

      <Section title="크기">
        <P>
          번호가 클수록 큽니다. 컴포넌트에 <Code>size={"{500}"}</Code>처럼 번호를 주면 그 크기와 줄 높이가 함께 적용됩니다.
        </P>
        <Table
          head={["보기", "번호", "크기 / 줄 높이", "쓰는 곳"]}
          rows={[
            [<Text size={800} medium>1,234</Text>, "800", "48 / 56", "가장 큰 숫자. 드물게"],
            [<Text size={700} medium>1,234</Text>, "700", "36 / 40", "가장 중요한 지표 숫자"],
            [<Text size={600} medium>1,234</Text>, "600", "32 / 40", "지표 숫자"],
            [<Text size={500} bold>페이지 제목</Text>, "500", "24 / 28", "페이지 제목. 화면당 하나"],
            [<Text size={400} bold>섹션 제목</Text>, "400", "20 / 24", "섹션 제목"],
            [<Text size={350} bold>작은 제목</Text>, "350", "18 / 24", "필요할 때만"],
            [<Text size={300} bold>카드 제목</Text>, "300", "16 / 24", "카드 제목, 큰 입력창과 큰 버튼"],
            [<Text size={200}>본문 글자입니다</Text>, "200", "14 / 20", "본문 기본. 표, 입력창, 버튼"],
            [<Text size={100} color="text-secondary">보조 설명입니다</Text>, "100", "12 / 16", "보조 설명, 차트 눈금, 배지"],
          ]}
        />
      </Section>

      <Section title="제목">
        <Rules
          items={[
            "제목 전용 컴포넌트는 없습니다. Text에 크기와 굵기를 주고 tag로 제목 단계(h1~h4)를 정합니다.",
            "한 화면에서 제목은 네 단계까지만 씁니다.",
            "제목 단계는 글자 크기가 아니라 내용의 구조로 정합니다. 크게 보이고 싶다고 단계를 올리지 않습니다.",
            "16px 이하의 제목은 굵게(700) 써서 본문과 구분합니다.",
          ]}
        />
        <Demo column>
          <Text tag="h1" size={500} bold m={0}>거래처 관리</Text>
          <Text tag="h2" size={400} bold m={0}>기본 정보</Text>
          <Text tag="h3" size={300} bold m={0}>담당자</Text>
          <Text tag="p" size={200} m={0}>본문은 14px로 씁니다.</Text>
        </Demo>
      </Section>

      <Section title="문단과 목록">
        <Rules
          items={[
            "본문은 200(14px)을 씁니다. 100(12px)은 본문에 쓰지 않습니다.",
            "한 줄이 너무 길면 읽기 어렵습니다. 문단의 폭은 800px를 넘기지 않습니다.",
            "문단 아래 여백은 16px 글자에 16px, 14px 글자에 12px, 12px 글자에 8px입니다.",
            "순서가 없는 나열은 점 목록, 순서가 있는 절차는 번호 목록을 씁니다.",
          ]}
        />
        <Demo column>
          <List>
            <List.Item>항목 하나</List.Item>
            <List.Item>항목 둘</List.Item>
          </List>
        </Demo>
      </Section>

      <Section title="글자색">
        <Rules
          items={[
            <>기본은 <Code>text-primary</Code>, 덜 중요한 정보는 <Code>text-secondary</Code>입니다.</>,
            "제목 옆의 개수나 단위처럼 곁들이는 정보는 같은 크기에 보조 글자색을 씁니다.",
            "글자에 색을 넣는 것은 링크와 상태(성공·오류·주의)뿐입니다. 강조하려고 색을 쓰지 않습니다. 강조는 굵기로 합니다.",
          ]}
        />
        <Demo>
          <Flex gap={1} alignItems="baseline">
            <Text size={400} bold>거래처</Text>
            <Text size={400} color="text-secondary">12,457</Text>
          </Flex>
        </Demo>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <Text size={200}>승인 대기 중인 문서가 <Text bold>3건</Text> 있습니다.</Text>,
            text: "강조는 굵기로 합니다.",
          }}
          bad={{
            demo: <Text size={200}>승인 대기 중인 문서가 <Text color="text-critical">3건</Text> 있습니다.</Text>,
            text: "오류가 아닌데 빨간 글자를 쓰지 않습니다. 빨강은 문제가 있다는 뜻입니다.",
          }}
        />
      </Section>
    </Page>
  );
}

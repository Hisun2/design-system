import React from "react";
import { MiniChart } from "@ec21rnc/ui/chart";
import { Flex, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "작은 차트", order: 22 };

// 추세 차트는 값을 차트 높이에 대한 비율(0~100)로 받습니다. 자동으로 맞춰 주지 않으므로 가장 큰 값이 90이 되게 바꿔 넣습니다.
const toHeight = (values) => values.map((value) => Math.round((value / Math.max(...values)) * 90));
const trend = toHeight([12, 15, 14, 19, 17, 22, 21, 26, 24, 29]);
const weekdays = toHeight([4, 7, 5, 9, 6, 11, 8]);
const bars = weekdays.map((value) => ({ value, color: "var(--ec-chart-1)" }));
const histogram = toHeight([3, 5, 4, 6, 8, 7, 9, 12, 10, 13, 11, 14]).map((value) => ({ value, color: "var(--ec-chart-1)" }));
const peak = weekdays.map((value) => ({ value, color: value === 90 ? "var(--ec-chart-7)" : "var(--ec-chart-1)" }));

export default function MiniChartPage() {
  return (
    <Page meta={meta} lead="숫자 하나 또는 짧은 숫자 목록을 글자 옆에 작게 그려 주는 차트입니다. 표의 칸이나 요약 카드에서 값이 어떻게 변했는지, 어느 수준인지를 한눈에 훑어보게 할 때 씁니다.">
      <Section title="종류">
        <Table
          head={["종류", "쓰임"]}
          rows={[
            ["추세 (Trend)", "숫자 목록으로 변화의 흐름을 보여 줍니다."],
            ["점수 (Score)", "값 하나가 전체에서 어느 정도인지 보여 줍니다. 비율(%)이나 단계로 좋고 나쁨, 높고 낮음을 나타냅니다."],
          ]}
        />

        <Sub title="추세">
          <Demo caption="TrendLine / TrendArea / TrendBar / TrendHistogram">
            <MiniChart.TrendLine data={trend} w={120} h={32} aria-label="접수 건수 추세, 꺾은선" />
            <MiniChart.TrendArea data={trend} w={120} h={32} aria-label="접수 건수 추세, 영역" />
            <MiniChart.TrendBar data={bars} w={120} h={32} aria-label="요일별 접수 건수, 막대" />
            <MiniChart.TrendHistogram data={histogram} w={120} h={32} aria-label="월별 접수 건수, 히스토그램" />
          </Demo>
          <Table
            head={["컴포넌트", "언제 쓰는가"]}
            rows={[
              [<Code>MiniChart.TrendLine</Code>, "값이 많은 데이터의 전체 흐름"],
              [<Code>MiniChart.TrendArea</Code>, "값이 많은 데이터의 전체 흐름. 선만으로는 눈에 덜 띄어 더 도드라지게 해야 할 때"],
              [<Code>MiniChart.TrendBar</Code>, "값이 적은 데이터(예: 요일 7개)의 흐름"],
              [<Code>MiniChart.TrendHistogram</Code>, "값이 많은 데이터를 막대로 촘촘하게"],
            ]}
          />
          <Demo caption="가장 높은 값 강조">
            <MiniChart.TrendBar data={peak} w={120} h={32} aria-label="요일별 접수 건수, 가장 많은 날 강조" />
          </Demo>
          <P>
            추세 차트의 값은 차트 높이에 대한 비율(0~100)로 넣습니다. 차트가 값의 범위를 알아서 맞추지 않으므로, 건수 같은 원래 값을 그대로 넣으면 납작하게 그려집니다. 가장 큰 값이 90~100이 되게 바꿔 넣습니다.
          </P>
          <P>
            필요하면 가장 높은 값이나 가장 낮은 값을 진한 색으로 표시합니다. 막대는 항목마다 <Code>color</Code>를, 선은 마지막 점의 색(<Code>lastPointColor</Code>)을 줄 수 있습니다.
          </P>
        </Sub>

        <Sub title="점수">
          <Demo caption="ScoreDonut / ScoreSemiDonut / ScoreLine / ScoreLine (단계)">
            <MiniChart.ScoreDonut value={72} w={40} h={40} aria-label="처리율 72%" />
            <MiniChart.ScoreSemiDonut value={72} w={56} h={28} aria-label="처리율 72%" />
            <MiniChart.ScoreLine value={72} w={120} aria-label="처리율 72%" />
            <MiniChart.ScoreLine value={3} segments={5} w={120} aria-label="다섯 단계 중 3단계" />
          </Demo>
          <Table
            head={["컴포넌트", "모양", "언제 쓰는가"]}
            rows={[
              [<Code>MiniChart.ScoreDonut</Code>, "고리", "값을 가장 눈에 띄게 할 때. 요약 카드의 대표 숫자 옆"],
              [<Code>MiniChart.ScoreSemiDonut</Code>, "반쪽 고리(계기판)", "높이가 낮은 자리에서 고리 모양을 쓰고 싶을 때"],
              [<Code>MiniChart.ScoreLine</Code>, "가로 막대", "표의 칸처럼 높이가 거의 없는 자리. segments를 주면 단계로 끊어 표시"],
            ]}
          />
          <P>셋 중 무엇을 쓸지는 그 값이 화면에서 얼마나 눈에 띄어야 하는지와 남은 자리의 크기로 정합니다.</P>
        </Sub>
      </Section>

      <Section title="색">
        <Rules
          items={[
            <>기본색은 <Code>--ec-chart-1</Code>입니다. 한 화면의 작은 차트는 모두 같은 색으로 맞춥니다.</>,
            <>막대(<Code>TrendBar</Code>, <Code>TrendHistogram</Code>)는 색을 주지 않으면 회색으로 그려집니다. 항목마다 <Code>color</Code>를 줍니다.</>,
            <>색을 바꿀 때는 <Code>color</Code>에 차트 색 토큰을 번호 순서대로 줍니다.</>,
            "좋고 나쁨을 색으로 나타낼 때는 상태 색 규칙을 따르고, 숫자나 글자를 반드시 함께 적습니다. 색만으로 뜻을 전하지 않습니다.",
          ]}
        />
      </Section>

      <Section title="크기">
        <Demo caption="w, h로 크기를 정하면 차트가 그 크기에 맞춰 그려집니다">
          <MiniChart.TrendLine data={trend} w={80} h={24} aria-label="추세, 작게" />
          <MiniChart.TrendLine data={trend} w={160} h={40} aria-label="추세, 크게" />
          <MiniChart.ScoreDonut value={72} w={24} h={24} aria-label="처리율 72%, 작게" />
          <MiniChart.ScoreDonut value={72} w={56} h={56} aria-label="처리율 72%, 크게" />
        </Demo>
        <Rules
          items={[
            "종류마다 기본 크기가 있습니다. 자리에 맞춰 w, h를 주면 그 크기로 늘거나 줄어듭니다.",
            "표 안에서는 줄 높이를 넘지 않게 합니다.",
            "같은 열, 같은 카드 묶음 안에서는 크기를 통일합니다.",
          ]}
        />
      </Section>

      <Section title="글자와 함께 쓰기">
        <Demo>
          <Flex alignItems="center" gap={2}>
            <Text size={500} medium>1,284</Text>
            <MiniChart.TrendLine data={trend} w={96} h={28} aria-label="접수 건수 추세" />
          </Flex>
          <Flex alignItems="center" gap={2}>
            <MiniChart.ScoreDonut value={72} w={32} h={32} aria-label="처리율" />
            <Text size={300} medium>72%</Text>
          </Flex>
        </Demo>
        <Rules
          items={[
            "작은 차트 옆에 값을 숫자로 함께 적습니다. 글자 크기는 자리에 맞게 고릅니다.",
            "차트와 글자 사이 간격은 4px의 배수(4, 8, 12px)입니다.",
            "작은 차트에는 축, 눈금, 범례, 설명 상자가 없습니다. 정확한 값은 옆의 숫자가 전합니다.",
            <>화면을 읽어 주는 도구를 위해 <Code>aria-label</Code>에 무엇의 차트인지 적습니다.</>,
          ]}
        />
      </Section>

      <Section title="상태">
        <Demo caption="기본 / 값이 모두 0 / 값 없음 / 불러오는 중">
          <MiniChart.TrendLine data={trend} w={120} h={32} aria-label="추세" />
          <MiniChart.TrendLine data={[0, 0, 0, 0, 0]} w={120} h={32} aria-label="값이 모두 0인 추세" />
          <Text size={200} color="var(--ec-text-secondary)">값 없음</Text>
          <MiniChart.TrendLine data={trend} loading w={120} h={32} aria-label="추세 불러오는 중" />
        </Demo>
        <Table
          head={["상태", "보여 주는 것"]}
          rows={[
            ["기본", "차트와 값"],
            ["값이 모두 0", "0 높이에 붙은 선. 0은 데이터이며 \"값 없음\"과 다릅니다."],
            ["값 없음", "차트를 그리지 않고 값 자리에 \"값 없음\" 글자만 적습니다."],
            ["처음 불러오는 중", <>차트 대신 회색 자리 표시. <Code>loading</Code>을 줍니다.</>],
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Flex alignItems="center" gap={2}>
                <Text size={200}>접수 1,284건</Text>
                <MiniChart.TrendLine data={trend} w={80} h={24} aria-label="접수 건수 추세" />
              </Flex>
            ),
            text: "숫자를 함께 적고, 작은 차트는 흐름만 보여 줍니다.",
          }}
          bad={{
            demo: <MiniChart.TrendLine data={trend} w={80} h={24} aria-label="접수 건수 추세" />,
            text: "작은 차트만 두지 않습니다. 정확한 값을 읽어야 하는 자리에는 일반 차트나 표를 씁니다.",
          }}
        />
      </Section>
    </Page>
  );
}

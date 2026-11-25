import React from "react";
import { Flex, Text, BarChartSkeleton } from "@ec21rnc/ui";
import { Chart } from "@ec21rnc/ui/chart";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "누적 가로 막대 차트", order: 16 };

// 가로로 그릴 때 Chart.Bar는 데이터의 첫 항목을 맨 아래에 놓습니다. 합계가 큰 항목이 위로 오도록 작은 것부터 적습니다.
const teams = [
  { 부서: "인사", 승인: 90, 검토: 35, 반려: 15 },
  { 부서: "재무", 승인: 150, 검토: 40, 반려: 20 },
  { 부서: "구매", 승인: 240, 검토: 80, 반려: 40 },
  { 부서: "영업", 승인: 320, 검토: 110, 반려: 50 },
];
const steps = [
  { 부서: "재무", "3일 이내": 58, "7일 이내": 25, "14일 이내": 12, "14일 초과": 5 },
  { 부서: "구매", "3일 이내": 35, "7일 이내": 30, "14일 이내": 22, "14일 초과": 13 },
  { 부서: "영업", "3일 이내": 42, "7일 이내": 31, "14일 이내": 18, "14일 초과": 9 },
];
const stepColors = { "3일 이내": "var(--ec-chart-13)", "7일 이내": "var(--ec-chart-1)", "14일 이내": "var(--ec-chart-7)", "14일 초과": "var(--ec-chart-19)" };
const many = teams.map((row, i) => ({ ...row, 보류: 30 + i * 4, 회수: 22 + i * 3, 취소: 18 + i * 2, 만료: 12 + i, 이관: 9 + i }));
const zeros = teams.slice(1).map((row) => ({ 부서: row.부서, 승인: 0, 검토: 0, 반려: 0 }));
const missing = [
  { 부서: "재무", 승인: 150, 검토: null, 반려: 20 },
  { 부서: "구매", 승인: null, 검토: null, 반려: null },
  { 부서: "영업", 승인: 320, 검토: 110, 반려: 50 },
];
const count = (v) => `${Number(v).toLocaleString("ko-KR")}건`;
const percent = (v) => `${v}%`;

export default function StackedHorizontalBarChartPage() {
  return (
    <Page meta={meta} lead="항목마다 여러 계열의 값을 가로로 누운 한 막대에 쌓아 그린 차트입니다. 항목 이름이 길 때 합계와 구성 비중을 함께 보여 줍니다.">
      <Section title="언제 쓰는가">
        <Demo caption="부서별 문서 처리 결과 (invertAxis, type=&quot;stack&quot;)" column>
          <Chart.Bar data={teams} groupKey="부서" invertAxis type="stack" showTotalInTooltip tooltipValueFormatter={count} plotWidth={560} plotHeight={220} aria-label="부서별 문서 처리 결과" />
        </Demo>
        <Rules
          items={[
            "계열이 셋 이상이라 묶음 막대로는 줄이 너무 많아질 때 씁니다.",
            "부분이 전체에서 얼마를 차지하는지 보여 줄 때 씁니다. 계열을 더한 값에 뜻이 있어야 합니다.",
            "조각이 읽힐 만큼 차트를 크게 그립니다.",
            "항목은 10개 미만으로 합니다. 항목마다 이름을 적어야 하거나 정해진 순서로 보여 줄 때 씁니다.",
            "추이나 시간에 따른 값에는 쓰지 않습니다. 누적 막대 차트(세로)나 누적 영역 차트를 씁니다.",
            "한 항목에 값이 하나뿐이면 가로 막대 차트, 그 합이 100%면 촘촘한 가로 막대 차트를 씁니다.",
          ]}
        />
      </Section>

      <Section title="모양과 여백">
        <Table
          head={["자리", "여백"]}
          rows={[
            ["차트의 위와 아래", "8px"],
            ["항목 이름과 막대 사이", "16px"],
            ["막대와 그 값 사이", "8px"],
            ["항목과 항목 사이", "20px 이상"],
            ["조각 사이", "띄우지 않고 붙여 쌓습니다."],
          ]}
        />
        <Rules
          items={[
            <><Code>Chart.Bar</Code>에 <Code>invertAxis</Code>와 <Code>type="stack"</Code>을 함께 줍니다.</>,
            <>막대의 굵기는 <Code>maxBarSize</Code>(기본 12px)를 넘지 않습니다. 조각을 읽기 어려우면 이 값을 키웁니다.</>,
            "차트의 높이는 항목 수에 맞춥니다. 항목이 늘어도 줄 사이가 좁아지지 않게 높이를 늘립니다.",
          ]}
        />
      </Section>

      <Section title="색">
        <Demo caption="순서가 있는 계열은 한 색의 밝기 단계로 칠합니다" column>
          <Chart.Bar data={steps} groupKey="부서" invertAxis type="stack" colorMap={stepColors} showXAxis={false} tooltipValueFormatter={percent} plotWidth={560} plotHeight={180} aria-label="부서별 처리 기간 비중" />
        </Demo>
        <Rules
          items={[
            <>붙어 있는 조각끼리 뚜렷이 구분되는 색을 씁니다. <Code>--ec-chart-1</Code>부터 순서대로 칠하면 됩니다.</>,
            "색이 너무 많아지지 않게 합니다. 계열은 6개까지이고, 넘으면 작은 계열을 \"기타\"로 묶어 맨 끝에 회색으로 쌓습니다.",
            "계열에 순서가 있으면(짧음→김, 낮음→높음) 한 색의 밝기 단계로 칠하는 것이 잘 읽힙니다.",
            "모든 막대에서 쌓는 순서가 같아야 합니다. 가장 중요한 계열을 축 쪽(왼쪽)에 둡니다.",
          ]}
        />
      </Section>

      <Section title="축과 보조선">
        <Rules
          items={[
            "모든 막대의 합이 100%인 비중이면 값 축과 보조선을 뺍니다.",
            "건수, 금액처럼 합이 막대마다 다르면 값 축과 세로 보조선을 둡니다. 가로 보조선은 넣지 않습니다.",
            "값 축은 0에서 시작합니다.",
            "항목 이름과 값을 적을 자리를 차트 양옆에 남겨 둡니다.",
          ]}
        />
      </Section>

      <Section title="항목 이름과 범례">
        <Rules
          items={[
            <>항목 이름의 글자색은 <Code>--ec-text-primary</Code>입니다. 왼쪽으로 맞춥니다.</>,
            "이름이 자리보다 길면 말줄임표로 줄이고, 마우스를 올리면 전체 이름을 설명 풍선으로 보여 줍니다.",
            "계열이 여럿이므로 범례를 항상 둡니다. 범례의 순서는 쌓은 순서(왼쪽→오른쪽)와 같게 합니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            <>막대에 마우스를 올리면 그 줄에 옅은 바탕(<Code>--ec-overlay-hover</Code>)이 깔립니다. 지금 보고 있는 항목과 누를 수 있음을 알립니다.</>,
            "바탕은 막대 위아래로 항목 사이 여백의 절반씩을 덮습니다.",
            <>설명 상자에는 그 항목의 모든 계열 값을 보여 줍니다. <Code>showTotalInTooltip</Code>으로 합계를 함께 보여 줍니다.</>,
            "범례에서 계열을 끄면 나머지 조각이 다시 쌓입니다.",
            <>조각을 눌러 상세 화면으로 가게 하려면 <Code>onClickBar</Code>를 씁니다.</>,
          ]}
        />
      </Section>

      <Section title="예외 상황">
        <Sub title="항목이 더 없을 때">
          <Demo column>
            <Chart.Bar data={teams.slice(2)} groupKey="부서" invertAxis type="stack" showXAxis={false} marginX={0} showLegend={false} plotWidth={480} plotHeight={100} aria-label="항목이 둘뿐인 누적 가로 막대 차트" />
            <Flex mt={8}>
              <Text color="text-secondary">더 이상 결과가 없습니다</Text>
            </Flex>
          </Demo>
          <P>
            정해진 줄 수보다 항목이 적으면 마지막 값 아래 32px(<Code>--ec-spacing-8x</Code>)를 띄워 "더 이상 결과가 없습니다"라고 <Code>--ec-text-secondary</Code> 색으로 적습니다.
          </P>
        </Sub>
        <Sub title="값이 모두 0일 때">
          <Demo column>
            <Chart.Bar data={zeros} groupKey="부서" invertAxis type="stack" plotWidth={480} plotHeight={160} aria-label="값이 모두 0인 누적 가로 막대 차트" />
          </Demo>
          <P>0은 데이터입니다. 항목 이름과 축은 그대로 그리고, 설명 상자에 0을 적습니다.</P>
        </Sub>
        <Sub title="값이 없는 항목">
          <Demo caption="구매 부서 전체와 재무 부서의 검토 값 없음" column>
            <Chart.Bar data={missing} groupKey="부서" invertAxis type="stack" plotWidth={480} plotHeight={160} aria-label="값이 없는 항목이 있는 누적 가로 막대 차트" />
          </Demo>
          <Rules
            items={[
              "값이 없는 조각은 그리지 않고 값도 적지 않습니다. 항목 이름은 남겨 둡니다.",
              "그 줄에 마우스를 올리면 설명 상자에 \"값 없음\"이라고 적습니다.",
              "왜 없는지, 언제 생기는지 알면 차트 가까이에 한 줄로 적습니다.",
            ]}
          />
        </Sub>
        <Sub title="처음 불러올 때">
          <Demo>
            <BarChartSkeleton layout="vertical" w={320} h={160} />
          </Demo>
          <P>
            가로 막대 차트와 같이 <Code>{'<BarChartSkeleton layout="vertical" />'}</Code>을 보여 줍니다. <Code>layout</Code>은 막대가 늘어서는 방향이므로, 가로로 누운 막대는 <Code>vertical</Code>입니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다. 그 밖의 빈 상태는 차트 기본 구조의 빈 상태 규칙을 따릅니다.
          </P>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <Chart.Bar data={teams} groupKey="부서" invertAxis type="stack" showLegend={false} showXAxis={false} plotWidth={260} plotHeight={170} aria-label="계열이 셋인 누적 가로 막대 차트" />,
            text: "계열은 6개까지만 쌓습니다. 합계가 큰 항목부터 위에 놓습니다.",
          }}
          bad={{
            demo: <Chart.Bar data={many} groupKey="부서" invertAxis type="stack" showLegend={false} showXAxis={false} plotWidth={260} plotHeight={170} aria-label="계열이 여덟인 누적 가로 막대 차트" />,
            text: "계열을 일곱 개 넘게 쌓지 않습니다. 작은 계열은 \"기타\"로 묶습니다.",
          }}
        />
        <P>쓰는 때와 쓰지 않는 때, 여백, 축, 항목 이름의 나머지 규칙은 가로 막대 차트 페이지와 같습니다.</P>
      </Section>
    </Page>
  );
}

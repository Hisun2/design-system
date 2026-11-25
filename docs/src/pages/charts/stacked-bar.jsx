import React from "react";
import { Box, Skeleton, BarChartSkeleton } from "@ec21rnc/ui";
import { Chart } from "@ec21rnc/ui/chart";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "누적 막대 차트", order: 13 };

const quarters = [
  { 분기: "1분기", 계약서: 120, 견적서: 80, 보고서: 60 },
  { 분기: "2분기", 계약서: 150, 견적서: 70, 보고서: 90 },
  { 분기: "3분기", 계약서: 170, 견적서: 95, 보고서: 75 },
  { 분기: "4분기", 계약서: 190, 견적서: 110, 보고서: 85 },
];
const many = quarters.map((row, i) => ({ ...row, 영수증: 40 + i * 5, 신청서: 30 + i * 8, 공문: 22 + i * 3, 회의록: 15 + i * 2, 품의서: 12 + i }));
const grouped = quarters.map((row, i) => ({ 분기: row.분기, 계약서: row.계약서, 견적서: row.견적서, 보고서: row.보고서, 기타: 99 + i * 19 }));
const zeros = quarters.map((row) => ({ 분기: row.분기, 계약서: 0, 견적서: 0, 보고서: 0 }));
const missing = [
  { 분기: "1분기", 계약서: 120, 견적서: 80, 보고서: 60 },
  { 분기: "2분기", 계약서: 150, 견적서: null, 보고서: 90 },
  { 분기: "3분기", 계약서: null, 견적서: null, 보고서: null },
  { 분기: "4분기", 계약서: 190, 견적서: 110, 보고서: 85 },
];
const trend = {
  추세: [
    { x: "1분기", y: 250 },
    { x: "4분기", y: 390 },
  ],
};
const count = (v) => `${Number(v).toLocaleString("ko-KR")}건`;

export default function StackedBarChartPage() {
  return (
    <Page meta={meta} lead="항목마다 여러 계열의 값을 한 막대에 쌓아 그린 차트입니다. 막대 전체의 길이로 합계를, 조각의 길이로 각 계열의 몫을 함께 보여 줍니다.">
      <Section title="언제 쓰는가">
        <Demo caption="분기별 문서 유형별 건수 (type=&quot;stack&quot;)" column>
          <Chart.Bar data={quarters} groupKey="분기" type="stack" showTotalInTooltip tooltipValueFormatter={count} plotWidth={640} plotHeight={240} aria-label="분기별 문서 유형별 건수" />
        </Demo>
        <Rules
          items={[
            "계열이 셋 이상이라 묶음 막대로는 막대가 너무 많아질 때 씁니다.",
            "부분이 전체에서 얼마를 차지하는지 보여 줄 때 씁니다. 계열을 더한 값에 뜻이 있어야 합니다.",
            "합계와 맨 아래 계열은 정확히 비교할 수 있습니다. 위에 쌓인 계열은 바닥이 달라 비교하기 어렵습니다. 계열끼리의 비교가 중요하면 묶음 막대 차트를 씁니다.",
            "조각이 읽힐 만큼 차트를 크게 그립니다. 작은 자리에는 쓰지 않습니다.",
            "도넛 차트 여러 개를 나란히 놓는 대신 이 차트를 씁니다.",
          ]}
        />
        <Sub title="히스토그램과의 구분">
          <P>누적 막대 차트의 가로축은 이름이 있는 항목이나 기간이고, 막대 사이를 띄웁니다. 숫자 구간별 개수를 보여 주는 히스토그램은 막대를 붙여 그립니다. 자세한 구분은 막대 차트 페이지를 봅니다.</P>
        </Sub>
      </Section>

      <Section title="모양">
        <Table
          head={["요소", "모양"]}
          rows={[
            ["조각 사이", "띄우지 않고 붙여 쌓습니다."],
            ["막대와 막대 사이", "막대 폭의 20% 이상"],
            ["막대 윗부분", "맨 위 조각의 윗모서리만 2px"],
          ]}
        />
        <Rules
          items={[
            <><Code>Chart.Bar</Code>에 <Code>type="stack"</Code>을 주면 쌓아 그립니다. 기본값은 나란히 놓는 <Code>group</Code>입니다.</>,
            <>막대의 폭은 <Code>maxBarSize</Code>(기본 12px)를 넘지 않습니다. 조각을 읽기 어려우면 이 값을 키웁니다.</>,
            "세로축은 0에서 시작합니다. 가로 보조선만 씁니다.",
          ]}
        />
      </Section>

      <Section title="쌓는 순서와 색">
        <Rules
          items={[
            "가장 중요하거나 가장 큰 계열을 맨 아래에 둡니다. 바닥에 닿은 계열만 정확히 비교할 수 있습니다.",
            "모든 막대에서 쌓는 순서가 같아야 합니다. 막대마다 큰 순서로 다시 쌓지 않습니다.",
            <>색은 <Code>--ec-chart-1</Code>부터 순서대로 칠합니다. 붙어 있는 조각끼리 뚜렷이 구분되어야 하므로 순서를 건너뛰지 않습니다.</>,
            "같은 계열은 화면의 다른 차트에서도 같은 색입니다.",
            "계열은 6개까지입니다. 넘으면 작은 계열을 \"기타\"로 묶어 맨 위에 회색으로 쌓습니다.",
            "계열에 순서가 있으면(짧음→김, 낮음→높음) 한 색의 밝기 단계로 칠합니다. 차트 색 페이지를 봅니다.",
          ]}
        />
      </Section>

      <Section title="범례와 추세선">
        <Demo caption="추세선 (trend)" column>
          <Chart.Bar data={quarters} groupKey="분기" type="stack" trend={trend} plotWidth={640} plotHeight={220} aria-label="추세선이 있는 누적 막대 차트" />
        </Demo>
        <Rules
          items={[
            "계열이 여럿이므로 범례를 항상 둡니다. 범례의 순서는 쌓은 순서와 같게 합니다.",
            <>합계의 흐름을 짚어 주려면 <Code>trend</Code>로 추세선을 겹칩니다. 단순한 차트에서는 어지러워지므로 꼭 필요할 때만 씁니다.</>,
            "추세선을 넣으면 설명 상자에 각 계열의 값과 추세의 값을 모두 보여 줍니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            <>막대에 마우스를 올리면 막대 뒤에 옅은 바탕(<Code>--ec-overlay-hover</Code>)이 깔립니다. 지금 보고 있는 항목과 누를 수 있음을 알립니다.</>,
            <>설명 상자에는 그 막대의 모든 계열 값을 보여 줍니다. <Code>showTotalInTooltip</Code>으로 합계를 함께 보여 줍니다.</>,
            "추세선이 있으면 마우스를 올린 항목의 추세선 위 점도 함께 표시합니다.",
            "범례에서 계열을 끄면 나머지 조각이 다시 쌓입니다.",
            <>조각을 눌러 상세 화면으로 가게 하려면 <Code>onClickBar</Code>를 씁니다. 그 밖의 동작은 막대 차트와 같습니다.</>,
          ]}
        />
      </Section>

      <Section title="예외 상황">
        <Sub title="값이 모두 0일 때">
          <Demo column>
            <Chart.Bar data={zeros} groupKey="분기" type="stack" plotWidth={480} plotHeight={160} aria-label="값이 모두 0인 누적 막대 차트" />
          </Demo>
          <P>0은 데이터입니다. 축은 그대로 그리고 설명 상자에 0을 적습니다.</P>
        </Sub>
        <Sub title="값이 없는 항목">
          <Demo caption="2분기 견적서와 3분기 전체가 값 없음" column>
            <Chart.Bar data={missing} groupKey="분기" type="stack" plotWidth={480} plotHeight={180} aria-label="값이 없는 항목이 있는 누적 막대 차트" />
          </Demo>
          <Rules
            items={[
              "값이 없는 조각은 그리지 않습니다. 항목 전체가 없으면 막대를 그리지 않고 자리만 남깁니다.",
              "그 자리에 마우스를 올리면 설명 상자에 \"값 없음\"이라고 적습니다. 왜 없는지 알면 함께 적습니다.",
              "일부 계열만 값이 없는 막대는 합계가 작아 보입니다. 설명 상자나 차트 설명에 빠진 계열이 있음을 알립니다.",
            ]}
          />
        </Sub>
        <Sub title="값의 차이가 아주 클 때">
          <P>아주 작은 조각도 사라지지 않게 최소 2px로 그립니다. 그 밖의 처리는 막대 차트의 규칙을 따릅니다.</P>
        </Sub>
        <Sub title="항목이 하나 또는 둘일 때">
          <P>막대 하나 또는 둘을 같은 폭으로 그립니다. 막대가 하나뿐이면 한 줄 비율 차트나 도넛 차트가 더 맞는지 살핍니다.</P>
        </Sub>
        <Sub title="처음 불러올 때">
          <Demo>
            <Box w={320}>
              <Skeleton h={160}>
                <BarChartSkeleton />
              </Skeleton>
            </Box>
          </Demo>
          <P>
            막대 차트와 같이 <Code>BarChartSkeleton</Code>을 보여 줍니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다.
          </P>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <Chart.Bar data={grouped} groupKey="분기" type="stack" colorMap={{ 기타: "var(--ec-chart-other)" }} showLegend={false} plotWidth={260} plotHeight={160} aria-label="작은 계열을 기타로 묶은 누적 막대 차트" />,
            text: "작은 계열은 \"기타\"로 묶어 맨 위에 회색으로 쌓습니다.",
          }}
          bad={{
            demo: <Chart.Bar data={many} groupKey="분기" type="stack" showLegend={false} plotWidth={260} plotHeight={160} aria-label="계열이 여덟인 누적 막대 차트" />,
            text: "계열을 일곱 개 넘게 쌓지 않습니다. 색도 조각도 구분되지 않습니다.",
          }}
        />
        <DoDont
          good={{ text: "막대는 시간 순서나 합계가 큰 순서로 놓습니다. 축은 0에서 시작합니다." }}
          bad={{ text: "평균, 비율처럼 더해도 뜻이 없는 값을 쌓지 않습니다." }}
        />
        <P>축의 시작점, 막대의 순서, 막대를 눌러 상세 화면으로 들어가는 방법은 막대 차트 페이지의 규칙과 같습니다.</P>
      </Section>
    </Page>
  );
}

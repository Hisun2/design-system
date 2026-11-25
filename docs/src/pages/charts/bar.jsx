import React from "react";
import { BarChartSkeleton } from "@ec21rnc/ui";
import { Chart } from "@ec21rnc/ui/chart";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "막대 차트", order: 12 };

const monthly = [
  { 월: "1월", 수집: 320 },
  { 월: "2월", 수집: 410 },
  { 월: "3월", 수집: 380 },
  { 월: "4월", 수집: 520 },
  { 월: "5월", 수집: 610 },
  { 월: "6월", 수집: 580 },
];
const quarters = [
  { 분기: "1분기", 계약서: 120, 견적서: 80 },
  { 분기: "2분기", 계약서: 150, 견적서: 70 },
  { 분기: "3분기", 계약서: 170, 견적서: 95 },
  { 분기: "4분기", 계약서: 190, 견적서: 110 },
];
const fiveSeries = quarters.map((row, i) => ({ ...row, 보고서: 60 + i * 10, 영수증: 40 + i * 5, 신청서: 30 + i * 8 }));
const teams = [
  { 부서: "영업", 건수: 48 },
  { 부서: "구매", 건수: 36 },
  { 부서: "재무", 건수: 21 },
  { 부서: "인사", 건수: 14 },
];
const unsorted = [teams[2], teams[0], teams[3], teams[1]];
const outlier = [
  { 부서: "영업", 건수: 4800 },
  { 부서: "구매", 건수: 36 },
  { 부서: "재무", 건수: 21 },
  { 부서: "인사", 건수: 6 },
];
const one = [{ 월: "6월", 수집: 580 }];
const two = monthly.slice(4);
const zeros = monthly.map((row) => ({ 월: row.월, 수집: 0 }));
const missing = [
  { 월: "1월", 수집: 320 },
  { 월: "2월", 수집: 410 },
  { 월: "3월", 수집: null },
  { 월: "4월", 수집: 520 },
];
// 추세선의 점은 계열 이름을 키로 묶습니다. 키가 계열 이름과 다르면 선이 그려지지 않습니다.
const trend = {
  계약서: [
    { x: "1분기", y: 123 },
    { x: "2분기", y: 146 },
    { x: "3분기", y: 169 },
    { x: "4분기", y: 192 },
  ],
};
const won = (v) => `${Number(v).toLocaleString("ko-KR")}건`;

export default function BarChartPage() {
  return (
    <Page meta={meta} lead="기간이나 항목마다 값을 막대의 길이로 보여 주는 차트입니다. 값 하나하나를 서로 견줄 때 씁니다. 막대는 세로로도 가로로도 그릴 수 있고, 이 페이지는 세로 막대를 다룹니다.">
      <Section title="언제 쓰는가">
        <Demo caption="월별 수집 건수" column>
          <Chart.Bar data={monthly} groupKey="월" yTicksCount={5} plotWidth={640} plotHeight={220} aria-label="월별 수집 건수" />
        </Demo>
        <Rules
          items={[
            "흐름보다 각 시점·항목의 값 자체가 중요할 때 씁니다. 예: 이번 달 목표를 채웠는가, 어느 요일에 접수가 몰리는가.",
            "순서 없는 항목(부서, 유형)을 서로 비교할 때 씁니다.",
            "항목 이름이 길거나 항목이 많으면 가로 막대 차트가 낫습니다. 이름을 막대 옆에 온전히 적을 수 있습니다.",
            "긴 기간의 추이를 볼 때는 꺾은선 차트가 낫습니다. 막대가 20개를 넘으면 꺾은선 차트를 씁니다.",
          ]}
        />
        <Sub title="히스토그램과의 구분">
          <Table
            head={["", "막대 차트", "히스토그램"]}
            rows={[
              ["가로축", "이름이 있는 항목(부서, 유형)이나 기간", "숫자 구간(0~10일, 10~20일)"],
              ["막대의 뜻", "그 항목의 값", "그 구간에 든 값의 개수"],
              ["막대 사이", "띄웁니다. 항목이 서로 떨어진 것임을 나타냅니다.", "붙입니다. 구간이 이어짐을 나타냅니다."],
            ]}
          />
        </Sub>
      </Section>

      <Section title="모양">
        <Demo caption="묶음 막대 (type=&quot;group&quot;, 기본값) — 항목마다 계열을 나란히" column>
          <Chart.Bar data={quarters} groupKey="분기" yTicksCount={5} plotWidth={640} plotHeight={220} aria-label="분기별 문서 유형별 건수" />
        </Demo>
        <Table
          head={["요소", "모양"]}
          rows={[
            ["막대 윗부분", "모서리 2px"],
            ["묶음 안의 막대 사이", "4px"],
            ["묶음과 묶음 사이", "막대 폭의 20% 이상"],
            ["가장 짧은 막대", "값이 0보다 크면 적어도 2px"],
          ]}
        />
        <Rules
          items={[
            <>막대의 폭은 자리에 맞춰 정해지되 <Code>maxBarSize</Code>를 넘지 않습니다. 기본값은 12px입니다. 항목이 적어 막대가 너무 가늘어 보이면 이 값을 키웁니다.</>,
            "한 묶음에 나란히 놓는 계열은 3~4개까지입니다. 더 많으면 누적 막대 차트나 다른 차트를 씁니다.",
            "차트 종류를 바꿔 볼 수 있으면 좋습니다. 묶음·누적, 막대·꺾은선을 바꾸는 선택은 카드 설정에 둡니다.",
            "가로 보조선만 씁니다. 세로 보조선은 넣지 않습니다.",
          ]}
        />
      </Section>

      <Section title="색">
        <Rules
          items={[
            "계열이 하나면 모든 막대를 한 가지 색(1번)으로 칠합니다. 막대마다 색을 달리하지 않습니다.",
            <>계열이 여럿이면 <Code>--ec-chart-1</Code>부터 순서대로 칠합니다. 같은 계열은 다른 차트에서도 같은 색입니다.</>,
            <>특정 막대를 강조할 때는 그 계열만 색을 두고 나머지를 회색으로 낮춥니다(<Code>colorMap</Code>). 강조는 꼭 필요할 때만 하고, 다른 값이 묻히지 않게 합니다.</>,
          ]}
        />
      </Section>

      <Section title="범례와 추세선">
        <Demo caption="추세선 (trend) — 범례의 &quot;추세&quot;를 누르면 계약서의 추세선이 나타나고, 다시 누르면 사라집니다" column>
          <Chart.Bar data={quarters} groupKey="분기" yTicksCount={5} trend={trend} legendProps={{ withTrend: true, trendLabel: "추세" }} plotWidth={640} plotHeight={220} aria-label="추세선이 있는 분기별 문서 건수" />
        </Demo>
        <Rules
          items={[
            "계열이 하나면 범례를 두지 않습니다. 차트 제목으로 충분합니다.",
            "계열이 여럿이면 범례를 둡니다.",
            <>전체 흐름을 짚어 주고 싶으면 <Code>trend</Code>로 추세선을 겹칩니다. 단순한 차트에서는 오히려 어지러워지므로 꼭 필요할 때만 씁니다.</>,
            <><Code>trend</Code>에는 계열 이름마다 추세선의 점(<Code>x</Code>, <Code>y</Code>)을 줍니다. 범례 끝에 "추세" 항목이 생기고, 처음에는 꺼져 있습니다. 그 계열을 범례에서 끄면 추세선도 함께 사라집니다.</>,
            "추세선을 넣으면 설명 상자에 막대의 값과 추세의 값을 모두 보여 줍니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Demo caption="마우스를 올리면 그 항목 뒤에 옅은 바탕이 깔리고 설명 상자가 나옵니다" column>
          <Chart.Bar data={quarters} groupKey="분기" yTicksCount={5} showTotalInTooltip tooltipValueFormatter={won} plotWidth={640} plotHeight={200} aria-label="설명 상자에 합계가 나오는 막대 차트" />
        </Demo>
        <Rules
          items={[
            <>막대에 마우스를 올리면 막대 뒤에 옅은 바탕(<Code>--ec-overlay-hover</Code>)이 깔립니다. 지금 보고 있는 항목과 누를 수 있음을 알립니다.</>,
            "계열이 하나면 그 막대 하나에, 계열이 여럿이면 그 항목의 묶음 전체에 바탕이 깔립니다.",
            "설명 상자에는 그 항목의 모든 계열 값을 보여 줍니다. 추세선이 있으면 추세선 위의 점도 함께 표시합니다.",
            <>막대를 눌러 상세 화면으로 가게 할 수 있습니다(<Code>onClickBar</Code>, 묶음 전체는 <Code>onClickHoverRect</Code>). 이때 설명 상자에 "눌러서 자세히 보기"라고 적어 누를 수 있음을 알립니다.</>,
          ]}
        />
      </Section>

      <Section title="값의 차이가 아주 클 때">
        <Demo caption="한 항목이 유난히 크면 나머지가 보이지 않습니다" column>
          <Chart.Bar data={outlier} groupKey="부서" yTicksCount={5} marginY={56} plotWidth={480} plotHeight={200} aria-label="값의 차이가 큰 막대 차트" />
        </Demo>
        <Rules
          items={[
            "작은 값도 사라지지 않게 막대의 최소 높이 2px을 지킵니다.",
            "차이가 몇십 배를 넘으면 로그 눈금을 고려합니다. 이때는 축이 로그 눈금임을 차트 설명에 적습니다.",
            "큰 값에 관심이 있다면 다른 차트로 바꿉니다. 큰 값을 숫자로 따로 보여 주고 나머지만 막대로 그리는 방법도 있습니다.",
            "막대를 중간에서 끊어 그리지 않습니다. 길이가 값이라는 약속이 깨집니다.",
          ]}
        />
      </Section>

      <Section title="예외 상황">
        <Sub title="값이 하나일 때">
          <Demo column>
            <Chart.Bar data={one} groupKey="월" yTicksCount={5} maxBarSize={48} plotWidth={320} plotHeight={160} aria-label="값이 하나인 막대 차트" />
          </Demo>
          <P>막대 하나를 그립니다. 폭은 <Code>maxBarSize</Code>까지만 늘어나므로 차트 전체를 채우지 않습니다.</P>
        </Sub>
        <Sub title="값이 둘일 때">
          <Demo column>
            <Chart.Bar data={two} groupKey="월" yTicksCount={5} maxBarSize={48} plotWidth={320} plotHeight={160} aria-label="값이 둘인 막대 차트" />
          </Demo>
          <P>막대 둘을 같은 폭으로 그립니다.</P>
        </Sub>
        <Sub title="값이 모두 0일 때">
          <Demo column>
            <Chart.Bar data={zeros} groupKey="월" yTicksCount={5} plotWidth={480} plotHeight={160} aria-label="값이 모두 0인 막대 차트" />
          </Demo>
          <P>0은 데이터입니다. 축은 그대로 그리고, 설명 상자에 0을 적습니다. 빈 상태로 바꾸지 않습니다.</P>
        </Sub>
        <Sub title="값이 없는 항목">
          <Demo caption="3월 값 없음 — 막대를 그리지 않고 자리는 비워 둡니다" column>
            <Chart.Bar data={missing} groupKey="월" yTicksCount={5} plotWidth={480} plotHeight={160} aria-label="값이 없는 항목이 있는 막대 차트" />
          </Demo>
          <Rules
            items={[
              "값이 없는 항목은 막대를 그리지 않습니다. 가로축의 자리는 남겨 둡니다.",
              "그 자리에 마우스를 올리면 설명 상자에 \"값 없음\"이라고 적습니다.",
              "왜 없는지, 언제 생기는지 알면 차트 가까이에 한 줄로 적습니다. 예: \"3월 데이터는 집계 중입니다.\"",
              "값 없음을 0으로 그리지 않습니다.",
            ]}
          />
        </Sub>
        <Sub title="처음 불러올 때">
          <Demo>
            <BarChartSkeleton w={320} h={160} />
          </Demo>
          <P>
            처음 불러오는 동안에는 <Code>BarChartSkeleton</Code>을 보여 줍니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다. 그 밖의 빈 상태는 차트 기본 구조의 빈 상태 규칙을 따릅니다.
          </P>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <Sub title="축은 0에서 시작합니다">
          <P>
            막대는 길이로 비교합니다. 축을 0이 아닌 값에서 시작하면 작은 차이가 몇 배로 보입니다. 간편 차트는 항상 0에서 시작합니다. 값이 모두 크고 서로 비슷해서 차이가 보이지 않으면 축을 자르지 말고 꺾은선 차트로 바꿉니다. 막대와 꺾은선을 바꿔 보는 선택을 카드 설정에 둘 수 있습니다.
          </P>
        </Sub>
        <Sub title="막대의 순서">
          <DoDont
            good={{
              demo: <Chart.Bar data={teams} groupKey="부서" yTicksCount={5} plotWidth={260} plotHeight={160} aria-label="큰 순서로 놓은 부서별 건수" />,
              text: "순서 없는 항목은 값이 큰 것부터 놓습니다. 기간은 시간 순서(1월→12월)로 놓습니다.",
            }}
            bad={{
              demo: <Chart.Bar data={unsorted} groupKey="부서" yTicksCount={5} plotWidth={260} plotHeight={160} aria-label="순서 없이 놓은 부서별 건수" />,
              text: "이유 없는 순서로 놓지 않습니다. 어느 것이 큰지 한눈에 보이지 않습니다.",
            }}
          />
        </Sub>
        <Sub title="계열 수">
          <DoDont
            good={{
              demo: <Chart.Bar data={quarters} groupKey="분기" yTicksCount={5} showLegend={false} plotWidth={260} plotHeight={160} aria-label="계열이 둘인 묶음 막대 차트" />,
              text: "묶음 막대는 계열 3~4개까지만 씁니다.",
            }}
            bad={{
              demo: <Chart.Bar data={fiveSeries} groupKey="분기" yTicksCount={5} showLegend={false} plotWidth={260} plotHeight={160} aria-label="계열이 다섯인 묶음 막대 차트" />,
              text: "계열을 많이 나란히 놓지 않습니다. 막대가 가늘어져 비교할 수 없습니다. 누적 막대 차트를 씁니다.",
            }}
          />
        </Sub>
        <Sub title="자세한 화면으로 들어가는 문">
          <P>
            차트가 요약을 보여 주고, 막대를 누르면 그 항목의 목록이나 보고서로 들어가게 할 수 있습니다. 누를 수 있는 막대는 마우스를 올렸을 때 바탕이 깔려야 하고, 설명 상자에 "눌러서 자세히 보기"를 적습니다.
          </P>
        </Sub>
      </Section>
    </Page>
  );
}

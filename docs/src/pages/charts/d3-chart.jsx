import React from "react";
import { Card, Box, Skeleton, LineChartSkeleton, NoData } from "@ec21rnc/ui";
import { Chart, Plot, XAxis, YAxis, Line, minMax, interpolateValue } from "@ec21rnc/ui/chart";
import { scaleLinear } from "d3-scale";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "차트 기본 구조", order: 2 };

const monthly = [
  { 월: 1, 접수: 320, 승인: 260 },
  { 월: 2, 접수: 410, 승인: 330 },
  { 월: 3, 접수: 380, 승인: 340 },
  { 월: 4, 접수: 520, 승인: 410 },
  { 월: 5, 접수: 610, 승인: 480 },
  { 월: 6, 접수: 580, 승인: 510 },
];
const withGap = [
  { 월: 1, 접수: 320 },
  { 월: 2, 접수: 410 },
  { 월: 3, 접수: interpolateValue },
  { 월: 4, 접수: interpolateValue },
  { 월: 5, 접수: 610 },
  { 월: 6, 접수: 580 },
];
const byTeam = [
  { 부서: "영업", 건수: 48 },
  { 부서: "구매", 건수: 36 },
  { 부서: "재무", 건수: 21 },
];
const month = (v) => `${v}월`;
const count = (v) => `${Number(v).toLocaleString("ko-KR")}건`;

const W = 480;
const H = 220;
const xScale = scaleLinear().range([56, W - 16]).domain(minMax(monthly, "월"));
const yScale = scaleLinear().range([H - 48, 16]).domain([0, 800]);

export default function ChartBasicsPage() {
  return (
    <Page meta={meta} lead="모든 차트가 함께 쓰는 뼈대입니다. 그리는 자리, 축과 보조선, 설명 상자, 제목, 불러오는 중과 빈 상태의 규칙을 정합니다. 어떤 차트를 고를지는 차트 한눈에 보기를 봅니다.">
      <Section title="구성">
        <Demo caption="카드 안의 차트 — 제목, 설명, 범례, 그리는 자리">
          <Card w={560}>
            <Card.Header>
              <Card.Title>월별 문서 처리 건수</Card.Title>
              <Card.Description>올해 상반기에 접수하고 승인한 문서 수입니다.</Card.Description>
            </Card.Header>
            <Card.Body>
              <Chart.Line data={monthly} groupKey="월" plotWidth={500} plotHeight={220} axisXValueFormatter={month} tooltipTitleFormatter={month} aria-label="월별 문서 처리 건수" />
            </Card.Body>
          </Card>
        </Demo>
        <Table
          head={["요소", "하는 일", "규칙"]}
          rows={[
            ["제목", "이 차트가 무엇인지 알립니다", "모든 차트에 있어야 합니다. 어느 차트의 제목인지 헷갈리지 않게 바로 위에 둡니다."],
            ["설명", "데이터의 출처, 기간, 읽는 법을 덧붙입니다", "선택입니다. 한두 문장으로 씁니다."],
            ["범례", "색이 어떤 계열인지 알립니다", "계열이 둘 이상일 때만 둡니다. 범례 페이지를 봅니다."],
            ["그리는 자리", "축, 보조선, 데이터를 그립니다", "높이는 120px 이상입니다."],
            ["설명 상자", "마우스를 올린 자리의 값을 보여 줍니다", "모든 차트에 둡니다."],
          ]}
        />
        <Rules
          items={[
            <>차트는 카드 안에 넣습니다. 제목은 <Code>Card.Title</Code>, 설명은 <Code>Card.Description</Code>, 차트는 <Code>Card.Body</Code>에 둡니다.</>,
            <>화면에 제목을 보여 주지 않더라도 차트에는 <Code>aria-label</Code>로 이름을 줍니다. 화면 낭독기가 이 이름을 읽습니다.</>,
            "설명에는 최댓값·최솟값의 뜻, 데이터를 가져온 곳, 숫자를 읽을 때 주의할 점을 적습니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 두 가지 방법">
        <Table
          head={["방법", "쓰는 때", "모양"]}
          rows={[
            ["간편 차트", "대부분의 경우. 축, 범례, 설명 상자가 자동으로 붙습니다.", <Code>{'<Chart.Line data={rows} groupKey="월" />'}</Code>],
            ["조립 차트", "축 이름, 기준선처럼 간편 차트에 없는 요소가 필요할 때", <Code>{"<Plot> + <XAxis> + <YAxis> + <Line>"}</Code>],
          ]}
        />
        <Rules
          items={[
            <>간편 차트는 <Code>Chart.Line</Code>, <Code>Chart.Area</Code>, <Code>Chart.Bar</Code>, <Code>Chart.Donut</Code>처럼 <Code>Chart</Code> 아래에 있습니다. <Code>data</Code>와 가로축으로 쓸 칸 이름(<Code>groupKey</Code>)만 주면 그려집니다.</>,
            <>크기는 <Code>plotWidth</Code>, <Code>plotHeight</Code>로 줍니다. 주지 않으면 부모 요소의 크기를 따릅니다.</>,
            <>축과 설명 상자의 글자는 <Code>axisXValueFormatter</Code>, <Code>axisYValueFormatter</Code>, <Code>tooltipTitleFormatter</Code>, <Code>tooltipValueFormatter</Code>로 다듬습니다.</>,
            "조립 차트는 간편 차트로 할 수 없을 때만 씁니다. 같은 화면의 차트는 한 가지 방법으로 맞춥니다.",
          ]}
        />
      </Section>

      <Section title="축과 보조선">
        <Demo caption="조립 차트 — 축 이름을 붙인 예" column>
          <Plot data={monthly} scale={[xScale, yScale]} width={W} height={H} aria-label="월별 접수 건수">
            <YAxis>
              <YAxis.Ticks ticks={[0, 200, 400, 600, 800]} />
              <YAxis.Grid ticks={[0, 200, 400, 600, 800]} />
              <YAxis.Title>접수 건수</YAxis.Title>
            </YAxis>
            <XAxis>
              <XAxis.Ticks ticks={[1, 2, 3, 4, 5, 6]}>{({ value }) => ({ children: month(value) })}</XAxis.Ticks>
              <XAxis.Title>월</XAxis.Title>
            </XAxis>
            <Line x="월" y="접수">
              <Line.Dots display />
            </Line>
          </Plot>
        </Demo>
        <Table
          head={["보조선", "쓰는 차트"]}
          rows={[
            ["가로 보조선만", "시간에 따른 추이를 보여 주는 차트(꺾은선, 영역, 세로 막대)"],
            ["가로·세로 보조선 모두", "산점도, 버블 차트"],
            ["세로 보조선만", "가로 막대 차트"],
            ["보조선 없음", "도넛, 한 줄 비율 차트, 촘촘한 가로 막대 차트처럼 합이 100%인 차트"],
          ]}
        />
        <Rules
          items={[
            "보조선은 연한 회색으로 흐리게 둡니다. 눈에 먼저 들어와야 하는 것은 데이터입니다.",
            "가로축 선은 보조선보다 조금 진하게 그려 바닥이 어디인지 알립니다. 세로축 선은 그리지 않고 눈금 숫자만 둡니다.",
            "가로 보조선은 3~5줄을 씁니다. 높이가 120px 근처인 작은 차트는 3줄, 키가 큰 차트도 5~6줄을 넘기지 않습니다.",
            <>눈금 수는 <Code>xTicksCount</Code>, <Code>yTicksCount</Code>로 줄입니다. 축을 숨기려면 <Code>showXAxis</Code>, <Code>showYAxis</Code>를 끕니다.</>,
            "눈금 숫자는 200, 400, 600처럼 딱 떨어지는 값으로 씁니다. 큰 숫자는 1.2만, 3억처럼 줄여 적습니다.",
            <>눈금 글자색은 <Code>--ec-text-secondary</Code>입니다. 항목 이름이 눈금인 막대 차트는 <Code>--ec-text-primary</Code>를 씁니다.</>,
            "세로축 눈금 숫자는 좌우로 16px, 가로축 눈금 글자는 위로 12px 띄웁니다.",
            "제목만으로 축이 무엇인지 알 수 없으면 축 이름을 붙입니다. 단위(건, 원, %)는 축 이름이나 눈금에 한 번만 적습니다.",
          ]}
        />
        <Sub title="눈금을 링크로 쓰기">
          <P>항목 수가 정해진 차트(주로 막대 차트)에서는 항목 눈금을 눌러 그 항목의 상세 화면으로 가게 할 수 있습니다. 이때 눈금은 링크 색(<Code>--ec-text-link</Code>)으로 표시하고, 같은 차트의 눈금은 모두 링크이거나 모두 글자여야 합니다.</P>
        </Sub>
      </Section>

      <Section title="기준선">
        <Demo caption="기준선 (referenceLine) — 4월에 기준이 바뀐 날을 표시" column>
          <Chart.Line data={monthly} groupKey="월" referenceLine={{ value: 4 }} plotWidth={480} plotHeight={200} axisXValueFormatter={month} tooltipTitleFormatter={month} aria-label="기준선이 있는 월별 문서 처리 건수" />
        </Demo>
        <Demo caption="기준 구간 (referenceArea) — 점검 기간에 이름을 붙여 표시" column>
          <Chart.Line data={monthly} groupKey="월" referenceArea={{ value: [3, 4], title: "점검 기간" }} plotWidth={480} plotHeight={200} axisXValueFormatter={month} tooltipTitleFormatter={month} aria-label="기준 구간이 있는 월별 문서 처리 건수" />
        </Demo>
        <Rules
          items={[
            <>특정 날짜나 기간을 짚어 줄 때 씁니다. 하루는 <Code>referenceLine</Code>, 기간은 <Code>referenceArea</Code>로 표시합니다.</>,
            <>기간의 성격에 따라 <Code>use</Code>를 고릅니다: 중립(neutral), 눈여겨볼 것(insight), 좋음(good), 나쁨(bad).</>,
            "기준선에는 무엇을 뜻하는지 이름을 붙입니다. 이름 없는 선은 데이터로 오해받습니다.",
            "한 차트에 기준선은 두세 개까지만 둡니다.",
          ]}
        />
      </Section>

      <Section title="점과 강조 표시">
        <Table
          head={["요소", "모양"]}
          rows={[
            ["점", "지름 8px. 마우스를 올리면 10px로 커집니다."],
            ["세로 안내선", "꺾은선·영역 차트에서 마우스를 올린 시점에 나오는 세로 선입니다."],
            ["막대 강조 바탕", <>막대 차트에서 마우스를 올린 막대 뒤에 깔리는 옅은 바탕(<Code>--ec-overlay-hover</Code>)입니다.</>],
          ]}
        />
      </Section>

      <Section title="설명 상자">
        <Demo caption="마우스를 올리면 그 시점의 모든 계열 값과 합계가 나옵니다" column>
          <Chart.Line data={monthly} groupKey="월" showTotalInTooltip tooltipValueFormatter={count} plotWidth={480} plotHeight={200} axisXValueFormatter={month} tooltipTitleFormatter={month} aria-label="설명 상자에 합계가 나오는 차트" />
        </Demo>
        <Rules
          items={[
            "차트의 어느 부분에 마우스를 올려도 설명 상자가 나옵니다. 값이 없는 자리도 마찬가지이며, 이때는 \"값 없음\"이라고 적습니다.",
            "설명 상자는 마우스 커서에서 4px 떨어져 따라다니고, 그리는 자리 밖으로 나가지 않습니다.",
            "계열이 여럿이면 그 시점의 모든 계열 값을 한 상자에 보여 줍니다.",
            "값은 오른쪽으로 맞춰 자릿수를 견주기 쉽게 합니다.",
            <>합계가 뜻이 있는 데이터면 합계를 함께 보여 줍니다(<Code>showTotalInTooltip</Code>). 앞 시점 대비 증감률은 <Code>showDeltaPercentInTooltip</Code>으로 보여 줍니다.</>,
            <>늘어나는 것이 나쁜 값(오류 건수, 지연 일수)이면 <Code>deltaPercentGrowthColor="bad"</Code>로 증가를 빨강으로 표시합니다.</>,
            "단위는 꼭 필요할 때만 붙입니다. 축에 이미 단위가 있으면 생략합니다. 산점도처럼 축마다 단위가 다른 차트는 붙이는 편이 읽기 쉽습니다.",
            "나란히 놓고 견주는 차트들은 설명 상자를 함께 움직이게 합니다. 한 차트에 마우스를 올리면 다른 차트도 같은 시점을 보여 줍니다.",
            <>설명 상자의 안쪽 여백은 12px입니다. 끄려면 <Code>showTooltip={"{false}"}</Code>를 줍니다. 아주 작은 차트에서만 끕니다.</>,
          ]}
        />
      </Section>

      <Section title="값이 없을 때와 수집을 시작한 때">
        <Demo caption="3~4월 값 없음 — 아는 두 점 사이를 점선으로 잇습니다" column>
          <Chart.Line data={withGap} groupKey="월" showDots plotWidth={480} plotHeight={180} axisXValueFormatter={month} tooltipTitleFormatter={month} aria-label="중간에 값이 없는 차트" />
        </Demo>
        <Rules
          items={[
            <>값이 없는 구간은 점선으로 잇습니다. 데이터에서 그 자리의 값을 <Code>interpolateValue</Code>로 넣습니다.</>,
            "0과 값 없음은 다릅니다. 0은 \"0건이었다\"는 데이터이고, 값 없음은 \"모른다\"는 뜻입니다. 값 없는 자리를 0으로 그리지 않습니다.",
            "수집을 시작한 날부터는 실선으로 그립니다. 그날의 설명 상자에 \"이 날부터 수집을 시작했습니다\"라고 적습니다.",
          ]}
        />
      </Section>

      <Section title="처음 불러올 때">
        <Demo caption="제목은 먼저 보여 주고, 차트 자리에는 뼈대를 둡니다">
          <Card w={400}>
            <Card.Header>
              <Card.Title>월별 문서 처리 건수</Card.Title>
            </Card.Header>
            <Card.Body>
              <Skeleton h={180}>
                <LineChartSkeleton />
              </Skeleton>
            </Card.Body>
          </Card>
        </Demo>
        <Rules
          items={[
            "처음 불러오는 동안에는 차트 대신 뼈대(Skeleton)를 보여 줍니다.",
            "제목이 있으면 불러오는 동안에도 제목은 보여 줍니다. 무엇을 기다리는지 알 수 있어야 합니다.",
            <>차트 종류마다 맞는 뼈대가 있습니다: <Code>LineChartSkeleton</Code>, <Code>AreaChartSkeleton</Code>, <Code>BarChartSkeleton</Code>, <Code>DonutChartSkeleton</Code>, <Code>BubbleChartSkeleton</Code> 등.</>,
            "뼈대의 크기는 실제 차트와 같게 합니다. 불러온 뒤 화면이 밀리지 않아야 합니다.",
          ]}
        />
      </Section>

      <Section title="빈 상태와 예외">
        <Demo caption="데이터가 없을 때">
          <Box w={400}>
            <NoData type="line-chart" description="조건을 바꾸거나 기간을 넓혀 보세요." />
          </Box>
        </Demo>
        <Rules
          items={[
            "보여 줄 데이터가 없으면 빈 축만 그리지 않습니다. 왜 비었는지와 무엇을 하면 되는지 적은 빈 상태를 보여 줍니다.",
            "불러오지 못했으면 오류 상태를 보여 주고 다시 시도하는 버튼을 둡니다.",
            "값이 하나뿐일 때, 모두 0일 때, 일부가 비었을 때의 처리는 차트 종류마다 다릅니다. 각 차트 페이지의 예외 상황을 봅니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <Chart.Bar data={byTeam} groupKey="부서" plotWidth={260} plotHeight={160} yTicksCount={4} aria-label="보조선이 적은 막대 차트" />,
            text: "작은 차트는 보조선을 서너 줄로 줄입니다.",
          }}
          bad={{
            demo: <Chart.Bar data={byTeam} groupKey="부서" plotWidth={260} plotHeight={160} yTicksCount={12} aria-label="보조선이 많은 막대 차트" />,
            text: "보조선을 촘촘하게 넣지 않습니다. 데이터보다 선이 먼저 보입니다.",
          }}
        />
        <DoDont
          good={{ text: "차트마다 제목을 두고, 불러오는 중에도 제목은 남겨 둡니다." }}
          bad={{ text: "제목 없이 차트만 놓지 않습니다. 축 눈금만으로는 무엇의 숫자인지 알 수 없습니다." }}
        />
      </Section>
    </Page>
  );
}

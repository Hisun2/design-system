import React from "react";
import { Box, Skeleton, AreaChartSkeleton } from "@ec21rnc/ui";
import { Chart, interpolateValue } from "@ec21rnc/ui/chart";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "영역 차트", order: 10 };

const monthly = [
  { 월: 1, 수집: 320 },
  { 월: 2, 수집: 410 },
  { 월: 3, 수집: 380 },
  { 월: 4, 수집: 520 },
  { 월: 5, 수집: 610 },
  { 월: 6, 수집: 580 },
  { 월: 7, 수집: 640 },
  { 월: 8, 수집: 720 },
];
const twoSeries = monthly.map((row, i) => ({ ...row, 처리: 180 + i * 45 }));
const few = [
  { 월: 1, 수집: 320 },
  { 월: 4, 수집: 520 },
  { 월: 8, 수집: 720 },
  { 월: 12, 수집: 690 },
];
const many = monthly.map((row, i) => ({ 월: row.월, 계약서: 90 + i * 10, 견적서: 70 + (i % 3) * 20, 보고서: 60 + i * 4, 영수증: 50 + (i % 2) * 15, 신청서: 40 + i * 6, 공문: 30 + (i % 4) * 8 }));
const one = [{ 월: 6, 수집: 580 }];
const two = [
  { 월: 6, 수집: 580 },
  { 월: 7, 수집: 640 },
];
const zeros = [1, 2, 3, 4, 5, 6].map((m) => ({ 월: m, 수집: 0 }));
const gap = [
  { 월: 1, 수집: 320 },
  { 월: 2, 수집: 410 },
  { 월: 3, 수집: interpolateValue },
  { 월: 4, 수집: interpolateValue },
  { 월: 5, 수집: 610 },
  { 월: 6, 수집: 580 },
];
const month = (v) => `${v}월`;
const axis = { axisXValueFormatter: month, tooltipTitleFormatter: month };

export default function AreaChartPage() {
  return (
    <Page meta={meta} lead="시간에 따라 값이 변하는 모습을 선과 그 아래를 채운 면으로 보여 주는 차트입니다. 하나하나의 값보다 전체적인 양과 흐름을 볼 때 씁니다.">
      <Section title="언제 쓰는가">
        <Demo caption="월별 수집 건수" column>
          <Chart.Area data={monthly} groupKey="월" plotWidth={640} plotHeight={220} {...axis} aria-label="월별 수집 건수" />
        </Demo>
        <Table
          head={["보여 주려는 것", "차트"]}
          rows={[
            ["기간 동안 쌓인 양이 얼마나 큰지, 큰 흐름", "영역 차트"],
            ["정확한 값, 여러 계열의 변화 비교", "꺾은선 차트"],
            ["전체 양과 각 계열이 차지하는 몫", "누적 영역 차트"],
            ["기간별 값을 하나씩 비교", "막대 차트"],
          ]}
        />
        <Rules
          items={[
            "넓게 보는 차트입니다. 꺾은선 차트가 \"어떻게 변했는가\"를 보여 준다면, 영역 차트는 \"그동안 얼마나 많았는가\"를 보여 줍니다.",
            "계열은 4개까지입니다. 그보다 많으면 면이 겹쳐 읽을 수 없으므로 꺾은선 차트를 씁니다.",
            "두 축이 무엇인지 분명해야 합니다. 제목으로 부족하면 축 이름을 붙입니다.",
            "세로축은 0에서 시작합니다. 면의 넓이가 양을 뜻하므로 축을 자르면 양이 달라 보입니다.",
            "양과 함께 구성 비중도 보여 주려면 누적 영역 차트를 씁니다.",
          ]}
        />
      </Section>

      <Section title="선과 면">
        <Demo caption="점 표시 (showDots) — 값이 몇 개 없거나 수집 간격이 고르지 않을 때" column>
          <Chart.Area data={few} groupKey="월" showDots plotWidth={480} plotHeight={200} {...axis} aria-label="점을 표시한 영역 차트" />
        </Demo>
        <Table
          head={["요소", "모양"]}
          rows={[
            ["선", "두께 3px. 기본은 꺾이는 직선입니다."],
            ["면", "선과 같은 색을 20% 진하기로 채웁니다."],
            ["점", "지름 8px, 흰색 테두리 1px. 마우스를 올리면 10px로 커집니다."],
          ]}
        />
        <Rules
          items={[
            <>기본은 곡선 처리를 하지 않습니다(<Code>curve</Code>를 주지 않음). 꺾이는 선이 정확한 값을 읽기 쉽습니다.</>,
            <>값이 적거나 수집 간격이 고르지 않으면 <Code>showDots</Code>로 점을 표시합니다. 값이 촘촘하면 점을 뺍니다.</>,
            <>색은 <Code>--ec-chart-1</Code>부터 순서대로 자동으로 칠해집니다. 면의 진하기를 따로 바꾸지 않습니다.</>,
          ]}
        />
      </Section>

      <Section title="계열이 둘 이상일 때">
        <Demo caption="겹쳐 그리기 (stacked={false}) — 각 계열의 값을 0부터 그립니다" column>
          <Chart.Area data={twoSeries} groupKey="월" stacked={false} plotWidth={640} plotHeight={220} {...axis} aria-label="월별 수집·처리 건수" />
        </Demo>
        <Rules
          items={[
            <><Code>Chart.Area</Code>는 계열이 여럿이면 기본으로 쌓아 그립니다. 쌓지 않고 겹쳐 그리려면 <Code>stacked={"{false}"}</Code>를 줍니다.</>,
            "겹쳐 그리는 것은 계열이 둘이고 한쪽이 항상 다른 쪽보다 작을 때만 씁니다(수집 건수와 그중 처리한 건수). 그렇지 않으면 뒤의 면이 가려집니다.",
            "계열이 서로 더해지는 관계면 누적 영역 차트로 그립니다.",
            "계열이 둘 이상이면 범례가 자동으로 나옵니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "차트 위에 마우스를 올리면 가장 가까운 점에 세로 안내선이 나오고, 점이 커지고, 그 시점의 값이 설명 상자에 나옵니다.",
            "계열이 여럿이면 설명 상자에 그 시점의 모든 계열 값을 함께 보여 줍니다.",
            <>면을 누를 수 있게 하려면 <Code>onClickArea</Code>를 씁니다.</>,
            "설명 상자의 자세한 규칙은 차트 기본 구조와 꺾은선 차트를 따릅니다.",
          ]}
        />
      </Section>

      <Section title="예외 상황">
        <Sub title="값이 하나일 때">
          <Demo column>
            <Chart.Area data={one} groupKey="월" showDots plotWidth={320} plotHeight={160} {...axis} aria-label="값이 하나인 영역 차트" />
          </Demo>
          <P>면을 그릴 수 없으므로 점을 반드시 표시합니다. 그 값의 높이에 선을 긋는다면 회색 점선으로 그려 실제 추이가 아님을 나타냅니다.</P>
        </Sub>
        <Sub title="값이 둘일 때">
          <Demo column>
            <Chart.Area data={two} groupKey="월" showDots xTicksCount={2} plotWidth={320} plotHeight={160} {...axis} aria-label="값이 둘인 영역 차트" />
          </Demo>
          <P>점을 반드시 표시합니다. 두 날짜가 붙어 있든 멀리 떨어져 있든 같습니다.</P>
        </Sub>
        <Sub title="값이 모두 0일 때">
          <Demo column>
            <Chart.Area data={zeros} groupKey="월" plotWidth={480} plotHeight={160} {...axis} aria-label="값이 모두 0인 영역 차트" />
          </Demo>
          <P>0은 데이터입니다. 선을 0 높이의 축 위에 그립니다. 빈 상태로 바꾸지 않습니다.</P>
        </Sub>
        <Sub title="중간에 값이 없을 때">
          <Demo caption="3~4월 값 없음 — 아는 두 점 사이를 점선으로 잇습니다" column>
            <Chart.Area data={gap} groupKey="월" stacked={false} showDots plotWidth={480} plotHeight={180} {...axis} aria-label="중간에 값이 없는 영역 차트" />
          </Demo>
          <Rules
            items={[
              <>값이 없는 기간은 앞뒤의 아는 점 사이를 점선으로 잇습니다. 데이터에서 그 자리의 값을 <Code>interpolateValue</Code>로 넣습니다.</>,
              <><Code>interpolateValue</Code>는 <Code>stacked={"{false}"}</Code>일 때만 쓸 수 있습니다. 쌓아 그리는 차트는 빈 값 위에 다른 계열을 쌓을 수 없기 때문입니다.</>,
              "값이 없는 자리를 0으로 그리지 않습니다. 0은 \"0건이었다\"는 뜻이고, 값 없음은 \"모른다\"는 뜻입니다.",
              "값이 없는 점에 마우스를 올리면 설명 상자에 \"값 없음\"이라고 적고, 이유를 알면 함께 적습니다.",
            ]}
          />
        </Sub>
        <Sub title="처음 불러올 때">
          <Demo>
            <Box w={320}>
              <Skeleton h={160}>
                <AreaChartSkeleton />
              </Skeleton>
            </Box>
          </Demo>
          <P>
            처음 불러오는 동안에는 <Code>AreaChartSkeleton</Code>을 보여 줍니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다. 오류나 데이터 없음 같은 그 밖의 빈 상태는 차트 기본 구조의 빈 상태 규칙을 따릅니다.
          </P>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <Chart.Area data={twoSeries} groupKey="월" stacked={false} plotWidth={280} plotHeight={160} showLegend={false} {...axis} aria-label="계열이 둘인 영역 차트" />,
            text: "계열은 4개까지만 그립니다.",
          }}
          bad={{
            demo: <Chart.Area data={many} groupKey="월" stacked={false} plotWidth={280} plotHeight={160} showLegend={false} {...axis} aria-label="계열이 여섯인 영역 차트" />,
            text: "계열을 많이 겹치지 않습니다. 면이 섞여 어느 것도 읽을 수 없습니다. 꺾은선 차트를 씁니다.",
          }}
        />
        <DoDont
          good={{ text: "가로축에는 시간을 놓습니다." }}
          bad={{ text: "부서, 유형처럼 순서가 없는 항목을 영역 차트로 그리지 않습니다. 막대 차트를 씁니다." }}
        />
      </Section>
    </Page>
  );
}

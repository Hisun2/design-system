import React from "react";
import { Chart, Plot, XAxis, YAxis, Line } from "@ec21rnc/ui/chart";
import { scaleLinear } from "@ec21rnc/ui/chart";
import { LineChartSkeleton, Box } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "꺾은선 차트", order: 21 };

const months = Array.from({ length: 12 }, (_, i) => ({
  월: i + 1,
  접수: 120 + i * 8 + (i % 3) * 14,
  승인: 90 + i * 6 + (i % 4) * 9,
  반려: 20 + (i % 5) * 4,
}));
const few = [
  { 월: 1, 접수: 120 },
  { 월: 4, 접수: 164 },
  { 월: 7, 접수: 151 },
  { 월: 10, 접수: 198 },
];
const one = [{ 월: 6, 접수: 150 }];
const two = [
  { 월: 6, 접수: 150 },
  { 월: 7, 접수: 172 },
];
const zeros = Array.from({ length: 6 }, (_, i) => ({ 월: i + 1, 접수: 0 }));
const gap = [
  { 월: 1, 접수: 120 },
  { 월: 2, 접수: 138 },
  { 월: 3, 접수: null },
  { 월: 4, 접수: null },
  { 월: 5, 접수: 171 },
  { 월: 6, 접수: 160 },
];
const month = (v) => `${v}월`;

// 축을 직접 정합니다. 기본값으로 두면 세 자리 눈금 숫자와 마지막 달 이름이 잘리고, "1.5월" 같은 눈금이 생깁니다.
// months는 가로축 [첫 달, 끝 달], values는 세로축 [아래 끝, 위 끝, 눈금 수]입니다.
const axes = (w, h, [from, to], [low, high, yTicks]) => ({
  plotWidth: w,
  plotHeight: h,
  xScale: scaleLinear().domain([from, to]).range([48, w - 24]),
  yScale: scaleLinear().domain([low, high]).range([h - 32, 12]),
  xTicksCount: to - from,
  yTicksCount: yTicks,
});

const gapAxes = axes(480, 180, [1, 6], [100, 180, 4]);

export default function LinePage() {
  return (
    <Page meta={meta} lead="시간에 따라 숫자가 어떻게 변했는지 선으로 보여 주는 차트입니다. 일정 기간의 추세를 볼 때 씁니다.">
      <Section title="기본 모양">
        <Demo caption="월별 문서 처리 건수" column>
          <Chart.Line data={months} groupKey="월" {...axes(640, 240, [1, 12], [0, 250, 5])} axisXValueFormatter={month} tooltipTitleFormatter={month} aria-label="월별 문서 처리 건수" />
        </Demo>
        <Rules
          items={[
            "두 축이 무엇인지 분명해야 합니다. 차트 제목으로 부족하면 축 이름을 붙입니다.",
            "필요 없는 선과 색을 걷어 냅니다. 보조선, 장식 색, 겹치는 표시가 많으면 추세가 보이지 않습니다.",
            "값이 0 근처에 없고 변화 폭이 작으면 세로축 범위를 좁혀 변화가 보이게 합니다. 이때는 축이 0에서 시작하지 않는다는 것이 눈금에서 분명히 보여야 합니다.",
            "한 차트의 선은 5~7개까지입니다. 더 많으면 차트를 나누거나 범례에서 골라 보게 합니다.",
          ]}
        />
      </Section>

      <Section title="선과 점">
        <Demo caption="점 표시 (showDots) — 값이 몇 개 없거나 수집 간격이 고르지 않을 때" column>
          <Chart.Line data={few} groupKey="월" showDots {...axes(480, 200, [1, 10], [100, 200, 5])} axisXValueFormatter={month} tooltipTitleFormatter={month} aria-label="분기별 접수 건수" />
        </Demo>
        <Table
          head={["요소", "모양"]}
          rows={[
            ["선", "두께 3px. 기본은 꺾이는 직선입니다."],
            ["점", "지름 8px, 흰색 테두리 1px. 마우스를 올리면 10px로 커집니다."],
            ["안내선", "마우스를 올린 위치에서 가장 가까운 점에 세로 선이 나옵니다."],
          ]}
        />
        <Rules
          items={[
            <>기본은 곡선 처리를 하지 않습니다(<Code>curve</Code>를 주지 않음). 꺾이는 선이 정확한 값을 읽기 쉽습니다.</>,
            <>값이 적거나 수집 간격이 고르지 않으면 <Code>showDots</Code>로 점을 표시합니다. 값이 촘촘하면 점을 빼고 선만 그립니다.</>,
            <>부드러운 곡선은 흐름의 인상만 보여 주면 되는 경우에만 <Code>curve</Code>로 줍니다.</>,
          ]}
        />
      </Section>

      <Section title="색">
        <Rules
          items={[
            <>선 색은 <Code>--ec-chart-1</Code>부터 번호 순서대로 씁니다. 컴포넌트가 데이터의 계열 순서대로 자동으로 칠합니다.</>,
            <>특정 계열의 색을 고정해야 하면 <Code>colorMap</Code>에 계열 이름과 색을 적습니다.</>,
            "같은 계열은 화면이 달라도 같은 색을 씁니다.",
            "색만으로 선을 구분하게 하지 않습니다. 범례와 설명 상자에 계열 이름을 함께 적습니다.",
          ]}
        />
      </Section>

      <Section title="꺾은선과 영역 차트 고르기">
        <Table
          head={["보여 주려는 것", "차트"]}
          rows={[
            ["여러 계열의 변화를 서로 비교", "꺾은선 차트"],
            ["정확한 값과 변화의 기울기", "꺾은선 차트"],
            ["한 계열의 양이 얼마나 큰지", "영역 차트"],
            ["여러 계열을 쌓은 전체와 각 몫", "누적 영역 차트"],
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "차트 위에 마우스를 올리면 가장 가까운 점에 세로 안내선이 나오고, 그 시점의 값이 설명 상자에 나옵니다.",
            "계열이 여럿이면 설명 상자에 그 시점의 모든 계열 값을 한꺼번에 보여 줍니다. 각 선 위에는 점을 표시합니다.",
            "설명 상자 안의 계열 순서는 차트·범례의 순서와 같게 합니다.",
            "값이 없는 구간에 마우스를 올리면 설명 상자에 \"값 없음\"이라고 적습니다.",
            <>범례의 항목을 끄면 그 선이 사라집니다. 선을 누를 수 있게 하려면 <Code>onClickLine</Code>을 씁니다.</>,
          ]}
        />
      </Section>

      <Section title="예외 상황">
        <Sub title="값이 하나일 때">
          <Demo column>
            <Chart.Line data={one} groupKey="월" showDots {...axes(320, 160, [5, 7], [0, 200, 4])} axisXValueFormatter={month} aria-label="값이 하나인 꺾은선 차트" />
          </Demo>
          <P>선을 이을 수 없으므로 점을 반드시 표시합니다. 그 값의 높이를 가로지르는 선을 긋는다면 회색 점선으로 그려 실제 추세가 아님을 나타냅니다.</P>
        </Sub>
        <Sub title="값이 둘일 때">
          <Demo column>
            <Chart.Line data={two} groupKey="월" showDots {...axes(320, 160, [6, 7], [140, 180, 4])} axisXValueFormatter={month} aria-label="값이 둘인 꺾은선 차트" />
          </Demo>
          <P>점을 반드시 표시합니다. 두 날짜가 붙어 있든 멀리 떨어져 있든 같습니다.</P>
        </Sub>
        <Sub title="값이 모두 0일 때">
          <Demo column>
            <Chart.Line data={zeros} groupKey="월" {...axes(480, 160, [1, 6], [0, 10, 2])} axisXValueFormatter={month} aria-label="값이 모두 0인 꺾은선 차트" />
          </Demo>
          <P>0은 데이터입니다. 선을 0 높이의 축 위에 그립니다.</P>
        </Sub>
        <Sub title="중간에 값이 없을 때">
          <Demo caption="3~4월 값 없음 — 아는 두 점 사이를 점선으로 잇습니다" column>
            <Plot data={gap} scale={[gapAxes.xScale, gapAxes.yScale]} width={480} height={180} aria-label="중간에 값이 없는 꺾은선 차트">
              <YAxis>
                <YAxis.Ticks ticks={[100, 120, 140, 160, 180]} />
                <YAxis.Grid ticks={[100, 120, 140, 160, 180]} />
              </YAxis>
              <XAxis>
                <XAxis.Ticks ticks={[1, 2, 3, 4, 5, 6]}>{({ value }) => ({ children: month(value) })}</XAxis.Ticks>
              </XAxis>
              <Line x="월" y="접수">
                <Line.Null />
                <Line.Dots display />
              </Line>
            </Plot>
          </Demo>
          <Rules
            items={[
              <>값이 없는 기간은 앞뒤의 아는 점 사이를 회색 점선으로 잇습니다. 데이터에서 그 자리의 값을 <Code>null</Code>로 넣고, 조립형 <Code>Line</Code> 안에 <Code>Line.Null</Code>을 둡니다.</>,
              <><Code>interpolateValue</Code>를 넣으면 그 자리를 건너뛰고 실선으로 이어 버립니다. 값이 없다는 것이 보이지 않으므로 쓰지 않습니다.</>,
              "값이 없는 자리를 0으로 그리지 않습니다. 0은 \"0건이었다\"는 뜻이고, 값 없음은 \"모른다\"는 뜻입니다.",
              "값이 없는 점에 마우스를 올리면 \"값 없음\"이라고 적고, 이유를 알면 함께 적습니다.",
            ]}
          />
        </Sub>
        <Sub title="처음 불러올 때">
          <Demo>
            <Box w={320}>
              <LineChartSkeleton h={160} />
            </Box>
          </Demo>
          <P>
            처음 불러오는 동안에는 <Code>LineChartSkeleton</Code>을 보여 줍니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다. 오류나 데이터 없음 같은 그 밖의 빈 상태는 위젯 빈 상태 규칙을 따릅니다.
          </P>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "가로축에는 시간을 놓고, 간격을 실제 시간 간격과 같게 둡니다." }}
          bad={{ text: "시간 순서가 없는 항목(부서, 거래처 유형)을 선으로 잇지 않습니다. 그럴 때는 막대 차트를 씁니다." }}
        />
        <DoDont
          good={{ text: "선이 일곱 개를 넘으면 중요한 몇 개만 남기거나 차트를 나눕니다." }}
          bad={{ text: "열 개가 넘는 선을 한 차트에 겹쳐 그리지 않습니다." }}
        />
      </Section>
    </Page>
  );
}

import React from "react";
import { Chart } from "@ec21rnc/ui/chart";
import { scaleLinear } from "@ec21rnc/ui/chart";
import { ScatterPlotChartSkeleton, Box, Flex } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "산점도", order: 25 };

// 가로: 담당 문서 수, 세로: 평균 처리 일수
const up = [4, 7, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].map((x, i) => ({ 문서수: x, 처리일수: 2 + x * 0.3 + (i % 3) }));
const down = [4, 7, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].map((x, i) => ({ 문서수: x, 처리일수: 14 - x * 0.3 + (i % 3) }));
const none = [4, 7, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].map((x, i) => ({ 문서수: x, 처리일수: 3 + ((i * 7) % 11) }));
const teams = [5, 9, 13, 17, 21, 25, 29, 33].map((x, i) => ({ 문서수: x, 영업팀: 3 + x * 0.25 + (i % 2), 구매팀: 9 - x * 0.1 + (i % 3) }));
const valued = [
  { 문서수: 6, 처리일수: 4, 건수: 12 },
  { 문서수: 12, 처리일수: 6, 건수: 48 },
  { 문서수: 19, 처리일수: 7, 건수: 7 },
  { 문서수: 26, 처리일수: 11, 건수: 86 },
  { 문서수: 33, 처리일수: 12, 건수: 31 },
];
const withZero = [
  { 문서수: 0, 처리일수: 0 },
  { 문서수: 10, 처리일수: 5 },
  { 문서수: 20, 처리일수: 8 },
];

// 축의 범위를 값보다 넉넉하게 직접 정합니다. 기본값으로 두면 가장 작은 값과 큰 값의 점이 가장자리에서 잘리고 눈금이 촘촘해집니다.
// x, y는 각각 [아래 끝, 위 끝, 눈금 수]입니다.
const axes = (w, h, [x0, x1, xTicks], [y0, y1, yTicks]) => ({
  plotWidth: w,
  plotHeight: h,
  xScale: scaleLinear().domain([x0, x1]).range([40, w - 16]),
  yScale: scaleLinear().domain([y0, y1]).range([h - 30, 12]),
  xTicksCount: xTicks,
  yTicksCount: yTicks,
});

export default function ScatterplotPage() {
  return (
    <Page meta={meta} lead="두 숫자의 관계를 점의 위치로 보여 주는 차트입니다. 점 하나가 대상 하나이고, 가로와 세로가 각각 하나의 숫자입니다. 점이 모이는 모양에서 경향, 무리, 튀는 값을 찾습니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "두 숫자 사이에 관계가 있는지 알아볼 때. 데이터가 많을수록 쓸모가 큽니다.",
            "데이터가 어디에 무리 지어 있는지, 어느 것이 무리에서 벗어나 있는지 볼 때.",
            "점의 크기와 색으로 세 번째, 네 번째 숫자까지 함께 보여 줄 때(크기를 쓰면 버블 차트가 됩니다).",
          ]}
        />
      </Section>

      <Section title="읽는 법">
        <Demo caption="함께 커짐 / 반대로 움직임 / 관계 없음">
          <Flex gap={6} flexWrap>
            <Box w={240}>
              <Chart.ScatterPlot data={up} groupKey="문서수" {...axes(240, 180, [0, 40, 4], [0, 16, 4])} aria-label="함께 커지는 관계" />
            </Box>
            <Box w={240}>
              <Chart.ScatterPlot data={down} groupKey="문서수" {...axes(240, 180, [0, 40, 4], [0, 16, 4])} aria-label="반대로 움직이는 관계" />
            </Box>
            <Box w={240}>
              <Chart.ScatterPlot data={none} groupKey="문서수" {...axes(240, 180, [0, 40, 4], [0, 16, 4])} aria-label="관계가 보이지 않는 경우" />
            </Box>
          </Flex>
        </Demo>
        <Table
          head={["점의 모양", "뜻"]}
          rows={[
            ["왼쪽 아래에서 오른쪽 위로 이어짐", "한쪽이 커지면 다른 쪽도 커지는 경향이 있습니다."],
            ["왼쪽 위에서 오른쪽 아래로 이어짐", "한쪽이 커지면 다른 쪽은 작아지는 경향이 있습니다."],
            ["뚜렷한 줄이 보이지 않음", "두 숫자 사이에 관계가 없을 가능성이 큽니다."],
          ]}
        />
        <P>함께 움직인다고 해서 한쪽이 다른 쪽의 원인이라는 뜻은 아닙니다. 차트에 없는 다른 요인이 둘 다에 영향을 줬을 수 있습니다. 화면 문구에서도 "~때문에"라고 단정하지 않습니다.</P>
      </Section>

      <Section title="구성">
        <Rules
          items={[
            "가로 눈금선과 세로 눈금선을 모두 그립니다. 점의 위치를 두 방향으로 읽어야 하기 때문입니다.",
            "가로축과 세로축에 이름을 분명히 붙입니다. 축 이름에는 색을 칠하지 않습니다.",
            "데이터 묶음이 둘 이상이어서 색이 여럿이면 범례를 둡니다.",
            "점의 크기는 지름 11px입니다.",
          ]}
        />
        <Sub title="묶음이 하나일 때">
          <Demo column>
            <Chart.ScatterPlot data={up} groupKey="문서수" {...axes(480, 240, [0, 40, 8], [0, 16, 4])} aria-label="담당 문서 수와 평균 처리 일수" />
          </Demo>
          <P>
            점은 <Code>--ec-chart-1</Code> 색에 불투명도 50%입니다. 점이 겹친 곳이 진하게 보여 몰린 곳을 알 수 있습니다. 필요하면 다른 차트 색으로 바꿀 수 있습니다.
          </P>
        </Sub>
        <Sub title="묶음이 여럿일 때">
          <Demo column>
            <Chart.ScatterPlot data={teams} groupKey="문서수" showLegend {...axes(480, 240, [0, 40, 8], [0, 16, 4])} aria-label="팀별 담당 문서 수와 평균 처리 일수" />
          </Demo>
          <P>
            색은 <Code>--ec-chart-1</Code>부터 번호 순서대로 씁니다. 묶음 수는 적게 유지합니다. 많아지면 점이 섞여 무리를 구분할 수 없습니다.
          </P>
        </Sub>
      </Section>

      <Section title="점 안의 값">
        <Demo caption="valueKey로 점 안에 숫자 표시" column>
          <Chart.ScatterPlot data={valued} groupKey="문서수" valueKey="건수" {...axes(480, 240, [0, 40, 8], [0, 16, 4])} aria-label="담당 문서 수, 처리 일수와 반려 건수" />
        </Demo>
        <Rules
          items={[
            <>점 안에 숫자를 적을 수 있습니다. <Code>valueKey</Code>에 값이 든 칸 이름을 줍니다.</>,
            "값을 적는 점은 지름 24px, 글자는 12px입니다.",
            "점 안에는 두 자리까지만 들어갑니다. 100 이상은 \"99+\"로 적고 정확한 값은 설명 상자에서 보여 줍니다.",
            "글자색은 점보다 한 단계 진한 같은 계열 색을 씁니다. 예를 들어 점이 --ec-chart-1이면 글자는 --ec-chart-7입니다.",
          ]}
        />
      </Section>

      <Section title="범례">
        <Rules
          items={[
            "묶음이 둘 이상이면 범례를 둡니다.",
            "범례는 세로로 나열하는 쪽을 권합니다. 이름을 위아래로 훑으며 견주기 쉽습니다.",
            "값이 0뿐이거나 데이터가 없는 묶음도 범례에는 남기고, 그 상태를 범례에 적습니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "점에 마우스를 올리면 그 점의 불투명도가 80%로 진해지고 설명 상자가 나옵니다.",
            <>점을 누를 수 있으면 마우스 모양을 손가락으로 바꿉니다. 누름은 <Code>onClickScatterItem</Code>으로 받습니다.</>,
          ]}
        />
        <Sub title="설명 상자">
          <Rules
            items={[
              "가로축 값과 세로축 값을 보여 줍니다.",
              "축 이름이나 묶음 이름보다 값이 눈에 먼저 들어오게 합니다. 값을 굵게, 이름을 보조 색으로 적습니다.",
              "묶음이 여럿이면 그 점이 속한 묶음의 색 표시를 함께 넣습니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="예외 상황">
        <Sub title="값이 0일 때">
          <Demo column>
            <Chart.ScatterPlot data={withZero} groupKey="문서수" {...axes(320, 180, [-2, 22, 4], [-1, 10, 5])} aria-label="0 값이 있는 산점도" />
          </Demo>
          <P>0은 데이터입니다. 두 값이 모두 0인 점은 두 축의 0이 만나는 곳에 찍습니다. 점이 잘리지 않게 축의 범위를 0보다 조금 아래에서 시작합니다. 범례에도 0으로 적습니다.</P>
        </Sub>
        <Sub title="값이 없을 때">
          <P>값이 없는 대상은 점을 찍지 않습니다. 0 위치에 찍지 않습니다. 빠진 것이 있다는 사실은 범례에 적습니다.</P>
        </Sub>
        <Sub title="점이 축에 붙을 때">
          <P>축의 범위를 가장 작은 값과 가장 큰 값에 딱 맞추면 가장자리의 점이 잘립니다. <Code>xScale</Code>과 <Code>yScale</Code>로 범위를 값보다 넉넉하게 정해 점이 온전히 보이게 합니다.</P>
        </Sub>
        <Sub title="처음 불러올 때">
          <Demo>
            <Box w={320}>
              <ScatterPlotChartSkeleton h={160} />
            </Box>
          </Demo>
          <P>
            처음 불러오는 동안에는 <Code>ScatterPlotChartSkeleton</Code>을 보여 줍니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다. 오류나 데이터 없음 같은 그 밖의 빈 상태는 위젯 빈 상태 규칙을 따릅니다.
          </P>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "두 축 모두에 이름과 단위를 적습니다(담당 문서 수(건), 평균 처리 일수(일)). 축 글자는 회색 한 가지입니다." }}
          bad={{ text: "축 이름에 색을 칠하지 않습니다. 색은 점에만 씁니다." }}
        />
        <DoDont
          good={{ text: "세로축을 0에서 시작합니다." }}
          bad={{ text: "세로축을 중간에서 시작하지 않습니다. 기울기가 실제보다 가파르게 보여 관계가 강한 것처럼 읽힙니다." }}
        />
        <DoDont
          good={{ text: "묶음은 서너 개까지만 한 차트에 올립니다." }}
          bad={{ text: "묶음을 많이 겹쳐 색이 뒤섞이게 두지 않습니다. 묶음별로 차트를 나눕니다." }}
        />
      </Section>
    </Page>
  );
}

import React from "react";
import { Box, Skeleton, AreaChartSkeleton } from "@ec21rnc/ui";
import { Chart } from "@ec21rnc/ui/chart";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "누적 영역 차트", order: 11 };

const monthly = [
  { 월: 1, 계약서: 120, 견적서: 90, 보고서: 60 },
  { 월: 2, 계약서: 150, 견적서: 80, 보고서: 70 },
  { 월: 3, 계약서: 140, 견적서: 110, 보고서: 65 },
  { 월: 4, 계약서: 190, 견적서: 120, 보고서: 80 },
  { 월: 5, 계약서: 220, 견적서: 130, 보고서: 95 },
  { 월: 6, 계약서: 210, 견적서: 150, 보고서: 90 },
  { 월: 7, 계약서: 240, 견적서: 160, 보고서: 110 },
  { 월: 8, 계약서: 270, 견적서: 170, 보고서: 120 },
];
const few = [1, 4, 8, 12].map((m, i) => ({ 월: m, 계약서: 120 + i * 40, 견적서: 90 + i * 25 }));
const many = monthly.map((row, i) => ({ ...row, 영수증: 50 + (i % 2) * 15, 신청서: 40 + i * 6, 공문: 30 + (i % 4) * 8, 회의록: 25 + i * 3 }));
const one = [{ 월: 6, 계약서: 210, 견적서: 150 }];
const two = [
  { 월: 6, 계약서: 210, 견적서: 150 },
  { 월: 7, 계약서: 240, 견적서: 160 },
];
const zeros = [1, 2, 3, 4, 5, 6].map((m) => ({ 월: m, 계약서: 0, 견적서: 0 }));
const month = (v) => `${v}월`;
const axis = { axisXValueFormatter: month, tooltipTitleFormatter: month };

export default function StackedAreaChartPage() {
  return (
    <Page meta={meta} lead="여러 계열의 영역을 아래에서 위로 쌓아 그린 차트입니다. 전체 양이 어떻게 변했는지와 각 계열이 그 안에서 얼마를 차지하는지를 함께 보여 줍니다.">
      <Section title="언제 쓰는가">
        <Demo caption="월별 문서 유형별 수집 건수" column>
          <Chart.Area data={monthly} groupKey="월" showTotalInTooltip plotWidth={640} plotHeight={240} {...axis} aria-label="월별 문서 유형별 수집 건수" />
        </Demo>
        <Rules
          items={[
            "계열들을 더한 값에 뜻이 있을 때 씁니다(유형별 건수를 더하면 전체 건수). 더할 수 없는 값(평균, 비율)은 쌓지 않습니다.",
            "맨 위의 선이 전체 양이고, 각 면의 두께가 그 계열의 양입니다.",
            "계열은 4개까지입니다. 더 많으면 얇은 면이 생겨 읽을 수 없으므로 작은 계열을 \"기타\"로 묶거나 꺾은선 차트를 씁니다.",
            "각 계열의 정확한 변화를 비교해야 하면 꺾은선 차트가 낫습니다. 위에 쌓인 계열은 바닥이 움직여 변화를 읽기 어렵습니다.",
            "두 축이 무엇인지 분명해야 합니다. 제목으로 부족하면 축 이름을 붙입니다.",
            "세로축은 0에서 시작합니다.",
          ]}
        />
        <Table
          head={["보여 주려는 것", "차트"]}
          rows={[
            ["전체 양과 각 계열의 몫이 시간에 따라 변하는 모습", "누적 영역 차트"],
            ["한 계열의 양", "영역 차트"],
            ["계열끼리의 변화 비교", "꺾은선 차트"],
            ["몇 개 시점의 구성 비교", "누적 막대 차트"],
          ]}
        />
      </Section>

      <Section title="선과 면">
        <Demo caption="점 표시 (showDots) — 값이 몇 개 없거나 수집 간격이 고르지 않을 때" column>
          <Chart.Area data={few} groupKey="월" showDots plotWidth={480} plotHeight={200} {...axis} aria-label="점을 표시한 누적 영역 차트" />
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
            <><Code>Chart.Area</Code>에 계열을 둘 이상 주면 쌓아 그립니다. 따로 줄 속성은 없습니다.</>,
            <>기본은 곡선 처리를 하지 않습니다(<Code>curve</Code>를 주지 않음). 꺾이는 선이 정확한 값을 읽기 쉽습니다.</>,
            <>값이 적거나 수집 간격이 고르지 않으면 <Code>showDots</Code>로 점을 표시합니다.</>,
          ]}
        />
      </Section>

      <Section title="쌓는 순서와 색">
        <Rules
          items={[
            "가장 크거나 가장 안정적인 계열을 맨 아래에 둡니다. 바닥이 평평해야 위의 계열도 읽기 쉽습니다.",
            "쌓는 순서는 데이터의 계열 순서를 따릅니다. 범례와 설명 상자의 순서도 같게 합니다.",
            <>색은 <Code>--ec-chart-1</Code>부터 순서대로 자동으로 칠해집니다. 이웃한 면이 잘 구분되도록 순서를 건너뛰지 않습니다.</>,
            "\"기타\"로 묶은 계열은 맨 위에 두고 회색으로 칠합니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "차트 위에 마우스를 올리면 가장 가까운 시점에 세로 안내선이 나오고, 각 계열의 점이 커지고, 설명 상자가 나옵니다.",
            <>설명 상자에는 그 시점의 모든 계열 값을 보여 줍니다. 전체 양이 중요한 차트이므로 <Code>showTotalInTooltip</Code>으로 합계를 함께 보여 줍니다.</>,
            "설명 상자의 값은 쌓인 높이가 아니라 그 계열 자체의 값입니다.",
            "범례에서 계열을 끄면 나머지 계열이 다시 쌓입니다.",
            "설명 상자의 자세한 규칙은 차트 기본 구조와 꺾은선 차트를 따릅니다.",
          ]}
        />
      </Section>

      <Section title="예외 상황">
        <Sub title="값이 하나일 때">
          <Demo column>
            <Chart.Area data={one} groupKey="월" showDots plotWidth={320} plotHeight={160} {...axis} aria-label="값이 하나인 누적 영역 차트" />
          </Demo>
          <P>면을 그릴 수 없으므로 점을 반드시 표시합니다. 그 값의 높이에 선을 긋는다면 회색 점선으로 그려 실제 추이가 아님을 나타냅니다.</P>
        </Sub>
        <Sub title="값이 둘일 때">
          <Demo column>
            <Chart.Area data={two} groupKey="월" showDots xTicksCount={2} plotWidth={320} plotHeight={160} {...axis} aria-label="값이 둘인 누적 영역 차트" />
          </Demo>
          <P>점을 반드시 표시합니다. 두 날짜가 붙어 있든 멀리 떨어져 있든 같습니다.</P>
        </Sub>
        <Sub title="값이 모두 0일 때">
          <Demo column>
            <Chart.Area data={zeros} groupKey="월" plotWidth={480} plotHeight={160} {...axis} aria-label="값이 모두 0인 누적 영역 차트" />
          </Demo>
          <P>0은 데이터입니다. 선을 0 높이의 축 위에 그립니다. 빈 상태로 바꾸지 않습니다.</P>
        </Sub>
        <Sub title="중간에 값이 없을 때">
          <Rules
            items={[
              "값이 없는 기간은 앞뒤의 아는 점 사이를 점선으로 이어 실제 값이 아님을 나타냅니다.",
              "값이 없는 자리를 0으로 그리지 않습니다. 0은 \"0건이었다\"는 뜻이고, 값 없음은 \"모른다\"는 뜻입니다.",
              "값이 없는 시점에 마우스를 올리면 설명 상자에 \"값 없음\"이라고 적고, 이유를 알면 함께 적습니다.",
              <>쌓아 그리는 <Code>Chart.Area</Code>는 빈 값 표시(<Code>interpolateValue</Code>)를 받지 못합니다. 한 계열이라도 빈 기간이 있으면 그 기간을 뺀 차트로 그리거나, 쌓지 않는 영역 차트나 꺾은선 차트로 바꿉니다.</>,
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
            demo: <Chart.Area data={monthly} groupKey="월" plotWidth={280} plotHeight={160} showLegend={false} {...axis} aria-label="계열이 셋인 누적 영역 차트" />,
            text: "계열은 4개까지만 쌓습니다.",
          }}
          bad={{
            demo: <Chart.Area data={many} groupKey="월" plotWidth={280} plotHeight={160} showLegend={false} {...axis} aria-label="계열이 일곱인 누적 영역 차트" />,
            text: "계열을 많이 쌓지 않습니다. 얇은 면은 읽을 수 없습니다. 작은 계열은 \"기타\"로 묶습니다.",
          }}
        />
        <DoDont
          good={{ text: "더하면 전체가 되는 값만 쌓습니다." }}
          bad={{ text: "승인율, 평균 처리 일수처럼 더해도 뜻이 없는 값을 쌓지 않습니다." }}
        />
      </Section>
    </Page>
  );
}

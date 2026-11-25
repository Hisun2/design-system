import React from "react";
import { Box, Flex, Text, Skeleton, BarChartSkeleton } from "@ec21rnc/ui";
import { Chart } from "@ec21rnc/ui/chart";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "가로 막대 차트", order: 14 };

const teams = [
  { 부서: "영업", 건수: 480 },
  { 부서: "구매", 건수: 360 },
  { 부서: "재무", 건수: 210 },
  { 부서: "인사", 건수: 140 },
  { 부서: "총무", 건수: 90 },
];
const unsorted = [teams[3], teams[0], teams[4], teams[2], teams[1]];
const share = [
  { 유형: "계약서", 비중: 42 },
  { 유형: "견적서", 비중: 27 },
  { 유형: "보고서", 비중: 19 },
  { 유형: "기타", 비중: 12 },
];
const twoSeries = teams.slice(0, 4).map((row, i) => ({ 부서: row.부서, 접수: row.건수, 승인: row.건수 - 40 - i * 15 }));
const zeros = teams.slice(0, 3).map((row) => ({ 부서: row.부서, 건수: 0 }));
const missing = [
  { 부서: "영업", 건수: 480 },
  { 부서: "구매", 건수: null },
  { 부서: "재무", 건수: 210 },
];
const few = teams.slice(0, 2);
const percent = (v) => `${v}%`;

export default function HorizontalBarChartPage() {
  return (
    <Page meta={meta} lead="항목마다 값을 가로로 누운 막대의 길이로 보여 주는 차트입니다. 항목 이름을 막대 옆에 온전히 적을 수 있어 이름이 길거나 순위를 보여 줄 때 씁니다.">
      <Section title="언제 쓰는가">
        <Demo caption="부서별 처리 건수 (invertAxis)" column>
          <Chart.Bar data={teams} groupKey="부서" invertAxis plotWidth={560} plotHeight={220} aria-label="부서별 처리 건수" />
        </Demo>
        <Table
          head={["쓰는 때", "쓰지 않는 때"]}
          rows={[
            ["항목이 10개 미만일 때", "추이를 보여 줄 때 → 꺾은선 차트"],
            ["항목마다 이름과 값을 적어야 할 때", "시간에 따른 값을 보여 줄 때 → 막대 차트(세로), 꺾은선 차트"],
            ["정해진 순서(순위)로 항목을 보여 줄 때", "항목의 합이 100%일 때 → 도넛 차트, 촘촘한 가로 막대 차트"],
          ]}
        />
        <Rules
          items={[
            "가로축에 시간을 놓는 것이 익숙하므로, 기간별 값은 세로 막대로 그립니다. 가로 막대는 순서 없는 항목에 씁니다.",
            "항목의 합이 100%이고 자리가 좁거나 이름이 길면 촘촘한 가로 막대 차트를 씁니다.",
            "항목이 10개를 넘으면 상위 몇 개만 그리고 나머지는 표로 보여 줍니다.",
          ]}
        />
        <Sub title="히스토그램과의 구분">
          <P>가로 막대 차트는 이름이 있는 항목을 비교하고 막대 사이를 띄웁니다. 숫자 구간별 개수를 보여 주는 히스토그램과 다릅니다. 자세한 구분은 막대 차트 페이지를 봅니다.</P>
        </Sub>
      </Section>

      <Section title="모양과 여백">
        <Demo caption="묶음 막대 — 항목마다 계열을 위아래로 나란히" column>
          <Chart.Bar data={twoSeries} groupKey="부서" invertAxis plotWidth={560} plotHeight={240} aria-label="부서별 접수·승인 건수" />
        </Demo>
        <Table
          head={["자리", "여백"]}
          rows={[
            ["차트의 위와 아래", "8px"],
            ["항목 이름과 막대 사이", "16px"],
            ["막대와 그 값 사이", "8px"],
            ["항목과 항목 사이", "20px 이상. 이보다 좁으면 줄이 뒤섞여 보입니다."],
            ["묶음 안의 막대 사이", "막대 굵기의 20% 이상"],
          ]}
        />
        <Rules
          items={[
            <><Code>Chart.Bar</Code>에 <Code>invertAxis</Code>를 주면 가로로 그립니다. <Code>groupKey</Code>의 항목이 세로축에 놓입니다.</>,
            <>막대의 굵기는 <Code>maxBarSize</Code>(기본 12px)를 넘지 않습니다.</>,
            "한 묶음에 넣는 계열은 3~4개까지입니다. 더 많으면 누적 가로 막대 차트나 다른 차트를 씁니다.",
            "차트 종류를 바꿔 볼 수 있으면 좋습니다. 묶음과 누적을 바꾸는 선택은 카드 설정에 둡니다.",
            "차트의 높이는 항목 수에 맞춥니다. 항목이 늘어도 막대 사이가 좁아지지 않게 높이를 늘립니다.",
          ]}
        />
      </Section>

      <Section title="축과 보조선">
        <Demo caption="보조선 없음 — 합이 100%인 비중을 보여 줄 때" column>
          <Chart.Bar data={share} groupKey="유형" invertAxis showXAxis={false} tooltipValueFormatter={percent} plotWidth={480} plotHeight={180} aria-label="문서 유형별 비중" />
        </Demo>
        <Demo caption="보조선 있음 — 합이 정해지지 않은 값을 보여 줄 때" column>
          <Chart.Bar data={teams} groupKey="부서" invertAxis xTicksCount={5} plotWidth={480} plotHeight={200} aria-label="부서별 처리 건수와 보조선" />
        </Demo>
        <Rules
          items={[
            "값이 전체에 대한 비중(%)이면 값 축과 보조선을 뺍니다. 막대 끝이 100% 가운데 어디인지만 보이면 됩니다.",
            "건수, 금액처럼 합이 정해지지 않은 값이면 값 축과 세로 보조선을 둡니다. 가로 보조선은 넣지 않습니다.",
            "값 축은 0에서 시작합니다.",
            "항목 이름과 값을 적을 자리를 차트 양옆에 남겨 둡니다.",
            "축이 무엇인지 알 수 없으면 축 이름을 붙입니다.",
          ]}
        />
      </Section>

      <Section title="항목 이름">
        <Rules
          items={[
            <>항목 이름의 글자색은 <Code>--ec-text-primary</Code>입니다. 값 축의 눈금 숫자는 <Code>--ec-text-secondary</Code>입니다.</>,
            "이름은 왼쪽으로 맞춥니다.",
            "이름이 자리보다 길면 말줄임표로 줄이고, 마우스를 올리면 전체 이름을 설명 풍선으로 보여 줍니다.",
            <>이름이 들어갈 폭은 <Code>marginY</Code>로 넓힙니다. 이름이 대부분 잘린다면 폭을 넓히거나 촘촘한 가로 막대 차트를 씁니다.</>,
            "항목 이름을 눌러 그 항목의 상세 화면으로 가게 할 수 있습니다. 이때는 링크 색으로 표시합니다.",
          ]}
        />
      </Section>

      <Section title="색과 범례">
        <Rules
          items={[
            "계열이 하나면 모든 막대를 한 가지 색으로 칠하고 범례를 두지 않습니다. 차트 제목으로 충분합니다.",
            "계열이 여럿이면 범례를 둡니다.",
            "색은 단순하게 씁니다. 특정 항목을 강조하는 것은 꼭 필요할 때만 합니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            <>막대에 마우스를 올리면 그 줄에 옅은 바탕(<Code>--ec-overlay-hover</Code>)이 깔립니다. 지금 보고 있는 항목과 누를 수 있음을 알립니다.</>,
            "바탕은 막대 위아래로 항목 사이 여백의 절반씩을 덮습니다. 줄과 줄의 바탕이 맞닿습니다.",
            "계열이 하나면 그 막대의 줄에, 계열이 여럿이면 그 항목의 묶음 전체에 바탕이 깔립니다.",
            "설명 상자에는 항목 이름과 모든 계열의 값을 보여 줍니다.",
            <>막대를 눌러 상세 화면으로 가게 하려면 <Code>onClickBar</Code>를 씁니다.</>,
          ]}
        />
      </Section>

      <Section title="예외 상황">
        <Sub title="항목이 더 없을 때">
          <Demo column>
            <Chart.Bar data={few} groupKey="부서" invertAxis showXAxis={false} plotWidth={480} plotHeight={100} aria-label="항목이 둘뿐인 가로 막대 차트" />
            <Flex mt={8}>
              <Text color="text-secondary">더 이상 결과가 없습니다</Text>
            </Flex>
          </Demo>
          <P>
            정해진 줄 수보다 항목이 적으면 남는 자리를 비워 두지 말고, 마지막 값 아래 32px(<Code>--ec-spacing-8x</Code>)를 띄워 "더 이상 결과가 없습니다"라고 <Code>--ec-text-secondary</Code> 색으로 적습니다.
          </P>
        </Sub>
        <Sub title="값이 모두 0일 때">
          <Demo column>
            <Chart.Bar data={zeros} groupKey="부서" invertAxis plotWidth={480} plotHeight={140} aria-label="값이 모두 0인 가로 막대 차트" />
          </Demo>
          <P>0은 데이터입니다. 항목 이름과 축은 그대로 그리고, 설명 상자에 0을 적습니다.</P>
        </Sub>
        <Sub title="값이 없는 항목">
          <Demo caption="구매 부서 값 없음" column>
            <Chart.Bar data={missing} groupKey="부서" invertAxis plotWidth={480} plotHeight={140} aria-label="값이 없는 항목이 있는 가로 막대 차트" />
          </Demo>
          <Rules
            items={[
              "값이 없는 항목은 막대와 값을 그리지 않습니다. 항목 이름은 남겨 둡니다.",
              "그 줄에 마우스를 올리면 설명 상자에 \"값 없음\"이라고 적습니다.",
              "왜 없는지, 언제 생기는지 알면 차트 가까이에 한 줄로 적습니다.",
            ]}
          />
        </Sub>
        <Sub title="처음 불러올 때">
          <Demo>
            <Box w={320}>
              <Skeleton h={160}>
                <BarChartSkeleton layout="horizontal" />
              </Skeleton>
            </Box>
          </Demo>
          <P>
            처음 불러오는 동안에는 <Code>{'<BarChartSkeleton layout="horizontal" />'}</Code>을 보여 줍니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다. 그 밖의 빈 상태는 차트 기본 구조의 빈 상태 규칙을 따릅니다.
          </P>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <Chart.Bar data={teams} groupKey="부서" invertAxis showXAxis={false} plotWidth={260} plotHeight={180} aria-label="큰 순서로 놓은 가로 막대 차트" />,
            text: "값이 큰 것부터 위에서 아래로 놓습니다.",
          }}
          bad={{
            demo: <Chart.Bar data={unsorted} groupKey="부서" invertAxis showXAxis={false} plotWidth={260} plotHeight={180} aria-label="순서 없이 놓은 가로 막대 차트" />,
            text: "이유 없는 순서로 놓지 않습니다. 순위가 보이지 않습니다.",
          }}
        />
        <DoDont
          good={{ text: "항목 이름이 긴 비교에는 세로 막대 대신 가로 막대를 씁니다." }}
          bad={{ text: "월별·분기별 값을 가로 막대로 그리지 않습니다. 시간은 왼쪽에서 오른쪽으로 흐르게 그립니다." }}
        />
        <P>축을 0에서 시작하는 이유, 값의 차이가 아주 클 때의 처리, 막대를 눌러 상세 화면으로 들어가는 방법은 막대 차트 페이지의 규칙과 같습니다.</P>
      </Section>
    </Page>
  );
}

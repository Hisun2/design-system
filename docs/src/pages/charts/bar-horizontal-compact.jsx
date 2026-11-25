import React from "react";
import { Box, Flex, Text, CompactHorizontalBarChartSkeleton } from "@ec21rnc/ui";
import { Chart, Plot, CompactHorizontalBar } from "@ec21rnc/ui/chart";
import { scaleBand, scaleLinear } from "@ec21rnc/ui/chart";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "촘촘한 가로 막대 차트", order: 15 };

const share = [
  { 유형: "계약서", 건수: 504 },
  { 유형: "견적서", 건수: 324 },
  { 유형: "보고서", 건수: 228 },
  { 유형: "기타", 건수: 144 },
];
const longNames = [
  { 유형: "해외 거래처와 맺은 장기 공급 계약서", 건수: 230 },
  { 유형: "분기별 실적 검토 보고서와 첨부 자료", 건수: 155 },
  { 유형: "내부 결재용 지출 품의서", 건수: 115 },
];
const unsorted = [share[2], share[0], share[3], share[1]];
const zeros = [share[0], share[1], { 유형: "보고서", 건수: 0 }];
const few = share.slice(0, 2);
// 한 줄의 높이는 44px입니다. 이름·값 한 줄(20px)과 막대(12px)가 겹치지 않게 줄 간격을 직접 정합니다.
const ROW = 44;
const rows = (data) => ({
  plotHeight: data.length * ROW,
  yScale: scaleBand().range([12, data.length * ROW]).domain(data.map((d) => d.유형)).paddingInner(12 / ROW),
});
const longScale = scaleLinear().range([0, 280]).domain([0, longNames.reduce((sum, d) => sum + d.건수, 0)]);
const count = (v) => `${Number(v).toLocaleString("ko-KR")}건`;

export default function CompactHorizontalBarChartPage() {
  return (
    <Page meta={meta} lead="가로 막대 차트를 좁은 자리에 맞게 줄인 차트입니다. 항목 이름과 값을 막대 위에 한 줄로 적고 그 아래에 가는 막대를 그립니다. 합이 100%인 항목들의 비중을 보여 줍니다.">
      <Section title="언제 쓰는가">
        <Demo caption="문서 유형별 비중">
          <Box w={360}>
            <Chart.CompactHorizontalBar data={share} x="건수" y="유형" tooltipValueFormatter={count} plotWidth={360} {...rows(share)} aria-label="문서 유형별 비중" />
          </Box>
        </Demo>
        <Table
          head={["쓰는 때", "쓰지 않는 때"]}
          rows={[
            ["모든 항목의 값을 더하면 100%일 때", "추이를 보여 줄 때 → 꺾은선 차트"],
            ["항목 이름이 길거나 길어질 수 있을 때", "시간에 따른 값을 보여 줄 때 → 막대 차트, 꺾은선 차트"],
            ["화면이 좁아 가로 자리를 아껴야 할 때(옆 패널, 작은 카드)", "한 항목에 값이 여럿일 때(쌓아야 할 때) → 누적 가로 막대 차트"],
            ["항목이 10개 미만일 때", "합이 정해지지 않은 값을 비교할 때 → 가로 막대 차트"],
            ["항목마다 이름과 값을 적어야 할 때", ""],
            ["정해진 순서로 항목을 보여 줄 때", ""],
          ]}
        />
      </Section>

      <Section title="구성">
        <Table
          head={["요소", "모양"]}
          rows={[
            ["항목 이름", <>막대 위 왼쪽. 글자색 <Code>--ec-text-primary</Code></>],
            ["비중과 값", "막대 위 오른쪽. 비중(%)은 차트가 각 값을 합계로 나눠 계산해 적고, 그 옆에 원래 값을 적습니다. 오른쪽으로 맞춥니다."],
            ["막대", "이름 아래에 가는 막대. 자리 전체 폭이 100%입니다."],
            ["바탕 막대", "100% 길이의 옅은 회색 막대. 채워진 부분과 남은 부분을 함께 보여 줍니다."],
          ]}
        />
        <Rules
          items={[
            <><Code>Chart.CompactHorizontalBar</Code>에 값이 든 칸 이름을 <Code>x</Code>, 항목 이름이 든 칸 이름을 <Code>y</Code>로 줍니다.</>,
            "데이터에는 비중이 아니라 원래 값(건수, 금액)을 넣습니다. 비중은 차트가 계산합니다.",
            "한 항목에는 값이 하나만 있습니다. 한 줄에 여러 계열을 쌓을 수 없습니다.",
            "차트의 높이는 항목 수에 맞춥니다. 항목 하나에 44px을 잡습니다.",
          ]}
        />
      </Section>

      <Section title="축과 보조선">
        <P>축도 보조선도 그리지 않습니다. 자리 전체 폭이 100%라는 것이 기준이고, 값은 막대 위에 숫자로 적혀 있기 때문입니다.</P>
      </Section>

      <Section title="항목 이름">
        <Demo caption="긴 이름은 말줄임표로 줄어듭니다">
          <Box w={280}>
            <Plot data={longNames} scale={[longScale, rows(longNames).yScale]} width={280} height={rows(longNames).plotHeight} aria-label="이름이 긴 문서 유형별 비중">
              <CompactHorizontalBar x="건수" y="유형">
                <CompactHorizontalBar.Hover />
                <CompactHorizontalBar.Annotation>
                  <CompactHorizontalBar.Label tag={Text} ellipsis wMin={0} />
                  <CompactHorizontalBar.Percent />
                  <CompactHorizontalBar.Value />
                </CompactHorizontalBar.Annotation>
                <CompactHorizontalBar.Bar>
                  <CompactHorizontalBar.Bar.Background />
                  <CompactHorizontalBar.Bar.Fill />
                </CompactHorizontalBar.Bar>
              </CompactHorizontalBar>
            </Plot>
          </Box>
        </Demo>
        <Rules
          items={[
            <>항목 이름의 글자색은 <Code>--ec-text-primary</Code>입니다.</>,
            "이름이 막대 위 한 줄을 다 쓸 수 있으므로 가로 막대 차트보다 긴 이름을 담을 수 있습니다.",
            "그래도 자리보다 길면 말줄임표로 줄이고, 마우스를 올리면 전체 이름을 설명 풍선으로 보여 줍니다.",
            "축이 없으므로 값이 무엇의 숫자인지(건, 원)는 차트 제목이나 설명에 적습니다.",
          ]}
        />
      </Section>

      <Section title="색과 범례">
        <Rules
          items={[
            <>모든 막대를 한 가지 색(<Code>--ec-chart-1</Code>)으로 칠합니다. 항목마다 색을 달리하지 않습니다.</>,
            "이름이 막대마다 적혀 있으므로 범례를 두지 않습니다. 차트 제목으로 무엇의 비중인지 알립니다.",
            "같은 자리에 두 가지 묶음(예: 올해와 작년)을 비교해 보여 줄 때만 범례를 둡니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            <>줄에 마우스를 올리면 그 줄에 옅은 바탕(<Code>--ec-overlay-hover</Code>)이 깔립니다. 지금 보고 있는 항목과 누를 수 있음을 알립니다.</>,
            "설명 상자에는 항목 이름과 값을 보여 줍니다.",
            <>줄을 눌러 상세 화면으로 가게 하려면 <Code>onClickBar</Code>를 씁니다. 누를 수 있는 줄은 마우스 커서가 손 모양으로 바뀝니다.</>,
          ]}
        />
      </Section>

      <Section title="예외 상황">
        <Sub title="항목이 더 없을 때">
          <Demo column>
            <Box w={320}>
              <Chart.CompactHorizontalBar data={few} x="건수" y="유형" tooltipValueFormatter={count} plotWidth={320} {...rows(few)} aria-label="항목이 둘뿐인 촘촘한 가로 막대 차트" />
            </Box>
            <Flex mt={8}>
              <Text color="text-secondary">더 이상 결과가 없습니다</Text>
            </Flex>
          </Demo>
          <P>
            정해진 줄 수보다 항목이 적으면 마지막 값 아래 32px(<Code>--ec-spacing-8x</Code>)를 띄워 "더 이상 결과가 없습니다"라고 <Code>--ec-text-secondary</Code> 색으로 적습니다.
          </P>
        </Sub>
        <Sub title="값이 0일 때">
          <Demo>
            <Box w={320}>
              <Chart.CompactHorizontalBar data={zeros} x="건수" y="유형" tooltipValueFormatter={count} plotWidth={320} {...rows(zeros)} aria-label="값이 0인 항목이 있는 촘촘한 가로 막대 차트" />
            </Box>
          </Demo>
          <Rules
            items={[
              "0은 데이터입니다. 이름과 바탕 막대는 그대로 그리고, 값과 설명 상자에 0을 적습니다.",
              "모든 값이 0이면 합계가 0이라 비중을 계산할 수 없습니다. 이때는 차트를 그리지 않고 \"모든 항목의 값이 0입니다\"라고 알리는 빈 상태를 보여 줍니다.",
            ]}
          />
        </Sub>
        <Sub title="값이 없는 항목">
          <Rules
            items={[
              "값이 없는 항목은 막대를 채우지 않고 값 자리에도 숫자를 적지 않습니다. 이름은 남겨 둡니다.",
              "그 줄에 마우스를 올리면 설명 상자에 \"값 없음\"이라고 적습니다.",
              "왜 없는지, 언제 생기는지 알면 차트 가까이에 한 줄로 적습니다.",
              "값 없음을 0이나 0%로 적지 않습니다.",
            ]}
          />
        </Sub>
        <Sub title="처음 불러올 때">
          <Demo>
            <Box w={320}>
              <CompactHorizontalBarChartSkeleton h={120} />
            </Box>
          </Demo>
          <P>
            처음 불러오는 동안에는 <Code>CompactHorizontalBarChartSkeleton</Code>을 보여 줍니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다. 그 밖의 빈 상태는 차트 기본 구조의 빈 상태 규칙을 따릅니다.
          </P>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Box w={240}>
                <Chart.CompactHorizontalBar data={share} x="건수" y="유형" tooltipValueFormatter={count} plotWidth={240} {...rows(share)} aria-label="큰 순서로 놓은 비중" />
              </Box>
            ),
            text: "값이 큰 것부터 놓고, \"기타\"는 크기와 상관없이 맨 끝에 둡니다.",
          }}
          bad={{
            demo: (
              <Box w={240}>
                <Chart.CompactHorizontalBar data={unsorted} x="건수" y="유형" tooltipValueFormatter={count} plotWidth={240} {...rows(unsorted)} aria-label="순서 없이 놓은 비중" />
              </Box>
            ),
            text: "이유 없는 순서로 놓지 않습니다.",
          }}
        />
        <DoDont
          good={{ text: "합이 100%인 비중에 씁니다." }}
          bad={{ text: "건수나 금액처럼 합이 정해지지 않은 값에 쓰지 않습니다. 막대 길이의 기준이 사라집니다. 가로 막대 차트를 씁니다." }}
        />
        <P>막대의 순서와 막대를 눌러 상세 화면으로 들어가는 방법은 막대 차트 페이지의 규칙과 같습니다.</P>
      </Section>
    </Page>
  );
}

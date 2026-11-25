import React from "react";
import { Box, Flex, Text, Skeleton } from "@ec21rnc/ui";
import { Chart, interpolateValue } from "@ec21rnc/ui/chart";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "한 줄 비율 차트", order: 18 };

const types = { 계약서: 504, 견적서: 324, 보고서: 228, 기타: 144 };
const many = { 계약서: 320, 견적서: 210, 보고서: 150, 영수증: 110, 신청서: 90, 공문: 70, 회의록: 50, 품의서: 40, 기타: 30 };
const withZero = { 계약서: 504, 견적서: 324, 보고서: 0 };
const withSmall = { 계약서: 980, 견적서: 410, 보고서: 6 };
const withMissing = { 계약서: 504, 견적서: 324, 보고서: interpolateValue };
// 컴포넌트의 기본 색은 파랑 다섯 단계뿐입니다. 우리 규칙대로 차트 색을 순서대로 주고 "기타"는 회색으로 둡니다.
const colors = (data) => Object.fromEntries(Object.keys(data).map((name, i) => [name, name === "기타" ? "var(--ec-chart-other)" : `var(--ec-chart-${i + 1})`]));
const count = (v) => `${Number(v).toLocaleString("ko-KR")}건`;

function Total({ value, label }) {
  return (
    <Flex direction="column">
      <Text size={500} fontWeight={700}>
        {value}
      </Text>
      <Text size={100} color="text-secondary">
        {label}
      </Text>
    </Flex>
  );
}

export default function CigaretteChartPage() {
  return (
    <Page meta={meta} lead="막대 하나를 비율대로 나눠 전체에서 각 부분이 차지하는 몫을 보여 주는 차트입니다. 막대 전체가 100%입니다. 도넛 차트와 하는 일이 같고, 자리를 훨씬 적게 씁니다.">
      <Section title="언제 쓰는가">
        <Demo caption="문서 유형별 비중">
          <Box w={420}>
            <Chart.Cigarette data={types} colorMap={colors(types)} showLegend tooltipValueFormatter={count} plotWidth={420} aria-label="문서 유형별 비중" />
          </Box>
        </Demo>
        <Rules
          items={[
            "정확한 값보다 어느 부분이 큰지, 비중이 어떤지를 보여 줄 때 씁니다.",
            "항목은 5개까지입니다. 더 많으면 조각이 너무 가늘어져 읽을 수 없습니다. 작은 항목을 \"기타\"로 묶거나 막대 차트를 씁니다.",
            "표의 한 칸, 요약 카드처럼 높이가 낮은 자리에 씁니다. 도넛 차트를 넣기에는 자리가 좁을 때의 선택입니다.",
            "여러 대상의 구성을 서로 견줄 때는 누적 가로 막대 차트를 씁니다.",
          ]}
        />
      </Section>

      <Section title="모양">
        <Table
          head={["요소", "모양"]}
          rows={[
            ["조각 사이", "1px"],
            ["막대 전체의 모서리", "2px"],
            ["막대의 굵기", "가로로 놓을 때 높이 28px, 세로로 놓을 때 폭 44px이 기본입니다."],
            ["가장 가는 조각", <>값이 0보다 크면 적어도 2px(<Code>minimalBarWidth</Code>)</>],
          ]}
        />
        <Rules
          items={[
            <>색은 <Code>--ec-chart-1</Code>부터 순서대로 칠합니다. "기타"는 맨 끝에 회색(<Code>--ec-chart-other</Code>)으로 둡니다.</>,
            <>컴포넌트의 기본 색은 파랑 다섯 단계라서 그대로 쓰지 않습니다. <Code>colorMap</Code>에 항목 이름마다 색을 적어 줍니다.</>,
            "값이 큰 것부터 놓습니다. 범례의 순서도 같게 합니다.",
            "축도 보조선도 그리지 않습니다.",
          ]}
        />
      </Section>

      <Section title="놓는 방향">
        <Demo caption="가로 (기본) — 값을 왼쪽에서 오른쪽으로 놓습니다">
          <Box w={360}>
            <Chart.Cigarette data={types} colorMap={colors(types)} showLegend plotWidth={360} aria-label="가로로 놓은 한 줄 비율 차트" />
          </Box>
        </Demo>
        <Demo caption="세로 (invertAxis={false}) — 값을 아래에서 위로 쌓습니다">
          <Chart.Cigarette data={types} colorMap={colors(types)} invertAxis={false} showLegend plotHeight={160} aria-label="세로로 놓은 한 줄 비율 차트" />
        </Demo>
        <Rules
          items={[
            "가로가 기본입니다. 폭이 넉넉하고 높이가 낮은 자리에 씁니다.",
            "세로는 옆에 범례를 세로로 놓아 값을 견줄 때, 폭이 좁은 자리에 씁니다.",
            <>가로일 때는 <Code>plotWidth</Code>로 길이를, 세로일 때는 <Code>plotHeight</Code>로 높이를 정합니다.</>,
          ]}
        />
      </Section>

      <Section title="범례">
        <Rules
          items={[
            <>범례는 기본으로 꺼져 있습니다. <Code>showLegend</Code>를 줘야 나옵니다. 조각만으로는 무엇인지 알 수 없으므로, 표의 칸처럼 아주 좁은 자리가 아니면 범례를 켭니다.</>,
            "범례는 차트 가까이에 둡니다. 차트와 범례 사이는 24px 안쪽으로 합니다.",
            "범례 항목의 오른쪽 여백은 16px, 항목의 이름과 값 사이는 12px입니다.",
            "세로로 놓은 차트 옆의 범례는 차트의 위쪽 끝에 맞춥니다.",
            "범례에는 항목 이름과 함께 값이나 비중을 적습니다. 조각의 길이만으로는 정확한 값을 읽을 수 없습니다.",
          ]}
        />
      </Section>

      <Section title="합계 표시">
        <Demo caption="합계나 가장 큰 값을 차트 곁에 큰 숫자로 (header)">
          <Box w={360}>
            <Chart.Cigarette data={types} colorMap={colors(types)} showLegend header={<Total value="1,200건" label="전체 문서" />} plotWidth={360} aria-label="합계를 함께 보여 주는 한 줄 비율 차트" />
          </Box>
        </Demo>
        <Demo caption="세로로 놓으면 합계가 범례 위에 놓이고 구분선이 들어갑니다">
          <Chart.Cigarette data={types} colorMap={colors(types)} invertAxis={false} showLegend header={<Total value="1,200건" label="전체 문서" />} plotHeight={180} aria-label="합계를 함께 보여 주는 세로 한 줄 비율 차트" />
        </Demo>
        <Table
          head={["요소", "모양"]}
          rows={[
            ["숫자", <>24px(<Code>--ec-fs-500</Code>), 굵기 700, <Code>--ec-text-primary</Code></>],
            ["이름", <>12px(<Code>--ec-fs-100</Code>), <Code>--ec-text-secondary</Code></>],
          ]}
        />
        <Rules
          items={[
            <>합계나 가장 큰 값을 <Code>header</Code>로 차트 곁에 보여 줄 수 있습니다.</>,
            "숫자에는 반드시 이름을 붙입니다. 이름 없는 큰 숫자는 무엇인지 알 수 없습니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "조각에 마우스를 올리면 그 조각이 2px 굵어지고 설명 상자가 나옵니다.",
            <>설명 상자는 기본으로 모든 항목의 값을 보여 줍니다(<Code>tooltipViewType="all"</Code>). 마우스를 올린 항목만 보여 주려면 <Code>"single"</Code>을 줍니다.</>,
            <>설명 상자의 제목은 <Code>tooltipTitle</Code>로 주고, 비중을 함께 보여 주려면 <Code>showPercentValueInTooltip</Code>을 켭니다.</>,
            <>조각을 누를 수 있게 하려면 <Code>onClick</Code>을 씁니다. 누를 수 있는 조각은 마우스 커서가 손 모양으로 바뀝니다.</>,
          ]}
        />
        <Demo caption="설명 상자에 제목과 비중을 함께">
          <Box w={360}>
            <Chart.Cigarette data={types} colorMap={colors(types)} tooltipTitle="문서 유형" showPercentValueInTooltip showTotalInTooltip tooltipValueFormatter={count} plotWidth={360} aria-label="설명 상자에 비중이 나오는 한 줄 비율 차트" />
          </Box>
        </Demo>
      </Section>

      <Section title="예외 상황">
        <Sub title="값이 0인 항목">
          <Demo>
            <Box w={360}>
              <Chart.Cigarette data={withZero} colorMap={colors(withZero)} showLegend plotWidth={360} aria-label="값이 0인 항목이 있는 한 줄 비율 차트" />
            </Box>
          </Demo>
          <P>
            0은 데이터입니다. 차트에는 조각을 그리지 않지만 범례에는 항목을 남기고 값을 0으로 적습니다. 0의 글자색은 <Code>--ec-text-secondary</Code>입니다.
          </P>
        </Sub>
        <Sub title="1% 이하인 항목">
          <Demo>
            <Box w={360}>
              <Chart.Cigarette data={withSmall} colorMap={colors(withSmall)} showLegend plotWidth={360} aria-label="아주 작은 항목이 있는 한 줄 비율 차트" />
            </Box>
          </Demo>
          <P>값이 1% 이하여도 조각이 사라지지 않게 최소 굵기로 그립니다. 범례와 설명 상자에는 실제 값을 적습니다.</P>
        </Sub>
        <Sub title="값이 없는 항목">
          <Demo>
            <Box w={360}>
              <Chart.Cigarette data={withMissing} colorMap={colors(withMissing)} showLegend plotWidth={360} aria-label="값이 없는 항목이 있는 한 줄 비율 차트" />
            </Box>
          </Demo>
          <Rules
            items={[
              <>값을 모르는 항목은 데이터에 <Code>interpolateValue</Code>로 넣습니다. 차트에는 조각을 그리지 않습니다.</>,
              <>범례와 설명 상자에는 "값 없음"이라고 <Code>--ec-text-secondary</Code> 색으로 적습니다.</>,
              "값 없음을 0으로 적지 않습니다.",
              "컴포넌트는 지금 이 자리에 영문 약어 n/a를 적습니다. 화면에 그대로 내보내기 전에 범례의 문구를 \"값 없음\"으로 바꿉니다.",
            ]}
          />
        </Sub>
        <Sub title="처음 불러올 때">
          <Demo>
            <Box w={360}>
              <Skeleton h={28}>
                <Skeleton.Text amount={1} height={28} />
              </Skeleton>
            </Box>
          </Demo>
          <P>처음 불러오는 동안에는 막대 자리에 같은 크기의 뼈대를 보여 줍니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다. 그 밖의 빈 상태는 차트 기본 구조의 빈 상태 규칙을 따릅니다.</P>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Box w={260}>
                <Chart.Cigarette data={types} colorMap={colors(types)} plotWidth={260} aria-label="항목이 넷인 한 줄 비율 차트" />
              </Box>
            ),
            text: "항목은 5개까지만 넣습니다. 작은 항목은 \"기타\"로 묶습니다.",
          }}
          bad={{
            demo: (
              <Box w={260}>
                <Chart.Cigarette data={many} colorMap={colors(many)} plotWidth={260} aria-label="항목이 아홉인 한 줄 비율 차트" />
              </Box>
            ),
            text: "항목을 많이 넣지 않습니다. 조각이 가늘어져 구분되지 않습니다.",
          }}
        />
        <DoDont
          good={{ text: "더하면 전체가 되는 값에만 씁니다." }}
          bad={{ text: "시간에 따른 변화나 서로 더할 수 없는 값을 한 줄에 나눠 그리지 않습니다." }}
        />
      </Section>
    </Page>
  );
}

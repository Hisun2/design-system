import React from "react";
import { Box, Flex, Text, DonutChartSkeleton } from "@ec21rnc/ui";
import { Chart } from "@ec21rnc/ui/chart";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "도넛 차트", order: 19 };

const types = { 계약서: 504, 견적서: 324, 보고서: 228, 기타: 144 };
const gray = { 기타: "var(--ec-chart-other)" };
const many = { 계약서: 320, 견적서: 210, 보고서: 150, 영수증: 110, 신청서: 90, 공문: 70, 회의록: 50, 품의서: 40, 위임장: 30 };
const topFive = { 계약서: 320, 견적서: 210, 보고서: 150, 영수증: 110, 신청서: 90, 기타: 190 };
const progress = { 완료: 68, 남음: 32 };
const progressColors = { 남음: "var(--ec-chart-null)" };
const withZero = { 계약서: 504, 견적서: 324, 보고서: 0 };
const withSmall = { 계약서: 980, 견적서: 410, 보고서: 6 };
const longNames = { "해외 거래처와 맺은 장기 공급 계약서": 46, "분기별 실적 검토 보고서와 첨부 자료": 31, "내부 결재용 지출 품의서": 23 };
const count = (v) => `${Number(v).toLocaleString("ko-KR")}건`;

// Chart.Donut은 범례를 오른쪽 끝에 붙입니다. 차트와 범례를 왼쪽에 모으려면 justifyContent="flex-end"를 줍니다.
const left = { justifyContent: "flex-end" };

// 가운데 글자는 SVG 글자입니다. 줄마다 tspan으로 나눠 넣습니다. y는 가운데에서 떨어진 거리(px)입니다.
function centerLabel(value, label, y = 0) {
  return (
    <>
      <Text tag="tspan" x="0" y={y} size={500} fontWeight={700} fill="var(--ec-text-primary)">
        {value}
      </Text>
      <Text tag="tspan" x="0" y={y + 20} size={100} fill="var(--ec-text-secondary)">
        {label}
      </Text>
    </>
  );
}

export default function DonutChartPage() {
  return (
    <Page meta={meta} lead="고리를 비율대로 나눠 전체에서 각 부분이 차지하는 몫을 보여 주는 차트입니다. 고리 전체가 100%입니다.">
      <Section title="언제 쓰는가">
        <Demo caption="문서 유형별 비중">
          <Chart.Donut {...left} data={types} colorMap={gray} tooltipValueFormatter={count} plotWidth={188} plotHeight={188} aria-label="문서 유형별 비중" />
        </Demo>
        <Rules
          items={[
            "정확한 값보다 어느 부분이 큰지, 비중이 어떤지를 강조할 때 씁니다.",
            "항목은 5개까지입니다. 더 많으면 큰 것 다섯만 남기고 나머지는 \"기타\"로 묶거나, 막대 차트를 씁니다.",
          ]}
        />
        <Table
          head={["약점", "대신 쓸 것"]}
          rows={[
            ["항목이 많으면 조각이 너무 작아 읽을 수 없습니다.", "가로 막대 차트"],
            ["같은 내용을 담는 데 막대 차트보다 자리를 많이 씁니다.", "한 줄 비율 차트, 촘촘한 가로 막대 차트"],
            ["도넛끼리는 비교하기 어렵습니다. 조각의 넓이는 막대의 길이보다 견주기 어렵습니다.", "누적 막대 차트"],
            ["시간에 따른 변화를 보여 줄 수 없습니다.", "누적 영역 차트, 누적 막대 차트"],
          ]}
        />
      </Section>

      <Section title="모양">
        <Rules
          items={[
            "값은 12시 방향에서 시작해 시계 방향으로 놓습니다.",
            "값이 큰 것부터 놓습니다. \"기타\"는 크기와 상관없이 맨 끝에 회색으로 둡니다.",
            "조각 사이는 1px 띄웁니다.",
            <>색은 <Code>--ec-chart-1</Code>부터 순서대로 칠합니다.</>,
            <>데이터는 <Code>{"{ 이름: 값 }"}</Code> 모양의 객체 하나입니다. 배열이 아닙니다.</>,
          ]}
        />
      </Section>

      <Section title="크기">
        <Demo caption="큰 카드(폭 400px 이상) — 180px, 고리 두께 30px">
          <Chart.Donut {...left} data={types} colorMap={gray} innerRadius={60} plotWidth={188} plotHeight={188} aria-label="큰 도넛 차트" />
        </Demo>
        <Demo caption="작은 카드(폭 400px 미만) — 80px, 고리 두께 20px">
          <Chart.Donut {...left} data={types} colorMap={gray} innerRadius={20} plotWidth={88} plotHeight={88} aria-label="작은 도넛 차트" />
        </Demo>
        <Demo caption="요약 줄 안 — 24px, 고리 두께 6px. 범례와 설명 상자를 끕니다.">
          <Flex alignItems="center" gap={1}>
            <Box w={32} h={32}>
              <Chart.Donut data={progress} colorMap={progressColors} innerRadius={6} plotWidth={32} plotHeight={32} showLegend={false} showTooltip={false} aria-label="처리율 68%" />
            </Box>
            <Text>처리율 68%</Text>
          </Flex>
        </Demo>
        <Table
          head={["자리", "지름", "고리 두께", "속성"]}
          rows={[
            ["요약 줄 안", "24px", "6px", <Code>{"plotWidth={32} innerRadius={6}"}</Code>],
            ["작은 카드 (폭 400px 미만)", "80px", "20px", <Code>{"plotWidth={88} innerRadius={20}"}</Code>],
            ["큰 카드 (폭 400px 이상)", "180px", "30px", <Code>{"plotWidth={188} innerRadius={60}"}</Code>],
          ]}
        />
        <P>
          <Code>plotWidth</Code>와 <Code>plotHeight</Code>는 지름보다 8px 크게 줍니다. 마우스를 올린 조각이 커질 자리(사방 4px)입니다. 안쪽 반지름은 <Code>innerRadius</Code>로 줍니다. 세 가지 크기만 씁니다.
        </P>
      </Section>

      <Section title="반쪽 도넛">
        <Demo caption="반쪽 도넛 (halfsize) — 180 × 90px">
          <Chart.Donut {...left} data={types} colorMap={gray} halfsize innerRadius={60} plotWidth={188} plotHeight={94} aria-label="반쪽 도넛 차트" />
        </Demo>
        <Demo caption="작은 반쪽 도넛 — 80 × 40px">
          <Chart.Donut {...left} data={types} colorMap={gray} halfsize innerRadius={20} plotWidth={88} plotHeight={44} aria-label="작은 반쪽 도넛 차트" />
        </Demo>
        <Table
          head={["자리", "크기", "고리 두께"]}
          rows={[
            ["요약 줄 안", "24 × 12px", "6px"],
            ["폭이 좁은 작은 카드 (400px 미만)", "80 × 40px", "20px"],
            ["큰 카드 (400px 이상)", "180 × 90px", "30px"],
          ]}
        />
        <Rules
          items={[
            <>높이를 아껴야 할 때 <Code>halfsize</Code>로 위쪽 반만 그립니다. <Code>plotHeight</Code>는 <Code>plotWidth</Code>의 절반으로 줍니다.</>,
            "반쪽 도넛은 9시 방향에서 시작해 3시 방향에서 끝납니다.",
            "목표 대비 달성률처럼 한 값이 얼마나 찼는지 보여 줄 때 잘 맞습니다.",
          ]}
        />
      </Section>

      <Section title="범례">
        <Demo caption="자리가 좁으면 범례를 차트 아래로 내립니다 (direction=&quot;column-reverse&quot;)">
          <Chart.Donut data={types} colorMap={gray} direction="column-reverse" alignItems="flex-start" legendProps={{ direction: "column" }} innerRadius={60} plotWidth={188} plotHeight={188} aria-label="범례가 아래에 있는 도넛 차트" />
        </Demo>
        <Demo caption="긴 이름은 다음 줄로 넘깁니다">
          <Box w={360}>
            <Chart.Donut {...left} data={longNames} legendProps={{ w: 250 }} innerRadius={20} plotWidth={88} plotHeight={88} aria-label="이름이 긴 도넛 차트" />
          </Box>
        </Demo>
        <Rules
          items={[
            "범례는 차트 옆에 가까이 둡니다. 차트와 범례 사이는 24px 안쪽입니다.",
            "범례 항목의 오른쪽 여백은 16px, 항목의 이름과 값 사이는 12px입니다.",
            "범례의 위쪽 끝을 차트의 위쪽 끝에 맞춥니다.",
            "범례에는 이름과 함께 값이나 비중을 적습니다. 조각만으로는 정확한 값을 읽을 수 없습니다.",
            "긴 이름은 자르지 않고 다음 줄로 넘깁니다.",
            "옆에 범례를 둘 자리가 없으면 차트 아래로 내리고 24px 띄웁니다.",
            "범례의 순서는 조각의 순서(시계 방향)와 같게 합니다.",
          ]}
        />
      </Section>

      <Section title="가운데 숫자">
        <Demo caption="큰 도넛의 가운데에 합계나 대표 값을 (innerLabel)">
          <Chart.Donut {...left} data={types} colorMap={gray} innerRadius={60} innerLabel={centerLabel("1,200", "전체 문서(건)")} plotWidth={188} plotHeight={188} aria-label="가운데에 합계를 적은 도넛 차트" />
        </Demo>
        <Demo caption="반쪽 도넛의 가운데 숫자">
          <Chart.Donut {...left} data={progress} colorMap={progressColors} halfsize innerRadius={60} innerLabel={centerLabel("68%", "처리율", -24)} showLegend={false} plotWidth={188} plotHeight={94} aria-label="처리율 68%" />
        </Demo>
        <Demo caption="작은 도넛은 숫자를 범례 위에 둡니다" column>
          <Flex direction="column" ml={27}>
            <Text size={500} fontWeight={700}>
              1,200
            </Text>
            <Text size={100} color="text-secondary">
              전체 문서(건)
            </Text>
          </Flex>
          <Chart.Donut {...left} data={types} colorMap={gray} innerRadius={20} plotWidth={88} plotHeight={88} aria-label="숫자를 범례 위에 둔 작은 도넛 차트" />
        </Demo>
        <Table
          head={["요소", "모양"]}
          rows={[
            ["숫자", <>24px(<Code>--ec-fs-500</Code>), 굵기 700, <Code>--ec-text-primary</Code></>],
            ["이름", <>12px(<Code>--ec-fs-100</Code>), <Code>--ec-text-secondary</Code></>],
            ["자리", "고리 안에서 가로·세로 가운데"],
          ]}
        />
        <Rules
          items={[
            "큰 도넛의 가운데에 가장 큰 값이나 합계를 적을 수 있습니다.",
            "숫자에는 반드시 이름을 붙입니다.",
            "이름이 길면 다음 줄로 넘깁니다. 덧붙일 설명은 이름 옆의 정보 아이콘에 넣습니다.",
            "반쪽 도넛은 자리가 좁으므로 이름을 되도록 짧게 쓰고, 설명은 정보 아이콘에 넣습니다.",
            "작은 도넛(80px 이하)은 가운데에 넣지 않고 범례 위에 둡니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "조각에 마우스를 올리면 그 조각의 바깥 반지름이 4px 커집니다.",
            "설명 상자에는 그 조각의 이름과 값을 보여 줍니다.",
            <>아주 작은 도넛(24px)은 설명 상자를 끕니다(<Code>showTooltip={"{false}"}</Code>). 곁에 숫자를 글자로 적어 둡니다.</>,
            <>조각을 누를 수 있게 하려면 <Code>onClickPie</Code>를 씁니다. 누를 수 있는 조각은 마우스 커서가 손 모양으로 바뀝니다.</>,
            "범례 항목에 마우스를 올리면 그 조각이 강조됩니다.",
          ]}
        />
      </Section>

      <Section title="예외 상황">
        <Sub title="값이 0인 항목">
          <Demo>
            <Chart.Donut {...left} data={withZero} innerRadius={20} plotWidth={88} plotHeight={88} aria-label="값이 0인 항목이 있는 도넛 차트" />
          </Demo>
          <P>
            0은 데이터입니다. 고리에는 조각을 그리지 않지만 범례에는 항목을 남기고 값을 0으로 적습니다. 0의 글자색은 <Code>--ec-text-secondary</Code>입니다.
          </P>
        </Sub>
        <Sub title="1% 이하인 항목">
          <Demo>
            <Chart.Donut {...left} data={withSmall} innerRadius={20} plotWidth={88} plotHeight={88} aria-label="아주 작은 항목이 있는 도넛 차트" />
          </Demo>
          <P>값이 1% 이하여도 조각이 사라지지 않게 고리에서는 1% 크기로 그립니다. 범례와 설명 상자에는 실제 값을 적습니다.</P>
        </Sub>
        <Sub title="값이 없을 때">
          <Rules
            items={[
              <>값을 모르는 항목은 고리에 그리지 않고, 범례와 설명 상자에 "값 없음"이라고 <Code>--ec-text-secondary</Code> 색으로 적습니다.</>,
              "값 없음을 0으로 적지 않습니다.",
              "모든 항목의 값이 없거나 범례에서 모든 항목을 끄면 회색 빈 고리를 보여 줍니다.",
            ]}
          />
        </Sub>
        <Sub title="범례를 둘 자리가 없을 때">
          <P>범례를 차트 아래로 내리고 차트와 24px 띄웁니다. 범례를 없애지 않습니다.</P>
        </Sub>
        <Sub title="처음 불러올 때">
          <Demo>
            <Box w={180}>
              <DonutChartSkeleton h={180} />
            </Box>
            <Box w={180}>
              <DonutChartSkeleton halfsize h={90} />
            </Box>
          </Demo>
          <P>
            처음 불러오는 동안에는 <Code>DonutChartSkeleton</Code>을 보여 줍니다. 반쪽 도넛은 <Code>halfsize</Code>를 줍니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다. 그 밖의 빈 상태는 차트 기본 구조의 빈 상태 규칙을 따릅니다.
          </P>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <Chart.Donut {...left} data={topFive} colorMap={gray} innerRadius={20} plotWidth={88} plotHeight={88} showLegend={false} aria-label="큰 항목 다섯과 기타로 묶은 도넛 차트" />,
            text: "항목이 다섯을 넘으면 큰 것 다섯만 남기고 나머지는 \"기타\"로 묶습니다.",
          }}
          bad={{
            demo: <Chart.Donut {...left} data={many} innerRadius={20} plotWidth={88} plotHeight={88} showLegend={false} aria-label="항목이 아홉인 도넛 차트" />,
            text: "항목을 많이 넣지 않습니다. 조각이 작아져 색도 크기도 구분되지 않습니다.",
          }}
        />
        <DoDont
          good={{ text: "두 묶음의 구성을 견줄 때는 누적 막대 차트를 씁니다." }}
          bad={{ text: "도넛 두 개를 나란히 놓고 비교하게 하지 않습니다." }}
        />
        <DoDont
          good={{ text: "첫 조각은 12시 방향에서 시작합니다." }}
          bad={{ text: "시작 각도를 차트마다 바꾸지 않습니다. 고리를 기울이거나 입체로 그리지 않습니다." }}
        />
      </Section>
    </Page>
  );
}

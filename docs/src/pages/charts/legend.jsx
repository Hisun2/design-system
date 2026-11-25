import React from "react";
import { Chart, ChartLegend, ChartLegendTable } from "@ec21rnc/ui/chart";
import NoteM from "@semcore/icon/Note/m";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "범례", order: 5 };

const monthly = [
  { 월: 1, 접수: 320, 승인: 260, 반려: 40 },
  { 월: 2, 접수: 410, 승인: 330, 반려: 52 },
  { 월: 3, 접수: 380, 승인: 340, 반려: 31 },
  { 월: 4, 접수: 520, 승인: 410, 반려: 64 },
  { 월: 5, 접수: 610, 승인: 480, 반려: 58 },
  { 월: 6, 접수: 580, 승인: 510, 반려: 45 },
];
const quarters = [
  { 분기: "1분기", 계약서: 120, 견적서: 80 },
  { 분기: "2분기", 계약서: 150, 견적서: 70 },
  { 분기: "3분기", 계약서: 170, 견적서: 95 },
  { 분기: "4분기", 계약서: 190, 견적서: 110 },
];
const single = monthly.map(({ 월, 접수 }) => ({ 월, 접수 }));
const month = (v) => `${v}월`;

const items = [
  { id: "접수", label: "접수", checked: true, color: "var(--ec-chart-1)" },
  { id: "승인", label: "승인", checked: true, color: "var(--ec-chart-2)" },
  { id: "반려", label: "반려", checked: false, color: "var(--ec-chart-3)" },
];
const noop = () => {};

function TrendDemo() {
  const [visible, setVisible] = React.useState(true);
  return (
    <Chart.Bar
      data={quarters}
      groupKey="분기"
      trend={
        visible
          ? {
              추세: [
                { x: "1분기", y: 100 },
                { x: "4분기", y: 150 },
              ],
            }
          : undefined
      }
      legendProps={{ withTrend: true, trendLabel: "추세", trendIsVisible: visible, onTrendIsVisibleChange: setVisible }}
      plotWidth={480}
      plotHeight={200}
      aria-label="추세선이 있는 분기별 문서 건수"
    />
  );
}

export default function ChartLegendPage() {
  return (
    <Page meta={meta} lead="차트의 색이 어떤 계열을 뜻하는지 알려 주는 요소입니다. 계열을 켜고 끄는 필터 역할도 합니다. 차트의 공통 규칙은 차트 기본 구조를 봅니다.">
      <Section title="언제 두는가">
        <Rules
          items={[
            "계열이 둘 이상이면 범례를 둡니다.",
            "계열이 하나뿐이면 범례를 두지 않습니다. 무엇의 데이터인지는 차트 제목과 설명으로 알립니다.",
            <>간편 차트는 이 규칙대로 자동으로 범례를 보이거나 숨깁니다. 직접 정하려면 <Code>showLegend</Code>를 줍니다.</>,
          ]}
        />
        <Demo caption="계열이 하나 — 범례 없음" column>
          <Chart.Line data={single} groupKey="월" plotWidth={480} plotHeight={160} axisXValueFormatter={month} tooltipTitleFormatter={month} aria-label="월별 접수 건수" />
        </Demo>
      </Section>

      <Section title="구성">
        <Demo>
          <ChartLegend items={items} aria-label="문서 처리 상태" onChangeVisibleItem={noop} />
        </Demo>
        <Table
          head={["요소", "하는 일", "필수"]}
          rows={[
            ["표시 도형", "계열의 색을 보여 줍니다. 체크 상자이거나 동그라미입니다.", "필수"],
            ["이름", "계열의 이름입니다.", "필수"],
            ["앞 아이콘", "계열의 종류를 그림으로 덧붙입니다.", "선택"],
            ["덧붙이는 글", "단위, 기간 같은 짧은 설명입니다.", "선택"],
            ["개수", "그 계열의 건수입니다.", "선택"],
            ["값과 증감", "계열의 대표 값과 지난 기간 대비 변화입니다.", "선택"],
          ]}
        />
        <Rules
          items={[
            "도형의 색은 차트에 그려진 그 계열의 색과 같아야 합니다.",
            <>이름의 글자색은 <Code>--ec-text-primary</Code>입니다. 계열 색을 글자에 입히지 않습니다.</>,
            "범례 항목의 순서는 차트에 그려진 순서, 설명 상자의 순서와 같게 합니다.",
            <>범례에도 이름이 있어야 합니다. 따로 쓸 때는 <Code>aria-label</Code>을 줍니다.</>,
          ]}
        />
      </Section>

      <Section title="도형의 종류">
        <Demo caption="체크 상자 (shape=&quot;Checkbox&quot;, 기본값) — 눌러서 켜고 끌 수 있음">
          <ChartLegend items={items} shape="Checkbox" aria-label="켜고 끌 수 있는 범례" onChangeVisibleItem={noop} />
        </Demo>
        <Demo caption="동그라미 (shape=&quot;Circle&quot;) — 보여 주기만 함">
          <ChartLegend items={items.slice(0, 2)} shape="Circle" aria-label="보여 주기만 하는 범례" />
        </Demo>
        <Demo caption="무늬 (shape=&quot;Pattern&quot;) — 차트에 무늬 채움을 쓸 때">
          <ChartLegend items={items.slice(0, 2)} shape="Pattern" patterns aria-label="무늬 범례" />
        </Demo>
        <Table
          head={["도형", "쓰는 때"]}
          rows={[
            ["체크 상자", "사용자가 계열을 골라 볼 수 있을 때. 꺾은선, 영역, 막대 차트의 기본입니다."],
            ["동그라미", "계열을 끌 수 없을 때. 도넛처럼 한 조각을 빼면 뜻이 달라지는 차트에 씁니다."],
            ["무늬", "차트가 색 대신 무늬로 계열을 구분할 때. 범례도 같은 무늬를 보여 줍니다."],
          ]}
        />
      </Section>

      <Section title="크기">
        <Demo caption="M (기본)">
          <ChartLegend items={items.slice(0, 2)} size="m" aria-label="M 크기 범례" onChangeVisibleItem={noop} />
        </Demo>
        <Demo caption="L">
          <ChartLegend items={items.slice(0, 2)} size="l" aria-label="L 크기 범례" onChangeVisibleItem={noop} />
        </Demo>
        <P>M이 기본입니다. L은 차트가 화면의 중심이고 주변 글자가 16px일 때만 씁니다. 한 화면에서는 한 가지 크기만 씁니다.</P>
      </Section>

      <Section title="덧붙이는 요소">
        <Demo caption="아이콘, 덧붙이는 글, 개수">
          <ChartLegend
            items={[
              { id: "접수", label: "접수", checked: true, color: "var(--ec-chart-1)", icon: <NoteM /> },
              { id: "승인", label: "승인", checked: true, color: "var(--ec-chart-2)", additionalInfo: { label: "최근 6개월" } },
              { id: "반려", label: "반려", checked: true, color: "var(--ec-chart-3)", additionalInfo: { count: 290 } },
            ]}
            aria-label="덧붙이는 요소가 있는 범례"
            onChangeVisibleItem={noop}
          />
        </Demo>
        <Demo caption="값과 증감을 함께 보여 주는 표 모양 범례 (ChartLegendTable)">
          <ChartLegendTable
            items={[
              { id: "접수", label: "접수", checked: true, color: "var(--ec-chart-1)", columns: ["2,820건", "+12%"] },
              { id: "승인", label: "승인", checked: true, color: "var(--ec-chart-2)", columns: ["2,330건", "+9%"] },
              { id: "반려", label: "반려", checked: true, color: "var(--ec-chart-3)", columns: ["290건", "-4%"] },
            ]}
            aria-label="값이 있는 범례"
            onChangeVisibleItem={noop}
          />
        </Demo>
        <Table
          head={["요소", "모양"]}
          rows={[
            ["앞 아이콘", "M 크기, 누를 수 없는 아이콘의 회색"],
            ["덧붙이는 글", <>14px, <Code>--ec-text-secondary</Code></>],
            ["개수", <>14px, <Code>--ec-text-secondary</Code></>],
            ["값과 증감", "값은 글자 또는 링크. 증감은 늘면 초록, 줄면 빨강이되 부호(+, -)를 함께 적습니다."],
          ]}
        />
        <Rules
          items={[
            <>간편 차트에서는 <Code>legendProps.legendMap</Code>에 계열 이름별로 <Code>label</Code>, <Code>additionalInfo</Code>, <Code>count</Code>, <Code>icon</Code>을 적습니다. 아이콘은 <Code>{"icon: <NoteM />"}</Code>처럼 그려 낸 요소로 줍니다.</>,
            <>값을 나란히 견줘야 하면 <Code>legendType="Table"</Code>로 표 모양 범례를 씁니다.</>,
            "한 항목에 덧붙이는 요소는 두 가지까지만 씁니다. 범례가 차트보다 복잡해지면 안 됩니다.",
          ]}
        />
      </Section>

      <Section title="자리">
        <Demo caption="위 왼쪽 (기본)" column>
          <Chart.Line data={monthly} groupKey="월" plotWidth={480} plotHeight={180} axisXValueFormatter={month} tooltipTitleFormatter={month} aria-label="범례가 위에 있는 차트" />
        </Demo>
        <Demo caption="아래 왼쪽 (direction=&quot;column-reverse&quot;)" column>
          <Chart.Line data={monthly} groupKey="월" direction="column-reverse" plotWidth={480} plotHeight={180} axisXValueFormatter={month} tooltipTitleFormatter={month} aria-label="범례가 아래에 있는 차트" />
        </Demo>
        <Demo caption="오른쪽 (direction=&quot;row-reverse&quot;, 범례는 세로로)">
          <Chart.Line
            data={monthly}
            groupKey="월"
            direction="row-reverse"
            legendProps={{ direction: "column" }}
            plotWidth={400}
            plotHeight={180}
            axisXValueFormatter={month}
            tooltipTitleFormatter={month}
            aria-label="범례가 오른쪽에 있는 차트"
          />
        </Demo>
        <Table
          head={["자리", "쓰는 때"]}
          rows={[
            ["위 왼쪽", "기본입니다. 차트를 읽기 전에 계열을 먼저 알 수 있습니다."],
            ["아래 왼쪽", "차트 위에 필터가 많아 자리가 없을 때, 좁은 화면에 맞춰 줄일 때"],
            ["오른쪽", "차트가 작아 옆자리가 남을 때, 항목을 세로로 놓고 값을 견줄 때(도넛 차트 등)"],
          ]}
        />
        <Rules
          items={[
            "한 화면의 차트는 범례 자리를 통일합니다.",
            "범례와 차트 사이는 16px, 도넛·한 줄 비율 차트처럼 옆에 놓을 때는 24px 띄웁니다.",
            "항목이 많아 한 줄에 들어가지 않으면 다음 줄로 넘깁니다. 이름을 자르지 않습니다.",
          ]}
        />
      </Section>

      <Section title="추세와 합계">
        <Demo caption="추세 항목은 구분선으로 나눠 맨 끝에 둡니다 (withTrend)" column>
          <TrendDemo />
        </Demo>
        <Rules
          items={[
            <>추세선이나 평균선을 켜고 끄는 항목은 <Code>withTrend</Code>로 넣습니다. 계열 항목과 구분선으로 나뉘어 맨 끝에 놓입니다.</>,
            <>이름은 <Code>trendLabel</Code>로 "추세", "평균"처럼 우리말로 줍니다.</>,
            "합계선도 같은 방식으로 보여 줍니다. 선 위의 점은 넣어도 되고 빼도 됩니다.",
            "추세와 합계는 데이터 계열이 아니므로 회색 선으로 그립니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "체크 상자 항목을 누르면 그 계열이 차트에서 사라지거나 다시 나타납니다.",
            "항목에 마우스를 올리면 그 계열만 또렷하게 남고 나머지 계열은 30% 정도로 흐려집니다.",
            "이미 꺼 둔 계열은 다른 항목에 마우스를 올려도 꺼진 채로 둡니다.",
            "모든 항목을 끄면 데이터 없이 가로축만 남깁니다. 차트 자리를 접거나 빈 상태로 바꾸지 않습니다.",
            <>강조 효과를 끄려면 <Code>legendProps.disableHoverItems</Code>, 켜고 끄기를 막으려면 <Code>legendProps.disableSelectItems</Code>를 줍니다.</>,
            <>처음부터 꺼 둘 계열은 <Code>legendMap</Code>에서 <Code>defaultChecked: false</Code>로 정합니다. 계열이 많을 때 중요한 것만 켜 두는 데 씁니다.</>,
            "키보드로도 항목을 옮겨 다니며 켜고 끌 수 있어야 합니다.",
          ]}
        />
        <Demo caption="처음에는 &quot;반려&quot;를 꺼 둔 차트" column>
          <Chart.Line
            data={monthly}
            groupKey="월"
            legendProps={{ legendMap: { 반려: { defaultChecked: false } } }}
            plotWidth={480}
            plotHeight={180}
            axisXValueFormatter={month}
            tooltipTitleFormatter={month}
            aria-label="일부 계열을 꺼 둔 차트"
          />
        </Demo>
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "계열 이름은 한두 낱말로 씁니다. 데이터의 칸 이름을 그대로 쓰지 말고 사용자가 아는 말로 바꿉니다.",
            <>데이터의 칸 이름과 보여 줄 이름이 다르면 <Code>legendMap</Code>의 <Code>label</Code>로 바꿉니다.</>,
            "단위는 이름에 넣지 않고 덧붙이는 글이나 축에 적습니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <ChartLegend items={items.slice(0, 2)} aria-label="이름이 있는 범례" onChangeVisibleItem={noop} />,
            text: "색과 이름을 함께 보여 줍니다.",
          }}
          bad={{ text: "\"파란 선은 접수입니다\"처럼 색 이름으로 설명하지 않습니다. 색을 구분하지 못하는 사용자는 읽을 수 없습니다." }}
        />
        <DoDont
          good={{ text: "끌 수 없는 차트(도넛 등)에는 동그라미 범례를 씁니다." }}
          bad={{ text: "눌러도 아무 일이 없는 체크 상자를 두지 않습니다." }}
        />
      </Section>
    </Page>
  );
}

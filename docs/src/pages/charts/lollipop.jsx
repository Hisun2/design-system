import React from "react";
import { Page, Section, Sub, P, Rules, Table, DoDont, Code, Swatch, Figure } from "../../kit.jsx";

export const meta = { title: "막대사탕 차트", order: 32 };

const fmt = (n) => n.toLocaleString("ko-KR");
// 부서별 처리 건수. 값이 큰 순서.
const depts = [
  ["영업1팀", 1284], ["고객지원팀", 1192], ["구매팀", 1105], ["물류팀", 1043], ["영업2팀", 987],
  ["생산팀", 912], ["품질팀", 864], ["재무팀", 790], ["전산팀", 731], ["연구팀", 655],
  ["기획팀", 602], ["총무팀", 548], ["인사팀", 471], ["법무팀", 389], ["홍보팀", 312],
];
// [부서, 지난해, 올해]
const pairs = [
  ["영업1팀", 1020, 1284], ["고객지원팀", 1240, 1192], ["구매팀", 860, 1105],
  ["물류팀", 990, 1043], ["생산팀", 1130, 912], ["재무팀", 640, 790],
];
const edge = [["구매팀", 420], ["물류팀", 0], ["재무팀", null], ["인사팀", 260]];

/** 가로형 막대사탕. 값이 null이면 점도 선도 없이 "값 없음", 0이면 기준선 위에 점만 찍습니다. */
function Lollipops({ data, max, label, highlight }) {
  const x0 = 88;
  const plotW = 400;
  const row = 20;
  const x = (v) => x0 + (v / max) * plotW;
  const h = data.length * row;
  return (
    <svg viewBox={`0 0 560 ${h}`} width={560} role="img" aria-label={label}>
      <line x1={x0} x2={x0} y1={0} y2={h} stroke="var(--ec-border)" />
      {data.map(([name, v], i) => {
        const y = i * row + row / 2;
        return (
          <g key={name}>
            <text x={x0 - 12} y={y} textAnchor="end" dominantBaseline="central" fontSize={12} fill="var(--ec-text-secondary)">{name}</text>
            {v === null ? (
              <text x={x0 + 8} y={y} dominantBaseline="central" fontSize={12} fill="var(--ec-text-secondary)">값 없음</text>
            ) : (
              <>
                {v > 0 ? <line x1={x0} x2={x(v)} y1={y} y2={y} stroke="var(--ec-border-control)" strokeWidth={2} /> : null}
                <circle cx={x(v)} cy={y} r={4} fill={name === highlight ? "var(--ec-chart-7)" : "var(--ec-chart-1)"} />
                <text x={x(v) + 8} y={y} dominantBaseline="central" fontSize={12} fill="var(--ec-text-primary)">{fmt(v)}</text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** 두 값을 한 줄에 찍어 견주는 모양. 눈금선을 두고 값은 적지 않습니다. */
function PairedLollipops() {
  const x0 = 88;
  const plotW = 400;
  const row = 24;
  const top = 28;
  const max = 1500;
  const ticks = [0, 500, 1000, 1500];
  const x = (v) => x0 + (v / max) * plotW;
  const bottom = top + pairs.length * row;
  return (
    <svg viewBox={`0 0 560 ${bottom + 24}`} width={560} role="img" aria-label="부서 여섯 곳의 지난해와 올해 처리 건수를 한 줄에 점 두 개로 견준 막대사탕 차트">
      <circle cx={x0 + 4} cy={8} r={4} fill="var(--ec-chart-1)" />
      <text x={x0 + 14} y={8} dominantBaseline="central" fontSize={12} fill="var(--ec-text-secondary)">지난해</text>
      <circle cx={x0 + 72} cy={8} r={4} fill="var(--ec-chart-2)" />
      <text x={x0 + 82} y={8} dominantBaseline="central" fontSize={12} fill="var(--ec-text-secondary)">올해</text>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={top} y2={bottom} stroke="var(--ec-border)" />
          <text x={x(t)} y={bottom + 14} textAnchor="middle" dominantBaseline="central" fontSize={12} fill="var(--ec-text-secondary)">{fmt(t)}</text>
        </g>
      ))}
      {pairs.map(([name, last, now], i) => {
        const y = top + i * row + row / 2;
        return (
          <g key={name}>
            <text x={x0 - 12} y={y} textAnchor="end" dominantBaseline="central" fontSize={12} fill="var(--ec-text-secondary)">{name}</text>
            <line x1={x(last)} x2={x(now)} y1={y} y2={y} stroke="var(--ec-border-control)" strokeWidth={2} />
            <circle cx={x(last)} cy={y} r={4} fill="var(--ec-chart-1)" />
            <circle cx={x(now)} cy={y} r={4} fill="var(--ec-chart-2)" />
          </g>
        );
      })}
    </svg>
  );
}

export default function LollipopPage() {
  return (
    <Page meta={meta} lead="막대 대신 가는 선과 그 끝의 점으로 값을 나타내는 차트입니다. 막대 차트와 같은 데이터를 다루지만 잉크가 적어, 항목이 많을 때 덜 답답합니다.">
      <Section title="컴포넌트">
        <P>전용 컴포넌트는 아직 없습니다. 아래 규칙에 맞춰 직접 구성합니다.</P>
        <P>차트 전체에 공통인 규칙(색, 축, 범례, 설명 상자, 빈 상태)은 차트 기본 규칙을 따릅니다. 이 페이지는 막대사탕 차트에만 해당하는 것을 적습니다.</P>
        <Figure caption="부서 열다섯 곳의 처리 건수(건)를 큰 순서로 놓은 가로형. 회색 선이 0에서 값까지 뻗고, 끝의 점이 값입니다. 값을 모든 점에 적었으므로 눈금선은 뺐습니다. 설명용 그림입니다. 전용 컴포넌트는 아직 없습니다.">
          <Lollipops data={depts} max={1400} label="부서 열다섯 곳의 처리 건수를 큰 순서로 놓은 가로형 막대사탕 차트. 가장 큰 값은 영업1팀 1,284건, 가장 작은 값은 홍보팀 312건" />
        </Figure>
      </Section>

      <Section title="언제 쓰는가">
        <Rules
          items={[
            "항목이 많아(열다섯 개 이상) 막대로 그리면 화면이 색 덩어리로 가득 찰 때.",
            "값이 모두 비슷하게 커서 막대가 거의 같은 길이로 늘어설 때. 점의 위치가 차이를 더 잘 보여 줍니다.",
            "순위를 보여 줄 때.",
            "항목이 몇 개 없으면 막대 차트를 씁니다. 막대가 더 익숙하고 길이를 읽기 쉽습니다.",
            "누적하거나 여러 계열을 나란히 놓아야 하면 막대 차트를 씁니다. 막대사탕은 계열 하나(많아야 둘)에 맞습니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Table
          head={["요소", "규칙"]}
          rows={[
            ["선(막대기)", "기준선(0)에서 값까지 잇는 선. 두께 2px."],
            ["점(사탕)", "값의 위치에 찍는 동그라미. 지름 8px. 점의 가운데가 값입니다."],
            ["기준선", "0의 위치. 선은 반드시 여기서 시작합니다."],
            ["항목 이름", "가로형은 선의 왼쪽, 세로형은 선의 아래에 적습니다."],
            ["값", "필요하면 점 옆에 적습니다."],
          ]}
        />
        <Rules
          items={[
            "항목 이름이 길거나 항목이 많으면 가로형(선이 옆으로 뻗음)을 씁니다. 대부분 가로형이 읽기 쉽습니다.",
            "항목 사이 간격은 모두 같고, 점이 서로 닿지 않을 만큼 띄웁니다(16px 이상).",
            "값의 축은 0에서 시작합니다.",
            "순서에 뜻이 없는 항목은 값이 큰 순서로 놓습니다. 시간이나 등급처럼 순서가 있으면 그 순서를 지킵니다.",
          ]}
        />
      </Section>

      <Section title="색">
        <Rules
          items={[
            <>점은 <Code>--ec-chart-1</Code> <Swatch token="chart-1" />, 선은 같은 색 또는 회색(<Code>--ec-border-control</Code>)으로 그립니다. 선을 회색으로 하면 점이 더 도드라집니다.</>,
            "모든 항목을 같은 색으로 칠합니다. 항목마다 색을 달리하지 않습니다.",
            <>한 항목만 강조할 때는 그 항목의 점을 진한 단계(<Code>--ec-chart-7</Code> <Swatch token="chart-7" />)로 칠합니다.</>,
            <>두 값을 한 줄에 함께 찍어 견줄 때(지난해와 올해)는 점을 <Code>--ec-chart-1</Code>, <Code>--ec-chart-2</Code>로 칠하고 두 점 사이를 회색 선으로 잇습니다. 범례를 둡니다.</>,
          ]}
        />
        <Figure caption="두 값을 한 줄에 찍어 견준 모습. 두 점 사이의 선 길이가 지난해와 올해의 차이입니다. 값을 적지 않았으므로 눈금선을 두었습니다. 설명용 그림입니다. 전용 컴포넌트는 아직 없습니다.">
          <PairedLollipops />
        </Figure>
      </Section>

      <Section title="글자">
        <Rules
          items={[
            <>항목 이름과 축 글자는 12px(크기 100), <Code>--ec-text-secondary</Code>입니다.</>,
            <>점 옆의 값은 12px, <Code>--ec-text-primary</Code>입니다. 점에서 4px 띄웁니다.</>,
            "값을 모든 점에 적으면 눈금선은 뺍니다. 둘 다 두면 복잡합니다.",
            "항목 이름이 길면 말줄임하고 설명 상자에 전체 이름을 보여 줍니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "점이나 선에 마우스를 올리면 그 항목의 줄 전체가 옅은 회색으로 강조되고, 점이 10px로 커집니다. 설명 상자에 항목 이름과 값이 나옵니다.",
            "마우스가 닿는 범위는 점만이 아니라 그 항목의 줄 전체입니다. 점은 작아서 짚기 어렵습니다.",
            "항목을 누를 수 있으면 마우스 모양을 손가락으로 바꿉니다.",
          ]}
        />
      </Section>

      <Section title="예외 상황">
        <Figure caption="값이 0인 물류팀은 선 없이 기준선 위에 점만 찍었습니다. 값이 없는 재무팀은 점도 선도 없이 글자로 알립니다. 설명용 그림입니다. 전용 컴포넌트는 아직 없습니다.">
          <Lollipops data={edge} max={1400} label="값이 0인 항목은 기준선 위에 점만 찍고, 값이 없는 항목은 값 없음이라고 적은 막대사탕 차트" />
        </Figure>
        <Rules
          items={[
            "값이 0이면 선 없이 기준선 위에 점만 찍습니다. 0은 데이터입니다.",
            "값이 없으면 점도 선도 그리지 않고, 값 자리에 \"값 없음\"이라고 적습니다.",
            "음수가 있으면 기준선을 가운데에 두고 선을 반대쪽으로 뻗습니다.",
            "한 항목만 값이 유독 크면 나머지 점이 기준선에 몰립니다. 막대 차트의 튀는 값 규칙과 같은 방법으로 다룹니다.",
            "항목이 하나뿐이면 차트 대신 숫자로 보여 줍니다.",
            "처음 불러오는 동안에는 차트 자리에 Skeleton을 보여 줍니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "선을 0에서 시작하고, 모든 점을 같은 크기로 찍습니다." }}
          bad={{ text: "점의 크기를 값에 따라 바꾸지 않습니다. 값은 점의 위치가 전합니다. 크기까지 바뀌면 무엇이 값인지 헷갈립니다." }}
        />
      </Section>

      <Section title="막대 차트와의 구분">
        <Table
          head={["", "막대사탕 차트", "막대 차트"]}
          rows={[
            ["항목 수", "많을 때", "적을 때"],
            ["계열", "하나 또는 둘", "여럿. 누적·묶음 가능"],
            ["값을 읽는 곳", "점의 위치", "막대의 길이"],
          ]}
        />
      </Section>
    </Page>
  );
}

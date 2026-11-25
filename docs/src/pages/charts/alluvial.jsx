import React from "react";
import { Page, Section, Sub, P, Rules, Table, DoDont, Code, Swatch, Figure } from "../../kit.jsx";

export const meta = { title: "흐름 차트", order: 27 };

const fmt = (n) => n.toLocaleString("ko-KR");
const fillOf = { 접수: "var(--ec-chart-1)", 검토: "var(--ec-chart-2)", 승인: "var(--ec-chart-3)", 기타: "var(--ec-chart-other)" };

// 문서 3,200건의 상태가 세 시점 사이에 어떻게 옮겨 갔는지. flows[n]은 n번째 단계에서 다음 단계로 간 양 [출발, 도착, 건수].
const stageNames = ["9월 말", "10월 말", "11월 말"];
const order = ["접수", "검토", "승인", "기타"];
const flows = [
  [["접수", "접수", 600], ["접수", "검토", 600], ["접수", "승인", 200], ["검토", "접수", 100], ["검토", "검토", 500], ["검토", "승인", 400], ["승인", "승인", 600], ["기타", "기타", 200]],
  [["접수", "접수", 250], ["접수", "검토", 350], ["접수", "승인", 100], ["검토", "접수", 50], ["검토", "검토", 450], ["검토", "승인", 600], ["승인", "승인", 1200], ["기타", "기타", 200]],
];

/**
 * 흐름 차트 한 벌을 <g>로 그립니다. xs는 단계마다 마디의 왼쪽 x, orders는 단계마다 마디를 놓는 순서입니다.
 * 띠의 굵기와 마디의 높이는 같은 비율(scale)로 계산하므로, 한 마디에서 나가는 띠의 굵기 합이 마디 높이와 같습니다.
 */
function Flow({ xs, orders, steps, titles, top, height, showValue = true }) {
  const nodeW = 12;
  const gap = 8;
  const stageCount = steps.length + 1;
  const valueOf = (stage, name) =>
    stage < steps.length
      ? steps[stage].filter((f) => f[0] === name).reduce((s, f) => s + f[2], 0)
      : steps[stage - 1].filter((f) => f[1] === name).reduce((s, f) => s + f[2], 0);
  const total = orders[0].reduce((s, name) => s + valueOf(0, name), 0);
  const scale = (height - gap * (orders[0].length - 1)) / total;
  // 단계마다 마디의 위치.
  const nodes = Array.from({ length: stageCount }, (_, s) => {
    let y = top;
    return Object.fromEntries(
      orders[s].map((name) => {
        const node = { name, value: valueOf(s, name), y, h: valueOf(s, name) * scale };
        y += node.h + gap;
        return [name, node];
      }),
    );
  });
  // 띠. 출발 쪽에서는 도착 마디의 순서대로, 도착 쪽에서는 출발 마디의 순서대로 쌓습니다.
  const bands = steps.flatMap((step, s) => {
    const outAt = Object.fromEntries(orders[s].map((n) => [n, nodes[s][n].y]));
    const inAt = Object.fromEntries(orders[s + 1].map((n) => [n, nodes[s + 1][n].y]));
    const sorted = [...step].sort((a, b) => orders[s].indexOf(a[0]) - orders[s].indexOf(b[0]) || orders[s + 1].indexOf(a[1]) - orders[s + 1].indexOf(b[1]));
    const x0 = xs[s] + nodeW;
    const x1 = xs[s + 1];
    const mid = (x0 + x1) / 2;
    return sorted.map(([from, to, value]) => {
      const t = Math.max(1, value * scale);
      const a = outAt[from];
      const b = inAt[to];
      outAt[from] += value * scale;
      inAt[to] += value * scale;
      return { key: `${s}-${from}-${to}`, from, d: `M${x0} ${a}C${mid} ${a} ${mid} ${b} ${x1} ${b}V${b + t}C${mid} ${b + t} ${mid} ${a + t} ${x0} ${a + t}Z` };
    });
  });
  return (
    <g>
      {titles.map((title, s) => (
        <text key={title} x={xs[s] + nodeW / 2} y={top - 16} textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={500} fill="var(--ec-text-primary)">{title}</text>
      ))}
      {bands.map((b) => (
        <path key={b.key} d={b.d} fill={fillOf[b.from]} fillOpacity={0.4} />
      ))}
      {nodes.map((stage, s) =>
        Object.values(stage).map((n) => {
          const leftSide = s === 0;
          return (
            <g key={`${s}-${n.name}`}>
              <rect x={xs[s]} y={n.y} width={nodeW} height={n.h} fill={fillOf[n.name]} />
              <text
                x={leftSide ? xs[s] - 8 : xs[s] + nodeW + 8}
                y={n.y + n.h / 2}
                textAnchor={leftSide ? "end" : "start"}
                dominantBaseline="central"
                fontSize={12}
                fill="var(--ec-text-secondary)"
              >
                {n.name}
                {showValue ? <tspan fill="var(--ec-text-primary)"> {fmt(n.value)}건</tspan> : null}
              </text>
            </g>
          );
        }),
      )}
    </g>
  );
}

export default function AlluvialPage() {
  return (
    <Page meta={meta} lead="양이 한 단계에서 다음 단계로 어떻게 나뉘어 흘러가는지를 띠의 굵기로 보여 주는 차트입니다. 예를 들어 접수된 문서가 검토, 승인, 반려로 얼마씩 넘어갔는지를 보여 줍니다.">
      <Section title="컴포넌트">
        <P>전용 컴포넌트는 아직 없습니다. 아래 규칙에 맞춰 직접 구성합니다.</P>
        <P>차트 전체에 공통인 규칙(색, 축, 범례, 설명 상자, 빈 상태)은 차트 기본 규칙을 따릅니다. 이 페이지는 흐름 차트에만 해당하는 것을 적습니다.</P>
        <Figure caption="문서 3,200건의 상태가 9월 말, 10월 말, 11월 말 사이에 어떻게 옮겨 갔는지. 세로 막대(마디)의 높이가 그 상태의 건수이고, 띠의 굵기가 옮겨 간 건수입니다. 띠는 출발한 마디의 색을 따릅니다. 설명용 그림입니다. 전용 컴포넌트는 아직 없습니다.">
          <svg viewBox="0 0 560 320" width={560} role="img" aria-label="문서 3,200건의 상태가 세 시점 사이에 옮겨 간 흐름 차트. 접수는 1,400건에서 300건으로 줄고, 승인은 600건에서 1,900건으로 늘었습니다">
            <Flow xs={[104, 274, 444]} orders={[order, order, order]} steps={flows} titles={stageNames} top={32} height={280} />
          </svg>
        </Figure>
      </Section>

      <Section title="언제 쓰는가">
        <Rules
          items={[
            "전체 양이 단계마다 어떤 묶음으로 나뉘는지, 묶음 사이에서 얼마가 옮겨 갔는지 보여 줄 때.",
            "두 시점 사이에 항목의 구성이 어떻게 바뀌었는지 보여 줄 때(지난달 상태 → 이번 달 상태).",
            "단계가 둘에서 다섯 사이이고, 단계마다 묶음이 일곱 개 이하일 때.",
            "정확한 값의 비교가 목적이면 쓰지 않습니다. 띠의 굵기는 대략의 크기만 전합니다. 그럴 때는 누적 막대 차트나 표를 씁니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Table
          head={["요소", "규칙"]}
          rows={[
            ["단계(세로 줄)", "왼쪽에서 오른쪽으로 시간이나 절차의 순서대로 놓습니다. 줄 위에 단계 이름을 적습니다."],
            ["마디", "한 단계 안의 묶음. 세로 막대이고, 높이가 그 묶음의 양입니다. 폭은 8~16px로 모든 마디가 같습니다."],
            ["띠", "두 마디를 잇는 곡선 면. 굵기가 옮겨 간 양입니다. 한 마디에서 나가는 띠의 굵기 합은 그 마디의 높이와 같아야 합니다."],
            ["이름표", "마디 옆에 묶음 이름과 값을 적습니다. 첫 단계는 왼쪽, 마지막 단계는 오른쪽에 둡니다."],
          ]}
        />
        <Rules
          items={[
            "같은 단계 안의 마디 사이 간격은 8px 이상입니다.",
            "마디는 위에서부터 큰 순서로, 또는 절차상 뜻이 통하는 순서로 놓습니다. 모든 단계에서 같은 순서를 지켜 띠가 덜 엇갈리게 합니다.",
            "\"기타\"는 맨 아래에 둡니다.",
          ]}
        />
        <Figure caption="같은 데이터를 마디 순서만 달리해 그린 것. 왼쪽은 두 단계의 순서가 같아 띠가 거의 엇갈리지 않습니다. 오른쪽은 둘째 단계의 순서를 바꿔 띠가 서로 가로지릅니다. 설명용 그림입니다. 전용 컴포넌트는 아직 없습니다.">
          <svg viewBox="0 0 560 232" width={560} role="img" aria-label="마디 순서가 같은 흐름 차트와 순서를 바꿔 띠가 엇갈리는 흐름 차트의 비교">
            <text x={0} y={10} dominantBaseline="central" fontSize={12} fontWeight={500} fill="var(--ec-text-primary)">이렇게 씁니다: 모든 단계에서 같은 순서</text>
            <text x={296} y={10} dominantBaseline="central" fontSize={12} fontWeight={500} fill="var(--ec-text-primary)">쓰지 않습니다: 단계마다 다른 순서</text>
            <Flow xs={[40, 192]} orders={[order, order]} steps={[flows[0]]} titles={["9월 말", "10월 말"]} top={56} height={176} showValue={false} />
            <Flow xs={[336, 488]} orders={[order, ["승인", "기타", "접수", "검토"]]} steps={[flows[0]]} titles={["9월 말", "10월 말"]} top={56} height={176} showValue={false} />
          </svg>
        </Figure>
      </Section>

      <Section title="색">
        <Rules
          items={[
            <>마디의 색은 <Code>--ec-chart-1</Code>부터 번호 순서대로 씁니다. <Swatch token="chart-1" /> <Swatch token="chart-2" /> <Swatch token="chart-3" /></>,
            "띠는 출발한 마디의 색을 따르고, 불투명도를 30~50%로 낮춥니다. 띠가 겹치는 곳이 비쳐 보여야 합니다.",
            "같은 묶음이 여러 단계에 나오면 모든 단계에서 같은 색을 씁니다.",
            <>"기타"나 "알 수 없음"은 회색(<Code>--ec-chart-other</Code> <Swatch token="chart-other" />)으로 칠합니다.</>,
            "성공·실패의 뜻이 있는 묶음(승인, 반려)이라도 차트 색을 씁니다. 상태 색은 상태 표시에만 씁니다.",
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            <>이름표 글자는 12px(크기 100), 색은 <Code>--ec-text-secondary</Code>입니다. 값은 <Code>--ec-text-primary</Code>로 적습니다.</>,
            "값은 세 자리마다 쉼표를 찍습니다. 비율을 함께 적을 때는 \"1,284건 (32%)\"처럼 적습니다.",
            "이름이 길면 말줄임하고 설명 상자에 전체 이름을 보여 줍니다.",
            "마디가 너무 낮아 이름표가 겹치면 이름표를 숨기고 설명 상자에서만 보여 줍니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "띠에 마우스를 올리면 그 띠만 또렷하게 남고 나머지는 흐려집니다. 설명 상자에 \"출발 → 도착\"과 옮겨 간 양을 적습니다.",
            "마디에 마우스를 올리면 그 마디에 들어오고 나가는 띠가 모두 강조됩니다. 설명 상자에 묶음 이름, 값, 전체 대비 비율을 적습니다.",
            "키보드로도 마디를 차례로 옮겨 다닐 수 있어야 합니다.",
          ]}
        />
      </Section>

      <Section title="예외 상황">
        <Sub title="아주 작은 흐름">
          <P>띠는 값이 아무리 작아도 1px 이상의 굵기로 그립니다. 전체의 1%가 안 되는 묶음이 여럿이면 "기타"로 합칩니다.</P>
        </Sub>
        <Sub title="값이 0이거나 없을 때">
          <Rules
            items={[
              "양이 0인 흐름은 띠를 그리지 않습니다. 0은 데이터이므로 범례나 표에는 0으로 적습니다.",
              "값을 알 수 없는 묶음은 그리지 않고 \"값 없음\"으로 적습니다. 0으로 그리지 않습니다.",
              "단계가 하나뿐이면 흐름이 없으므로 이 차트를 쓰지 않습니다. 막대 차트를 씁니다.",
            ]}
          />
        </Sub>
        <Sub title="처음 불러올 때">
          <P>차트 자리에 Skeleton을 보여 줍니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다.</P>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "단계를 왼쪽에서 오른쪽으로 놓고, 단계마다 이름을 적습니다." }}
          bad={{ text: "단계마다 마디 순서를 바꿔 띠가 심하게 엇갈리게 두지 않습니다. 묶음이 여덟 개를 넘게 두지 않습니다." }}
        />
      </Section>
    </Page>
  );
}

import React from "react";
import { Page, Section, Sub, P, Rules, Table, DoDont, Code, Swatch, Figure } from "../../kit.jsx";

export const meta = { title: "깔때기 차트", order: 29 };

const fmt = (n) => n.toLocaleString("ko-KR");
const stages = [
  { name: "견적 요청", value: 1284 },
  { name: "견적 발송", value: 912 },
  { name: "협의", value: 486 },
  { name: "계약", value: 208 },
];
const withZero = [
  { name: "견적 요청", value: 320 },
  { name: "견적 발송", value: 140 },
  { name: "협의", value: 0 },
  { name: "계약", value: 0 },
];

/** 한쪽 끝에 맞춘 가로 막대 깔때기. ghost를 주면 앞 단계 길이만큼 연한 막대를 뒤에 깝니다. */
function FunnelBars({ data, ghost, label }) {
  const x0 = 88;
  const maxW = 330;
  const barH = 32;
  const gap = 8;
  const max = data[0].value;
  const len = (v) => (v === 0 ? 0 : Math.max(2, (v / max) * maxW));
  return (
    <svg viewBox={`0 0 560 ${data.length * (barH + gap) - gap}`} width={560} role="img" aria-label={label}>
      {data.map((d, i) => {
        const y = i * (barH + gap);
        const w = len(d.value);
        const prev = i > 0 ? data[i - 1].value : null;
        const back = ghost && i > 0 ? len(prev) : 0;
        return (
          <g key={d.name}>
            <text x={x0 - 12} y={y + barH / 2} textAnchor="end" dominantBaseline="central" fontSize={14} fill="var(--ec-text-primary)">{d.name}</text>
            {back ? <rect x={x0} y={y} width={back} height={barH} fill="var(--ec-chart-13)" /> : null}
            {w ? <rect x={x0} y={y} width={w} height={barH} fill="var(--ec-chart-1)" /> : null}
            <text x={x0 + w + 8} y={y + barH / 2} dominantBaseline="central" fontSize={14} fontWeight={500} fill="var(--ec-text-primary)">{fmt(d.value)}건</text>
            {i > 0 ? (
              <text x={x0 - 12} y={y - gap / 2} textAnchor="end" dominantBaseline="central" fontSize={12} fill="var(--ec-text-secondary)">
                ↓ {prev ? `${((d.value / prev) * 100).toFixed(1)}%` : "–"}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

/** 정렬 비교: 왼쪽은 한쪽 끝에 맞춘 막대, 오른쪽은 가운데로 모은 깔때기 모양. */
function AlignCompare() {
  const barH = 24;
  const gap = 4;
  const maxW = 200;
  const max = stages[0].value;
  const top = 28;
  const row = (i) => top + i * (barH + gap);
  const w = (v) => (v / max) * maxW;
  const cx = 420;
  const trapezoid = stages
    .map((d, i) => {
      const next = stages[i + 1] ?? d;
      const a = w(d.value) / 2;
      const b = w(next.value) / 2;
      return `M${cx - a} ${row(i)}H${cx + a}L${cx + b} ${row(i) + barH}H${cx - b}Z`;
    });
  return (
    <svg viewBox={`0 0 560 ${row(stages.length)}`} width={560} role="img" aria-label="한쪽 끝에 맞춘 막대와 가운데로 모은 깔때기 모양의 비교">
      <text x={20} y={10} dominantBaseline="central" fontSize={12} fontWeight={500} fill="var(--ec-text-primary)">이렇게 씁니다: 한쪽 끝에 맞춘 막대</text>
      <text x={320} y={10} dominantBaseline="central" fontSize={12} fontWeight={500} fill="var(--ec-text-primary)">쓰지 않습니다: 가운데로 모은 깔때기</text>
      <line x1={20} x2={20} y1={top - 4} y2={row(stages.length) - gap + 4} stroke="var(--ec-border-control)" />
      {stages.map((d, i) => (
        <g key={d.name}>
          <rect x={20} y={row(i)} width={w(d.value)} height={barH} fill="var(--ec-chart-1)" />
          <text x={20 + w(d.value) + 8} y={row(i) + barH / 2} dominantBaseline="central" fontSize={12} fill="var(--ec-text-secondary)">{fmt(d.value)}</text>
          <path d={trapezoid[i]} fill="var(--ec-chart-1)" />
        </g>
      ))}
    </svg>
  );
}

export default function FunnelPage() {
  return (
    <Page meta={meta} lead="정해진 순서의 단계를 거치면서 수가 얼마나 줄어드는지 보여 주는 차트입니다. 예를 들어 견적 요청에서 계약까지 단계마다 몇 건이 남았는지를 보여 줍니다.">
      <Section title="컴포넌트">
        <P>전용 컴포넌트는 아직 없습니다. 아래 규칙에 맞춰 직접 구성합니다.</P>
        <P>차트 전체에 공통인 규칙(색, 범례, 설명 상자, 빈 상태)은 차트 기본 규칙을 따릅니다. 이 페이지는 깔때기 차트에만 해당하는 것을 적습니다.</P>
        <Figure caption="견적 요청에서 계약까지 단계별 건수. 막대 길이가 건수이고, 단계 사이의 화살표 옆 숫자가 앞 단계 대비 넘어간 비율입니다. 설명용 그림입니다. 전용 컴포넌트는 아직 없습니다.">
          <FunnelBars data={stages} label="견적 요청 1,284건, 견적 발송 912건, 협의 486건, 계약 208건으로 줄어드는 깔때기 차트" />
        </Figure>
      </Section>

      <Section title="언제 쓰는가">
        <Rules
          items={[
            "단계의 순서가 정해져 있고, 앞 단계를 거친 것만 다음 단계로 갈 때(요청 → 견적 → 협의 → 계약).",
            "어느 단계에서 가장 많이 빠지는지 찾는 것이 목적일 때.",
            "단계가 셋에서 여섯 사이일 때.",
            "뒤 단계의 수가 앞 단계보다 커질 수 있는 데이터에는 쓰지 않습니다. 순서가 없는 항목의 비교에도 쓰지 않습니다. 막대 차트를 씁니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Table
          head={["요소", "규칙"]}
          rows={[
            ["단계 막대", "단계마다 막대 하나. 길이가 그 단계의 수에 비례합니다. 첫 단계가 가장 깁니다."],
            ["방향", "위에서 아래로 쌓는 가로 막대를 기본으로 합니다. 단계 이름이 길어도 읽기 쉽습니다. 자리가 가로로 넓으면 왼쪽에서 오른쪽으로 세로 막대를 놓습니다."],
            ["단계 이름", "막대의 왼쪽(가로 막대) 또는 아래(세로 막대)에 적습니다."],
            ["값", "막대 끝 또는 안쪽에 그 단계의 수를 적습니다."],
            ["넘어간 비율", "이웃한 두 막대 사이에 앞 단계 대비 비율(%)을 적습니다."],
          ]}
        />
        <Rules
          items={[
            "막대는 한쪽 끝(왼쪽 또는 아래)에 맞춰 정렬합니다. 길이를 한 기준선에서 비교할 수 있어야 합니다.",
            "가운데 정렬한 깔때기 모양(위가 넓고 아래가 좁은 사다리꼴)은 쓰지 않습니다. 넓이가 값을 왜곡합니다.",
            "막대 두께는 모두 같고, 막대 사이 간격은 4px 또는 8px입니다.",
            "막대 길이는 0에서 시작하는 눈금을 따릅니다.",
          ]}
        />
        <Figure caption="같은 데이터를 두 가지로 그린 것. 왼쪽은 길이를 한 기준선에서 견줄 수 있습니다. 오른쪽은 넓이와 기울기가 눈에 들어와 값을 견주기 어렵습니다. 설명용 그림입니다. 전용 컴포넌트는 아직 없습니다.">
          <AlignCompare />
        </Figure>
      </Section>

      <Section title="색">
        <Rules
          items={[
            <>모든 단계를 한 가지 색으로 칠합니다. <Code>--ec-chart-1</Code> <Swatch token="chart-1" />을 씁니다. 단계는 위치로 구분되므로 색을 달리할 필요가 없습니다.</>,
            <>빠진 양을 함께 보여 줄 때는 막대 뒤에 앞 단계 길이만큼의 연한 막대(<Code>--ec-chart-13</Code> <Swatch token="chart-13" />)를 깝니다.</>,
            <>두 묶음(예: 올해와 지난해)을 견줄 때는 묶음마다 <Code>--ec-chart-1</Code>, <Code>--ec-chart-2</Code>를 차례로 쓰고 범례를 둡니다.</>,
            "빠진 양을 빨강으로 칠하지 않습니다. 상태 색은 상태 표시에만 씁니다.",
          ]}
        />
        <Figure caption="빠진 양을 함께 보여 준 모습. 진한 막대가 남은 수, 그 뒤의 연한 막대가 앞 단계의 수입니다. 연한 부분의 길이가 그 단계에서 빠진 양입니다. 설명용 그림입니다. 전용 컴포넌트는 아직 없습니다.">
          <FunnelBars data={stages} ghost label="단계마다 앞 단계 길이의 연한 막대를 뒤에 깔아 빠진 양을 보여 주는 깔때기 차트" />
        </Figure>
      </Section>

      <Section title="글자">
        <Rules
          items={[
            <>단계 이름은 14px(크기 200), <Code>--ec-text-primary</Code>. 값은 같은 크기에 굵기 500입니다.</>,
            <>넘어간 비율은 12px(크기 100), <Code>--ec-text-secondary</Code>입니다.</>,
            "비율이 무엇을 기준으로 한 것인지 분명히 합니다. 앞 단계 대비인지 첫 단계 대비인지 차트 제목이나 범례에 적습니다. 한 차트에서 두 기준을 섞지 않습니다.",
            "수는 세 자리마다 쉼표, 비율은 소수 첫째 자리까지 적습니다(\"1,284건\", \"32.5%\").",
            "막대가 짧아 값이 안에 들어가지 않으면 막대 바깥 오른쪽에 적습니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "막대에 마우스를 올리면 설명 상자에 단계 이름, 수, 앞 단계 대비 비율, 첫 단계 대비 비율을 보여 줍니다.",
            "막대를 눌러 그 단계의 목록으로 갈 수 있으면 마우스 모양을 손가락으로 바꿉니다.",
          ]}
        />
      </Section>

      <Section title="예외 상황">
        <Figure caption="값이 0인 단계가 있을 때. 막대 없이 0을 적고, 그 뒤 단계의 비율은 줄표로 적습니다. 설명용 그림입니다. 전용 컴포넌트는 아직 없습니다.">
          <FunnelBars data={withZero} label="협의 단계가 0건이어서 막대가 없고 계약 단계의 비율이 줄표로 적힌 깔때기 차트" />
        </Figure>
        <Rules
          items={[
            "아주 작은 값도 막대를 2px 이상의 길이로 그립니다.",
            "값이 0인 단계는 막대를 그리지 않고 값 자리에 0을 적습니다. 0은 데이터입니다. 그 뒤 단계의 비율은 계산할 수 없으므로 줄표(–)로 적습니다.",
            "값을 알 수 없는 단계는 \"값 없음\"으로 적습니다. 0으로 적지 않습니다.",
            "첫 단계가 0이면 차트를 그리지 않고 데이터가 없다는 안내를 보여 줍니다.",
            "뒤 단계가 앞 단계보다 크게 나오면 데이터나 단계 정의가 잘못된 것입니다. 100%를 넘는 비율을 그대로 보여 주지 말고 원인을 먼저 확인합니다.",
            "처음 불러오는 동안에는 차트 자리에 Skeleton을 보여 줍니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "막대를 한쪽 끝에 맞추고, 단계마다 수와 넘어간 비율을 적습니다." }}
          bad={{ text: "가운데로 모은 깔때기 그림을 쓰지 않습니다. 단계마다 다른 색을 칠하지 않습니다." }}
        />
      </Section>
    </Page>
  );
}

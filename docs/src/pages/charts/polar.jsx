import React from "react";
import { Page, Section, Sub, P, Rules, Table, DoDont, Code, Swatch, Figure } from "../../kit.jsx";

export const meta = { title: "극좌표 차트", order: 33 };

const fmt = (n) => n.toLocaleString("ko-KR");
const monthly = [820, 760, 1010, 1180, 1240, 1320, 1490, 1410, 1150, 980, 870, 1060].map((v, i) => [`${i + 1}월`, v]);
const hourly = [12, 8, 5, 4, 6, 14, 38, 96, 182, 264, 298, 240, 150, 226, 282, 254, 208, 156, 98, 64, 48, 36, 26, 18].map((v, i) => [`${i}시`, v]);
const weekly = [["월", 420], ["화", 510], ["수", 480], ["목", 530], ["금", 390], ["토", 0], ["일", null]];

/**
 * 극좌표 막대. 12시 방향에서 시작해 시계 방향으로 돕니다. 가운데 빈 원의 둘레가 0입니다.
 * 값이 0이거나 null인 조각은 칠하지 않고 자리만 비워 둡니다.
 */
function PolarBars({ data, max, ticks, labelEvery = 1, highlight, size = 320, label }) {
  const cx = 280;
  const cy = size / 2;
  const hole = 20;
  const outer = size / 2 - 40;
  const step = (2 * Math.PI) / data.length;
  const radius = (v) => hole + (v / max) * (outer - hole);
  const at = (r, a) => [cx + r * Math.sin(a), cy - r * Math.cos(a)];
  const wedge = (r, a0, a1) => {
    const [x0, y0] = at(r, a0);
    const [x1, y1] = at(r, a1);
    const [x2, y2] = at(hole, a1);
    const [x3, y3] = at(hole, a0);
    return `M${x0} ${y0}A${r} ${r} 0 0 1 ${x1} ${y1}L${x2} ${y2}A${hole} ${hole} 0 0 0 ${x3} ${y3}Z`;
  };
  return (
    <svg viewBox={`0 0 560 ${size}`} width={560} role="img" aria-label={label}>
      {data.map(([name, v], i) =>
        v ? (
          <path key={name} d={wedge(radius(v), i * step, (i + 1) * step)} fill={name === highlight ? "var(--ec-chart-7)" : "var(--ec-chart-1)"} stroke="var(--ec-bg-surface)" strokeWidth={2} />
        ) : null,
      )}
      <circle cx={cx} cy={cy} r={hole} fill="none" stroke="var(--ec-border)" />
      {ticks.map((t) => (
        <circle key={t} cx={cx} cy={cy} r={radius(t)} fill="none" stroke="var(--ec-border)" strokeDasharray="2 3" />
      ))}
      {ticks.map((t) => (
        <text key={t} x={cx} y={cy - radius(t)} textAnchor="middle" dominantBaseline="central" fontSize={12} fill="var(--ec-text-secondary)" stroke="var(--ec-bg-surface)" strokeWidth={4} paintOrder="stroke" strokeLinejoin="round">{fmt(t)}</text>
      ))}
      {data.map(([name], i) => {
        if (i % labelEvery) return null;
        const a = (i + 0.5) * step;
        const [x, y] = at(outer + 14, a);
        const side = Math.sin(a);
        return (
          <text key={name} x={x} y={y} textAnchor={Math.abs(side) < 0.3 ? "middle" : side > 0 ? "start" : "end"} dominantBaseline="central" fontSize={12} fill="var(--ec-text-secondary)">{name}</text>
        );
      })}
    </svg>
  );
}

export default function PolarPage() {
  return (
    <Page meta={meta} lead="원을 같은 각도의 조각으로 나누고, 조각마다 값의 크기만큼 가운데에서 바깥으로 뻗게 그리는 차트입니다. 막대 차트를 원으로 둥글게 만 모양입니다. 요일, 달, 시간처럼 돌고 도는 기준에 맞습니다.">
      <Section title="컴포넌트">
        <P>전용 컴포넌트는 아직 없습니다. 아래 규칙에 맞춰 직접 구성합니다.</P>
        <P>차트 전체에 공통인 규칙(색, 범례, 설명 상자, 빈 상태)은 차트 기본 규칙을 따릅니다. 이 페이지는 극좌표 차트에만 해당하는 것을 적습니다.</P>
        <Figure caption="월별 수집 건수(건). 1월이 12시 방향에서 시작해 시계 방향으로 돌고, 12월이 다시 1월과 이웃합니다. 조각의 길이가 값이고, 점선 동심원이 눈금입니다. 설명용 그림입니다. 전용 컴포넌트는 아직 없습니다.">
          <PolarBars data={monthly} max={1500} ticks={[500, 1000, 1500]} label="열두 달의 수집 건수를 원 둘레에 놓은 극좌표 차트. 7월이 1,490건으로 가장 길고 2월이 760건으로 가장 짧습니다" />
        </Figure>
      </Section>

      <Section title="언제 쓰는가">
        <Rules
          items={[
            "기준이 한 바퀴 돌아 처음으로 이어질 때(1~12월, 월~일요일, 0~23시). 끝과 처음이 이웃이라는 것이 모양에서 보입니다.",
            "어느 때에 값이 몰리는지 한눈에 보여 주는 것이 목적일 때.",
            "조각이 다섯에서 스물네 개 사이일 때.",
            "정확한 값의 비교가 목적이면 막대 차트를 씁니다. 둥글게 만 막대는 길이를 견주기 어렵고, 바깥으로 갈수록 넓어져 큰 값이 실제보다 더 커 보입니다.",
            "돌고 도는 기준이 아니면(부서, 거래처 유형) 쓰지 않습니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Table
          head={["요소", "규칙"]}
          rows={[
            ["조각", "모든 조각의 각도가 같습니다. 가운데에서 뻗은 길이가 값입니다."],
            ["시작 위치와 방향", "첫 조각은 12시 방향에서 시작하고 시계 방향으로 돕니다."],
            ["원형 눈금", "값의 눈금을 나타내는 동심원. 점선, 세 개에서 다섯 개."],
            ["눈금 값", "12시 방향의 축을 따라 한 줄로만 적습니다."],
            ["조각 이름", "원 바깥 둘레에 적습니다."],
            ["조각 사이", "1px 또는 2px의 흰 틈을 둡니다."],
          ]}
        />
        <Rules
          items={[
            "값의 눈금은 가운데(0)에서 시작합니다.",
            "가운데에 작은 빈 원을 두면 짧은 조각도 보입니다. 이때 0의 위치는 빈 원의 둘레입니다.",
            "차트는 가로세로 240px 이상으로 그립니다. 조각 이름이 들어갈 자리를 둘레에 남깁니다.",
          ]}
        />
      </Section>

      <Section title="색">
        <Rules
          items={[
            <>계열이 하나면 모든 조각을 <Code>--ec-chart-1</Code> <Swatch token="chart-1" /> 한 가지 색으로 칠합니다. 조각은 위치로 구분됩니다.</>,
            <>계열이 여럿이면(조각 안에서 쌓거나 나란히 놓음) <Code>--ec-chart-1</Code>부터 번호 순서대로 쓰고 범례를 둡니다. 계열은 셋까지입니다.</>,
            <>가장 큰 조각 하나를 강조할 때는 그 조각만 진한 단계(<Code>--ec-chart-7</Code> <Swatch token="chart-7" />)로 칠합니다.</>,
            <>원형 눈금과 축 선은 <Code>--ec-border</Code>, 글자는 <Code>--ec-text-secondary</Code>입니다.</>,
          ]}
        />
        <Figure caption="시간대별 접수 건수(건). 조각이 스물네 개라 이름은 3시간마다 적었고, 가장 큰 10시 조각만 진한 단계로 강조했습니다. 설명용 그림입니다. 전용 컴포넌트는 아직 없습니다.">
          <PolarBars data={hourly} max={300} ticks={[100, 200, 300]} labelEvery={3} highlight="10시" label="0시부터 23시까지 시간대별 접수 건수를 놓은 극좌표 차트. 10시가 298건으로 가장 길어 진한 색으로 강조했습니다" />
        </Figure>
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "조각 이름은 12px(크기 100)입니다. 글자를 조각의 각도에 맞춰 돌리지 않습니다. 모두 똑바로 적습니다.",
            "이름이 겹치면 몇 개씩 건너뛰어 적습니다(시간은 3시간마다).",
            "눈금 값은 세 자리마다 쉼표를 찍고, 단위는 차트 제목이나 범례에 한 번만 적습니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "조각에 마우스를 올리면 그 조각이 놓인 부채꼴 전체가 옅은 회색으로 강조되고, 설명 상자에 조각 이름과 값이 나옵니다.",
            "마우스가 닿는 범위는 칠해진 부분만이 아니라 가운데에서 둘레까지의 부채꼴 전체입니다. 짧은 조각도 짚을 수 있어야 합니다.",
            "계열이 여럿이면 설명 상자에 그 조각의 모든 계열 값을 범례 순서대로 보여 줍니다.",
          ]}
        />
      </Section>

      <Section title="예외 상황">
        <Figure caption="요일별 처리 건수(건). 값이 0인 토요일과 값이 없는 일요일은 칠하지 않고 자리를 비워 두었습니다. 다른 조각을 당겨 채우지 않으므로 각도는 그대로입니다. 설명용 그림입니다. 전용 컴포넌트는 아직 없습니다.">
          <PolarBars data={weekly} max={600} ticks={[200, 400, 600]} size={280} label="월요일부터 일요일까지 처리 건수를 놓은 극좌표 차트. 토요일과 일요일 자리는 비어 있습니다" />
        </Figure>
        <Rules
          items={[
            "값이 0인 조각은 칠하지 않습니다. 설명 상자에는 0을 적습니다. 0은 데이터입니다.",
            "값이 없는 조각은 칠하지 않고 설명 상자에 \"값 없음\"이라고 적습니다. 조각의 자리는 비워 둡니다. 다른 조각을 당겨 채우지 않습니다.",
            "값이 모두 0이면 원형 눈금만 그립니다.",
            "한 조각만 값이 유독 크면 나머지가 가운데에 몰려 보이지 않습니다. 이때는 막대 차트로 바꿉니다.",
            "데이터가 전혀 없으면 데이터가 없다는 안내를 보여 줍니다.",
            "처음 불러오는 동안에는 차트 자리에 Skeleton을 보여 줍니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "돌고 도는 기준에만 쓰고, 12시 방향에서 시계 방향으로 놓습니다." }}
          bad={{ text: "보기 좋다는 이유로 막대 차트 대신 쓰지 않습니다. 조각의 각도를 값에 따라 바꾸지 않습니다. 각도와 길이가 함께 바뀌면 읽을 수 없습니다." }}
        />
      </Section>

      <Section title="비슷한 차트와의 구분">
        <Table
          head={["차트", "값을 나타내는 것", "쓰임"]}
          rows={[
            ["극좌표 차트", "조각의 길이. 각도는 모두 같음", "돌고 도는 기준에서 값이 몰리는 때"],
            ["도넛 차트", "조각의 각도. 길이는 모두 같음", "전체에서 각 몫이 차지하는 비율"],
            ["방사형 차트", "축 위의 점을 이은 모양", "한 대상의 여러 항목 평가"],
          ]}
        />
      </Section>
    </Page>
  );
}

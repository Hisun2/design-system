import React from "react";
import { Page, Section, Sub, P, Rules, Table, DoDont, Code, Swatch, Figure } from "../../kit.jsx";

export const meta = { title: "카기 차트", order: 31 };

const fmt = (n) => n.toLocaleString("ko-KR");
// 하루 단가(원). 2026-08-03부터 하루에 하나씩.
const prices = [
  1200, 1215, 1240, 1262, 1250, 1228, 1205, 1190, 1178, 1195, 1230, 1255, 1280, 1301, 1290, 1262, 1240, 1215, 1188, 1170, 1150,
  1162, 1198, 1224, 1210, 1175, 1140, 1128, 1160, 1185, 1210, 1236, 1268, 1290, 1312, 1295, 1270, 1255, 1248, 1275, 1305, 1330, 1342,
].map((v, i) => ({ v, date: new Date(Date.UTC(2026, 7, 3 + i)).toISOString().slice(0, 10) }));

/** 값이 전환 폭(비율) 이상 반대로 움직인 곳만 남깁니다. 돌려주는 것은 꺾인 지점의 목록입니다. */
function turningPoints(series, reversal) {
  const turns = [series[0]];
  let dir = 0;
  let ext = series[0];
  for (const p of series.slice(1)) {
    const move = (p.v - ext.v) / ext.v;
    if (dir === 0) {
      if (Math.abs(move) >= reversal) { dir = Math.sign(move); ext = p; }
    } else if (move * dir > 0) {
      ext = p;
    } else if (-move * dir >= reversal) {
      turns.push(ext);
      dir = -dir;
      ext = p;
    }
  }
  turns.push(ext);
  return turns;
}

/**
 * 꺾인 지점의 값 목록을 선 조각으로 바꿉니다. 직전 고점을 넘으면 그 높이부터 굵은 선,
 * 직전 저점 아래로 내려가면 그 높이부터 가는 선이 됩니다.
 */
function kagiSegments(values) {
  const segments = [];
  let thick = values[1] > values[0];
  for (let i = 0; i < values.length - 1; i += 1) {
    const from = values[i];
    const to = values[i + 1];
    const prior = values[i - 1];
    const up = to > from;
    const crosses = i > 0 && (up ? !thick && to > prior : thick && to < prior);
    if (crosses) {
      segments.push({ col: i, from, to: prior, thick });
      thick = !thick;
      segments.push({ col: i, from: prior, to, thick });
    } else {
      segments.push({ col: i, from, to, thick });
    }
    if (i < values.length - 2) segments.push({ col: i, toCol: i + 1, from: to, to, thick });
  }
  return segments;
}

function KagiLines({ values, x, y, twoColors }) {
  return kagiSegments(values).map((s, i) => (
    <line
      key={i}
      x1={x(s.col)}
      x2={x(s.toCol ?? s.col)}
      y1={y(s.from)}
      y2={y(s.to)}
      stroke={twoColors && !s.thick ? "var(--ec-chart-4)" : "var(--ec-chart-1)"}
      strokeWidth={s.thick ? 3 : 1}
      strokeLinecap="square"
    />
  ));
}

function KagiChart({ twoColors, label }) {
  const turns = turningPoints(prices, 0.04);
  const left = 56;
  const top = 36;
  const h = 208;
  const lo = 1100;
  const hi = 1360;
  const x = (i) => left + 24 + i * 52;
  const y = (v) => top + h - ((v - lo) / (hi - lo)) * h;
  const thin = twoColors ? "var(--ec-chart-4)" : "var(--ec-chart-1)";
  return (
    <svg viewBox={`0 0 560 ${top + h + 28}`} width={560} role="img" aria-label={label}>
      <line x1={left} x2={left + 24} y1={8} y2={8} stroke="var(--ec-chart-1)" strokeWidth={3} />
      <text x={left + 30} y={8} dominantBaseline="central" fontSize={12} fill="var(--ec-text-secondary)">굵은 선: 오름세</text>
      <line x1={left + 136} x2={left + 160} y1={8} y2={8} stroke={thin} strokeWidth={1} />
      <text x={left + 166} y={8} dominantBaseline="central" fontSize={12} fill="var(--ec-text-secondary)">가는 선: 내림세</text>
      <text x={left + 272} y={8} dominantBaseline="central" fontSize={12} fill="var(--ec-text-secondary)">전환 폭: 4%</text>
      <text x={left - 8} y={top - 14} textAnchor="end" dominantBaseline="central" fontSize={12} fill="var(--ec-text-secondary)">단가(원)</text>
      {[1100, 1150, 1200, 1250, 1300, 1350].map((t) => (
        <g key={t}>
          <line x1={left} x2={552} y1={y(t)} y2={y(t)} stroke="var(--ec-border)" />
          <text x={left - 8} y={y(t)} textAnchor="end" dominantBaseline="central" fontSize={12} fill="var(--ec-text-secondary)">{fmt(t)}</text>
        </g>
      ))}
      <KagiLines values={turns.map((t) => t.v)} x={x} y={y} twoColors={twoColors} />
      {turns.slice(0, -1).map((t, i) =>
        i % 2 ? null : (
          <text key={t.date} x={x(i)} y={top + h + 16} textAnchor="middle" dominantBaseline="central" fontSize={12} fill="var(--ec-text-secondary)">{t.date}</text>
        ),
      )}
    </svg>
  );
}

/** 읽는 법. 꺾이는 곳, 굵어지는 곳, 가늘어지는 곳을 짚어 줍니다. */
function KagiAnatomy() {
  const values = [20, 70, 45, 90, 30, 60, 12, 80];
  const x = (i) => 40 + i * 44;
  const y = (v) => 200 - v * 1.9;
  const note = { fontSize: 12, fill: "var(--ec-text-secondary)", dominantBaseline: "central" };
  const guide = { stroke: "var(--ec-border-control)", strokeDasharray: "3 3" };
  return (
    <svg viewBox="0 0 560 208" width={560} role="img" aria-label="카기 차트 읽는 법. 값이 전환 폭 이상 반대로 움직이면 꺾이고, 직전 저점 아래로 내려가면 가는 선, 직전 고점을 넘으면 굵은 선이 됩니다">
      <line x1={x(2)} x2={x(3) + 20} y1={y(45)} y2={y(45)} {...guide} />
      <line x1={x(5)} x2={x(6) + 20} y1={y(60)} y2={y(60)} {...guide} />
      <KagiLines values={values} x={x} y={y} />
      <line x1={x(1) + 10} x2={x(1) + 10} y1={y(70)} y2={y(45)} stroke="var(--ec-text-secondary)" />
      <line x1={x(1) + 6} x2={x(1) + 14} y1={y(70)} y2={y(70)} stroke="var(--ec-text-secondary)" />
      <line x1={x(1) + 6} x2={x(1) + 14} y1={y(45)} y2={y(45)} stroke="var(--ec-text-secondary)" />
      <text x={400} y={24} {...note} fill="var(--ec-text-primary)">① 전환 폭 이상 반대로 움직이면</text>
      <text x={416} y={42} {...note}>꺾어서 새 세로선을 시작</text>
      <text x={400} y={78} {...note} fill="var(--ec-text-primary)">② 직전 저점 아래로 내려가면</text>
      <text x={416} y={96} {...note}>그 높이부터 가는 선(내림세)</text>
      <text x={400} y={132} {...note} fill="var(--ec-text-primary)">③ 직전 고점을 넘으면</text>
      <text x={416} y={150} {...note}>그 높이부터 굵은 선(오름세)</text>
      <text x={x(1) + 18} y={(y(70) + y(45)) / 2} {...note} fill="var(--ec-text-primary)">①</text>
      <text x={x(3) + 26} y={y(45)} {...note} fill="var(--ec-text-primary)">②</text>
      <text x={x(6) + 26} y={y(60)} {...note} fill="var(--ec-text-primary)">③</text>
    </svg>
  );
}

export default function KagiPage() {
  return (
    <Page meta={meta} lead="값이 일정한 폭 이상 움직였을 때만 방향을 꺾어 그리는 선 차트입니다. 시간의 간격은 무시하고 값의 큰 움직임만 남겨, 추세가 언제 바뀌었는지를 보여 줍니다.">
      <Section title="컴포넌트">
        <P>전용 컴포넌트는 아직 없습니다. 아래 규칙에 맞춰 직접 구성합니다.</P>
        <P>차트 전체에 공통인 규칙(색, 축, 범례, 설명 상자, 빈 상태)은 차트 기본 규칙을 따릅니다. 이 페이지는 카기 차트에만 해당하는 것을 적습니다.</P>
        <Figure caption="43일 동안의 단가를 전환 폭 4%로 그린 카기 차트. 값이 4% 이상 반대로 움직인 여덟 번만 선이 꺾입니다. 가로축은 꺾인 순서이고, 날짜는 꺾인 지점에만 하나 건너 하나씩 적었습니다. 설명용 그림입니다. 전용 컴포넌트는 아직 없습니다.">
          <KagiChart label="단가의 카기 차트. 1,200원에서 시작해 오르내리다 1,128원까지 내려간 뒤 1,342원까지 오릅니다. 직전 고점을 넘은 구간은 굵은 선, 직전 저점 아래로 내려간 구간은 가는 선입니다" />
        </Figure>
      </Section>

      <Section title="언제 쓰는가">
        <Rules
          items={[
            "단가, 환율처럼 자주 오르내리는 값에서 작은 흔들림을 걷어 내고 큰 흐름의 전환만 보려 할 때.",
            "오름세와 내림세가 언제 뒤바뀌었는지가 관심사일 때.",
            "읽는 법을 아는 사람이 쓰는 화면일 때. 낯선 차트이므로 일반 화면에서는 꺾은선 차트를 먼저 생각합니다.",
            "특정 날짜의 값을 읽어야 하면 쓰지 않습니다. 가로축이 고른 시간 간격이 아닙니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Table
          head={["요소", "규칙"]}
          rows={[
            ["세로선", "값이 한 방향으로 움직인 구간. 길이가 움직인 폭입니다."],
            ["가로선(꺾임)", "방향이 바뀐 곳에서 다음 세로선으로 넘어가는 짧은 선. 길이는 모두 같고 뜻이 없습니다."],
            ["전환 폭", "방향을 꺾는 기준. 값이 이 폭 이상 반대로 움직여야 새 세로선을 시작합니다. 금액 또는 비율(예: 4%)로 정합니다."],
            ["굵은 선", "값이 직전 고점을 넘어선 뒤의 구간(오름세)."],
            ["가는 선", "값이 직전 저점 아래로 내려간 뒤의 구간(내림세)."],
            ["세로축", "값. 0에서 시작하지 않아도 됩니다. 움직임이 보이는 범위로 잡습니다."],
            ["가로축", "고른 시간 눈금이 아닙니다. 꺾인 순서입니다. 날짜는 꺾인 지점에만 적습니다."],
          ]}
        />
        <Rules
          items={[
            "선은 직각으로만 꺾습니다. 비스듬한 선이나 곡선을 쓰지 않습니다.",
            "굵은 선은 3px, 가는 선은 1px로 그려 굵기 차이가 분명히 보이게 합니다.",
            "전환 폭이 얼마인지 차트 제목 아래나 범례에 반드시 적습니다. 이 값이 바뀌면 차트 모양이 완전히 달라집니다.",
          ]}
        />
        <Figure caption="읽는 법. 선은 직각으로만 꺾이고, 굵기는 세로선 중간에서도 바뀝니다. 점선은 직전 저점과 직전 고점의 높이입니다. 설명용 그림입니다. 전용 컴포넌트는 아직 없습니다.">
          <KagiAnatomy />
        </Figure>
      </Section>

      <Section title="색">
        <Rules
          items={[
            <>기본은 한 가지 색입니다. <Code>--ec-chart-1</Code> <Swatch token="chart-1" />로 그리고 오름세·내림세는 선의 굵기로 구분합니다.</>,
            <>색으로도 구분하려면 오름세에 <Code>--ec-chart-1</Code>, 내림세에 <Code>--ec-chart-4</Code> <Swatch token="chart-4" />를 씁니다. 이때도 굵기 차이는 그대로 둡니다. 색만으로 구분하지 않습니다.</>,
            "오름을 초록, 내림을 빨강으로 칠하지 않습니다. 상태 색은 상태 표시에만 쓰고, 값이 오르는 것이 좋은 일인지는 데이터마다 다릅니다.",
            <>눈금선은 <Code>--ec-border</Code>, 축 글자는 <Code>--ec-text-secondary</Code>입니다.</>,
          ]}
        />
        <Figure caption="같은 데이터를 색으로도 구분한 모습. 내림세의 가는 선만 주황으로 바꾸었고 굵기 차이는 그대로입니다. 설명용 그림입니다. 전용 컴포넌트는 아직 없습니다.">
          <KagiChart twoColors label="오름세는 파란 굵은 선, 내림세는 주황 가는 선으로 그린 단가의 카기 차트" />
        </Figure>
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "범례에 \"굵은 선: 오름세\", \"가는 선: 내림세\"와 전환 폭을 적습니다.",
            "가로축 날짜는 2026-11-25 형식으로, 겹치면 몇 개씩 건너뛰어 적습니다.",
            "세로축 값은 세 자리마다 쉼표를 찍고 단위를 축 이름에 적습니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "세로선에 마우스를 올리면 설명 상자에 그 구간의 시작 날짜와 끝 날짜, 시작 값과 끝 값, 움직인 폭을 보여 줍니다.",
            "꺾인 지점에 마우스를 올리면 전환이 일어난 날짜와 값을 보여 줍니다.",
          ]}
        />
      </Section>

      <Section title="예외 상황">
        <Rules
          items={[
            "값이 전환 폭만큼 움직인 적이 없으면 세로선 하나만 나옵니다. 차트가 비어 보이므로 전환 폭을 줄이거나 꺾은선 차트로 바꿉니다.",
            "꺾임이 너무 많아 선이 빽빽하면 전환 폭을 키우거나 기간을 줄입니다.",
            "중간에 값이 없는 날은 건너뜁니다. 0으로 넣지 않습니다. 0은 데이터이고 값 없음과 다릅니다.",
            "데이터가 전혀 없으면 데이터가 없다는 안내를 보여 줍니다.",
            "처음 불러오는 동안에는 차트 자리에 Skeleton을 보여 줍니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "전환 폭과 굵은 선·가는 선의 뜻을 차트 옆에 적습니다." }}
          bad={{ text: "설명 없이 카기 차트만 두지 않습니다. 가로축을 날짜 눈금처럼 읽히게 두지 않습니다." }}
        />
      </Section>

      <Section title="꺾은선 차트와의 구분">
        <Table
          head={["", "카기 차트", "꺾은선 차트"]}
          rows={[
            ["가로축", "꺾인 순서", "고른 시간 간격"],
            ["보여 주는 것", "큰 움직임과 추세의 전환", "모든 시점의 값"],
            ["읽는 사람", "읽는 법을 아는 사람", "누구나"],
          ]}
        />
      </Section>
    </Page>
  );
}

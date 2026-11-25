import React from "react";
import { Page, Section, Sub, P, Rules, Table, DoDont, Code, Swatch, Figure } from "../../kit.jsx";

export const meta = { title: "지도 색칠 차트", order: 28 };

// 시·도 열일곱 곳을 실제 위치와 비슷하게 놓은 칸 지도. [이름, 열, 행, 인구 만 명당 거래처 수(곳), 지난해 대비 증감(%)]
// 실제 경계가 아닙니다. null은 값 없음.
const regions = [
  ["인천", 0, 0, 14, 12], ["서울", 1, 0, 26, 24], ["경기", 2, 0, 21, 15], ["강원", 3, 0, 3, -12],
  ["충남", 0, 1, 8, 4], ["세종", 1, 1, 12, 31], ["충북", 2, 1, 7, -3], ["경북", 3, 1, 6, -14],
  ["전북", 0, 2, 4, -22], ["대전", 1, 2, 11, 6], ["대구", 2, 2, 13, -8], ["울산", 3, 2, 17, 2],
  ["전남", 0, 3, 2, -17], ["광주", 1, 3, 9, -5], ["경남", 2, 3, 10, 9], ["부산", 3, 3, 22, 18],
  ["제주", 0, 4, null, null],
];
const NULL_FILL = "var(--ec-chart-null)";
const sequential = {
  title: "인구 만 명당 거래처 수(곳)",
  bounds: [5, 10, 20],
  fills: ["var(--ec-chart-13)", "var(--ec-chart-1)", "var(--ec-chart-7)", "var(--ec-chart-19)"],
  // 연한 두 단계에는 어두운 글자, 진한 두 단계에는 흰 글자.
  texts: ["var(--ec-text-primary)", "var(--ec-text-primary)", "var(--ec-text-invert)", "var(--ec-text-invert)"],
  labels: ["0~4", "5~9", "10~19", "20 이상"],
};
const diverging = {
  title: "지난해 대비 거래처 수 증감(%)",
  bounds: [-19, -9, 0, 10, 20],
  fills: ["var(--ec-chart-10)", "var(--ec-chart-4)", "var(--ec-chart-16)", "var(--ec-chart-13)", "var(--ec-chart-1)", "var(--ec-chart-7)"],
  labels: ["−20 이하", "−19~−10", "−9~−1", "0~9", "10~19", "20 이상"],
};

/** 칸 지도. inside면 이름을 칸 안에, 아니면 칸 아래에 적습니다. */
function TileMap({ scale, valueIndex, inside, label }) {
  const w = 60;
  const h = inside ? 40 : 28;
  const pitchX = w + 1;
  const pitchY = inside ? h + 1 : h + 22;
  const mapH = 5 * pitchY;
  const legendW = scale.labels.length > 4 ? 72 : 84;
  return (
    <svg viewBox={`0 0 560 ${mapH + 56}`} width={560} role="img" aria-label={label}>
      {regions.map((region) => {
        const [name, col, row] = region;
        const v = region[valueIndex];
        const step = v === null ? null : scale.bounds.filter((b) => v >= b).length;
        const x = col * pitchX;
        const y = row * pitchY;
        return (
          <g key={name}>
            <rect x={x} y={y} width={w} height={h} fill={v === null ? NULL_FILL : scale.fills[step]} />
            <text
              x={x + w / 2}
              y={inside ? y + h / 2 : y + h + 10}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={12}
              fill={inside ? (v === null ? "var(--ec-text-secondary)" : scale.texts[step]) : "var(--ec-text-secondary)"}
            >
              {name}
            </text>
          </g>
        );
      })}
      <text x={0} y={mapH + 14} dominantBaseline="central" fontSize={12} fill="var(--ec-text-secondary)">{scale.title}</text>
      {[...scale.labels.map((text, i) => [scale.fills[i], text]), [NULL_FILL, "값 없음"]].map(([fill, text], i) => (
        <g key={text}>
          <rect x={i * legendW} y={mapH + 34} width={12} height={12} rx={2} fill={fill} />
          <text x={i * legendW + 18} y={mapH + 40} dominantBaseline="central" fontSize={12} fill="var(--ec-text-secondary)">{text}</text>
        </g>
      ))}
    </svg>
  );
}

export default function ChoroplethMapPage() {
  return (
    <Page meta={meta} lead="지도의 구역(나라, 시·도)을 값의 크기에 따라 색의 진하기로 칠해 보여 주는 차트입니다. 값이 지역에 따라 어떻게 다른지 볼 때 씁니다.">
      <Section title="컴포넌트">
        <P>전용 컴포넌트는 아직 없습니다. 아래 규칙에 맞춰 직접 구성합니다.</P>
        <P>차트 전체에 공통인 규칙(색, 범례, 설명 상자, 빈 상태)은 차트 기본 규칙을 따릅니다. 이 페이지는 지도 색칠 차트에만 해당하는 것을 적습니다.</P>
        <Figure caption="시·도별 인구 만 명당 거래처 수를 네 단계의 파랑으로 칠한 모습. 값이 클수록 진하고, 값이 없는 제주는 회색입니다. 이 그림은 경계 데이터가 없어 시·도를 같은 크기의 칸으로 바꿔 실제 위치와 비슷하게 놓은 것입니다. 실제 지도를 그리려면 구역의 경계 데이터가 필요합니다. 설명용 그림입니다. 전용 컴포넌트는 아직 없습니다.">
          <TileMap scale={sequential} valueIndex={3} inside label="시·도 열일곱 곳을 칸으로 놓고 인구 만 명당 거래처 수에 따라 네 단계의 파랑으로 칠한 지도. 서울, 경기, 부산이 가장 진하고 제주는 값이 없습니다" />
        </Figure>
      </Section>

      <Section title="언제 쓰는가">
        <Rules
          items={[
            "값이 지역과 묶여 있고, 지역에 따른 차이나 쏠림을 보여 주는 것이 목적일 때(나라별 거래 건수, 시·도별 거래처 수).",
            "어느 지역이 어디에 있는지가 읽는 데 도움이 될 때.",
            "지역 사이의 정확한 순위나 값이 목적이면 쓰지 않습니다. 가로 막대 차트나 표를 씁니다. 지도와 표를 나란히 두는 것도 좋습니다.",
            "구역의 넓이가 크다고 값이 큰 것이 아닙니다. 넓은 구역이 눈에 더 띄므로, 인구나 면적에 따라 달라지는 값은 총량 대신 비율(천 명당, 전체 대비 %)로 칠합니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Table
          head={["요소", "규칙"]}
          rows={[
            ["구역", "값의 단계에 따라 한 가지 색으로 칠합니다."],
            ["경계선", "흰색 1px. 구역끼리 구분만 되면 됩니다."],
            ["범례", "색 단계와 그 단계의 값 범위를 보여 줍니다. 지도 아래 또는 왼쪽 아래에 둡니다."],
            ["이름표", "기본으로는 적지 않습니다. 자리가 넉넉한 큰 구역에만 이름을 적을 수 있습니다."],
          ]}
        />
        <Rules
          items={[
            "지도에는 바다 색, 지형, 도로 같은 배경 정보를 넣지 않습니다. 구역과 색만 남깁니다.",
            "지도 둘레의 바탕은 흰색 또는 페이지 바탕색입니다.",
          ]}
        />
      </Section>

      <Section title="색">
        <Sub title="한 방향으로 커지는 값">
          <Rules
            items={[
              <>한 가지 색 계열의 연한 단계에서 진한 단계로 칠합니다. 파랑 계열이면 <Code>--ec-chart-13</Code> <Swatch token="chart-13" /> → <Code>--ec-chart-1</Code> <Swatch token="chart-1" /> → <Code>--ec-chart-7</Code> <Swatch token="chart-7" /> → <Code>--ec-chart-19</Code> <Swatch token="chart-19" /> 순서입니다.</>,
              "값이 클수록 진하게 칠합니다. 반대로 하지 않습니다.",
              "단계는 네 개에서 여섯 개까지입니다. 토큰만으로는 네 단계이며, 더 필요하면 같은 색의 불투명도로 중간 단계를 만듭니다. 일곱 단계가 넘으면 이웃 단계를 눈으로 구분할 수 없습니다.",
              "여러 색 계열을 섞어 무지개처럼 칠하지 않습니다. 어느 색이 더 큰 값인지 알 수 없습니다.",
            ]}
          />
        </Sub>
        <Sub title="기준점에서 양쪽으로 갈리는 값">
          <P>증가와 감소처럼 기준(0)을 사이에 두고 양쪽으로 갈리는 값은 두 색 계열을 씁니다. 기준에 가까울수록 연하게, 멀수록 진하게 칠합니다. 예: 감소는 주황 계열(<Code>--ec-chart-16</Code> → <Code>--ec-chart-4</Code> → <Code>--ec-chart-10</Code>), 증가는 파랑 계열(<Code>--ec-chart-13</Code> → <Code>--ec-chart-1</Code> → <Code>--ec-chart-7</Code>).</P>
          <Figure caption="지난해 대비 증감을 두 색 계열로 칠한 모습. 0에 가까울수록 연하고, 감소는 주황, 증가는 파랑입니다. 범례의 범위는 겹치거나 비는 곳 없이 이어집니다. 칸으로 바꿔 그린 지도이며 실제 지도에는 경계 데이터가 필요합니다. 설명용 그림입니다. 전용 컴포넌트는 아직 없습니다.">
            <TileMap scale={diverging} valueIndex={4} label="시·도 열일곱 곳의 지난해 대비 거래처 수 증감을 주황과 파랑 두 계열로 칠한 지도. 서울과 세종이 가장 크게 늘었고 전북이 가장 크게 줄었습니다" />
          </Figure>
        </Sub>
        <Sub title="값이 없는 구역">
          <P>
            회색(<Code>--ec-chart-null</Code>) <Swatch token="chart-null" />으로 칠합니다. 가장 연한 단계의 색과 헷갈리지 않아야 합니다. 범례에 "값 없음"을 따로 적습니다.
          </P>
        </Sub>
      </Section>

      <Section title="범례와 글자">
        <Rules
          items={[
            "범례는 반드시 둡니다. 색 견본마다 값 범위를 적습니다(\"1~50\", \"51~200\", \"201 이상\").",
            "범위의 경계는 읽기 쉬운 숫자로 끊습니다. 범위가 겹치거나 빈 곳이 없어야 합니다.",
            <>범례 글자는 12px(크기 100), 색은 <Code>--ec-text-secondary</Code>입니다.</>,
            "단위는 범례 제목에 한 번만 적습니다(\"거래 건수(건)\").",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "구역에 마우스를 올리면 그 구역의 경계선이 진해지고, 설명 상자에 구역 이름과 정확한 값이 나옵니다.",
            "구역을 눌러 상세 화면으로 갈 수 있으면 마우스 모양을 손가락으로 바꿉니다.",
            "작은 구역은 마우스로 짚기 어렵습니다. 지도 옆에 같은 데이터의 표나 목록을 함께 둡니다.",
            "확대·이동은 구역이 많아 한 화면에서 구분이 안 될 때만 넣습니다.",
          ]}
        />
      </Section>

      <Section title="예외 상황">
        <Rules
          items={[
            "값이 0인 구역은 가장 연한 단계로 칠하고 설명 상자에 0을 적습니다. 0은 데이터이며 \"값 없음\"과 다릅니다.",
            "값을 알 수 없는 구역은 회색으로 칠하고 설명 상자에 \"값 없음\"이라고 적습니다.",
            "한 구역만 값이 유독 크면 나머지가 모두 가장 연한 색이 됩니다. 이때는 범위를 고른 간격 대신 분포에 맞춰 나누고, 그 사실을 범례에서 알 수 있게 합니다.",
            "모든 구역에 값이 없으면 지도를 회색으로만 그리지 말고, 데이터가 없다는 안내를 보여 줍니다.",
            "처음 불러오는 동안에는 지도 자리에 Skeleton을 보여 줍니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "한 가지 색의 연한 단계에서 진한 단계로 칠하고, 범례에 값 범위를 적습니다." }}
          bad={{ text: "구역마다 서로 다른 색을 칠하지 않습니다. 색만으로 값을 전하지 않고, 설명 상자와 표로 정확한 값을 함께 보여 줍니다." }}
        />
      </Section>
    </Page>
  );
}

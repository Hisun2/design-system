import React from "react";
import { Box, Skeleton, BubbleChartSkeleton } from "@ec21rnc/ui";
import { Chart } from "@ec21rnc/ui/chart";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "버블 차트", order: 17 };

// x: 담당 문서 수(건), y: 평균 처리 기간(일), value: 금액(백만 원)
const teams = [
  { x: 48, y: 3.2, value: 620 },
  { x: 36, y: 5.1, value: 410 },
  { x: 21, y: 2.4, value: 150 },
  { x: 14, y: 6.8, value: 90 },
  { x: 30, y: 4.0, value: 280 },
];
const teamNames = ["영업", "구매", "재무", "인사", "총무"];
const teamLegend = Object.fromEntries(teamNames.map((name, i) => [String(i), { label: name }]));

const oneColor = teams.map((row) => ({ ...row, color: "var(--ec-chart-1)" }));
const labeled = teams.map((row, i) => ({ ...row, label: teamNames[i], color: "var(--ec-chart-7)" }));

const groups = [
  { x: 48, y: 3.2, value: 620, color: "var(--ec-chart-1)" },
  { x: 36, y: 5.1, value: 410, color: "var(--ec-chart-1)" },
  { x: 30, y: 4.0, value: 280, color: "var(--ec-chart-1)" },
  { x: 21, y: 2.4, value: 150, color: "var(--ec-chart-2)" },
  { x: 14, y: 6.8, value: 90, color: "var(--ec-chart-2)" },
  { x: 26, y: 5.6, value: 200, color: "var(--ec-chart-2)" },
];
const outlier = [
  { x: 48, y: 3.2, value: 9800 },
  { x: 36, y: 5.1, value: 41 },
  { x: 21, y: 2.4, value: 15 },
  { x: 14, y: 6.8, value: 3 },
];
const withZero = [
  { x: 0, y: 0, value: 0 },
  { x: 36, y: 5.1, value: 410 },
  { x: 21, y: 2.4, value: 150 },
];
const crowded = Array.from({ length: 28 }, (_, i) => ({ x: 10 + ((i * 7) % 40), y: 2 + ((i * 3) % 6) + (i % 2) * 0.4, value: 60 + ((i * 53) % 500) }));

const days = (v) => `${v}일`;

/** 버블 위 이름표는 글자 폭을 재야 해서 브라우저에서만 그려집니다. */
function BrowserOnly({ children }) {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => setReady(true), []);
  return ready ? children : null;
}

export default function BubbleChartPage() {
  return (
    <Page meta={meta} lead="가로 위치, 세로 위치, 원의 크기로 세 가지 값을 한꺼번에 보여 주는 차트입니다. 색까지 쓰면 네 가지를 담을 수 있습니다. 값들 사이의 관계와 무리를 찾을 때 씁니다.">
      <Section title="언제 쓰는가">
        <Demo caption="부서별 담당 문서 수(가로, 건) · 평균 처리 기간(세로, 일) · 금액(원의 크기, 백만 원)" column>
          <Chart.Bubble data={teams} legendProps={{ legendMap: teamLegend }} axisYValueFormatter={days} plotWidth={560} plotHeight={300} aria-label="부서별 담당 문서 수와 처리 기간, 금액" />
        </Demo>
        <Rules
          items={[
            "두 값의 관계(많이 맡을수록 오래 걸리는가)에 세 번째 값(금액)을 더해 볼 때 씁니다.",
            "산점도에 크기를 더한 차트입니다. 세 번째 값이 없으면 산점도를 씁니다.",
            "원의 크기와 색으로 값을 나타내므로 정확한 비교에는 맞지 않습니다. 정확한 값은 표로 함께 보여 줍니다.",
            "색으로 나누는 묶음은 3~4가지까지입니다. 그보다 많으면 어지러워 무리가 보이지 않습니다.",
            "작은 카드에는 넣지 않습니다. 원이 겹쳐 읽을 수 없습니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Table
          head={["요소", "규칙"]}
          rows={[
            ["보조선", "가로·세로 보조선을 모두 둡니다. 원의 위치를 두 축에서 읽어야 하기 때문입니다."],
            ["축 이름", "가로축과 세로축 모두 무엇의 값이고 단위가 무엇인지 적습니다. 차트 제목이나 설명에 적어도 됩니다."],
            ["크기의 뜻", "원의 크기가 무엇을 나타내는지 차트 가까이에 반드시 적습니다."],
            ["범례", "원의 색이 여러 가지면 색마다 무엇인지 범례로 알립니다."],
          ]}
        />
        <Rules
          items={[
            <>데이터는 <Code>x</Code>, <Code>y</Code>, <Code>value</Code>가 든 객체의 배열입니다. <Code>value</Code>가 원의 크기가 됩니다. 이름표는 <Code>label</Code>, 색은 <Code>color</Code>로 줍니다.</>,
            "축 이름에 색을 입히지 않습니다. 축의 글자는 글자색만 씁니다.",
            "원의 크기는 넓이가 값에 비례하게 그려집니다. 지름으로 값을 견주게 하는 설명을 쓰지 않습니다.",
          ]}
        />
      </Section>

      <Section title="색">
        <Demo caption="묶음이 하나 — 한 가지 색" column>
          <Chart.Bubble data={oneColor} showLegend={false} axisYValueFormatter={days} plotWidth={480} plotHeight={240} aria-label="한 가지 색으로 그린 버블 차트" />
        </Demo>
        <Demo caption="묶음이 여럿 — 묶음마다 색 (파랑: 본사, 청록: 지사)" column>
          <Chart.Bubble data={groups} showLegend={false} axisYValueFormatter={days} plotWidth={480} plotHeight={240} aria-label="묶음마다 색을 달리한 버블 차트" />
        </Demo>
        <Table
          head={["요소", "모양"]}
          rows={[
            ["원의 채움", "계열 색을 50% 진하기로. 겹친 원이 비쳐 보입니다."],
            ["원의 테두리", "흰색 2px. 겹친 원의 경계를 가릅니다."],
            ["원의 중심", "원과 같은 색의 십자 표시. 정확한 위치를 알려 줍니다."],
          ]}
        />
        <Rules
          items={[
            <>묶음이 하나면 <Code>--ec-chart-1</Code> 한 가지 색으로 칠합니다.</>,
            "묶음이 여럿이면 묶음마다 차트 색을 번호 순서대로 씁니다.",
            <><Code>color</Code>를 주지 않으면 원마다 다른 색이 순서대로 칠해집니다. 원 하나하나가 서로 다른 대상이고 그 수가 6개 이하일 때만 그렇게 둡니다.</>,
            "연한 단계의 색(13~18번)은 쓰지 않습니다. 반투명으로 칠하면 흰 바탕과 구분되지 않습니다. 기본 단계나 진한 단계를 씁니다.",
          ]}
        />
      </Section>

      <Section title="이름표">
        <Demo caption="원 옆의 이름표 (label)" column>
          <BrowserOnly>
            <Chart.Bubble data={labeled} showLegend={false} axisYValueFormatter={days} plotWidth={480} plotHeight={260} aria-label="이름표를 붙인 버블 차트" />
          </BrowserOnly>
        </Demo>
        <Rules
          items={[
            "이름표는 아껴 씁니다. 원이 많은 차트에서는 이름표끼리 겹쳐 오히려 읽기 어렵습니다.",
            "원이 열 개 안쪽일 때, 또는 눈여겨볼 몇 개에만 붙입니다. 나머지는 설명 상자로 알립니다.",
            "이름표의 글자와 바탕의 대비를 확인합니다. 이름표를 쓰는 차트에는 진한 단계의 색을 씁니다.",
            <>이름표는 글자 폭을 재서 놓을 자리를 정하므로 브라우저에서만 그려집니다. 서버에서 먼저 그리는 화면에서는 <Code>label</Code>이 든 차트를 브라우저에서 그리게 합니다.</>,
          ]}
        />
      </Section>

      <Section title="범례">
        <Rules
          items={[
            "색이 여러 가지면 범례를 둡니다. 항목마다 무엇인지 분명한 이름을 적습니다.",
            "범례는 세로로 늘어놓는 것이 좋습니다. 이름과 값을 위아래로 견주기 쉽습니다.",
            <>이름표 없이 범례에만 이름을 보이려면 <Code>legendProps.legendMap</Code>에 데이터 순번(0, 1, 2…)별로 <Code>label</Code>을 적습니다.</>,
            "버블 차트의 범례는 끌 수 없는 동그라미 모양입니다.",
            "값이 0이거나 없는 항목도 범례에는 남겨 그 사실을 알립니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "원에 마우스를 올리면 채움이 80% 진하기로 짙어지고 설명 상자가 나옵니다.",
            "설명 상자에는 가로축 값, 세로축 값, 크기를 정한 값을 모두 보여 줍니다. 값마다 이름과 단위를 붙입니다. 축마다 단위가 다르기 때문입니다.",
            "묶음이 여럿이면 설명 상자에 그 원의 묶음 이름과 색을 함께 보여 줍니다.",
            "원이 겹친 자리에서는 마우스를 올린 원 하나의 값만 보여 줍니다. 겹친 원들의 값을 한꺼번에 보여 주지 않습니다.",
            <>원을 누를 수 있게 하려면 <Code>onClickBubble</Code>을 씁니다. 누를 수 있는 원은 마우스 커서가 손 모양으로 바뀝니다.</>,
            "간편 차트의 설명 상자는 항목 이름이 영문(X axis, Y axis, Value)으로 나옵니다. 사용자에게 보여 주는 화면에서는 조립 차트로 설명 상자의 글자를 우리말로 바꿉니다.",
          ]}
        />
      </Section>

      <Section title="예외 상황">
        <Sub title="값의 차이가 아주 클 때">
          <Demo column>
            <Chart.Bubble data={outlier} showLegend={false} axisYValueFormatter={days} plotWidth={480} plotHeight={240} aria-label="크기 차이가 큰 버블 차트" />
          </Demo>
          <P>큰 원에 가려 작은 값이 사라지지 않게, 원은 아무리 작아도 지름 11px로 그립니다.</P>
        </Sub>
        <Sub title="값이 0일 때">
          <Demo column>
            <Chart.Bubble data={withZero} showLegend={false} axisYValueFormatter={days} plotWidth={480} plotHeight={220} aria-label="값이 0인 원이 있는 버블 차트" />
          </Demo>
          <P>0은 데이터입니다. 두 축의 값이 모두 0인 원은 축이 만나는 자리에 그립니다. 범례에도 0으로 적습니다.</P>
        </Sub>
        <Sub title="값이 없을 때">
          <P>값이 없는 대상은 차트에 그리지 않습니다. 범례에는 항목을 남기고 "값 없음"이라고 적어 빠진 것이 있음을 알립니다.</P>
        </Sub>
        <Sub title="원이 축 가까이에 있을 때">
          <P>원이 축이나 차트 가장자리에 걸리면 잘리지 않도록 축의 범위가 자동으로 넓어집니다. 축의 범위를 직접 정할 때도 가장 큰 원의 반지름만큼 여유를 둡니다.</P>
        </Sub>
        <Sub title="처음 불러올 때">
          <Demo>
            <Box w={320}>
              <Skeleton h={180}>
                <BubbleChartSkeleton />
              </Skeleton>
            </Box>
          </Demo>
          <P>
            처음 불러오는 동안에는 <Code>BubbleChartSkeleton</Code>을 보여 줍니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다. 그 밖의 빈 상태는 차트 기본 구조의 빈 상태 규칙을 따릅니다.
          </P>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <Chart.Bubble data={oneColor} showLegend={false} plotWidth={260} plotHeight={200} aria-label="원이 다섯인 버블 차트" />,
            text: "원의 수와 묶음의 수를 줄여 무리가 보이게 합니다. 차트는 넉넉한 크기로 그립니다.",
          }}
          bad={{
            demo: <Chart.Bubble data={crowded} showLegend={false} plotWidth={260} plotHeight={200} aria-label="원이 지나치게 많은 버블 차트" />,
            text: "작은 자리에 많은 원을 색색으로 넣지 않습니다. 겹쳐서 아무것도 읽을 수 없습니다.",
          }}
        />
        <DoDont
          good={{ text: "차트 설명에 \"원의 크기는 금액입니다\"처럼 크기의 뜻을 적습니다. 두 축의 이름과 단위도 적습니다." }}
          bad={{ text: "크기가 무엇인지 알리지 않은 채 원만 그리지 않습니다. 축 이름에 계열 색을 입히지도 않습니다." }}
        />
      </Section>
    </Page>
  );
}

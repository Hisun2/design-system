import React from "react";
import { Chart } from "@ec21rnc/ui/chart";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code, Swatch } from "../../kit.jsx";

export const meta = { title: "차트 색", order: 3 };

const chip = (n) => (
  <>
    <Swatch token={`chart-${n}`} /> <Code>{`--ec-chart-${n}`}</Code>
  </>
);
const step = (name, from) => [name, ...[0, 1, 2, 3, 4, 5].map((i) => chip(from + i))];
const gray = (token, text) => (
  <>
    <Swatch token={token} /> <Code>{`--ec-${token}`}</Code> {text}
  </>
);

const quarters = [
  { 분기: "1분기", 계약서: 120, 견적서: 80, 보고서: 60 },
  { 분기: "2분기", 계약서: 150, 견적서: 70, 보고서: 90 },
  { 분기: "3분기", 계약서: 170, 견적서: 95, 보고서: 75 },
];
const status = [
  { 분기: "1분기", 승인: 210, 반려: 32 },
  { 분기: "2분기", 승인: 250, 반려: 41 },
  { 분기: "3분기", 승인: 290, 반려: 28 },
];
const withOther = { 계약서: 38, 견적서: 22, 보고서: 14, 영수증: 10, 기타: 16 };
const teams = [
  { 부서: "영업", 건수: 48 },
  { 부서: "구매", 건수: 36 },
  { 부서: "재무", 건수: 21 },
  { 부서: "인사", 건수: 14 },
];

export default function ChartColorPage() {
  return (
    <Page meta={meta} lead="차트의 데이터에 쓰는 색입니다. 24가지 색을 정해 두고 번호 순서대로 씁니다. 화면에서 색을 쓸 수 있는 세 곳(누를 수 있는 것, 상태, 데이터) 가운데 데이터에 해당합니다.">
      <Section title="원칙">
        <Rules
          items={[
            "색은 계열을 구분하는 데만 씁니다. 꾸미려고 색을 더하지 않습니다.",
            "이유 없이 눈에 띄는 색을 쓰지 않습니다. 가장 중요한 계열이 가장 먼저 보여야 합니다.",
            "같은 대상은 같은 색입니다. 한 화면의 여러 차트에 같은 계열이 나오면 모두 같은 색으로 칠합니다.",
            "초록과 빨강은 좋음과 나쁨, 증가와 감소로 읽힙니다. 그런 뜻이 없는 계열에는 쓰지 않습니다.",
            "빨강은 삭제와 오류에 쓰는 색입니다. 차트에서는 문제를 나타내는 계열에만 조심해서 씁니다.",
            "색만으로 뜻을 전하지 않습니다. 범례, 이름표, 설명 상자에 계열 이름을 함께 적습니다.",
          ]}
        />
      </Section>

      <Section title="24가지 색">
        <Table
          head={["단계", "파랑", "청록", "보라", "주황", "분홍", "노랑"]}
          rows={[step("기본 (1~6)", 1), step("진한 (7~12)", 7), step("연한 (13~18)", 13), step("가장 진한 (19~24)", 19)]}
        />
        <Rules
          items={[
            <>색은 <Code>--ec-chart-1</Code>부터 <Code>--ec-chart-24</Code>까지 번호 순서대로 씁니다. 첫 계열이 1번, 둘째 계열이 2번입니다.</>,
            "차트 컴포넌트가 데이터의 계열 순서대로 자동으로 칠합니다. 따로 색을 정하지 않아도 이 순서를 따릅니다.",
            "1~6번이 기본입니다. 대부분의 차트는 이 여섯 색으로 끝나야 합니다.",
            "7~12번은 기본 색의 진한 단계, 13~18번은 연한 단계, 19~24번은 가장 진한 단계입니다. 같은 열의 색은 색상이 같고 밝기만 다릅니다.",
            "중간 번호를 건너뛰거나 마음에 드는 색을 골라 쓰지 않습니다. 순서를 지켜야 이웃한 계열이 잘 구분됩니다.",
            "이 24가지 밖의 색을 만들어 쓰지 않습니다.",
          ]}
        />
        <Demo caption="계열 순서대로 1, 2, 3번 색이 칠해집니다" column>
          <Chart.Bar data={quarters} groupKey="분기" plotWidth={480} plotHeight={200} aria-label="분기별 문서 유형별 건수" />
        </Demo>
      </Section>

      <Section title="계열 수">
        <Table
          head={["계열 수", "쓰는 색", "하는 일"]}
          rows={[
            ["1개", "1번", "색 하나로 그립니다. 범례를 두지 않습니다."],
            ["2~6개", "1~6번을 순서대로", "기본입니다."],
            ["7개 이상", "쓰지 않는 것이 원칙", "차트를 나누거나, 작은 계열을 \"기타\"로 묶어 6개 이하로 줄입니다."],
            ["7~24개 (어쩔 수 없을 때)", "7번부터 순서대로 이어서", "범례에서 골라 보게 하고, 처음에는 중요한 계열만 켜 둡니다."],
          ]}
        />
        <Demo caption="항목이 많으면 큰 것 넷과 &quot;기타&quot;로 묶습니다. 기타는 회색입니다.">
          <Chart.Donut data={withOther} colorMap={{ 기타: "var(--ec-chart-other)" }} plotWidth={180} plotHeight={180} aria-label="문서 유형별 비중" />
        </Demo>
        <Rules
          items={[
            "한 차트에서 색으로 구분하는 계열은 6개까지입니다. 일곱 번째 색부터는 앞의 색과 헷갈리기 시작합니다.",
            "6개를 넘으면 먼저 차트를 나눌 수 있는지 봅니다. 나눌 수 없으면 값이 작은 계열을 \"기타\"로 묶습니다.",
            "\"기타\"는 항상 맨 끝에 두고 회색으로 칠합니다.",
            "24개를 넘는 계열은 색으로 구분하지 않습니다. 표로 보여 주거나 상위 몇 개만 차트로 그립니다.",
          ]}
        />
      </Section>

      <Section title="뜻이 정해진 색">
        <Table
          head={["쓰임", "색", "설명"]}
          rows={[
            ["합계·전체", gray("gray-600", ""), "계열을 모두 더한 값의 선이나 막대"],
            ["기타", gray("gray-400", ""), "작은 계열을 묶은 것, 나머지"],
            ["값 없음", gray("gray-200", ""), "아직 모르는 값, 비어 있는 자리(도넛 차트의 빈 고리 등)"],
          ]}
        />
        <Rules
          items={[
            "합계, 기타, 값 없음은 데이터 계열이 아니므로 차트 색 번호를 쓰지 않고 회색을 씁니다.",
            <>색을 직접 정할 때는 <Code>colorMap</Code>에 계열 이름과 토큰을 적습니다. 예: <Code>{'colorMap={{ 기타: "var(--ec-chart-other)" }}'}</Code></>,
          ]}
        />
      </Section>

      <Section title="상태를 나타내는 색">
        <Demo caption="승인은 초록, 반려는 빨강 — 계열이 곧 상태일 때만" column>
          <Chart.Bar
            data={status}
            groupKey="분기"
            type="stack"
            colorMap={{ 승인: "var(--ec-control-primary-success)", 반려: "var(--ec-control-primary-critical)" }}
            plotWidth={480}
            plotHeight={200}
            aria-label="분기별 승인·반려 건수"
          />
        </Demo>
        <Table
          head={["상태", "색", "토큰"]}
          rows={[
            ["끝났고 문제없음 (승인, 완료)", <Swatch token="control-primary-success" />, <Code>--ec-control-primary-success</Code>],
            ["진행 중", <Swatch token="control-primary-info" />, <Code>--ec-control-primary-info</Code>],
            ["사람이 봐야 함 (보류, 지연)", <Swatch token="chart-6" />, <Code>--ec-chart-6</Code>],
            ["문제 있음 (반려, 오류)", <Swatch token="control-primary-critical" />, <Code>--ec-control-primary-critical</Code>],
            ["검토", <Swatch token="chart-3" />, <Code>--ec-chart-3</Code>],
            ["시작 전", <Swatch token="chart-other" />, <Code>--ec-chart-other</Code>],
          ]}
        />
        <Rules
          items={[
            "계열 자체가 상태(승인·반려, 정상·오류)일 때만 상태 색을 씁니다. 이때는 번호 순서 대신 상태의 뜻에 맞는 색을 씁니다.",
            "상태가 아닌 계열(부서, 문서 유형)에는 상태 색을 쓰지 않습니다. 빨간 막대는 문제가 있다는 뜻으로 읽힙니다.",
            "한 차트에 상태 색과 번호 색을 섞지 않습니다.",
            "표나 목록에서 상태를 나타낼 때는 차트 색이 아니라 StatusTag를 씁니다.",
          ]}
        />
      </Section>

      <Section title="한 가지 색의 단계로 칠하기">
        <Demo caption="같은 열의 색(연한 → 기본 → 진한 → 가장 진한)으로 크기 순서를 나타냅니다" column>
          <Chart.Bar
            data={[{ 구분: "처리 기간", "3일 이내": 42, "7일 이내": 31, "14일 이내": 18, "14일 초과": 9 }]}
            groupKey="구분"
            type="stack"
            invertAxis
            colorMap={{ "3일 이내": "var(--ec-chart-13)", "7일 이내": "var(--ec-chart-1)", "14일 이내": "var(--ec-chart-7)", "14일 초과": "var(--ec-chart-19)" }}
            plotWidth={480}
            plotHeight={120}
            aria-label="처리 기간별 문서 비중"
          />
        </Demo>
        <Rules
          items={[
            "계열에 순서가 있으면(적음→많음, 짧음→김) 여러 색 대신 한 색의 밝기 단계로 칠합니다.",
            "단계는 연한(13~18) → 기본(1~6) → 진한(7~12) → 가장 진한(19~24) 순서이고, 한 색에 네 단계까지 있습니다.",
            "값이 클수록 진하게 칠합니다. 반대로 칠하지 않습니다.",
            "단계가 넷을 넘으면 구간을 합쳐 넷 이하로 줄입니다.",
          ]}
        />
      </Section>

      <Section title="글자와 선의 색">
        <Table
          head={["요소", "토큰"]}
          rows={[
            ["차트 제목, 항목 이름, 범례 글자, 값", <Code>--ec-text-primary</Code>],
            ["축 눈금 숫자, 설명, 단위", <Code>--ec-text-secondary</Code>],
            ["보조선, 축 선", "연한 회색. 컴포넌트가 정해 둔 색을 그대로 씁니다."],
          ]}
        />
        <P>축 이름이나 눈금에 계열 색을 입히지 않습니다. 글자는 글자색만 씁니다.</P>
      </Section>

      <Section title="색을 못 보는 사람도 읽을 수 있게">
        <Demo caption="무늬 채움 (patterns) — 색 없이도 계열이 구분됩니다" column>
          <Chart.Bar data={quarters} groupKey="분기" patterns plotWidth={480} plotHeight={200} aria-label="무늬로 구분한 분기별 문서 유형별 건수" />
        </Demo>
        <Rules
          items={[
            "색만으로 계열을 구분하지 않습니다. 범례의 이름, 설명 상자의 이름, 차트 위 이름표 가운데 하나는 반드시 있어야 합니다.",
            <>색 구분이 어려운 사용자를 위해 <Code>patterns</Code>로 막대와 영역에 무늬를 넣을 수 있습니다. 선은 점 모양과 선 모양이 달라집니다.</>,
            "연한 단계(13~18)는 흰 바탕과 대비가 낮습니다. 얇은 선, 작은 점, 글자가 올라가는 자리에는 쓰지 않습니다.",
            "차트 색 위에 글자를 올릴 때는 대비가 4.5:1 이상인지 확인합니다. 넘지 못하면 글자를 도형 밖에 둡니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <Chart.Bar data={teams} groupKey="부서" plotWidth={260} plotHeight={160} aria-label="한 가지 색으로 그린 부서별 건수" />,
            text: "계열이 하나면 모든 막대를 1번 색 하나로 칠합니다.",
          }}
          bad={{
            demo: (
              <Chart.Bar
                data={[{ 구분: "건수", 영업: 48, 구매: 36, 재무: 21, 인사: 14 }]}
                groupKey="구분"
                showLegend={false}
                plotWidth={260}
                plotHeight={160}
                aria-label="막대마다 색이 다른 부서별 건수"
              />
            ),
            text: "같은 계열의 막대를 막대마다 다른 색으로 칠하지 않습니다. 색에 뜻이 있는 것처럼 보입니다.",
          }}
        />
        <DoDont
          good={{ text: "같은 화면의 다른 차트에서도 \"계약서\"는 항상 같은 색입니다." }}
          bad={{ text: "차트마다 자동 순서에 맡겨 같은 계열이 다른 색으로 나오게 두지 않습니다. 계열 순서를 맞추거나 colorMap으로 고정합니다." }}
        />
      </Section>
    </Page>
  );
}

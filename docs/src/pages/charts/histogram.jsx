import React from "react";
import { Chart } from "@ec21rnc/ui/chart";
import { HistogramChartSkeleton, Box } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "히스토그램", order: 20 };

// 처리 기간(일) 구간별 문서 수
const days = [
  { 구간: "1~2일", 문서: 42 },
  { 구간: "3~4일", 문서: 68 },
  { 구간: "5~6일", 문서: 51 },
  { 구간: "7~8일", 문서: 24 },
  { 구간: "9~10일", 문서: 9 },
];
const one = [{ 구간: "1~2일", 문서: 42 }];
const zeros = days.map((d) => ({ 구간: d.구간, 문서: 0 }));
const skewed = [
  { 구간: "1~2일", 문서: 1200 },
  { 구간: "3~4일", 문서: 85 },
  { 구간: "5~6일", 문서: 12 },
  { 구간: "7~8일", 문서: 3 },
];

export default function HistogramPage() {
  return (
    <Page meta={meta} lead="숫자 데이터를 구간으로 나누고, 구간마다 몇 건이 들어 있는지 막대 길이로 보여 주는 차트입니다. 값이 어디에 몰려 있는지 볼 때 씁니다.">
      <Section title="기본 모양">
        <Demo caption="처리 기간 구간별 문서 수" column>
          <Chart.Histogram data={days} groupKey="구간" plotWidth={560} plotHeight={220} showLegend={false} aria-label="처리 기간 구간별 문서 수" />
        </Demo>
        <Rules
          items={[
            "세로축은 반드시 0에서 시작합니다.",
            "차트 제목만 읽어도 두 축이 무엇인지 알 수 있어야 합니다. 제목으로 부족하면 축 이름을 붙입니다.",
            "막대는 한 가지 색 또는 같은 계열의 색만 씁니다.",
            "구간 이름이 길거나 구간 수가 많으면 가로 방향 히스토그램을 씁니다.",
          ]}
        />
      </Section>

      <Section title="막대 차트와의 구분">
        <Table
          head={["", "히스토그램", "막대 차트"]}
          rows={[
            ["다루는 데이터", "숫자의 분포. 막대 하나가 숫자 구간(예: 처리 기간 1~2일)입니다.", "이름으로 나뉘는 항목의 비교. 막대 하나가 항목(예: 부서, 거래처 유형)입니다."],
            ["막대 길이의 뜻", "그 구간에 들어가는 값의 개수", "그 항목의 값"],
            ["막대 사이", "이어진 구간이므로 간격을 좁게 둡니다.", "서로 다른 항목임이 보이도록 간격을 넓게 둡니다."],
            ["순서", "구간의 순서대로. 바꿀 수 없습니다.", "크기순 등으로 바꿀 수 있습니다."],
          ]}
        />
      </Section>

      <Section title="색">
        <Rules
          items={[
            <>기본은 모든 막대가 같은 색입니다. 첫 번째 차트 색 <Code>--ec-chart-1</Code>을 씁니다.</>,
            "막대마다 색을 달리하는 것은 그 색이 데이터를 이해하는 데 도움이 될 때뿐입니다.",
            <>계열이 둘 이상이면 <Code>--ec-chart-1</Code>부터 번호 순서대로 씁니다. 컴포넌트가 자동으로 그렇게 칠합니다.</>,
          ]}
        />
      </Section>

      <Section title="막대 순서">
        <Rules
          items={[
            "구간은 뜻이 통하는 순서로 놓습니다. 작은 구간에서 큰 구간으로, 날짜라면 이른 달에서 늦은 달로 놓습니다.",
            "막대 길이순으로 다시 줄 세우지 않습니다. 구간의 순서가 깨지면 분포를 읽을 수 없습니다.",
          ]}
        />
      </Section>

      <Section title="튀는 값 다루기">
        <Demo caption="한 구간만 값이 매우 큰 경우 — 작은 막대도 최소 높이로 보입니다" column>
          <Chart.Histogram data={skewed} groupKey="구간" plotWidth={560} plotHeight={200} showLegend={false} aria-label="값 차이가 큰 히스토그램" />
        </Demo>
        <Rules
          items={[
            "값의 차이가 아주 크면 큰 막대만 눈에 들어오고 나머지는 없는 것처럼 보입니다.",
            "막대는 값이 아무리 작아도 2px 이상의 높이로 그립니다. 큰 값 옆에서도 있다는 것이 보여야 합니다.",
            "차이가 너무 커서 비교가 안 되면 로그 눈금을 쓰거나, 튀는 값을 따로 떼어 보여 줍니다. 방법은 막대 차트의 튀는 값 규칙과 같습니다.",
            "로그 눈금을 썼으면 차트 제목이나 축 이름에 그 사실을 적습니다.",
          ]}
        />
      </Section>

      <Section title="범례와 축">
        <Rules
          items={[
            "계열이 하나인 히스토그램에는 범례를 두지 않습니다. 차트 제목을 분명하게 쓰고, 필요하면 축 이름을 붙입니다.",
            <>축 글자색은 <Code>--ec-text-secondary</Code>, 눈금선은 <Code>--ec-border</Code>입니다.</>,
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "막대에 마우스를 올리면 그 막대가 놓인 세로 칸 전체가 옅은 회색으로 강조되고, 구간 이름과 값이 설명 상자에 나옵니다.",
            "막대를 눌러 다른 화면으로 갈 수 있다면 마우스 모양을 손가락으로 바꿉니다.",
            "추세선을 함께 그렸다면 마우스를 올린 구간에 해당하는 추세선의 점도 함께 표시합니다.",
          ]}
        />
      </Section>

      <Section title="예외 상황">
        <Sub title="구간이 하나뿐일 때">
          <Demo column>
            <Chart.Histogram data={one} groupKey="구간" plotWidth={320} plotHeight={180} showLegend={false} aria-label="구간이 하나인 히스토그램" />
          </Demo>
          <P>막대 하나만 그립니다. 빈 구간을 지어내 채우지 않습니다.</P>
        </Sub>
        <Sub title="값이 모두 0일 때">
          <Demo column>
            <Chart.Histogram data={zeros} groupKey="구간" plotWidth={560} plotHeight={180} showLegend={false} aria-label="값이 모두 0인 히스토그램" />
          </Demo>
          <P>0은 데이터입니다. "값 없음"과 다릅니다. 막대는 보이지 않지만 설명 상자에는 0을 적습니다.</P>
        </Sub>
        <Sub title="데이터가 없는 구간">
          <Rules
            items={[
              "값이 없는 구간에는 막대를 그리지 않습니다.",
              "그 구간에 마우스를 올리면 설명 상자에 \"값 없음\"이라고 적습니다.",
              "왜 값이 없는지, 언제 볼 수 있는지 알 수 있으면 차트 가까이에 한 줄로 적습니다.",
            ]}
          />
        </Sub>
        <Sub title="처음 불러올 때">
          <Demo>
            <Box w={320}>
              <HistogramChartSkeleton h={160} />
            </Box>
          </Demo>
          <P>
            처음 불러오는 동안에는 차트 자리에 <Code>HistogramChartSkeleton</Code>을 보여 줍니다. 차트 제목이 있으면 제목은 먼저 보여 주어 무엇을 불러오는지 알립니다.
          </P>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "세로축을 0에서 시작합니다. 막대 길이의 비율이 실제 값의 비율과 같아야 합니다." }}
          bad={{ text: "세로축을 중간값에서 시작하지 않습니다. 실제로는 조금 다른 두 값이 두 배 차이처럼 보입니다." }}
        />
        <DoDont
          good={{ text: "구간의 폭을 모두 같게 나눕니다(1~2일, 3~4일, 5~6일)." }}
          bad={{ text: "구간을 길이순으로 다시 정렬하거나, 폭이 서로 다른 구간을 섞지 않습니다." }}
        />
      </Section>
    </Page>
  );
}

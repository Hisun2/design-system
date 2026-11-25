import React from "react";
import { Chart } from "@ec21rnc/ui/chart";
import { VennChartSkeleton, Box } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "벤 다이어그램", order: 26 };

const two = { "국내 거래처": 180, "해외 거래처": 120, "국내 거래처/해외 거래처": 45 };
const three = {
  계약: 160,
  견적: 120,
  발주: 90,
  "계약/견적": 50,
  "계약/발주": 35,
  "견적/발주": 30,
  "계약/견적/발주": 12,
};
const tiny = { "전체 문서": 400, "반려 문서": 2, "전체 문서/반려 문서": 2 };
const inside = { "전체 문서": 300, "승인 문서": 120, "전체 문서/승인 문서": 120 };
const withZero = { "국내 거래처": 180, "해외 거래처": 0 };

// Chart.Venn은 범례를 오른쪽 끝에 붙입니다. 차트와 범례를 왼쪽에 모으려면 justifyContent="flex-end"를 줍니다.
const left = { justifyContent: "flex-end" };

export default function VennPage() {
  return (
    <Page meta={meta} lead="여러 집합이 서로 얼마나 겹치는지 원으로 보여 주는 차트입니다. 원 하나가 집합 하나이고, 원이 겹친 부분이 양쪽에 모두 속하는 것입니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "집합 사이의 관계와 차이를 보여 줄 때.",
            "집합끼리 공통으로 가진 것이 얼마나 되는지 견줄 때.",
            "\"가 또는 나\", \"가이면서 나\" 같은 조건의 범위를 그림으로 설명할 때.",
            "집합은 셋까지입니다. 넷 이상이면 겹친 부분이 너무 많아 읽을 수 없습니다. 그럴 때는 표나 막대 차트를 씁니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Demo caption="집합 둘">
          <Chart.Venn {...left} data={two} plotWidth={260} plotHeight={220} aria-label="국내 거래처와 해외 거래처의 겹침" />
        </Demo>
        <Demo caption="집합 셋">
          <Chart.Venn {...left} data={three} plotWidth={280} plotHeight={260} aria-label="계약, 견적, 발주 문서가 있는 거래처의 겹침" />
        </Demo>
        <Table
          head={["요소", "규칙"]}
          rows={[
            ["원", "집합 하나. 크기가 그 집합의 값에 비례합니다."],
            ["겹친 부분", "양쪽 집합에 모두 속하는 것. 넓이가 공통 값에 비례합니다."],
            ["칠", "원의 색, 불투명도 50%. 겹친 곳은 색이 섞여 진하게 보입니다."],
            ["테두리", "원과 같은 색, 2px"],
          ]}
        />
        <P>
          데이터는 집합 이름과 값을 짝지어 줍니다. 겹친 부분은 집합 이름을 빗금으로 이어 적습니다. 예: <Code>{`{ 계약: 160, 견적: 120, "계약/견적": 50 }`}</Code>
        </P>
      </Section>

      <Section title="색">
        <Rules
          items={[
            <>원의 색은 <Code>--ec-chart-1</Code>부터 번호 순서대로 씁니다. 컴포넌트가 자동으로 칠합니다.</>,
            "겹친 부분에 따로 색을 정하지 않습니다. 반투명한 두 색이 겹쳐 만들어지는 색을 그대로 씁니다.",
            <>값이 없어 빈 원을 그릴 때는 회색(<Code>--ec-border</Code>)을 씁니다.</>,
          ]}
        />
      </Section>

      <Section title="크기">
        <Rules
          items={[
            "차트 영역은 가로세로 180px 이상, 300px 이하로 합니다.",
            "180px보다 작게 만들지 않습니다. 겹친 부분이 너무 작아져 보이지 않습니다.",
            "300px보다 크게 만들지 않습니다. 원 두세 개가 화면을 지나치게 차지합니다.",
          ]}
        />
      </Section>

      <Section title="범례">
        <Rules
          items={[
            "범례를 반드시 두고, 집합 이름 옆에 값을 함께 적습니다. 원의 크기만으로는 값을 알 수 없습니다.",
            "위젯 폭이 400px보다 넓으면 범례를 차트 오른쪽에 세로로 둡니다. 차트의 위쪽 끝에 맞춥니다.",
            "위젯 폭이 400px보다 좁으면 범례를 차트 아래에 둡니다. 차트와의 간격은 24px입니다.",
            "범례는 차트에서 20px 이상 떨어뜨리지 않습니다.",
            "범례 항목을 가로로 나열할 때 항목 사이 간격은 16px입니다.",
            <>집합 이름과 설명 글자색은 <Code>--ec-text-secondary</Code>입니다.</>,
            "이름이 길면 자르지 않고 다음 줄로 넘깁니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Table
          head={["상태", "모양"]}
          rows={[
            ["기본", "칠 불투명도 50%, 테두리 2px"],
            ["마우스 올림", "마우스가 올라간 원 또는 겹친 부분의 칠이 70%로 진해집니다."],
          ]}
        />
        <Sub title="설명 상자">
          <Table
            head={["마우스를 올린 곳", "설명 상자 내용"]}
            rows={[
              ["원(집합)", "집합 이름과 값"],
              ["겹친 부분", "겹친 비율(%)과 값. 그 아래에 겹친 집합들의 이름과 값을 나열합니다."],
            ]}
          />
          <P>
            원을 눌렀을 때 할 일이 있으면 <Code>onClickVennItem</Code>을 씁니다.
          </P>
        </Sub>
      </Section>

      <Section title="예외 상황">
        <Sub title="값이 전체의 1%보다 작을 때">
          <Demo>
            <Chart.Venn {...left} data={tiny} plotWidth={220} plotHeight={200} aria-label="아주 작은 집합이 있는 벤 다이어그램" />
          </Demo>
          <P>원이 사라지지 않게 가장 작은 크기(지름 12px)로 그립니다. 정확한 값은 범례가 전합니다.</P>
        </Sub>
        <Sub title="한 집합이 다른 집합에 완전히 들어갈 때">
          <Demo>
            <Chart.Venn {...left} data={inside} plotWidth={220} plotHeight={200} aria-label="한 집합이 다른 집합에 완전히 포함된 벤 다이어그램" />
          </Demo>
          <P>작은 원을 큰 원 안쪽 가장자리에 붙여 그립니다.</P>
        </Sub>
        <Sub title="값이 0일 때">
          <Demo>
            <Chart.Venn {...left} data={withZero} plotWidth={220} plotHeight={200} aria-label="값이 0인 집합이 있는 벤 다이어그램" />
          </Demo>
          <Rules
            items={[
              "값이 0인 집합은 원을 그리지 않습니다. 범례에는 남기고 값 0을 적습니다. 0은 데이터입니다.",
              "모든 집합이 0이면 회색 원 하나를 그립니다.",
            ]}
          />
        </Sub>
        <Sub title="값이 없을 때">
          <Rules
            items={[
              "값을 알 수 없는 집합은 차트에서 빼고, 범례에 \"값 없음\"으로 적습니다.",
              "모든 집합의 값을 알 수 없으면 회색 원 하나를 그립니다.",
            ]}
          />
        </Sub>
        <Sub title="처음 불러올 때">
          <Demo>
            <Box w={240}>
              <VennChartSkeleton h={180} />
            </Box>
          </Demo>
          <P>
            처음 불러오는 동안에는 <Code>VennChartSkeleton</Code>을 보여 줍니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다. 오류 같은 그 밖의 빈 상태는 위젯 빈 상태 규칙을 따릅니다.
          </P>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "집합은 둘 또는 셋만 그리고, 범례에 값을 적습니다." }}
          bad={{ text: "집합을 넷 이상 겹치지 않습니다. 원의 크기만 보고 값을 짐작하게 두지 않습니다." }}
        />
      </Section>
    </Page>
  );
}

import React from "react";
import { Plot, RadialTree } from "@ec21rnc/ui/chart";
import { RadialTreeChartSkeleton, Box, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "방사형 나무 차트", order: 24 };

// 이 차트는 글자 폭을 재려고 브라우저의 document를 씁니다. 서버에서 그려 보는 검사에서는 건너뜁니다.
const Client = ({ children }) => (typeof document === "undefined" ? null : children);

const words = ["계약서", "견적서", "발주서", "검수 확인서", "세금계산서", "거래 명세서", "납품 일정", "단가 협의", "결제 조건", "품질 기준", "담당자 변경", "계약 갱신", "보증 기간", "반품 절차", "배송 조건", "재고 확인"];
const data = words.map((label, i) => ({ label, key: `k${i}` }));
const grouped = data.map((item, i) => ({ ...item, color: i < 6 ? "var(--ec-chart-1)" : i < 11 ? "var(--ec-chart-2)" : "var(--ec-chart-3)" }));

function Tree({ data, size = 520, title = "거래처 관리", ...rest }) {
  return (
    <Client>
      <Plot data={data} width={size} height={size}>
        <RadialTree color="var(--ec-chart-1)" {...rest}>
          <RadialTree.Radian>
            <RadialTree.Radian.Label />
            <RadialTree.Radian.Line />
            <RadialTree.Radian.Cap />
            <RadialTree.Radian.Icon />
          </RadialTree.Radian>
          <RadialTree.Title>
            {Array.isArray(title)
              ? title.map((line, i) => (
                  <Text tag="tspan" key={line} x={size / 2} dy={i === 0 ? `${-(title.length - 1) * 0.6}em` : "1.2em"}>
                    {line}
                  </Text>
                ))
              : title}
          </RadialTree.Title>
        </RadialTree>
      </Plot>
    </Client>
  );
}

export default function RadialTreePage() {
  return (
    <Page meta={meta} lead="가운데에 주제 하나를 두고, 그와 관련된 항목을 둘레로 펼쳐 보여 주는 차트입니다. 생각 지도(마인드맵)의 한 종류입니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "한 주제에 딸린 관련 항목(생각, 주제, 낱말)을 한눈에 펼쳐 보여 줄 때.",
            "본격적으로 분석하기 전에, 무엇이 딸려 있는지 계층으로 훑어보게 할 때.",
            "값의 크기를 비교하는 차트가 아닙니다. 크기를 비교하려면 막대 차트를 씁니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Demo caption="항목을 누르면 활성 상태가 됩니다" column>
          <Tree data={data} defaultActiveKey="k2" />
        </Demo>
        <Table
          head={["요소", "기본 상태", "활성 상태"]}
          rows={[
            ["가운데 글자", "주제 하나. 항목 글자의 1.5배 크기", "—"],
            ["선", "두께 1px", "그대로"],
            ["끝의 동그라미", "지름 8px", "지름 16px. 안에 M 크기 아이콘을 넣을 수 있습니다."],
            ["항목 글자", "14px(글자 크기 200), 굵기 400", "굵기 700"],
          ]}
        />
        <Rules
          items={[
            "가운데에는 반드시 주제 하나만 둡니다. 나머지는 모두 거기서 뻗어 나갑니다.",
            "단순하게 그립니다. 꾸밈이 적을수록 잘 읽힙니다.",
            "자리를 넉넉히 줍니다. 가로세로 600px 이상을 권하며, 그보다 작게 만들지 않습니다.",
          ]}
        />
      </Section>

      <Section title="색">
        <Demo caption="묶음을 색으로 나눈 경우 — 범례가 필요합니다" column>
          <Tree data={grouped} />
        </Demo>
        <Rules
          items={[
            <>기본은 선, 동그라미, 글자가 모두 한 가지 색입니다. <Code>--ec-chart-1</Code>을 씁니다.</>,
            <>항목을 묶음으로 나눠 색을 달리할 때는 <Code>--ec-chart-1</Code>부터 번호 순서대로 씁니다. 항목마다 <Code>color</Code>를 줍니다.</>,
            <>마우스를 올리거나 활성일 때 글자는 한 단계 진한 색이 됩니다. 기본 여섯 색(1~6)의 진한 단계는 <Code>--ec-chart-7</Code>~<Code>--ec-chart-12</Code>입니다.</>,
            "글자가 차트 색으로 칠해지므로 배경과의 대비를 확인합니다.",
          ]}
        />
      </Section>

      <Section title="범례와 설명 상자">
        <Rules
          items={[
            "색으로 묶음을 나눴다면 차트 옆에 범례를 둡니다. 색만으로 묶음을 알 수 있게 두지 않습니다.",
            "이 차트에는 설명 상자(툴팁)를 두지 않습니다. 필요한 글자는 모두 차트에 나와 있어야 합니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Table
          head={["상태", "모양"]}
          rows={[
            ["기본", "선·동그라미·글자가 기본 색"],
            ["마우스 올림", "글자만 한 단계 진한 색. 선과 동그라미는 그대로"],
            ["활성(누름)", "글자는 진한 색에 굵기 700. 동그라미가 16px로 커지고 안에 아이콘을 둘 수 있습니다."],
          ]}
        />
        <Rules
          items={[
            <>활성 항목은 한 번에 하나입니다. <Code>activeKey</Code>와 <Code>onActiveKeyChange</Code>로 다룹니다. 활성 항목을 다시 누르면 풀립니다.</>,
            "처음 나타날 때 모든 항목이 가운데에서 바깥으로 뻗어 나오며 투명도가 0에서 100으로 바뀝니다. 0.2초 뒤에 시작하고 점점 빨라집니다.",
          ]}
        />
      </Section>

      <Section title="예외 상황">
        <Sub title="항목이 하나, 둘일 때">
          <Demo>
            <Tree data={data.slice(0, 1)} size={320} />
            <Tree data={data.slice(0, 2)} size={320} />
          </Demo>
        </Sub>
        <Sub title="항목이 몇 개 없을 때">
          <Demo>
            <Tree data={data.slice(0, 5)} size={360} />
          </Demo>
          <P>항목이 적으면 12시 방향부터 시계 방향으로, 원 둘레 전체에 고르게 나눠 놓습니다. 한쪽에 몰아 두지 않습니다.</P>
        </Sub>
        <Sub title="가운데 글자가 아주 길 때">
          <Demo>
            <Tree data={data.slice(0, 8)} size={480} centralMargin={90} title={["거래처별 계약과", "납품 관리 현황"]} />
          </Demo>
          <Rules
            items={[
              "가운데 글자는 말줄임표로 자르지 않습니다. 다음 줄로 넘깁니다.",
              <>줄은 저절로 바뀌지 않습니다. 끊을 자리를 정해 <Code>RadialTree.Title</Code> 안에 줄마다 <Code>tspan</Code>으로 나눠 넣습니다.</>,
              <>선이 글자를 지나가지 않게 <Code>centralMargin</Code>(가운데에서 선이 시작하는 곳까지의 거리, 기본 50px)을 가장 긴 줄의 절반보다 크게 줍니다.</>,
            ]}
          />
        </Sub>
        <Sub title="데이터가 없을 때">
          <P>차트를 그리지 않고, 데이터가 없다는 안내 문구를 보여 줍니다. 무엇을 하면 채워지는지 알 수 있으면 함께 적습니다.</P>
        </Sub>
        <Sub title="처음 불러올 때">
          <Demo>
            <Box w={240}>
              <RadialTreeChartSkeleton h={240} />
            </Box>
          </Demo>
          <P>
            처음 불러오는 동안에는 <Code>RadialTreeChartSkeleton</Code>을 보여 줍니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다. 오류 같은 그 밖의 빈 상태는 위젯 빈 상태 규칙을 따릅니다.
          </P>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "가운데에 주제 하나를 두고, 항목 이름은 짧은 낱말로 적습니다." }}
          bad={{ text: "600px보다 좁은 자리에 넣지 않습니다. 글자가 겹쳐 읽을 수 없습니다. 좁은 자리에서는 목록이나 태그 묶음을 씁니다." }}
        />
      </Section>
    </Page>
  );
}

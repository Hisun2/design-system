import React from "react";
import { scaleLinear } from "@ec21rnc/ui/chart";
import { Chart, Plot, Radar } from "@ec21rnc/ui/chart";
import { Box, Flex } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "방사형 차트", order: 23 };

// 이 차트는 글자 폭을 재려고 브라우저의 document를 씁니다. 서버에서 그려 보는 검사에서는 건너뜁니다.
const Client = ({ children }) => (typeof document === "undefined" ? null : children);

const scale = scaleLinear().domain([0, 10]);
const single = {
  항목: ["품질", "납기", "가격", "응대", "서류"],
  "거래처 가": [8, 6, 7, 9, 5],
};
const compare = {
  항목: ["품질", "납기", "가격", "응대", "서류", "기술"],
  "거래처 가": [8, 6, 7, 9, 5, 7],
  "거래처 나": [6, 9, 5, 6, 8, 4],
};
const three = {
  항목: ["품질", "납기", "가격"],
  "거래처 가": [8, 6, 7],
};
const zeros = {
  항목: ["품질", "납기", "가격", "응대", "서류"],
  "거래처 가": [0, 0, 0, 0, 0],
};

export default function RadarPage() {
  return (
    <Page meta={meta} lead="한 점에서 뻗어 나가는 여러 축 위에 값을 찍고 이어서, 세 가지 이상의 항목을 한 번에 비교하는 차트입니다. 거미줄 차트라고도 부릅니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "한 대상을 여러 항목(셋 이상)으로 평가한 데이터가 있을 때.",
            "두세 대상의 여러 항목을 좁은 자리에서 한 번에 견줄 때.",
            "어느 항목이 유독 높거나 낮은지, 대상끼리 어디가 닮았는지 보여 줄 때.",
            "데이터의 크기가 작거나 중간 정도일 때.",
          ]}
        />
        <Sub title="좋은 점과 약한 점">
          <Table
            head={["좋은 점", "약한 점"]}
            rows={[
              ["튀는 항목이 모양에서 바로 보입니다.", "축의 길이를 서로 견주기가 어렵습니다. 막대처럼 정확히 읽히지 않습니다."],
              ["대상끼리 닮은 곳과 다른 곳이 겹친 모양으로 드러납니다.", "면적이 값을 부풀려 보이게 합니다."],
              ["좁은 자리에 여러 항목을 담습니다.", "이웃한 축을 선으로 이으므로, 관계없는 항목 사이에 관계가 있는 것처럼 보입니다."],
              ["눈길을 끕니다.", "대상이 많으면 서로 가려 읽을 수 없습니다. 익숙하지 않은 사람에게는 어렵습니다."],
            ]}
          />
          <P>정확한 값의 비교가 목적이면 막대 차트를 먼저 생각합니다. 같은 데이터를 축을 나란히 세워 펼친 평행 좌표 차트도 대안입니다.</P>
        </Sub>
      </Section>

      <Section title="구성">
        <Demo caption="대상 하나, 항목 다섯" column>
          <Client><Chart.Radar data={single} groupKey="항목" scale={scale} plotWidth={320} plotHeight={320} showDots aria-label="거래처 가의 항목별 평가" /></Client>
        </Demo>
        <Table
          head={["요소", "규칙"]}
          rows={[
            ["축(항목)", "첫 축은 12시 방향에서 시작하고, 원을 똑같은 각도로 나눕니다. 항목은 3~10개를 권합니다."],
            ["격자", <>축 선과 눈금 선 모두 <Code>--ec-border</Code> 색. 눈금 선은 점선입니다.</>],
            ["눈금", "필요한 만큼만 둡니다. 많으면 읽기 어렵습니다."],
            ["값의 범위", <>가운데가 0, 바깥 끝이 가장 큰 점수가 되게 <Code>scale</Code>로 정합니다. 정하지 않으면 가장 작은 값이 가운데로 가서 차이가 실제보다 크게 보입니다.</>],
            ["대상(선)", "두께 3px."],
            ["점", "지름 8px, 흰색 테두리 2px."],
            ["면", "선과 같은 색, 불투명도 20%."],
            ["항목 이름", <>글자색 <Code>--ec-text-secondary</Code>.</>],
          ]}
        />
      </Section>

      <Section title="격자 모양">
        <Demo caption="다각형 격자(기본) / 원형 격자 (circle)">
          <Flex gap={6} flexWrap>
            <Box w={260}>
              <Client><Chart.Radar data={compare} groupKey="항목" scale={scale} plotWidth={260} plotHeight={260} showLegend={false} aria-label="다각형 격자" /></Client>
            </Box>
            <Box w={260}>
              <Client><Chart.Radar data={compare} groupKey="항목" scale={scale} circle plotWidth={260} plotHeight={260} showLegend={false} aria-label="원형 격자" /></Client>
            </Box>
          </Flex>
        </Demo>
        <Demo caption="항목이 세 개일 때 (권장 최소)">
          <Client><Chart.Radar data={three} groupKey="항목" scale={scale} circle plotWidth={220} plotHeight={220} aria-label="항목이 세 개인 방사형 차트" /></Client>
        </Demo>
        <Rules
          items={[
            "항목이 셋이나 넷이면 격자를 원으로 그립니다. 다각형으로 그리면 삼각형·사각형이 되어 격자와 데이터 모양이 헷갈립니다.",
            <>항목이 다섯 이상이면 다각형이 기본입니다. 원으로 바꾸려면 <Code>circle</Code>을 줍니다.</>,
          ]}
        />
      </Section>

      <Section title="선과 면">
        <Demo caption="면 없이 선만 (fill=&quot;transparent&quot;)">
          <Client>
            <Plot data={compare} width={260} height={260}>
              <Radar scale={scale}>
                <Radar.Axis dataKey="항목">
                  <Radar.Axis.Ticks />
                  <Radar.Axis.Labels />
                </Radar.Axis>
                <Radar.Polygon dataKey="거래처 가" color="var(--ec-chart-1)" fill="transparent">
                  <Radar.Polygon.Line />
                </Radar.Polygon>
                <Radar.Polygon dataKey="거래처 나" color="var(--ec-chart-2)" fill="transparent">
                  <Radar.Polygon.Line />
                </Radar.Polygon>
              </Radar>
            </Plot>
          </Client>
        </Demo>
        <Rules
          items={[
            "면을 칠하면 모양이 눈에 잘 들어옵니다. 기본으로 칠합니다.",
            "대상이 둘 이상이면 면이 겹치므로 반드시 반투명이어야 합니다. 겹쳐서 읽기 어려우면 면을 빼고 선만 그립니다.",
            "선을 부드러운 곡선으로 바꿀 수 있습니다. 꺾은선 차트와 같은 곡선 방식을 씁니다. 값의 위치가 덜 정확해 보이므로 인상을 전할 때만 씁니다.",
            <>면을 빼거나 곡선으로 바꾸려면 <Code>Plot</Code>과 <Code>Radar</Code> 부품으로 직접 조립합니다. <Code>Radar.Polygon</Code>에 <Code>fill="transparent"</Code> 또는 <Code>curve</Code>를 줍니다.</>,
          ]}
        />
      </Section>

      <Section title="색">
        <Rules
          items={[
            <>대상의 색은 <Code>--ec-chart-1</Code>부터 번호 순서대로 씁니다.</>,
            "서로 겹치므로 이웃한 번호의 색이 충분히 구분되는지 확인합니다. 대상은 셋까지입니다.",
          ]}
        />
      </Section>

      <Section title="크기">
        <Demo caption="작은 차트 — 눈금, 항목 이름, 점을 뺍니다">
          <Client>
            <Plot data={single} width={120} height={120}>
              <Radar scale={scale} offset={8}>
                <Radar.Axis dataKey="항목" />
                <Radar.Polygon dataKey="거래처 가" color="var(--ec-chart-1)">
                  <Radar.Polygon.Line />
                </Radar.Polygon>
              </Radar>
            </Plot>
          </Client>
        </Demo>
        <Rules
          items={[
            <>크기는 <Code>plotWidth</Code>, <Code>plotHeight</Code>로 정합니다. 정해진 최소·최대 크기는 없습니다.</>,
            "작게 그릴 때는 눈금, 항목 이름, 점을 꺼서 모양만 남깁니다.",
            "항목 이름을 보여 줄 때는 이름이 잘리지 않을 만큼 둘레에 자리를 둡니다.",
          ]}
        />
      </Section>

      <Section title="이름표와 눈금">
        <Rules
          items={[
            "항목 이름이 길면 말줄임하지 않고 다음 줄로 넘깁니다.",
            "항목 이름 자리에 글자 대신 태그, 버튼, 아이콘을 둘 수 있습니다. 아이콘만 둘 때는 설명 풍선으로 이름을 알립니다.",
            "눈금은 점선으로 그리고, 필요한 만큼만 둡니다.",
            "항목마다 단위나 범위가 다를 수 있습니다(점수 0~10과 금액). 이때는 축 위에 눈금 값을 적지 않고, 정확한 값은 설명 상자에서 보여 줍니다.",
          ]}
        />
      </Section>

      <Section title="대상의 수와 범례">
        <Demo caption="대상 둘 — 범례가 필요합니다" column>
          <Client><Chart.Radar data={compare} groupKey="항목" scale={scale} plotWidth={320} plotHeight={320} showDots aria-label="거래처 가와 나의 항목별 평가" /></Client>
        </Demo>
        <Rules
          items={[
            "대상은 하나에서 셋까지 권합니다. 다섯이면 읽을 수 없습니다.",
            "넷 이상이면 대상마다 작은 방사형 차트를 따로 그려 나란히 놓거나, 다른 차트로 바꿉니다.",
            "대상이 둘 이상이면 범례가 있어야 합니다. 차트 위 또는 오른쪽에 둡니다.",
            "범례의 항목에 마우스를 올리면 그 대상만 또렷하게 남고 나머지는 흐려집니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "축에 마우스를 올리면 그 항목에 대한 모든 대상의 값이 설명 상자에 나옵니다.",
            "마우스가 닿는 범위는 그 축과, 양옆 축까지 거리의 절반입니다. 이 부채꼴이 옅은 회색으로 강조됩니다.",
            "해당 축 선이 진해지고, 그 축 위의 점은 12px(테두리 2px)로 커집니다.",
            <>축을 눌렀을 때 할 일이 있으면 <Code>onClickRadar</Code>를 씁니다.</>,
            "처음 나타날 때 모양이 가운데(0)에서 바깥으로 자랍니다. 0.4초 기다린 뒤 0.1초 동안 움직입니다.",
          ]}
        />
      </Section>

      <Section title="예외 상황">
        <Sub title="값이 모두 0일 때">
          <Demo column>
            <Client><Chart.Radar data={zeros} groupKey="항목" scale={scale} plotWidth={240} plotHeight={240} showDots aria-label="값이 모두 0인 방사형 차트" /></Client>
          </Demo>
          <P>모든 점이 가운데에 모입니다. 0은 데이터이므로 그대로 그립니다.</P>
        </Sub>
        <Sub title="값을 알 수 없을 때">
          <P>그 항목에는 점을 그리지 않고, 설명 상자에 "값 없음"이라고 적습니다.</P>
        </Sub>
        <Sub title="처음 불러올 때">
          <P>차트 자리에 Skeleton을 보여 줍니다. 차트 제목이 있으면 제목은 먼저 보여 줍니다. 오류나 데이터 없음 같은 그 밖의 빈 상태는 위젯 빈 상태 규칙을 따릅니다.</P>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "항목을 뜻이 통하는 순서로 놓습니다. 관련 있는 항목을 이웃에 두면 모양이 읽힙니다." }}
          bad={{ text: "항목을 아무 순서로 놓지 않습니다. 순서가 바뀌면 같은 데이터도 전혀 다른 모양이 됩니다." }}
        />
        <DoDont
          good={{ text: "대상은 셋까지만 겹치고, 면은 반투명으로 칠합니다." }}
          bad={{ text: "넷 이상을 한 차트에 겹치거나, 항목을 열 개 넘게 두지 않습니다. 그럴 때는 막대 차트를 씁니다." }}
        />
      </Section>
    </Page>
  );
}

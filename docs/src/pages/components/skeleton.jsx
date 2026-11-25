import React from "react";
import { Skeleton, LineChartSkeleton, BarChartSkeleton, DonutChartSkeleton, Button, Box, Flex, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Skeleton" };

export default function SkeletonPage() {
  return (
    <Page meta={meta} lead="화면이나 영역을 처음 불러오는 동안 내용이 놓일 자리의 뼈대를 회색 막대로 미리 보여 주는 요소입니다. 무엇이 어디에 나올지 사용자가 짐작할 수 있게 합니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "불러오는 데 5초 이하가 걸릴 때 씁니다. 더 오래 걸리면 ProgressBar를 함께 둡니다.",
            "요소의 개수와 대략의 배치를 미리 알고 있을 때 씁니다.",
            "페이지, 카드, 표, 차트, 목록처럼 그때그때 달라지는 내용을 처음 불러올 때 씁니다.",
            "한 화면에 여러 뼈대를 동시에 보여 줘도 되고, 영역마다 따로 끝나도 됩니다.",
          ]}
        />
        <P>이미 보이는 내용을 다시 불러올 때는 Skeleton이 아니라 SpinContainer를 씁니다.</P>
      </Section>

      <Section title="종류와 색">
        <Demo caption="기본 — 밝은 바탕">
          <Box w={280}>
            <Skeleton h={56}>
              <Skeleton.Text amount={2} />
              <Skeleton.Text y={40} width="75%" />
            </Skeleton>
          </Box>
        </Demo>
        <Demo caption="theme=&quot;invert&quot; — 어둡거나 색이 있는 바탕">
          <Box w={280} p={4} bg="var(--ec-brand-navy)">
            <Skeleton h={56} theme="invert">
              <Skeleton.Text amount={2} />
              <Skeleton.Text y={40} width="75%" />
            </Skeleton>
          </Box>
        </Demo>
        <Rules
          items={[
            "뼈대 막대의 모서리는 모두 4px입니다.",
            "색은 정해진 두 가지뿐입니다. 상태색이나 Blue를 입히지 않습니다.",
          ]}
        />
      </Section>

      <Section title="움직임">
        <Rules
          items={[
            "뼈대가 실제 내용으로 바뀔 때는 300ms 동안 부드럽게 나타납니다(ease-out).",
            <>막대 위를 지나가는 빛은 2,000ms에 한 번 돕니다. <Code>duration</Code>으로 바꿉니다.</>,
            "움직임은 영역(카드, 표, 차트)마다 따로 돕니다. 영역끼리 박자를 맞출 필요는 없습니다.",
            <>움직임이 필요 없으면 <Code>duration={"{0}"}</Code>으로 멈춥니다.</>,
          ]}
        />
        <Demo caption="duration={0} — 멈춘 뼈대">
          <Box w={280}>
            <Skeleton h={16} duration={0}>
              <Skeleton.Text />
            </Skeleton>
          </Box>
        </Demo>
      </Section>

      <Section title="무엇을 뼈대로 바꾸는가">
        <Table
          head={["구분", "해당하는 것", "처리"]}
          rows={[
            ["바로 보여 줄 것", "화면 이름, 카드 제목과 설명 아이콘, 표의 머리글, 버튼·입력창·스위치·Pills 같은 컨트롤", "뼈대로 바꾸지 않습니다. 처음부터 그대로 보여 줍니다."],
            ["뼈대로 바꿀 것", "카드 내용, 표의 행, 차트, 집계 숫자, 서버에서 받아야 하는 선택 목록", "불러오는 동안 뼈대를 보여 줍니다."],
            ["뼈대를 쓰지 않는 것", "NoticeBubble, Dropdown, Tooltip, Modal, Spin", "사용자가 볼 때는 이미 준비되어 있어야 합니다."],
          ]}
        />
        <P>드롭다운 안에 서버에서 받아 오는 표가 있으면 그 표에는 뼈대를 쓸 수 있습니다.</P>
      </Section>

      <Section title="글자">
        <Sub title="문단">
          <Demo>
            <Box w={320}>
              <Skeleton h={56}>
                <Skeleton.Text amount={2} />
                <Skeleton.Text y={40} width="75%" />
              </Skeleton>
            </Box>
          </Demo>
          <Rules
            items={[
              "문단은 길이와 상관없이 한 가지 모양의 뼈대로 바꿉니다.",
              "막대는 세 줄까지만 보여 줍니다.",
              "막대의 폭은 문단의 폭에 맞추되 600px을 넘기지 않습니다.",
              "마지막 줄은 앞 줄의 4분의 3 길이로 합니다.",
            ]}
          />
        </Sub>
        <Sub title="제목">
          <Demo caption="페이지 제목(24px) / 구역 제목(20px) / 작은 제목(16px)">
            <Flex direction="column" gap={4}>
              <Skeleton h={32} w={150}><Skeleton.Text height={32} /></Skeleton>
              <Skeleton h={28} w={150}><Skeleton.Text height={28} /></Skeleton>
              <Skeleton h={24} w={150}><Skeleton.Text height={24} /></Skeleton>
            </Flex>
          </Demo>
          <Rules
            items={[
              "제목 하나는 막대 하나로 바꿉니다. 제목이 두 줄이어도 막대는 하나입니다.",
              "막대의 높이는 그 제목의 줄 높이와 같게 합니다.",
              "막대의 폭은 150px입니다. 꼭 필요할 때만 늘립니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="그림과 아이콘">
        <Demo caption="작은 그림 — 그림 크기의 막대와 글자 막대">
          <Flex gap={3} alignItems="center">
            <Skeleton h={40} w={40}><Skeleton.Text height={40} /></Skeleton>
            <Box w={200}>
              <Skeleton h={28}><Skeleton.Text amount={2} /></Skeleton>
            </Box>
          </Flex>
        </Demo>
        <Rules
          items={[
            "사람 사진이나 미리 보기처럼 작은 그림은 그림과 같은 크기의 막대를 보여 주고, 받는 즉시 그림으로 바꿉니다.",
            "큰 그림은 단계를 나눕니다. 먼저 뼈대, 다음에 글자와 작은 그림, 그다음 흐릿한 큰 그림, 마지막에 선명한 큰 그림 순서입니다.",
            "아이콘에는 되도록 뼈대를 쓰지 않습니다. 숨기거나 비활성 상태로 둡니다.",
            "아이콘을 꼭 뼈대로 보여 줘야 하면 아이콘과 같은 크기로 하고, 아이콘 사이 간격은 4px의 배수로 맞춥니다.",
          ]}
        />
      </Section>

      <Section title="버튼과 링크">
        <Demo caption="불러오는 동안 — 이동 버튼은 그대로, 제출 버튼은 비활성">
          <Button>목록으로</Button>
          <Button use="primary" theme="info" disabled>승인</Button>
        </Demo>
        <Rules
          items={[
            "다른 화면으로 이동하는 버튼과 링크는 불러오는 동안에도 그대로 둡니다.",
            "값을 보내거나 동작을 확정하는 버튼은 불러오는 동안 비활성으로 둡니다.",
            "주요 버튼이 될지 보조 버튼이 될지 아직 모르면 버튼 자리에 뼈대를 보여 줍니다.",
          ]}
        />
      </Section>

      <Section title="차트">
        <Demo caption="차트 종류에 맞는 뼈대를 씁니다 — 선 / 막대 / 도넛">
          <Box w={200} h={120}><LineChartSkeleton /></Box>
          <Box w={200} h={120}><BarChartSkeleton /></Box>
          <Box w={120} h={120}><DonutChartSkeleton /></Box>
        </Demo>
        <Rules
          items={[
            "축과 눈금 글자는 보여 주지 않습니다.",
            "범례는 같은 크기의 막대로 바꿉니다. 범례의 값을 미리 알면 처음부터 글자로 보여 줍니다.",
            "차트 위의 보기 전환(Pills)은 불러오는 동안에도 누를 수 있게 둡니다.",
            <>영역, 버블, 가로 막대, 히스토그램, 산점도, 벤 등 다른 종류도 이름이 <Code>…ChartSkeleton</Code>인 부품이 있습니다.</>,
          ]}
        />
      </Section>

      <Section title="복합 영역">
        <Sub title="표">
          <Rules
            items={[
              "칸 안의 글자와 링크를 막대로 바꿉니다.",
              "머리글과 정렬은 불러오는 동안에도 그대로 살려 둡니다.",
              "행의 체크박스와 행 버튼은 처음 불러오는 동안 비활성으로 둡니다.",
              "행이 다섯 줄 이하인 작은 표는 다섯 줄 모두 뼈대로 보여 줍니다.",
            ]}
          />
        </Sub>
        <Sub title="집계 숫자">
          <Demo>
            <Flex direction="column" gap={2}>
              <Text size={200} color="text-secondary">이번 달 승인 문서</Text>
              <Skeleton h={32} w={96}><Skeleton.Text height={32} /></Skeleton>
            </Flex>
          </Demo>
          <Rules
            items={[
              "숫자는 그 숫자의 줄 높이와 같은 높이의 막대로 바꿉니다.",
              "증감 표시, 덧붙는 설명, 링크는 처음 불러오는 동안 보여 주지 않습니다.",
              "설명 아이콘은 살려 둡니다. 불러오는 동안 읽을 수 있습니다.",
              "숫자 옆의 아이콘은 같은 크기의 막대로 바꿉니다.",
            ]}
          />
        </Sub>
        <Sub title="Pills">
          <Rules
            items={[
              "Pills는 비활성으로 두지 않습니다. 불러오는 동안에도 다른 보기로 옮겨 갈 수 있어야 합니다.",
              "Pills 안의 개수는 처음 불러오는 동안 뼈대로 보여 줄 수 있습니다.",
              "큰 숫자가 들어간 Pills는 집계 숫자와 같은 규칙을 따릅니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <Rules
          items={[
            "달라지는 내용에만 씁니다. 바로 보여 줄 수 있고 변하지 않는 것은 처음부터 보여 주고, 비활성으로 두지도 않습니다.",
            "문서 이름이나 거래처 이름처럼 조건에 따라 달라지는 제목은 뼈대로 보여 줍니다.",
            "처음 불러올 때는 핵심 정보의 자리만 보여 줍니다. 부가 정보까지 뼈대로 그리지 않습니다.",
            "아이콘만 따로 먼저 보여 주지 않습니다. 딸린 글자나 링크와 함께 나오게 합니다. 꼭 알려야 하는 뜻을 가진 아이콘만 예외입니다.",
            "선택 목록과 드롭다운은 처음부터 보여 줍니다.",
          ]}
        />
        <DoDont
          good={{
            demo: (
              <Box w={220}>
                <Skeleton h={56}>
                  <Skeleton.Text amount={2} />
                  <Skeleton.Text y={40} width="75%" />
                </Skeleton>
              </Box>
            ),
            text: "막대는 세 줄까지만 둡니다.",
          }}
          bad={{
            demo: (
              <Box w={220}>
                <Skeleton h={128}>
                  <Skeleton.Text amount={7} />
                </Skeleton>
              </Box>
            ),
            text: "막대를 많이 늘어놓지 않습니다. 화면이 무거워 보이고 그리는 시간도 늘어납니다.",
          }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["상황", "쓸 것"]}
          rows={[
            ["영역을 처음 불러올 때", "Skeleton"],
            ["이미 보이는 영역을 다시 불러올 때", "SpinContainer"],
            ["버튼, 표의 칸처럼 작은 요소 하나를 기다릴 때", "Spin"],
            ["5초 넘게 걸리고 진행 정도를 알 수 있을 때", "ProgressBar"],
          ]}
        />
      </Section>
    </Page>
  );
}

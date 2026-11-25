import React from "react";
import InfoM from "@semcore/icon/Info/m";
import WarningM from "@semcore/icon/Warning/m";
import { Button, ButtonLink, Divider, Tooltip, DescriptionTooltip, Skeleton, Spin, Flex, Box, Text } from "@ec21rnc/ui";
import { MiniChart } from "@ec21rnc/ui/chart";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "요약 지표", order: 10 };

function Info({ label, children }) {
  return (
    <DescriptionTooltip placement="top">
      <DescriptionTooltip.Trigger tag={ButtonLink} use="secondary" addonLeft={InfoM} aria-label={label} ml={1} />
      <DescriptionTooltip.Popper aria-label={label} wMax={260}>
        <Text tag="p" size={200} m={0}>{children}</Text>
      </DescriptionTooltip.Popper>
    </DescriptionTooltip>
  );
}

/** 지표 하나: 제목, 기간, 값, 변화. */
function Metric({ title, info, period, value, diff, diffTip, children }) {
  return (
    <Flex direction="column">
      <Flex alignItems="center">
        <Text size={200}>{title}</Text>
        {info ? <Info label={`${title} 설명`}>{info}</Info> : null}
      </Flex>
      {period ? <Text size={100} color="text-secondary">{period}</Text> : null}
      <Flex alignItems="baseline" gap={2} mt={2}>
        <Text size={500} medium>{value}</Text>
        {diff ? (
          <Tooltip title={diffTip}>
            <Text size={100} color="text-secondary" tabIndex={0}>{diff}</Text>
          </Tooltip>
        ) : null}
      </Flex>
      {children}
    </Flex>
  );
}

const TREND = [3, 5, 4, 7, 6, 9, 8];

/** 작은 차트를 누르면 아래에 자세한 차트 자리가 펼쳐집니다. */
function ClickableDemo() {
  const [open, setOpen] = React.useState(null);
  const items = [
    { key: "doc", title: "새 문서", value: "128건", data: TREND },
    { key: "done", title: "승인 완료", value: "96건", data: [2, 3, 5, 4, 6, 6, 7] },
  ];
  return (
    <Flex direction="column" gap={4} w="100%">
      <Flex gap={6}>
        {items.map((item, i) => (
          <React.Fragment key={item.key}>
            {i > 0 ? <Divider orientation="vertical" /> : null}
            <Flex direction="column" gap={2}>
              <Text size={200}>{item.title}</Text>
              <Text size={500} medium>{item.value}</Text>
              <Button
                use="tertiary"
                theme="muted"
                active={open === item.key}
                aria-expanded={open === item.key}
                aria-label={`${item.title} 추세 자세히 보기`}
                onClick={() => setOpen(open === item.key ? null : item.key)}
              >
                <MiniChart.TrendLine data={item.data} w={120} h={24} aria-label={`${item.title} 최근 7일 추세`} />
              </Button>
            </Flex>
          </React.Fragment>
        ))}
      </Flex>
      {open ? (
        <Box p={6} bg="var(--ec-bg-page)" borderRadius="12px">
          <Text size={200}>{items.find((item) => item.key === open).title} — 최근 7일의 자세한 차트가 이 자리에 나옵니다.</Text>
        </Box>
      ) : null}
    </Flex>
  );
}

export default function SummaryPage() {
  return (
    <Page meta={meta} lead="화면이나 위젯의 핵심 숫자와 그 변화를 한 줄로 모아 보여 주는 묶음입니다. 보고서 맨 위, 위젯이나 표의 머리에 씁니다.">
      <Section title="기본 원칙">
        <Rules
          items={[
            "지표의 뜻은 제목과 옆의 덧붙인 정보만으로 알 수 있어야 합니다. 되도록 어떻게 계산한 값인지도 알려 줍니다.",
            "한 화면이나 위젯에 5~6개까지만 둡니다. 더 많으면 한눈에 들어오지 않습니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Demo>
          <Metric
            title="승인 대기 문서"
            info="담당자가 아직 승인하지 않은 문서의 수입니다."
            period="2026-11-01 ~ 2026-11-25"
            value="42건"
            diff="+8건"
            diffTip="지난달 34건 → 이번 달 42건 (+8건, +23.5%)"
          />
        </Demo>
        <Table
          head={["부분", "내용", "모양"]}
          rows={[
            ["제목", "지표의 이름", <>14px(<Code>--ec-fs-200</Code>), <Code>--ec-text-primary</Code>. 필요하면 M 크기 정보 아이콘을 붙입니다.</>],
            ["덧붙인 정보", "날짜, 기간, 부서, 데이터의 출처", <>12px(<Code>--ec-fs-100</Code>), <Code>--ec-text-secondary</Code></>],
            ["값", "지표의 숫자", <>24px(<Code>--ec-fs-500</Code>), <Code>--ec-text-primary</Code>. 누르면 이동하는 값은 링크 색. 자리에 따라 20px이나 32px로 바꿀 수 있습니다.</>],
            ["값에 딸린 정보", "이전 기간과의 차이, 추세", <>12px(<Code>--ec-fs-100</Code>), <Code>--ec-text-secondary</Code></>],
            ["그 밖의 정보", "기준, 단위 설명 등", <>12px(<Code>--ec-fs-100</Code>), <Code>--ec-text-secondary</Code></>],
          ]}
        />
        <Rules
          items={[
            "숫자는 세 자리마다 쉼표를 찍고 단위를 붙입니다(1,280건, 12,480원).",
            "제목 앞에 아이콘을 둘 수 있습니다. 지표의 종류를 구분하는 데 도움이 될 때만 M 크기로 둡니다.",
            "상태를 뜻하는 값에만 상태 색을 씁니다. 꾸미려고 색을 넣지 않습니다.",
          ]}
        />
      </Section>

      <Section title="간격과 구분선">
        <Demo caption="지표 사이는 24px 간격과 구분선">
          <Flex gap={6}>
            <Metric title="전체 문서" value="1,280건" />
            <Divider orientation="vertical" />
            <Metric title="승인 완료" value="1,102건" />
            <Divider orientation="vertical" />
            <Metric title="반려" value="36건" />
          </Flex>
        </Demo>
        <Rules
          items={[
            "지표와 지표 사이는 24px씩 띄우고 구분선(Divider)을 둡니다.",
            "마지막 지표 뒤에는 구분선을 두지 않습니다.",
            "제목과 값 사이는 8px, 값과 값에 딸린 정보 사이는 8px입니다.",
            "값 여러 개로 이루어진 지표는 값 사이를 16px로 띄웁니다.",
          ]}
        />
        <Sub title="한 묶음인 지표">
          <P>서로 묶이는 지표 사이에는 구분선을 두지 않습니다. 구분선은 묶음과 묶음 사이에만 둡니다.</P>
          <Demo caption="'승인 완료'와 '반려'는 한 묶음">
            <Flex gap={6}>
              <Metric title="전체 문서" value="1,280건" />
              <Divider orientation="vertical" />
              <Metric title="승인 완료" value="1,102건" />
              <Metric title="반려" value="36건" />
            </Flex>
          </Demo>
        </Sub>
      </Section>

      <Section title="가로 배치와 세로 배치">
        <Table
          head={["지표 수", "배치"]}
          rows={[
            ["4개 이상", "가로로 늘어놓습니다."],
            ["3개 이하", "세로로 쌓습니다. 자리를 덜 차지합니다."],
            ["1개", "그 지표를 이루는 값들을 풀어서 함께 보여 줍니다."],
          ]}
        />
        <Demo caption="세로 배치">
          <Flex direction="column" gap={4} w={200}>
            <Metric title="승인 대기" value="42건" />
            <Divider />
            <Metric title="오늘 마감" value="7건" />
          </Flex>
        </Demo>
        <Demo caption="지표가 하나일 때 — 이루는 값을 함께">
          <Flex gap={6} alignItems="flex-end">
            <Metric title="전체 문서" value="1,280건" />
            <Flex gap={4}>
              <Text size={200} color="text-secondary">승인 1,102건</Text>
              <Text size={200} color="text-secondary">대기 142건</Text>
              <Text size={200} color="text-secondary">반려 36건</Text>
            </Flex>
          </Flex>
        </Demo>
        <P>지표는 위젯뿐 아니라 표의 칸 같은 곳에도 들어갑니다. 놓이는 자리에 따라 왼쪽이나 오른쪽으로 맞춥니다. 숫자 열 안에서는 오른쪽으로 맞춥니다.</P>
      </Section>

      <Section title="제목이 길 때">
        <Rules
          items={[
            "지표가 많아 화면 폭을 넘으면 제목을 말줄임표로 자르고, 마우스를 올리면 전체 이름을 보여 줍니다.",
            "또는 제목을 짧게 줄이고 전체 이름과 설명을 정보 아이콘(안내 표시) 안에 넣습니다.",
          ]}
        />
        <Demo>
          <Box w={120}>
            <Text size={200} ellipsis>이번 달 평균 승인 처리 시간</Text>
            <Text tag="div" size={500} medium mt={2}>3.2시간</Text>
          </Box>
        </Demo>
      </Section>

      <Section title="차이 값">
        <Rules
          items={[
            "차이 값에 마우스를 올리면 이전 값과 지금 값을 나란히 보여 주는 설명 풍선이 나옵니다.",
            "설명 풍선 안의 숫자는 줄이지 않습니다. \"1.2천\"이 아니라 \"1,280\"으로 적습니다.",
            "필요하면 절대 차이(+8건)와 비율(+23.5%)을 함께 적습니다.",
            "설명 풍선에 지표의 제목을 다시 적지 않습니다. 이미 바로 위에 있습니다.",
            "늘고 준 것을 색만으로 알리지 않습니다. +, − 부호나 화살표를 함께 씁니다.",
          ]}
        />
      </Section>

      <Section title="작은 차트가 있는 지표">
        <P>작은 차트(MiniChart)는 추세를 보여 주거나 날짜별 값을 견주는 데 쓰는 줄인 차트입니다.</P>
        <Demo>
          <Flex gap={6}>
            <Metric title="새 문서" value="128건">
              <Box mt={2}><MiniChart.TrendLine data={TREND} w={120} h={24} aria-label="새 문서 최근 7일 추세" /></Box>
            </Metric>
            <Divider orientation="vertical" />
            <Metric title="승인 완료" value="96건">
              <Box mt={2}><MiniChart.TrendLine data={[2, 3, 5, 4, 6, 6, 7]} w={120} h={24} aria-label="승인 완료 최근 7일 추세" /></Box>
            </Metric>
          </Flex>
        </Demo>
        <Rules
          items={[
            "지표가 화면 폭을 넘으면 여러 단으로 나누어 놓습니다.",
            "같은 종류의 작은 차트는 폭을 같게 맞춥니다.",
            "필요하면 작은 차트에 마우스를 올렸을 때 그 지점의 값을 설명 풍선으로 보여 줍니다.",
          ]}
        />
        <Sub title="누를 수 있는 작은 차트">
          <P>작은 차트를 누르면 자세한 차트가 펼쳐지게 할 수 있습니다. 큰 차트를 늘 함께 볼 필요는 없고 가끔만 들여다보는 화면에 맞습니다.</P>
          <Demo caption="작은 차트를 누르면 아래가 펼쳐집니다">
            <ClickableDemo />
          </Demo>
          <Rules
            items={[
              "화면을 열면 작은 차트가 처음부터 보입니다.",
              "자세한 차트는 접이식처럼 아래로 펼쳐지며 그 아래 내용을 밀어냅니다.",
              "펼쳐진 상태에서 다른 작은 차트를 누르면 같은 자리의 내용이 그 지표의 차트로 바뀝니다.",
              "작은 차트의 기본 기간은 자세한 차트의 기본 기간과 같게 합니다.",
              "자세한 차트에서 기간을 바꿔도 작은 차트는 바뀌지 않습니다.",
              "상태는 세 가지입니다: 기본, 마우스를 올렸을 때(바탕이 옅게 깔림), 펼쳐 둔 것(눌린 모양).",
            ]}
          />
        </Sub>
      </Section>

      <Section title="예외 상태">
        <Demo>
          <Flex gap={6}>
            <Flex direction="column" gap={2}>
              <Text size={200}>처음 불러올 때</Text>
              <Skeleton h={28} w={96}><Skeleton.Text amount={1} /></Skeleton>
            </Flex>
            <Divider orientation="vertical" />
            <Flex direction="column" gap={2}>
              <Text size={200}>다시 불러올 때</Text>
              <Spin size="s" />
            </Flex>
            <Divider orientation="vertical" />
            <Flex direction="column" gap={2}>
              <Text size={200}>값이 없을 때</Text>
              <Text size={500} medium color="text-secondary">없음</Text>
            </Flex>
            <Divider orientation="vertical" />
            <Flex direction="column" gap={2}>
              <Text size={200}>오류가 났을 때</Text>
              <Tooltip title="값을 불러오지 못했습니다. 잠시 뒤 다시 시도해 주십시오.">
                <ButtonLink use="secondary" addonLeft={WarningM} aria-label="오류 내용 보기" />
              </Tooltip>
            </Flex>
          </Flex>
        </Demo>
        <Table
          head={["상태", "보이는 것"]}
          rows={[
            ["처음 불러올 때", "값 자리에 뼈대(Skeleton)"],
            ["필터를 바꾸거나 다시 불러올 때", "값 자리에 도는 표시(Spin)"],
            ["값이 없을 때", "\"없음\"이라고 적습니다. 0과 구분합니다. 0은 값이 있는 것입니다."],
            ["지표 하나에 오류가 났을 때", "주의 아이콘을 두고, 마우스를 올리면 \"값을 불러오지 못했습니다\"라는 설명이 나옵니다."],
            ["여러 지표나 위젯 전체에 오류가 났을 때", "해당 지표들 또는 위젯 전체를 80% 흰색으로 덮고 그 위에 \"값을 불러오지 못했습니다\"라고 적습니다."],
          ]}
        />
      </Section>

      <Section title="화면 폭에 따른 크기">
        <Rules
          items={[
            "요약 위젯은 화면 폭에 따라 최소 폭과 최대 폭을 정해 둘 수 있습니다.",
            "최대 폭은 안의 내용에 맞춥니다.",
            "화면 폭 전체로 늘이지 않습니다. 지표 사이가 벌어지면 한 묶음으로 읽히지 않습니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "\"승인 대기 문서 42건 · 지난달보다 +8건\" — 이름, 값, 단위, 변화가 모두 있습니다." }}
          bad={{ text: "지표를 열 개씩 늘어놓거나, 단위 없이 숫자만 적지 않습니다." }}
        />
      </Section>
    </Page>
  );
}

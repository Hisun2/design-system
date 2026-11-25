import React from "react";
import InfoM from "@semcore/icon/Info/m";
import InfoL from "@semcore/icon/Info/l";
import { ButtonLink, DescriptionTooltip, Select, Checkbox, Flex, Text } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "안내 표시", order: 9 };

/** 정보 아이콘을 누르면 설명이 열리는 묶음. */
function Informer({ label, icon = InfoM, children }) {
  return (
    <DescriptionTooltip placement="right">
      <DescriptionTooltip.Trigger tag={ButtonLink} use="secondary" addonLeft={icon} aria-label={label} ml={1} />
      <DescriptionTooltip.Popper aria-label={label} wMax={280}>
        {children}
      </DescriptionTooltip.Popper>
    </DescriptionTooltip>
  );
}

const PERIODS = [
  { value: "7", children: "최근 7일" },
  { value: "30", children: "최근 30일" },
];

export default function InformerPage() {
  return (
    <Page meta={meta} lead="정보 아이콘을 누르면 긴 설명이 열리는 묶음입니다. 요소 옆에 글자가 있는 링크를 둘 자리가 모자랄 때 씁니다.">
      <Section title="구성">
        <Demo caption="아이콘을 누르거나, 초점을 두고 Enter·Space를 누르면 설명이 열립니다">
          <Flex alignItems="center">
            <Text size={300} bold>승인 대기 문서</Text>
            <Informer label="승인 대기 문서 설명">
              <Text tag="p" size={200} m={0}>담당자가 아직 승인하지 않은 문서의 수입니다. 반려된 문서는 세지 않습니다.</Text>
            </Informer>
          </Flex>
        </Demo>
        <Table
          head={["부분", "규칙"]}
          rows={[
            ["아이콘 버튼", <>글자 없이 정보(Info) 아이콘만 있는 <Code>ButtonLink</Code>. 앞 요소와의 간격은 4px(<Code>ml={"{1}"}</Code>).</>],
            ["설명 상자", <><Code>DescriptionTooltip</Code>. 아이콘을 누르면 열립니다. 글, 링크, 목록을 넣을 수 있습니다.</>],
          ]}
        />
        <Rules
          items={[
            <>아이콘만 있는 버튼이므로 <Code>aria-label</Code>로 이름을 붙입니다("승인 대기 문서 설명").</>,
            "마우스를 올리는 것만으로는 열리지 않습니다. 눌러야 열립니다. 안에 링크가 있어도 누를 수 있게 하기 위해서입니다.",
            "페이지 제목(h1)에는 붙이지 않습니다. 화면에서 가장 큰 제목에 설명 아이콘이 붙으면 어색합니다. 제목 아래에 설명 글을 적습니다.",
          ]}
        />
      </Section>

      <Section title="크기">
        <Demo>
          <Flex alignItems="center">
            <Text size={600} bold>1,280건</Text>
            <Informer label="전체 문서 수 설명" icon={InfoL}>
              <Text tag="p" size={200} m={0}>이번 달에 만든 문서의 수입니다.</Text>
            </Informer>
          </Flex>
          <Flex alignItems="center">
            <Text size={200}>평균 승인 시간</Text>
            <Informer label="평균 승인 시간 설명">
              <Text tag="p" size={200} m={0}>요청부터 승인까지 걸린 시간의 평균입니다.</Text>
            </Informer>
          </Flex>
        </Demo>
        <Table
          head={["옆 글자의 크기", "아이콘 크기", "누르는 영역", "쓰임"]}
          rows={[
            [<>36px(<Code>--ec-fs-700</Code>), 32px(<Code>--ec-fs-600</Code>)</>, "L", "24px × 24px", "가장 큰 숫자와 큰 컨트롤 옆에만 씁니다."],
            [<>24px(<Code>--ec-fs-500</Code>)보다 작은 글자</>, "M", "16px × 16px", "그 밖의 모든 자리."],
          ]}
        />
      </Section>

      <Section title="상태">
        <Table
          head={["상태", "모양"]}
          rows={[
            ["기본", <>아이콘 색은 회색(<Code>--ec-text-secondary</Code> 계열)입니다.</>],
            ["마우스를 올렸을 때·눌렀을 때", "아이콘이 한 단계 진해지고 마우스 커서가 손 모양으로 바뀝니다."],
            ["키보드 초점", "파란 초점 테두리가 나옵니다. 없애지 않습니다."],
          ]}
        />
      </Section>

      <Section title="설명 상자">
        <Rules
          items={[
            "제목 없이 본문만 적어도 됩니다. 두세 문장을 넘기지 않습니다.",
            "더 긴 설명이 필요하면 끝에 \"자세히 보기\" 링크를 둡니다.",
            "바깥을 누르거나 Esc를 누르면 닫힙니다.",
            "자세한 규칙은 Tooltip 문서를 따릅니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <P>여러 컨트롤이 모인 곳(필터 등)에서 한 컨트롤에 대한 설명을 붙일 때는 간격에 주의합니다. 아이콘은 설명하는 컨트롤에 4px로 붙이고, 다음 컨트롤과는 보통 간격(16px)을 둡니다.</P>
        <Demo caption="컨트롤 묶음 안에서">
          <Flex alignItems="center" gap={4}>
            <Flex alignItems="center">
              <Select options={PERIODS} defaultValue="7" aria-label="기간" />
              <Informer label="기간 설명">
                <Text tag="p" size={200} m={0}>문서를 만든 날을 기준으로 거릅니다.</Text>
              </Informer>
            </Flex>
            <Checkbox label="반려 문서 포함" />
          </Flex>
        </Demo>
        <P>컨트롤에 이름표가 있으면 아이콘을 컨트롤이 아니라 이름표 옆에 둡니다.</P>
        <Demo caption="이름표가 있을 때">
          <Flex direction="column" gap={1}>
            <Flex alignItems="center">
              <Text size={200} id="informer-period">기간</Text>
              <Informer label="기간 설명">
                <Text tag="p" size={200} m={0}>문서를 만든 날을 기준으로 거릅니다.</Text>
              </Informer>
            </Flex>
            <Select options={PERIODS} defaultValue="30" aria-labelledby="informer-period" />
          </Flex>
        </Demo>
        <DoDont
          good={{ text: "이름만으로 뜻을 알기 어려운 지표나 설정 옆에 붙입니다." }}
          bad={{ text: "꼭 읽어야 하는 내용을 아이콘 뒤에 숨기지 않습니다. 반드시 알아야 하는 것은 화면에 그대로 적습니다." }}
        />
      </Section>

      <Section title="다른 것과의 구분">
        <Table
          head={["쓰는 것", "언제"]}
          rows={[
            ["안내 표시", "자리가 좁고, 설명이 한 줄을 넘거나 링크가 들어갑니다. 눌러서 엽니다."],
            ["설명 풍선 (Tooltip)", "한 줄짜리 짧은 설명입니다. 마우스를 올리면 나옵니다."],
            ["글자 링크", "자리가 넉넉합니다. \"계산 방법 보기\"처럼 글자로 적습니다."],
          ]}
        />
      </Section>
    </Page>
  );
}

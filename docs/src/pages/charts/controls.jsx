import React from "react";
import { Card, Flex, Box, Button, Tooltip, Pills, Select, Divider, Text, DateRangePicker } from "@ec21rnc/ui";
import { Chart } from "@ec21rnc/ui/chart";
import SettingsM from "@semcore/icon/Settings/m";
import FileExportM from "@semcore/icon/FileExport/m";
import NoteM from "@semcore/icon/Note/m";
import ZoomPlusM from "@semcore/icon/ZoomPlus/m";
import ZoomMinusM from "@semcore/icon/ZoomMinus/m";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "차트 조작", order: 4 };

const monthly = [
  { 월: 1, 접수: 320, 승인: 260 },
  { 월: 2, 접수: 410, 승인: 330 },
  { 월: 3, 접수: 380, 승인: 340 },
  { 월: 4, 접수: 520, 승인: 410 },
  { 월: 5, 접수: 610, 승인: 480 },
  { 월: 6, 접수: 580, 승인: 510 },
];
const month = (v) => `${v}월`;

const teamOptions = ["전체 부서", "영업", "구매", "재무"].map((v) => ({ value: v, children: v }));

function IconButton({ title, icon: Icon }) {
  return (
    <Tooltip title={title}>
      <Button use="tertiary" theme="muted" aria-label={title}>
        <Button.Addon>
          <Icon />
        </Button.Addon>
      </Button>
    </Tooltip>
  );
}

function Period() {
  return (
    <Pills defaultValue="6개월" aria-label="기간">
      <Pills.Item value="1개월">1개월</Pills.Item>
      <Pills.Item value="6개월">6개월</Pills.Item>
      <Pills.Item value="1년">1년</Pills.Item>
    </Pills>
  );
}

function Frequency() {
  return (
    <Pills defaultValue="월" aria-label="집계 단위">
      <Pills.Item value="일">일</Pills.Item>
      <Pills.Item value="주">주</Pills.Item>
      <Pills.Item value="월">월</Pills.Item>
    </Pills>
  );
}

export default function ChartControlsPage() {
  return (
    <Page meta={meta} lead="차트가 든 카드에서 사용자가 보는 범위와 방식을 바꾸는 조작 요소입니다. 종류마다 놓는 자리가 정해져 있습니다. 차트 자체의 규칙은 차트 기본 구조를 봅니다.">
      <Section title="구성">
        <Demo caption="위 줄: 제목과 카드 전체 조작 / 아래 줄: 왼쪽은 데이터 고르기, 오른쪽은 기간과 집계 단위">
          <Card w={640}>
            <Card.Header>
              <Flex justifyContent="space-between" alignItems="center">
                <Card.Title>월별 문서 처리 건수</Card.Title>
                <Flex gap={1}>
                  <IconButton title="내보내기" icon={FileExportM} />
                  <IconButton title="차트 설정" icon={SettingsM} />
                </Flex>
              </Flex>
            </Card.Header>
            <Card.Body>
              <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Flex gap={2} alignItems="center">
                  <Select options={teamOptions} defaultValue="전체 부서" aria-label="부서" />
                  <Button>
                    <Button.Addon>
                      <NoteM />
                    </Button.Addon>
                    <Button.Text>메모</Button.Text>
                  </Button>
                </Flex>
                <Flex alignItems="center">
                  <Period />
                  <Divider orientation="vertical" mx={4} h={20} />
                  <Frequency />
                </Flex>
              </Flex>
              <Chart.Line data={monthly} groupKey="월" plotWidth={592} plotHeight={220} axisXValueFormatter={month} tooltipTitleFormatter={month} aria-label="월별 문서 처리 건수" />
            </Card.Body>
          </Card>
        </Demo>
        <Table
          head={["종류", "하는 일", "자리"]}
          rows={[
            ["카드 전체 조작", "카드 설정, 차트 표시 방식, 내보내기·화면 저장", "제목과 같은 줄의 오른쪽 끝"],
            ["데이터 고르기", "범례, 대상 고르기(부서, 유형, 지역), 메모", "차트 위 줄의 왼쪽"],
            ["기간과 단위", "기간, 직접 정한 기간, 집계 단위, 확대", "차트 위 줄의 오른쪽"],
          ]}
        />
      </Section>

      <Section title="카드 전체 조작">
        <Demo>
          <IconButton title="내보내기" icon={FileExportM} />
          <IconButton title="차트 설정" icon={SettingsM} />
        </Demo>
        <Rules
          items={[
            "항상 제목과 같은 높이에 둡니다. 차트 종류가 달라도 같은 자리에 있어야 찾기 쉽습니다.",
            <>약한 버튼의 차분한 색을 씁니다(<Code>use="tertiary"</Code>, <Code>theme="muted"</Code>). 데이터보다 눈에 띄면 안 됩니다.</>,
            "글자 없이 아이콘만 있는 버튼에는 반드시 설명 풍선을 답니다.",
            "차트 표시 방식(선을 부드럽게·꺾이게, 점 표시·숨김, 차트 종류 바꾸기)은 설정 버튼 안에 모읍니다.",
            "버튼이 셋을 넘으면 자주 쓰는 것만 남기고 나머지는 설정이나 더 보기 메뉴에 넣습니다.",
          ]}
        />
      </Section>

      <Section title="왼쪽에 두는 것">
        <Sub title="범례">
          <P>범례는 차트 위 왼쪽에 둡니다. 위쪽에 필터가 많아 자리가 없으면 차트 아래 왼쪽으로 내립니다. 자세한 규칙은 범례 페이지를 봅니다.</P>
        </Sub>
        <Sub title="대상 고르기">
          <Demo>
            <Select options={teamOptions} defaultValue="전체 부서" aria-label="부서" />
            <Text color="text-secondary">부서: 영업</Text>
          </Demo>
          <Rules
            items={[
              "부서, 문서 유형, 지역처럼 차트에 그릴 대상을 고르는 필터는 Select를 씁니다.",
              "고를 수 없고 알려 주기만 할 때는 Select 대신 보조 글자색의 글자로 적습니다.",
              "이 필터가 카드 하나에만 듣는지 화면 전체에 듣는지 분명해야 합니다. 화면 전체에 듣는 필터는 카드 밖 화면 위쪽에 둡니다.",
            ]}
          />
        </Sub>
        <Sub title="메모">
          <P>차트의 날짜에 붙이는 메모를 보이거나 관리하는 버튼입니다. 대상 고르기 옆에 둡니다. 자세한 규칙은 차트 메모 페이지를 봅니다.</P>
        </Sub>
      </Section>

      <Section title="오른쪽에 두는 것">
        <Sub title="기간">
          <Demo>
            <Period />
            <Text color="text-secondary">최근 6개월</Text>
          </Demo>
          <Rules
            items={[
              "정해진 기간 몇 개 가운데 고르게 할 때는 Pills를 씁니다.",
              <>기간을 바꿀 수 없으면 보조 글자색(<Code>--ec-text-secondary</Code>)의 글자로 "최근 6개월"처럼 적어 둡니다. 차트가 어느 기간인지는 항상 보여야 합니다.</>,
              "기간 선택지는 짧은 것에서 긴 것 순서로 놓습니다.",
            ]}
          />
        </Sub>
        <Sub title="직접 정하는 기간">
          <Demo>
            <DateRangePicker />
          </Demo>
          <P>사용자가 시작일과 종료일을 직접 고르게 할 때는 DateRangePicker를 씁니다. 날짜는 <Code>2026-11-25</Code> 형식으로 보여 줍니다.</P>
        </Sub>
        <Sub title="집계 단위">
          <Demo>
            <Frequency />
          </Demo>
          <Rules
            items={[
              "일·주·월처럼 값을 묶는 단위는 Pills로 고릅니다.",
              "기간이 짧아 뜻이 없는 단위는 끕니다. 예를 들어 기간이 1주일이면 \"월\"을 고를 수 없게 합니다.",
            ]}
          />
        </Sub>
        <Sub title="확대">
          <Demo>
            <IconButton title="확대" icon={ZoomPlusM} />
            <IconButton title="축소" icon={ZoomMinusM} />
            <Button use="tertiary" theme="muted">처음 범위로</Button>
          </Demo>
          <Rules
            items={[
              "긴 기간의 차트에서 일부를 크게 보게 할 때 확대 버튼을 둡니다.",
              "확대한 뒤에는 처음 범위로 돌아가는 버튼을 반드시 보여 줍니다.",
              "확대하면 기간 표시도 지금 보이는 범위로 바뀌어야 합니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="줄 합치기">
        <Demo caption="종류가 다른 조작 요소 사이에는 세로 구분선을 넣습니다">
          <Flex alignItems="center">
            <Period />
            <Divider orientation="vertical" mx={4} h={20} />
            <Frequency />
          </Flex>
        </Demo>
        <Rules
          items={[
            "자리가 넉넉하면 조작 요소의 줄을 하나로 합칠 수 있습니다.",
            <>서로 다른 조작 요소나 묶음 사이에는 세로 구분선(Divider)을 넣습니다. 색은 <Code>--ec-border</Code>, 좌우 여백은 16px입니다.</>,
            "합쳐도 왼쪽·오른쪽 자리는 바꾸지 않습니다. 데이터 고르기는 왼쪽, 기간과 단위는 오른쪽입니다.",
            "좁은 화면에서 한 줄에 들어가지 않으면 두 줄로 나눕니다. 요소를 줄이거나 글자를 자르지 않습니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "조작하면 바로 차트에 반영합니다. \"적용\" 버튼을 따로 두지 않습니다.",
            "다시 불러오는 동안에는 이전 차트를 흐리게 두거나 뼈대를 보여 주고, 조작 요소는 그대로 둡니다.",
            "고른 값은 화면을 새로 열어도 기억하는 편이 좋습니다. 적어도 같은 화면 안에서는 유지합니다.",
            "조작한 결과 데이터가 없으면 빈 상태를 보여 주고, 조건을 되돌릴 방법을 알려 줍니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Flex justifyContent="space-between" alignItems="center" w={420}>
                <Select options={teamOptions} defaultValue="전체 부서" aria-label="부서" />
                <Frequency />
              </Flex>
            ),
            text: "무엇을 볼지는 왼쪽, 언제를 볼지는 오른쪽에 둡니다.",
          }}
          bad={{
            demo: (
              <Flex justifyContent="space-between" alignItems="center" w={420}>
                <Frequency />
                <Select options={teamOptions} defaultValue="전체 부서" aria-label="부서" />
              </Flex>
            ),
            text: "카드마다 자리를 바꾸지 않습니다. 사용자는 자리로 기억합니다.",
          }}
        />
        <DoDont
          good={{ text: "카드 하나에만 듣는 조작은 그 카드 안에 둡니다." }}
          bad={{ text: "카드 안의 조작이 옆 카드의 차트까지 바꾸게 하지 않습니다." }}
        />
      </Section>
    </Page>
  );
}

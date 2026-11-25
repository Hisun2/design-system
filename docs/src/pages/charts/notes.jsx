import React from "react";
import { Card, Flex, Button, Counter } from "@ec21rnc/ui";
import { Chart } from "@ec21rnc/ui/chart";
import NoteM from "@semcore/icon/Note/m";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "차트 메모", order: 6 };

const monthly = [
  { 월: 1, 접수: 320 },
  { 월: 2, 접수: 410 },
  { 월: 3, 접수: 380 },
  { 월: 4, 접수: 520 },
  { 월: 5, 접수: 610 },
  { 월: 6, 접수: 580 },
];
const month = (v) => `${v}월`;

function NotesButton() {
  return (
    <Button>
      <Button.Addon>
        <NoteM />
      </Button.Addon>
      <Button.Text>메모</Button.Text>
      <Button.Addon>
        <Counter>2</Counter>
      </Button.Addon>
    </Button>
  );
}

export default function ChartNotesPage() {
  return (
    <Page meta={meta} lead="차트의 특정 날짜에 붙이는 짧은 기록입니다. 숫자가 왜 바뀌었는지 알려 주는 일(양식 변경, 점검, 마감일)을 차트 위에 남겨 둡니다.">
      <Section title="구성">
        <Demo caption="메모 버튼은 차트 위에, 메모가 있는 날짜는 차트에 세로 선으로 표시">
          <Card w={560}>
            <Card.Header>
              <Card.Title>월별 접수 건수</Card.Title>
            </Card.Header>
            <Card.Body>
              <Flex mb={4}>
                <NotesButton />
              </Flex>
              <Chart.Line
                data={monthly}
                groupKey="월"
                referenceLine={[{ value: 2 }, { value: 4 }]}
                plotWidth={512}
                plotHeight={200}
                axisXValueFormatter={month}
                tooltipTitleFormatter={month}
                aria-label="메모가 표시된 월별 접수 건수"
              />
            </Card.Body>
          </Card>
        </Demo>
        <Table
          head={["요소", "하는 일"]}
          rows={[
            ["메모 버튼", "메모 목록을 열고, 새 메모를 쓰고, 차트에 표시할지 정합니다."],
            ["날짜 표시", "메모가 있는 날짜를 차트에 표시합니다. 마우스를 올리면 그 날짜의 메모가 나옵니다."],
            ["메모", "날짜, 제목, 내용, 쓴 사람(또는 출처)으로 이루어집니다."],
          ]}
        />
        <P>
          메모만을 위한 컴포넌트는 따로 없습니다. 버튼(Button), 날짜 표시(<Code>referenceLine</Code>), 목록을 띄우는 팝업을 조합해 만듭니다.
        </P>
      </Section>

      <Section title="종류">
        <Table
          head={["만든 쪽", "예", "고치고 지울 수 있는 사람"]}
          rows={[
            ["사용자", "\"견적서 양식을 바꿈\", \"담당자 교체\"", "쓴 사람. 함께 보는 메모는 권한이 있는 사람"],
            ["시스템", "\"정기 점검으로 수집 중단\", \"집계 기준 변경\"", "고칠 수 없음. 숨길 수만 있음"],
            ["다른 서비스", "연결된 서비스가 보낸 일정이나 공지", "고칠 수 없음. 숨길 수만 있음"],
          ]}
        />
        <Rules
          items={[
            "누가 만든 메모인지 구분해서 보여 줍니다. 사용자가 쓴 메모와 시스템이 남긴 메모가 섞여 보이면 안 됩니다.",
            "한 날짜에 붙일 수 있는 메모의 수에는 제한을 두지 않습니다.",
            "한 날짜에 메모가 여럿이면 차트에는 표시 하나만 두고, 마우스를 올렸을 때 개수와 목록을 보여 줍니다.",
          ]}
        />
      </Section>

      <Section title="자리">
        <Rules
          items={[
            "메모 버튼은 차트 위에 둡니다. 차트 조작의 왼쪽 묶음(범례, 대상 고르기) 옆입니다.",
            "위에 자리가 정말 없을 때만 차트 아래에 둡니다.",
            "메모가 있으면 버튼에 개수를 함께 보여 줍니다.",
            "날짜 표시는 가로축에 붙여 그리고, 데이터의 선이나 막대를 가리지 않게 합니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "메모 버튼을 누르면 메모 목록이 열립니다. 목록에서 새 메모를 쓰거나 고치거나 지웁니다.",
            "차트의 날짜를 눌러 그 날짜의 메모를 바로 쓸 수 있게 하면 더 좋습니다.",
            "차트의 날짜 표시에 마우스를 올리면 그 날짜의 메모 제목이 설명 상자에 나옵니다.",
            "메모 표시는 켜고 끌 수 있어야 합니다. 꺼도 메모는 지워지지 않습니다.",
            "차트의 기간을 바꾸면 그 기간에 든 메모만 표시합니다.",
            "메모를 지울 때는 확인을 받습니다. 지운 메모는 되돌릴 수 없습니다.",
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "메모 제목은 한 줄로, 무슨 일이 있었는지 적습니다. \"양식 변경\", \"점검으로 수집 중단\".",
            "내용에는 숫자에 어떤 영향이 있는지 적습니다.",
            <>날짜는 <Code>2026-11-25</Code> 형식으로 적습니다.</>,
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ demo: <NotesButton />, text: "메모 버튼에 개수를 함께 보여 줍니다." }}
          bad={{ text: "메모 내용을 차트 위에 글자로 펼쳐 놓지 않습니다. 데이터를 가립니다. 표시만 두고 내용은 마우스를 올렸을 때 보여 줍니다." }}
        />
        <DoDont
          good={{ text: "숫자가 크게 달라진 이유를 아는 날짜에 메모를 남깁니다." }}
          bad={{ text: "차트 설명에 적을 내용(데이터 출처, 단위)을 메모로 남기지 않습니다. 메모는 특정 날짜의 일에만 씁니다." }}
        />
      </Section>
    </Page>
  );
}

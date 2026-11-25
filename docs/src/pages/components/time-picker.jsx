import React from "react";
import { TimePicker, Flex, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "TimePicker" };

function ControlledPicker() {
  const [value, setValue] = React.useState("14:30");
  return (
    <Flex gap={3} alignItems="center">
      <TimePicker value={value} onChange={setValue} />
      <Text size={200} color="text-secondary">고른 값 {value}</Text>
    </Flex>
  );
}

export default function TimePickerPage() {
  return (
    <Page meta={meta} lead="시와 분을 직접 넣거나 목록에서 골라 시간을 정하는 입력창입니다. 시 칸과 분 칸이 한 상자 안에 나란히 있습니다.">
      <Section title="구성">
        <Demo>
          <ControlledPicker />
        </Demo>
        <Table
          head={["부품", "역할"]}
          rows={[
            [<Code>TimePicker.Hours</Code>, "시를 넣는 칸입니다. 누르면 고를 수 있는 시의 목록이 열립니다."],
            [<Code>TimePicker.Separator</Code>, "시와 분 사이의 쌍점(:)입니다."],
            [<Code>TimePicker.Minutes</Code>, "분을 넣는 칸입니다. 누르면 고를 수 있는 분의 목록이 열립니다."],
            [<Code>TimePicker.Format</Code>, "오전·오후를 바꾸는 단추입니다. 12시간제에서만 나옵니다."],
          ]}
        />
        <P>값은 <Code>"14:30"</Code>처럼 24시간제 글자로 주고받습니다. 화면에 12시간제로 보이더라도 값은 24시간제입니다.</P>
      </Section>

      <Section title="표기">
        <Demo caption="24시간제(기본) / 12시간제(is12Hour)">
          <TimePicker defaultValue="14:30" />
          <TimePicker defaultValue="14:30" is12Hour />
        </Demo>
        <Rules
          items={[
            "우리 화면의 시간은 24시간제 14:30 모양으로 적습니다. TimePicker도 24시간제를 기본으로 씁니다.",
            "12시간제는 해외 사용자에게 보여 주는 화면처럼 꼭 필요한 곳에서만 씁니다.",
          ]}
        />
      </Section>

      <Section title="크기">
        <Demo caption="M · 32px(기본) / L · 44px">
          <TimePicker size="m" defaultValue="09:00" />
          <TimePicker size="l" defaultValue="09:00" />
        </Demo>
        <Rules
          items={[
            "같은 줄에 놓인 DatePicker, Input과 같은 크기를 씁니다.",
            "날짜와 함께 받을 때는 날짜 입력창 오른쪽에 8px 띄워 둡니다.",
          ]}
        />
      </Section>

      <Section title="고를 수 있는 값의 간격">
        <Demo caption="1분 단위(기본) / 15분 단위(step={15})">
          <TimePicker defaultValue="13:13" />
          <TimePicker defaultValue="13:15">
            <TimePicker.Hours />
            <TimePicker.Separator />
            <TimePicker.Minutes step={15} />
          </TimePicker>
        </Demo>
        <Table
          head={["간격", "언제 쓰는가"]}
          rows={[
            ["1분 단위", "13:13처럼 분까지 정확한 시간이 필요할 때"],
            ["정해 둔 간격(00, 15, 30, 45 등)", "회의, 방문, 발송 예약처럼 일정한 간격으로만 받을 때"],
          ]}
        />
        <Rules
          items={[
            <>간격은 <Code>TimePicker.Minutes</Code>와 <Code>TimePicker.Hours</Code>의 <Code>step</Code>으로 정합니다.</>,
            "한 화면 안에서 시 칸과 분 칸의 방식이 달라도 됩니다. 시는 1시간 단위, 분은 15분 단위로 둘 수 있습니다.",
          ]}
        />
      </Section>

      <Section title="상태">
        <Demo caption="기본 / 오류 / 비활성">
          <TimePicker defaultValue="09:00" />
          <TimePicker defaultValue="09:00" state="invalid" />
          <TimePicker defaultValue="09:00" disabled />
        </Demo>
        <Rules
          items={[
            "상태별 모양은 Input과 같습니다.",
            "칸에 초점을 두고 숫자를 넣거나, 열린 목록에서 방향키와 Enter로 고릅니다.",
            "시 칸을 다 채우면 초점이 분 칸으로 넘어갑니다.",
          ]}
        />
      </Section>

      <Section title="검사">
        <Sub title="검사가 필요한 경우">
          <Rules
            items={[
              "시작 시간과 끝 시간처럼 시간을 여러 개 받고, 그 값이 서로 같으면 안 될 때",
              "지난 시간이나 앞으로의 시간을 고를 수 없을 때. 이때는 날짜에 따라 결과가 달라지므로 날짜와 시간 묶음 전체를 함께 검사합니다.",
            ]}
          />
        </Sub>
        <Sub title="검사하는 방법">
          <Demo caption="날짜·시간 묶음의 모든 칸이 오류 상태가 됩니다">
            <TimePicker defaultValue="18:00" state="invalid" />
            <TimePicker defaultValue="09:00" state="invalid" />
          </Demo>
          <Rules
            items={[
              "검사는 폼 전체를 제출할 때 합니다. 넣는 도중에는 오류를 띄우지 않습니다.",
              "걸리면 날짜와 시간을 정하는 모든 칸을 오류 상태로 바꿉니다.",
              "오류 내용은 첫 번째 칸에 설명 풍선으로 보여 줍니다. 이때 초점을 그 칸으로 옮기지는 않습니다.",
              "문구는 \"끝 시간은 시작 시간보다 늦어야 합니다\"처럼 고치는 방법을 적습니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Flex direction="column" gap={1}>
                <Text size={200}>방문 시간</Text>
                <TimePicker defaultValue="14:30" />
              </Flex>
            ),
            text: "이름표를 붙이고 24시간제로 받습니다.",
          }}
          bad={{
            demo: (
              <Flex direction="column" gap={1}>
                <Text size={200}>방문 시간:</Text>
                <TimePicker defaultValue="14:30" is12Hour />
              </Flex>
            ),
            text: "이름표 끝에 쌍점을 붙이지 않습니다. 국내 업무 화면에서 12시간제를 쓰지 않습니다.",
          }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["상황", "쓸 것"]}
          rows={[
            ["시와 분을 받을 때", "TimePicker"],
            ["날짜를 받을 때", "DatePicker"],
            ["\"오전\", \"오후\", \"종일\"처럼 몇 가지 시간대 가운데 고를 때", "Select 또는 Radio"],
            ["걸리는 시간(분, 시간 수)을 받을 때", "InputNumber"],
          ]}
        />
      </Section>
    </Page>
  );
}

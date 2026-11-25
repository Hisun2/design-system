import React from "react";
import { DatePicker, DateRangePicker, MonthPicker, MonthRangePicker, DateRangeComparator } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "DatePicker" };

const day = 24 * 60 * 60 * 1000;
const today = new Date(2026, 10, 25);
const periods = [
  { children: "최근 7일", value: [new Date(today.getTime() - 6 * day), today] },
  { children: "최근 30일", value: [new Date(today.getTime() - 29 * day), today] },
  { children: "이번 달", value: [new Date(2026, 10, 1), today] },
];

export default function DatePickerPage() {
  return (
    <Page meta={meta} lead="날짜 하나나 기간을 적거나 달력에서 고르는 요소입니다. 하루, 날짜 범위, 한 달, 달 범위를 고르는 네 가지와 두 기간을 견주는 한 가지가 있습니다.">
      <Section title="종류">
        <Table
          head={["컴포넌트", "고르는 것", "쓰는 예"]}
          rows={[
            [<Code>DatePicker</Code>, "하루", "승인 기한, 계약일"],
            [<Code>DateRangePicker</Code>, "날짜 범위 (며칠·몇 주)", "문서 조회 기간"],
            [<Code>MonthPicker</Code>, "한 달", "정산 월"],
            [<Code>MonthRangePicker</Code>, "달 범위", "분기·반기 실적 기간"],
            [<Code>DateRangeComparator</Code>, "견줄 두 기간", "이번 달과 지난달 승인 건수 비교"],
          ]}
        />
      </Section>

      <Section title="누르는 부분">
        <Demo caption="하루 / 날짜 범위 / 한 달 / 달 범위">
          <DatePicker />
          <DateRangePicker />
          <MonthPicker />
          <MonthRangePicker />
        </Demo>
        <Rules
          items={[
            "누르는 부분은 Input을 바탕으로 합니다. 달력을 열지 않고 숫자를 직접 적어도 됩니다.",
            "값이 없을 때는 적는 꼴을 안내 글자로 보여 줍니다.",
            "크기는 M(32px)과 L(44px)입니다. 옆의 입력창과 맞춥니다.",
          ]}
        />
        <Table
          head={["경우", "보이는 꼴"]}
          rows={[
            ["값 없음", "연도-월-일 자리 안내"],
            ["하루", "2026-11-25"],
            ["같은 달 안의 범위", "2026-11-03–2026-11-25"],
            ["같은 해 안의 범위", "2026-09-01–2026-11-25"],
            ["해가 다른 범위", "2025-12-01–2026-11-25"],
            ["한 달", "2026-11"],
            ["같은 해 안의 달 범위", "2026-07–2026-11"],
            ["해가 다른 달 범위", "2025-12–2026-11"],
          ]}
        />
        <P>범위는 줄표(–)로 잇습니다. 줄표 앞뒤에 빈칸을 넣지 않습니다. 날짜는 언제나 연도 네 자리부터 적습니다.</P>
      </Section>

      <Section title="적용 버튼">
        <Rules
          items={[
            "고른 날짜는 날짜를 누르는 순간, 또는 \"적용\" 버튼을 누르는 순간 반영됩니다.",
            "범위를 고를 때, 그리고 날짜를 바꾸면 화면의 다른 조건이 함께 달라질 때는 \"적용\" 버튼을 둡니다.",
            "필요하면 어느 종류에든 \"적용\" 버튼을 더할 수 있습니다.",
          ]}
        />
      </Section>

      <Section title="DatePicker — 하루">
        <Demo caption="기본 / 오늘 버튼 포함 / 고를 수 없는 날 지정">
          <DatePicker />
          <DatePicker>
            <DatePicker.Trigger />
            <DatePicker.Popper>
              <DatePicker.Header>
                <DatePicker.Prev />
                <DatePicker.Title />
                <DatePicker.Next />
              </DatePicker.Header>
              <DatePicker.Calendar />
              <DatePicker.Today />
            </DatePicker.Popper>
          </DatePicker>
          <DatePicker disabled={[[false, new Date(2026, 10, 24)]]} defaultDisplayedPeriod={today} />
        </Demo>
        <Rules
          items={[
            "날짜를 누르면 달력이 닫히고 누르는 부분의 값이 바뀝니다.",
            "고를 수 없는 날은 흐리게 보이고, 눌러도 아무 일도 일어나지 않습니다.",
            "달력 칸 사이, 달력과 상자 테두리 사이 간격은 4px의 배수를 지킵니다.",
          ]}
        />
        <Sub title="오늘 버튼">
          <P>달력 아래에 "오늘" 버튼을 둘 수 있습니다. 누르면 오늘 날짜가 선택되고, 다른 달을 보고 있었다면 이번 달로 돌아옵니다.</P>
        </Sub>
        <Sub title="시간과 함께">
          <P>달력 상자 안에 TimePicker를 넣어 날짜와 시간을 함께 고르게 할 수 있습니다. 시간은 24시간제(14:30)로 보여 줍니다.</P>
        </Sub>
        <Sub title="날짜 칸에 덧붙이기">
          <P>날짜 칸 안에 작은 요소를 더할 수 있습니다. 예를 들어 날짜 아래에 가는 진행 막대를 넣어 그날의 처리율을 보여 줍니다. 숫자를 가리지 않을 만큼만 넣습니다.</P>
        </Sub>
      </Section>

      <Section title="MonthPicker — 한 달">
        <Demo>
          <MonthPicker />
        </Demo>
        <Rules
          items={[
            "달을 누르면 상자가 닫히고 누르는 부분의 값이 바뀝니다.",
            "한 해의 열두 달을 한 묶음으로 보여 줍니다. 두 해를 나란히 보여 줄 수도 있지만, 그 꼴은 주로 범위를 고를 때 씁니다.",
            "달 칸 사이 간격도 4px의 배수를 지킵니다.",
          ]}
        />
      </Section>

      <Section title="DateRangePicker — 날짜 범위">
        <Demo caption="기본 / 자주 쓰는 기간 포함">
          <DateRangePicker />
          <DateRangePicker periods={periods} defaultDisplayedPeriod={today} />
        </Demo>
        <Rules
          items={[
            "달력에 두 달을 나란히 보여 줍니다.",
            "시작일과 끝일을 고른 뒤 \"적용\"을 눌러야 누르는 부분의 값이 바뀝니다.",
            "\"최근 7일\", \"이번 달\"처럼 자주 쓰는 기간을 옆에 둘 수 있습니다. 기간의 종류와 이름은 화면에 맞게 정합니다. 고른 기간은 눌린 모양으로 표시됩니다.",
            "\"초기화\" 버튼을 두어 고른 값을 지울 수 있습니다. 지우면 누르는 부분은 안내 글자로 돌아갑니다.",
          ]}
        />
        <Sub title="한 주 고르기">
          <P>한 주를 통째로 고르게 할 때도 DateRangePicker를 씁니다. 범위 고르기와 같지만 달력에 한 달만 보여 주고, 날짜에 마우스를 올리면 그 주 전체가 표시됩니다.</P>
        </Sub>
      </Section>

      <Section title="MonthRangePicker — 달 범위">
        <Demo>
          <MonthRangePicker />
        </Demo>
        <Rules
          items={[
            "두 해를 나란히 보여 줍니다.",
            "시작 달과 끝 달을 고른 뒤 \"적용\"을 눌러야 값이 바뀝니다.",
            "\"최근 3개월\", \"올해\"처럼 자주 쓰는 기간을 옆에 둘 수 있습니다.",
          ]}
        />
      </Section>

      <Section title="DateRangeComparator — 두 기간 견주기">
        <Demo>
          <DateRangeComparator />
        </Demo>
        <Rules
          items={[
            "두 기간을 골라 서로 견줍니다. 두 기간은 겹쳐도 되고 떨어져 있어도 됩니다.",
            <>누르는 부분에는 기간마다 색 표시가 붙습니다. 첫째 기간은 파랑(<Code>--ec-control-primary-info</Code>), 둘째 기간은 <Code>--ec-chart-3</Code> 색입니다. 달력에서도 같은 색으로 칠합니다.</>,
            "색만으로 구분하지 않도록 입력창 앞에 \"기준 기간\", \"비교 기간\"이라는 이름을 함께 적습니다.",
          ]}
        />
        <Table
          head={["단계", "모습"]}
          rows={[
            ["처음", "둘째 기간의 입력창은 비활성입니다. \"비교\" 체크박스를 켜야 쓸 수 있습니다."],
            ["비교를 켬", "선택이 둘째 기간의 입력창으로 옮겨 갑니다. 옆의 자주 쓰는 기간 목록도 둘째 기간용(\"직전 기간\", \"지난해 같은 기간\")으로 바뀝니다."],
            ["날짜를 고름", "고른 날짜가 입력창에 바로 나타납니다."],
            ["적용", "\"적용\"을 눌러야 두 기간이 화면에 반영됩니다."],
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <DateRangePicker periods={periods} defaultDisplayedPeriod={today} />,
            text: "자주 쓰는 기간을 함께 두어 한 번에 고르게 합니다.",
          }}
          bad={{
            text: "생년월일처럼 오래전 날짜를 달력만으로 고르게 하지 않습니다. 직접 적을 수 있어야 합니다.",
          }}
        />
        <Rules
          items={[
            "고를 수 없는 날이 있으면 왜 고를 수 없는지 알립니다(disabledErrorText).",
            "이름표 끝에 쌍점(:)을 붙이지 않습니다. 예: \"조회 기간\"",
            "달력은 처음부터 열어 두지 않습니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

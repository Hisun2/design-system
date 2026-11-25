import React from "react";
import { UiProvider, NoData, WidgetError, TimePicker, Box } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "UiProvider" };

export default function UiProviderPage() {
  return (
    <Page meta={meta} lead="앱의 맨 바깥을 한 번 감싸는 틀입니다. 컴포넌트 안에 들어 있는 기본 문구의 언어를 한국어로 맞춥니다. 화면에 보이는 것은 없습니다. 우리가 따로 만든 컴포넌트입니다.">
      <Section title="하는 일">
        <P>
          컴포넌트 가운데에는 스스로 문구를 가진 것이 있습니다. 빈 상태의 제목, 필터의 "필터 추가", 닫기 버튼의 이름 같은 것입니다. 이 문구는 감싸지 않으면 영어로 나옵니다. UiProvider로 감싸면 그 안의 모든 컴포넌트가 한국어 문구를 씁니다.
        </P>
        <Demo caption="UiProvider 안 — 제목이 한국어로 나옵니다">
          <UiProvider>
            <Box w={280}><NoData type="nothing-found" /></Box>
            <Box w={280}><WidgetError /></Box>
          </UiProvider>
        </Demo>
        <Demo caption="locale=&quot;en&quot; — 같은 컴포넌트가 영어로 나옵니다">
          <UiProvider locale="en">
            <Box w={280}><NoData type="nothing-found" /></Box>
            <TimePicker defaultValue="14:30" is12Hour />
          </UiProvider>
        </Demo>
      </Section>

      <Section title="쓰는 법">
        <Table
          head={["속성", "기본값", "뜻"]}
          rows={[
            [<Code>locale</Code>, <Code>"ko"</Code>, "기본 문구의 언어입니다. 주지 않으면 한국어입니다."],
            [<Code>children</Code>, "—", "앱 전체입니다."],
          ]}
        />
        <Rules
          items={[
            "앱의 가장 바깥에서 한 번만 감쌉니다. 화면마다, 컴포넌트마다 다시 감싸지 않습니다.",
            <>스타일(<Code>@ec21rnc/ui/styles.css</Code>)도 같은 자리에서 한 번 불러옵니다.</>,
            "모달, 드롭다운, 설명 풍선처럼 화면 위에 따로 뜨는 요소에도 그대로 적용됩니다.",
            <>사내 업무 화면은 한국어가 기준입니다. <Code>locale</Code>은 해외 사용자에게 보여 주는 화면을 만들 때만 바꿉니다.</>,
            "이 문서 사이트의 예시도 모두 UiProvider 안에서 그려집니다.",
          ]}
        />
        <DoDont
          good={{ text: "앱을 시작하는 파일에서 <UiProvider>로 전체를 한 번 감쌉니다." }}
          bad={{ text: "감싸지 않은 채 쓰지 않습니다. \"Nothing found\", \"Add filter\" 같은 영어 문구가 한국어 화면에 섞여 나옵니다." }}
        />
      </Section>

      <Section title="바뀌는 것과 바뀌지 않는 것">
        <Table
          head={["구분", "예", "어떻게 되는가"]}
          rows={[
            ["컴포넌트가 스스로 가진 문구", "NoData의 \"결과가 없습니다\", AddFilter의 \"필터 추가\"·\"필터 지우기\", 달력의 요일과 달 이름", "UiProvider가 한국어로 바꿉니다."],
            ["화면 낭독기가 읽는 이름", "닫기 버튼, 지우기 버튼, 불러오는 중 표시의 이름", "UiProvider가 한국어로 바꿉니다."],
            ["우리가 직접 적는 문구", "버튼 글자, 이름표, 안내 글자, 오류 문구", "바뀌지 않습니다. 화면을 만들 때 한국어로 적습니다."],
            ["날짜·숫자·금액의 모양", "2026-11-25, 14:30, 12,480원", "바뀌지 않습니다. 글쓰기 규칙에 맞춰 직접 맞춥니다."],
          ]}
        />
        <P>컴포넌트의 기본 문구가 우리 글쓰기 규칙과 맞지 않으면 그 컴포넌트에 문구를 직접 넘겨 바꿉니다. 예를 들어 NoData의 설명은 <Code>description</Code>으로 적습니다.</P>
      </Section>
    </Page>
  );
}

import React from "react";
import { Pagination, UiProvider } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "다국어", order: 6 };

// 기본 제공 언어에 없는 언어 코드와 그 문구를 직접 넣는 예
const custom = {
  "ko-simple": {
    prevPageLabel: "앞",
    nextPageLabel: "뒤",
    pageInputLabel: "쪽",
    totalPagesLabel: "/",
    pagination: "쪽 이동",
    firstPage: "첫 쪽",
    lastPage: "마지막 쪽 {lastPageNumber}",
  },
};

export default function I18nPage() {
  return (
    <Page meta={meta} lead="컴포넌트 안에 들어 있는 기본 문구의 언어를 정하는 방법입니다. 우리 시스템은 한국어로 고정하며, 앱 맨 바깥의 UiProvider가 이를 맡습니다.">
      <Section title="컴포넌트 안의 문구">
        <Demo caption="쪽 번호 매기기의 &quot;이전&quot;, &quot;다음&quot;, &quot;페이지:&quot;는 컴포넌트가 갖고 있는 문구입니다" column>
          <Pagination totalPages={12} />
        </Demo>
        <Rules
          items={[
            "몇몇 컴포넌트는 사람이 읽는 문구를 스스로 갖고 있습니다. 날짜 고르기의 \"적용\", \"초기화\", \"오늘\", 쪽 번호 매기기의 \"이전\", \"다음\", 선택 상자의 \"결과 없음\" 등입니다.",
            "화면을 읽어 주는 도구에만 들리는 이름(닫기 버튼, 차트 요약)도 여기에 들어 있습니다.",
            "이 문구는 화면의 언어와 같아야 합니다. 언어를 정하지 않으면 영어로 나옵니다.",
            "기본으로 들어 있는 언어는 독일어(de), 영어(en), 스페인어(es), 프랑스어(fr), 이탈리아어(it), 일본어(ja), 한국어(ko), 네덜란드어(nl), 폴란드어(pl), 포르투갈어(pt), 스웨덴어(sv), 튀르키예어(tr), 베트남어(vi), 중국어(zh)입니다.",
            "이 기능은 컴포넌트 안의 문구만 다룹니다. 화면에 우리가 적는 문구(제목, 버튼 글자, 안내문)의 번역과는 관계없습니다.",
          ]}
        />
      </Section>

      <Section title="우리 설정: UiProvider">
        <P>
          앱의 맨 바깥을 <Code>UiProvider</Code>로 한 번 감쌉니다. 그 안의 모든 컴포넌트가 한국어 문구를 씁니다. <Code>locale</Code>의 기본값이 <Code>"ko"</Code>이므로 아무것도 주지 않아도 됩니다.
        </P>
        <P>
          <Code>{"<UiProvider><App /></UiProvider>"}</Code>
        </P>
        <Rules
          items={[
            <><Code>UiProvider</Code>는 <Code>@ec21rnc/ui</Code>에서 불러옵니다. Intergalactic의 <Code>I18nProvider</Code>를 감싼 것이며, 그것을 직접 불러오지 않습니다.</>,
            "앱마다 맨 바깥에 한 번만 둡니다. 화면이나 컴포넌트마다 두지 않습니다.",
            "UiProvider로 감싸지 않으면 컴포넌트 안의 문구가 영어로 나옵니다. 새 앱을 만들면 가장 먼저 확인합니다.",
            "이 문서 사이트와 시험 화면도 같은 방법으로 감싸져 있습니다.",
          ]}
        />
        <Sub title="일부 구역만 다른 언어로">
          <Demo caption="UiProvider locale=&quot;en&quot;으로 감싼 구역" column>
            <UiProvider locale="en">
              <Pagination totalPages={12} />
            </UiProvider>
          </Demo>
          <Rules
            items={[
              <>화면의 일부만 다른 언어여야 하면 그 구역을 <Code>UiProvider</Code>로 한 번 더 감싸고 <Code>locale</Code>을 줍니다. 안쪽 것이 이깁니다.</>,
              "우리 시스템은 한국어만 씁니다. 해외 거래처에 보내는 영문 문서의 미리보기처럼 꼭 필요한 경우에만 씁니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="컴포넌트 하나의 언어와 문구">
        <Table
          head={["속성", "뜻"]}
          rows={[
            [<Code>locale</Code>, "그 컴포넌트가 쓸 언어 코드"],
            [<Code>i18n</Code>, "언어 코드별 문구 묶음. 기본으로 없는 언어의 문구를 넣을 때 씁니다."],
          ]}
        />
        <Demo caption="기본에 없는 언어 코드와 문구를 직접 넣은 예" column>
          <UiProvider locale="ko-simple">
            <Pagination totalPages={12} i18n={custom} />
          </UiProvider>
        </Demo>
        <Rules
          items={[
            <>문구가 있는 컴포넌트는 <Code>locale</Code>과 <Code>i18n</Code> 속성을 받습니다.</>,
            <><Code>UiProvider</Code> 안에서는 컴포넌트에 준 <Code>locale</Code>보다 UiProvider의 언어가 먼저입니다. 그래서 우리 앱에서는 컴포넌트의 <Code>locale</Code>만 바꿔서는 언어가 바뀌지 않습니다. 구역을 UiProvider로 감싸는 방법을 씁니다.</>,
            <><Code>i18n</Code>에는 그 컴포넌트가 쓰는 문구 이름을 모두 적습니다. 빠진 것은 빈 채로 나옵니다. 문구 이름은 컴포넌트마다 다릅니다.</>,
            "지금 버전에서는 이미 있는 언어(예: ko)의 문구를 i18n으로 덮어써도 기본 문구가 그대로 나옵니다. 기본 한국어 문구를 바꿔야 하면 디자인 시스템 담당자에게 요청합니다.",
            "컴포넌트 안의 문구를 화면마다 다르게 바꾸지 않습니다. 같은 컴포넌트는 어디서나 같은 말을 써야 합니다.",
          ]}
        />
      </Section>

      <Section title="묶음 파일에서 쓰지 않는 언어 빼기">
        <P>
          기본으로는 모든 언어의 문구가 앱의 주 묶음 파일에 들어갑니다. 우리는 한국어만 쓰므로 나머지는 빼는 것이 좋습니다. 빌드 도구에 <Code>@semcore/i18n-unplugin</Code>의 플러그인을 넣어 조정합니다. Vite, Rollup, Webpack, esbuild용이 있습니다.
        </P>
        <Table
          head={["설정", "뜻", "우리 값"]}
          rows={[
            [<Code>bundleLocales</Code>, "주 묶음 파일에 넣을 언어. 나머지는 언어별 파일로 따로 나뉘어 필요할 때 불러옵니다.", <Code>["ko"]</Code>],
            [<Code>includeLocales</Code>, "묶음에 넣을 언어. 여기 없는 언어는 아예 빠집니다.", <Code>["ko"]</Code>],
            [<Code>excludeLocales</Code>, "묶음에서 뺄 언어. includeLocales와 반대로 적는 방법입니다.", "쓰지 않음"],
          ]}
        />
        <P>
          Vite에서는 <Code>vite.config.js</Code>의 <Code>plugins</Code>에 <Code>{'intergalacticI18nVitePlugin({ bundleLocales: ["ko"], includeLocales: ["ko"] })'}</Code>를 넣습니다. Webpack은 <Code>intergalacticI18nWebpackPlugin</Code>, Rollup은 <Code>intergalacticI18nRollupPlugin</Code>, esbuild는 <Code>intergalacticI18nEsbuildPlugin</Code>을 같은 설정으로 씁니다.
        </P>
        <Rules
          items={[
            "세 설정 모두 넣지 않아도 됩니다. 넣지 않으면 모든 언어가 주 묶음에 들어갑니다.",
            "이 플러그인은 컴포넌트 안의 문구에만 작용합니다. 앱이 직접 가진 번역 파일에는 쓸 수 없습니다.",
            "이 패키지는 @ec21rnc/ui에 들어 있지 않습니다. 묶음 크기를 줄여야 하는 앱에서 따로 설치합니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "앱 맨 바깥을 UiProvider로 한 번 감쌉니다." }}
          bad={{ text: "컴포넌트마다 locale을 주거나, 영어로 나온 문구를 화면에서 따로 가리고 다시 적지 않습니다." }}
        />
      </Section>
    </Page>
  );
}

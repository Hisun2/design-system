import React from "react";
import { Page, Section, P, Rules, Table, Code, Swatch } from "../../kit.jsx";

export const meta = { title: "디자인 토큰", order: 1 };

export default function TokensPage() {
  return (
    <Page meta={meta} lead="색·글자 크기·간격·모서리 값에 붙인 이름입니다. 화면 코드에는 값 대신 이름을 씁니다. 값이 바뀌어도 이름은 그대로라서, 한 곳만 고치면 모든 시스템이 함께 바뀝니다.">
      <Section title="두 단계">
        <Table
          head={["단계", "무엇인가", "예", "화면 코드에서"]}
          rows={[
            ["기본 토큰", "색의 원본. 색 이름과 진하기로 부릅니다.", <><Swatch token="blue-500" /> <Code>--ec-blue-500</Code></>, "직접 쓰지 않습니다"],
            ["의미 토큰", "쓰임에 붙인 이름. 기본 토큰을 가리킵니다.", <><Swatch token="control-primary-info" /> <Code>--ec-control-primary-info</Code></>, "이것만 씁니다"],
          ]}
        />
        <P>
          "주요 버튼은 파랑"이라는 결정은 의미 토큰 <Code>control-primary-info</Code>가 기본 토큰 <Code>blue-500</Code>을 가리키는 것으로 적혀 있습니다. 나중에 주요 색을 바꾸려면 이 연결 한 줄만 고칩니다.
        </P>
      </Section>

      <Section title="이름 짓는 규칙">
        <P>
          <Code>--ec-{"{쓰임}"}-{"{역할}"}-{"{상태}"}</Code> 순서입니다. 앞머리 <Code>ec</Code>는 임시이며, 시스템 이름이 정해지면 바꿉니다.
        </P>
        <Table
          head={["쓰임", "뜻", "예"]}
          rows={[
            [<Code>text</Code>, "글자색", <Code>--ec-text-secondary</Code>],
            [<Code>bg</Code>, "배경", <Code>--ec-bg-page</Code>],
            [<Code>border</Code>, "선", <Code>--ec-border-control</Code>],
            [<Code>control</Code>, "버튼처럼 누르는 것의 배경", <Code>--ec-control-primary-info-hover</Code>],
            [<Code>overlay</Code>, "마우스를 올렸을 때 덧씌우는 옅은 색", <Code>--ec-overlay-hover</Code>],
            [<Code>chart</Code>, "차트 계열 색", <Code>--ec-chart-1</Code>],
            [<Code>brand</Code>, "로고 색", <Code>--ec-brand-navy</Code>],
            [<><Code>fs</Code>, <Code>lh</Code>, <Code>fw</Code></>, "글자 크기, 줄 높이, 굵기", <Code>--ec-fs-200</Code>],
            [<Code>spacing</Code>, "간격", <Code>--ec-spacing-4x</Code>],
            [<Code>radius</Code>, "모서리", <Code>--ec-radius-control</Code>],
          ]}
        />
        <Rules
          items={[
            "상태는 맨 뒤에 붙습니다: -hover(마우스 올림), -active(누름).",
            "이름에 색 이름(blue, red)이 들어 있으면 기본 토큰입니다. 화면 코드에 쓰지 않습니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <Rules
          items={[
            <>배경에는 <Code>bg-</Code>, 글자에는 <Code>text-</Code>, 선에는 <Code>border-</Code> 토큰을 씁니다. 이름의 쓰임과 다른 곳에 쓰지 않습니다.</>,
            "맞는 의미 토큰이 없으면 기본 토큰을 끌어다 쓰지 말고 디자인 시스템 담당자에게 의미 토큰 추가를 요청합니다.",
            "색을 16진수나 rgb로 직접 적지 않습니다.",
            "컴포넌트는 이미 토큰으로 그려져 있습니다. 컴포넌트의 색을 바꾸려고 스타일을 덮어쓰지 않습니다.",
          ]}
        />
      </Section>

      <Section title="값을 바꾸는 법">
        <Rules
          items={[
            <>값의 원본은 저장소의 <Code>tokens/tokens.json</Code> 한 파일입니다.</>,
            <>고친 뒤 <Code>npm run tokens</Code>를 실행하면 CSS가 다시 만들어집니다. 만들어진 파일은 직접 고치지 않습니다.</>,
            <>Intergalactic 컴포넌트가 쓰는 토큰과 우리 토큰의 연결은 <Code>tokens/intergalactic-map.json</Code>에 있습니다. 실행할 때마다 연결하지 않은 토큰을 이유별로 세어 보여 줍니다.</>,
            "토큰 값을 바꾸면 세 시스템이 모두 바뀝니다. 바꾸기 전에 담당자들과 합의합니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

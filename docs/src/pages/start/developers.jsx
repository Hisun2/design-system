import React from "react";
import { Button, StatusTag } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, Code } from "../../kit.jsx";

export const meta = { title: "개발자 안내", order: 1 };

export default function DevelopersPage() {
  return (
    <Page meta={meta} lead="사내 시스템을 만들 때 이 디자인 시스템을 설치하고 쓰는 방법입니다.">
      <Section title="무엇이 들어 있는가">
        <Table
          head={["구성", "내용"]}
          rows={[
            ["디자인 토큰", "색·글자 크기·간격·모서리 값에 붙인 이름. CSS 변수로 제공합니다."],
            ["컴포넌트", "버튼, 입력, 표, 모달, 차트 등 화면 부품. React 컴포넌트로 제공합니다."],
            ["글꼴", "Spoqa Han Sans Neo 파일이 패키지에 들어 있습니다. 따로 불러올 필요가 없습니다."],
            ["규칙 문서", "지금 보고 있는 이 사이트입니다."],
          ]}
        />
        <P>컴포넌트는 Semrush가 공개한 Intergalactic(MIT 라이선스)에 우리 토큰을 입힌 것입니다. Intergalactic이 제공하는 컴포넌트는 빠짐없이 들어 있습니다.</P>
      </Section>

      <Section title="설치">
        <P>git 저장소에서 설치합니다. 버전은 태그로 고정합니다. React 18 또는 19가 필요합니다.</P>
        <P><Code>npm install git+&lt;저장소 주소&gt;#v0.1.0</Code></P>
      </Section>

      <Section title="시작하기">
        <Rules
          items={[
            <>앱 시작 파일에서 <Code>import "@ec21rnc/ui/styles.css"</Code>를 한 번 불러옵니다. 토큰, 글꼴, 기본 글자 설정이 함께 들어옵니다.</>,
            <>앱 전체를 <Code>UiProvider</Code>로 한 번 감쌉니다. 컴포넌트 안의 기본 문구가 한국어로 나옵니다.</>,
            <>그다음부터는 필요한 컴포넌트를 <Code>@ec21rnc/ui</Code>에서 불러 씁니다.</>,
          ]}
        />
        <Demo caption="불러와서 그대로 쓰면 규칙대로 나옵니다">
          <Button use="primary" theme="info">저장</Button>
          <Button>취소</Button>
          <StatusTag status="success">승인</StatusTag>
        </Demo>
      </Section>

      <Section title="불러오는 곳">
        <Table
          head={["불러오는 곳", "내용"]}
          rows={[
            [<Code>@ec21rnc/ui</Code>, "일반 컴포넌트 전부"],
            [<Code>@ec21rnc/ui/chart</Code>, "차트 전부. 용량이 커서 따로 둡니다."],
            [<Code>@ec21rnc/ui/feedback-form</Code>, "피드백 폼. react-final-form을 추가로 설치해야 합니다."],
            [<Code>@semcore/icon/이름/m</Code>, "아이콘. 수가 많아 하나씩 불러옵니다."],
          ]}
        />
        <Rules
          items={[
            <>아이콘을 뺀 나머지는 <Code>@semcore/...</Code>에서 직접 불러오지 않습니다. 나중에 기반 라이브러리를 바꿔도 각 시스템의 코드를 고치지 않기 위해서입니다.</>,
            "화면별로 나눠 불러오도록(코드 분할) 구성합니다. 모든 컴포넌트를 한 묶음으로 내보내면 처음 뜨는 속도가 느려집니다.",
          ]}
        />
      </Section>

      <Section title="직접 스타일을 쓸 때">
        <Rules
          items={[
            <>색·크기·간격 값을 직접 적지 않고 토큰을 씁니다. 예: <Code>color: var(--ec-text-secondary)</Code></>,
            "이름이 --ec-로 시작하는 토큰 중 의미 토큰(text-, bg-, border-, control- 등)만 씁니다. 기본 토큰(blue-500 등)은 직접 쓰지 않습니다.",
            "배치는 Flex와 Box 컴포넌트로 합니다. 간격은 4px의 배수만 씁니다.",
            "필요한 컴포넌트가 없으면 새로 만들기 전에 패턴 장을 먼저 찾아봅니다. 기존 컴포넌트를 조합해 해결되는 경우가 많습니다.",
          ]}
        />
      </Section>

      <Section title="컴포넌트의 공통 성질">
        <Rules
          items={[
            <>값과 변경 함수를 주지 않으면 스스로 상태를 가집니다. <Code>value</Code>와 <Code>onChange</Code>를 함께 주면 바깥에서 조종합니다.</>,
            <>변경 함수는 모두 <Code>(값, 이벤트)</Code> 순서로 받습니다. 그래서 <Code>useState</Code>의 설정 함수를 그대로 넘길 수 있습니다.</>,
            <>복잡한 컴포넌트는 부분을 조립해 씁니다. 예: <Code>Input</Code> 안에 <Code>Input.Value</Code>와 <Code>Input.Addon</Code>.</>,
            <>모든 컴포넌트는 여백(<Code>mt</Code>, <Code>mb</Code>, <Code>p</Code>)과 크기(<Code>w</Code>, <Code>h</Code>) 속성을 받습니다. 숫자는 4px의 배수 단위입니다.</>,
          ]}
        />
      </Section>
    </Page>
  );
}

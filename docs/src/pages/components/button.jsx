import React from "react";
import { Button, Counter, Badge, Tooltip, Flex } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Button", order: 10 };

export default function ButtonPage() {
  return (
    <Page meta={meta} lead="사용자가 어떤 일을 실행할 때 누르는 요소입니다. 다른 화면으로 이동만 할 때는 Link를 씁니다.">
      <Section title="종류와 색">
        <Demo caption="주요 (use=&quot;primary&quot;) — 일반 / 긍정 / 위험">
          <Button use="primary" theme="info">저장</Button>
          <Button use="primary" theme="success">승인</Button>
          <Button use="primary" theme="danger">삭제</Button>
        </Demo>
        <Demo caption="보조 (use=&quot;secondary&quot;, 기본값)">
          <Button>취소</Button>
          <Button>내려받기</Button>
        </Demo>
        <Demo caption="약한 (use=&quot;tertiary&quot;) — 강조 / 차분">
          <Button use="tertiary" theme="info">자세히 보기</Button>
          <Button use="tertiary" theme="muted">접기</Button>
        </Demo>
        <Table
          head={["종류", "언제 쓰는가", "빈도"]}
          rows={[
            ["주요 · 일반", "화면에서 가장 중요한 한 가지 동작", "화면당 하나"],
            ["주요 · 긍정", "승인·완료처럼 결과가 좋은 방향인 핵심 동작", "가끔"],
            ["주요 · 위험", "삭제처럼 되돌릴 수 없는 동작", "드물게"],
            ["보조", "일반 동작, 반복되는 동작", "자주"],
            ["약한", "덜 중요한 동작, 표 안의 동작", "자주"],
          ]}
        />
        <P>
          약한 버튼은 <Code>theme</Code>을 주지 않으면 회색 글자로 나옵니다. 눌러야 할 것임을 알리려면 <Code>theme="info"</Code>를 줍니다.
        </P>
      </Section>

      <Section title="크기">
        <Demo>
          <Button use="primary" theme="info">M · 32px</Button>
          <Button use="primary" theme="info" size="l">L · 44px</Button>
        </Demo>
        <Rules
          items={[
            "M이 기본입니다. 필터, 표, 폼 등 대부분의 자리에 씁니다.",
            "L은 모달의 핵심 동작, 빈 화면처럼 한 가지 동작에 집중시킬 때만 씁니다.",
            "버튼이 하나뿐이면 폭을 120px 이상으로 합니다.",
            "한 묶음 안에서는 같은 크기만 씁니다.",
          ]}
        />
      </Section>

      <Section title="덧붙이는 요소">
        <Demo>
          <Button>필터<Button.Addon><Counter>3</Counter></Button.Addon></Button>
          <Button>새 기능<Button.Addon><Badge type="new" /></Button.Addon></Button>
          <Tooltip title="설명 풍선에 버튼의 뜻을 적습니다"><Button aria-label="도움말">?</Button></Tooltip>
        </Demo>
        <P>아이콘, 개수(Counter), 배지를 글자 앞뒤에 붙일 수 있습니다. 글자 없이 아이콘만 있는 버튼에는 반드시 설명 풍선을 답니다.</P>
      </Section>

      <Section title="상태">
        <Demo>
          <Button use="primary" theme="info">기본</Button>
          <Button use="primary" theme="info" active>누름</Button>
          <Button use="primary" theme="info" loading>저장 중</Button>
          <Button use="primary" theme="info" disabled>비활성</Button>
        </Demo>
        <Rules
          items={[
            "처리에 시간이 걸리면 loading 상태로 바꿔 두 번 누르는 것을 막습니다.",
            "비활성 버튼은 왜 누를 수 없는지 가까운 곳에 적습니다.",
            "키보드로 선택하면 파란 테두리가 나옵니다. 이 표시를 없애지 않습니다.",
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "\"저장\", \"삭제\", \"거래처 추가\"처럼 누르면 일어나는 일을 적습니다.",
            "세 단어를 넘기지 않습니다.",
            "\"확인\", \"예\"처럼 무엇이 일어나는지 알 수 없는 글자는 피합니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Flex gap={2}>
                <Button use="primary" theme="info">저장</Button>
                <Button>취소</Button>
              </Flex>
            ),
            text: "주요 버튼은 하나만 두고 맨 앞에 놓습니다. 버튼 사이 간격은 8px입니다.",
          }}
          bad={{
            demo: (
              <Flex gap={2}>
                <Button use="primary" theme="info">확인</Button>
                <Button use="primary" theme="info">적용</Button>
              </Flex>
            ),
            text: "주요 버튼을 둘 이상 두지 않습니다.",
          }}
        />
      </Section>
    </Page>
  );
}

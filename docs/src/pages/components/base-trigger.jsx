import React from "react";
import { ButtonTrigger, LinkTrigger, FilterTrigger, Flex } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "BaseTrigger" };

export default function BaseTriggerPage() {
  return (
    <Page meta={meta} lead="누르면 목록이나 상자가 열리는 요소의 바탕입니다. 버튼처럼 눌리지만 고른 값을 보여 주는 것이 주된 일입니다. Select, Dropdown, DatePicker를 여는 자리에 씁니다.">
      <Section title="종류">
        <Demo>
          <ButtonTrigger>담당자</ButtonTrigger>
          <FilterTrigger>승인 완료</FilterTrigger>
          <LinkTrigger>최근 30일</LinkTrigger>
        </Demo>
        <Table
          head={["종류", "모양", "언제 쓰는가"]}
          rows={[
            [<Code>ButtonTrigger</Code>, "입력창처럼 테두리가 있고 오른쪽에 화살표가 있습니다.", "폼에서 값을 고를 때. 가장 흔히 씁니다."],
            [<Code>FilterTrigger</Code>, "값을 고르면 색이 차고 지우기 버튼이 붙습니다.", "필터에서 조건이 걸려 있음을 보여 줄 때. 자세한 규칙은 필터 문서를 봅니다."],
            [<Code>LinkTrigger</Code>, "링크 모양입니다. 테두리가 없습니다.", "글 사이나 제목 옆처럼 자리가 좁고 눈에 덜 띄어야 할 때."],
          ]}
        />
        <P>
          <Code>BaseTrigger</Code>를 직접 쓰지 않습니다. 위 세 가지 가운데 하나를 고릅니다.
        </P>
      </Section>

      <Section title="크기와 여백">
        <Demo>
          <ButtonTrigger>M · 32px</ButtonTrigger>
          <ButtonTrigger size="l">L · 44px</ButtonTrigger>
        </Demo>
        <Table
          head={["크기", "높이", "좌우 안쪽 여백", "덧붙인 요소와 글자 사이"]}
          rows={[
            ["M (기본)", <Code>--ec-control-height-m</Code>, "8px", "8px"],
            ["L", <Code>--ec-control-height-l</Code>, "12px", "8px"],
          ]}
        />
        <Rules
          items={[
            "나란히 놓인 입력창, 버튼과 같은 크기를 씁니다.",
            "앞에 붙는 아이콘은 오른쪽으로 8px, 뒤에 붙는 아이콘은 왼쪽으로 8px 띄웁니다.",
          ]}
        />
      </Section>

      <Section title="상태">
        <Sub title="ButtonTrigger">
          <Demo>
            <ButtonTrigger>기본</ButtonTrigger>
            <ButtonTrigger active>열림</ButtonTrigger>
            <ButtonTrigger state="invalid">잘못됨</ButtonTrigger>
            <ButtonTrigger state="valid">올바름</ButtonTrigger>
            <ButtonTrigger loading>불러오는 중</ButtonTrigger>
            <ButtonTrigger disabled>비활성</ButtonTrigger>
          </Demo>
          <Demo caption="값을 고르기 전 (empty + placeholder)">
            <ButtonTrigger empty placeholder="담당자 선택" />
          </Demo>
        </Sub>
        <Sub title="LinkTrigger">
          <Demo>
            <LinkTrigger>기본</LinkTrigger>
            <LinkTrigger active>열림</LinkTrigger>
            <LinkTrigger loading>불러오는 중</LinkTrigger>
            <LinkTrigger disabled>비활성</LinkTrigger>
            <LinkTrigger size="l">L 크기</LinkTrigger>
          </Demo>
          <P>LinkTrigger는 Link와 같은 색과 모양을 따릅니다.</P>
        </Sub>
        <Sub title="FilterTrigger">
          <Demo>
            <FilterTrigger empty placeholder="상태" />
            <FilterTrigger>승인 완료</FilterTrigger>
            <FilterTrigger disabled>승인 완료</FilterTrigger>
          </Demo>
        </Sub>
        <Table
          head={["상태", "모양"]}
          rows={[
            ["기본", <>흰 바탕(<Code>--ec-bg-surface</Code>)에 <Code>--ec-border-control</Code> 테두리.</>],
            ["마우스를 올림", "바탕이 한 단계 진해집니다."],
            ["열림 (active)", <>바탕은 기본으로 돌아가고 테두리가 파란색(<Code>--ec-control-primary-info</Code>)이 됩니다.</>],
            ["잘못됨 (invalid)", <>테두리가 빨간색(<Code>--ec-control-primary-critical</Code>)이 됩니다.</>],
            ["올바름 (valid)", <>테두리가 초록색(<Code>--ec-control-primary-success</Code>)이 됩니다.</>],
            ["비활성", "전체가 흐려지고 눌리지 않습니다."],
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "목록이나 상자가 열려 있는 동안에는 열림 상태를 유지합니다.",
            "값을 고르면 글자가 고른 값으로 바뀝니다. 값이 없으면 안내 글자(placeholder)를 흐린 색으로 보여 줍니다.",
            "값을 불러오는 동안에는 loading 상태로 둡니다.",
            "잘못됨 상태에는 무엇이 잘못됐는지 설명 풍선이나 아래 글로 알립니다. 색만으로 알리지 않습니다.",
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "안내 글자는 \"담당자 선택\"처럼 무엇을 고르는지 적습니다.",
            "값이 길면 말줄임표로 줄이고, 마우스를 올리면 전체를 보여 줍니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Flex gap={2}>
                <ButtonTrigger empty placeholder="거래처 선택" />
                <ButtonTrigger empty placeholder="담당자 선택" />
              </Flex>
            ),
            text: "값을 고르는 자리에 씁니다. 한 줄에 놓인 것끼리 크기를 맞춥니다.",
          }}
          bad={{
            demo: <ButtonTrigger chevron={false}>저장</ButtonTrigger>,
            text: "동작을 실행하는 자리에 쓰지 않습니다. 저장·삭제 같은 동작은 Button을 씁니다.",
          }}
        />
      </Section>
    </Page>
  );
}

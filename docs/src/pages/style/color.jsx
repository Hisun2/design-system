import React from "react";
import { StatusTag, Flex, Box, Text } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, Code, Swatch } from "../../kit.jsx";

export const meta = { title: "색", order: 2 };

const row = (token, value, use) => [<Swatch token={token} />, <Code>--ec-{token}</Code>, value, use];

export default function ColorPage() {
  return (
    <Page meta={meta} lead="화면에 쓰는 모든 색의 목록입니다. 어디에 쓰는지는 '색을 쓰는 원칙'을 함께 봅니다. 브랜드 색은 로고에서 뽑은 값입니다.">
      <Section title="글자">
        <Table
          head={["", "토큰", "값", "쓰는 곳"]}
          rows={[
            row("text-primary", "#191B23", "제목, 본문, 표 내용"),
            row("text-secondary", "#6C6E79", "표 머리글, 설명, 보조 정보"),
            row("text-hint", "#9EA1AC", "입력 예시 문구, 비활성. 본문에는 쓰지 않음"),
            row("text-link", "#0A6FD6", "링크, 약한 버튼의 글자"),
            row("text-info", "#005FA8", "링크에 마우스를 올렸을 때, 안내 글자"),
            row("text-success", "#167A42", "성공·증가를 알리는 글자"),
            row("text-critical", "#C4281C", "오류·감소를 알리는 글자"),
            row("text-warning", "#A35A00", "주의를 알리는 글자"),
            row("text-review", "#6A3FC2", "검토 단계를 알리는 글자"),
            row("text-invert", "#FFFFFF", "색이 칠해진 버튼 위의 글자"),
          ]}
        />
      </Section>

      <Section title="배경">
        <Table
          head={["", "토큰", "값", "쓰는 곳"]}
          rows={[
            row("bg-page", "#F4F5F9", "화면 바탕"),
            row("bg-surface", "#FFFFFF", "카드, 표, 모달, 상단바, 메뉴"),
            row("bg-selected", "#E6F2FC", "선택된 행, 선택된 메뉴"),
            row("bg-info", "#E6F2FC", "안내 알림 상자, 진행 중 표시"),
            row("bg-success", "#DDF5E8", "성공 알림 상자"),
            row("bg-warning", "#FFF1CF", "주의 알림 상자"),
            row("bg-critical", "#FDE7E5", "오류 알림 상자"),
            row("bg-review", "#EFE8FC", "검토 표시"),
          ]}
        />
      </Section>

      <Section title="선과 덧씌우는 색">
        <Table
          head={["", "토큰", "값", "쓰는 곳"]}
          rows={[
            row("border", "#E4E6EC", "구분선, 표의 가로줄"),
            row("border-control", "Navy 22%", "입력창·선택 상자의 테두리"),
            row("overlay-hover", "Navy 5%", "목록의 줄, 약한 버튼에 마우스를 올렸을 때"),
            row("overlay-active", "Navy 7%", "누르고 있을 때, 선택된 상태"),
            row("control-secondary", "Navy 8%", "보조 버튼, Pills의 바탕"),
            row("control-secondary-hover", "Navy 15%", "보조 버튼에 마우스를 올렸을 때"),
            row("track", "Navy 12%", "진행 막대와 슬라이더의 빈 부분"),
          ]}
        />
        <P>회색이 필요한 자리에는 회색 대신 Navy를 옅게 깐 색을 씁니다. 어떤 바탕 위에 놓여도 어울리고 브랜드 색과 같은 계열로 보입니다.</P>
      </Section>

      <Section title="누르는 것">
        <Table
          head={["", "토큰", "값", "쓰는 곳"]}
          rows={[
            row("control-primary-info", "#0A6FD6", "주요 버튼, 체크박스·라디오·스위치의 선택 상태, 선택된 탭"),
            row("control-primary-info-hover", "#005FA8", "주요 버튼에 마우스를 올렸을 때"),
            row("control-primary-info-active", "#004C87", "주요 버튼을 누르고 있을 때"),
            row("control-primary-success", "#167A42", "긍정 버튼"),
            row("control-primary-success-hover", "#0C6A3B", "긍정 버튼에 마우스를 올렸을 때"),
            row("control-primary-critical", "#C4281C", "위험 버튼"),
            row("control-primary-critical-hover", "#A51F15", "위험 버튼에 마우스를 올렸을 때"),
          ]}
        />
        <P>
          키보드로 선택된 요소에는 Blue 35%의 테두리 3px(<Code>--ec-focus-ring</Code>)이 둘러집니다. 모든 컴포넌트에 공통입니다.
        </P>
      </Section>

      <Section title="브랜드">
        <Table
          head={["", "토큰", "값", "쓰는 곳"]}
          rows={[
            row("brand-navy", "#14347C", "로고, 단계 창의 옆면. 넓은 면에는 쓰지 않음"),
            row("brand-orange", "#F28A1E", "로고, 새 항목을 알리는 점. 글자에는 쓰지 않음"),
          ]}
        />
      </Section>

      <Section title="상태">
        <Demo>
          <StatusTag status="success" size="l">승인</StatusTag>
          <StatusTag status="progress" size="l">진행 중</StatusTag>
          <StatusTag status="warning" size="l">대기</StatusTag>
          <StatusTag status="critical" size="l">반려</StatusTag>
          <StatusTag status="review" size="l">검토</StatusTag>
          <StatusTag status="neutral" size="l">임시 저장</StatusTag>
        </Demo>
        <Rules
          items={[
            "상태는 연한 배경에 진한 글자로 표시합니다. 글자색은 위 '글자' 표의 success, info, warning, critical, review, secondary입니다.",
            <>데이터의 상태를 표시할 때는 색을 직접 고르지 않고 <Code>StatusTag</Code>를 씁니다.</>,
          ]}
        />
      </Section>

      <Section title="차트">
        <P>번호 순서대로 씁니다. 1~6번이 기본이고, 계열이 더 많을 때 7번부터 이어 씁니다.</P>
        <Demo column>
          {[
            ["1~6 기본", 1],
            ["7~12 진한 단계", 7],
            ["13~18 연한 단계", 13],
            ["19~24 가장 진한 단계", 19],
          ].map(([label, start]) => (
            <Flex key={start} gap={2} alignItems="center">
              <Box w={140}><Text size={100} color="text-secondary">{label}</Text></Box>
              {[0, 1, 2, 3, 4, 5].map((i) => <Swatch key={i} token={`chart-${start + i}`} />)}
            </Flex>
          ))}
        </Demo>
        <Rules
          items={[
            "한 차트의 계열은 6개까지를 권합니다. 넘으면 차트를 나누거나 작은 것들을 \"기타\"로 묶습니다.",
            "차트 색은 글자에 쓰지 않습니다. 범례의 글자는 기본 글자색으로 쓰고 옆에 색 표시를 붙입니다.",
            "성공·실패처럼 뜻이 있는 값은 차트 색 번호 대신 상태 색을 씁니다.",
          ]}
        />
      </Section>

      <Section title="대비">
        <Rules
          items={[
            "text-primary, text-secondary와 상태 글자색은 흰 배경에서 4.5:1 이상입니다.",
            "색이 칠해진 버튼(주요·긍정·위험) 위의 흰 글자도 4.5:1 이상입니다.",
            "text-hint, brand-orange, 차트 색은 이 기준에 못 미칩니다. 읽어야 하는 글자에 쓰지 않습니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

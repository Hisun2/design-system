import React from "react";
import { StatusTag, Tag, Badge, Flex, Text } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code, Swatch } from "../../kit.jsx";

export const meta = { title: "StatusTag" };

export default function StatusTagPage() {
  return (
    <Page meta={meta} lead="문서, 요청, 작업 같은 데이터가 지금 어떤 상태인지 알리는 태그입니다. 상태는 여섯 가지로 정해져 있고, 상태마다 색과 뜻이 하나씩 묶여 있습니다. 우리가 따로 만든 컴포넌트입니다.">
      <Section title="여섯 가지 상태">
        <Demo>
          <StatusTag status="success">승인 완료</StatusTag>
          <StatusTag status="progress">처리 중</StatusTag>
          <StatusTag status="warning">확인 필요</StatusTag>
          <StatusTag status="critical">반려</StatusTag>
          <StatusTag status="review">검토 중</StatusTag>
          <StatusTag status="neutral">시작 전</StatusTag>
        </Demo>
        <Table
          head={["status", "색", "뜻", "글자 예시", "글자색 토큰"]}
          rows={[
            [<Code>success</Code>, "초록", "끝났고 문제없음", "승인 완료, 발송 완료, 정상", <><Swatch token="text-success" /> <Code>--ec-text-success</Code></>],
            [<Code>progress</Code>, "파랑", "진행 중", "처리 중, 수집 중, 발송 중", <><Swatch token="text-info" /> <Code>--ec-text-info</Code></>],
            [<Code>warning</Code>, "노랑", "사람이 봐야 함", "확인 필요, 기한 임박, 보완 요청", <><Swatch token="text-warning" /> <Code>--ec-text-warning</Code></>],
            [<Code>critical</Code>, "빨강", "문제 있음", "반려, 실패, 기한 지남", <><Swatch token="text-critical" /> <Code>--ec-text-critical</Code></>],
            [<Code>review</Code>, "보라", "검토", "검토 중, 승인 대기", <><Swatch token="text-review" /> <Code>--ec-text-review</Code></>],
            [<Code>neutral</Code>, "회색", "시작 전", "시작 전, 임시 저장, 미정", <><Swatch token="text-secondary" /> <Code>--ec-text-secondary</Code></>],
          ]}
        />
        <Rules
          items={[
            <><Code>status</Code>를 주지 않으면 <Code>neutral</Code>입니다.</>,
            "여섯 가지 밖의 값을 주면 오류가 납니다. 상태를 새로 만들어 쓸 수 없습니다.",
            "바탕은 글자색과 같은 계열의 옅은 색으로 저절로 정해집니다. 색을 따로 고르지 않습니다.",
          ]}
        />
      </Section>

      <Section title="색과 뜻의 규칙">
        <Rules
          items={[
            "색은 뜻으로 고릅니다. 보기 좋은 색이나 구분하기 쉬운 색으로 고르지 않습니다.",
            "같은 뜻이면 어느 화면에서나 같은 색입니다. \"승인 완료\"가 한 화면에서는 초록, 다른 화면에서는 파랑이면 안 됩니다.",
            "업무마다 상태의 이름은 달라도 됩니다. 그 이름이 여섯 뜻 가운데 어디에 드는지를 정해 색을 고릅니다.",
            "초록은 정말 끝났고 손댈 것이 없을 때만 씁니다. 진행이 잘되고 있다는 뜻으로 쓰지 않습니다. 그때는 파랑입니다.",
            "노랑과 빨강을 가릅니다. 사람이 보고 판단하면 되는 것은 노랑, 이미 잘못되었거나 막힌 것은 빨강입니다.",
            "보라는 누군가의 검토나 승인을 기다리는 상태입니다. 시스템이 처리 중이면 파랑입니다.",
            "색만으로 뜻을 전하지 않습니다. 글자만 읽어도 상태를 알 수 있어야 합니다.",
          ]}
        />
        <Demo caption="업무마다 이름은 달라도 뜻이 같으면 같은 색입니다">
          <Flex direction="column" gap={2}>
            <Flex gap={2} alignItems="center">
              <Text size={200} color="text-secondary">문서 승인</Text>
              <StatusTag status="review">승인 대기</StatusTag>
              <StatusTag status="success">승인 완료</StatusTag>
              <StatusTag status="critical">반려</StatusTag>
            </Flex>
            <Flex gap={2} alignItems="center">
              <Text size={200} color="text-secondary">자료 수집</Text>
              <StatusTag status="neutral">예약됨</StatusTag>
              <StatusTag status="progress">수집 중</StatusTag>
              <StatusTag status="success">수집 완료</StatusTag>
              <StatusTag status="critical">수집 실패</StatusTag>
            </Flex>
          </Flex>
        </Demo>
      </Section>

      <Section title="크기">
        <Demo caption="M · 20px(기본) / L · 28px / XL · 40px">
          <StatusTag status="progress" size="m">처리 중</StatusTag>
          <StatusTag status="progress" size="l">처리 중</StatusTag>
          <StatusTag status="progress" size="xl">처리 중</StatusTag>
        </Demo>
        <Rules
          items={[
            "크기는 Tag와 같습니다. 양 끝이 둥근 모양입니다.",
            "표의 칸과 목록에서는 M을 씁니다.",
            "상세 화면의 제목 옆처럼 상태를 크게 보여 줄 자리에서는 L을 씁니다. XL은 드물게 씁니다.",
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "\"승인 완료\", \"처리 중\", \"반려\"처럼 상태를 나타내는 한두 낱말로 적습니다.",
            "문장으로 적지 않습니다. \"승인이 완료되었습니다\"가 아니라 \"승인 완료\"입니다.",
            "같은 상태는 시스템 전체에서 같은 말로 적습니다.",
            "글자 굵기는 500입니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <Rules
          items={[
            "표에서는 상태 칸에 하나만 둡니다. 한 행에 상태 태그를 여러 개 두지 않습니다.",
            "상세 화면에서는 제목 바로 옆에 둡니다.",
            "StatusTag는 보여 주기만 합니다. 눌러서 상태를 바꾸는 컨트롤로 쓰지 않습니다.",
            <>Tag의 다른 속성(<Code>wMax</Code> 등)은 그대로 넘길 수 있습니다. 다만 <Code>theme</Code>과 <Code>color</Code>는 넘기지 않습니다.</>,
          ]}
        />
        <DoDont
          good={{
            demo: (
              <Flex gap={2}>
                <StatusTag status="progress">처리 중</StatusTag>
                <StatusTag status="success">승인 완료</StatusTag>
              </Flex>
            ),
            text: "진행 중은 파랑, 끝난 것은 초록입니다.",
          }}
          bad={{
            demo: (
              <Flex gap={2}>
                <StatusTag status="success">처리 중</StatusTag>
                <Tag color="green-500">승인 완료</Tag>
              </Flex>
            ),
            text: "아직 끝나지 않은 것에 초록을 쓰지 않습니다. Tag에 색을 직접 줘서 상태를 만들지도 않습니다.",
          }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Demo caption="StatusTag / Tag / Badge">
          <StatusTag status="success">승인 완료</StatusTag>
          <Tag>수출</Tag>
          <Badge type="beta" />
        </Demo>
        <Table
          head={["컴포넌트", "무엇을 나타내는가", "글자", "색"]}
          rows={[
            ["StatusTag", "데이터의 상태 (이 문서가 지금 어떤 단계인가)", "업무에 맞게 적음", "여섯 가지 상태색, 뜻이 고정"],
            ["Tag", "분류·주제·사용자가 붙인 이름표 (이 문서가 어떤 종류인가)", "자유롭게 적음", "기본 회색. 분류를 구분할 때만 색"],
            ["Badge", "기능의 상태 (이 메뉴·기능이 새것인가, 시험 중인가)", "바꿀 수 없음. 관리자·알파·베타·신규·서비스 예정·사용 불가", "종류마다 고정"],
          ]}
        />
        <P>헷갈릴 때는 이렇게 묻습니다. 시간이 지나면 값이 바뀌는가? 바뀌면 상태이므로 StatusTag입니다. 대상에 붙은 성질이면 Tag입니다. 데이터가 아니라 화면의 기능에 대한 표시이면 Badge입니다.</P>
      </Section>
    </Page>
  );
}

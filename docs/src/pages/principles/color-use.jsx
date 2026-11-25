import React from "react";
import { Button, StatusTag, Flex, Card, Text } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "색을 쓰는 원칙", order: 1 };

export default function ColorUsePage() {
  return (
    <Page meta={meta} lead="모든 사내 시스템 화면에 똑같이 적용하는 원칙입니다. 색이 적을수록 색이 가진 뜻이 또렷해집니다.">
      <Section title="원칙">
        <Rules
          items={[
            "화면의 틀(상단바, 메뉴, 카드)은 흰색과 회색만 씁니다.",
            "색은 세 곳에만 씁니다: 누를 수 있는 것, 상태, 데이터.",
            "한 화면에서 주요 버튼은 하나만 둡니다.",
            "색만으로 뜻을 전하지 않습니다. 글자나 아이콘을 함께 둡니다.",
            "글자와 배경의 대비는 4.5:1 이상으로 합니다.",
          ]}
        />
      </Section>

      <Section title="색을 쓰는 세 곳">
        <Table
          head={["쓰는 곳", "색", "예"]}
          rows={[
            ["누를 수 있는 것", "Blue", "주요 버튼, 링크, 선택된 탭, 켜진 스위치"],
            ["상태", "초록 · 파랑 · 노랑 · 빨강 · 보라 · 회색", "승인, 진행 중, 대기, 반려, 검토, 임시 저장"],
            ["데이터", "차트 색 1~24번", "차트의 계열, 범례"],
          ]}
        />
        <Demo gray>
          <Card w={360}>
            <Card.Header><Card.Title>거래처 등록</Card.Title></Card.Header>
            <Card.Body>
              <Flex gap={2} alignItems="center" mb={4}>
                <Text size={200}>처리 상태</Text>
                <StatusTag status="warning">대기</StatusTag>
              </Flex>
              <Flex gap={2}>
                <Button use="primary" theme="info">저장</Button>
                <Button>취소</Button>
              </Flex>
            </Card.Body>
          </Card>
        </Demo>
        <P>위 예시에서 색이 있는 곳은 주요 버튼과 상태 태그 둘뿐입니다. 카드, 제목, 보조 버튼에는 색이 없습니다.</P>
      </Section>

      <Section title="브랜드 색의 자리">
        <Table
          head={["색", "토큰", "쓰는 곳", "쓰지 않는 곳"]}
          rows={[
            ["Blue", <Code>--ec-control-primary-info</Code>, "주요 버튼, 링크, 선택 상태", "넓은 배경"],
            ["Navy", <Code>--ec-brand-navy</Code>, "로고, 단계 창의 옆면", "본문 글자, 넓은 화면 틀"],
            ["Orange", <Code>--ec-brand-orange</Code>, "로고, 새 항목을 알리는 점", "글자, 버튼, 경고 표시"],
          ]}
        />
        <Rules
          items={[
            "Orange는 흰 배경에서 대비가 낮아 글자에 쓰지 않습니다.",
            "Orange에는 \"경고\"라는 뜻을 주지 않습니다. 경고는 노란 계열의 상태 색을 씁니다.",
          ]}
        />
      </Section>

      <Section title="상태 색의 뜻">
        <Demo>
          <StatusTag status="success" size="l">승인</StatusTag>
          <StatusTag status="progress" size="l">진행 중</StatusTag>
          <StatusTag status="warning" size="l">대기</StatusTag>
          <StatusTag status="critical" size="l">반려</StatusTag>
          <StatusTag status="review" size="l">검토</StatusTag>
          <StatusTag status="neutral" size="l">임시 저장</StatusTag>
        </Demo>
        <Table
          head={["색", "뜻", "예"]}
          rows={[
            ["초록", "끝났고 문제없음", "승인, 완료, 정상"],
            ["파랑", "진행 중", "진행 중, 처리 중"],
            ["노랑", "사람이 봐야 함", "대기, 확인 필요"],
            ["빨강", "문제 있음", "반려, 실패, 오류"],
            ["보라", "검토 단계", "검토, 심사"],
            ["회색", "아직 시작 안 함, 해당 없음", "임시 저장, 중지"],
          ]}
        />
        <P>같은 뜻에는 모든 시스템에서 같은 색을 씁니다. 시스템마다 "대기"의 색이 다르면 사용자가 색을 믿지 못하게 됩니다.</P>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Flex gap={2}>
                <Button use="primary" theme="info">등록</Button>
                <Button>임시 저장</Button>
                <Button use="tertiary" theme="muted">취소</Button>
              </Flex>
            ),
            text: "가장 중요한 동작 하나만 색을 줍니다.",
          }}
          bad={{
            demo: (
              <Flex gap={2}>
                <Button use="primary" theme="info">등록</Button>
                <Button use="primary" theme="success">임시 저장</Button>
                <Button use="primary" theme="danger">취소</Button>
              </Flex>
            ),
            text: "버튼을 구분하려고 색을 여러 개 쓰지 않습니다. \"취소\"는 위험한 동작이 아니므로 빨강을 쓰지 않습니다.",
          }}
        />
      </Section>
    </Page>
  );
}

import React from "react";
import { Button, Link, Flex } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont } from "../../kit.jsx";

export const meta = { title: "버튼의 강약", order: 2 };

export default function VisualLoudnessPage() {
  return (
    <Page meta={meta} lead="한 화면의 버튼들이 모두 같은 세기로 보이면 무엇을 먼저 눌러야 할지 알 수 없습니다. 중요도에 따라 세기를 다르게 둡니다.">
      <Section title="세기 순서">
        <P>위에서 아래로 갈수록 눈에 덜 띕니다. 화면에서 가장 중요한 동작에 가장 센 것을 주고, 나머지는 한 단계씩 낮춥니다.</P>
        <Table
          head={["세기", "모양", "종류", "얼마나 자주", "언제 쓰는가"]}
          rows={[
            ["1 (가장 셈)", <Button use="primary" theme="danger">삭제</Button>, "주요 · 위험", "드물게", "되돌릴 수 없는 동작. 실수로 누르지 않게 눈에 띄어야 할 때"],
            ["2", <Button use="primary" theme="success">승인</Button>, "주요 · 긍정", "가끔", "결과가 좋은 방향인 핵심 동작"],
            ["3", <Button use="primary" theme="info">저장</Button>, "주요 · 일반", "화면당 하나", "화면의 가장 중요한 동작"],
            ["4", <Button>취소</Button>, "보조", "자주", "일반 동작. 늘 곁에 있지만 방해하지 않는 버튼"],
            ["5", <Button use="tertiary" theme="info">자세히 보기</Button>, "약한 · 강조", "자주", "덜 중요하지만 눌러야 할 것임을 알려야 할 때. 자리가 넉넉할 때"],
            ["6", <Link href="#/principles/visual-loudness">자세히 보기</Link>, "링크", "자주", "자리가 좁을 때, 문장 안에 있을 때"],
            ["7 (가장 약함)", <Button use="tertiary" theme="muted">접기</Button>, "약한 · 차분", "보통", "부가 정보를 여닫는 등 강조가 필요 없는 동작"],
          ]}
        />
      </Section>

      <Section title="규칙">
        <Rules
          items={[
            "한 화면(또는 모달 하나)에서 세기 1~3의 버튼은 하나만 둡니다.",
            "세기가 같은 버튼을 나란히 둘 때는 둘의 중요도가 정말 같은지 다시 봅니다.",
            "위험 버튼은 삭제처럼 되돌릴 수 없는 동작에만 씁니다. \"취소\", \"닫기\"에는 쓰지 않습니다.",
            "표의 각 줄에 들어가는 동작은 세기 5 이하로 둡니다. 줄마다 센 버튼이 있으면 표 전체가 시끄러워집니다.",
            "어두운 배경 위(설명 풍선, 짧은 알림)에서는 theme=\"invert\"를 씁니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Flex gap={2} alignItems="center">
                <Button use="primary" theme="info">등록</Button>
                <Button>임시 저장</Button>
                <Button use="tertiary" theme="muted">취소</Button>
              </Flex>
            ),
            text: "가장 중요한 동작부터 세기를 한 단계씩 낮춥니다.",
          }}
          bad={{
            demo: (
              <Flex gap={2} alignItems="center">
                <Button use="primary" theme="info">등록</Button>
                <Button use="primary" theme="info">임시 저장</Button>
                <Button use="primary" theme="info">취소</Button>
              </Flex>
            ),
            text: "모두 같은 세기로 두지 않습니다.",
          }}
        />
      </Section>
    </Page>
  );
}

import React from "react";
import { Button, Accordion, Box, noticeBubbleDefaultManager } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, Code } from "../../kit.jsx";

export const meta = { title: "움직임", order: 4 };

export default function MotionPage() {
  return (
    <Page meta={meta} lead="움직임은 화면이 바뀐 것을 알아차리게 돕습니다. 꾸미기 위해서가 아니라 이유가 있을 때만 씁니다.">
      <Section title="원칙">
        <Rules
          items={[
            "쓸모가 있어야 합니다. 무엇이 어디서 나와 어디로 갔는지 알려 주는 움직임만 씁니다.",
            "이유가 있어야 합니다. 옆에서 나오는 패널은 옆으로 들어가고, 눌러서 펼친 것은 그 자리에서 접힙니다.",
            "행동과 결과를 잇습니다. 누른 직후에 반응이 보여야 합니다.",
            "짧아야 합니다. 업무 화면에서 움직임은 기다림입니다.",
          ]}
        />
      </Section>

      <Section title="길이">
        <P>컴포넌트에는 아래 길이가 이미 들어 있습니다. 직접 움직임을 만들 때도 이 다섯 가지 중에서 고릅니다.</P>
        <Table
          head={["이름", "길이", "쓰는 곳"]}
          rows={[
            ["아주 빠름", "100ms", "아주 작은 변화 (스위치를 켜고 끌 때)"],
            ["빠름", "200ms", "버튼의 색 변화, 드롭다운, 접었다 펴는 영역, 모달. 컴포넌트 대부분이 이 길이입니다."],
            ["보통", "300ms", "조금 더 큰 요소가 나타나거나 사라질 때"],
            ["느림", "400ms", "화면의 큰 부분이 바뀔 때"],
            ["아주 느림", "500ms", "화면 밖에서 들어오거나 나가는 큰 요소"],
          ]}
        />
        <Demo column caption="눌러서 길이를 느껴 봅니다">
          <Accordion>
            <Accordion.Item value={1}>
              <Accordion.Item.Toggle p={2}>접었다 펴는 영역 (빠름)</Accordion.Item.Toggle>
              <Accordion.Item.Collapse><Box p={2}>펼친 내용입니다.</Box></Accordion.Item.Collapse>
            </Accordion.Item>
          </Accordion>
          <Box>
            <Button onClick={() => noticeBubbleDefaultManager.add({ children: "저장했습니다.", duration: 4000 })}>짧은 알림 띄우기</Button>
          </Box>
        </Demo>
      </Section>

      <Section title="하지 않는 것">
        <Rules
          items={[
            "1초에 세 번 넘게 깜박이는 것을 만들지 않습니다.",
            "한 번의 움직임은 2초를 넘기지 않습니다. 로딩 표시는 예외입니다.",
            "움직임이 끝날 때까지 사용자가 아무것도 못 하게 붙잡아 두지 않습니다.",
            "주의를 끌려고 계속 움직이는 것(흔들리는 아이콘, 반짝이는 버튼)을 두지 않습니다.",
          ]}
        />
      </Section>

      <Section title="움직임을 줄인 사용자">
        <P>
          운영체제에서 "움직임 줄이기"를 켠 사용자에게는 움직임을 없애거나 흐려짐 정도로 바꿉니다. 직접 만든 움직임에는 CSS의 <Code>prefers-reduced-motion</Code>으로 이 설정을 반영합니다.
        </P>
      </Section>
    </Page>
  );
}

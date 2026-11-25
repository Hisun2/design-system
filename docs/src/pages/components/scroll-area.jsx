import React from "react";
import { ScrollArea, Box, Flex, Text } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "ScrollArea" };

const documents = [
  "견적서 2026-11-03",
  "발주서 2026-11-05",
  "계약서 2026-11-08",
  "검수 확인서 2026-11-12",
  "세금계산서 2026-11-14",
  "납품 확인서 2026-11-18",
  "정산 내역서 2026-11-21",
  "변경 계약서 2026-11-24",
];

const DocumentList = () => (
  <Flex direction="column" gap={3} p={3}>
    {documents.map((name) => (
      <Text key={name} size={200}>{name}</Text>
    ))}
  </Flex>
);

export default function ScrollAreaPage() {
  return (
    <Page meta={meta} lead="내용이 정해진 자리보다 길거나 넓을 때 그 안에서만 밀어 볼 수 있게 하는 영역입니다. 브라우저 기본 스크롤 막대 대신 우리 모양의 얇은 막대를 보여 줍니다.">
      <Section title="구성">
        <Table
          head={["부품", "역할"]}
          rows={[
            [<Code>ScrollArea</Code>, "바깥 틀입니다. 높이나 폭을 여기에 정합니다."],
            [<Code>ScrollArea.Container</Code>, "실제 내용이 들어가는 자리입니다."],
            [<Code>ScrollArea.Bar</Code>, "스크롤 막대가 지나가는 길입니다. 세로·가로를 따로 둡니다."],
            [<Code>ScrollArea.Bar.Slider</Code>, "막대 위에서 움직이는 손잡이입니다."],
          ]}
        />
        <Demo caption="내용만 넣으면 막대는 알아서 붙습니다">
          <Box w={280}>
            <ScrollArea h={140}>
              <DocumentList />
            </ScrollArea>
          </Box>
        </Demo>
        <Demo caption="부품을 직접 적은 모양 — 막대의 방향을 정할 때 씁니다">
          <Box w={280}>
            <ScrollArea h={140}>
              <ScrollArea.Container>
                <DocumentList />
              </ScrollArea.Container>
              <ScrollArea.Bar orientation="vertical" />
            </ScrollArea>
          </Box>
        </Demo>
      </Section>

      <Section title="모양">
        <Rules
          items={[
            <>막대가 지나가는 길(<Code>ScrollArea.Bar</Code>)은 바탕색이 없습니다. 내용 위에 겹쳐 보입니다.</>,
            <>손잡이 색은 <Code>--ec-border-control</Code>입니다. 다른 색으로 바꾸지 않습니다.</>,
            <><Code>shadow</Code>를 주면 가려진 내용이 있는 쪽 가장자리에 옅은 그림자가 나옵니다. 더 볼 내용이 있음을 알립니다.</>,
          ]}
        />
        <Demo caption="shadow — 아래에 내용이 더 있음을 그림자로 알립니다">
          <Box w={280}>
            <ScrollArea h={140} shadow>
              <DocumentList />
            </ScrollArea>
          </Box>
        </Demo>
        <Demo caption="가로 스크롤 — 폭이 넓은 내용">
          <Box w={280}>
            <ScrollArea shadow>
              <Flex gap={6} p={3} w="max-content">
                {documents.map((name) => (
                  <Text key={name} size={200} noWrap flex="0 0 auto">{name}</Text>
                ))}
              </Flex>
            </ScrollArea>
          </Box>
        </Demo>
      </Section>

      <Section title="동작">
        <P>영역 안의 내용은 아래 네 가지 방법으로 밀어 볼 수 있습니다.</P>
        <Rules
          items={[
            "마우스 휠을 굴립니다.",
            "영역에 초점을 둔 뒤 방향키를 누릅니다.",
            "터치패드에서 두 손가락으로 밉니다.",
            "막대의 손잡이를 잡고 끕니다.",
          ]}
        />
        <P>영역 안의 입력창이나 버튼에 초점이 가면 그 요소가 보이는 자리까지 저절로 밀립니다.</P>
      </Section>

      <Section title="쓰는 법">
        <Rules
          items={[
            "높이나 폭을 반드시 정합니다. 정하지 않으면 내용만큼 늘어나 스크롤이 생기지 않습니다.",
            "한 화면에서 스크롤 영역을 겹쳐 두지 않습니다. 영역 안에 또 영역을 넣으면 어느 쪽이 밀리는지 알 수 없습니다.",
            "드롭다운 목록, 옆 패널, 모달의 본문처럼 자리가 정해진 곳에 씁니다.",
            "페이지 전체의 스크롤은 브라우저에 맡깁니다.",
          ]}
        />
        <DoDont
          good={{ text: "목록이 일곱 줄을 넘으면 높이를 제한하고 그림자를 켭니다." }}
          bad={{ text: "두세 줄뿐인 내용을 좁은 영역에 넣어 일부러 스크롤을 만들지 않습니다." }}
        />
      </Section>
    </Page>
  );
}

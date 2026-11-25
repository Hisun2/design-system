import React from "react";
import { SpinContainer, Spin, Button, Input, Box, Flex, Text } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "SpinContainer" };

const FormSample = () => (
  <Flex direction="column" gap={2} w={240}>
    <Text size={200}>거래처 이름</Text>
    <Input><Input.Value placeholder="거래처 이름 입력" aria-label="거래처 이름" /></Input>
    <Text size={200}>담당자</Text>
    <Input><Input.Value placeholder="담당자 이름 입력" aria-label="담당자" /></Input>
  </Flex>
);

function ToggleDemo() {
  const [loading, setLoading] = React.useState(false);
  return (
    <Flex direction="column" gap={4} alignItems="flex-start">
      <SpinContainer loading={loading}>
        <FormSample />
      </SpinContainer>
      <Button onClick={() => setLoading(!loading)}>{loading ? "불러오기 끝내기" : "불러오는 모습 보기"}</Button>
    </Flex>
  );
}

export default function SpinContainerPage() {
  return (
    <Page meta={meta} lead="폼, 표, 페이지처럼 넓은 영역을 반투명 막으로 덮고 가운데에 Spin을 돌리는 요소입니다. 얼마나 걸릴지 알 수 없는 불러오기에 씁니다.">
      <Section title="구성">
        <Demo caption="버튼을 눌러 불러오는 모습을 켜고 끕니다">
          <ToggleDemo />
        </Demo>
        <Table
          head={["부품", "역할"]}
          rows={[
            [<Code>SpinContainer</Code>, <>덮을 영역을 감쌉니다. <Code>loading</Code>이 참이면 막과 고리가 나옵니다.</>],
            [<Code>SpinContainer.Content</Code>, "덮이는 내용입니다. 막의 내용을 직접 꾸밀 때 따로 적습니다."],
            [<Code>SpinContainer.Overlay</Code>, "내용 위를 덮는 막입니다. 고리 옆에 글자를 넣을 때 직접 적습니다."],
          ]}
        />
        <Demo caption="막 안에 글자를 함께 넣은 모양">
          <SpinContainer loading>
            <SpinContainer.Content>
              <FormSample />
            </SpinContainer.Content>
            <SpinContainer.Overlay>
              <Flex direction="column" gap={2} alignItems="center">
                <Spin size="l" />
                <Text size={200} color="text-secondary">저장하는 중…</Text>
              </Flex>
            </SpinContainer.Overlay>
          </SpinContainer>
        </Demo>
      </Section>

      <Section title="모양">
        <Rules
          items={[
            "고리는 언제나 덮은 영역의 가로·세로 가운데에 놓입니다.",
            <>고리의 기본 크기는 XXL입니다. 영역이 작으면 <Code>size</Code>로 줄입니다.</>,
            <>어둡거나 색이 있는 바탕 위에서는 <Code>theme="invert"</Code>를 씁니다.</>,
            "막은 내용이 비쳐 보일 만큼만 덮습니다. 내용을 완전히 가리지 않습니다.",
          ]}
        />
        <Demo caption="size=&quot;m&quot; — 작은 영역">
          <SpinContainer loading size="m">
            <Box w={200} p={4}>
              <Text size={200}>승인 대기 문서 12건</Text>
            </Box>
          </SpinContainer>
        </Demo>
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "막은 200ms에 걸쳐 나타나고 사라집니다.",
            "덮여 있는 동안 안쪽의 버튼과 입력창은 누를 수 없고 키보드 초점도 받지 않습니다.",
            "불러오기가 끝나면 막을 걷고 내용을 그대로 다시 보여 줍니다. 영역의 크기가 바뀌지 않게 합니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <Rules
          items={[
            "이미 보이는 내용을 다시 불러오거나 저장할 때 씁니다. 필터를 바꾼 표, 저장 중인 폼이 대표적입니다.",
            "영역을 처음 불러올 때는 Skeleton을 씁니다.",
            "걸리는 시간을 알 수 없을 때 씁니다. 진행 정도를 알 수 있으면 ProgressBar를 씁니다.",
            "오래 걸릴 수 있으면 고리 아래에 \"불러오는 중…\"처럼 지금 하는 일을 적습니다.",
          ]}
        />
        <DoDont
          good={{ text: "필터를 바꿨을 때 표 영역만 덮습니다. 필터와 페이지 제목은 그대로 쓸 수 있습니다." }}
          bad={{ text: "표 하나를 다시 불러오면서 페이지 전체를 덮지 않습니다. 기다리는 동안 다른 일을 할 수 없게 됩니다." }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["상황", "쓸 것"]}
          rows={[
            ["폼·표·페이지를 다시 불러오거나 저장할 때", "SpinContainer"],
            ["표의 칸, 버튼처럼 작은 요소 하나를 기다릴 때", "Spin"],
            ["영역을 처음 불러올 때", "Skeleton"],
          ]}
        />
        <P>옆 패널 본문을 다시 불러올 때도 XXL 크기의 SpinContainer를 씁니다.</P>
      </Section>
    </Page>
  );
}

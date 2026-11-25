import React from "react";
import { Slider, InputNumber, Box, Flex, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Slider" };

const levels = [
  { value: 1, label: "낮음" },
  { value: 2, label: "보통" },
  { value: 3, label: "높음" },
];

function LinkedSlider() {
  const [value, setValue] = React.useState(30);
  return (
    <Flex gap={4} alignItems="center">
      <Box w={200}>
        <Slider value={value} onChange={setValue} min={0} max={100} step={1} aria-label="할인율" />
      </Box>
      <InputNumber w={96}>
        <InputNumber.Value value={String(value)} onChange={(next) => setValue(Number(next) || 0)} min={0} max={100} aria-label="할인율 직접 입력" />
        <InputNumber.Addon>%</InputNumber.Addon>
      </InputNumber>
    </Flex>
  );
}

export default function SliderPage() {
  return (
    <Page meta={meta} lead="정해진 범위 안에서 손잡이를 끌어 값을 고르는 요소입니다. 정확한 숫자보다 대략의 정도를 정할 때 씁니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "고를 수 있는 범위를 눈으로 보여 주고 그 안에서 대략의 값을 고르게 할 때 씁니다.",
            "숫자 입력창의 최솟값과 최댓값이 어디까지인지 함께 보여 주고 싶을 때 씁니다.",
            "밝기, 소리 크기, 비율처럼 정확한 숫자가 중요하지 않은 값을 조절할 때 씁니다.",
          ]}
        />
        <P>선택지가 몇 개로 정해져 있을 때보다 범위가 넓을 때 더 잘 맞습니다. 끊김 없이 움직여 볼 수 있기 때문입니다.</P>
      </Section>

      <Section title="구성">
        <Demo>
          <Box w={240}>
            <Slider defaultValue={30} min={0} max={100} step={1} aria-label="할인율" />
          </Box>
        </Demo>
        <Table
          head={["부품", "역할"]}
          rows={[
            [<Code>Slider.Bar</Code>, "값의 범위를 나타내는 막대입니다. 고른 값까지는 Blue로 채워집니다."],
            [<Code>Slider.Knob</Code>, "끌어서 값을 바꾸는 손잡이입니다."],
            [<Code>Slider.Options</Code>, "막대 아래에 놓이는 값 이름표의 줄입니다. 없어도 됩니다."],
            [<Code>Slider.Item</Code>, "이름표 하나입니다."],
          ]}
        />
        <Rules
          items={[
            <>범위는 <Code>min</Code>, <Code>max</Code>로, 한 번에 움직이는 양은 <Code>step</Code>으로 정합니다. 기본은 0부터 100까지, 1씩입니다.</>,
            "손잡이와 막대는 기본 크기를 그대로 씁니다. 작게 만들면 잡기 어렵고 고르는 데 시간이 더 걸립니다.",
            <>채워진 막대와 손잡이 테두리의 색은 <Code>--ec-control-primary-info</Code>, 빈 막대는 <Code>--ec-track</Code>입니다.</>,
          ]}
        />
      </Section>

      <Section title="값 이름표">
        <Demo caption="options — 막대 아래에 값의 이름을 보여 줍니다">
          <Box w={240}>
            <Slider defaultValue={2} min={1} max={3} step={1} options={levels} aria-label="알림 빈도" />
          </Box>
        </Demo>
        <Rules
          items={[
            "값에 이름이 있으면 막대 아래에 이름표를 둡니다. 이름표는 누르는 것이 아니라 값의 뜻을 알려 주는 글자입니다.",
            "손가락으로 누르는 화면에서는 이름표를 막대 아래에 두지 않습니다. 손가락에 가려집니다. 막대 위나 왼쪽·오른쪽에 둡니다.",
            "손가락으로 누르는 화면에서 지금 값을 풍선으로 보여 줄 때는 손잡이 위쪽에 띄웁니다.",
          ]}
        />
      </Section>

      <Section title="상태">
        <Demo caption="기본 / 비활성">
          <Box w={200}><Slider defaultValue={40} aria-label="기본" /></Box>
          <Box w={200}><Slider defaultValue={40} disabled aria-label="비활성" /></Box>
        </Demo>
        <Rules
          items={[
            <>마우스를 올리거나 끄는 동안에는 손잡이 테두리가 <Code>--ec-control-primary-info-hover</Code>로 진해집니다.</>,
            "키보드로 초점을 주면 파란 테두리가 나옵니다. 방향키로 한 칸씩 움직입니다.",
            "비활성 상태에서는 흐리게 보이고 끌 수 없습니다. 왜 바꿀 수 없는지 가까이에 적습니다.",
          ]}
        />
      </Section>

      <Section title="입력창과 함께 쓰기">
        <Demo caption="막대와 숫자 입력창이 같은 값을 가리킵니다">
          <LinkedSlider />
        </Demo>
        <Rules
          items={[
            "정확한 값이 필요할 수 있으면 숫자 입력창을 옆에 둡니다. 잘못된 값을 막는 가장 쉬운 방법입니다.",
            "입력창에 값을 넣으면 손잡이가 그 값의 자리로 옮겨 갑니다. 이때 막대에는 마우스를 올린 모양을 적용하지 않습니다.",
            "입력창을 누르면 손잡이가 해당 값의 자리에서 눌린 모양이 됩니다.",
            "입력창에 초점이 있을 때도 방향키로 값을 올리고 내릴 수 있어야 합니다.",
            "최댓값보다 큰 값을 넣으면 입력창에 주의 색 설명 풍선으로 넣을 수 있는 범위를 알립니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <Sub title="손가락으로 누르는 화면">
          <Rules
            items={[
              "손가락으로 정확한 자리에 끌어다 놓기는 어렵습니다. 손을 뗄 때 값이 밀리는 일이 흔합니다.",
              "좁은 화면에서 정확한 값이 필요하면 Slider 대신 숫자 입력창이나 Select를 씁니다.",
            ]}
          />
        </Sub>
        <DoDont
          good={{
            demo: (
              <Flex direction="column" gap={2}>
                <Text size={200}>화면 밝기</Text>
                <Box w={200}><Slider defaultValue={70} aria-label="화면 밝기" /></Box>
              </Flex>
            ),
            text: "대략의 정도를 고르는 값에 씁니다. 무엇을 조절하는지 이름표를 붙입니다.",
          }}
          bad={{
            demo: (
              <Flex direction="column" gap={2}>
                <Text size={200}>결제 금액</Text>
                <Box w={200}><Slider defaultValue={12480} min={0} max={100000} aria-label="결제 금액" /></Box>
              </Flex>
            ),
            text: "금액이나 수량처럼 한 자리까지 정확해야 하는 값에는 쓰지 않습니다. InputNumber를 씁니다.",
          }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["상황", "쓸 것"]}
          rows={[
            ["범위 안에서 대략의 값을 고를 때", "Slider"],
            ["정확한 숫자를 넣을 때", "InputNumber"],
            ["두세 가지 중 하나를 고를 때", "Radio 또는 Pills"],
            ["켜고 끄기만 할 때", "Switch"],
          ]}
        />
      </Section>
    </Page>
  );
}

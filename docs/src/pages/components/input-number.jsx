import React from "react";
import { InputNumber, Text, Flex, ButtonLink } from "@ec21rnc/ui";
import MathPlusM from "@semcore/icon/MathPlus/m";
import MathMinusM from "@semcore/icon/MathMinus/m";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "InputNumber" };

function Range({ size = "m" }) {
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const swap = () => {
    if (from !== "" && to !== "" && Number(from) > Number(to)) {
      setFrom(to);
      setTo(from);
    }
  };
  return (
    <Flex onBlur={swap}>
      <InputNumber w={100} size={size} neighborLocation="right">
        <InputNumber.Value min={0} value={from} onChange={setFrom} placeholder="부터" aria-label="금액 부터" />
        <InputNumber.Controls />
      </InputNumber>
      <InputNumber w={100} size={size} neighborLocation="left">
        <InputNumber.Value min={0} value={to} onChange={setTo} placeholder="까지" aria-label="금액 까지" />
        <InputNumber.Controls />
      </InputNumber>
    </Flex>
  );
}

function PlusMinus() {
  const [value, setValue] = React.useState("1");
  const move = (step) => setValue(String(Math.min(99, Math.max(1, Number(value || 0) + step))));
  return (
    <InputNumber w={120}>
      <InputNumber.Addon>
        <ButtonLink use="secondary" addonLeft={MathMinusM} aria-label="하나 줄이기" onClick={() => move(-1)} />
      </InputNumber.Addon>
      <InputNumber.Value min={1} max={99} value={value} onChange={setValue} aria-label="수량" />
      <InputNumber.Addon>
        <ButtonLink use="secondary" addonLeft={MathPlusM} aria-label="하나 늘리기" onClick={() => move(1)} />
      </InputNumber.Addon>
    </InputNumber>
  );
}

export default function InputNumberPage() {
  return (
    <Page meta={meta} lead="숫자만 받는 입력창입니다. 오른쪽의 올림·내림 버튼으로 값을 한 단계씩 바꿀 수 있습니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "버튼으로 값을 조금씩 올리고 내리는 것이 편할 때 씁니다.",
            "값에 글자, 빗금, 붙임표 같은 숫자 아닌 것이 들어가면 안 될 때 씁니다.",
            "셀 수 있는 양을 받을 때 씁니다. 문서 수, 수량, 금액, 나이가 그런 예입니다.",
            "숫자로 이루어졌다고 모두 InputNumber로 받지는 않습니다. 날짜, 인증 번호, 우편번호는 양이 아닙니다.",
          ]}
        />
        <P>
          숫자 사이에 붙임표나 빗금이 들어가는 값은 InputNumber로 받지 않습니다. 숫자 아닌 글자를 모두 지워 버리기 때문입니다. 이런 값은 보통 Input에 <Code>inputMode="numeric"</Code>과 <Code>pattern</Code>을 주어 받습니다.
        </P>
      </Section>

      <Section title="구성">
        <Demo>
          <InputNumber w={120}>
            <InputNumber.Value min={0} max={100} step={5} defaultValue="10" aria-label="수량" />
            <InputNumber.Controls showControls />
          </InputNumber>
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>InputNumber</Code>, "바깥 상자입니다. Input과 같은 크기·상태 속성을 받습니다."],
            [<Code>InputNumber.Value</Code>, <>숫자를 적는 곳입니다. <Code>min</Code>, <Code>max</Code>, <Code>step</Code>을 받습니다.</>],
            [<Code>InputNumber.Controls</Code>, <>올림·내림 버튼입니다. 넣지 않으면 버튼이 없습니다. <Code>showControls</Code>를 주면 늘 보입니다.</>],
            [<Code>InputNumber.Addon</Code>, "숫자 앞뒤의 덧붙이는 자리입니다. 단위(원, 개)를 적을 때 씁니다."],
          ]}
        />
        <Rules
          items={[
            "기본으로 숫자, 마침표, 쉼표, 빼기 기호만 들어갑니다. 그 밖의 글자는 쳐도 들어가지 않습니다.",
            "올림·내림 버튼을 둘지 뺄지 정할 수 있습니다.",
            "가장 작은 값과 가장 큰 값을 정할 수 있습니다.",
            "한 번에 바뀌는 크기(step)를 정할 수 있습니다. 버튼과 위·아래 화살표 키가 이 크기만큼 값을 바꿉니다.",
          ]}
        />
      </Section>

      <Section title="크기">
        <Demo>
          <InputNumber w={120}>
            <InputNumber.Value defaultValue="32" aria-label="M 크기" />
            <InputNumber.Controls showControls />
          </InputNumber>
          <InputNumber w={120} size="l">
            <InputNumber.Value defaultValue="44" aria-label="L 크기" />
            <InputNumber.Controls showControls />
          </InputNumber>
        </Demo>
        <Rules
          items={[
            "M(32px)이 기본이고 L(44px)이 있습니다. 올림·내림 버튼은 입력창 크기에 맞춰 커집니다.",
            "버튼이 눌리는 영역은 눈에 보이는 화살표보다 넓습니다.",
          ]}
        />
      </Section>

      <Section title="폭">
        <DoDont
          good={{
            demo: (
              <InputNumber w={72}>
                <InputNumber.Value min={1} max={7} defaultValue="5" aria-label="주간 근무일" />
                <InputNumber.Controls showControls />
              </InputNumber>
            ),
            text: "들어갈 수 있는 가장 큰 숫자가 보일 만큼만 넓힙니다.",
          }}
          bad={{
            demo: (
              <InputNumber w={280}>
                <InputNumber.Value min={1} max={7} defaultValue="5" aria-label="주간 근무일" />
                <InputNumber.Controls showControls />
              </InputNumber>
            ),
            text: "한 자리 숫자를 받는데 길게 늘이지 않습니다. 큰 값을 적어야 하는 것처럼 보입니다.",
          }}
        />
      </Section>

      <Section title="상태와 동작">
        <Demo caption="기본(초점이 들어가면 버튼이 나옵니다) / 안내 숫자 / 잘못됨 / 비활성">
          <InputNumber w={120}>
            <InputNumber.Value defaultValue="10" aria-label="기본" />
            <InputNumber.Controls />
          </InputNumber>
          <InputNumber w={120}>
            <InputNumber.Value placeholder="0" aria-label="안내 숫자" />
            <InputNumber.Controls />
          </InputNumber>
          <InputNumber w={120} state="invalid">
            <InputNumber.Value defaultValue="10" aria-label="잘못된 값" />
            <InputNumber.Controls />
          </InputNumber>
          <InputNumber w={120} disabled>
            <InputNumber.Value defaultValue="10" aria-label="비활성" />
            <InputNumber.Controls />
          </InputNumber>
        </Demo>
        <Table
          head={["상태", "모양"]}
          rows={[
            ["기본", "올림·내림 버튼이 숨어 있습니다."],
            ["마우스 올림", "보통 입력창(Input)과 같습니다."],
            ["초점 들어감", <>파란 테두리와 함께 올림·내림 버튼이 나옵니다. 화살표 색은 <Code>--ec-text-secondary</Code>입니다.</>],
            ["버튼에 마우스 올림", "화살표가 한 단계 진해집니다."],
          ]}
        />
        <Rules
          items={[
            "위·아래 화살표 키는 step만큼, Shift와 함께 누르면 더 크게 값을 바꿉니다.",
            "필요하면 숫자를 안내 글자로 넣을 수 있습니다.",
            "올림·내림 버튼은 고를 값이 적을 때 선택 목록보다 빠릅니다. 사람 수처럼 대부분 1~2를 고르는 자리가 그렇습니다.",
          ]}
        />
      </Section>

      <Section title="값 검사">
        <Rules
          items={[
            "다른 입력창처럼 꼭 적어야 하는 칸으로 만들 수 있습니다. 검사와 오류 안내는 폼의 규칙을 따릅니다.",
            "가장 작은 값과 가장 큰 값을 정해 두면 벗어난 값을 알아서 바로잡습니다.",
            "step을 정해 두면 버튼으로 올바른 값만 고르게 할 수 있습니다.",
          ]}
        />
      </Section>

      <Section title="범위 입력">
        <Demo caption="M / L">
          <Range />
          <Range size="l" />
        </Demo>
        <Rules
          items={[
            "숫자의 범위는 InputNumber 둘을 붙여서 받습니다.",
            "안내 글자로 \"부터\", \"까지\"를 넣을 수 있습니다.",
            "오른쪽 값이 왼쪽 값보다 작으면, 두 입력창이 모두 초점을 잃을 때 두 값을 서로 바꿉니다. 오류로 막지 않습니다.",
          ]}
        />
      </Section>

      <Section title="더하기·빼기 버튼 모양">
        <Demo>
          <PlusMinus />
        </Demo>
        <P>
          올림·내림 화살표 대신 양쪽에 빼기·더하기 버튼을 둘 수 있습니다. 수량처럼 값을 버튼으로만 바꾸는 일이 많은 자리에 씁니다. 버튼은 글자 없는 ButtonLink로 만들고 이름(aria-label)을 붙입니다.
        </P>
      </Section>

      <Section title="경계에서 일어나는 일">
        <Table
          head={["경우", "결과"]}
          rows={[
            ["정한 범위를 벗어난 값", "초점을 잃을 때 가장 작은 값 또는 가장 큰 값으로 바뀝니다."],
            ["범위를 정하지 않음", "검사하지 않습니다. 적은 값을 그대로 둡니다."],
            ["소수", "마침표로 소수를 적을 수 있습니다. 마침표와 쉼표 가운데 어느 것을 소수점으로 쓸지는 지역 설정을 따르고, 다른 쪽으로 적으면 맞는 기호로 바꿉니다."],
            ["음수", "양수만 받는 입력창에는 빼기 기호가 들어가지 않습니다."],
            ["0", "다른 숫자와 똑같이 다룹니다. 0이 범위 안이면 그대로 두고, 가장 작은 값보다 작으면 가장 작은 값으로 바꿉니다."],
            ["앞에 붙은 0", "0 뒤에 숫자를 이어 적으면 초점을 잃을 때 앞의 0을 지웁니다. 001은 1이 됩니다."],
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "단위는 입력창 안 뒤쪽이나 이름표에 적습니다(\"수량 (개)\", \"금액 (원)\").",
            "금액처럼 큰 숫자는 보여 줄 때 세 자리마다 쉼표를 넣습니다.",
          ]}
        />
        <Demo>
          <Flex direction="column">
            <Text tag="label" htmlFor="number-amount" size={200} mb={1}>금액</Text>
            <InputNumber w={160}>
              <InputNumber.Value id="number-amount" min={0} step={1000} defaultValue="12000" />
              <InputNumber.Addon><Text color="var(--ec-text-secondary)">원</Text></InputNumber.Addon>
              <InputNumber.Controls />
            </InputNumber>
          </Flex>
        </Demo>
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Rules
          items={[
            "범위 안에서 대강의 값을 고르면 되는 자리에는 Slider를 씁니다.",
            "구분 기호가 든 번호(사업자등록번호 등)에는 InputMask나 Input을 씁니다.",
            "날짜는 DatePicker로 받습니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

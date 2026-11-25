import React from "react";
import { InputMask, Text, Flex } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "InputMask" };

function BizNumber({ size = "m", id }) {
  const [value, setValue] = React.useState("");
  return (
    <Flex direction="column">
      <Text tag="label" htmlFor={id} size={size === "l" ? 300 : 200} mb={size === "l" ? 2 : 1}>사업자등록번호</Text>
      <InputMask w={200} size={size}>
        <InputMask.Value
          id={id}
          mask="999-99-99999"
          placeholder="___-__-_____"
          title="숫자 10자리"
          value={value}
          onChange={setValue}
        />
      </InputMask>
      <Text size={size === "l" ? 200 : 100} color="var(--ec-text-secondary)" mt={size === "l" ? 2 : 1}>숫자 10자리를 적습니다.</Text>
    </Flex>
  );
}

export default function InputMaskPage() {
  return (
    <Page meta={meta} lead="값의 꼴을 미리 정해 두는 입력창입니다. 몇 글자를 어떤 모양으로 적어야 하는지 보여 주고, 적는 대로 구분 기호를 채워 줍니다.">
      <Section title="먼저 알아 둘 것">
        <P>
          InputMask는 다음 큰 판에서 없어질 예정입니다. 새 화면에는 될 수 있으면 쓰지 않습니다. 이미 쓰고 있는 화면은 바뀌는 때에 맞춰 Input과 값 검사로 옮깁니다.
        </P>
      </Section>

      <Section title="언제 쓰는가">
        <Rules
          items={[
            "값의 꼴을 정확히 알 때 씁니다. 사업자등록번호, 우편번호, 카드 유효기간이 그런 예입니다.",
            "정해진 수의 글자를, 그것도 꽤 길게 적어야 할 때 씁니다.",
            "꼴을 정확히 모르면 쓰지 않습니다. 맞는 값을 막게 됩니다.",
            "마스크를 안내 글자(placeholder) 대신으로 쓰지 않습니다. 둘은 하는 일이 다릅니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Demo>
          <BizNumber id="mask-biz-m" />
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>InputMask</Code>, "바깥 상자입니다. Input과 같은 크기·상태 속성을 받습니다."],
            [<Code>InputMask.Value</Code>, <>글자를 적는 곳입니다. <Code>mask</Code>로 꼴을 정합니다.</>],
            [<Code>InputMask.Addon</Code>, "글자 앞뒤의 덧붙이는 자리입니다. Input과 같습니다."],
          ]}
        />
        <Table
          head={["마스크 글자", "받는 값"]}
          rows={[
            [<Code>9</Code>, "숫자 하나"],
            [<Code>a</Code>, "글자 하나"],
            [<Code>*</Code>, "숫자 또는 글자 하나"],
            ["그 밖의 글자", "그대로 찍히는 구분 기호(-, /, 빈칸 등)"],
          ]}
        />
        <P>
          다른 규칙이 필요하면 <Code>aliases</Code>로 마스크 글자와 받을 값을 직접 짝지을 수 있습니다. 마스크를 다 채우면 <Code>onSuccess</Code>가 불립니다.
        </P>
      </Section>

      <Section title="모양">
        <Table
          head={["요소", "글자 색", "설명"]}
          rows={[
            ["안내 글자", <Code>--ec-text-hint</Code>, "비어 있을 때 보이는 꼴입니다. 마스크와 같은 꼴로 적습니다."],
            ["마스크", <Code>--ec-text-primary</Code>, "초점이 들어가면 나옵니다. 아직 채우지 않은 자리는 밑줄(_)로 보입니다."],
          ]}
        />
        <Rules
          items={[
            "글자 하나가 들어갈 자리마다 밑줄(_) 하나를 둡니다.",
            "안내 글자를 마스크와 같은 꼴로 반드시 넣습니다. 폼을 훑어볼 때 어디가 비었는지 알 수 있습니다.",
          ]}
        />
      </Section>

      <Section title="도움말">
        <Demo>
          <BizNumber id="mask-biz-hint-m" />
          <BizNumber id="mask-biz-hint-l" size="l" />
        </Demo>
        <Table
          head={["입력창 크기", "도움말 글자", "입력창과의 간격"]}
          rows={[
            ["M · 32px", <>12px (<Code>--ec-fs-100</Code>, <Code>--ec-lh-100</Code>)</>, "4px"],
            ["L · 44px", <>14px (<Code>--ec-fs-200</Code>, <Code>--ec-lh-200</Code>)</>, "8px"],
          ]}
        />
        <P>꼴이 정해진 입력창에는 어떻게 적는지 알려 주는 글을 눈에 보이게 붙입니다.</P>
      </Section>

      <Section title="상태와 동작">
        <Table
          head={["상태", "모양"]}
          rows={[
            ["비어 있음", "안내 글자가 보입니다."],
            ["초점 들어감", "마스크가 나오고, 채울 자리가 밑줄로 보입니다."],
            ["채움", "적은 값이 구분 기호와 함께 보입니다."],
          ]}
        />
        <Rules
          items={[
            "꼴에 맞지 않는 글자는 적는 즉시 지워집니다. 숫자 자리에 빗금(/)이나 글자를 치면 들어가지 않습니다.",
            "구분 기호는 사용자가 치지 않아도 알아서 들어갑니다.",
            "붙여 넣은 값도 같은 규칙으로 걸러집니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "사업자등록번호처럼 자릿수와 구분 기호가 정해진 값에 씁니다." }}
          bad={{ text: "이름, 주소, 나라마다 꼴이 다른 전화번호처럼 꼴을 확신할 수 없는 값에는 쓰지 않습니다." }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Rules
          items={[
            "숫자 하나(수량, 금액)를 받을 때는 InputNumber를 씁니다.",
            "날짜와 시간은 DatePicker, TimePicker를 씁니다.",
            "꼴이 정해지지 않은 글자는 Input을 씁니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

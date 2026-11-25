import React from "react";
import { Input, InputMask, Select, Flags, Text, Flex } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "InputPhone" };

const COUNTRIES = [
  { code: "KR", name: "대한민국", dial: "+82", mask: "+82 99-9999-9999" },
  { code: "US", name: "미국", dial: "+1", mask: "+1 999-999-9999" },
  { code: "JP", name: "일본", dial: "+81", mask: "+81 99-9999-9999" },
  { code: "VN", name: "베트남", dial: "+84", mask: "+84 999-999-999" },
];

const onlyPhoneChars = (value) => value.replace(/[^\d+\s-]/g, "");

function Labeled({ id, label = "전화번호", hint, size = "m", children }) {
  return (
    <Flex direction="column">
      <Text tag="label" htmlFor={id} size={size === "l" ? 300 : 200} mb={size === "l" ? 2 : 1}>{label}</Text>
      {children}
      {hint ? (
        <Text size={size === "l" ? 200 : 100} color="var(--ec-text-secondary)" mt={size === "l" ? 2 : 1}>{hint}</Text>
      ) : null}
    </Flex>
  );
}

function UnknownCountry({ id, size, hint }) {
  const [value, setValue] = React.useState("+");
  return (
    <Labeled id={id} size={size} hint={hint}>
      <Input w={200} size={size}>
        <Input.Value id={id} type="tel" value={value} onChange={(next) => setValue(onlyPhoneChars(next))} />
      </Input>
    </Labeled>
  );
}

function OneCountryNoFormat({ id }) {
  const [value, setValue] = React.useState("+82 ");
  return (
    <Labeled id={id}>
      <Input w={200}>
        <Input.Addon><Flags iso2="KR" /></Input.Addon>
        <Input.Value id={id} type="tel" value={value} onChange={(next) => setValue(onlyPhoneChars(next))} />
      </Input>
    </Labeled>
  );
}

function CountrySelect({ value, onChange }) {
  const current = COUNTRIES.find((country) => country.code === value);
  return (
    <Select value={value} onChange={onChange}>
      <Select.Trigger neighborLocation="right" aria-label={`국가: ${current.name}`}>
        <Flags iso2={current.code} />
      </Select.Trigger>
      <Select.Menu>
        {COUNTRIES.map((country) => (
          <Select.Option value={country.code} key={country.code}>
            <Flags iso2={country.code} mr={2} />
            {country.name}
            <Text color="var(--ec-text-secondary)" ml={2}>{country.dial}</Text>
          </Select.Option>
        ))}
      </Select.Menu>
    </Select>
  );
}

function ManyCountriesNoFormat({ id }) {
  const [country, setCountry] = React.useState("KR");
  const [value, setValue] = React.useState("+82 ");
  const pick = (code) => {
    setCountry(code);
    setValue(`${COUNTRIES.find((item) => item.code === code).dial} `);
  };
  const type = (next) => {
    const cleaned = onlyPhoneChars(next);
    setValue(cleaned);
    const matched = COUNTRIES.find((item) => cleaned.startsWith(item.dial));
    if (matched && matched.code !== country) setCountry(matched.code);
  };
  return (
    <Labeled id={id}>
      <Flex>
        <CountrySelect value={country} onChange={pick} />
        <Input w={180} neighborLocation="left">
          <Input.Value id={id} type="tel" value={value} onChange={type} />
        </Input>
      </Flex>
    </Labeled>
  );
}

function OneCountryWithFormat({ id, hint }) {
  const [value, setValue] = React.useState("");
  return (
    <Labeled id={id} hint={hint}>
      <InputMask w={200}>
        <InputMask.Addon><Flags iso2="KR" /></InputMask.Addon>
        <InputMask.Value
          id={id}
          type="tel"
          mask="+82 99-9999-9999"
          placeholder="+82 __-____-____"
          title="국가 번호 뒤에 숫자 10자리"
          value={value}
          onChange={setValue}
        />
      </InputMask>
    </Labeled>
  );
}

function ManyCountriesWithFormat({ id }) {
  const [country, setCountry] = React.useState("KR");
  const [value, setValue] = React.useState("");
  const current = COUNTRIES.find((item) => item.code === country);
  return (
    <Labeled id={id}>
      <Flex>
        <CountrySelect
          value={country}
          onChange={(code) => {
            setCountry(code);
            setValue("");
          }}
        />
        <InputMask w={180} neighborLocation="left">
          <InputMask.Value
            id={id}
            type="tel"
            mask={current.mask}
            placeholder={current.mask.replace(/9/g, "_")}
            title={`${current.name} 전화번호`}
            value={value}
            onChange={setValue}
          />
        </InputMask>
      </Flex>
    </Labeled>
  );
}

export default function InputPhonePage() {
  return (
    <Page meta={meta} lead="전화번호를 틀리지 않고 적게 돕는 입력 방식입니다. 어떤 꼴로 적어야 하는지 사용자가 망설이지 않게 하는 것이 목적입니다.">
      <Section title="먼저 알아 둘 것">
        <P>
          InputPhone이라는 컴포넌트는 따로 없습니다. <Code>Input</Code>(또는 <Code>InputMask</Code>)에 <Code>Flags</Code>와 <Code>Select</Code>를 붙여 만드는 조합입니다. 이 페이지는 그 조합을 어떻게 짜는지를 정합니다.
        </P>
      </Section>

      <Section title="기본 규칙">
        <Rules
          items={[
            "국가 번호는 미리 채워 둡니다. 국기를 함께 보여 주면 더 분명합니다.",
            "꼴을 알면 마스크로 보여 줍니다. 사용자가 괄호나 붙임표를 직접 치지 않아도 되게 합니다.",
            "적는 예를 보여 줘도 사람들은 제각각의 꼴로 적습니다. 자기가 적은 꼴이 받아들여질지 몰라 머뭇거리기도 합니다. 그래서 꼴을 화면이 대신 잡아 줍니다.",
            "이름표 \"전화번호\"를 반드시 붙입니다. 국기나 마스크처럼 전화번호임을 알릴 단서가 없을 때는 더욱 그렇습니다.",
          ]}
        />
      </Section>

      <Section title="종류">
        <P>사용자의 나라를 아는지, 그 나라의 번호 꼴을 아는지에 따라 세 가지로 나뉩니다.</P>
        <Table
          head={["경우", "구성"]}
          rows={[
            ["나라도 꼴도 모름", "Input 하나. 맨 앞에 +만 채워 둡니다."],
            ["나라는 알지만 꼴은 모름", "국기 + 국가 번호가 채워진 Input. 나라가 여럿이면 국기 Select를 앞에 붙입니다."],
            ["나라와 꼴을 모두 앎", "국기 + 그 나라 꼴의 마스크. 나라가 여럿이면 국기 Select를 앞에 붙입니다."],
          ]}
        />

        <Sub title="나라도 꼴도 모를 때">
          <Demo>
            <UnknownCountry id="phone-unknown" />
          </Demo>
          <Table
            head={["상태", "모양"]}
            rows={[
              ["기본", "맨 앞에 +만 들어 있습니다."],
              ["초점 들어감", "+ 뒤에 커서가 놓입니다."],
              ["채움", "적은 번호가 그대로 보입니다. 꼴을 강제하지 않습니다."],
            ]}
          />
        </Sub>

        <Sub title="나라는 알지만 꼴은 모를 때">
          <Demo caption="나라 하나 / 나라 여럿">
            <OneCountryNoFormat id="phone-one-noformat" />
            <ManyCountriesNoFormat id="phone-many-noformat" />
          </Demo>
          <Table
            head={["나라 수", "기본", "초점 들어감", "채움"]}
            rows={[
              ["하나", "국기와 국가 번호가 채워져 있습니다.", "국가 번호 뒤에 커서가 놓입니다.", "국가 번호 뒤로 적은 번호가 보입니다."],
              ["여럿", "국기 Select와 국가 번호가 채워진 입력창이 붙어 있습니다.", "입력창에만 초점 테두리가 나옵니다.", "다른 국가 번호를 적으면 국기도 그 나라로 바뀝니다."],
            ]}
          />
        </Sub>

        <Sub title="나라와 꼴을 모두 알 때">
          <Demo caption="나라 하나 / 나라 여럿">
            <OneCountryWithFormat id="phone-one-format" />
            <ManyCountriesWithFormat id="phone-many-format" />
          </Demo>
          <Table
            head={["나라 수", "기본", "초점 들어감", "채움"]}
            rows={[
              ["하나", "국기와, 꼴을 보여 주는 안내 글자가 있습니다.", "마스크가 나오고 채울 자리가 밑줄로 보입니다.", "구분 기호가 알아서 들어간 번호가 보입니다."],
              ["여럿", "국기 Select와 마스크 입력창이 붙어 있습니다.", "위와 같습니다.", "나라를 바꾸면 마스크도 그 나라 꼴로 바뀝니다."],
            ]}
          />
          <P>한 나라 또는 몇몇 나라의 번호만 받을 때 가장 알맞은 방식입니다.</P>
        </Sub>

        <P>사용자의 나라를 알면 입력창에 그 나라의 국기를 보여 줍니다. 적은 값을 훑어볼 때 훨씬 빨리 알아봅니다.</P>
      </Section>

      <Section title="도움말">
        <Demo>
          <OneCountryWithFormat id="phone-hint-m" hint="맨 앞의 0은 빼고 적습니다." />
          <UnknownCountry id="phone-hint-l" size="l" hint="국가 번호부터 적습니다." />
        </Demo>
        <Table
          head={["입력창 크기", "도움말 글자", "입력창과의 간격"]}
          rows={[
            ["M · 32px", <>12px (<Code>--ec-fs-100</Code>, <Code>--ec-lh-100</Code>)</>, "4px"],
            ["L · 44px", <>14px (<Code>--ec-fs-200</Code>, <Code>--ec-lh-200</Code>)</>, "8px"],
          ]}
        />
        <P>정해진 꼴로 받아야 하는 입력창에는 어떻게 적는지 알려 주는 글을 눈에 보이게 붙입니다.</P>
      </Section>

      <Section title="동작">
        <P>나라와 꼴을 알아낼 수 있는 경우에 지켜야 할 것입니다.</P>
        <Rules
          items={[
            "숫자만 들어갑니다. 그 밖의 글자는 치거나 붙여 넣을 때 지웁니다.",
            "국가 번호가 붙은 번호를 붙여 넣었는데 지금 고른 나라와 다르면, 그 번호에 맞는 나라로 바꿉니다.",
            "나라와 국가 번호는 사용자가 바꿀 수 있어야 합니다. 다른 나라에 머무는 동안 번호를 적는 경우가 있습니다.",
            "나라 목록에서는 나라 이름 옆에 국가 번호를 함께 보여 줍니다.",
            "꼴을 알면 그 나라에 맞는 마스크를 씁니다.",
            "꼴을 모르면 마스크를 아예 빼고, 맨 앞의 +와 국가 번호만 남깁니다.",
            "국가 번호를 알면 미리 채워 둡니다. 사용자가 지울 수 있어야 합니다.",
            "어느 지역의 꼴이 맞는지 확신이 없거나 그 지역 사용자가 아주 적으면, 확인하지 못한 나라에서는 마스크를 끄고 아무 제한 없는 보통 입력창으로 받습니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "폭은 번호 길이에 맞춥니다. 보통 160px에서 250px 사이입니다. 얼마나 적어야 하는지가 폭에서 읽힙니다." }}
          bad={{ text: "나라마다 다른 번호를 한 가지 마스크에 끼워 맞추지 않습니다. 맞는 번호를 적지 못하게 됩니다." }}
        />
        <Rules
          items={[
            "국내 번호만 받는 화면이라면 국기와 국가 번호 없이 \"010-0000-0000\" 꼴의 마스크만 써도 됩니다.",
            "저장할 때는 구분 기호를 뺀 숫자와 국가 번호로 맞춰 둡니다. 화면에 보여 줄 때 다시 꼴을 입힙니다.",
          ]}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Rules
          items={[
            "사업자등록번호처럼 나라와 관계없이 꼴이 하나인 번호는 InputMask만 씁니다.",
            "수량·금액 같은 숫자는 InputNumber를 씁니다. 전화번호는 양이 아니므로 InputNumber로 받지 않습니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

import React from "react";
import { Button, Input, Tooltip, Notice, Flex, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code, Swatch } from "../../kit.jsx";

export const meta = { title: "입력값 검사", order: 2 };

const isEmail = (v) => /.+@.+\..+/.test(v);

/** 입력창을 벗어날 때 검사하는 예시. 빈 칸은 검사하지 않습니다. */
function BlurDemo() {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");
  return (
    <Flex direction="column" gap={1}>
      <Text tag="label" size={200} htmlFor="val-blur">담당자 이메일</Text>
      <Tooltip title={error} theme="warning" placement="right" interaction={error ? "focus" : "none"}>
        <Input w={260} state={error ? "invalid" : "normal"}>
          <Input.Value
            id="val-blur"
            value={value}
            aria-invalid={Boolean(error)}
            onChange={(v) => {
              setValue(v);
              if (error && isEmail(v)) setError("");
            }}
            onBlur={() => setError(value && !isEmail(value) ? "이메일 주소 형식이 아닙니다. '이름@회사 주소' 형식으로 적습니다." : "")}
          />
        </Input>
      </Tooltip>
    </Flex>
  );
}

/** 보낼 때 검사하는 예시. 처음 틀린 입력창으로 초점을 옮깁니다. */
function SubmitDemo() {
  const [values, setValues] = React.useState({ name: "", amount: "" });
  const [errors, setErrors] = React.useState({});
  const refs = { name: React.useRef(null), amount: React.useRef(null) };
  const set = (key) => (v) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };
  const submit = () => {
    const next = {
      name: values.name.trim() ? "" : "거래처 이름을 적습니다.",
      amount: /^\d+$/.test(values.amount) ? "" : "금액은 숫자로만 적습니다.",
    };
    setErrors(next);
    const first = ["name", "amount"].find((key) => next[key]);
    if (first) refs[first].current?.focus();
  };
  const field = (key, label) => (
    <Flex direction="column" gap={1}>
      <Text tag="label" size={200} htmlFor={`val-submit-${key}`}>{label}</Text>
      <Tooltip title={errors[key]} theme="warning" placement="right" interaction={errors[key] ? "focus" : "none"}>
        <Input w={260} state={errors[key] ? "invalid" : "normal"}>
          <Input.Value id={`val-submit-${key}`} ref={refs[key]} value={values[key]} onChange={set(key)} aria-invalid={Boolean(errors[key])} />
        </Input>
      </Tooltip>
    </Flex>
  );
  return (
    <Flex direction="column" gap={4}>
      {field("name", "거래처 이름")}
      {field("amount", "계약 금액(원)")}
      <Flex mt={2}>
        <Button use="primary" theme="info" onClick={submit}>등록</Button>
      </Flex>
    </Flex>
  );
}

export default function ValidationPage() {
  return (
    <Page meta={meta} lead="사용자가 넣은 값이 맞는지 확인하고, 틀렸으면 어디를 어떻게 고쳐야 하는지 알려 주는 방법입니다.">
      <Section title="검사하는 때">
        <Table
          head={["방식", "언제 검사하는가", "어떻게 보이는가", "지킬 것"]}
          rows={[
            [
              "입력창을 벗어날 때",
              "값을 넣고 다른 곳을 누르거나 Tab으로 넘어간 바로 그때",
              "틀린 입력창에 빨간 테두리가 생깁니다. 그 입력창에 다시 초점이 가면 고칠 방법을 적은 설명 풍선이 나옵니다.",
              "아무것도 넣지 않은 빈 칸은 벗어나도 검사하지 않습니다. 보낼 때 검사합니다.",
            ],
            [
              "보낼 때",
              "폼 맨 아래의 보내는 버튼을 누른 때",
              "틀린 입력창 모두에 빨간 테두리가 생깁니다. 처음 틀린 입력창으로 초점이 옮겨 가고 설명 풍선이 나옵니다.",
              "보내는 버튼은 비활성으로 두지 않습니다. 눌리지 않는 버튼은 폼이 고장 난 것처럼 보입니다.",
            ],
          ]}
        />
        <Demo caption="입력창을 벗어날 때 — 이메일이 아닌 글자를 넣고 다른 곳을 눌러 봅니다. 다시 입력창을 누르면 설명이 나옵니다.">
          <BlurDemo />
        </Demo>
        <Demo caption="보낼 때 — 빈 채로 '등록'을 눌러 봅니다. 처음 틀린 입력창으로 초점이 갑니다.">
          <SubmitDemo />
        </Demo>
        <Rules
          items={[
            "폼이 길어 처음 틀린 입력창이 화면 밖에 있으면, 그 입력창이 보이도록 화면을 옮깁니다. 옮긴 뒤에도 설명 풍선이 보여야 합니다.",
            "서버에 물어보지 않아도 되는 검사(형식, 길이, 빈 칸)는 입력창을 벗어날 때 바로 합니다. 보내기 전에 미리 고칠 수 있게 돕습니다.",
            "서버가 판단해야 하거나 비용이 드는 검사(중복 확인, 권한 확인)는 보낼 때 합니다.",
            "필터처럼 값이 바로 적용되는 곳도 같은 규칙을 따릅니다.",
          ]}
        />
      </Section>

      <Section title="틀림 표시를 지우는 때">
        <Rules
          items={[
            "화면에서 바로 검사할 수 있는 값은 맞게 고친 순간 표시를 지웁니다.",
            "서버가 검사한 값은 입력창의 값이 바뀌는 순간 표시를 지웁니다. 맞는지는 다시 보낼 때 확인합니다.",
            "여러 칸이 틀렸으면 고친 칸의 표시만 지웁니다. 손대지 않은 칸의 표시는 그대로 둡니다.",
          ]}
        />
      </Section>

      <Section title="모양">
        <Demo>
          <Input w={200}><Input.Value aria-label="기본 상태" defaultValue="기본" /></Input>
          <Input w={200} state="invalid"><Input.Value aria-label="틀림 상태" aria-invalid defaultValue="틀림" /></Input>
        </Demo>
        <Rules
          items={[
            <>틀린 컨트롤은 테두리를 빨간색으로 바꿉니다(<Code>state="invalid"</Code>). 색은 <Swatch token="text-critical" /> <Code>--ec-text-critical</Code> 계열입니다.</>,
            <>설명 풍선은 주의 모양(<Code>theme="warning"</Code>)을 쓰고, 틀린 컨트롤에 초점이 있을 때만 보입니다.</>,
            "입력창, 선택 상자, 날짜 선택, 여러 줄 입력창 모두 같은 방식으로 표시합니다.",
            "색만으로 알리지 않습니다. 고칠 방법을 적은 글이 반드시 함께 있어야 합니다.",
          ]}
        />
      </Section>

      <Section title="알리는 글">
        <Rules
          items={[
            "왜 틀렸는지 또는 어떻게 고치는지를 적습니다. \"잘못된 값입니다\"로 끝내지 않습니다.",
            "틀린 컨트롤 바로 옆에 둡니다.",
            "합쇼체로 쓰고 마침표로 끝냅니다.",
            "사용자를 탓하는 말투를 쓰지 않습니다.",
          ]}
        />
        <DoDont
          good={{ text: "\"금액은 숫자로만 적습니다.\" — 고치는 방법을 알려 줍니다." }}
          bad={{ text: "\"입력 오류\" — 무엇이 틀렸는지, 어떻게 고치는지 알 수 없습니다." }}
        />
      </Section>

      <Section title="알림 상자로 알릴 때">
        <P>
          입력창 하나의 문제가 아니라 보낸 결과 전체가 실패했을 때는 알림 상자(Notice)로 알립니다. 알림 상자는 실패를 일으킨 컨트롤 가까이에 둡니다.
          예를 들어 거래처 이름을 보냈다가 실패했으면, 그 이름 입력창과 버튼 옆에 둡니다.
        </P>
        <Demo column>
          <Flex direction="column" gap={4} w={360}>
            <Flex direction="column" gap={1}>
              <Text tag="label" size={200} htmlFor="val-notice">거래처 이름</Text>
              <Input><Input.Value id="val-notice" defaultValue="가나다 상사" /></Input>
            </Flex>
            <Notice theme="danger">
              <Notice.Content>
                <Notice.Text>거래처를 등록하지 못했습니다. 잠시 뒤 다시 시도해 주십시오.</Notice.Text>
              </Notice.Content>
            </Notice>
            <Flex gap={2}>
              <Button use="primary" theme="info">등록</Button>
              <Button>취소</Button>
            </Flex>
          </Flex>
        </Demo>
      </Section>
    </Page>
  );
}

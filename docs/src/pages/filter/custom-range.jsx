import React from "react";
import { Dropdown, FilterTrigger, InputNumber, Button, Divider, Text, Flex, Box } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "범위 필터", order: 5 };

const comma = (v) => Number(v).toLocaleString("ko-KR");
const rangeText = ({ from, to }) => {
  if (from !== "" && to !== "") return from === to ? comma(from) : `${comma(from)}–${comma(to)}`;
  if (from !== "") return `${comma(from)} 이상`;
  return `${comma(to)} 이하`;
};

const amountPresets = [
  { label: "1,000,000 이상", from: "1000000", to: "" },
  { label: "100,000–999,999", from: "100000", to: "999999" },
  { label: "10,000–99,999", from: "10000", to: "99999" },
  { label: "0–9,999", from: "0", to: "9999" },
];
const ratePresets = [
  { label: "80–100%", from: "80", to: "100" },
  { label: "50–79%", from: "50", to: "79" },
  { label: "0–49%", from: "0", to: "49" },
];
const dayPresets = [
  { label: "8일 이상", from: "8", to: "" },
  { label: "4–7일", from: "4", to: "7" },
  { label: "1–3일", from: "1", to: "3" },
];

function RangeFilter({ name, presets, max = 999999999, step = 1 }) {
  const [visible, setVisible] = React.useState(false);
  const [applied, setApplied] = React.useState(null);
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");

  const apply = (range) => {
    setApplied(range);
    setVisible(false);
  };
  const applyCustom = () => {
    if (from === "" && to === "") return setVisible(false);
    let range = { from, to };
    if (from !== "" && to !== "" && Number(from) > Number(to)) range = { from: to, to: from };
    setFrom(range.from);
    setTo(range.to);
    apply(range);
  };
  const clear = () => {
    setApplied(null);
    setFrom("");
    setTo("");
  };

  return (
    <Dropdown visible={visible} onVisibleChange={setVisible}>
      <Dropdown.Trigger tag={FilterTrigger} placeholder={name} empty={!applied} onClear={clear}>
        {applied ? `${name}: ${rangeText(applied)}` : null}
      </Dropdown.Trigger>
      <Dropdown.Popper
        w={240}
        aria-label={`${name} 범위`}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) applyCustom();
        }}
      >
        <Box p={2}>
          <Text size={200} bold>직접 입력</Text>
          <Flex gap={2} mt={2}>
            <InputNumber>
              <InputNumber.Value autoFocus min={0} max={max} step={step} value={from} onChange={setFrom} placeholder="부터" aria-label={`${name} 부터`} />
              <InputNumber.Controls />
            </InputNumber>
            <InputNumber>
              <InputNumber.Value min={0} max={max} step={step} value={to} onChange={setTo} placeholder="까지" aria-label={`${name} 까지`} />
              <InputNumber.Controls />
            </InputNumber>
          </Flex>
          <Button use="primary" theme="info" w="100%" mt={2} onClick={applyCustom}>적용</Button>
        </Box>
        <Divider />
        <Box py={1}>
          {presets.map((p) => (
            <Dropdown.Item
              px={3}
              py={2}
              key={p.label}
              selected={applied && applied.from === p.from && applied.to === p.to}
              onClick={() => apply({ from: p.from, to: p.to })}
            >
              {p.label}
            </Dropdown.Item>
          ))}
        </Box>
      </Dropdown.Popper>
    </Dropdown>
  );
}

export default function FilterCustomRangePage() {
  return (
    <Page
      meta={meta}
      lead="금액, 수량, 비율처럼 숫자로 된 값을 범위로 거르는 필터입니다. 범위를 직접 넣거나 미리 정해 둔 범위에서 고릅니다. 먼저 '필터 공통 규칙' 문서를 읽습니다."
    >
      <Section title="지켜야 할 것">
        <Rules
          items={[
            "원하는 값을 직접 넣을 수 있다는 것을 알 수 있어야 합니다.",
            "값을 빨리 넣을 수 있어야 합니다.",
            "결과가 없으면 없다는 것을 바로 알 수 있어야 합니다.",
            "넣은 값을 빨리 지우고 다시 찾을 수 있어야 합니다.",
            "이미 건 범위를 바꿀 수 있어야 합니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Demo caption="눌러서 범위를 넣거나 골라 보세요">
          <RangeFilter name="금액(원)" presets={amountPresets} step={1000} />
          <RangeFilter name="승인율(%)" presets={ratePresets} max={100} />
          <RangeFilter name="처리 일수" presets={dayPresets} max={365} />
        </Demo>
        <Table
          head={["부분", "설명"]}
          rows={[
            ["필터 버튼", <><Code>FilterTrigger</Code>. 이름과 적용한 범위를 보여 줍니다.</>],
            ["직접 입력", <><Code>InputNumber</Code> 두 개("부터", "까지")와 "적용" 버튼</>],
            ["정해 둔 범위", "눌러서 바로 적용하는 범위의 목록"],
          ]}
        />
      </Section>

      <Section title="필터 버튼">
        <Rules
          items={[
            "최소 폭은 80px입니다. 이보다 좁게 만들지 않습니다.",
            "자리가 넉넉하면 폭이 내용에 맞춰 늘어나게 둡니다. 적용한 범위가 잘리지 않습니다.",
            "단위가 있는 값은 이름에 단위를 붙입니다(\"금액(원)\", \"승인율(%)\").",
          ]}
        />
        <Sub title="이름 줄이기">
          <Table
            head={["필터", "이름", "줄이는 법"]}
            rows={[
              ["금액", "금액(원)", "줄이지 않습니다. 버튼의 폭이 늘 같습니다."],
              ["승인율", "승인율(%)", "줄이지 않습니다. 버튼의 폭이 늘 같습니다."],
              ["처리 일수", "처리 일수", "이름과 값이 다 들어가면 그대로, 들어가지 않으면 \"일수\"로 줄입니다."],
              ["등록 건수", "등록 건수", "이름과 값이 다 들어가면 그대로, 들어가지 않으면 \"건수\"로 줄입니다."],
            ]}
          />
          <Rules
            items={[
              "줄인 이름은 화면마다 다르게 만들지 않습니다. 한 번 정한 줄임말을 모든 화면에서 씁니다.",
              "줄여서 뜻이 흐려지면 마우스를 올렸을 때 전체 이름을 보여 줍니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="드롭다운">
        <Rules
          items={[
            "드롭다운의 폭은 224px보다 좁게 만들지 않습니다. 더 좁으면 가장 큰 값(999,999,999)이 입력란에 다 들어가지 않습니다.",
            "값의 범위가 좁은 필터(비율 0–100)도 같은 폭을 씁니다. 필터마다 드롭다운의 폭이 달라지지 않게 합니다.",
          ]}
        />
        <Sub title="정해 둔 범위">
          <Table
            head={["필터", "정해 둔 범위의 예"]}
            rows={[
              ["금액(원)", "1,000,000 이상 / 100,000–999,999 / 10,000–99,999 / 0–9,999"],
              ["승인율(%)", "80–100% / 50–79% / 0–49%"],
              ["처리 일수", "8일 이상 / 4–7일 / 1–3일"],
            ]}
          />
          <Rules
            items={[
              "큰 값에서 작은 값의 순서로 놓습니다.",
              "범위끼리 겹치거나 사이가 비지 않게 합니다.",
              "두 값 사이에는 붙임표(-)가 아니라 줄표(–)를 씁니다.",
              "사용자가 실제로 자주 찾는 구간으로 나눕니다. 다섯 개 안팎이 알맞습니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "드롭다운을 열면 키보드 초점이 곧바로 첫 입력란(\"부터\")으로 갑니다.",
            "\"부터\"만 넣으면 그 값 이상, \"까지\"만 넣으면 그 값 이하, 둘 다 같은 값이면 정확히 그 값을 찾습니다.",
            "\"까지\"가 \"부터\"보다 작으면 두 값의 자리를 바꿉니다.",
            "직접 넣은 값은 \"적용\" 버튼이나 Ctrl + Enter로 적용합니다. 정해 둔 범위는 누르는 즉시 적용합니다.",
            "그 밖의 동작은 \"필터 공통 규칙\"의 동작 부분과 같습니다.",
          ]}
        />
      </Section>

      <Section title="설명 풍선·입력값 확인·찾은 것 없음">
        <Rules
          items={[
            "설명 풍선은 이름이나 값이 잘렸을 때, 걸러 내는 방식에 설명이 필요할 때만 답니다.",
            "넣을 수 있는 글자, 최솟값과 최댓값, 붙여 넣기의 처리는 \"필터 공통 규칙\"의 입력값 확인을 따릅니다.",
            "결과가 없을 때는 표에 \"찾은 것 없음\" 안내와 필터를 지우는 버튼을 보여 줍니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <FilterTrigger onClear={() => {}}>금액(원): 10,000 이상</FilterTrigger>,
            text: "한쪽만 넣은 범위는 \"이상\", \"이하\"로 적습니다.",
          }}
          bad={{
            demo: <FilterTrigger onClear={() => {}}>금액(원): 10,000–</FilterTrigger>,
            text: "한쪽이 빈 범위를 줄표만 남겨 적지 않습니다.",
          }}
        />
      </Section>

      <Section title="다른 것과의 구분">
        <P>날짜의 범위는 이 필터가 아니라 날짜 범위 선택(DateRangePicker)으로 거릅니다. 값이 몇 가지로 정해져 있고 직접 넣을 일이 없으면 Select로 만든 일반 필터를 씁니다.</P>
      </Section>
    </Page>
  );
}

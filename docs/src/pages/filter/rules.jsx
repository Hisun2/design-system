import React from "react";
import {
  Select, FilterTrigger, Dropdown, InputNumber, Button, Spin, SpinContainer, NoData, Divider, Text, Flex, Box,
} from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "필터 공통 규칙", order: 1 };

const statusOptions = ["승인", "진행 중", "확인 필요", "반려"].map((v) => ({ value: v, children: v }));

const presets = [
  { label: "1,000,000 이상", from: "1000000", to: "" },
  { label: "100,000–999,999", from: "100000", to: "999999" },
  { label: "10,000–99,999", from: "10000", to: "99999" },
  { label: "0–9,999", from: "0", to: "9999" },
];

const comma = (v) => Number(v).toLocaleString("ko-KR");
const rangeText = ({ from, to }) => {
  if (from !== "" && to !== "") return from === to ? comma(from) : `${comma(from)}–${comma(to)}`;
  if (from !== "") return `${comma(from)} 이상`;
  return `${comma(to)} 이하`;
};

function RangeFilter() {
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
      <Dropdown.Trigger tag={FilterTrigger} placeholder="금액" empty={!applied} onClear={clear}>
        {applied ? `금액: ${rangeText(applied)}` : null}
      </Dropdown.Trigger>
      <Dropdown.Popper
        w={240}
        aria-label="금액 범위"
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) applyCustom();
        }}
      >
        <Box py={1}>
          {presets.map((p) => (
            <Dropdown.Item
              key={p.label}
              selected={applied && applied.from === p.from && applied.to === p.to}
              onClick={() => apply({ from: p.from, to: p.to })}
            >
              {p.label}
            </Dropdown.Item>
          ))}
        </Box>
        <Divider />
        <Box p={2}>
          <Text size={200} bold>직접 입력</Text>
          <Flex gap={2} mt={2}>
            <InputNumber>
              <InputNumber.Value min={0} max={999999999} step={1} value={from} onChange={setFrom} placeholder="부터" aria-label="금액 부터" />
              <InputNumber.Controls />
            </InputNumber>
            <InputNumber>
              <InputNumber.Value min={0} max={999999999} step={1} value={to} onChange={setTo} placeholder="까지" aria-label="금액 까지" />
              <InputNumber.Controls />
            </InputNumber>
          </Flex>
          <Button use="primary" theme="info" w="100%" mt={2} onClick={applyCustom}>적용</Button>
        </Box>
      </Dropdown.Popper>
    </Dropdown>
  );
}

function StatusFilter() {
  const [value, setValue] = React.useState(null);
  return <Select tag={FilterTrigger} placeholder="상태" options={statusOptions} value={value} onChange={setValue} />;
}

export default function FilterRulesPage() {
  return (
    <Page
      meta={meta}
      lead="표나 목록 위에 두어 보이는 데이터를 좁히는 필터의 공통 규칙입니다. 종류별 필터 문서는 모두 이 규칙 위에 서 있습니다."
    >
      <Section title="지켜야 할 것">
        <P>필터를 쓸 때 사용자는 아래 다섯 가지를 할 수 있어야 합니다.</P>
        <Rules
          items={[
            "미리 정해 둔 값이 있다는 것과, 원하는 값을 직접 넣을 수도 있다는 것을 안다.",
            "정해 둔 값 가운데 하나를 빨리 찾아 고른다.",
            "결과가 없으면 없다는 것을 바로 안다.",
            "넣은 값을 빨리 지우고 다시 찾는다.",
            "이미 건 필터의 값을 바꾼다.",
          ]}
        />
        <P>
          적용하지 않은 입력도 지켜 줍니다. 필터를 열어 무언가를 입력하다가 실수로 닫았다면, 다시 열었을 때 입력하던 내용이 남아 있어야 합니다. 스크롤 위치까지 기억할 필요는 없습니다.
        </P>
      </Section>

      <Section title="구성">
        <Demo caption="필터를 눌러 값을 골라 보세요">
          <StatusFilter />
          <RangeFilter />
        </Demo>
        <Table
          head={["부분", "쓰는 것", "설명"]}
          rows={[
            ["필터 버튼", <><Code>Select</Code> + <Code>FilterTrigger</Code></>, "필터의 이름과 고른 값을 보여 줍니다. 값이 있으면 지우는 ×가 붙습니다."],
            ["드롭다운", <><Code>Select</Code> 또는 <Code>Dropdown</Code></>, "값 목록이나 입력란이 들어갑니다. 모양은 드롭다운 메뉴와 같습니다."],
            ["정해 둔 값", "목록 항목", "눌러서 바로 적용하는 값입니다."],
            ["직접 입력", <Code>InputNumber</Code>, "범위를 직접 넣는 입력란 두 개와 \"적용\" 버튼입니다."],
          ]}
        />
      </Section>

      <Section title="필터 버튼">
        <Rules
          items={[
            <>정해 둔 값에서 고르는 필터는 <Code>{"<Select tag={FilterTrigger} />"}</Code>로 만듭니다. 안에 입력란이 들어가는 필터는 <Code>Dropdown</Code>의 여는 버튼을 <Code>FilterTrigger</Code>로 바꿔 만듭니다.</>,
            "최소 폭은 80px입니다. 이보다 좁게 만들지 않습니다.",
            "자리가 넉넉하면 폭이 내용에 맞춰 늘어나게 둡니다. 이름과 값이 잘리지 않습니다.",
            "이름이 너무 길어 잘라야 하면 말줄임표(…)로 줄이고, 마우스를 올리면 전체 이름을 보여 줍니다.",
            "크기는 M(32px)입니다. 한 줄에 놓인 필터는 모두 같은 크기로 하고 간격은 8px입니다.",
          ]}
        />
        <Sub title="필터 버튼의 상태">
          <Demo caption="값 없음 / 열림 / 값 있음">
            <FilterTrigger placeholder="상태" empty />
            <FilterTrigger placeholder="상태" empty active />
            <FilterTrigger onClear={() => {}}>상태: 승인</FilterTrigger>
          </Demo>
          <Table
            head={["상태", "모양"]}
            rows={[
              ["값 없음", "필터 이름을 안내 글자 색으로 보여 줍니다."],
              ["마우스를 올림", "테두리가 진해집니다."],
              ["열림", "테두리가 파란색이 되고 드롭다운이 열립니다."],
              ["값 있음", "\"이름: 값\"을 보여 주고 파란 바탕이 됩니다. 오른쪽에 지우는 ×가 붙습니다."],
              ["값 있음 + 마우스를 올림", "바탕이 한 단계 진해집니다. ×에 올리면 ×만 따로 진해집니다."],
            ]}
          />
        </Sub>
      </Section>

      <Section title="드롭다운">
        <Sub title="정해 둔 값">
          <Rules
            items={[
              "자주 쓰는 범위를 미리 만들어 목록으로 보여 줍니다.",
              "숫자 범위는 큰 값에서 작은 값의 순서로 놓습니다.",
              "범위의 두 값 사이에는 붙임표(-)가 아니라 줄표(–)를 씁니다. 예: 10,000–99,999",
              "고른 값은 다시 열었을 때 선택된 것으로 표시합니다.",
            ]}
          />
        </Sub>
        <Sub title="직접 입력">
          <Demo caption="아무것도 넣지 않았을 때는 내림 버튼이, 최댓값일 때는 올림 버튼이 꺼집니다">
            <InputNumber w={140}>
              <InputNumber.Value min={0} max={999999999} placeholder="부터" aria-label="부터" />
              <InputNumber.Controls />
            </InputNumber>
            <InputNumber w={140}>
              <InputNumber.Value min={0} max={999999999} defaultValue="999999999" aria-label="까지" />
              <InputNumber.Controls />
            </InputNumber>
          </Demo>
          <Rules
            items={[
              <>범위를 직접 넣을 수 있는 필터는 <Code>InputNumber</Code> 두 개를 씁니다.</>,
              "입력란의 안내 글자는 \"부터\"와 \"까지\"입니다.",
              "아무것도 넣지 않았으면 내림 버튼을 끕니다. 최댓값이 들어 있으면 올림 버튼을 끕니다.",
              "정해 둔 값을 골랐다고 그 값을 직접 입력란에 채워 넣지 않습니다. 둘은 따로입니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="동작">
        <Sub title="열고 닫기">
          <Rules
            items={[
              "처음 열면 아무것도 선택되어 있지 않습니다.",
              "정해 둔 값을 누르면 바로 적용하고 드롭다운을 닫습니다.",
              "드롭다운 바깥을 누르면 닫힙니다. 아무것도 고르지 않았으면 아무것도 적용하지 않습니다.",
              "아무것도 고르지 않았거나 입력란이 비어 있는데 \"적용\"을 누르면, 드롭다운만 닫고 아무것도 적용하지 않습니다.",
            ]}
          />
        </Sub>
        <Sub title="적용한 뒤">
          <Rules
            items={[
              "고른 값을 필터 버튼에 그대로 보여 줍니다(\"금액: 10,000–99,999\").",
              "필터 버튼의 ×를 누르면 값이 지워집니다. 드롭다운이 열려 있든 닫혀 있든 같습니다.",
              "필터를 적용하면 표를 첫 행으로 스크롤하고 1쪽으로 돌아갑니다.",
            ]}
          />
        </Sub>
        <Sub title="범위를 직접 넣기">
          <Table
            head={["넣은 값", "결과", "필터 버튼의 글자"]}
            rows={[
              ["부터 100, 까지 100", "값이 정확히 100인 것만", "금액: 100"],
              ["부터 100만", "100부터 최댓값까지", "금액: 100 이상"],
              ["까지 100만", "100까지", "금액: 100 이하"],
              ["부터 500, 까지 100", "입력란에서 초점이 빠질 때 두 값의 자리를 바꿈", "금액: 100–500"],
            ]}
          />
          <Rules
            items={[
              "값은 복사해 붙여 넣을 수 있고, 올림·내림 버튼으로 정해 둔 단위(기본 1)만큼 바꿀 수 있습니다.",
              "직접 넣은 값은 \"적용\" 버튼을 눌러야 적용됩니다.",
              "넣기만 하고 적용하지 않은 값은 화면을 새로 고치기 전까지 남겨 둡니다.",
            ]}
          />
        </Sub>
        <Sub title="키보드">
          <Rules
            items={[
              "Ctrl + Enter(macOS는 Cmd + Enter)로 필터를 적용합니다.",
              "Esc로 드롭다운을 닫습니다. 초점은 필터 버튼으로 돌아갑니다.",
              "위·아래 화살표로 숫자를 한 단위씩, Shift + 화살표로 더 큰 단위씩 바꿉니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="입력값 확인">
        <Table
          head={["항목", "규칙"]}
          rows={[
            ["넣을 수 있는 글자", "숫자, 마침표, 쉼표, 빼기 기호만 받습니다. 빗금이나 글자 같은 나머지는 버립니다."],
            ["자릿수 표시", "넣은 값은 세 자리마다 쉼표를 찍는 우리 표기에 맞춰 보여 줍니다."],
            ["최솟값·최댓값", "최솟값 0, 최댓값 999,999,999를 기본으로 합니다. 범위를 벗어난 값은 최솟값 또는 최댓값으로 바꿉니다."],
            ["단위", "올림·내림 버튼으로 바뀌는 크기를 필터에 맞게 정합니다. 금액은 1,000 단위처럼 뜻있는 크기로 합니다."],
            ["자리 바꿈", "\"까지\"가 \"부터\"보다 작으면 두 입력란에서 초점이 빠질 때 서로 자리를 바꿉니다."],
            ["붙여 넣기", "붙여 넣은 값에서 쓸 수 없는 글자는 버립니다."],
          ]}
        />
      </Section>

      <Section title="불러오는 중">
        <Demo caption="목록을 불러오는 중 / 고른 값을 적용하는 중">
          <Flex alignItems="center" gap={2} p={3}>
            <Spin size="xs" />
            <Text size={200} color="text-secondary">불러오는 중…</Text>
          </Flex>
          <SpinContainer loading size="m">
            <Box p={3} w={200}>
              <Text size={200}>승인<br />진행 중<br />확인 필요</Text>
            </Box>
          </SpinContainer>
        </Demo>
        <Rules
          items={[
            "필터 안의 목록을 가져오는 데 시간이 걸리면 드롭다운 안에 Spin과 \"불러오는 중…\"을 보여 줍니다.",
            "고른 값을 적용하는 데 시간이 걸리면 드롭다운 내용 위에 SpinContainer를 씌웁니다.",
          ]}
        />
      </Section>

      <Section title="찾은 것 없음과 오류">
        <Demo>
          <NoData type="nothing-found" description="검색어나 필터를 바꿔 보세요.">
            <Button mt={4}>필터 지우기</Button>
          </NoData>
        </Demo>
        <Rules
          items={[
            "필터를 건 결과가 없으면, 필터가 걸린 표나 상자에 \"찾은 것 없음\" 안내를 보여 주고 필터를 지우는 버튼을 둡니다.",
            "요청하다 오류가 나면 같은 자리에 오류 안내와 다시 시도하는 버튼을 둡니다.",
            "안내의 모양은 \"표의 상태\" 문서를 따릅니다.",
          ]}
        />
      </Section>

      <Section title="설명 풍선">
        <Rules
          items={[
            "설명 풍선을 위한 설명 풍선은 달지 않습니다. 보이는 글자를 되풀이할 뿐이면 넣지 않습니다.",
            "필터의 이름이나 값이 잘렸을 때 전체 글자를 보여 줍니다.",
            "값이 이미 걸려 있을 때 이 필터가 어떻게 걸러 내는지 설명이 필요하면 답니다.",
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "필터의 이름은 표의 열 이름과 같은 낱말을 씁니다(\"상태\", \"담당자\", \"금액\").",
            "값이 있을 때는 \"이름: 값\"으로 적습니다. 여러 개를 골랐으면 \"이름: 3개 선택\"으로 줄입니다.",
            "적용 버튼은 \"적용\", 모두 지우는 버튼은 \"필터 지우기\"입니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <FilterTrigger onClear={() => {}}>금액: 10,000–99,999</FilterTrigger>,
            text: "범위는 줄표(–)로 잇고 숫자에 쉼표를 찍습니다. 고른 값을 버튼에 그대로 보여 줍니다.",
          }}
          bad={{
            demo: <FilterTrigger onClear={() => {}}>금액: 10000-99999</FilterTrigger>,
            text: "붙임표(-)로 잇거나 쉼표 없이 적지 않습니다.",
          }}
        />
      </Section>
    </Page>
  );
}

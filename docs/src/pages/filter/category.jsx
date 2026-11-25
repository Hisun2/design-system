import React from "react";
import { Select, FilterTrigger, Button, Spin, Text, Flex, Box } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "분류 필터", order: 4 };

const categories = [
  { value: "제조 > 기계 > 부품", count: 1280 },
  { value: "제조 > 전자 > 부품", count: 942 },
  { value: "제조 > 화학 > 원료", count: 615 },
  { value: "유통 > 도매 > 식품", count: 388 },
  { value: "유통 > 소매 > 생활용품", count: 254 },
  { value: "서비스 > 물류 > 창고", count: 173 },
  { value: "서비스 > 물류 > 운송", count: 121 },
  { value: "서비스 > 정보 > 소프트웨어", count: 96 },
  { value: "건설 > 토목 > 자재", count: 64 },
  { value: "건설 > 건축 > 설비", count: 37 },
  { value: "농수산 > 수산 > 가공", count: 12 },
];
const comma = (n) => n.toLocaleString("ko-KR");
// 마지막 마디가 가장 중요하므로, 줄일 때는 앞을 줄이고 마지막 마디를 남깁니다.
const short = (v) => {
  const parts = v.split(" > ");
  return parts.length > 1 ? `… > ${parts[parts.length - 1]}` : v;
};

function Options({ query, multi }) {
  const found = categories.filter((c) => c.value.includes(query.trim()));
  if (!found.length) {
    return (
      <Box p={3}>
        <Text size={200} color="text-secondary">찾은 분류가 없습니다</Text>
      </Box>
    );
  }
  return found.map((c) => (
    <Select.Option key={c.value} value={c.value}>
      {multi ? <Select.Option.Checkbox /> : null}
      <Select.Option.Content>{c.value}</Select.Option.Content>
      <Text ml={4} color="text-secondary">{comma(c.count)}</Text>
    </Select.Option>
  ));
}

function SingleCategory() {
  const [value, setValue] = React.useState(null);
  const [query, setQuery] = React.useState("");
  return (
    <Select value={value} onChange={setValue}>
      <Select.Trigger tag={FilterTrigger} placeholder="분류" onClear={() => setValue(null)}>
        {value ? `분류: ${short(value)}` : null}
      </Select.Trigger>
      <Select.Popper aria-label="분류" wMin={280}>
        <Select.InputSearch value={query} onChange={setQuery} placeholder="분류 찾기" />
        <Select.List hMax="240px">
          {Options({ query })}
        </Select.List>
      </Select.Popper>
    </Select>
  );
}

function MultiCategory() {
  const [value, setValue] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const all = value.length === categories.length;
  return (
    <Select multiselect value={value} onChange={setValue}>
      <Select.Trigger tag={FilterTrigger} placeholder="분류" onClear={() => setValue([])}>
        {value.length === 1 ? `분류: ${short(value[0])}` : `분류: ${value.length}개 선택`}
      </Select.Trigger>
      <Select.Popper aria-label="분류" wMin={300}>
        <Select.InputSearch value={query} onChange={setQuery} placeholder="분류 찾기" />
        <Box px={2} py={1}>
          <Button use="tertiary" theme="info" onClick={() => setValue(all ? [] : categories.map((c) => c.value))}>
            {all ? "모두 선택 해제" : "모두 선택"}
          </Button>
        </Box>
        <Select.List hMax="240px">
          {Options({ query, multi: true })}
        </Select.List>
      </Select.Popper>
    </Select>
  );
}

export default function FilterCategoryPage() {
  return (
    <Page
      meta={meta}
      lead="업종, 품목, 문서 종류처럼 미리 정해 둔 분류 가운데 하나 또는 여러 개를 골라 거르는 필터입니다. 공통 규칙은 '필터 공통 규칙' 문서를 따릅니다."
    >
      <Section title="지켜야 할 것">
        <Rules
          items={[
            "이 목록이 무엇의 분류인지 알 수 있어야 합니다(거래처의 업종인지, 문서의 종류인지).",
            "맞는 분류를 빨리 찾을 수 있어야 합니다.",
            "지금 어느 분류가 골라져 있는지 알 수 있어야 합니다. 분류 이름은 길고 서로 비슷한 경우가 많습니다.",
          ]}
        />
      </Section>

      <Section title="필터 버튼">
        <Demo caption="값 없음 / 값 있음">
          <FilterTrigger placeholder="분류" empty wMin={102} />
          <FilterTrigger wMin={160} onClear={() => {}}>분류: … &gt; 부품</FilterTrigger>
        </Demo>
        <Table
          head={["상태", "최소 폭", "까닭"]}
          rows={[
            ["값 없음", "102px", "필터 이름을 읽을 수 있어야 합니다."],
            ["값 있음", "160px", "필터 이름과 분류 이름의 적어도 한 마디가 보여야 합니다."],
          ]}
        />
        <Rules
          items={[
            "이 폭보다 좁게 만들지 않습니다. 필터 이름을 못 읽거나 어느 분류를 골랐는지 알 수 없게 됩니다.",
            "값이 없을 때의 안내 글자는 \"분류\"처럼 무엇의 분류인지 드러나는 이름으로 합니다(\"업종\", \"문서 종류\").",
          ]}
        />
      </Section>

      <Section title="하나만 고르는 필터">
        <Demo caption="눌러서 분류를 골라 보세요">
          <SingleCategory />
        </Demo>
        <Sub title="목록">
          <Rules
            items={[
              "분류가 많을 수 있으므로 필터를 열 때 불러옵니다. 빨리 뜨도록 처음에는 50개까지만 가져오고 나머지는 목록을 스크롤할 때 이어서 가져옵니다.",
              "분류가 10개를 넘으면 목록 위에 검색 입력란을 둡니다.",
              "긴 분류 이름은 줄이고, 마우스를 올리면 전체 이름을 보여 줍니다(아래 \"분류 이름 줄이기\").",
              "항목 오른쪽에 그 분류에 속한 건수를 보여 줄 수 있습니다. 건수는 선택 사항입니다. 표의 데이터가 많아 바로 세기 어려우면 빼도 됩니다. 셀 수 있다면 넣는 편이 좋습니다.",
            ]}
          />
          <Table
            head={["목록에 건수가", "정렬"]}
            rows={[
              ["없을 때", "가나다순"],
              ["있을 때", "건수가 많은 것부터"],
            ]}
          />
        </Sub>
        <Sub title="값이 있을 때">
          <Rules
            items={[
              "필터 버튼에 \"분류: 고른 분류\"를 보여 줍니다. 길면 아래 규칙대로 줄입니다.",
              "이름표(\"분류:\")는 붙이는 것을 원칙으로 합니다. 자리가 정말 없고, 이름표 없이도 무슨 필터인지 사용자가 안다고 확신할 때만 뺍니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="여러 개를 고르는 필터">
        <Demo caption="여러 분류를 골라 보세요">
          <MultiCategory />
        </Demo>
        <P>여러 개를 고르는 분류 필터는 정말 필요할 때만 씁니다(사용자가 요청했을 때 등). 다루기가 훨씬 복잡하고, 대부분의 화면은 하나만 골라도 충분합니다.</P>
        <Rules
          items={[
            <><Code>Select</Code>에 <Code>multiselect</Code>를 주고 항목마다 체크박스를 둡니다.</>,
            "불러오기, 검색, 정렬, 건수의 규칙은 하나만 고르는 필터와 같습니다.",
            "\"모두 선택 / 모두 선택 해제\"는 선택 사항입니다.",
            "하나를 골랐으면 필터 버튼에 그 분류 이름을 그대로 보여 줍니다.",
            "둘 이상 골랐으면 \"분류: 3개 선택\"처럼 개수로 줄입니다.",
            "이름표(\"분류:\")는 반드시 붙입니다. \"3개 선택\"만으로는 무엇을 골랐는지 알 수 없습니다.",
            "고른 분류는 다시 열었을 때 목록 맨 위에 모아 보여 줍니다.",
            "옆에 다른 필터가 여럿 있으면 건수를 그때그때 다시 세기 어렵습니다. 그럴 때는 건수를 뺍니다.",
          ]}
        />
      </Section>

      <Section title="상태">
        <Demo caption="불러오는 중 / 찾은 것 없음 / 오류">
          <Flex alignItems="center" gap={2} p={3}>
            <Spin size="xs" />
            <Text size={200} color="text-secondary">불러오는 중…</Text>
          </Flex>
          <Box p={3}>
            <Text size={200} color="text-secondary">찾은 분류가 없습니다</Text>
          </Box>
          <Flex alignItems="center" gap={2} p={3}>
            <Text size={200} color="text-secondary">분류를 불러오지 못했습니다.</Text>
            <Button use="tertiary" theme="info">다시 불러오기</Button>
          </Flex>
        </Demo>
        <Table
          head={["상태", "드롭다운 안에 보여 줄 것"]}
          rows={[
            ["불러오는 중", "Spin과 \"불러오는 중…\""],
            ["찾은 것 없음", "검색한 분류가 없다는 안내. 검색어를 지우면 목록이 돌아옵니다."],
            ["오류", "불러오지 못했다는 안내와 \"다시 불러오기\""],
          ]}
        />
        <P>필터를 건 결과가 한 건도 없으면 표에 "찾은 것 없음" 안내와 필터를 바꾸는 버튼을 보여 줍니다.</P>
      </Section>

      <Section title="분류 이름 줄이기">
        <P>
          분류는 "제조 &gt; 기계 &gt; 부품"처럼 단계로 적습니다. 이 단계는 분류를 서로 구분하려고 보여 주는 것일 뿐, 데이터가 실제로 겹쳐 있는 것은 아닙니다.
          "제조 &gt; 전자 &gt; 부품"과 "제조 &gt; 기계 &gt; 부품"은 마지막 낱말이 같아도 서로 다른 분류입니다.
        </P>
        <Rules
          items={[
            "마지막 마디가 가장 중요합니다. 어떻게 줄이든 마지막 마디는 온전히 보여 줍니다.",
            "줄일 때는 앞쪽을 말줄임표로 바꾸고 \"… > 부품\"처럼 \">\"부터 마지막 마디가 보이게 합니다.",
            "줄인 이름에 마우스를 올리면 언제나 전체 이름을 설명 풍선으로 보여 줍니다.",
            "값이 있는 필터 버튼의 최소 폭은 필터 이름과 분류 이름의 시작이 함께 들어가도록 정합니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <FilterTrigger onClear={() => {}}>분류: … &gt; 부품</FilterTrigger>,
            text: "앞을 줄이고 마지막 마디를 남깁니다.",
          }}
          bad={{
            demo: <FilterTrigger onClear={() => {}}>분류: 제조 &gt; 기…</FilterTrigger>,
            text: "뒤를 잘라 마지막 마디를 가리지 않습니다. 비슷한 분류끼리 구분할 수 없게 됩니다.",
          }}
        />
      </Section>
    </Page>
  );
}

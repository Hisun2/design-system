import React from "react";
import { Select, FilterTrigger, Button, Spin, SpinContainer, Divider, Text, Flex, Box } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "태그 필터", order: 8 };

const NONE = "__none";
const manyTags = ["검토 필요", "계약 갱신", "긴급", "단가 협의", "보류", "분기 정산", "수출", "신규 거래", "우수 거래처", "장기 미수", "재계약", "주간 보고", "해외", "휴면"];
const fewTags = ["긴급", "보류", "신규 거래", "우수 거래처", "재계약"];

function TagFilter({ tags }) {
  const [value, setValue] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const big = tags.length > 10;
  const found = tags.filter((t) => t.includes(query.trim()));
  const all = tags.every((t) => value.includes(t));

  const change = (next) => {
    // "없음"과 태그는 함께 고를 수 없습니다.
    if (next.includes(NONE) && !value.includes(NONE)) return setValue([NONE]);
    setValue(next.filter((v) => v !== NONE));
  };
  const text = value.includes(NONE) ? "태그: 없음" : `태그: ${value.length}개 선택`;

  return (
    <Select multiselect value={value} onChange={change}>
      <Select.Trigger tag={FilterTrigger} placeholder="태그" onClear={() => setValue([])}>
        {text}
      </Select.Trigger>
      <Select.Popper aria-label="태그" wMin={224}>
        {big ? <Select.InputSearch value={query} onChange={setQuery} placeholder="태그 찾기" /> : null}
        {big ? (
          <Box px={2} py={1}>
            <Button use="tertiary" theme="info" onClick={() => setValue(all ? [] : tags)}>
              {all ? "모두 선택 해제" : "모두 선택"}
            </Button>
          </Box>
        ) : null}
        <Select.List hMax="200px">
          {found.map((t) => (
            <Select.Option key={t} value={t}>
              <Select.Option.Checkbox />
              {t}
            </Select.Option>
          ))}
          {found.length ? null : (
            <Box p={3}>
              <Text size={200} color="text-secondary">찾은 것이 없습니다</Text>
            </Box>
          )}
        </Select.List>
        <Divider />
        <Select.Option value={NONE}>
          <Select.Option.Checkbox />
          없음 (태그가 없는 것)
        </Select.Option>
      </Select.Popper>
    </Select>
  );
}

export default function FilterTagsPage() {
  return (
    <Page
      meta={meta}
      lead="행에 붙여 둔 태그로 거르는 필터입니다. 태그를 여러 개 고르거나, 태그가 하나도 없는 것만 볼 수 있습니다. 공통 규칙은 '필터 공통 규칙' 문서를 따릅니다."
    >
      <Section title="무엇인가">
        <Rules
          items={[
            "태그를 여러 개 고를 수 있습니다. 고른 태그 가운데 하나라도 붙은 것을 모두 보여 줍니다(\"또는\"으로 잇습니다).",
            "\"없음\"을 고르면 태그가 하나도 붙지 않은 것만 보여 줍니다.",
            "목록의 태그는 지금 표의 데이터에 실제로 붙어 있는 것만 가져옵니다. 고를 수 있는 태그는 모두 결과가 있는 태그입니다.",
          ]}
        />
        <P>사용자는 아래 네 가지를 할 수 있어야 합니다.</P>
        <Rules
          items={[
            "태그를 하나 또는 여러 개 고를 수 있다는 것을 바로 안다.",
            "태그가 없는 것만 골라 본다.",
            "고른 것을 빨리 지우고 다시 찾는다.",
            "태그를 모두 고른다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Demo caption="태그가 14개일 때 / 5개일 때">
          <TagFilter tags={manyTags} />
          <TagFilter tags={fewTags} />
        </Demo>
        <Sub title="필터 버튼">
          <Rules
            items={[
              <><Code>Select</Code>와 <Code>FilterTrigger</Code>로 만듭니다.</>,
              "최소 폭은 80px입니다. 이보다 좁게 만들지 않습니다.",
              "자리가 넉넉하면 폭이 내용에 맞춰 늘어나게 둡니다. 글자가 잘리지 않습니다.",
              "이름은 언제나 \"태그\"입니다. 줄이지 않습니다.",
            ]}
          />
        </Sub>
        <Sub title="드롭다운">
          <Table
            head={["부분", "규칙"]}
            rows={[
              ["태그 목록", "표의 데이터에 붙은 태그 모두. 가나다순으로 놓습니다."],
              ["\"없음\"", "태그가 없는 것을 고르는 특별한 항목. 목록과 선으로 나눠 따로 둡니다."],
              ["스크롤", "태그가 6개를 넘으면 목록 안에서 스크롤합니다."],
              ["검색 입력란", "태그가 10개를 넘으면 목록 위에 둡니다. \"검색 필터\"의 규칙을 따릅니다."],
              ["모두 선택 / 모두 선택 해제", "태그가 10개를 넘으면 둡니다."],
              ["폭", "224px보다 좁게 만들지 않습니다. 긴 태그 이름도 대부분 읽을 수 있어야 합니다."],
            ]}
          />
          <Rules
            items={[
              "태그 이름이 너무 길면 말줄임표(…)로 줄이고, 마우스를 올리면 전체 이름을 보여 줍니다.",
              "항목마다 체크박스를 두어 여러 개를 고를 수 있음을 알려 줍니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "처음에는 아무것도 골라져 있지 않습니다.",
            "태그를 고르면 그 항목의 체크박스가 켜집니다.",
            "\"없음\"과 태그는 함께 고를 수 없습니다. \"없음\"을 고르면 고른 태그가 풀리고, 태그를 고르면 \"없음\"이 풀립니다.",
            "\"모두 선택\"을 누르면 태그가 모두 골라지고 글자가 \"모두 선택 해제\"로 바뀝니다. 하나라도 빠져 있으면 다시 \"모두 선택\"입니다.",
            "고른 태그가 많을 수 있으므로, 다시 열었을 때 고른 태그를 목록 맨 위로 끌어올리지 않습니다. 원래 자리에 둡니다.",
            "그 밖의 동작은 \"필터 공통 규칙\"과 같습니다.",
          ]}
        />
      </Section>

      <Section title="상태">
        <Demo caption="태그 없음 / 찾은 것 없음 / 불러오는 중 / 적용하는 중 / 오류">
          <Box p={3}>
            <Text size={200} color="text-secondary">아직 태그가 없습니다</Text>
          </Box>
          <Box p={3}>
            <Text size={200} color="text-secondary">찾은 것이 없습니다</Text>
          </Box>
          <Flex alignItems="center" gap={2} p={3}>
            <Spin size="xs" />
            <Text size={200} color="text-secondary">불러오는 중…</Text>
          </Flex>
          <SpinContainer loading size="m">
            <Box p={3} w={120}>
              <Text size={200}>긴급<br />보류<br />재계약</Text>
            </Box>
          </SpinContainer>
          <Flex alignItems="center" gap={2} p={3}>
            <Text size={200} color="text-secondary">문제가 생겼습니다.</Text>
            <Button use="tertiary" theme="info">다시 불러오기</Button>
          </Flex>
        </Demo>
        <Table
          head={["상태", "보여 줄 것"]}
          rows={[
            ["태그 없음", "표의 데이터에 태그가 하나도 없으면 드롭다운에 \"아직 태그가 없습니다\"를 보여 줍니다."],
            ["찾은 것 없음", "검색한 태그가 없으면 \"찾은 것이 없습니다\"를 보여 줍니다."],
            ["모두 선택", "모두 골랐으면 \"모두 선택 해제\"로, 하나라도 빠졌으면 \"모두 선택\"으로 보여 줍니다."],
            ["불러오는 중", "목록을 가져오는 데 시간이 걸리면 드롭다운에 Spin과 \"불러오는 중…\"을 보여 줍니다."],
            ["적용하는 중", "고른 것을 적용하는 데 시간이 걸리면 목록에 SpinContainer를 씌웁니다."],
            ["오류", "목록을 가져오다 오류가 나면 \"문제가 생겼습니다.\"와 \"다시 불러오기\"를 보여 줍니다."],
            ["값 있음", "필터 버튼에 고른 태그의 수를 보여 줍니다(\"태그: 3개 선택\"). \"없음\"을 골랐으면 \"태그: 없음\"입니다."],
            ["결과 없음", "고른 태그가 붙은 것이 없으면 표에 다른 필터와 같은 \"찾은 것 없음\" 안내를 보여 줍니다. 제목은 \"찾은 것이 없습니다\", 설명은 \"기간이나 필터를 바꿔 보세요.\"입니다."],
          ]}
        />
      </Section>

      <Section title="설명 풍선과 입력값 확인">
        <Rules
          items={[
            "설명 풍선은 태그 이름이 잘렸을 때만 답니다. \"필터 공통 규칙\"을 따릅니다.",
            "검색 입력란의 입력값 확인도 \"필터 공통 규칙\"을 따릅니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <FilterTrigger onClear={() => {}}>태그: 3개 선택</FilterTrigger>,
            text: "고른 태그의 수를 보여 줍니다.",
          }}
          bad={{
            demo: <FilterTrigger onClear={() => {}}>긴급, 보류, 재계약</FilterTrigger>,
            text: "이름표 없이 태그 이름을 늘어놓지 않습니다. 폭이 계속 바뀌고 무슨 필터인지 알 수 없습니다.",
          }}
        />
      </Section>

      <Section title="다른 것과의 구분">
        <P>사용자가 붙인 태그가 아니라 시스템이 정한 고정된 특성으로 거르고, "모두"·"하나라도"·"없음" 가운데 잇는 방식을 골라야 하면 "특성 선택 필터"를 씁니다.</P>
      </Section>
    </Page>
  );
}

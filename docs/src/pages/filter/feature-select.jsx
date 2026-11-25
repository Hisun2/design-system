import React from "react";
import { Select, FilterTrigger, RadioGroup, Radio, Button, Spin, SpinContainer, Divider, Text, Flex, Box } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "특성 선택 필터", order: 9 };

const NONE = "__none";
const features = [
  "결재 완료", "공동 작성", "기한 지남", "대외비", "댓글 있음", "반려 이력 있음", "보존 기한 설정",
  "서명 필요", "수정 이력 있음", "외부 공유", "전자 서명", "첨부 파일 있음",
];

function FeatureFilter() {
  const [value, setValue] = React.useState([]);
  const [logic, setLogic] = React.useState("any");
  const [query, setQuery] = React.useState("");
  const found = features.filter((f) => f.includes(query.trim()));
  const all = features.every((f) => value.includes(f));

  const change = (next) => {
    // "없음"과 특성은 함께 고를 수 없습니다.
    if (next.includes(NONE) && !value.includes(NONE)) return setValue([NONE]);
    setValue(next.filter((v) => v !== NONE));
  };
  const text = value.includes(NONE)
    ? "문서 속성: 없음"
    : `문서 속성: ${value.length}개 ${logic === "all" ? "모두" : "중 하나"}`;

  return (
    <Select multiselect value={value} onChange={change}>
      <Select.Trigger tag={FilterTrigger} wMin={120} placeholder="문서 속성" onClear={() => setValue([])}>
        {text}
      </Select.Trigger>
      <Select.Popper aria-label="문서 속성" wMin={260}>
        <Box px={3} pt={3} pb={1}>
          <RadioGroup value={logic} onChange={setLogic} disabled={value.includes(NONE)} aria-label="고른 속성을 잇는 방식">
            <Flex gap={4}>
              <Radio value="any" label="하나라도 있는 것" />
              <Radio value="all" label="모두 있는 것" />
            </Flex>
          </RadioGroup>
        </Box>
        <Select.InputSearch value={query} onChange={setQuery} placeholder="속성 찾기" />
        <Box px={2} py={1}>
          <Button use="tertiary" theme="info" onClick={() => setValue(all ? [] : features)}>
            {all ? "모두 선택 해제" : "모두 선택"}
          </Button>
        </Box>
        <Select.List hMax="200px">
          {found.map((f) => (
            <Select.Option key={f} value={f}>
              <Select.Option.Checkbox />
              {f}
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
          없음 (속성이 하나도 없는 문서)
        </Select.Option>
      </Select.Popper>
    </Select>
  );
}

export default function FilterFeatureSelectPage() {
  return (
    <Page
      meta={meta}
      lead="시스템이 정해 둔 특성의 목록에서 여러 개를 골라, 그 특성을 가진 것만 보는 필터입니다. 문서의 속성(첨부 파일 있음, 대외비, 서명 필요)이나 거래처의 특성(수출 기업, 장기 거래)처럼 한 건에 여러 개가 붙을 수 있는 값에 씁니다. 먼저 '필터 공통 규칙' 문서를 읽습니다."
    >
      <Section title="무엇인가">
        <Table
          head={["고르는 방식", "보여 주는 것", "예"]}
          rows={[
            ["하나라도 있는 것", "고른 특성 가운데 하나라도 가진 것", "\"첨부 파일 있음\" 또는 \"댓글 있음\"인 문서"],
            ["모두 있는 것", "고른 특성을 모두 가진 것", "\"대외비\"이면서 \"서명 필요\"인 문서"],
            ["없음", "특성이 하나도 없는 것", "아무 속성도 붙지 않은 문서"],
          ]}
        />
        <P>사용자는 아래 네 가지를 할 수 있어야 합니다.</P>
        <Rules
          items={[
            "특성을 하나 또는 여러 개 고를 수 있다는 것을 바로 안다.",
            "특성이 없는 것만 골라 본다.",
            "고른 것을 빨리 지우고 다시 찾는다.",
            "특성을 모두 고른다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Demo caption="눌러서 문서 속성을 골라 보세요">
          <FeatureFilter />
        </Demo>
        <Sub title="필터 버튼">
          <Rules
            items={[
              <><Code>Select</Code>와 <Code>FilterTrigger</Code>로 만듭니다.</>,
              "최소 폭은 120px입니다. 이보다 좁게 만들지 않습니다.",
              "자리가 넉넉하면 폭이 내용에 맞춰 늘어나게 둡니다. 글자가 잘리지 않습니다.",
            ]}
          />
        </Sub>
        <Sub title="드롭다운">
          <Table
            head={["부분", "설명"]}
            rows={[
              ["잇는 방식", "\"하나라도 있는 것\"과 \"모두 있는 것\" 가운데 고르는 라디오 버튼. 기본은 \"하나라도 있는 것\"입니다."],
              ["검색 입력란", <><Code>Select.InputSearch</Code>. 목록을 낱말로 좁힙니다.</>],
              ["모두 선택 / 모두 선택 해제", "목록의 특성을 한꺼번에 고르거나 풉니다."],
              ["특성 목록", "고를 수 있는 특성 모두. 체크박스를 둡니다. 가나다순으로 놓습니다."],
              ["\"없음\"", "특성이 하나도 없는 것을 고르는 항목. 목록과 선으로 나눠 둡니다."],
            ]}
          />
          <Rules
            items={[
              "드롭다운의 폭은 224px보다 좁게 만들지 않습니다. 긴 특성 이름도 읽을 수 있어야 합니다.",
              "특성 이름이 너무 길면 말줄임표(…)로 줄이고, 마우스를 올리면 전체 이름을 보여 줍니다.",
              "특성 이름은 표의 칸에서 쓰는 이름과 똑같이 적습니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "처음에는 아무것도 골라져 있지 않습니다.",
            "\"모두 선택\"을 누르면 특성이 모두 골라지고 글자가 \"모두 선택 해제\"로 바뀝니다.",
            "고른 특성이 많을 수 있으므로, 다시 열었을 때 고른 특성을 목록 맨 위로 끌어올리지 않습니다. 원래 자리에 둡니다.",
            "\"없음\"과 특성은 함께 고를 수 없습니다. \"없음\"을 고르면 고른 특성이 풀리고, 특성을 고르면 \"없음\"이 풀립니다.",
            "\"없음\"을 골랐을 때는 잇는 방식의 라디오 버튼이 뜻이 없으므로 끕니다.",
            "잇는 방식을 바꾸면 고른 특성은 그대로 두고 결과만 다시 걸러 냅니다.",
            "그 밖의 동작은 \"필터 공통 규칙\"과 같습니다.",
          ]}
        />
      </Section>

      <Section title="상태">
        <Demo caption="찾은 것 없음 / 불러오는 중 / 적용하는 중 / 오류">
          <Box p={3}>
            <Text size={200} color="text-secondary">찾은 것이 없습니다</Text>
          </Box>
          <Flex alignItems="center" gap={2} p={3}>
            <Spin size="xs" />
            <Text size={200} color="text-secondary">불러오는 중…</Text>
          </Flex>
          <SpinContainer loading size="m">
            <Box p={3} w={140}>
              <Text size={200}>대외비<br />서명 필요<br />외부 공유</Text>
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
            ["찾은 것 없음", "검색한 특성이 없으면 드롭다운에 \"찾은 것이 없습니다\"를 보여 줍니다."],
            ["모두 선택", "모두 골랐으면 \"모두 선택 해제\"로, 하나라도 빠졌으면 \"모두 선택\"으로 보여 줍니다."],
            ["불러오는 중", "목록을 가져오는 데 시간이 걸리면 드롭다운에 Spin과 \"불러오는 중…\"을 보여 줍니다."],
            ["적용하는 중", "고른 것을 적용하는 데 시간이 걸리면 목록에 SpinContainer를 씌웁니다."],
            ["오류", "목록을 가져오다 오류가 나면 \"문제가 생겼습니다.\"와 \"다시 불러오기\"를 보여 줍니다."],
            ["값 있음", "필터 버튼에 고른 특성의 수를 보여 줍니다(\"문서 속성: 3개 중 하나\", \"문서 속성: 2개 모두\", \"문서 속성: 없음\")."],
            ["결과 없음", "조건에 맞는 것이 없으면 표에 \"찾은 것 없음\" 안내를 보여 줍니다. 제목은 \"찾은 것이 없습니다\", 설명은 \"기간이나 필터를 바꿔 보세요.\"입니다. \"없음\"을 골랐는데 모든 문서에 속성이 있을 때도 이 상태가 됩니다."],
          ]}
        />
      </Section>

      <Section title="이름 줄이기와 설명 풍선">
        <Rules
          items={[
            "필터 이름이 다 들어가지 않으면 정해 둔 짧은 이름으로 줄입니다. \"문서 속성\"은 \"속성\", \"거래처 특성\"은 \"특성\"입니다.",
            "줄임말은 한 번 정하면 모든 화면에서 똑같이 씁니다.",
            "설명 풍선은 이름이나 값이 잘렸을 때, 잇는 방식에 설명이 필요할 때만 답니다. \"필터 공통 규칙\"을 따릅니다.",
          ]}
        />
      </Section>

      <Section title="입력값 확인">
        <P>검색 입력란의 입력값 확인은 "필터 공통 규칙"을 따릅니다.</P>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <FilterTrigger onClear={() => {}}>문서 속성: 2개 모두</FilterTrigger>,
            text: "몇 개를 어떤 방식으로 이었는지 버튼에서 알 수 있게 합니다.",
          }}
          bad={{
            demo: <FilterTrigger onClear={() => {}}>문서 속성: 대외비, 서명 필요, 외부…</FilterTrigger>,
            text: "고른 특성의 이름을 버튼에 늘어놓지 않습니다.",
          }}
        />
      </Section>

      <Section title="다른 것과의 구분">
        <Rules
          items={[
            "사용자가 직접 붙이는 태그로 거를 때는 \"태그 필터\"를 씁니다. 태그 필터는 늘 \"하나라도\"로 잇습니다.",
            "한 건에 값이 하나만 있는 항목(상태, 담당 부서)은 일반 Select 필터나 \"분류 필터\"를 씁니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

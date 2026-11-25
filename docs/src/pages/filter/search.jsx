import React from "react";
import { Input, Select, Button, ButtonLink, DataTable, NoData, Flex } from "@ec21rnc/ui";
import SearchM from "@semcore/icon/Search/m";
import CloseM from "@semcore/icon/Close/m";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "검색 필터", order: 7 };

const docs = [
  { title: "공급 계약서 갱신", name: "가나상사", date: "2026-11-25" },
  { title: "하반기 견적서", name: "다라물산", date: "2026-11-24" },
  { title: "발주서 수정 요청", name: "마바산업", date: "2026-11-21" },
  { title: "세금계산서 재발행", name: "사아유통", date: "2026-11-20" },
];
const columns = [
  { name: "title", children: "문서 제목" },
  { name: "name", children: "거래처" },
  { name: "date", children: "등록일" },
];

function SearchInput({ value, onChange, placeholder, label, w = 240, onEnter, neighborLocation }) {
  return (
    <Input w={w} neighborLocation={neighborLocation}>
      <Input.Addon>
        <SearchM />
      </Input.Addon>
      <Input.Value
        placeholder={placeholder}
        aria-label={label}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && onEnter && onEnter()}
      />
      {value ? (
        <Input.Addon>
          <ButtonLink use="secondary" addonLeft={CloseM} aria-label="지우기" onClick={() => onChange("")} />
        </Input.Addon>
      ) : null}
    </Input>
  );
}

function Result({ query, onClear }) {
  const found = docs.filter((d) => d.title.includes(query.trim()));
  return (
    <DataTable
      aria-label="문서 목록"
      data={found}
      columns={columns}
      renderEmptyData={() => (
        <NoData type="nothing-found" description="다른 낱말로 찾아보세요.">
          <Button mt={4} onClick={onClear}>검색어 지우기</Button>
        </NoData>
      )}
    />
  );
}

function DynamicSearch() {
  const [query, setQuery] = React.useState("");
  return (
    <Flex direction="column" gap={3} w="100%">
      <Flex>
        <SearchInput value={query} onChange={setQuery} placeholder="문서 제목으로 거르기" label="문서 제목으로 거르기" />
      </Flex>
      <Result query={query} onClear={() => setQuery("")} />
    </Flex>
  );
}

function ButtonSearch() {
  const [text, setText] = React.useState("");
  const [query, setQuery] = React.useState("");
  const clear = () => {
    setText("");
    setQuery("");
  };
  return (
    <Flex direction="column" gap={3} w="100%">
      <Flex>
        <SearchInput
          value={text}
          onChange={setText}
          onEnter={() => setQuery(text)}
          placeholder="문서 제목으로 거르기"
          label="문서 제목으로 거르기"
          neighborLocation="right"
        />
        <Button neighborLocation="left" onClick={() => setQuery(text)}>검색</Button>
      </Flex>
      <Result query={query} onClear={clear} />
    </Flex>
  );
}

const fields = [
  { value: "title", children: "문서 제목" },
  { value: "name", children: "거래처" },
  { value: "id", children: "문서 번호" },
];

function TunedSearch() {
  const [field, setField] = React.useState("title");
  const [text, setText] = React.useState("");
  const label = fields.find((f) => f.value === field).children;
  return (
    <Flex>
      <Select value={field} onChange={setField}>
        <Select.Trigger neighborLocation="right" aria-label="찾을 항목">{label}</Select.Trigger>
        <Select.Menu aria-label="찾을 항목">
          {fields.map((f) => (
            <Select.Option key={f.value} value={f.value}>{f.children}</Select.Option>
          ))}
        </Select.Menu>
      </Select>
      <SearchInput value={text} onChange={setText} placeholder={`${label}(으)로 거르기`} label={`${label} 검색`} neighborLocation="both" />
      <Button neighborLocation="left">검색</Button>
    </Flex>
  );
}

function StateSamples() {
  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("계약");
  return (
    <>
      <SearchInput value={a} onChange={setA} placeholder="문서 제목으로 거르기" label="값 없음 예시" />
      <SearchInput value={b} onChange={setB} placeholder="문서 제목으로 거르기" label="값 있음 예시" />
    </>
  );
}

export default function FilterSearchPage() {
  return (
    <Page
      meta={meta}
      lead="표나 목록 안에서 낱말로 찾는 입력란입니다. 입력하는 대로 걸러 내는 방식과, 버튼을 눌러 찾는 방식이 있습니다."
    >
      <Section title="지켜야 할 것">
        <Rules
          items={[
            "쉽게 눈에 띄어야 합니다. 필터가 많은 화면에서도 검색 입력란은 바로 찾을 수 있어야 합니다.",
            "무엇을 기준으로 찾는지 알 수 있어야 합니다.",
            "결과가 없으면 없다는 것을 바로 알 수 있어야 합니다.",
            "넣은 낱말을 빨리 지우고 다시 찾을 수 있어야 합니다.",
          ]}
        />
      </Section>

      <Section title="모양">
        <Demo caption="값 없음 / 값 있음">
          <StateSamples />
        </Demo>
        <Rules
          items={[
            <><Code>Input</Code>의 모양과 속성을 그대로 따릅니다. 크기는 다른 필터와 같은 M입니다.</>,
            "앞에 돋보기 아이콘을 둡니다.",
            "값이 있으면 뒤에 지우기(×) 버튼을 꼭 보여 줍니다.",
            "필터 줄의 맨 앞에 둡니다.",
          ]}
        />
      </Section>

      <Section title="찾는 방식">
        <P>두 방식 모두 낱말 전체가 아니라 일부만 같아도 찾습니다. "계약"을 넣으면 "공급 계약서 갱신"이 나옵니다.</P>

        <Sub title="입력하는 대로 찾기">
          <Demo caption="글자를 넣어 보세요" column>
            <DynamicSearch />
          </Demo>
          <Rules
            items={[
              "글자를 하나만 넣어도 바로 걸러 냅니다.",
              "데이터가 적고, 요청 횟수에 제한이 없는 곳에 씁니다.",
              "넣은 값을 보내기 전에 잠깐(0.3초쯤) 기다립니다. 서버에 부담을 덜고 결과가 덜 깜박입니다.",
            ]}
          />
        </Sub>

        <Sub title="버튼을 눌러 찾기">
          <Demo caption="낱말을 넣고 검색 버튼이나 Enter를 눌러 보세요" column>
            <ButtonSearch />
          </Demo>
          <Rules
            items={[
              "버튼을 누르거나 Enter를 눌렀을 때만 찾습니다. 느리지만 정확합니다.",
              "데이터가 많아 한 번 찾는 데 시간과 비용이 드는 곳, 요청 횟수에 제한이 있는 곳에 씁니다.",
              <>입력란과 버튼은 <Code>neighborLocation</Code>으로 붙여 한 덩어리로 보이게 합니다.</>,
            ]}
          />
        </Sub>

        <Sub title="찾을 항목 고르기">
          <Demo>
            <TunedSearch />
          </Demo>
          <P>무엇을 기준으로 찾을지 고르게 해야 하면 입력란 앞에 Select를 붙입니다. Select, 입력란, 버튼 셋을 함께 붙여도 됩니다.</P>
        </Sub>

        <Sub title="상태">
          <Table
            head={["상태", "설명"]}
            rows={[
              ["값 없음", "안내 글자(placeholder)로 무엇을 찾는 입력란인지 알려 줍니다. 안내 글자는 꼭 넣습니다."],
              ["초점", "글자를 하나라도 넣기 전까지 안내 글자는 남아 있습니다."],
              ["값 있음", "지우기 버튼을 보여 줍니다. 입력하는 대로 찾는 방식은 글자를 넣을 때마다 걸러 냅니다."],
            ]}
          />
        </Sub>
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "한 가지 항목으로만 찾으면 안내 글자를 \"문서 제목으로 거르기\"처럼 \"{항목}(으)로 거르기\"로 적습니다.",
            "여러 항목에서 한꺼번에 찾으면 \"검색\"이라고만 적습니다.",
            "이 입력란은 필터처럼 동작합니다. 그래서 무엇으로 거르는지를 안내 글자에 밝힙니다. \"검색\"은 단순한 검색 입력란이나, 찾을 항목을 고르는 Select가 옆에 있을 때만 씁니다.",
          ]}
        />
        <Sub title="이름표">
          <Rules
            items={[
              "필터 줄에서는 자리가 없어 이름표를 빼는 일이 많습니다. 그러나 안내 글자만으로는 모자랍니다. 글자를 넣으면 사라지기 때문입니다.",
              "이름표는 늘 보여야 합니다. 검색 입력란에서는 돋보기 아이콘이 그 구실을 할 수 있습니다.",
              <>보이는 이름표가 없으면 <Code>aria-label</Code>로 이름을 붙입니다.</>,
            ]}
          />
        </Sub>
      </Section>

      <Section title="폭">
        <Rules
          items={[
            "폭은 찾는 값의 길이에 맞춥니다. 주소(URL)나 긴 제목을 찾는 입력란은 넓게 만듭니다.",
            "최소 폭은 160px입니다. 언제나 최소 폭을 정해 둡니다. 정하지 않으면 필터가 많을 때 안내 글자가 잘려 읽을 수 없는 입력란이 됩니다.",
            "입력하는 대로 찾는 입력란은 글자 두어 개면 충분한 경우가 많으므로 최소 폭으로 두어도 됩니다.",
          ]}
        />
      </Section>

      <Section title="찾은 글자 강조">
        <Rules
          items={[
            "선택 사항입니다. 결과 안에서 찾은 낱말과 같은 부분의 바탕을 강조 색으로 칠해 어디가 맞았는지 보여 줍니다.",
            "강조 바탕의 높이는 글줄 높이와 같게 합니다.",
          ]}
        />
      </Section>

      <Section title="찾은 것 없음">
        <Table
          head={["경우", "보여 줄 것"]}
          rows={[
            ["데이터가 원래 없음", "\"데이터 없음\" 안내. 지울 검색어가 없으므로 지우기 버튼을 두지 않습니다."],
            ["검색어 때문에 없음", "\"찾은 것 없음\" 안내와 검색어를 지우는 버튼. 왜 안 보이는지와 어떻게 되돌리는지 알 수 있습니다."],
          ]}
        />
        <P>설명 글은 화면에 맞게 바꿀 수 있습니다. 안내의 모양은 "표의 상태" 문서를 따릅니다. 위의 예시에서 없는 낱말을 넣어 확인할 수 있습니다.</P>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Input w={240}>
                <Input.Addon><SearchM /></Input.Addon>
                <Input.Value placeholder="거래처 이름으로 거르기" aria-label="거래처 이름으로 거르기" />
              </Input>
            ),
            text: "무엇으로 거르는지 안내 글자에 적고, 읽을 수 있는 폭을 줍니다.",
          }}
          bad={{
            demo: (
              <Input w={72}>
                <Input.Value placeholder="거래처 이름으로 거르기" aria-label="좁은 입력란" />
              </Input>
            ),
            text: "안내 글자가 잘릴 만큼 좁게 만들지 않습니다. 아이콘도 이름표도 없이 두지 않습니다.",
          }}
        />
      </Section>
    </Page>
  );
}

import React from "react";
import { AddFilter, Select, FilterTrigger } from "@ec21rnc/ui";
import SearchM from "@semcore/icon/Search/m";
import CloseM from "@semcore/icon/Close/m";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "AddFilter" };

const kinds = [
  { value: "buy", children: "매입" },
  { value: "sell", children: "매출" },
];
const statuses = ["승인 대기", "승인 완료", "반려"];
const managers = ["구매 1팀 담당자", "구매 2팀 담당자", "영업 1팀 담당자"];
const empty = { kind: null, name: "", status: null, manager: null };

function FilterRow() {
  const [filterData, setFilterData] = React.useState(empty);
  const set = (key, value) => setFilterData((prev) => ({ ...prev, [key]: value }));
  return (
    <AddFilter filterData={filterData} onClearAll={() => setFilterData(empty)}>
      <Select tag={FilterTrigger} placeholder="거래 구분" options={kinds} value={filterData.kind} onChange={(value) => set("kind", value)} onClear={() => set("kind", null)} />

      <AddFilter.Input name="name" displayName="거래처 이름" w={200}>
        <AddFilter.Input.Addon><SearchM /></AddFilter.Input.Addon>
        <AddFilter.Input.Value placeholder="거래처 이름 입력" aria-label="거래처 이름" value={filterData.name} onChange={(value) => set("name", value)} />
        <AddFilter.Input.Addon>
          <AddFilter.Input.Clear use="secondary" addonLeft={CloseM} aria-label="거래처 이름 필터 지우기" onClick={() => set("name", "")} />
        </AddFilter.Input.Addon>
      </AddFilter.Input>

      <AddFilter.Select name="status" displayName="상태" onChange={(value) => set("status", value)}>
        <AddFilter.Select.Trigger placeholder="상태" onClear={() => set("status", null)}>
          상태: {filterData.status}
        </AddFilter.Select.Trigger>
        <AddFilter.Select.Menu aria-label="상태">
          {statuses.map((name) => (
            <AddFilter.Select.Option key={name} value={name}>{name}</AddFilter.Select.Option>
          ))}
        </AddFilter.Select.Menu>
      </AddFilter.Select>

      <AddFilter.Select name="manager" displayName="담당자" onChange={(value) => set("manager", value)}>
        <AddFilter.Select.Trigger placeholder="담당자" onClear={() => set("manager", null)}>
          담당자: {filterData.manager}
        </AddFilter.Select.Trigger>
        <AddFilter.Select.Menu aria-label="담당자">
          {managers.map((name) => (
            <AddFilter.Select.Option key={name} value={name}>{name}</AddFilter.Select.Option>
          ))}
        </AddFilter.Select.Menu>
      </AddFilter.Select>
    </AddFilter>
  );
}

export default function AddFilterPage() {
  return (
    <Page meta={meta} lead="필터를 하나씩 골라 붙여 쓰게 하는 필터 줄입니다. 쓸 수 있는 필터가 많지만 사용자는 그 가운데 몇 개만 쓸 때, 자리를 아끼려고 씁니다.">
      <Section title="구성">
        <Demo caption="&quot;필터 추가&quot;를 눌러 필터를 붙여 봅니다. &quot;거래 구분&quot;은 늘 보이는 고정 필터입니다">
          <FilterRow />
        </Demo>
        <Table
          head={["부품", "역할"]}
          rows={[
            [<Code>AddFilter</Code>, <>필터 줄 전체입니다. <Code>filterData</Code>에 필터 값 묶음을, <Code>onClearAll</Code>에 모두 지울 때 할 일을 넘깁니다.</>],
            [<Code>AddFilter.Input</Code>, "글자를 넣어 거르는 필터입니다."],
            [<Code>AddFilter.Select</Code>, "목록에서 골라 거르는 필터입니다."],
            [<Code>AddFilter.Dropdown</Code>, "범위 입력처럼 직접 꾸민 내용을 띄우는 필터입니다."],
            ["그 밖의 자식 요소", "고정 필터입니다. 늘 보이고 사용자가 숨길 수 없습니다."],
          ]}
        />
        <Rules
          items={[
            <>붙였다 뗄 수 있는 필터마다 <Code>name</Code>을 줍니다. <Code>filterData</Code>의 열쇠 이름과 같아야 합니다.</>,
            <><Code>displayName</Code>은 "필터 추가" 목록에 보이는 이름입니다. 주지 않으면 <Code>name</Code>이 그대로 나옵니다.</>,
            <>지금 붙어 있는 필터의 목록은 <Code>visibleFilters</Code>와 <Code>onVisibleFiltersChange</Code>로 직접 다룰 수 있습니다.</>,
            "\"필터 추가\"와 \"필터 지우기\" 글자는 UiProvider가 한국어로 맞춥니다.",
          ]}
        />
      </Section>

      <Section title="처음 모습">
        <Rules
          items={[
            "처음에는 \"필터 추가\"라는 약한 버튼(tertiary) 하나로 보입니다.",
            "그 앞에 고정 필터를 둘 수 있습니다. 거의 모든 사용자가 쓰는 필터 한두 개만 고정합니다.",
            "필터 사이, 필터와 버튼 사이 간격은 8px입니다.",
          ]}
        />
      </Section>

      <Section title="필터 붙이기">
        <Rules
          items={[
            "\"필터 추가\"를 누르면 붙일 수 있는 필터의 목록이 열립니다.",
            "목록은 가나다순으로 놓습니다.",
            "목록의 항목이 열 개를 넘으면 검색창을 둡니다.",
            "필터를 고르면 필터 줄에 붙고 곧바로 열립니다. 사용자는 이어서 값을 고르거나 넣습니다.",
            "값을 정하지 않은 채 Esc를 누르거나 다른 곳을 누르면 그 필터는 다시 떼어집니다.",
            "이미 붙은 필터는 목록에서 빠집니다.",
          ]}
        />
      </Section>

      <Section title="필터 떼기">
        <Rules
          items={[
            "붙인 필터의 값을 지우면 그 필터는 필터 줄에서 사라지고 \"필터 추가\" 목록으로 돌아갑니다.",
            "고정 필터를 포함해 값이 하나라도 정해져 있으면 줄의 오른쪽 끝에 \"필터 지우기\" 버튼이 나옵니다.",
            "\"필터 지우기\"는 모든 필터의 값을 비우고, 붙였던 필터를 모두 뗍니다. 고정 필터는 값만 비워진 채 남습니다.",
          ]}
        />
      </Section>

      <Section title="필터가 많을 때">
        <Rules
          items={[
            "가로 자리가 모자라면 필터는 다음 줄로 넘어갑니다. 줄 사이 간격도 8px입니다.",
            "붙일 수 있는 필터를 모두 붙이면 \"필터 추가\" 버튼은 사라집니다.",
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "필터 이름은 \"상태\", \"담당자\"처럼 거르는 기준을 명사로 적습니다.",
            "값을 고른 필터는 \"상태: 승인 대기\"처럼 이름과 값을 함께 보여 줍니다. 값만 보이면 무엇을 거른 것인지 알 수 없습니다.",
            "검색 필터의 안내 글자는 \"거래처 이름 입력\"처럼 무엇을 넣는지 적습니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "필터가 여섯 개 이상이고 사용자마다 쓰는 필터가 다를 때 씁니다. 자주 쓰는 한두 개만 고정합니다." }}
          bad={{ text: "필터가 서너 개뿐이면 쓰지 않습니다. 모두 펼쳐 두는 편이 빠릅니다. 모든 필터를 고정 필터로 두지도 않습니다." }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["상황", "쓸 것"]}
          rows={[
            ["필터가 많고 일부만 골라 쓸 때", "AddFilter"],
            ["필터가 적어 모두 보여 줄 수 있을 때", <>필터 단추(<Code>FilterTrigger</Code>)를 나란히 둔 필터 줄</>],
            ["표 위에서 낱말로 찾기만 할 때", "검색 Input 하나"],
          ]}
        />
        <P>필터 단추 하나하나의 모양과 상태는 FilterTrigger 페이지를 따릅니다.</P>
      </Section>
    </Page>
  );
}

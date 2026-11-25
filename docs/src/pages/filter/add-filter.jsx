import React from "react";
import { AddFilter, Select, FilterTrigger, Button, Flex } from "@ec21rnc/ui";
import SearchM from "@semcore/icon/Search/m";
import CloseM from "@semcore/icon/Close/m";
import MathPlusM from "@semcore/icon/MathPlus/m";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "필터 추가", order: 2 };

const statusOptions = ["승인", "진행 중", "확인 필요", "반려"].map((v) => ({ value: v, children: v }));
const selects = [
  { name: "manager", label: "담당자", options: ["김담당", "이담당", "박담당", "최담당"] },
  { name: "team", label: "담당 부서", options: ["영업1팀", "영업2팀", "구매팀", "재무팀"] },
  { name: "kind", label: "문서 종류", options: ["견적서", "계약서", "발주서", "세금계산서"] },
];
const empty = { status: null, manager: null, team: null, kind: null, title: "" };

function AddFilterDemo() {
  const [data, setData] = React.useState(empty);
  const set = (name) => (value) => setData((d) => ({ ...d, [name]: value }));
  return (
    <AddFilter filterData={data} onClearAll={() => setData(empty)} w="100%">
      <Select tag={FilterTrigger} placeholder="상태" options={statusOptions} value={data.status} onChange={set("status")} />
      {selects.map((f) => (
        <AddFilter.Select key={f.name} name={f.name} displayName={f.label} value={data[f.name]} onChange={set(f.name)}>
          <AddFilter.Select.Trigger placeholder={f.label}>{`${f.label}: ${data[f.name]}`}</AddFilter.Select.Trigger>
          <AddFilter.Select.Menu aria-label={f.label}>
            {f.options.map((o) => (
              <AddFilter.Select.Option key={o} value={o}>{o}</AddFilter.Select.Option>
            ))}
          </AddFilter.Select.Menu>
        </AddFilter.Select>
      ))}
      <AddFilter.Input name="title" displayName="문서 제목" w={200}>
        <AddFilter.Input.Addon>
          <SearchM />
        </AddFilter.Input.Addon>
        <AddFilter.Input.Value
          placeholder="문서 제목으로 거르기"
          aria-label="문서 제목"
          value={data.title}
          onChange={set("title")}
        />
        {data.title ? (
          <AddFilter.Input.Addon>
            <AddFilter.Input.Clear addonLeft={CloseM} use="secondary" aria-label="지우기" onClick={() => set("title")("")} />
          </AddFilter.Input.Addon>
        ) : null}
      </AddFilter.Input>
    </AddFilter>
  );
}

export default function AddFilterPage() {
  return (
    <Page
      meta={meta}
      lead="쓸 수 있는 필터가 많을 때, 처음에는 몇 개만 보여 주고 나머지는 사용자가 필요한 것을 하나씩 더하게 하는 방식입니다. 자리를 아끼고 화면을 단순하게 지킵니다."
    >
      <Section title="구성">
        <Demo caption="&quot;필터 추가&quot;를 눌러 필터를 더해 보세요">
          <AddFilterDemo />
        </Demo>
        <Table
          head={["부분", "설명"]}
          rows={[
            ["늘 보이는 필터", "누구나 자주 쓰는 필터입니다. 사용자가 없앨 수 없습니다. 맨 앞에 둡니다."],
            ["더한 필터", "사용자가 목록에서 골라 더한 필터입니다. 값을 지우면 줄에서 사라집니다."],
            ["필터 추가 버튼", "더할 수 있는 필터의 목록을 엽니다. 약한 버튼에 더하기 아이콘을 붙입니다."],
            ["필터 지우기 버튼", "값이 하나라도 걸려 있을 때 줄의 오른쪽 끝에 나옵니다."],
          ]}
        />
      </Section>

      <Section title="처음 상태">
        <Rules
          items={[
            "처음에는 늘 보이는 필터와 \"필터 추가\" 버튼만 보입니다.",
            "\"필터 추가\"는 약한 버튼(tertiary)입니다. 늘 보이는 필터 바로 뒤에 둡니다.",
            "늘 보이는 필터는 서너 개를 넘기지 않습니다. 가장 자주 쓰는 것만 고릅니다.",
          ]}
        />
      </Section>

      <Section title="필터 더하기">
        <Rules
          items={[
            "\"필터 추가\"를 누르면 더할 수 있는 필터가 모두 목록으로 열립니다.",
            "목록은 가나다순으로 놓습니다.",
            "목록의 항목이 10개를 넘으면 맨 위에 검색 입력란을 둡니다.",
            "필터를 하나 고르면 그 필터가 줄에 더해지고 곧바로 열립니다. 사용자는 이어서 값을 고르면 됩니다.",
            "이때 값을 고르지 않고 Esc를 누르거나 바깥을 누르면 방금 더한 필터는 다시 사라집니다.",
            "이미 더한 필터는 목록에서 빠집니다.",
          ]}
        />
      </Section>

      <Section title="필터 빼기">
        <Rules
          items={[
            "더한 필터의 값을 지우면(×) 그 필터는 줄에서 사라지고 \"필터 추가\" 목록으로 돌아갑니다.",
            "늘 보이는 필터의 값을 지우면 값만 지워지고 필터는 남습니다.",
            "늘 보이는 필터를 포함해 값이 하나라도 걸려 있으면 \"필터 지우기\" 버튼을 둘 수 있습니다.",
            "\"필터 지우기\"는 모든 필터의 값을 지우고, 더한 필터를 줄에서 모두 뺍니다.",
          ]}
        />
      </Section>

      <Section title="여러 개를 더했을 때">
        <Rules
          items={[
            "가로 자리가 모자라면 필터는 다음 줄로 넘어갑니다. 줄 사이 간격도 8px입니다.",
            "더할 수 있는 필터를 모두 더하면 \"필터 추가\" 버튼은 사라집니다.",
            "더한 필터는 더한 순서대로 놓입니다.",
          ]}
        />
      </Section>

      <Section title="만드는 법">
        <Rules
          items={[
            <><Code>AddFilter</Code> 안에 그냥 넣은 요소는 늘 보이는 필터가 됩니다.</>,
            <><Code>AddFilter.Select</Code>, <Code>AddFilter.Input</Code>, <Code>AddFilter.Dropdown</Code>으로 넣은 것은 더할 수 있는 필터가 됩니다. <Code>name</Code>은 필터의 키, <Code>displayName</Code>은 목록에 보일 이름입니다.</>,
            <><Code>filterData</Code>에는 모든 필터의 지금 값을 <Code>name</Code>을 키로 하여 넘깁니다. 값이 하나라도 있으면 "필터 지우기"가 나옵니다.</>,
            <><Code>onClearAll</Code>에서 모든 값을 처음으로 되돌립니다.</>,
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Flex gap={2}>
                <FilterTrigger placeholder="상태" empty />
                <Button use="tertiary" addonLeft={MathPlusM}>필터 추가</Button>
              </Flex>
            ),
            text: "필터가 예닐곱 개를 넘으면 자주 쓰는 것만 늘 보여 주고 나머지는 \"필터 추가\"에 넣습니다.",
          }}
          bad={{
            demo: (
              <Flex gap={2}>
                <Button use="tertiary" addonLeft={MathPlusM}>필터 추가</Button>
              </Flex>
            ),
            text: "필터가 서너 개뿐인데 모두 \"필터 추가\" 안에 숨기지 않습니다. 그럴 때는 모두 늘 보이게 둡니다.",
          }}
        />
      </Section>

      <Section title="다른 것과의 구분">
        <P>서로 얽힌 조건 여러 개를 한 묶음으로 넣고 한 번에 적용해야 하면 "상세 필터"를 씁니다. 필터 추가는 서로 독립된 필터를 하나씩 더할 때 씁니다.</P>
      </Section>
    </Page>
  );
}

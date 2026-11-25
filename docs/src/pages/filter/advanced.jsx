import React from "react";
import {
  Dropdown, FilterTrigger, Select, Input, InputNumber, Button, Counter, Divider, Spin, SpinContainer, Tooltip, Text, Flex, Box,
} from "@ec21rnc/ui";
import FilterM from "@semcore/icon/Filter/m";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "상세 필터", order: 3 };

const teams = ["영업1팀", "영업2팀", "구매팀", "재무팀"].map((v) => ({ value: v, children: v }));
const kinds = ["견적서", "계약서", "발주서", "세금계산서"].map((v) => ({ value: v, children: v }));
const blank = { team: null, kind: null, docNo: "", min: "" };
const countOf = (v) => Object.values(v).filter(Boolean).length;

function Fields({ draft, setDraft, onEnter }) {
  const set = (name) => (value) => setDraft((d) => ({ ...d, [name]: value }));
  return (
    <Flex direction="column" gap={3}>
      <Flex direction="column" gap={1}>
        <Text size={200}>담당 부서</Text>
        <Select placeholder="부서 선택" options={teams} value={draft.team} onChange={set("team")} />
      </Flex>
      <Flex direction="column" gap={1}>
        <Text size={200}>문서 종류</Text>
        <Select placeholder="종류 선택" options={kinds} value={draft.kind} onChange={set("kind")} />
      </Flex>
      <Flex direction="column" gap={1}>
        <Text size={200}>문서 번호</Text>
        <Input>
          <Input.Value
            placeholder="예: D-1042"
            aria-label="문서 번호"
            value={draft.docNo}
            onChange={set("docNo")}
            onKeyDown={(e) => e.key === "Enter" && onEnter()}
          />
        </Input>
      </Flex>
      <Flex direction="column" gap={1}>
        <Text size={200}>금액(원) 이상</Text>
        <InputNumber>
          <InputNumber.Value min={0} aria-label="최소 금액" value={draft.min} onChange={set("min")} />
          <InputNumber.Controls />
        </InputNumber>
      </Flex>
    </Flex>
  );
}

function AdvancedDropdown() {
  const [visible, setVisible] = React.useState(false);
  const [applied, setApplied] = React.useState(blank);
  const [draft, setDraft] = React.useState(blank);
  const count = countOf(applied);
  const apply = () => {
    setApplied(draft);
    setVisible(false);
  };
  const clear = () => {
    setDraft(blank);
    setApplied(blank);
  };
  return (
    <Dropdown visible={visible} onVisibleChange={setVisible}>
      <Dropdown.Trigger tag={FilterTrigger} placeholder="상세 필터" empty={!count} onClear={clear}>
        <span>상세 필터</span>
        <FilterTrigger.Counter>{count}</FilterTrigger.Counter>
      </Dropdown.Trigger>
      <Dropdown.Popper w={320} aria-label="상세 필터">
        <Box p={4}>
          <Fields draft={draft} setDraft={setDraft} onEnter={apply} />
        </Box>
        <Divider />
        <Flex gap={2} p={4}>
          <Button use="primary" theme="info" onClick={apply}>적용</Button>
          <Button onClick={() => setDraft(blank)}>모두 지우기</Button>
        </Flex>
      </Dropdown.Popper>
    </Dropdown>
  );
}

function AdvancedAccordion() {
  const [open, setOpen] = React.useState(false);
  const [applied, setApplied] = React.useState(blank);
  const [draft, setDraft] = React.useState(blank);
  const count = countOf(applied);
  const clear = () => {
    setDraft(blank);
    setApplied(blank);
  };
  return (
    <Flex direction="column" w="100%" gap={2}>
      <Flex gap={2}>
        <Button active={open} aria-expanded={open} addonLeft={FilterM} onClick={() => setOpen(!open)}>
          상세 필터
          {count ? <Counter ml={2} theme="info">{count}</Counter> : null}
        </Button>
        {count ? <Button use="tertiary" theme="muted" onClick={clear}>상세 필터 지우기</Button> : null}
      </Flex>
      {open ? (
        <Box p={4} w={360}>
          <Fields draft={draft} setDraft={setDraft} onEnter={() => setApplied(draft)} />
          <Flex gap={2} mt={4}>
            <Button use="primary" theme="info" onClick={() => setApplied(draft)}>적용</Button>
            <Button onClick={() => setDraft(blank)}>모두 지우기</Button>
            <Tooltip title="상세 필터를 접습니다. 적용한 값은 그대로입니다.">
              <Button use="tertiary" theme="muted" ml="auto" onClick={() => setOpen(false)}>접기</Button>
            </Tooltip>
          </Flex>
        </Box>
      ) : null}
    </Flex>
  );
}

export default function AdvancedFiltersPage() {
  return (
    <Page
      meta={meta}
      lead="서로 관련된 조건 여러 개를 한 묶음으로 모아 둔 필터입니다. 사용자는 묶음 안에 조건이 몇 개 걸려 있는지 알 수 있어야 하고, 조건을 빨리 더하고 뺄 수 있어야 합니다."
    >
      <Section title="구성">
        <Demo caption="드롭다운 방식 — 눌러서 조건을 넣고 적용해 보세요">
          <AdvancedDropdown />
        </Demo>
        <Table
          head={["부분", "설명"]}
          rows={[
            ["여는 버튼", <><Code>FilterTrigger</Code> 또는 버튼. 적용한 조건의 수를 보여 줍니다.</>],
            ["조건들", "Select, 입력란, 숫자 입력란 등. 각각 이름표를 둡니다."],
            ["조건 추가 버튼", "같은 종류의 조건을 더 넣을 수 있을 때만 둡니다(선택 사항)."],
            ["적용·모두 지우기 버튼", "묶음 맨 아래에 둡니다. 조건들과 선으로 나눌 수 있습니다."],
          ]}
        />
        <Rules
          items={[
            "조건 사이의 간격을 늘리거나 줄일 때는 4px의 배수로 합니다.",
            <>적용 버튼 줄은 <Code>--ec-border</Code> 색 1px 선으로 조건들과 나눌 수 있습니다.</>,
          ]}
        />
      </Section>

      <Section title="조건의 수">
        <Rules
          items={[
            "필터를 적용하면 여는 버튼에 Counter가 나옵니다. 묶음 안에서 지금 적용된 조건의 수입니다.",
            "적용할 때마다 다시 셉니다. 입력만 하고 적용하지 않은 조건은 세지 않습니다.",
            "적용된 조건이 없으면 Counter를 보여 주지 않습니다. 0을 적지 않습니다.",
          ]}
        />
      </Section>

      <Section title="지우기 버튼">
        <P>묶음 전체를 지우는 버튼은 FilterTrigger의 ×와 똑같이 동작하고 이름만 다릅니다("상세 필터 지우기"). 조건이 하나라도 적용된 뒤에만 나옵니다.</P>
      </Section>

      <Section title="드롭다운이냐 펼침이냐">
        <Table
          head={["방식", "언제 쓰는가"]}
          rows={[
            ["드롭다운", "화면을 스크롤하는 동안에도 필터를 열어 바꿀 수 있어야 할 때. 조건이 많아 평소에는 숨겨 두는 편이 나을 때."],
            ["펼침", "표를 보면서 그 위에서 조건을 다뤄야 할 때. 다른 목록으로 옮겨도 적용한 조건이 계속 보여야 할 때."],
          ]}
        />

        <Sub title="드롭다운 방식">
          <Rules
            items={[
              "\"적용\"과 \"모두 지우기\" 버튼이 꼭 있어야 합니다. 조건 추가 버튼은 필요할 때만 둡니다.",
              "드롭다운의 폭은 고정합니다. 내용에 따라 폭이 바뀌지 않습니다.",
              "조건이 네 줄을 넘으면 나머지는 드롭다운 안에서 스크롤해 보게 합니다.",
              "\"적용\"을 누르면 드롭다운이 닫히고 여는 버튼의 Counter가 나오거나 바뀝니다.",
              "\"모두 지우기\"는 넣은 값을 모두 비웁니다.",
              "입력란에서 Enter를 누르면 넣은 값이 적용됩니다.",
              "필터 줄은 스크롤할 때 화면 위에 고정할 수 있습니다.",
            ]}
          />
          <Table
            head={["경우", "모양"]}
            rows={[
              ["서로 다른 조건들", "조건마다 이름표와 입력 요소를 한 줄씩 세로로 놓습니다."],
              ["같은 조건을 여러 개", "한 줄에 \"대상 – 조건 – 값\"을 나란히 놓고, 아래에 \"조건 추가\" 버튼을 둡니다. 줄마다 빼는 버튼을 둡니다."],
            ]}
          />
        </Sub>

        <Sub title="펼침 방식">
          <Demo caption="눌러서 펼쳐 보세요" column>
            <AdvancedAccordion />
          </Demo>
          <Rules
            items={[
              "펼치면 아래의 내용(표)을 밀어 내립니다. 표를 덮지 않습니다.",
              <>펼친 영역의 바탕은 <Code>--ec-bg-surface</Code>, 테두리는 <Code>--ec-border</Code> 1px입니다.</>,
              "적용한 뒤에는 여는 버튼에 조건의 수를 Counter로 보여 주고, 적용할 때마다 다시 셉니다.",
              "\"접기\" 버튼을 둘 때는 마우스를 올리면 설명 풍선이 나오게 합니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="상태">
        <Demo caption="값 없음 / 열림 / 조건 2개 적용">
          <FilterTrigger placeholder="상세 필터" empty />
          <FilterTrigger placeholder="상세 필터" empty active />
          <FilterTrigger onClear={() => {}}>
            <span>상세 필터</span>
            <FilterTrigger.Counter>2</FilterTrigger.Counter>
          </FilterTrigger>
        </Demo>
        <P>여는 버튼의 상태(값 없음, 마우스를 올림, 열림, 값 있음)는 "필터 공통 규칙"의 필터 버튼과 같습니다.</P>
      </Section>

      <Section title="동작">
        <Sub title="적용하는 때">
          <Rules
            items={[
              "기본은 \"적용\" 버튼을 눌렀을 때 한꺼번에 적용하는 것입니다. 조건을 하나 바꿀 때마다 표를 다시 불러오지 않습니다.",
              "조건 하나가 결과를 크게 바꾸고, 그 결과를 보면서 다음 조건을 정해야 하는 화면에서는 \"적용\" 버튼 없이 바꾸는 즉시 적용합니다.",
              "한 화면 안에서 두 방식을 섞지 않습니다.",
            ]}
          />
        </Sub>
        <Sub title="값을 기억하기">
          <Rules
            items={[
              "필터는 그 목록 화면 안에서만 유효합니다. 다른 목록에 같은 조건이 저절로 걸리지 않습니다.",
              "같은 화면으로 돌아오거나 화면을 새로 고쳐도 적용한 조건은 남아 있어야 합니다.",
              "기간을 바꾸거나 탭을 옮겨도 상세 필터의 값은 지키고 있습니다.",
              "적용한 조건은 주소(URL)에 담습니다. 주소를 복사해 보내면 받은 사람도 같은 결과를 봅니다.",
            ]}
          />
        </Sub>
        <Sub title="묶음 지우기">
          <Rules
            items={[
              "지우기 버튼은 조건을 적용한 뒤에 나오고, 묶음의 조건을 모두 지웁니다.",
              "지우면 이 필터에 딸린 표를 다시 불러와 조건이 없는 결과를 보여 줍니다.",
              "\"모두 지우기\"를 누르면 묶음에 적용된 것이 남김없이 지워집니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="불러오는 중">
        <Demo caption="조건의 목록을 불러오는 중 / 적용하는 중">
          <Flex alignItems="center" gap={2} p={3}>
            <Spin size="xs" />
            <Text size={200} color="text-secondary">불러오는 중…</Text>
          </Flex>
          <SpinContainer loading size="m">
            <Box p={3} w={200}>
              <Select placeholder="부서 선택" options={teams} />
            </Box>
          </SpinContainer>
        </Demo>
        <Rules
          items={[
            "묶음의 내용이나 일부 조건의 목록을 가져오는 중이면 Spin과 \"불러오는 중…\"을 보여 줍니다.",
            "고른 값을 적용하는 데 시간이 걸리면 조건들 전체에 SpinContainer를 씌웁니다.",
          ]}
        />
      </Section>

      <Section title="찾은 것 없음">
        <P>적용한 결과가 없으면 표에 "찾은 것 없음" 안내와 필터를 바꾸거나 지우는 버튼을 보여 줍니다. 모양은 "표의 상태" 문서를 따릅니다.</P>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <FilterTrigger onClear={() => {}}>
                <span>상세 필터</span>
                <FilterTrigger.Counter>3</FilterTrigger.Counter>
              </FilterTrigger>
            ),
            text: "적용한 조건의 수를 여는 버튼에 보여 줍니다. 닫혀 있어도 필터가 걸려 있음을 알 수 있습니다.",
          }}
          bad={{
            demo: <Button>상세 필터</Button>,
            text: "조건이 걸려 있는데 아무 표시 없는 버튼으로 두지 않습니다. 결과가 왜 적은지 알 수 없게 됩니다.",
          }}
        />
      </Section>
    </Page>
  );
}

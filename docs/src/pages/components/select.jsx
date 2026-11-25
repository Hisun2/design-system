import React from "react";
import { Select, LinkTrigger, Badge, Flex, Box, Text } from "@ec21rnc/ui";
import UserM from "@semcore/icon/User/m";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Select" };

const categories = [
  { value: "contract", children: "계약서" },
  { value: "estimate", children: "견적서" },
  { value: "order", children: "발주서" },
  { value: "invoice", children: "세금계산서" },
];

const managers = ["구매 1팀 담당자", "구매 2팀 담당자", "영업 1팀 담당자", "영업 2팀 담당자", "재무팀 담당자", "법무팀 담당자", "총무팀 담당자", "물류팀 담당자"];

function SearchSelect() {
  const [value, setValue] = React.useState(null);
  const [query, setQuery] = React.useState("");
  const found = managers.filter((name) => name.includes(query));
  return (
    <Select value={value} onChange={setValue} placeholder="담당자 선택">
      <Select.Trigger />
      <Select.Popper aria-label="담당자">
        <Select.InputSearch value={query} onChange={setQuery} placeholder="담당자 이름 입력" />
        <Select.List hMax={224}>
          {found.map((name) => (
            <Select.Option key={name} value={name}>{name}</Select.Option>
          ))}
          {found.length === 0 ? <Select.StatusItem itemsCount={0}>찾는 항목이 없습니다</Select.StatusItem> : null}
        </Select.List>
      </Select.Popper>
    </Select>
  );
}

function GroupSelect() {
  return (
    <Select placeholder="문서 종류 선택">
      <Select.Trigger />
      <Select.Menu>
        <Select.Group title="거래 전">
          <Select.Option value="estimate">
            <Select.Option.Content>
              견적서
              <Select.Option.Hint>금액을 미리 알리는 문서</Select.Option.Hint>
            </Select.Option.Content>
          </Select.Option>
          <Select.Option value="order">발주서</Select.Option>
        </Select.Group>
        <Select.Group title="거래 후">
          <Select.Option value="invoice">세금계산서</Select.Option>
          <Select.Option value="settlement">정산 내역서</Select.Option>
        </Select.Group>
      </Select.Menu>
    </Select>
  );
}

function MultiSelect() {
  const [value, setValue] = React.useState([]);
  const label = value.length === 0 ? null : value.length <= 2 ? value.join(", ") : `${value.length}개 선택`;
  return (
    <Select multiselect value={value} onChange={setValue} placeholder="담당자 선택">
      <Select.Trigger>{label}</Select.Trigger>
      <Select.Menu hMax={224}>
        {managers.map((name) => (
          <Select.Option key={name} value={name}>
            <Select.Option.Checkbox />
            {name}
          </Select.Option>
        ))}
      </Select.Menu>
    </Select>
  );
}

export default function SelectPage() {
  return (
    <Page meta={meta} lead="정해진 목록에서 값을 하나 또는 여럿 고르는 요소입니다. 목록이 길면 검색창, 묶음 제목, 고정 항목을 함께 둘 수 있습니다.">
      <Section title="구성">
        <Demo caption="options만 넘기는 가장 짧은 모양">
          <Select placeholder="문서 종류 선택" options={categories} />
        </Demo>
        <Table
          head={["부품", "역할"]}
          rows={[
            [<Code>Select.Trigger</Code>, "눌러서 목록을 여는 단추입니다. 고른 값을 보여 줍니다."],
            [<Code>Select.Popper</Code>, "목록이 뜨는 상자입니다. 검색창처럼 목록 밖의 것을 함께 넣을 때 씁니다."],
            [<Code>Select.Menu</Code>, "상자와 목록을 한 번에 그리는 줄임 부품입니다."],
            [<Code>Select.InputSearch</Code>, "목록을 걸러 내는 검색창입니다."],
            [<Code>Select.List</Code>, "항목이 놓이는 자리입니다. 높이를 넘으면 스크롤이 생깁니다."],
            [<Code>Select.Group</Code>, "제목이 달린 항목 묶음입니다."],
            [<Code>Select.Option</Code>, "고를 수 있는 항목 하나입니다."],
            [<Code>Select.Option.Checkbox</Code>, "여럿 고르는 목록에서 항목 앞에 붙는 체크 표시입니다."],
            [<Code>Select.Option.Hint</Code>, "항목 아래에 붙는 보조 설명입니다."],
          ]}
        />
        <Demo caption="묶음 제목과 보조 설명">
          <GroupSelect />
        </Demo>
      </Section>

      <Section title="여는 단추의 종류">
        <Demo caption="단추 모양(기본) / 링크 모양 / 본문 글자색 링크 모양">
          <Select placeholder="문서 종류 선택" options={categories} />
          <Select tag={LinkTrigger} placeholder="문서 종류 선택" options={categories} />
          <Select tag={LinkTrigger} color="text-primary" placeholder="문서 종류 선택" options={categories} />
        </Demo>
        <Table
          head={["종류", "언제 쓰는가"]}
          rows={[
            ["단추 모양", "폼과 필터의 기본입니다. 대부분 이것을 씁니다."],
            ["링크 모양", "문장이나 제목 옆에서 보기 기준을 바꿀 때 씁니다. 링크처럼 보이지만 누르면 목록이 열립니다."],
            ["본문 글자색 링크 모양", "파란색이 너무 많은 자리에서 눈에 덜 띄게 할 때 씁니다."],
          ]}
        />
      </Section>

      <Section title="크기">
        <Demo>
          <Select placeholder="M · 32px" options={categories} />
          <Select size="l" placeholder="L · 44px" options={categories} />
        </Demo>
        <Demo caption="링크 모양은 글자 크기로 구분합니다 — 14px / 16px">
          <Select tag={LinkTrigger} size={200} placeholder="문서 종류 선택" options={categories} />
          <Select tag={LinkTrigger} size={300} placeholder="문서 종류 선택" options={categories} />
        </Demo>
        <Rules
          items={[
            <>단추 모양의 높이는 M <Code>--ec-control-height-m</Code>, L <Code>--ec-control-height-l</Code>입니다. 옆에 놓인 입력창과 같은 크기를 씁니다.</>,
            "폭이 좁아 값이 다 들어가지 않으면 끝을 말줄임표로 자릅니다. 마우스를 올리면 전체 값을 보여 줍니다.",
          ]}
        />
        <Demo caption="폭을 제한하면 긴 값은 잘립니다">
          <Box w={140}>
            <Select w="100%" defaultValue="long" options={[{ value: "long", children: "해외 거래처 장기 공급 계약서" }, ...categories]} />
          </Box>
        </Demo>
      </Section>

      <Section title="상태">
        <Demo caption="값 없음 / 값 있음 / 불러오는 중 / 올바름 / 오류 / 비활성">
          <Select placeholder="문서 종류 선택" options={categories} />
          <Select defaultValue="contract" options={categories} />
          <Select loading placeholder="문서 종류 선택" options={categories} />
          <Select state="valid" defaultValue="contract" options={categories} />
          <Select state="invalid" placeholder="문서 종류 선택" options={categories} />
          <Select disabled placeholder="문서 종류 선택" options={categories} />
        </Demo>
        <Rules
          items={[
            <>값을 고르지 않았을 때는 안내 글자(<Code>placeholder</Code>)가 <Code>--ec-text-hint</Code> 색으로 나옵니다.</>,
            <>목록이나 값을 불러오는 동안에는 <Code>loading</Code>을 줍니다. 오른쪽 화살표 자리에 가장 작은 Spin이 돌고, 그동안 단추는 눌리지 않습니다.</>,
            "어떤 값이 들어올지 아직 모르면 단추 가운데에 Spin만 둡니다.",
            <>폼 검사에서 걸리면 <Code>state="invalid"</Code>로 바꾸고 이유를 가까이에 적습니다.</>,
          ]}
        />
      </Section>

      <Section title="단추에 덧붙이는 요소">
        <Demo>
          <Select defaultValue="영업 1팀 담당자">
            <Select.Trigger>
              <Select.Trigger.Addon><UserM /></Select.Trigger.Addon>
              <Select.Trigger.Text>영업 1팀 담당자</Select.Trigger.Text>
            </Select.Trigger>
            <Select.Menu>
              {managers.map((name) => (
                <Select.Option key={name} value={name}>{name}</Select.Option>
              ))}
            </Select.Menu>
          </Select>
          <Select defaultValue="contract">
            <Select.Trigger>
              <Select.Trigger.Text>전자 계약서</Select.Trigger.Text>
              <Select.Trigger.Addon><Badge type="beta" /></Select.Trigger.Addon>
            </Select.Trigger>
            <Select.Menu>
              <Select.Option value="contract">전자 계약서</Select.Option>
              <Select.Option value="paper">종이 계약서</Select.Option>
            </Select.Menu>
          </Select>
        </Demo>
        <Rules
          items={[
            "아이콘, 국기, 사람 사진 같은 덧붙임은 글자 앞에 둡니다.",
            "배지는 글자 뒤에 둡니다. 글자와 배지 사이는 크기와 상관없이 8px입니다.",
            "새 소식을 알리는 점(Dot)은 단추의 오른쪽 위 모서리에 둡니다.",
          ]}
        />
      </Section>

      <Section title="목록">
        <P>목록의 기본 모양과 항목 규칙은 DropdownMenu와 같습니다. 여기서는 Select에만 해당하는 것을 적습니다.</P>
        <Sub title="높이">
          <Rules
            items={[
              "항목이 일곱 개를 넘으면 목록 높이를 제한하고 스크롤을 둡니다.",
              "항목이 열 개를 넘으면 검색창을 함께 둡니다.",
            ]}
          />
        </Sub>
        <Sub title="검색창이 있는 목록">
          <Demo>
            <SearchSelect />
          </Demo>
          <Rules
            items={[
              "목록을 열면 검색창에 바로 초점이 갑니다.",
              "글자를 넣으면 맞는 항목만 남깁니다. 남은 항목 안의 글자를 따로 강조하지 않습니다.",
              "검색창 안내 글자는 \"담당자 이름 입력\"처럼 무엇을 넣는지 적거나 \"검색\"이라고 적습니다.",
            ]}
          />
        </Sub>
        <Sub title="목록의 상태">
          <Table
            head={["경우", "보여 줄 글자"]}
            rows={[
              ["불러오거나 걸러 내는 데 시간이 걸릴 때", "\"불러오는 중…\""],
              ["넣은 글자에 맞는 항목이 없을 때", "\"찾는 항목이 없습니다\""],
              ["서버에서 오류가 났을 때", "\"문제가 생겼습니다. 잠시 후 다시 시도해 주세요.\""],
            ]}
          />
          <P>이 글자는 <Code>Select.StatusItem</Code>으로 목록 안에 넣습니다.</P>
        </Sub>
        <Sub title="고정 항목">
          <P>목록의 맨 위나 맨 아래에 항목을 고정할 수 있습니다. 고정 항목은 구분선으로 나누고, 목록을 밀어도 제자리에 있습니다.</P>
          <Table
            head={["고정하는 것", "규칙"]}
            rows={[
              ["제목", "목록 전체를 가리키는 제목입니다. 아래에 구분선을 둡니다."],
              ["검색창", "항목이 열 개를 넘을 때 둡니다. 목록을 열면 초점을 받습니다."],
              ["알림", "알림 제목은 본문과 같은 크기에 굵기 700으로 적습니다."],
              ["버튼", "\"거래처 추가\"처럼 목록에 없는 값을 새로 만드는 동작을 둡니다."],
            ]}
          />
        </Sub>
      </Section>

      <Section title="여럿 고르기">
        <Demo caption="multiselect — 항목 앞에 체크 표시가 붙습니다">
          <MultiSelect />
        </Demo>
        <Rules
          items={[
            "항목이 열 개를 넘으면 검색창을 둡니다.",
            "나라나 시간대처럼 긴 목록은 다시 열 때 고른 항목을 맨 위로 올립니다. 열려 있는 동안 선택을 풀어도 자리는 그대로 두고, 닫을 때 정리합니다.",
          ]}
        />
        <Sub title="모두 선택">
          <Rules
            items={[
              "항목이 세 개를 넘으면 목록 맨 앞에 \"모두 선택\"을 둡니다.",
              "몇 개만 고르거나 자주 지우는 목록이면 하나라도 고른 순간 \"모두 해제\"로 바꿉니다.",
              "거의 다 고르는 목록이면 전부 고른 뒤에야 \"모두 해제\"로 바꿉니다.",
              "검색한 상태에서 누르면 찾은 항목만 선택하거나 해제합니다. 검색에 걸리지 않은 항목은 그대로 둡니다.",
              "검색 결과가 없으면 \"모두 선택\"과 \"모두 해제\"를 보여 주지 않습니다.",
            ]}
          />
        </Sub>
        <Sub title="단추에 보여 줄 글자">
          <Table
            head={["경우", "글자"]}
            rows={[
              ["아무것도 고르지 않음", "\"담당자 선택\"처럼 \"고를 것 + 선택\""],
              ["전부 고름", "\"전체\""],
              ["한두 개 고름", "값을 쉼표로 이어 적습니다. 넘치면 말줄임표로 자릅니다."],
              ["셋 이상, 이름표 있음", "\"담당자 3개 선택\"처럼 이름표를 앞에 붙입니다."],
              ["셋 이상, 이름표 없음", "\"3개 선택\""],
            ]}
          />
        </Sub>
        <Sub title="고를 수 있는 개수 제한">
          <Rules
            items={[
              "정해진 개수를 채우면 나머지 항목을 비활성으로 바꿉니다.",
              "제한이 있다는 것을 이름표 옆 설명 아이콘 등으로 미리 알립니다.",
              "비활성 항목에는 왜 고를 수 없는지 설명 풍선을 답니다.",
              "개수 제한이 있는 목록에는 \"모두 선택\"과 \"모두 해제\"를 두지 않습니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Flex direction="column" gap={1}>
                <Text size={200}>문서 종류</Text>
                <Select placeholder="문서 종류 선택" options={categories} />
              </Flex>
            ),
            text: "이름표를 붙이고, 안내 글자에는 무엇을 고르는지 적습니다.",
          }}
          bad={{
            demo: <Select placeholder="선택" options={categories} />,
            text: "이름표 없이 \"선택\"만 적어 두지 않습니다. 무엇을 고르는지 알 수 없습니다.",
          }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["상황", "쓸 것"]}
          rows={[
            ["선택지가 둘이고 켜고 끄는 뜻일 때", "Switch 또는 Checkbox"],
            ["선택지가 두세 개이고 모두 보여 줄 자리가 있을 때", "Radio 또는 Pills"],
            ["선택지가 넷 이상이거나 자리가 좁을 때", "Select"],
            ["값을 고르는 것이 아니라 동작을 실행할 때", "DropdownMenu"],
            ["표나 목록을 걸러 낼 때", <>Select에 <Code>tag={"{FilterTrigger}"}</Code>를 준 필터 단추</>],
          ]}
        />
      </Section>
    </Page>
  );
}

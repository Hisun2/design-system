import React from "react";
import { FilterTrigger, Select, Tooltip, Flex, ButtonLink } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "FilterTrigger" };

const STATES = ["작성 중", "승인 대기", "승인 완료", "반려"];
const MANAGERS = ["영업 1팀", "영업 2팀", "구매팀", "재무팀"];

function StatusFilter({ size }) {
  const [value, setValue] = React.useState(null);
  return (
    <Select value={value} onChange={setValue} size={size}>
      <Select.Trigger tag={FilterTrigger} placeholder="문서 상태" />
      <Select.Menu>
        {STATES.map((name) => (
          <Select.Option value={name} key={name}>{name}</Select.Option>
        ))}
      </Select.Menu>
    </Select>
  );
}

function TeamFilter() {
  const [value, setValue] = React.useState([]);
  return (
    <Select multiselect value={value} onChange={setValue}>
      <Select.Trigger tag={FilterTrigger} placeholder="담당 부서">
        {value.length > 2 ? `담당 부서: ${value.length}개 선택` : `담당 부서: ${value.join(", ")}`}
      </Select.Trigger>
      <Select.Menu>
        {MANAGERS.map((name) => (
          <Select.Option value={name} key={name}>
            <Select.Option.Checkbox />
            {name}
          </Select.Option>
        ))}
      </Select.Menu>
    </Select>
  );
}

function ClearableFilter() {
  const [filled, setFilled] = React.useState(true);
  return (
    <FilterTrigger empty={!filled} placeholder="거래처 등급" onClear={() => setFilled(false)} onClick={() => setFilled(true)}>
      거래처 등급: 우수
    </FilterTrigger>
  );
}

function StateMenuFilter({ placeholder, message, reload }) {
  return (
    <Select>
      <Select.Trigger tag={FilterTrigger} placeholder={placeholder} />
      <Select.Popper>
        <Flex p={3} gap={2} alignItems="center">
          {message}
          {reload}
        </Flex>
      </Select.Popper>
    </Select>
  );
}

export default function FilterTriggerPage() {
  return (
    <Page meta={meta} lead="필터 하나의 현재 값을 보여 주고, 눌러서 값을 바꾸거나 지우는 요소입니다. 걸러 낼 데이터(표, 목록, 차트)의 바로 위에 둡니다.">
      <Section title="구성">
        <Demo caption="값이 없을 때 / 값이 있을 때 / 개수가 붙을 때">
          <FilterTrigger empty placeholder="문서 상태" />
          <FilterTrigger>문서 상태: 승인 대기</FilterTrigger>
          <FilterTrigger>
            상세 조건
            <FilterTrigger.Counter>3</FilterTrigger.Counter>
          </FilterTrigger>
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>FilterTrigger.TriggerButton</Code>, "값 또는 안내 글자를 보여 주고, 누르면 선택 목록을 엽니다."],
            [<Code>FilterTrigger.ClearButton</Code>, "값이 있을 때만 나오는 지우기 버튼입니다."],
            [<Code>FilterTrigger.Text</Code>, "값 글자입니다. 자리가 모자라면 말줄임으로 자릅니다."],
            [<Code>FilterTrigger.Addon</Code>, "글자 앞뒤에 붙는 아이콘 자리입니다."],
            [<Code>FilterTrigger.Counter</Code>, "안에 걸린 조건의 개수입니다."],
          ]}
        />
        <P>
          값이 없으면 펼침 화살표가, 값이 있으면 지우기 버튼이 나옵니다. 두 부분을 따로 넣지 않아도 <Code>empty</Code> 값에 따라 알아서 바뀝니다.
        </P>
      </Section>

      <Section title="크기">
        <Demo caption="M · 32px">
          <FilterTrigger empty placeholder="문서 상태" />
          <FilterTrigger>문서 상태: 승인 대기</FilterTrigger>
          <FilterTrigger>상세 조건<FilterTrigger.Counter>3</FilterTrigger.Counter></FilterTrigger>
        </Demo>
        <Demo caption="L · 44px">
          <FilterTrigger size="l" empty placeholder="문서 상태" />
          <FilterTrigger size="l">문서 상태: 승인 대기</FilterTrigger>
          <FilterTrigger size="l">상세 조건<FilterTrigger.Counter>3</FilterTrigger.Counter></FilterTrigger>
        </Demo>
        <Rules
          items={[
            "M이 기본입니다. 같은 줄에 놓인 입력창·버튼과 같은 크기를 씁니다.",
            "화살표와 지우기 아이콘은 크기에 관계없이 M 아이콘을 씁니다.",
          ]}
        />
      </Section>

      <Section title="여러 필터를 나란히 놓기">
        <Demo>
          <Flex gap={2}>
            <StatusFilter />
            <TeamFilter />
          </Flex>
        </Demo>
        <Demo caption="L">
          <Flex gap={4}>
            <StatusFilter size="l" />
            <StatusFilter size="l" />
          </Flex>
        </Demo>
        <Rules
          items={[
            "필터 사이 간격은 다른 입력창·버튼 사이 간격과 같게 합니다. M은 8px, L은 16px입니다.",
            "필터 줄은 걸러 낼 데이터 바로 위에 둡니다.",
          ]}
        />
      </Section>

      <Section title="개수 표시">
        <Demo>
          <FilterTrigger>상세 조건<FilterTrigger.Counter>3</FilterTrigger.Counter></FilterTrigger>
        </Demo>
        <Rules
          items={[
            "개수는 상세 조건처럼 필터 하나 안에 조건이 여러 개 들어가는 경우에만 붙입니다.",
            "숫자는 그 안에 지금 걸려 있는 조건의 수입니다.",
            "값 하나를 고르는 보통 필터에는 개수를 붙이지 않습니다.",
          ]}
        />
      </Section>

      <Section title="상태와 동작">
        <Demo caption="눌러서 값을 고르고, × 로 지웁니다">
          <StatusFilter />
          <TeamFilter />
          <ClearableFilter />
        </Demo>
        <Demo caption="설명 풍선 / 열린 상태 / 비활성">
          <Tooltip title="문서의 결재 단계로 걸러 냅니다">
            <FilterTrigger empty placeholder="문서 상태" />
          </Tooltip>
          <FilterTrigger empty active placeholder="문서 상태" />
          <FilterTrigger disabled>문서 상태: 승인 대기</FilterTrigger>
        </Demo>
        <Demo caption="목록을 불러오는 중 / 불러오지 못함">
          <StateMenuFilter placeholder="거래처" message="불러오는 중입니다" />
          <StateMenuFilter placeholder="담당자" message="목록을 불러오지 못했습니다." reload={<ButtonLink>다시 불러오기</ButtonLink>} />
        </Demo>
        <Table
          head={["상태", "규칙"]}
          rows={[
            ["값 없음", "필터가 무엇에 관한 것인지 알리는 안내 글자를 반드시 넣습니다."],
            ["값 없음 · 마우스 올림", "필터가 어떻게 걸러 내는지 설명 풍선으로 알려 줄 수 있습니다."],
            ["불러오는 중", "선택 목록을 준비하는 데 시간이 걸리면 목록 자리에 \"불러오는 중입니다\"를 보여 줍니다."],
            ["불러오지 못함", "목록 자리에 \"목록을 불러오지 못했습니다\"를 보여 줍니다. 다시 요청하는 \"다시 불러오기\"를 함께 둘 수 있습니다."],
            ["열림", "목록이 열려 있는 동안 눌린 모양(active)을 유지합니다. 항목을 고르거나 바깥을 누르면 닫힙니다."],
            ["값 있음", "값의 길이에 맞춰 폭이 달라집니다. 누르면 목록이 다시 열려 값을 바꿀 수 있습니다."],
            ["값 여러 개", "셋 이상 고르면 값을 다 늘어놓지 않고 \"3개 선택\"으로 줄여 적습니다."],
            ["상세 조건", "걸린 조건의 수를 개수로 보여 줍니다."],
            ["지우기", "× 를 누르면 값이 지워지고 안내 글자가 있는 처음 상태로 돌아갑니다."],
          ]}
        />
        <Rules
          items={[
            "값을 하나만 고르는 필터는 마우스를 올렸을 때 고른 값의 뜻을 설명 풍선으로 알려 줄 수 있습니다.",
            "값을 여러 개 고르는 필터는 풍선에 값을 모두 적지 않습니다. 필터의 쓰임을 적습니다.",
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "이름은 필터 안에 적습니다. 값이 없을 때는 안내 글자로, 값이 있을 때는 \"문서 상태: 승인 대기\"처럼 \"이름: 값\"으로 보여 줍니다.",
            "값만 보고도 뜻이 분명하면 값만 적어도 됩니다(\"이번 달 등록\").",
            "이름이 두 낱말을 넘으면 필터 밖 이름표로 뺍니다. 고른 값이 먼저 눈에 들어와야 합니다.",
            "숫자와 기간은 글쓰기 규칙을 따릅니다. 날짜는 2026-11-25, 숫자는 세 자리마다 쉼표를 넣습니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <FilterTrigger>문서 상태: 승인 대기</FilterTrigger>,
            text: "무엇을 어떤 값으로 걸렀는지 한눈에 읽히게 적습니다.",
          }}
          bad={{
            demo: <FilterTrigger>작성 중, 승인 대기, 승인 완료, 반려</FilterTrigger>,
            text: "고른 값을 모두 늘어놓지 않습니다. \"4개 선택\"으로 줄입니다.",
          }}
        />
        <Rules
          items={[
            "선택 목록의 폭은 필터보다 좁을 수 없습니다. 더 넓은 것은 괜찮습니다.",
            "값이 없는 필터에 안내 글자를 비워 두지 않습니다.",
          ]}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Rules
          items={[
            "폼 안에서 값을 고르는 자리에는 Select의 기본 모양(ButtonTrigger)을 씁니다. FilterTrigger는 데이터를 걸러 내는 자리에만 씁니다.",
            "두세 가지 값을 바로 바꿔 가며 보는 필터에는 Pills를 씁니다.",
            "필터를 필요할 때만 꺼내 쓰게 하려면 AddFilter를 씁니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

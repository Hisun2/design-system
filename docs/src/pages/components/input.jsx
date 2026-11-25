import React from "react";
import { Input, Text, Flex, ButtonLink, Counter, Badge, Spin } from "@ec21rnc/ui";
import SearchM from "@semcore/icon/Search/m";
import CloseM from "@semcore/icon/Close/m";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Input" };

function SearchInput() {
  const [value, setValue] = React.useState("한빛");
  return (
    <Input w={240}>
      <Input.Addon><SearchM /></Input.Addon>
      <Input.Value value={value} onChange={setValue} placeholder="거래처 이름으로 찾기" aria-label="거래처 찾기" />
      {value ? (
        <Input.Addon>
          <ButtonLink use="secondary" addonLeft={CloseM} aria-label="지우기" onClick={() => setValue("")} />
        </Input.Addon>
      ) : null}
    </Input>
  );
}

function CounterInput({ size = "m" }) {
  const [value, setValue] = React.useState("11월 정산");
  const max = 20;
  return (
    <Input w={240} size={size} state={value.length > max ? "invalid" : "normal"}>
      <Input.Value value={value} onChange={setValue} aria-label="문서 제목" />
      <Input.Addon>
        <Text color="var(--ec-text-secondary)" size={size === "l" ? 300 : 200}>{value.length}/{max}</Text>
      </Input.Addon>
    </Input>
  );
}

export default function InputPage() {
  return (
    <Page meta={meta} lead="한 줄짜리 글자를 받는 입력창입니다. 폼과 검색 등 값을 적는 거의 모든 자리의 바탕이 됩니다.">
      <Section title="구성">
        <Demo>
          <Input w={240}>
            <Input.Addon><SearchM /></Input.Addon>
            <Input.Value placeholder="거래처 이름" aria-label="거래처 이름" />
          </Input>
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>Input</Code>, <>테두리가 있는 바깥 상자입니다. <Code>size</Code>, <Code>state</Code>, <Code>disabled</Code>를 받습니다.</>],
            [<Code>Input.Value</Code>, <>글자를 적는 곳입니다. <Code>value</Code>, <Code>onChange</Code>, <Code>placeholder</Code>, <Code>readOnly</Code>를 받습니다.</>],
            [<Code>Input.Addon</Code>, "글자 앞뒤의 덧붙이는 자리입니다. Value보다 먼저 쓰면 앞, 뒤에 쓰면 뒤에 놓입니다."],
          ]}
        />
      </Section>

      <Section title="크기">
        <Demo>
          <Input w={200}><Input.Value placeholder="M · 32px" aria-label="M 크기" /></Input>
          <Input w={200} size="l"><Input.Value placeholder="L · 44px" aria-label="L 크기" /></Input>
        </Demo>
        <Rules
          items={[
            "M이 기본입니다. 표 위의 필터, 폼 등 대부분의 자리에 씁니다.",
            "L은 로그인처럼 입력이 몇 개뿐이고 크게 보여야 하는 화면에 씁니다.",
            "한 폼 안에서는 한 가지 크기만 씁니다.",
          ]}
        />
      </Section>

      <Section title="이름표">
        <Demo>
          <Flex direction="column">
            <Text tag="label" htmlFor="input-doc-m" size={200} mb={1}>문서 제목</Text>
            <Input w={240}><Input.Value id="input-doc-m" /></Input>
          </Flex>
          <Flex direction="column">
            <Text tag="label" htmlFor="input-memo-l" size={300} mb={2}>
              메모 <Text color="var(--ec-text-secondary)">(선택)</Text>
            </Text>
            <Input w={240} size="l"><Input.Value id="input-memo-l" /></Input>
          </Flex>
        </Demo>
        <Table
          head={["입력창 크기", "이름표 글자", "입력창과의 간격"]}
          rows={[
            ["M · 32px", <>14px (<Code>--ec-fs-200</Code>, <Code>--ec-lh-200</Code>)</>, "4px"],
            ["L · 44px", <>16px (<Code>--ec-fs-300</Code>, <Code>--ec-lh-300</Code>)</>, "8px"],
          ]}
        />
        <Rules
          items={[
            "될 수 있으면 눈에 보이는 이름표를 붙입니다. 안내 글자(placeholder)는 이름표를 대신하지 못합니다.",
            "꼭 적지 않아도 되는 입력창에는 이름표에 \"(선택)\"을 붙입니다.",
            "이름표 끝에 쌍점(:)을 붙이지 않습니다.",
            "이름표를 둘 수 없으면 aria-label로 이름을 줍니다.",
          ]}
        />
      </Section>

      <Section title="덧붙이는 요소">
        <Demo caption="앞: 누를 수 없는 아이콘 / 뒤: 개수, 배지, 돌아가는 표시, 아이콘 버튼">
          <Input w={200}>
            <Input.Addon><SearchM /></Input.Addon>
            <Input.Value placeholder="찾기" aria-label="찾기" />
          </Input>
          <Input w={200}>
            <Input.Value defaultValue="승인 대기" aria-label="상태" />
            <Input.Addon><Counter>12</Counter></Input.Addon>
          </Input>
          <Input w={200}>
            <Input.Value defaultValue="자동 분류" aria-label="기능" />
            <Input.Addon><Badge type="beta" /></Input.Addon>
          </Input>
          <Input w={200}>
            <Input.Value defaultValue="확인하는 중" aria-label="확인" />
            <Input.Addon><Spin size="xs" /></Input.Addon>
          </Input>
        </Demo>
        <Rules
          items={[
            "글자 앞에는 누를 수 없는 아이콘을 둡니다. 색은 글자색을 따르거나 쓰임에 맞는 색을 씁니다.",
            "글자 뒤에는 개수, 배지, 돌아가는 표시, 아이콘 버튼, 링크를 둘 수 있습니다.",
            "아이콘 버튼은 글자 없는 ButtonLink로 만듭니다. 그래야 키보드와 화면 낭독기가 버튼으로 알아봅니다.",
            "아이콘은 입력창 크기와 관계없이 M 크기를 씁니다.",
            "덧붙이는 요소 둘이 붙어 있으면 둘 사이 여백은 절반씩 나눠 갖습니다. 각자 누를 영역이 넉넉하게 남습니다.",
          ]}
        />
      </Section>

      <Section title="상태">
        <Demo caption="기본 / 비활성 / 읽기 전용">
          <Input w={180}><Input.Value defaultValue="기본" aria-label="기본" /></Input>
          <Input w={180} disabled><Input.Value defaultValue="비활성" aria-label="비활성" /></Input>
          <Input w={180}><Input.Value defaultValue="읽기 전용" readOnly aria-label="읽기 전용" /></Input>
        </Demo>
        <Demo caption="올바름 / 잘못됨">
          <Input w={180} state="valid"><Input.Value defaultValue="123-45-67890" aria-label="올바른 값" /></Input>
          <Input w={180} state="invalid"><Input.Value defaultValue="123-45" aria-label="잘못된 값" /></Input>
        </Demo>
        <Rules
          items={[
            "초점이 들어가면 파란 테두리가 나옵니다. 이 표시를 없애지 않습니다.",
            "읽기 전용은 값을 고칠 수 없지만 복사는 할 수 있어야 할 때 씁니다. 복사해 가는 주소(링크)가 그런 예입니다.",
            "비활성은 다른 입력의 값에 따라 쓸 수 있는지가 달라질 때 씁니다. 왜 막혔는지 가까이에 적습니다.",
            "잘못된 값은 빨간 테두리만으로 알리지 않습니다. 무엇이 잘못됐는지 글로 함께 적습니다.",
            "올바름·잘못됨 표시는 비활성·읽기 전용 상태와도 겹쳐 쓸 수 있습니다.",
          ]}
        />
      </Section>

      <Section title="쓰임에 따른 종류">
        <Sub title="찾기 입력창">
          <Demo>
            <SearchInput />
          </Demo>
          <P>글자 앞에 누를 수 없는 돋보기 아이콘을, 글자 뒤에 값을 지우는 버튼을 둡니다. 지우기 버튼은 값이 있을 때만 보여 줍니다.</P>
        </Sub>
        <Sub title="글자 수를 세는 입력창">
          <Demo>
            <CounterInput />
            <CounterInput size="l" />
            <Flex direction="column">
              <Flex justifyContent="space-between" w={240} mb={1}>
                <Text tag="label" htmlFor="input-count-label" size={200}>문서 제목</Text>
                <Text size={200} color="var(--ec-text-secondary)">6/20</Text>
              </Flex>
              <Input w={240}><Input.Value id="input-count-label" defaultValue="11월 정산" /></Input>
            </Flex>
          </Demo>
          <Rules
            items={[
              "남은 글자 수나 한도는 입력창 안 뒤쪽 또는 이름표 옆에 둡니다.",
              "이 숫자는 누를 수 없습니다.",
              "Tag를 숫자 표시로 쓰지 않습니다. Tag는 쓰임이 다릅니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <Input w={160}><Input.Value placeholder="010-0000-0000" aria-label="전화번호" /></Input>,
            text: "폭은 들어갈 값의 길이에 맞춥니다. 전화번호 입력창은 전화번호 길이만큼만 넓힙니다.",
          }}
          bad={{
            demo: <Input w={320}><Input.Value placeholder="010-0000-0000" aria-label="전화번호" /></Input>,
            text: "짧은 값을 받는 입력창을 필요 이상으로 넓히지 않습니다.",
          }}
        />
        <Rules
          items={[
            "한 줄에 들어가는 값에만 씁니다. 긴 글은 Textarea로 받습니다.",
            "무엇을 적는 곳인지 이름표로 분명히 알립니다.",
          ]}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Rules
          items={[
            "여러 줄 글은 Textarea, 숫자는 InputNumber, 정해진 꼴의 값은 InputMask, 여러 값은 InputTags를 씁니다.",
            "정해진 보기 가운데 고르게 하려면 Select를 씁니다.",
            "보던 글자를 그 자리에서 고치게 하려면 InlineInput을 씁니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

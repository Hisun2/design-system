import React from "react";
import { Button, Input, Select, Flex, NeighborLocation, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "붙여 쓰는 컨트롤", order: 3 };

const options = [
  { value: "name", children: "거래처 이름" },
  { value: "owner", children: "담당자" },
];

export default function NeighborLocationPage() {
  return (
    <Page meta={meta} lead="버튼, 입력창, 선택 상자를 틈 없이 붙여 한 덩어리로 보이게 하는 속성입니다. 컴포넌트마다 이웃이 어느 쪽에 있는지를 neighborLocation으로 알려 주면, 맞닿는 쪽의 둥근 모서리와 겹치는 테두리가 정리됩니다.">
      <Section title="쓰는 법">
        <Table
          head={["값", "뜻", "놓이는 자리"]}
          rows={[
            [<Code>right</Code>, "오른쪽에 이웃이 있음", "묶음의 맨 앞"],
            [<Code>both</Code>, "양쪽에 이웃이 있음", "묶음의 가운데"],
            [<Code>left</Code>, "왼쪽에 이웃이 있음", "묶음의 맨 뒤"],
          ]}
        />
        <Rules
          items={[
            <>붙일 수 있는 것은 <Code>Button</Code>, <Code>Input</Code>, <Code>Select</Code>입니다.</>,
            <>나란히 놓는 것은 <Code>Flex</Code>로 합니다. 간격(<Code>gap</Code>)은 주지 않습니다.</>,
            <>묶음을 감싼 <Code>Flex</Code>에 <Code>role="group"</Code>과 <Code>aria-label</Code>을 주어, 화면을 읽어 주는 도구가 한 묶음으로 알게 합니다.</>,
            "한 묶음 안의 컨트롤은 모두 같은 크기(M 또는 L)여야 합니다.",
          ]}
        />
      </Section>

      <Section title="버튼끼리">
        <Demo caption="보조 버튼" column>
          <Flex role="group" aria-label="보기 방식">
            <Button neighborLocation="right">일</Button>
            <Button neighborLocation="both">주</Button>
            <Button neighborLocation="left">월</Button>
          </Flex>
        </Demo>
        <Demo caption="주요 버튼" column>
          <Flex role="group" aria-label="저장 방식">
            <Button neighborLocation="right" use="primary" theme="info">저장</Button>
            <Button neighborLocation="left" use="primary" theme="info">저장하고 닫기</Button>
          </Flex>
        </Demo>
        <Demo caption="주요 버튼 · 긍정" column>
          <Flex role="group" aria-label="승인 방식">
            <Button neighborLocation="right" use="primary" theme="success">승인</Button>
            <Button neighborLocation="left" use="primary" theme="success">승인하고 다음</Button>
          </Flex>
        </Demo>
        <Rules
          items={[
            "붙인 버튼 사이에는 1px의 구분선이 생깁니다.",
            <>보조 버튼 사이의 선은 버튼 테두리와 같은 색(<Code>--ec-border-control</Code>)입니다.</>,
            "주요 버튼 사이의 선은 흰색입니다. 색이 찬 버튼끼리 경계가 보이게 합니다.",
            <>약한 버튼(<Code>use="tertiary"</Code>)은 이렇게 붙이지 않습니다. 테두리가 없어 묶음으로 보이지 않습니다. 간격 8px로 띄워 놓습니다.</>,
            "한 묶음에는 같은 종류, 같은 색의 버튼만 넣습니다.",
            "주요 버튼 묶음도 화면의 주요 동작 하나로 셉니다. 묶음 밖에 주요 버튼을 또 두지 않습니다.",
          ]}
        />
      </Section>

      <Section title="입력창과 버튼">
        <Demo caption="보조 버튼 / 주요 버튼 / 주요 버튼 · 긍정" column>
          <Flex role="group" aria-label="거래처 찾기">
            <Input neighborLocation="right" w={200}>
              <Input.Value placeholder="거래처 이름" aria-label="거래처 이름" />
            </Input>
            <Button neighborLocation="left">찾기</Button>
          </Flex>
          <Flex role="group" aria-label="거래처 추가">
            <Input neighborLocation="right" w={200}>
              <Input.Value placeholder="거래처 이름" aria-label="추가할 거래처 이름" />
            </Input>
            <Button neighborLocation="left" use="primary" theme="info">추가</Button>
          </Flex>
          <Flex role="group" aria-label="담당자 초대">
            <Input neighborLocation="right" w={200}>
              <Input.Value placeholder="전자우편 주소" aria-label="초대할 담당자의 전자우편 주소" />
            </Input>
            <Button neighborLocation="left" use="primary" theme="success">초대</Button>
          </Flex>
        </Demo>
        <P>입력한 값으로 곧바로 실행하는 동작 하나가 있을 때 붙입니다. 입력창이 앞, 버튼이 뒤입니다.</P>
      </Section>

      <Section title="입력창과 선택 상자">
        <Demo column>
          <Flex role="group" aria-label="찾을 대상과 낱말">
            <Input neighborLocation="right" w={200}>
              <Input.Value placeholder="찾을 낱말" aria-label="찾을 낱말" />
            </Input>
            <Select neighborLocation="left" aria-label="찾을 대상" options={options} defaultValue="name" />
          </Flex>
        </Demo>
        <P>입력값의 단위나 범위를 고르게 할 때 붙입니다(찾을 대상, 금액의 통화, 기간의 단위).</P>
      </Section>

      <Section title="입력창, 선택 상자, 버튼">
        <Demo column>
          <Flex role="group" aria-label="거래처 찾기">
            <Input neighborLocation="right" w={200}>
              <Input.Value placeholder="찾을 낱말" aria-label="찾을 낱말" />
            </Input>
            <Select neighborLocation="both" aria-label="찾을 대상" options={options} defaultValue="name" />
            <Button neighborLocation="left" use="primary" theme="info">찾기</Button>
          </Flex>
        </Demo>
        <P>셋을 함께 붙일 수 있습니다. 가운데 것에는 <Code>both</Code>를 줍니다. 넷 이상은 붙이지 않습니다.</P>
      </Section>

      <Section title="감싸는 컴포넌트 (쓰지 않음)">
        <Demo caption="NeighborLocation으로 감싸면 위치를 자동으로 정합니다 — 새로 쓰지 않습니다" column>
          <NeighborLocation tag={Flex} role="group" aria-label="감싼 버튼 묶음">
            <Button>일</Button>
            <Button>주</Button>
            <Button>월</Button>
          </NeighborLocation>
        </Demo>
        <Rules
          items={[
            <><Code>NeighborLocation</Code>으로 컨트롤을 감싸면 각자의 위치를 자동으로 알아냅니다. 기본으로는 HTML 요소를 만들지 않으며, <Code>tag</Code>에 <Code>Flex</Code> 같은 컴포넌트를 주면 그것으로 감쌉니다.</>,
            "이 방식은 없어질 예정입니다. 이웃을 알아내는 것이 믿을 만하지 않고, 화면을 그리는 순서에 따라 결과가 달라질 수 있습니다.",
            <>새로 만드는 화면에서는 쓰지 않습니다. 컨트롤마다 <Code>neighborLocation</Code> 속성을 직접 줍니다.</>,
            "이미 쓰고 있는 곳은 손댈 때 속성 방식으로 바꿉니다.",
          ]}
        />
        <Sub title="직접 만든 컴포넌트에 적용하기">
          <Demo caption="NeighborLocation.Detect가 위치 값을 넘겨 줍니다" column>
            <NeighborLocation>
              <NeighborLocation.Detect>{(location) => <Text size={200}>{location}</Text>}</NeighborLocation.Detect>
              <NeighborLocation.Detect>{(location) => <Text size={200} mx={2}>{location}</Text>}</NeighborLocation.Detect>
              <NeighborLocation.Detect>{(location) => <Text size={200}>{location}</Text>}</NeighborLocation.Detect>
            </NeighborLocation>
          </Demo>
          <Rules
            items={[
              <>감싸는 방식 안에서 직접 만든 컴포넌트가 위치를 알아야 하면 <Code>NeighborLocation.Detect</Code>로 감쌉니다.</>,
              <>자식으로 함수를 주면 위치 값(<Code>right</Code>, <Code>both</Code>, <Code>left</Code>)을 인자로 받습니다. 요소를 주면 그 요소에 <Code>neighborLocation</Code> 속성이 더해집니다.</>,
              "이것도 감싸는 방식의 일부이므로 함께 없어질 예정입니다. 새 컴포넌트는 neighborLocation 속성을 직접 받게 만듭니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="쓰는 법 정리">
        <DoDont
          good={{
            demo: (
              <Flex role="group" aria-label="거래처 찾기">
                <Input neighborLocation="right" w={160}>
                  <Input.Value placeholder="거래처 이름" aria-label="거래처 이름" />
                </Input>
                <Button neighborLocation="left">찾기</Button>
              </Flex>
            ),
            text: "함께 하나의 일을 하는 컨트롤만 붙입니다.",
          }}
          bad={{
            demo: (
              <Flex role="group" aria-label="잘못된 묶음">
                <Button neighborLocation="right" use="primary" theme="info">저장</Button>
                <Button neighborLocation="left">취소</Button>
              </Flex>
            ),
            text: "서로 다른 종류의 버튼이나 관계없는 동작을 붙이지 않습니다. 저장과 취소는 간격 8px로 띄워 놓습니다.",
          }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Rules
          items={[
            "여럿 중 하나를 고르는 선택이면 붙인 버튼 대신 Pills를 씁니다. 붙인 버튼은 각각이 동작을 실행합니다.",
            "입력창 안에 들어가는 아이콘이나 단위 글자는 Input의 덧붙임(Addon)으로 넣습니다. 붙여 쓰는 컨트롤은 저마다 따로 동작하는 컨트롤끼리 쓰는 것입니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

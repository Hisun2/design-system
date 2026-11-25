import React from "react";
import { Pills, Button, Counter, Badge, Flags, Flex, Text } from "@ec21rnc/ui";
import TableM from "@semcore/icon/Table/m";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Pills" };

function StatusPills({ items = ["전체", "승인 대기", "승인 완료", "반려"], ...rest }) {
  const [value, setValue] = React.useState(items[0]);
  return (
    <Pills value={value} onChange={setValue} aria-label="문서 상태" {...rest}>
      {items.map((name) => (
        <Pills.Item value={name} key={name}>{name}</Pills.Item>
      ))}
    </Pills>
  );
}

function SummaryPills() {
  const [value, setValue] = React.useState("wait");
  const items = [
    ["wait", "승인 대기", "12"],
    ["done", "승인 완료", "248"],
    ["back", "반려", "3"],
  ];
  return (
    <Pills value={value} onChange={setValue} size="l" aria-label="문서 요약">
      {items.map(([key, name, count]) => (
        <Pills.Item value={key} key={key} h="auto" py={2}>
          <Flex direction="column" alignItems="flex-start">
            <Text size={100}>{name}</Text>
            <Text size={400} bold>{count}</Text>
          </Flex>
        </Pills.Item>
      ))}
    </Pills>
  );
}

export default function PillsPage() {
  return (
    <Page meta={meta} lead="나란히 붙은 항목 가운데 하나를 고르는 조작 요소입니다. 같은 종류의 내용을 다른 모습으로 바꿔 보거나, 목록·표·차트의 자료를 걸러 낼 때 씁니다.">
      <Section title="구성">
        <Demo>
          <StatusPills />
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>Pills</Code>, <>묶음 전체입니다. <Code>value</Code>와 <Code>onChange</Code>로 고른 항목을 다룹니다.</>],
            [<Code>Pills.Item</Code>, <>항목 하나입니다. <Code>value</Code>로 구분합니다.</>],
            [<Code>Pills.Item.Text</Code>, "항목의 글자입니다. 덧붙이는 요소와 함께 쓸 때 글자를 감쌉니다."],
            [<Code>Pills.Item.Addon</Code>, "글자 앞뒤의 덧붙이는 자리입니다."],
          ]}
        />
      </Section>

      <Section title="크기">
        <Demo column>
          <StatusPills />
          <StatusPills size="l" />
        </Demo>
        <Rules
          items={[
            "M(32px)이 기본이고 L(44px)이 있습니다.",
            "같은 줄에 놓인 버튼·입력창과 같은 크기를 씁니다.",
            "항목 안쪽의 좌우 여백은 같은 크기의 Button과 같습니다.",
          ]}
        />
      </Section>

      <Section title="덧붙이는 요소">
        <Demo>
          <Pills defaultValue="table" aria-label="보기 방식">
            <Pills.Item value="table">
              <Pills.Item.Addon><TableM /></Pills.Item.Addon>
              <Pills.Item.Text>표</Pills.Item.Text>
            </Pills.Item>
            <Pills.Item value="wait">
              <Pills.Item.Text>승인 대기</Pills.Item.Text>
              <Pills.Item.Addon><Counter>12</Counter></Pills.Item.Addon>
            </Pills.Item>
            <Pills.Item value="auto">
              <Pills.Item.Text>자동 분류</Pills.Item.Text>
              <Pills.Item.Addon><Badge type="beta" /></Pills.Item.Addon>
            </Pills.Item>
            <Pills.Item value="kr">
              <Pills.Item.Addon><Flags iso2="KR" /></Pills.Item.Addon>
              <Pills.Item.Text>국내</Pills.Item.Text>
            </Pills.Item>
          </Pills>
        </Demo>
        <P>아이콘, 국기, 배지, 개수를 글자 앞뒤에 붙일 수 있습니다. 글자와의 간격은 Button에 덧붙이는 요소와 같습니다.</P>
      </Section>

      <Section title="상태">
        <Demo>
          <Pills defaultValue="b" aria-label="상태 예시">
            <Pills.Item value="a">기본</Pills.Item>
            <Pills.Item value="b">고름</Pills.Item>
            <Pills.Item value="c" disabled>비활성</Pills.Item>
          </Pills>
          <Pills defaultValue="a" disabled aria-label="전체 비활성">
            <Pills.Item value="a">전체</Pills.Item>
            <Pills.Item value="b">비활성</Pills.Item>
          </Pills>
        </Demo>
        <Rules
          items={[
            "언제나 하나만 고른 상태입니다. 고른 항목은 파란 테두리와 옅은 파란 바탕으로 드러납니다.",
            "항목 하나만 막을 수도, 묶음 전체를 막을 수도 있습니다.",
            "키보드로 선택하면 파란 초점 테두리가 나옵니다. 이 표시를 없애지 않습니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Demo caption="behavior=&quot;auto&quot; / behavior=&quot;manual&quot;">
          <StatusPills behavior="auto" items={["전체", "국내", "해외"]} />
          <StatusPills behavior="manual" items={["표", "카드", "차트"]} />
        </Demo>
        <Table
          head={["behavior", "키보드로 옮겨 갈 때", "어디에 쓰는가"]}
          rows={[
            [<Code>auto</Code>, "화살표 키로 초점이 옮겨 가면 그 항목이 바로 골라집니다. Radio와 같습니다.", "폼 안에서 값을 고를 때"],
            [<Code>manual</Code>, "초점만 옮겨 가고, 빈칸 키나 Enter를 눌러야 골라집니다.", "화면을 이동하거나 배치를 바꿀 때"],
          ]}
        />
      </Section>

      <Section title="쓰임에 따른 모양">
        <Sub title="기본">
          <P>대부분의 자리에서 쓰는 모습입니다. 위 예시가 모두 기본 모양입니다.</P>
        </Sub>
        <Sub title="새 항목 추가">
          <P>
            마지막 자리에 "추가" 항목을 두어 새 항목을 만드는 모양입니다. 기본 상태와 마우스를 올린 상태가 있습니다. 이 모양은 디자인 규칙으로만 있고 컴포넌트가 아직 제공하지 않습니다. 필요하면 Pills 옆에 약한 버튼을 따로 둡니다.
          </P>
        </Sub>
        <Sub title="요약 묶음">
          <Demo>
            <SummaryPills />
          </Demo>
          <Rules
            items={[
              "항목마다 주요 숫자를 담아 요약 상자처럼 쓸 수 있습니다.",
              "내용이 들어가는 만큼 기본 Pills보다 높아집니다.",
              "항목 안에 링크 같은 조작 요소가 더 들어갈 수 있습니다. 보통 자료를 더하거나 옮기는 링크입니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="항목 수">
        <Rules
          items={[
            "항목은 둘 이상이어야 합니다. 위쪽 한도는 없습니다.",
            "항목이 너무 많으면 고르기 어렵습니다. 그때는 넘치는 항목을 말줄임(⋯) 항목 뒤의 DropdownMenu로 접거나, Select로 바꿉니다.",
            "말줄임 항목을 누르면 들어가지 못한 항목의 목록이 열립니다. 거기서 고른 항목은 말줄임 항목 바로 앞으로 나옵니다.",
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "항목 이름은 한두 낱말로 짧게 씁니다.",
            "낱말이 너무 길면 사용자가 알아볼 수 있는 줄임말로 줄입니다.",
            "한 묶음 안의 항목은 같은 종류의 말로 맞춥니다(모두 상태 이름, 모두 기간 등).",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <Rules
          items={[
            "자료를 다루는 데 씁니다. 걸러 내기, 정렬, 자료 묶음 사이의 이동이 그런 일입니다.",
            "자료를 보는 방식을 바꾸는 데 씁니다(표로 보기, 카드로 보기).",
            "목록, 표, 차트, 위젯 안의 작은 필터에 둘 수 있습니다.",
          ]}
        />
        <DoDont
          good={{
            demo: <StatusPills items={["전체", "국내", "해외"]} />,
            text: "여럿 가운데 하나를 고르는 자리에 Pills를 씁니다.",
          }}
          bad={{
            demo: (
              <Flex>
                <Button neighborLocation="right">전체</Button>
                <Button neighborLocation="both">국내</Button>
                <Button neighborLocation="left">해외</Button>
              </Flex>
            ),
            text: "버튼을 이어 붙여 Pills 대신으로 쓰지 않습니다. 무엇이 골라졌는지 드러나지 않습니다.",
          }}
        />
        <DoDont
          good={{
            demo: (
              <Flex gap={2}>
                <Button use="primary" theme="info">저장</Button>
                <Button>취소</Button>
              </Flex>
            ),
            text: "무언가를 실행하는 자리에는 Button을 씁니다.",
          }}
          bad={{
            demo: (
              <Pills defaultValue="save" aria-label="잘못된 예">
                <Pills.Item value="save">저장</Pills.Item>
                <Pills.Item value="cancel">취소</Pills.Item>
              </Pills>
            ),
            text: "Pills를 버튼 대신으로 쓰지 않습니다. Pills는 고르는 것이지 실행하는 것이 아닙니다.",
          }}
        />
        <DoDont
          good={{
            demo: <StatusPills items={["이번 달", "지난달"]} />,
            text: "항목은 둘 이상 둡니다.",
          }}
          bad={{
            demo: (
              <Pills defaultValue="one" aria-label="잘못된 예">
                <Pills.Item value="one">이번 달</Pills.Item>
              </Pills>
            ),
            text: "항목 하나만으로 Pills를 만들지 않습니다.",
          }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Rules
          items={[
            "서로 다른 내용의 화면을 오가는 데는 TabLine을 씁니다. Pills는 같은 종류의 내용을 다르게 보는 데 씁니다.",
            "설정 목록에서 하나를 고르는 자리에는 Radio를 씁니다. 필터에서는 Radio 대신 Pills를 씁니다.",
            "보기가 많으면 Select를 씁니다.",
            "켜고 끄는 값 하나에는 Switch를 씁니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

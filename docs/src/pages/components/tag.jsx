import React from "react";
import { Tag, TagContainer, StatusTag, Box, Flex, Text } from "@ec21rnc/ui";
import FolderM from "@semcore/icon/Folder/m";
import MathPlusM from "@semcore/icon/MathPlus/m";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Tag" };

function RemovableTags() {
  const [tags, setTags] = React.useState(["수출", "장기 계약", "우선 처리"]);
  return (
    <Flex gap={2}>
      {tags.map((name) => (
        <TagContainer key={name} size="l">
          <TagContainer.Tag>
            <TagContainer.Tag.Text>{name}</TagContainer.Tag.Text>
          </TagContainer.Tag>
          <TagContainer.Close aria-label={`${name} 지우기`} onClick={() => setTags(tags.filter((tag) => tag !== name))} />
        </TagContainer>
      ))}
    </Flex>
  );
}

export default function TagPage() {
  return (
    <Page meta={meta} lead="정보나 대상을 주제별로 묶어 표시하는 작은 이름표입니다. 표, 필터, 카드 등에서 씁니다. 시스템이 붙이기도 하고 사용자가 직접 붙이기도 합니다.">
      <Section title="구성">
        <Demo caption="글자만 / 앞에 아이콘 / 앞에 둥근 덧붙임 / 지우기 버튼">
          <Tag size="l">수출</Tag>
          <Tag size="l">
            <Tag.Addon><FolderM /></Tag.Addon>
            <Tag.Text>계약 문서</Tag.Text>
          </Tag>
          <Tag size="l">
            <Tag.Circle>
              <Box w="100%" h="100%" bg="var(--ec-brand-navy)" />
            </Tag.Circle>
            <Tag.Text>구매 1팀</Tag.Text>
          </Tag>
          <RemovableTags />
        </Demo>
        <Table
          head={["부품", "역할"]}
          rows={[
            [<Code>Tag.Text</Code>, "태그의 글자입니다."],
            [<Code>Tag.Addon</Code>, "글자 앞에 붙는 아이콘 등 작은 요소입니다."],
            [<Code>Tag.Circle</Code>, "글자 앞에 붙는 둥근 덧붙임입니다. 주로 사람이나 팀의 그림을 넣습니다."],
            [<Code>TagContainer</Code>, "태그와 지우기 버튼을 한 덩어리로 묶는 틀입니다."],
            [<Code>TagContainer.Close</Code>, "태그를 지우는 버튼입니다. 지우기 버튼이 필요하면 Tag 대신 TagContainer로 씁니다."],
          ]}
        />
      </Section>

      <Section title="종류">
        <Demo caption="theme=&quot;primary&quot;(기본) / &quot;secondary&quot; / &quot;additional&quot;">
          <Tag theme="primary">수출</Tag>
          <Tag theme="secondary">수출</Tag>
          <Tag theme="additional">수출</Tag>
        </Demo>
        <Demo caption="어둡거나 색이 있는 바탕 위 — primary는 color=&quot;white&quot;, 나머지는 invert">
          <Box p={3} bg="var(--ec-brand-navy)">
            <Flex gap={2}>
              <Tag theme="primary" color="white">수출</Tag>
              <Tag theme="secondary" invert>수출</Tag>
              <Tag theme="additional" invert>수출</Tag>
            </Flex>
          </Box>
        </Demo>
        <Table
          head={["종류", "언제 쓰는가"]}
          rows={[
            ["primary", "기본입니다. 밝은 바탕 위에서 씁니다. 색을 주지 않으면 회색입니다."],
            ["secondary", "테두리만 있는 태그입니다. primary 태그와 나란히 놓고 덜 중요한 쪽을 구분할 때 씁니다."],
            ["additional", "점선 테두리 태그입니다. \"태그 추가\"처럼 다른 태그 옆에 붙는 특별한 태그에 씁니다."],
          ]}
        />
      </Section>

      <Section title="색">
        <Demo caption="theme=&quot;primary&quot;에만 color를 줄 수 있습니다">
          <Tag color="gray-500">기본</Tag>
          <Tag color="blue-500">국내</Tag>
          <Tag color="green-500">수출</Tag>
          <Tag color="violet-500">위탁</Tag>
        </Demo>
        <Rules
          items={[
            <><Code>color</Code>는 <Code>theme="primary"</Code>일 때만 받습니다. secondary와 additional은 색을 바꿀 수 없습니다.</>,
            "색은 분류를 구분하는 용도로만 씁니다. 색마다 뜻을 정했으면 시스템 전체에서 같은 뜻으로 씁니다.",
            "글자와 바탕의 대비는 4.5:1 이상이어야 합니다. 정해진 색 이름 밖의 색을 쓰면 대비를 직접 확인합니다.",
            "색만으로 뜻을 전하지 않습니다. 태그의 글자만 읽어도 뜻이 통해야 합니다.",
          ]}
        />
        <Sub title="데이터의 상태는 StatusTag로">
          <Demo caption="상태는 Tag에 색을 직접 주지 않고 StatusTag를 씁니다">
            <StatusTag status="success">승인 완료</StatusTag>
            <StatusTag status="progress">처리 중</StatusTag>
            <StatusTag status="warning">확인 필요</StatusTag>
            <StatusTag status="critical">반려</StatusTag>
          </Demo>
          <P>승인, 진행, 오류처럼 데이터의 상태를 나타낼 때는 <Code>StatusTag</Code>를 씁니다. 상태색의 뜻이 여섯 가지로 정해져 있어 화면마다 색이 달라지지 않습니다. Tag의 <Code>color</Code>로 상태색을 흉내 내지 않습니다.</P>
        </Sub>
      </Section>

      <Section title="크기">
        <Demo caption="M · 20px(기본) / L · 28px / XL · 40px">
          <Tag size="m">수출</Tag>
          <Tag size="l">수출</Tag>
          <Tag size="xl">수출</Tag>
        </Demo>
        <Rules
          items={[
            <>높이는 M <Code>--ec-tag-height-m</Code>, L <Code>--ec-tag-height-l</Code>, XL 40px입니다. 양 끝은 둥급니다(<Code>--ec-radius-pill</Code>).</>,
            "M은 표의 칸과 글 사이에, L은 필터와 입력창 안에, XL은 카드의 머리처럼 크게 보여 줄 자리에 씁니다.",
            "글자 굵기는 500입니다.",
          ]}
        />
      </Section>

      <Section title="누를 수 있는 태그">
        <Demo caption="interactive — 기본 / 눌린 상태(active) / 비활성">
          <Tag interactive size="l">수출</Tag>
          <Tag interactive active size="l">수출</Tag>
          <Tag interactive disabled size="l">수출</Tag>
        </Demo>
        <Rules
          items={[
            <>눌러서 걸러 보기 등의 동작이 일어나는 태그에는 <Code>interactive</Code>를 줍니다. 마우스를 올리면 바탕이 진해지고 키보드 초점도 받습니다.</>,
            "누를 수 없는 태그에는 interactive를 주지 않습니다. 눌릴 것처럼 보이면 안 됩니다.",
          ]}
        />
        <Sub title="태그 추가">
          <Demo caption="theme=&quot;additional&quot; + interactive">
            <Tag size="l">수출</Tag>
            <Tag theme="additional" interactive size="l">
              <Tag.Addon><MathPlusM /></Tag.Addon>
              <Tag.Text>태그 추가</Tag.Text>
            </Tag>
          </Demo>
          <Rules
            items={[
              <>글자색은 <Code>--ec-text-secondary</Code>, 테두리는 <Code>--ec-border-control</Code> 점선입니다.</>,
              "누르면 그 자리에서 InlineInput이 열립니다.",
              "확인 아이콘을 누르거나 Enter를 누르면 넣은 값이 저장되고 새 태그로 바뀝니다.",
            ]}
          />
        </Sub>
        <Sub title="태그 고치기">
          <P>이름을 고칠 수 있는 태그도 InlineInput을 씁니다. 태그를 누르면 같은 자리에서 입력창으로 바뀌고, 확인하면 다시 태그로 돌아옵니다.</P>
        </Sub>
      </Section>

      <Section title="묶음과 간격">
        <Demo caption="M — 간격 4px">
          <Flex gap={1}>
            <Tag size="m">수출</Tag><Tag size="m">장기 계약</Tag><Tag size="m">우선 처리</Tag>
          </Flex>
        </Demo>
        <Demo caption="L · XL — 간격 8px">
          <Flex gap={2}>
            <Tag size="l">수출</Tag><Tag size="l">장기 계약</Tag><Tag size="l">우선 처리</Tag>
          </Flex>
        </Demo>
        <Rules
          items={[
            "태그 여러 개를 나란히 둘 때 간격은 M 4px, L과 XL 8px입니다.",
            "줄이 넘어가면 줄 사이 간격도 같은 값으로 합니다.",
            "한 묶음 안에서는 같은 크기만 씁니다.",
          ]}
        />
      </Section>

      <Section title="긴 글자">
        <Demo caption="최대 폭을 정하면 넘치는 글자는 말줄임표로 잘립니다">
          <Tag size="l" wMax={140}>
            <Tag.Text tag={Text} ellipsis>해외 거래처 장기 공급 계약</Tag.Text>
          </Tag>
        </Demo>
        <Rules
          items={[
            <>자리가 좁으면 <Code>wMax</Code>로 최대 폭을 정합니다.</>,
            "잘린 태그는 마우스를 올리면 전체 글자를 보여 줍니다.",
            "태그 글자는 한두 낱말로 짧게 적습니다. 문장을 넣지 않습니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <Rules
          items={[
            "정보와 대상에 표시를 붙여 묶어 보여 줄 때 씁니다.",
            "카드에서는 제목 아래나 카드 아래쪽에 모아 둡니다. 그 카드가 어떤 분류에 드는지 알립니다.",
            "표에서는 분류 칸에 둡니다. 한 칸에 태그가 많으면 두세 개만 보여 주고 나머지는 \"+3\"처럼 개수로 줄입니다.",
          ]}
        />
        <DoDont
          good={{
            demo: (
              <Flex gap={1}>
                <Tag>수출</Tag><Tag>장기 계약</Tag>
              </Flex>
            ),
            text: "분류는 색 없는 기본 태그로 충분합니다.",
          }}
          bad={{
            demo: (
              <Flex gap={1}>
                <Tag color="red-500">수출</Tag><Tag color="green-500">장기 계약</Tag>
              </Flex>
            ),
            text: "뜻 없이 색을 입히지 않습니다. 빨강과 초록은 상태로 읽힙니다.",
          }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["상황", "쓸 것"]}
          rows={[
            ["분류·주제·사용자가 붙인 이름표", "Tag"],
            ["데이터의 상태(승인 완료, 처리 중, 반려 등)", "StatusTag"],
            ["기능의 상태(베타, 신규 등 정해진 여섯 가지)", "Badge"],
            ["개수", "Counter"],
            ["입력창 안에서 여러 값을 넣을 때", "InputTags"],
          ]}
        />
      </Section>
    </Page>
  );
}

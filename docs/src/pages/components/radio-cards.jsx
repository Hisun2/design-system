import React from "react";
import { RadioCards, Box } from "@ec21rnc/ui";
import TableM from "@semcore/icon/Table/m";
import UserL from "@semcore/icon/User/l";
import FolderL from "@semcore/icon/Folder/l";
import CalendarL from "@semcore/icon/Calendar/l";
import { Page, Section, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "RadioCards" };

function StatusCards({ loading }) {
  const [value, setValue] = React.useState("wait");
  return (
    <Box w="100%">
      <RadioCards name="radio-cards-status" aria-label="문서 묶음" value={value} onChange={setValue} gap={2}>
        <RadioCards.Item value="wait" text="승인 대기" textAddon="12" description="내가 승인해야 하는 문서" loading={loading} />
        <RadioCards.Item value="mine" text="내가 올린 문서" textAddon="48" description="이번 달에 올린 문서" loading={loading} />
        <RadioCards.Item value="back" text="반려" textAddon="3" description="고쳐서 다시 올려야 하는 문서" dot="새 반려 문서가 있습니다" loading={loading} />
        <RadioCards.Item value="all" text="전체" textAddon="1,248" description="볼 수 있는 모든 문서" loading={loading} />
      </RadioCards>
    </Box>
  );
}

export default function RadioCardsPage() {
  return (
    <Page meta={meta} lead="설명이 딸린 카드 가운데 하나를 고르는 조작 요소입니다. 미리 정해 둔 필터 묶음을 바꾸거나, 화면과 화면의 보기 방식을 바꿀 때 씁니다.">
      <Section title="구성">
        <Demo>
          <StatusCards />
        </Demo>
        <Table
          head={["부분", "꼭 있어야 하는가", "하는 일"]}
          rows={[
            [<Code>RadioCards</Code>, "예", <>묶음 전체입니다. <Code>name</Code>과 이름(<Code>aria-label</Code> 또는 <Code>aria-labelledby</Code>)을 반드시 줍니다.</>],
            [<Code>RadioCards.Item</Code>, "예", <>카드 하나입니다. <Code>value</Code>로 구분합니다.</>],
            [<Code>text</Code>, "예", "카드의 제목입니다."],
            [<Code>textAddon</Code>, "아니요", "제목 옆에 붙는 짧은 글자입니다. 보통 개수를 적습니다."],
            [<Code>iconAddon</Code>, "아니요", "제목 앞의 작은 아이콘, 또는 카드 왼쪽의 큰 그림입니다."],
            [<Code>description</Code>, "아니요", "제목 아래의 설명입니다."],
            [<Code>dot</Code>, "아니요", "새 소식이 있음을 알리는 점입니다. 값으로 화면 낭독기가 읽을 글을 적습니다."],
          ]}
        />
      </Section>

      <Section title="아이콘의 크기와 자리">
        <Demo caption="제목 앞의 작은 아이콘 — 한 카드를 도드라지게 할 때">
          <Box w="100%">
            <RadioCards name="radio-cards-small" aria-label="보기 방식" defaultValue="table" gap={2}>
              <RadioCards.Item value="table" text="표로 보기" iconAddon={<TableM />} description="줄마다 자세한 값을 봅니다" />
              <RadioCards.Item value="card" text="카드로 보기" description="거래처마다 요약을 봅니다" />
              <RadioCards.Item value="chart" text="차트로 보기" description="달마다의 흐름을 봅니다" />
            </RadioCards>
          </Box>
        </Demo>
        <Demo caption="왼쪽의 큰 그림 — 카드마다 그림으로 구분할 때">
          <Box w={720}>
            <RadioCards name="radio-cards-large" aria-label="묶는 기준" defaultValue="owner" gap={2}>
              <RadioCards.Item value="owner" text="담당자별" iconAddon={<UserL />} description="담당자마다 묶어 봅니다" />
              <RadioCards.Item value="folder" text="분류별" iconAddon={<FolderL />} description="문서 분류마다 묶어 봅니다" />
              <RadioCards.Item value="month" text="달별" iconAddon={<CalendarL />} description="등록한 달마다 묶어 봅니다" />
            </RadioCards>
          </Box>
        </Demo>
        <Rules
          items={[
            "작은 아이콘은 여러 카드 가운데 하나를 눈에 띄게 할 때 제목 앞에 붙입니다.",
            "큰 아이콘, 그림, 작은 차트는 카드의 왼쪽에 둡니다. 카드마다 다른 그림을 넣어 서로 구분되게 합니다.",
            "한 묶음에서는 한 가지 방식만 씁니다. 큰 그림을 쓰려면 모든 카드에 넣습니다.",
          ]}
        />
      </Section>

      <Section title="상태">
        <Demo caption="기본 / 고름 / 비활성">
          <Box w={720}>
            <RadioCards name="radio-cards-states" aria-label="상태 예시" defaultValue="selected" gap={2}>
              <RadioCards.Item value="normal" text="기본" textAddon="12" description="고르지 않은 카드" />
              <RadioCards.Item value="selected" text="고름" textAddon="48" description="지금 고른 카드" />
              <RadioCards.Item value="disabled" text="비활성" textAddon="0" description="고를 수 없는 카드" disabled />
            </RadioCards>
          </Box>
        </Demo>
        <Demo caption="처음 불러오는 중">
          <StatusCards loading />
        </Demo>
        <Table
          head={["상태", "설명"]}
          rows={[
            ["기본", "고르지 않은 카드입니다."],
            ["마우스 올림", "누를 수 있음을 알리도록 바탕이 달라집니다."],
            ["고름", "파란 테두리로 드러납니다."],
            ["처음 불러오는 중", <>개수처럼 나중에 들어오는 값이 카드 안에 있을 때만 씁니다. <Code>loading</Code>을 주면 그 값 자리에 뼈대가 나옵니다.</>],
            ["비활성", <>고를 수 없는 카드입니다. 카드 하나에도, 묶음 전체에도 줄 수 있습니다.</>],
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "Radio처럼 움직입니다. 한 번에 하나만 고를 수 있습니다.",
            "화면이 열릴 때 꼭 하나가 골라져 있어야 하는 것은 아닙니다. 하나를 골라 둘 수도, 모두 비워 둘 수도 있습니다. 화면의 쓰임에 맞춰 정합니다.",
            "카드 어디를 눌러도 그 카드가 골라집니다.",
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "제목은 두세 낱말로 짧게 씁니다. 무엇을 보게 되는지 적습니다.",
            "설명은 한 줄로 씁니다. 제목을 되풀이하지 않습니다.",
            "개수는 세 자리마다 쉼표를 넣습니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "카드가 넷 이상이면 페이지 폭 전체로 늘입니다." }}
          bad={{ text: "카드가 셋 이하인데 페이지 폭 전체로 늘이지 않습니다. 카드가 지나치게 넓어져 견주기 어렵습니다." }}
        />
        <Rules
          items={[
            "카드가 셋 이하면 묶음 전체에 정해진 폭을 줍니다. 서로 견주고 누르기가 쉬워집니다.",
            "카드 수는 한눈에 들어오는 만큼만 둡니다. 많아지면 Select나 Pills로 바꿉니다.",
          ]}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Rules
          items={[
            "설명 없이 이름만으로 충분하면 Pills를 씁니다.",
            "폼의 설정 목록에서 하나를 고르는 자리에는 Radio를 씁니다.",
            "서로 다른 내용의 화면을 오가는 데는 TabLine을 씁니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

import React from "react";
import { TabLine, Counter, Badge, Spin, Skeleton, Box } from "@ec21rnc/ui";
import FolderM from "@semcore/icon/Folder/m";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "TabLine" };

function BasicTabs(props) {
  const [value, setValue] = React.useState("all");
  return (
    <TabLine value={value} onChange={setValue} aria-label="문서 구분" {...props}>
      <TabLine.Item value="all">전체</TabLine.Item>
      <TabLine.Item value="waiting">승인 대기</TabLine.Item>
      <TabLine.Item value="done">승인 완료</TabLine.Item>
      <TabLine.Item value="rejected">반려</TabLine.Item>
    </TabLine>
  );
}

export default function TabLinePage() {
  return (
    <Page meta={meta} lead="한 화면 안에서 같은 성격의 내용을 묶음별로 나누어 오가는 밑줄 탭입니다. 고른 탭 아래에 파란 밑줄이 붙습니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "\"전체 / 승인 대기 / 승인 완료\"처럼 같은 종류의 내용을 묶음별로 나누어 볼 때 씁니다.",
            "설정 화면이나 안내 화면에서 뜻이 다른 정보를 갈라 놓을 때도 쓸 수 있습니다.",
            "시스템의 주 메뉴로 쓰지 않습니다. 주 메뉴는 왼쪽 메뉴가 맡습니다.",
            "켜기·끄기나 두 상태 사이의 전환에 쓰지 않습니다. Switch나 Radio를 씁니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Demo>
          <BasicTabs />
        </Demo>
        <Table
          head={["부품", "역할"]}
          rows={[
            [<Code>TabLine.Item</Code>, <>탭 하나입니다. <Code>value</Code>로 구분합니다.</>],
            [<Code>TabLine.Item.Text</Code>, "탭의 글자입니다. 덧붙임과 함께 쓸 때 글자를 감쌉니다."],
            [<Code>TabLine.Item.Addon</Code>, "글자 앞뒤에 붙는 아이콘, 개수, 배지의 자리입니다."],
          ]}
        />
      </Section>

      <Section title="종류">
        <Demo caption="밑줄 있음 (underlined, 기본)">
          <Box w={420}><BasicTabs /></Box>
        </Demo>
        <Demo caption="밑줄 없음 (underlined={false})">
          <Box w={420}><BasicTabs underlined={false} /></Box>
        </Demo>
        <Table
          head={["종류", "언제 쓰는가"]}
          rows={[
            ["밑줄 있음", "탭과 아래 내용을 선으로 갈라야 할 때. 페이지 안의 2차 이동에 씁니다."],
            ["밑줄 없음", "더 낮은 단계의 이동. 카드 안에서 표와 차트를 바꿔 볼 때처럼 좁은 범위에 씁니다."],
          ]}
        />
        <P>전체 밑줄의 색은 <Code>--ec-border</Code>, 고른 탭의 밑줄은 <Code>--ec-control-primary-info</Code>입니다.</P>
      </Section>

      <Section title="크기">
        <Demo caption="M · 32px (기본)">
          <BasicTabs size="m" />
        </Demo>
        <Demo caption="L · 44px">
          <BasicTabs size="l" />
        </Demo>
        <Rules
          items={[
            "M이 기본입니다. 카드 안, 표 위 등 대부분의 자리에 씁니다.",
            "L은 페이지 제목 바로 아래에서 페이지 전체를 가를 때 씁니다.",
            "탭 사이 간격은 M 16px, L 20px으로 정해져 있습니다. 따로 바꾸지 않습니다.",
          ]}
        />
      </Section>

      <Section title="덧붙이는 요소">
        <Demo caption="아이콘 / 개수 / 개수와 배지">
          <TabLine defaultValue="docs" aria-label="덧붙임 예시">
            <TabLine.Item value="docs">
              <TabLine.Item.Addon><FolderM /></TabLine.Item.Addon>
              <TabLine.Item.Text>문서</TabLine.Item.Text>
            </TabLine.Item>
            <TabLine.Item value="waiting">
              <TabLine.Item.Text>승인 대기</TabLine.Item.Text>
              <TabLine.Item.Addon><Counter>12</Counter></TabLine.Item.Addon>
            </TabLine.Item>
            <TabLine.Item value="auto">
              <TabLine.Item.Text>자동 분류</TabLine.Item.Text>
              <TabLine.Item.Addon><Counter>3</Counter></TabLine.Item.Addon>
              <TabLine.Item.Addon><Badge type="beta" /></TabLine.Item.Addon>
            </TabLine.Item>
          </TabLine>
        </Demo>
        <Rules
          items={[
            "덧붙임과 글자 사이의 간격은 Button의 덧붙임과 같습니다.",
            "글자 없이 아이콘만 있는 탭은 만들지 않습니다. 넘친 탭을 모으는 말줄임 탭만 예외입니다.",
            "국기와 아이콘을 한 탭에 함께 넣지 않습니다.",
            "개수와 배지가 함께 있으면 개수 다음에 배지를 둡니다.",
          ]}
        />
      </Section>

      <Section title="상태">
        <Demo caption="고름 / 기본 / 비활성">
          <TabLine defaultValue="all" aria-label="상태 예시">
            <TabLine.Item value="all">전체</TabLine.Item>
            <TabLine.Item value="waiting">승인 대기</TabLine.Item>
            <TabLine.Item value="archive" disabled>보관함</TabLine.Item>
          </TabLine>
        </Demo>
        <Demo caption="개수를 처음 불러올 때 / 다시 불러올 때">
          <TabLine defaultValue="first" aria-label="불러오기 예시">
            <TabLine.Item value="first">
              <TabLine.Item.Text>승인 대기</TabLine.Item.Text>
              <TabLine.Item.Addon>
                <Skeleton h={20} w={24}><Skeleton.Text height={20} /></Skeleton>
              </TabLine.Item.Addon>
            </TabLine.Item>
            <TabLine.Item value="again">
              <TabLine.Item.Text>승인 완료</TabLine.Item.Text>
              <TabLine.Item.Addon><Spin size="xs" /></TabLine.Item.Addon>
            </TabLine.Item>
          </TabLine>
        </Demo>
        <Rules
          items={[
            <>마우스를 올리면 탭 아래에 <Code>--ec-border-control</Code> 색 밑줄이 나옵니다.</>,
            "탭 안의 개수를 처음 불러올 때는 글자 줄 높이만 한 Skeleton을 보여 줍니다.",
            "개수를 다시 불러올 때는 가장 작은 Spin(XS)을 보여 줍니다. Button 안의 Spin과 같은 크기입니다.",
            "비활성 탭의 규칙은 Pills와 같습니다. 왜 누를 수 없는지 설명 풍선으로 알립니다.",
            "불러오는 동안에도 탭 자체는 비활성으로 두지 않습니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "키보드로는 Tab으로 탭 줄에 들어간 뒤 좌우 방향키로 옮겨 다닙니다.",
            <>기본(<Code>behavior="auto"</Code>)은 방향키로 옮기는 즉시 그 탭이 골라집니다. <Code>behavior="manual"</Code>이면 Space나 Enter를 눌러야 골라집니다.</>,
            "탭을 바꿀 때마다 내용을 서버에서 받아 와야 하면 manual을 씁니다.",
          ]}
        />
      </Section>

      <Section title="놓는 자리">
        <Rules
          items={[
            "페이지 제목, 페이지 전체에 걸리는 버튼과 필터 다음에 둡니다. 탭이 그보다 위에 오지 않습니다.",
            "제목 영역과 탭 사이는 24px입니다.",
            "탭과 그 아래의 제목이나 카드 사이는 16px입니다.",
          ]}
        />
      </Section>

      <Section title="글자와 넘침">
        <Demo caption="자리가 모자라면 글자가 말줄임표로 잘립니다">
          <Box w={260}>
            <TabLine defaultValue="a" aria-label="넘침 예시">
              <TabLine.Item value="a"><TabLine.Item.Text>해외 거래처 장기 공급 계약</TabLine.Item.Text></TabLine.Item>
              <TabLine.Item value="b"><TabLine.Item.Text>국내 거래처 단기 공급 계약</TabLine.Item.Text></TabLine.Item>
            </TabLine>
          </Box>
        </Demo>
        <Rules
          items={[
            "탭 이름은 한두 낱말의 명사로 적습니다. 이름 짓기와 순서의 규칙은 Pills와 같습니다.",
            "자리가 모자라 잘린 탭은 마우스를 올리면 전체 이름을 보여 줍니다.",
            "탭이 많으면 뒤쪽 탭을 말줄임 아이콘 탭 하나로 모을 수 있습니다. 누르면 들어가지 못한 탭의 목록이 열립니다.",
            "목록에서 고른 탭은 말줄임 탭 바로 앞으로 나옵니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <TabLine defaultValue="all" aria-label="좋은 예">
                <TabLine.Item value="all">전체</TabLine.Item>
                <TabLine.Item value="waiting">승인 대기</TabLine.Item>
                <TabLine.Item value="done">승인 완료</TabLine.Item>
              </TabLine>
            ),
            text: "같은 종류의 내용을 나눈 묶음에 씁니다.",
          }}
          bad={{
            demo: (
              <TabLine defaultValue="on" aria-label="나쁜 예">
                <TabLine.Item value="on">알림 켬</TabLine.Item>
                <TabLine.Item value="off">알림 끔</TabLine.Item>
              </TabLine>
            ),
            text: "상태를 켜고 끄는 데 쓰지 않습니다. Switch를 씁니다.",
          }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["상황", "쓸 것"]}
          rows={[
            ["같은 성격의 내용을 묶음별로 나눌 때", "TabLine"],
            ["성격이 서로 다른 내용을 한 상자 안에서 나눌 때", "TabPanel"],
            ["같은 데이터를 보는 방식만 바꿀 때(표·차트, 일·주·월)", "Pills"],
            ["시스템의 화면 사이를 옮겨 다닐 때", "왼쪽 메뉴"],
          ]}
        />
      </Section>
    </Page>
  );
}

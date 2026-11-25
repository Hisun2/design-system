import React from "react";
import { TabPanel, Counter, Badge, Spin, Skeleton, Box, Text } from "@ec21rnc/ui";
import UserM from "@semcore/icon/User/m";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "TabPanel" };

const bodies = {
  info: "거래처의 이름, 주소, 사업자 정보를 봅니다.",
  docs: "이 거래처와 주고받은 문서를 봅니다.",
  history: "승인과 변경의 기록을 봅니다.",
};

function BasicPanel() {
  const [value, setValue] = React.useState("info");
  return (
    <Box w={420}>
      <TabPanel value={value} onChange={setValue} aria-label="거래처 상세">
        <TabPanel.Item value="info">기본 정보</TabPanel.Item>
        <TabPanel.Item value="docs">문서</TabPanel.Item>
        <TabPanel.Item value="history">변경 기록</TabPanel.Item>
      </TabPanel>
      <Box p={4}>
        <Text size={200}>{bodies[value]}</Text>
      </Box>
    </Box>
  );
}

export default function TabPanelPage() {
  return (
    <Page meta={meta} lead="한 상자 안에서 성격이 서로 다른 내용을 나누어 담는 탭입니다. 고른 탭이 아래 내용과 이어진 한 장의 종이처럼 보입니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "\"기본 정보 / 문서 / 변경 기록\"처럼 한 대상에 딸린 서로 다른 종류의 내용을 나눌 때 씁니다.",
            "시스템의 주 메뉴로 쓰지 않습니다. 주 메뉴는 왼쪽 메뉴가 맡습니다.",
            "켜기·끄기나 두 상태 사이의 전환에 쓰지 않습니다. Switch나 Radio를 씁니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Demo caption="탭을 누르면 아래 내용이 바뀝니다">
          <BasicPanel />
        </Demo>
        <Table
          head={["부품", "역할"]}
          rows={[
            [<Code>TabPanel.Item</Code>, <>탭 하나입니다. <Code>value</Code>로 구분합니다.</>],
            [<Code>TabPanel.Item.Text</Code>, "탭의 글자입니다. 덧붙임과 함께 쓸 때 글자를 감쌉니다."],
            [<Code>TabPanel.Item.Addon</Code>, "글자 앞뒤에 붙는 아이콘, 개수, 배지의 자리입니다."],
          ]}
        />
      </Section>

      <Section title="크기">
        <P>크기는 한 가지뿐입니다. 탭의 높이는 <Code>--ec-control-height-m</Code>입니다.</P>
      </Section>

      <Section title="덧붙이는 요소">
        <Demo caption="아이콘 / 개수 / 개수와 배지">
          <TabPanel defaultValue="manager" aria-label="덧붙임 예시">
            <TabPanel.Item value="manager">
              <TabPanel.Item.Addon><UserM /></TabPanel.Item.Addon>
              <TabPanel.Item.Text>담당자</TabPanel.Item.Text>
            </TabPanel.Item>
            <TabPanel.Item value="docs">
              <TabPanel.Item.Text>문서</TabPanel.Item.Text>
              <TabPanel.Item.Addon><Counter>12</Counter></TabPanel.Item.Addon>
            </TabPanel.Item>
            <TabPanel.Item value="auto">
              <TabPanel.Item.Text>자동 분류</TabPanel.Item.Text>
              <TabPanel.Item.Addon><Counter>3</Counter></TabPanel.Item.Addon>
              <TabPanel.Item.Addon><Badge type="beta" /></TabPanel.Item.Addon>
            </TabPanel.Item>
          </TabPanel>
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
          <TabPanel defaultValue="info" aria-label="상태 예시">
            <TabPanel.Item value="info">기본 정보</TabPanel.Item>
            <TabPanel.Item value="docs">문서</TabPanel.Item>
            <TabPanel.Item value="archive" disabled>보관함</TabPanel.Item>
          </TabPanel>
        </Demo>
        <Demo caption="개수를 처음 불러올 때 / 다시 불러올 때">
          <TabPanel defaultValue="first" aria-label="불러오기 예시">
            <TabPanel.Item value="first">
              <TabPanel.Item.Text>문서</TabPanel.Item.Text>
              <TabPanel.Item.Addon>
                <Skeleton h={20} w={24}><Skeleton.Text height={20} /></Skeleton>
              </TabPanel.Item.Addon>
            </TabPanel.Item>
            <TabPanel.Item value="again">
              <TabPanel.Item.Text>변경 기록</TabPanel.Item.Text>
              <TabPanel.Item.Addon><Spin size="xs" /></TabPanel.Item.Addon>
            </TabPanel.Item>
          </TabPanel>
        </Demo>
        <Rules
          items={[
            "고른 탭은 테두리가 생기고 아래 내용과 이어져 보입니다. 고르지 않은 탭의 글자는 회색입니다.",
            "마우스를 올리면 글자가 진해집니다.",
            "탭 안의 개수를 처음 불러올 때는 글자 줄 높이만 한 Skeleton을 보여 줍니다.",
            "개수를 다시 불러올 때는 가장 작은 Spin(XS)을 보여 줍니다. Button 안의 Spin과 같은 크기입니다.",
            "비활성 탭에는 왜 누를 수 없는지 설명 풍선으로 알립니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "키보드로는 Tab으로 탭 줄에 들어간 뒤 좌우 방향키로 옮겨 다닙니다.",
            <>기본(<Code>behavior="manual"</Code>)은 방향키로 옮긴 뒤 Space나 Enter를 눌러야 골라집니다. <Code>behavior="auto"</Code>이면 옮기는 즉시 골라집니다.</>,
            "탭마다 주소를 따로 두는 것을 권합니다. 사용자가 탭을 마우스 오른쪽 버튼으로 눌러 새 창에서 열 수 있습니다.",
          ]}
        />
      </Section>

      <Section title="글자와 넘침">
        <Rules
          items={[
            "탭 이름은 한두 낱말의 명사로 적습니다.",
            "자리가 모자라면 글자가 말줄임표로 잘립니다. 마우스를 올리거나 키보드 초점을 주면 전체 이름을 보여 줍니다.",
            "탭이 많으면 뒤쪽 탭을 말줄임 아이콘 탭 하나로 모을 수 있습니다. 누르면 들어가지 못한 탭의 목록이 열립니다.",
            "목록에서 고른 탭은 말줄임 탭 바로 앞으로 나옵니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <TabPanel defaultValue="info" aria-label="좋은 예">
                <TabPanel.Item value="info">기본 정보</TabPanel.Item>
                <TabPanel.Item value="docs">문서</TabPanel.Item>
                <TabPanel.Item value="history">변경 기록</TabPanel.Item>
              </TabPanel>
            ),
            text: "한 대상에 딸린, 종류가 다른 내용을 나눕니다.",
          }}
          bad={{
            demo: (
              <TabPanel defaultValue="table" aria-label="나쁜 예">
                <TabPanel.Item value="table">표로 보기</TabPanel.Item>
                <TabPanel.Item value="chart">차트로 보기</TabPanel.Item>
              </TabPanel>
            ),
            text: "같은 데이터의 보는 방식만 바꾸는 데 쓰지 않습니다. Pills를 씁니다.",
          }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["상황", "쓸 것"]}
          rows={[
            ["성격이 서로 다른 내용을 한 상자 안에서 나눌 때", "TabPanel"],
            ["같은 성격의 내용을 묶음별로 나눌 때", "TabLine"],
            ["같은 데이터를 보는 방식만 바꿀 때", "Pills"],
            ["시스템의 화면 사이를 옮겨 다닐 때", "왼쪽 메뉴"],
          ]}
        />
      </Section>
    </Page>
  );
}

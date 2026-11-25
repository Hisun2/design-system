import React from "react";
import { Dot, Button, DropdownMenu, Flex, Box } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Dot" };

function MenuWithDot() {
  const [seen, setSeen] = React.useState(false);
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger tag={Button}>
        문서 작업
        <Dot up size="l" hidden={seen} aria-label="새 항목 있음" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        <DropdownMenu.Item>내려받기</DropdownMenu.Item>
        <DropdownMenu.Item onMouseEnter={() => setSeen(true)} onClick={() => setSeen(true)}>
          <DropdownMenu.Item.Content>
            일괄 승인
            <Dot size="m" ml={1} hidden={seen} aria-label="새 항목" />
          </DropdownMenu.Item.Content>
        </DropdownMenu.Item>
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
}

export default function DotPage() {
  return (
    <Page meta={meta} lead="화면의 어딘가에 새로운 것이 생겼음을 알리는 주황 점입니다. 버튼, 탭, 필터, 메뉴 항목에 붙입니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "바뀐 컨트롤이나 메뉴 항목으로 눈길을 끌 때 씁니다. 점이 붙은 컨트롤을 누르면 그 안에 점이 붙은 항목이 또 나옵니다.",
            "새 알림이 왔음을 알릴 때 씁니다.",
            "사용자가 점이 붙은 것을 누르거나 마우스를 올리면 점은 사라져야 합니다.",
          ]}
        />
        <P>
          기능의 단계(새 기능, 시험 중)나 데이터의 상태를 나타내는 데는 쓰지 않습니다. 색은 주황(<Code>--ec-brand-orange</Code>) 한 가지뿐입니다. 초록, 빨강, 파랑으로 바꾸지 않습니다.
        </P>
      </Section>

      <Section title="크기">
        <Demo>
          <Dot size="m" aria-label="새 항목" />
          <Dot size="l" aria-label="새 항목" />
          <Dot size="l" aria-label="새 항목 3건">3</Dot>
        </Demo>
        <Table
          head={["크기", "지름", "언제 쓰는가", "여백"]}
          rows={[
            ["M (기본)", "6px", "목록 안에서 글자 항목이나 그림·컨트롤 항목을 표시할 때", "글자에서 오른쪽으로 4px"],
            ["L", "12px", "컨트롤 바깥에서 그 컨트롤을 표시할 때", "오른쪽 위 모서리에 걸침"],
            ["L · 숫자 포함", "높이 16px", "컨트롤 바깥에서 새 소식의 수까지 보여 줄 때", "오른쪽 위 모서리에 걸침"],
          ]}
        />
      </Section>

      <Section title="위치">
        <Demo caption="컨트롤 위 (up, size=&quot;l&quot;)">
          <Button>
            알림
            <Dot up size="l" aria-label="새 알림 있음" />
          </Button>
          <Button use="primary" theme="info" size="l">
            승인 요청
            <Dot up size="l" aria-label="새 요청 있음" />
          </Button>
        </Demo>
        <Rules
          items={[
            <>컨트롤에 새 소식이 있음을 알릴 때는 컨트롤의 오른쪽 위 모서리에 걸칩니다. <Code>size="l"</Code>과 <Code>up</Code>을 함께 줍니다.</>,
            "모서리에 걸친 점은 컨트롤 바깥으로 3분의 1쯤 나갑니다.",
            <>메뉴 안의 새 항목을 가리킬 때는 항목 글자 오른쪽에 작은 점(<Code>size="m"</Code>)을 둡니다.</>,
            "점의 크기는 컨트롤의 종류나 크기와 상관없이 같습니다.",
          ]}
        />
      </Section>

      <Section title="숫자">
        <Demo caption="숫자 없음 / 숫자 있음 / 아홉을 넘을 때">
          <Box position="relative" inline><Button>알림<Dot up size="l" aria-label="새 알림 있음" /></Button></Box>
          <Box position="relative" inline><Button>알림<Dot up size="l" aria-label="새 알림 3건">3</Dot></Button></Box>
          <Box position="relative" inline><Button>알림<Dot up size="l" aria-label="새 알림 9건 넘음">9+</Dot></Button></Box>
        </Demo>
        <Rules
          items={[
            "점 안에 새 소식의 수를 넣을 수 있습니다. 숫자가 들어가면 점이 그만큼 커집니다.",
            "새 소식이 하나뿐이면 숫자 없이 점만 보여 줍니다.",
            "아홉을 넘으면 \"9+\"로 줄여 적습니다. 컴포넌트가 대신 줄여 주지 않으므로 화면에서 직접 바꿔 넣습니다.",
            "숫자가 길어져 점이 커질 때는 컨트롤 안쪽으로만 늘어납니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Demo caption="메뉴를 열어 새 항목에 마우스를 올리면 점이 사라집니다">
          <MenuWithDot />
        </Demo>
        <Table
          head={["점이 있는 곳", "사라지는 때"]}
          rows={[
            ["컨트롤", "사용자가 목록의 새 항목 모두에 마우스를 올렸거나, 모두 눌렀을 때"],
            ["목록의 항목", "사용자가 그 항목에 마우스를 올렸거나, 눌렀을 때"],
          ]}
        />
        <P>
          사라지게 할 때는 <Code>hidden</Code>을 줍니다. 한 번 사라진 점은 같은 소식으로 다시 나타나지 않아야 합니다.
        </P>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <Button>알림<Dot up size="l" aria-label="새 알림 있음" /></Button>,
            text: "사용자가 아직 보지 않은 새 소식이 있을 때만 붙입니다.",
          }}
          bad={{
            demo: (
              <Flex gap={4}>
                <Button>문서<Dot up size="l" aria-label="새 항목 있음" /></Button>
                <Button>거래처<Dot up size="l" aria-label="새 항목 있음" /></Button>
                <Button>담당자<Dot up size="l" aria-label="새 항목 있음" /></Button>
              </Flex>
            ),
            text: "한 화면 여러 곳에 붙이지 않습니다. 점이 많으면 어느 것도 눈에 띄지 않습니다.",
          }}
        />
        <Sub title="다른 컴포넌트와의 구분">
          <Table
            head={["컴포넌트", "쓰임"]}
            rows={[
              ["Dot", "아직 보지 않은 새 소식. 보면 사라집니다."],
              ["Badge", "기능의 단계(신규, 베타 등). 정해진 기간 동안 계속 붙어 있습니다."],
              ["Counter", "개수. 새 소식과 상관없이 늘 보여 줍니다."],
              ["FeaturePopover", "새 기능을 글로 설명해야 할 때. 한 컨트롤에 Dot과 함께 쓰지 않습니다."],
            ]}
          />
        </Sub>
      </Section>
    </Page>
  );
}

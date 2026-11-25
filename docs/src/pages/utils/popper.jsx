import React from "react";
import MenuM from "@semcore/icon/Hamburger/m";
import { Popper, Button, Flex, Box, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "띄우는 상자(Popper)", order: 4 };

// 띄우는 상자의 겉모양. Popper는 겉모양을 주지 않으므로 Box 속성으로 직접 줍니다.
const look = {
  p: 4,
  bg: "var(--ec-bg-surface)",
  border: "1px solid var(--ec-border)",
  borderRadius: "var(--ec-radius-notice)",
};

const placements = ["top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-start", "bottom", "bottom-end", "left-start", "left", "left-end"];

function Controlled() {
  const [visible, setVisible] = React.useState(false);
  return (
    <Popper visible={visible} onVisibleChange={setVisible}>
      <Popper.Trigger tag={Button}>바깥에서 다룸</Popper.Trigger>
      <Popper.Popper {...look}>
        <Text size={200}>열림 상태를 화면 쪽에서 갖고 있습니다.</Text>
      </Popper.Popper>
    </Popper>
  );
}

function WithRenderFunction() {
  const openButton = React.useRef(null);
  return (
    <Popper>
      {(props, handlers) => (
        <Flex gap={4} alignItems="center">
          <Button ref={openButton} onClick={() => handlers.visible(true)}>상자 열기</Button>
          <Popper.Trigger>
            <Text size={200}>상자가 붙는 자리</Text>
          </Popper.Trigger>
          <Popper.Popper {...look}>
            <Flex direction="column" gap={2} alignItems="flex-start">
              <Text size={200}>붙는 자리와 여는 버튼이 서로 다릅니다.</Text>
              <Button
                onClick={() => {
                  handlers.visible(false);
                  setTimeout(() => openButton.current?.focus(), 1);
                }}
              >
                닫기
              </Button>
            </Flex>
          </Popper.Popper>
        </Flex>
      )}
    </Popper>
  );
}

export default function PopperPage() {
  return (
    <Page meta={meta} lead="어떤 요소 옆에 다른 내용을 띄워 붙이는 바탕 부품입니다. 드롭다운, 선택 상자, 툴팁 등 화면 위에 뜨는 모든 컴포넌트가 이것으로 만들어져 있습니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "대부분의 경우 직접 쓰지 않습니다. 먼저 Dropdown, DropdownMenu, Select, Tooltip 가운데 맞는 것이 있는지 봅니다. 이들은 겉모양, 키보드 동작, 읽어 주는 도구를 위한 속성을 이미 갖추고 있습니다.",
            "맞는 컴포넌트가 없어 띄우는 요소를 새로 만들어야 할 때만 Popper를 씁니다.",
            "Popper는 위치 잡기와 열고 닫기만 맡습니다. 바탕색, 테두리, 여백 같은 겉모양은 주지 않습니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Table
          head={["부품", "쓰임"]}
          rows={[
            [<Code>Popper</Code>, "전체를 감쌉니다. 열림 상태, 위치, 여는 방법을 정합니다."],
            [<Code>Popper.Trigger</Code>, "기준이 되는 요소. 이것을 누르거나 가리키면 상자가 열립니다."],
            [<Code>Popper.Popper</Code>, "띄워지는 상자."],
          ]}
        />
        <Sub title="겉모양">
          <Rules
            items={[
              <>직접 만들 때 상자의 바탕은 <Code>--ec-bg-surface</Code>, 테두리는 <Code>--ec-border</Code> 1px, 모서리는 8px(<Code>--ec-radius-notice</Code>), 안쪽 여백은 16px로 합니다.</>,
              "기준 요소와 상자 사이는 4px 띄웁니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="열림 상태 다루기">
        <Demo caption="스스로 다룸 / 바깥에서 다룸">
          <Popper>
            <Popper.Trigger tag={Button}>스스로 다룸</Popper.Trigger>
            <Popper.Popper {...look}>
              <Text size={200}>열림 상태를 Popper가 갖고 있습니다.</Text>
            </Popper.Popper>
          </Popper>
          <Controlled />
        </Demo>
        <Rules
          items={[
            "아무것도 주지 않으면 Popper가 열림 상태를 스스로 갖습니다. 대부분은 이것으로 충분합니다.",
            <>화면 쪽에서 열림 상태를 알아야 하면 <Code>visible</Code>과 <Code>onVisibleChange</Code>를 줍니다. 저장이 끝난 뒤에 닫기, 다른 버튼으로 열기 같은 경우입니다.</>,
            <>처음부터 열어 두려면 <Code>defaultVisible</Code>을 줍니다. 띄우는 요소는 사용자가 열기 전에는 닫혀 있는 것이 원칙입니다.</>,
          ]}
        />
      </Section>

      <Section title="여는 방법">
        <Demo caption="interaction=&quot;hover&quot; — 마우스를 올리거나 키보드로 옮겨 가면 열립니다">
          <Popper interaction="hover">
            <Popper.Trigger tag={Button}>가리키면 열림</Popper.Trigger>
            <Popper.Popper {...look}>
              <Text size={200}>마우스가 벗어나면 닫힙니다.</Text>
            </Popper.Popper>
          </Popper>
        </Demo>
        <Table
          head={["interaction", "열리는 때", "쓰임"]}
          rows={[
            [<Code>click</Code>, "누를 때 (기본)", "메뉴, 선택 상자, 안에 누를 것이 있는 상자"],
            [<Code>hover</Code>, "마우스를 올리거나 키보드로 옮겨 갈 때", "설명만 담은 상자"],
            [<Code>focus</Code>, "키보드 선택이 들어올 때", "입력창에 딸린 도움말, 추천 목록"],
            [<Code>none</Code>, "자동으로 열리지 않음", "visible로 직접 여닫을 때"],
          ]}
        />
        <Rules
          items={[
            <>이 사건들이 일어나면 <Code>onVisibleChange</Code>가 바뀐 열림 값과 함께 불립니다.</>,
            "안에 버튼이나 링크가 있는 상자는 hover로 열지 않습니다. 마우스를 옮기는 사이에 닫히고, 터치 화면에서는 열 수 없습니다.",
            <>열리고 닫히기까지의 지연은 <Code>timeout</Code>으로 줍니다.</>,
          ]}
        />
      </Section>

      <Section title="바깥을 눌렀을 때">
        <Demo caption="onOutsideClick에서 false를 돌려주면 바깥을 눌러도 닫히지 않습니다">
          <Popper onOutsideClick={() => false}>
            <Popper.Trigger tag={Button}>바깥을 눌러도 열려 있음</Popper.Trigger>
            <Popper.Popper {...look}>
              <Text size={200}>버튼을 다시 눌러야 닫힙니다.</Text>
            </Popper.Popper>
          </Popper>
        </Demo>
        <Rules
          items={[
            "기본으로는 기준 요소와 상자가 아닌 곳을 누르면 닫힙니다.",
            <><Code>onOutsideClick</Code>으로 바깥 누름을 알 수 있습니다. 여기서 <Code>false</Code>를 돌려주면 닫히지 않습니다.</>,
            <>바깥으로 치지 않을 요소가 더 있으면 <Code>excludeRefs</Code>에 넣습니다. 기준 요소와 상자는 처음부터 들어 있습니다.</>,
            "바깥을 눌러도 닫히지 않게 하는 것은 입력 중인 내용을 잃을 위험이 있을 때만 씁니다. 이때는 상자 안에 닫는 방법을 반드시 둡니다.",
          ]}
        />
      </Section>

      <Section title="위치">
        <Demo caption="placement — 마우스를 올려 확인합니다">
          <Flex flexWrap gap={2}>
            {placements.map((placement) => (
              <Popper key={placement} placement={placement} interaction="hover">
                <Popper.Trigger tag={Button} w={120}>{placement}</Popper.Trigger>
                <Popper.Popper {...look}>
                  <Text size={200}>{placement}</Text>
                </Popper.Popper>
              </Popper>
            ))}
          </Flex>
        </Demo>
        <Table
          head={["방향", "값"]}
          rows={[
            ["위", "top-start, top, top-end"],
            ["오른쪽", "right-start, right, right-end"],
            ["아래", "bottom-start, bottom, bottom-end"],
            ["왼쪽", "left-start, left, left-end"],
            ["자동", "auto-start, auto, auto-end — 자리가 가장 넉넉한 쪽"],
          ]}
        />
        <Rules
          items={[
            <><Code>-start</Code>는 기준 요소의 시작 쪽 끝에, <Code>-end</Code>는 끝 쪽 끝에 맞춥니다. 아무것도 붙이지 않으면 가운데에 맞춥니다.</>,
            <>메뉴와 선택 상자는 <Code>bottom-start</Code>, 설명 상자는 <Code>top</Code>을 기본으로 합니다.</>,
            "고른 쪽에 자리가 모자라면 자동으로 반대쪽에 뜹니다. 화면 밖으로 나가지 않게 위치도 밀어 줍니다.",
            <>기준 요소와의 간격은 <Code>offset</Code>으로 줍니다. 4px의 배수로 합니다.</>,
          ]}
        />
      </Section>

      <Section title="다른 요소로 바꾸기 (tag)">
        <Demo>
          <Popper>
            <Popper.Trigger tag={Button}>
              <Button.Addon><MenuM /></Button.Addon>
              <Button.Text>메뉴</Button.Text>
            </Popper.Trigger>
            <Popper.Popper {...look}>
              <Text size={200}>기준 요소가 Button입니다.</Text>
            </Popper.Popper>
          </Popper>
        </Demo>
        <Rules
          items={[
            <><Code>Popper.Trigger</Code>와 <Code>Popper.Popper</Code>는 <Code>tag</Code>로 그려질 요소를 바꿀 수 있습니다. HTML 태그 이름(<Code>tag="a"</Code>)이나 컴포넌트(<Code>{"tag={Button}"}</Code>)를 줍니다.</>,
            <>기본은 둘 다 <Code>Box</Code>입니다. 그래서 여백, 폭 같은 Box의 속성을 그대로 줄 수 있습니다.</>,
            "기준 요소는 키보드로 닿을 수 있어야 합니다. 글자나 그림만 기준으로 삼지 말고 Button 같은 컨트롤을 씁니다.",
          ]}
        />
      </Section>

      <Section title="그리는 함수로 쓰기">
        <Demo>
          <WithRenderFunction />
        </Demo>
        <Rules
          items={[
            <><Code>Popper</Code>의 자식으로 함수를 줄 수 있습니다. 상자가 붙는 자리와 여는 요소가 다를 때처럼 구성을 마음대로 짜야 할 때 씁니다.</>,
            <>첫째 인자에는 Popper의 속성과 함께 <Code>getTriggerProps</Code>, <Code>getPopperProps</Code>가 들어 있습니다. 이 함수들이 돌려주는 속성을 직접 만든 요소에 펼쳐 넣으면 그 요소가 기준 요소나 상자가 됩니다.</>,
            <>직접 줄 속성(예: <Code>ref</Code>)이 있으면 요소에 따로 적지 말고 이 함수의 인자로 넘깁니다(<Code>{"getPopperProps({ ref })"}</Code>). 따로 적으면 Popper가 넣은 것을 덮어써 위치를 잡지 못합니다. 인자로 넘기면 둘이 합쳐집니다.</>,
            <>둘째 인자는 안의 상태를 바꾸는 함수 모음입니다. <Code>visible(true)</Code>로 열고 <Code>visible(false)</Code>로 닫습니다.</>,
            "코드로 닫았을 때는 키보드 선택을 연 요소로 돌려보냅니다.",
          ]}
        />
      </Section>

      <Section title="그려지는 곳 (disablePortal)">
        <Demo caption="disablePortal — 상자를 기준 요소 바로 옆에 그립니다">
          <Popper disablePortal>
            <Popper.Trigger tag={Button}>옆에 그림</Popper.Trigger>
            <Popper.Popper {...look}>
              <Text size={200}>문서 구조에서 버튼 바로 옆에 있습니다.</Text>
            </Popper.Popper>
          </Popper>
          <Popper>
            <Popper.Trigger tag={Button}>맨 끝에 그림 (기본)</Popper.Trigger>
            <Popper.Popper {...look}>
              <Text size={200}>문서 구조에서 body의 맨 끝에 있습니다.</Text>
            </Popper.Popper>
          </Popper>
        </Demo>
        <Rules
          items={[
            "기본으로 상자는 문서(body)의 맨 끝에 그려지고, 절대 위치로 기준 요소 옆에 놓입니다. 부모가 넘치는 부분을 잘라 내도 상자는 잘리지 않습니다.",
            <><Code>disablePortal</Code>을 주면 기준 요소 바로 옆에 그립니다. 기준 요소가 페이지와 따로 스크롤되는 구역 안에 있을 때 씁니다. 스크롤할 때마다 위치를 다시 셈하지 않아도 됩니다.</>,
            "어디에 그려졌는지는 브라우저의 개발자 도구에서 확인합니다.",
            "자세한 것은 화면 맨 위에 그리기(Portal) 문서를 봅니다.",
          ]}
        />
      </Section>

      <Section title="고정 위치 (strategy)">
        <Rules
          items={[
            <>상자의 위치 방식은 기본이 절대 위치(<Code>absolute</Code>)입니다. <Code>strategy="fixed"</Code>를 주면 화면에 고정하는 방식으로 바뀝니다.</>,
            "기준 요소가 화면에 고정된 구역(고정 상단바, 고정 옆 패널) 안에 있을 때 씁니다.",
            "페이지를 스크롤할 때 위치를 다시 셈하는 일이 없어져 상자가 흔들리지 않습니다.",
          ]}
        />
      </Section>

      <Section title="키보드와 초점">
        <Rules
          items={[
            "누르면 열리는 상자는 열릴 때 키보드 선택이 상자 안으로 들어가고, 닫히면 기준 요소로 돌아옵니다.",
            "Esc를 누르면 닫힙니다.",
            <>상자 안에서 Tab은 기본으로 상자 안을 돕니다. <Code>{"focusLoop={false}"}</Code>를 주면 끝에서 Tab을 눌렀을 때 상자가 닫히고 기준 요소로 돌아갑니다.</>,
            <>이 동작을 끄는 <Code>disableEnforceFocus</Code>는 상자 안에 누를 것이 전혀 없을 때만 씁니다.</>,
            <><Code>disabled</Code>를 주면 상자가 닫히고 어떤 조작에도 열리지 않습니다.</>,
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "메뉴는 DropdownMenu, 고르기는 Select, 설명은 Tooltip을 씁니다. 이들로 안 되는 경우에만 Popper로 직접 만듭니다." }}
          bad={{ text: "이미 있는 컴포넌트와 같은 것을 Popper로 다시 만들지 않습니다. 겉모양과 키보드 동작이 화면마다 달라집니다." }}
        />
      </Section>
    </Page>
  );
}

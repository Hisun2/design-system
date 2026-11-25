import React from "react";
import { Dropdown, Button, ButtonTrigger, LinkTrigger, Input, Text, Flex } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Dropdown" };

function WithActions() {
  const [visible, setVisible] = React.useState(false);
  return (
    <Dropdown visible={visible} onVisibleChange={setVisible}>
      <Dropdown.Trigger tag={Button}>반려 사유 적기</Dropdown.Trigger>
      <Dropdown.Popper p={4} w={280} aria-label="반려 사유">
        <Text size={200} tag="label" htmlFor="reject-reason">반려 사유</Text>
        <Input mt={2}>
          <Input.Value id="reject-reason" placeholder="예: 첨부 문서 누락" />
        </Input>
        <Flex gap={2} mt={4}>
          <Button use="primary" theme="info" onClick={() => setVisible(false)}>적용</Button>
          <Button onClick={() => setVisible(false)}>취소</Button>
        </Flex>
      </Dropdown.Popper>
    </Dropdown>
  );
}

export default function DropdownPage() {
  return (
    <Page meta={meta} lead="누르는 요소 아래에 작은 상자를 띄워 폼이나 안내 같은 내용을 보여 주는 요소입니다. 내용은 자유롭게 넣을 수 있습니다.">
      <Section title="구성">
        <Demo caption="버튼을 눌러 엽니다">
          <Dropdown>
            <Dropdown.Trigger tag={Button}>담당자 안내</Dropdown.Trigger>
            <Dropdown.Popper p={4} w={260} aria-label="담당자 안내">
              <Text size={200}>이 거래처의 문서는 영업 담당자가 먼저 검토한 뒤 승인합니다.</Text>
            </Dropdown.Popper>
          </Dropdown>
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>Dropdown.Trigger</Code>, "누르는 요소입니다. Button, ButtonTrigger, LinkTrigger, FilterTrigger 등으로 모양을 정합니다."],
            [<Code>Dropdown.Popper</Code>, "열리는 상자입니다. 안에 무엇이든 넣을 수 있습니다."],
          ]}
        />
        <Demo caption="누르는 요소의 여러 모양">
          <Dropdown>
            <Dropdown.Trigger tag={ButtonTrigger}>기간</Dropdown.Trigger>
            <Dropdown.Popper p={4} aria-label="기간">내용</Dropdown.Popper>
          </Dropdown>
          <Dropdown>
            <Dropdown.Trigger tag={LinkTrigger}>자세한 조건</Dropdown.Trigger>
            <Dropdown.Popper p={4} aria-label="자세한 조건">내용</Dropdown.Popper>
          </Dropdown>
        </Demo>
      </Section>

      <Section title="크기">
        <Rules
          items={[
            "정해진 크기가 없습니다. 안에 든 내용이 크기를 정합니다.",
            "사용자가 상자 안에서 무언가를 하는 동안 상자의 폭과 높이가 바뀌면 안 됩니다. 불러오는 중, 오류 같은 상태로 바뀌어도 같은 크기를 지킵니다.",
            <>상자의 폭을 누르는 요소에 맞추려면 <Code>stretch</Code>를 씁니다. <Code>min</Code>은 누르는 요소보다 좁아지지 않게, <Code>fixed</Code>는 똑같은 폭으로 맞춥니다.</>,
            "안쪽 여백은 16px을 기본으로 합니다.",
          ]}
        />
      </Section>

      <Section title="위치">
        <Rules
          items={[
            "누르는 요소의 아래쪽으로 열립니다.",
            "아래에 자리가 모자라면 반대쪽(위)으로 열립니다.",
            "열린 뒤에는 누르는 요소에 붙어 있어야 합니다. 페이지를 스크롤해도 따로 움직이지 않습니다. 위로 열린 상자는 스크롤해서 일부나 전부가 가려져도 위에 그대로 둡니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Demo caption="상자 안의 버튼으로 닫습니다">
          <WithActions />
        </Demo>
        <Table
          head={["", "어떻게"]}
          rows={[
            ["열림", "누르는 요소를 누를 때"],
            ["열림", "누르는 요소에서 Enter나 스페이스를 누를 때"],
            ["열림", "누르는 요소가 입력창이면 글자를 칠 때"],
            ["닫힘", "상자 바깥을 누를 때"],
            ["닫힘", "상자 안에서 동작을 마칠 때. 예: \"취소\" 버튼"],
            ["닫힘", "Esc를 누를 때"],
            ["닫힘", "누르는 요소가 입력창이면 입력창에서 벗어날 때"],
          ]}
        />
        <P>닫히면 키보드 선택은 누르는 요소로 돌아갑니다.</P>
      </Section>

      <Section title="쓰는 법">
        <Rules
          items={[
            "상자가 열려 있는 동안 누르는 요소는 눌린(active) 상태로 보여 줍니다.",
            "상자 안에서 또 다른 Dropdown을 열지 않습니다.",
            "처음부터 열어 두지 않습니다. 사용자가 눌렀을 때만 엽니다.",
          ]}
        />
        <DoDont
          good={{ text: "짧은 폼, 덧붙이는 설정, 안내처럼 지금 화면을 떠나지 않고 잠깐 처리할 내용을 담습니다." }}
          bad={{ text: "입력이 많거나 반드시 답해야 하는 내용을 담지 않습니다. 바깥을 누르면 닫혀 버립니다. 그런 내용은 Modal에 담습니다." }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["컴포넌트", "쓰임"]}
          rows={[
            ["Dropdown", "자유로운 내용을 담는 상자."],
            ["DropdownMenu", "동작이나 항목의 목록. 키보드로 항목 사이를 오갑니다."],
            ["Select", "목록에서 값을 고르고, 고른 값을 누르는 요소에 보여 줄 때."],
            ["Tooltip", "누르지 않고 마우스를 올려 보는 짧은 설명."],
            ["Accordion", "내용을 화면 위에 띄우지 않고 그 자리에서 펼칠 때."],
          ]}
        />
      </Section>
    </Page>
  );
}

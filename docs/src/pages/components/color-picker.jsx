import React from "react";
import { ColorPicker, PaletteManager, Flex, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "ColorPicker" };

function WithCustom() {
  const [value, setValue] = React.useState(null);
  const [colors, setColors] = React.useState(["#0A6FD6", "#167A42"]);
  return (
    <ColorPicker value={value} onChange={setValue}>
      <ColorPicker.Trigger aria-label="색 고르기" />
      <ColorPicker.Popper>
        <ColorPicker.Colors />
        <PaletteManager colors={colors} onColorsChange={setColors}>
          <PaletteManager.Colors />
          <PaletteManager.InputColor />
        </PaletteManager>
      </ColorPicker.Popper>
    </ColorPicker>
  );
}

export default function ColorPickerPage() {
  return (
    <Page meta={meta} lead="미리 정해 둔 색 가운데 하나를 고르거나, HEX 값을 적어 원하는 색을 넣는 요소입니다. 사용자가 항목을 색으로 구분하게 할 때 씁니다.">
      <Section title="구성">
        <Demo caption="눌러서 엽니다">
          <ColorPicker defaultValue="#0A6FD6">
            <ColorPicker.Trigger aria-label="색 고르기" />
            <ColorPicker.Popper />
          </ColorPicker>
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>ColorPicker.Trigger</Code>, "누르는 부분입니다. 지금 고른 색을 동그라미로 보여 줍니다."],
            [<Code>ColorPicker.Popper</Code>, "열리는 상자입니다."],
            [<Code>ColorPicker.Colors</Code>, "미리 정해 둔 색의 목록입니다."],
            [<Code>PaletteManager</Code>, "사용자가 직접 넣은 색을 담는 틀입니다. 없어도 됩니다."],
            [<Code>PaletteManager.Colors</Code>, "사용자가 넣은 색의 목록과 색 추가 버튼입니다."],
            [<Code>PaletteManager.InputColor</Code>, "새 색의 HEX 값을 적는 입력창과 확인·취소 버튼입니다."],
          ]}
        />
      </Section>

      <Section title="누르는 부분">
        <Rules
          items={[
            "지금 고른 색을 채운 동그라미와 아래를 보는 화살표로 이루어집니다.",
            "고른 색이 없으면 빈 동그라미에 빗금을 그어 보여 줍니다.",
            "글자가 없으므로 화면을 읽어 주는 도구를 위해 aria-label로 이름을 붙입니다.",
          ]}
        />
      </Section>

      <Section title="색 목록의 종류">
        <Demo caption="채움 (기본) / 글자색 (displayLabel)">
          <ColorPicker defaultValue="#0A6FD6">
            <ColorPicker.Trigger aria-label="채움 색 고르기" />
            <ColorPicker.Popper />
          </ColorPicker>
          <ColorPicker defaultValue="#0A6FD6" displayLabel>
            <ColorPicker.Trigger aria-label="글자색 고르기" />
            <ColorPicker.Popper />
          </ColorPicker>
        </Demo>
        <Table
          head={["종류", "모양", "언제 쓰는가"]}
          rows={[
            ["채움", "색을 가득 채운 동그라미", "표식, 선, 차트 계열처럼 글자가 아닌 것의 색을 정할 때. 예: 거래처마다 다른 색으로 구분"],
            ["글자색", "옅은 바탕 위에 그 색의 글자 \"A\"", "태그처럼 글자가 들어가는 것의 색을 정할 때"],
          ]}
        />
        <P>
          목록에 넣을 색은 <Code>colors</Code>로 정합니다. 차트 계열의 색을 고르게 할 때는 <Code>--ec-chart-1</Code>부터 번호 순서대로 넣습니다.
        </P>
      </Section>

      <Section title="열리는 상자">
        <Rules
          items={[
            "높이는 안에 든 색의 수에 따라 정해집니다.",
            "고를 수 있는 색은 모두 한눈에 보여 주는 것이 원칙입니다.",
            "색이 다섯 줄을 넘으면 높이를 묶고 상자 안에서 스크롤하게 합니다.",
            "한 줄에는 색을 여섯 개 놓습니다.",
          ]}
        />
      </Section>

      <Section title="상태">
        <Table
          head={["항목", "기본", "마우스를 올림", "고름"]}
          rows={[
            ["미리 정한 색", "색 동그라미", <>둘레에 옅은 테두리(<Code>--ec-border-control</Code>)</>, "둘레에 진한 테두리"],
            ["사용자가 넣은 색", "색 동그라미", "옅은 테두리와 오른쪽 위에 지우기(×) 버튼", "둘레에 진한 테두리"],
            ["색 없음", "빗금 그은 빈 동그라미", "옅은 테두리", "진한 테두리"],
            ["색 추가 버튼", "+ 아이콘", "옅은 회색 바탕", "한 단계 진한 회색 바탕"],
          ]}
        />
        <P>글자색 종류도 같은 규칙을 따릅니다. 동그라미 안이 "A" 글자로 바뀔 뿐입니다.</P>
      </Section>

      <Section title="사용자가 넣는 색">
        <Demo caption="+ 를 눌러 색을 넣습니다">
          <WithCustom />
        </Demo>
        <Rules
          items={[
            "사용자는 직접 넣은 색을 더하고 지울 수 있습니다. 미리 정한 색은 바꾸거나 지울 수 없습니다.",
            "사용자가 넣은 색은 저장해 두고, 색을 고르는 다른 화면에서도 똑같이 보여 줍니다.",
          ]}
        />
        <Sub title="색 넣기">
          <Rules
            items={[
              "입력창에 값을 적고 Enter를 누르거나 확인(✓) 버튼을 누르면 목록에 들어갑니다.",
              "입력창은 여섯 글자만 받습니다. 숫자와 A~F 글자만 쓸 수 있습니다.",
              "여섯 글자가 아니거나 HEX 값으로 바꿀 수 없는 글자가 있으면 입력창이 잘못됨 상태가 됩니다.",
              "이때 설명 풍선으로 \"영문자(A~F)와 숫자 6자를 입력합니다\"라고 알립니다.",
              "소문자로 적어도 대문자로 바꿔 저장합니다.",
            ]}
          />
        </Sub>
        <Sub title="색 지우기">
          <P>사용자가 넣은 색에 마우스를 올리면 오른쪽 위에 지우기 버튼이 나옵니다. 누르면 바로 목록에서 빠집니다.</P>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <Demo caption="다른 컨트롤 옆에 붙여 씁니다">
          <Flex alignItems="center" gap={2}>
            <Text size={200}>거래처 표시 색</Text>
            <ColorPicker defaultValue="#167A42">
              <ColorPicker.Trigger aria-label="거래처 표시 색 고르기" />
              <ColorPicker.Popper />
            </ColorPicker>
          </Flex>
        </Demo>
        <Rules
          items={[
            "누르는 부분은 기본 모양 말고도 Input, Link, Select로 바꿔 쓸 수 있습니다.",
            "고른 색에 뜻(위험, 완료 등)을 싣지 않습니다. 상태의 색은 정해져 있으므로 사용자가 고르게 하지 않습니다.",
          ]}
        />
        <DoDont
          good={{ text: "사용자가 자기 데이터를 구분하려고 색을 고르는 자리에 씁니다. 색과 함께 이름도 보여 줍니다." }}
          bad={{ text: "화면의 틀이나 버튼의 색을 사용자가 바꾸게 하는 데 쓰지 않습니다." }}
        />
      </Section>
    </Page>
  );
}

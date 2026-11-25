import React from "react";
import { InlineEdit, InlineInput, Text, Flex, Select } from "@ec21rnc/ui";
import EditM from "@semcore/icon/Edit/m";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "InlineEdit" };

function EditableText({ initial = "", placeholder, size = 200, label }) {
  const [value, setValue] = React.useState(initial);
  const [editable, setEditable] = React.useState(false);
  return (
    <Text size={size} tag="div">
      <InlineEdit editable={editable} onEditableChange={setEditable}>
        <InlineEdit.View>
          <Flex alignItems="center" gap={1}>
            <Text color={value ? "var(--ec-text-primary)" : "var(--ec-text-hint)"} size={size}>
              {value || placeholder}
            </Text>
            <EditM color="var(--ec-text-secondary)" />
          </Flex>
        </InlineEdit.View>
        <InlineEdit.Edit>
          <InlineInput
            onConfirm={(next) => {
              setValue(next);
              setEditable(false);
            }}
            onCancel={() => setEditable(false)}
          >
            <InlineInput.Value autoFocus defaultValue={value} placeholder={placeholder} aria-label={label} />
            <InlineInput.ConfirmControl title="저장" />
            <InlineInput.CancelControl title="취소" />
          </InlineInput>
        </InlineEdit.Edit>
      </InlineEdit>
    </Text>
  );
}

const GRADES = ["일반", "우수", "최우수"];

function EditableSelect() {
  const [value, setValue] = React.useState("우수");
  const [editable, setEditable] = React.useState(false);
  return (
    <InlineEdit editable={editable} onEditableChange={setEditable}>
      <InlineEdit.View>
        <Flex alignItems="center" gap={1}>
          <Text size={200}>{value}</Text>
          <EditM color="var(--ec-text-secondary)" />
        </Flex>
      </InlineEdit.View>
      <InlineEdit.Edit>
        <Select
          defaultVisible
          value={value}
          onChange={(next) => {
            setValue(next);
            setEditable(false);
          }}
          onVisibleChange={(visible) => {
            if (!visible) setEditable(false);
          }}
        >
          <Select.Trigger aria-label="거래처 등급" />
          <Select.Menu>
            {GRADES.map((name) => (
              <Select.Option value={name} key={name}>{name}</Select.Option>
            ))}
          </Select.Menu>
        </Select>
      </InlineEdit.Edit>
    </InlineEdit>
  );
}

export default function InlineEditPage() {
  return (
    <Page meta={meta} lead="보는 상태와 고치는 상태를 한자리에서 바꿔 주는 감싸개입니다. 글자를 누르면 그 자리가 입력창으로 바뀌고, 저장하면 다시 글자로 돌아옵니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "페이지를 새로 열지 않고 읽기와 고치기를 오가야 할 때 씁니다.",
            "자리가 좁아 입력창을 늘 펼쳐 둘 수 없을 때 씁니다.",
            "값을 보내는 일이 그 화면의 주된 일이 아닐 때 씁니다. 카드 안의 메모, 덧붙이는 설명, 문서 제목이 그런 예입니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Demo caption="글자를 누르면 입력창으로 바뀝니다">
          <EditableText initial="11월 거래처 정산" label="문서 제목" placeholder="문서 제목" />
          <EditableText label="메모" placeholder="메모 추가" />
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>InlineEdit</Code>, <>두 상태를 감쌉니다. <Code>editable</Code>이 지금 어느 쪽을 보여 줄지 정하고, <Code>onEditableChange</Code>가 바뀜을 알립니다.</>],
            [<Code>InlineEdit.View</Code>, "보는 상태입니다. 누르면 고치는 상태로 넘어갑니다."],
            [<Code>InlineEdit.Edit</Code>, "고치는 상태입니다. 입력 컴포넌트를 넣습니다."],
          ]}
        />
        <Rules
          items={[
            "보는 상태의 모양은 정해져 있지 않습니다. 버튼, 아이콘, 아이콘이 붙은 글자 어느 것이든 누르는 요소가 될 수 있습니다. 위 예시는 그 가운데 하나입니다.",
            "글자와 아이콘은 누르는 영역 하나로 묶습니다. 아이콘만 눌리게 하지 않습니다.",
            <>값이 없을 때 보이는 안내 글자는 입력창의 안내 글자와 같은 색(<Code>--ec-text-hint</Code>)을 씁니다.</>,
          ]}
        />
      </Section>

      <Section title="고치는 상태에 넣는 것">
        <Demo caption="Select를 넣은 예">
          <EditableSelect />
        </Demo>
        <P>
          고치는 상태에는 일에 맞는 입력 컴포넌트를 넣습니다. InlineInput, Input, Textarea, Select, ColorPicker, TimePicker를 쓸 수 있습니다. 한 줄 글자에는 InlineInput이 기본입니다.
        </P>
      </Section>

      <Section title="상태">
        <Table
          head={["상태", "모양"]}
          rows={[
            ["값 없음", <>안내 글자를 <Code>--ec-text-hint</Code> 색으로 보여 줍니다.</>],
            ["마우스 올림", "커서가 손가락 모양으로 바뀝니다."],
            ["고치는 중", "입력 컴포넌트가 그 자리에 나옵니다."],
            ["값 있음", <>글자 색이 <Code>--ec-text-primary</Code>로 바뀝니다.</>],
            ["값 있음 · 마우스 올림", "커서가 손가락 모양으로 바뀌고, 뒤에 붙은 아이콘이 한 단계 진해집니다."],
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "보는 상태를 누르면 입력 컴포넌트가 열립니다.",
            "열리자마자 입력창에 초점이 들어갑니다. 한 번 더 누르게 하지 않습니다.",
            "값을 적고 저장합니다. 취소 버튼이나 Esc 키로 고치기 전 값으로 돌아갈 수 있습니다.",
            "입력창이 초점을 잃으면(다른 곳을 누르면) 적어 둔 값을 저장합니다.",
            "두 상태가 바뀔 때는 50ms 동안 부드럽게(ease-in-out) 넘어갑니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <Demo caption="보는 글자와 고치는 글자의 크기를 같게 합니다 (24px 제목)">
          <EditableText initial="거래처 상세" label="페이지 제목" placeholder="페이지 제목" size={500} />
        </Demo>
        <DoDont
          good={{ text: "보는 상태의 글자가 24px이면 고치는 상태의 입력 글자도 24px로 맞춥니다. 바뀔 때 글자가 제자리에 있어야 합니다." }}
          bad={{ text: "값을 모아 한꺼번에 보내는 폼 안에서 보통 입력창과 섞어 쓰지 않습니다. 폼에는 Input을 씁니다." }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Rules
          items={[
            "InlineEdit은 두 상태를 바꿔 주는 감싸개이고, InlineInput은 그 안에 넣는 입력창입니다. 둘은 보통 함께 씁니다.",
            "늘 입력할 수 있어야 하는 자리에는 Input을 그대로 둡니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

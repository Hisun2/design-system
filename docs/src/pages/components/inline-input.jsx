import React from "react";
import { InlineInput, Text, Flex, Button, Tag } from "@ec21rnc/ui";
import EditM from "@semcore/icon/Edit/m";
import EditL from "@semcore/icon/Edit/l";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "InlineInput" };

function Basic({ defaultValue = "", placeholder = "문서 제목", label = "문서 제목", children, ...rest }) {
  return (
    <InlineInput onConfirm={() => {}} onCancel={() => {}} onBlurBehavior="none" {...rest}>
      {children}
      <InlineInput.Value defaultValue={defaultValue} placeholder={placeholder} aria-label={label} />
      <InlineInput.ConfirmControl title="저장" />
      <InlineInput.CancelControl title="취소" />
    </InlineInput>
  );
}

function TagAdder() {
  const [tags, setTags] = React.useState(["우수 거래처"]);
  const [adding, setAdding] = React.useState(false);
  return (
    <Flex gap={2} alignItems="center">
      {tags.map((tag) => (
        <Tag key={tag} size="l">{tag}</Tag>
      ))}
      {adding ? (
        <InlineInput
          w={160}
          onConfirm={(value) => {
            if (value.trim()) setTags([...tags, value.trim()]);
            setAdding(false);
          }}
          onCancel={() => setAdding(false)}
        >
          <InlineInput.Value autoFocus placeholder="태그 이름" aria-label="태그 이름" />
          <InlineInput.ConfirmControl title="추가" />
          <InlineInput.CancelControl title="취소" />
        </InlineInput>
      ) : (
        <Tag size="l" interactive onClick={() => setAdding(true)}>태그 추가</Tag>
      )}
    </Flex>
  );
}

export default function InlineInputPage() {
  return (
    <Page meta={meta} lead="한 줄 글자를 그 자리에서 적고 고치는 입력창입니다. 고치는 동안에는 저장과 취소 버튼이 늘 함께 나옵니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "페이지를 새로 열지 않고 읽기와 고치기를 오갈 때 씁니다. 제목, 설명, 태그 이름이 그런 예입니다.",
            "정보가 촘촘해서 자리를 아껴야 할 때 씁니다.",
            "값을 보내는 일이 그 화면의 주된 일이 아닐 때 씁니다. 카드 안의 메모나 덧붙이는 설명이 그런 예입니다.",
            "값을 모아 보내는 폼 안에서 보통 입력창과 섞어 쓰지 않습니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Demo>
          <Basic defaultValue="11월 거래처 정산" />
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>InlineInput.Addon</Code>, "글자 앞에 붙는 아이콘·국기·이름표 자리입니다."],
            [<Code>InlineInput.Value</Code>, "글자를 적는 곳입니다."],
            [<Code>InlineInput.ConfirmControl</Code>, <>저장 버튼입니다. <Code>title</Code>이 설명 풍선의 글자가 됩니다.</>],
            [<Code>InlineInput.CancelControl</Code>, "취소 버튼입니다. 고치기 전 값으로 돌아갑니다."],
            [<><Code>InlineInput.NumberValue</Code> · <Code>InlineInput.NumberControls</Code></>, "숫자만 받는 경우에 Value 대신 쓰는 입력 부분과 올림·내림 버튼입니다."],
          ]}
        />
      </Section>

      <Section title="크기">
        <Demo column>
          <Text size={200} tag="div"><Basic defaultValue="14px 본문" /></Text>
          <Text size={500} tag="div"><Basic defaultValue="24px 페이지 제목" /></Text>
        </Demo>
        <P>
          InlineInput에는 정해진 크기가 없습니다. 바깥 글자 크기를 그대로 물려받습니다. 높이와 글자 크기는 쓰는 자리에 맞춥니다.
        </P>
      </Section>

      <Section title="덧붙이는 요소">
        <Sub title="앞쪽">
          <Demo column>
            <Text size={200} tag="div">
              <Basic defaultValue="11월 거래처 정산"><InlineInput.Addon><EditM /></InlineInput.Addon></Basic>
            </Text>
            <Text size={600} tag="div">
              <Basic defaultValue="11월 거래처 정산"><InlineInput.Addon><EditL /></InlineInput.Addon></Basic>
            </Text>
          </Demo>
          <Table
            head={["글자 크기", "아이콘 크기", "아이콘 색"]}
            rows={[
              ["24px 이하", "M", <Code>--ec-text-secondary</Code>],
              ["24px 초과", "L", <Code>--ec-text-secondary</Code>],
            ]}
          />
          <P>앞쪽에는 누를 수 없는 아이콘, 국기, 사람 그림만 둡니다.</P>
        </Sub>
        <Sub title="이름표">
          <Demo>
            <Basic placeholder="이름을 적습니다" label="담당자">
              <InlineInput.Addon><Text color="var(--ec-text-secondary)">담당자</Text></InlineInput.Addon>
            </Basic>
          </Demo>
          <Rules
            items={[
              "앞쪽 자리에 이름표를 넣어 무엇을 적는 곳인지 알릴 수 있습니다(태그 이름, 문서 이름 등).",
              <>안내 글자의 색은 보통 입력창과 같은 <Code>--ec-text-hint</Code>입니다.</>,
            ]}
          />
        </Sub>
        <Sub title="뒤쪽">
          <Rules
            items={[
              "뒤쪽에는 저장과 취소 버튼이 들어갑니다. 둘 다 글자 없는 ButtonLink입니다.",
              "글자가 24px 이하면 M 아이콘, 24px를 넘으면 L 아이콘을 씁니다.",
              "두 버튼에 마우스를 올리면 \"저장\", \"취소\"처럼 무슨 일을 하는지 설명 풍선으로 알려 줍니다.",
            ]}
          />
        </Sub>
        <Sub title="저장·취소를 보통 버튼으로 두기">
          <Demo>
            <Flex gap={2} alignItems="center">
              <InlineInput onConfirm={() => {}} onCancel={() => {}} onBlurBehavior="none">
                <InlineInput.Value defaultValue="11월 거래처 정산" aria-label="문서 제목" />
              </InlineInput>
              <Button use="primary" theme="info">저장</Button>
              <Button>취소</Button>
            </Flex>
          </Demo>
          <P>자리가 넉넉하고 버튼을 또렷이 보여 줘야 하면 아이콘 버튼을 빼고 보통 버튼을 옆에 둘 수 있습니다.</P>
        </Sub>
      </Section>

      <Section title="상태">
        <Demo column>
          <Basic defaultValue="기본" />
          <Basic defaultValue="올바른 값" state="valid" />
          <Basic defaultValue="잘못된 값" state="invalid" />
          <Basic defaultValue="저장 중" loading />
          <Basic defaultValue="비활성" disabled />
        </Demo>
        <Rules
          items={[
            "InlineInput은 고치는 동안에만 화면에 있습니다. 그래서 초점이 들어간 모양이 기본입니다.",
            "보통 입력창의 올바름·잘못됨 표시를 그대로 씁니다. 읽기 전용 상태는 없습니다. 읽기만 할 때는 글자로 보여 줍니다.",
            <>저장에 시간이 걸리면 <Code>loading</Code>으로 바꿉니다. 저장 버튼 자리에 돌아가는 표시가 나오고 입력이 막힙니다.</>,
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "사용자가 글자나 버튼을 눌러 InlineInput을 엽니다. 열리자마자 입력창에 초점이 들어갑니다.",
          ]}
        />
        <Table
          head={["입력", "결과"]}
          rows={[
            ["저장 버튼 · Enter", "값을 저장합니다."],
            ["취소 버튼 · Esc", "바꾼 내용을 버리고 고치기를 끝냅니다."],
            ["Tab · Shift+Tab으로 밖으로 나감", "바꾼 내용을 버리고 고치기를 끝냅니다."],
            ["마우스로 바깥을 누름", "적어 둔 값을 저장합니다."],
          ]}
        />
        <P>
          초점을 잃었을 때 무엇을 할지는 <Code>onBlurBehavior</Code>로 정합니다. <Code>confirm</Code>(저장, 기본값), <Code>cancel</Code>(버림), <Code>none</Code>(아무것도 하지 않음) 가운데 고릅니다.
        </P>
      </Section>

      <Section title="쓰는 법">
        <Sub title="글자 크기">
          <DoDont
            good={{ text: "보는 상태의 글자가 24px이면 고치는 상태도 24px로 맞춥니다." }}
            bad={{ text: "24px 제목을 누르자 14px 입력창이 나오게 하지 않습니다. 글자가 튀어 보입니다." }}
          />
        </Sub>
        <Sub title="폼 안에서">
          <DoDont
            good={{ text: "메모, 덧붙이는 설명, 이름, 분류처럼 따로 저장되는 값 하나에 씁니다." }}
            bad={{ text: "값을 모아 한 번에 보내는 폼에서 보통 입력창과 섞지 않습니다. 폼에는 Input을 씁니다." }}
          />
        </Sub>
        <Sub title="태그 추가">
          <Demo>
            <TagAdder />
          </Demo>
          <P>태그를 새로 붙이는 자리에는 보통 입력창 대신 InlineInput을 씁니다. 보통 입력창은 높이를 줄일 수 없어 촘촘한 표 안에 들어가지 않습니다.</P>
        </Sub>
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Rules
          items={[
            "늘 열려 있는 한 줄 입력에는 Input을 씁니다.",
            "보는 상태와 고치는 상태를 오가게 하려면 InlineEdit으로 감쌉니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

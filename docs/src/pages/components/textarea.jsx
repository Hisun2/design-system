import React from "react";
import { Textarea, Counter, Box, Flex, Text } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Textarea" };

const LIMIT = 200;

function CountedTextarea() {
  const [value, setValue] = React.useState("납품 일정이 바뀌어 다시 승인을 요청합니다.");
  const over = value.length > LIMIT;
  return (
    <Flex direction="column" gap={1} w={320}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text size={200}>반려 사유</Text>
        <Counter theme={over ? "danger" : undefined}>{value.length}/{LIMIT}</Counter>
      </Flex>
      <Textarea value={value} onChange={setValue} state={over ? "invalid" : "normal"} minRows={3} aria-label="반려 사유" />
    </Flex>
  );
}

export default function TextareaPage() {
  return (
    <Page meta={meta} lead="여러 줄의 글을 넣는 입력창입니다. 의견, 설명, 사유처럼 길이가 정해지지 않은 글을 받을 때 씁니다.">
      <Section title="크기">
        <Demo caption="M(기본) / L">
          <Box w={240}><Textarea size="m" placeholder="의견을 입력해 주세요" aria-label="의견 M" /></Box>
          <Box w={240}><Textarea size="l" placeholder="의견을 입력해 주세요" aria-label="의견 L" /></Box>
        </Demo>
        <Rules
          items={[
            <>한 줄일 때의 높이는 M <Code>--ec-control-height-m</Code>, L <Code>--ec-control-height-l</Code>입니다. 같은 폼의 Input과 같은 크기를 씁니다.</>,
            <>글자 크기는 M <Code>--ec-fs-200</Code>, L <Code>--ec-fs-300</Code>입니다.</>,
            "폭은 160~200px, 높이는 서너 줄보다 작게 만들지 않습니다. 좁은 자리에서 긴 글을 다루기는 어렵습니다. 폼의 중심 입력창이면 더욱 그렇습니다.",
          ]}
        />
      </Section>

      <Section title="줄 수와 크기 조절">
        <Demo caption="minRows={3} — 처음 보이는 줄 수">
          <Box w={280}><Textarea minRows={3} placeholder="전달할 내용을 입력해 주세요" aria-label="전달 내용" /></Box>
        </Demo>
        <Demo caption="resize=&quot;vertical&quot; — 오른쪽 아래 손잡이로 높이를 늘립니다">
          <Box w={280}><Textarea resize="vertical" minRows={3} placeholder="전달할 내용을 입력해 주세요" aria-label="높이 조절" /></Box>
        </Demo>
        <Demo caption="resize=&quot;auto&quot; — 내용에 맞춰 늘어나고 maxRows를 넘으면 스크롤">
          <Box w={280}><Textarea resize="auto" minRows={2} maxRows={5} placeholder="전달할 내용을 입력해 주세요" aria-label="자동 높이" /></Box>
        </Demo>
        <Table
          head={["resize", "동작"]}
          rows={[
            [<Code>none</Code>, "기본입니다. 크기가 고정됩니다."],
            [<Code>vertical</Code>, "사용자가 세로로 늘릴 수 있습니다."],
            [<Code>horizontal</Code>, "사용자가 가로로 늘릴 수 있습니다."],
            [<Code>both</Code>, "가로·세로 모두 늘릴 수 있습니다."],
            [<Code>auto</Code>, <>넣은 글의 길이에 맞춰 <Code>minRows</Code>부터 <Code>maxRows</Code>까지 저절로 늘어납니다.</>],
          ]}
        />
        <Rules
          items={[
            "크기를 늘릴 수 없는 입력창은 정해진 줄 수를 넘으면 스크롤 막대가 나옵니다.",
            "스크롤은 입력창이 다섯 줄 이상일 때 생기게 합니다. 두세 줄짜리 입력창에서 스크롤하게 만들지 않습니다.",
            "가로로 늘리는 조절은 폼의 줄 맞춤을 깨뜨리기 쉽습니다. 되도록 세로 조절만 허용합니다.",
          ]}
        />
      </Section>

      <Section title="글자 수 표시">
        <Demo caption="이름표 옆에 글자 수를 둔 모양">
          <CountedTextarea />
        </Demo>
        <Rules
          items={[
            "넣은 글자 수와 한도를 Counter로 보여 줄 수 있습니다.",
            "글자 수는 이름표 줄의 오른쪽 끝이나 입력창 바로 아래에 둡니다.",
            "한도를 넘으면 글자 수를 위험 색으로 바꾸고 입력창을 오류 상태로 바꿉니다. 넘은 글자를 말없이 자르지 않습니다.",
          ]}
        />
      </Section>

      <Section title="상태">
        <Demo caption="기본 / 올바름 / 오류">
          <Box w={200}><Textarea placeholder="기본" aria-label="기본" /></Box>
          <Box w={200}><Textarea state="valid" defaultValue="검토를 마쳤습니다." aria-label="올바름" /></Box>
          <Box w={200}><Textarea state="invalid" defaultValue="" placeholder="사유를 입력해 주세요" aria-label="오류" /></Box>
        </Demo>
        <Demo caption="비활성 / 읽기 전용">
          <Box w={200}><Textarea disabled defaultValue="승인 뒤에는 고칠 수 없습니다." aria-label="비활성" /></Box>
          <Box w={200}><Textarea readOnly defaultValue="2026-11-25 14:30 승인 요청" aria-label="읽기 전용" /></Box>
        </Demo>
        <Rules
          items={[
            "상태별 모양은 Input과 같습니다. 초점을 받으면 파란 테두리가 나옵니다.",
            "오류 상태에서는 무엇이 잘못되었는지 입력창 가까이에 적습니다.",
            "비활성은 지금 쓸 수 없는 입력창, 읽기 전용은 내용을 볼 수는 있지만 고칠 수 없는 입력창에 씁니다. 읽기 전용은 글자를 골라 복사할 수 있습니다.",
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "이름표에는 무엇을 적는 자리인지 적습니다(\"반려 사유\", \"전달 내용\"). 끝에 쌍점(:)을 붙이지 않습니다.",
            "안내 글자(placeholder)에는 \"사유를 입력해 주세요\"처럼 적는 방법을 합쇼체로 적습니다.",
            "안내 글자는 글을 넣으면 사라집니다. 꼭 지켜야 하는 조건은 이름표나 입력창 아래에 적습니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Flex direction="column" gap={1} w={220}>
                <Text size={200}>반려 사유</Text>
                <Textarea minRows={3} placeholder="사유를 입력해 주세요" aria-label="반려 사유 예시" />
              </Flex>
            ),
            text: "긴 글에는 이름표를 붙인 Textarea를 씁니다. 처음부터 세 줄 이상 보여 줍니다.",
          }}
          bad={{
            demo: (
              <Flex direction="column" gap={1} w={220}>
                <Text size={200}>담당자 이름</Text>
                <Textarea minRows={3} aria-label="담당자 이름 예시" />
              </Flex>
            ),
            text: "한두 낱말이면 되는 값에 쓰지 않습니다. Input을 씁니다.",
          }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["상황", "쓸 것"]}
          rows={[
            ["여러 줄의 긴 글", "Textarea"],
            ["한 줄, 한두 낱말에서 세 낱말 정도의 짧은 값", "Input"],
            ["한 줄에 하나씩 여러 값을 한꺼번에 넣을 때", "BulkTextarea"],
            ["여러 값을 태그로 넣을 때", "InputTags"],
          ]}
        />
        <P>글자 수 제한의 자세한 규칙은 Counter 페이지를 따릅니다.</P>
      </Section>
    </Page>
  );
}

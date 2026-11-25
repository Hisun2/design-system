import React from "react";
import { Button, Input, Select, Textarea, Checkbox, Flex, Box, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "폼", order: 1 };

const GRADES = [
  { value: "a", children: "일반" },
  { value: "b", children: "우수" },
  { value: "c", children: "주의" },
];

function VerticalForm({ size = "m" }) {
  const fs = size === "l" ? 300 : 200;
  const id = `form-v-${size}`;
  return (
    <Flex direction="column" gap={size === "l" ? 6 : 4} w={320}>
      <Flex direction="column" gap={size === "l" ? 2 : 1}>
        <Text tag="label" size={fs} htmlFor={`${id}-name`}>거래처 이름</Text>
        <Input size={size}><Input.Value id={`${id}-name`} placeholder="사업자등록증에 적힌 이름" /></Input>
      </Flex>
      <Flex direction="column" gap={size === "l" ? 2 : 1}>
        <Text tag="label" size={fs} htmlFor={`${id}-owner`}>담당자 <Text color="text-secondary">(선택)</Text></Text>
        <Input size={size}><Input.Value id={`${id}-owner`} /></Input>
      </Flex>
      <Flex gap={2} mt={2}>
        <Button use="primary" theme="info" size={size}>저장</Button>
        <Button size={size}>취소</Button>
      </Flex>
    </Flex>
  );
}

function HorizontalForm({ align = "left" }) {
  const id = `form-h-${align}`;
  const label = { size: 200, w: 96, flex: "0 0 auto", textAlign: align };
  return (
    <Flex direction="column" gap={4} w={440}>
      <Flex alignItems="center" gap={4}>
        <Text tag="label" htmlFor={`${id}-name`} {...label}>거래처 이름</Text>
        <Input><Input.Value id={`${id}-name`} /></Input>
      </Flex>
      <Flex alignItems="center" gap={4}>
        <Text tag="label" htmlFor={`${id}-no`} {...label}>사업자 번호</Text>
        <Input><Input.Value id={`${id}-no`} placeholder="숫자 10자리" /></Input>
      </Flex>
      <Flex alignItems="center" gap={4}>
        <Text id={`${id}-grade`} {...label}>등급</Text>
        <Select options={GRADES} placeholder="등급 선택" aria-labelledby={`${id}-grade`} />
      </Flex>
      <Flex alignItems="flex-start" gap={4}>
        <Text tag="label" htmlFor={`${id}-memo`} mt={1} {...label}>메모 <Text color="text-secondary">(선택)</Text></Text>
        <Textarea id={`${id}-memo`} rows={3} />
      </Flex>
      <Flex gap={2} mt={2} ml="112px">
        <Button use="primary" theme="info">저장</Button>
        <Button>취소</Button>
      </Flex>
    </Flex>
  );
}

export default function FormPage() {
  return (
    <Page meta={meta} lead="사용자에게 값을 받아 시스템에 보내는 화면 묶음입니다. 이름표, 입력창, 선택 컨트롤, 보내는 버튼으로 이루어집니다.">
      <Section title="구성">
        <Rules
          items={[
            "입력창마다 이름표를 붙입니다. 이름표는 입력창 밖에 항상 보이게 둡니다.",
            "한 폼 안의 입력창·선택 상자·버튼은 모두 같은 크기로 맞춥니다. M과 L을 섞지 않습니다.",
            "보내는 버튼은 폼 맨 아래에 둡니다. 주요 버튼은 하나이고 맨 앞에 놓습니다.",
            "입력값 검사는 '입력값 검사' 문서의 규칙을 따릅니다.",
          ]}
        />
      </Section>

      <Section title="배치 종류">
        <Table
          head={["배치", "모양", "쓰는 곳"]}
          rows={[
            ["세로", "이름표가 입력창 위에 있습니다.", "항목이 적고 단순한 폼, 모달, 좁은 화면"],
            ["가로", "이름표가 입력창 왼쪽에 있습니다.", "항목이 많고 복잡한 폼, 설정 화면"],
            ["한 줄", "입력창과 버튼이 한 줄에 나란히 있습니다.", "항목이 한두 개인 폼(초대, 검색, 빠른 추가)"],
          ]}
        />
        <Demo caption="세로 배치">
          <VerticalForm />
        </Demo>
        <Demo caption="가로 배치 — 이름표 왼쪽 맞춤">
          <HorizontalForm align="left" />
        </Demo>
        <Demo caption="가로 배치 — 이름표 오른쪽 맞춤">
          <HorizontalForm align="right" />
        </Demo>
        <Demo caption="한 줄 배치">
          <Flex gap={2} alignItems="flex-end">
            <Flex direction="column" gap={1}>
              <Text tag="label" size={200} htmlFor="form-inline-mail">담당자 이메일</Text>
              <Input w={240}><Input.Value id="form-inline-mail" placeholder="이름@회사 주소" /></Input>
            </Flex>
            <Button use="primary" theme="info">초대</Button>
          </Flex>
        </Demo>
      </Section>

      <Section title="이름표">
        <Rules
          items={[
            <>굵기는 보통(400)입니다. 굵은 글자(700)는 꼭 눈에 띄어야 하는 이름표에만 드물게 씁니다.</>,
            "이름표 끝에 쌍점(:)을 붙이지 않습니다.",
            "꼭 채우지 않아도 되는 항목은 이름표 뒤에 \"(선택)\"을 회색으로 적습니다. 필수 항목에 별표를 붙이는 대신 선택 항목을 표시합니다.",
            "폼이 화면 가운데에 놓일 때는 가로 배치의 이름표를 오른쪽으로 맞출 수 있습니다.",
            "체크박스와 라디오는 이름표가 컨트롤 오른쪽에 붙습니다. 따로 이름표를 또 달지 않습니다.",
          ]}
        />
        <Table
          head={["입력창 크기", "이름표 글자", "토큰"]}
          rows={[
            ["M (32px)", "14px", <><Code>--ec-fs-200</Code>, <Code>--ec-lh-200</Code></>],
            ["L (44px)", "16px", <><Code>--ec-fs-300</Code>, <Code>--ec-lh-300</Code></>],
          ]}
        />
        <Demo caption="L 크기 폼 — 이름표도 16px로 키웁니다">
          <VerticalForm size="l" />
        </Demo>
      </Section>

      <Section title="안내 글자 (placeholder)">
        <Rules
          items={[
            "어떤 값을 넣어야 하는지 알려 줄 때 씁니다. 형식이나 조건을 적습니다(\"숫자 10자리\").",
            "이름표 대신 쓰지 않습니다. 값을 넣으면 사라져서, 다 채운 폼을 다시 읽기 어렵습니다.",
            "실제 값처럼 보이는 글자는 적지 않습니다. 이미 채워진 것으로 오해합니다.",
            "이름표만으로 무엇을 넣을지 분명하면 비워 둡니다.",
          ]}
        />
        <DoDont
          good={{
            demo: (
              <Flex direction="column" gap={1}>
                <Text tag="label" size={200} htmlFor="form-ph-good">사업자 번호</Text>
                <Input w={220}><Input.Value id="form-ph-good" placeholder="숫자 10자리" /></Input>
              </Flex>
            ),
            text: "이름표는 밖에 두고, 안내 글자에는 형식을 적습니다.",
          }}
          bad={{
            demo: <Input w={220}><Input.Value aria-label="사업자 번호" placeholder="123-45-67890" /></Input>,
            text: "이름표 없이 안내 글자만 두거나, 실제 값처럼 보이는 예를 적지 않습니다.",
          }}
        />
      </Section>

      <Section title="간격">
        <P>모든 간격은 4px의 배수입니다.</P>
        <Table
          head={["자리", "M", "L"]}
          rows={[
            ["이름표와 입력창 사이 (세로 배치)", <>4px <Code>--ec-spacing-1x</Code></>, <>8px <Code>--ec-spacing-2x</Code></>],
            ["이름표와 입력창 사이 (가로 배치)", <>16px <Code>--ec-spacing-4x</Code></>, <>16px <Code>--ec-spacing-4x</Code></>],
            ["입력 항목과 다음 항목 사이", <>16px <Code>--ec-spacing-4x</Code></>, <>24px <Code>--ec-spacing-6x</Code></>],
            ["마지막 항목과 버튼 사이", <>24px <Code>--ec-spacing-6x</Code></>, <>32px <Code>--ec-spacing-8x</Code></>],
            ["버튼과 버튼 사이", <>8px <Code>--ec-spacing-2x</Code></>, <>8px <Code>--ec-spacing-2x</Code></>],
          ]}
        />
        <P>서로 관련된 항목은 묶어서 가깝게 두고, 묶음과 묶음 사이는 32px로 벌립니다.</P>
      </Section>

      <Section title="세로 배치와 가로 배치 고르기">
        <P>짧고 단순하면 세로, 길고 복잡해서 천천히 읽게 해야 하면 가로를 씁니다.</P>
        <Table
          head={["배치", "이럴 때 씁니다", "좋은 점", "아쉬운 점"]}
          rows={[
            [
              "세로",
              "항목이 적고 단순합니다. 잘못 넣어도 쉽게 고칠 수 있습니다.",
              "가장 빨리 채웁니다. 위에서 아래로 한 줄로 읽힙니다. 이름표가 길어져도 자리가 넉넉합니다.",
              "세로 공간을 많이 씁니다. 항목이 아주 많은 폼에는 맞지 않습니다.",
            ],
            [
              "가로 · 이름표 왼쪽 맞춤",
              "항목이 많고 복잡합니다. 잘못 넣으면 결과가 커서 천천히 확인하며 채워야 합니다.",
              "세로 공간을 덜 씁니다. 이름표만 따라 훑어보기 쉽습니다.",
              "가로 공간을 많이 씁니다. 채우는 데 시간이 더 걸립니다. 이름표가 길면 줄이 바뀝니다. 화면을 크게 확대해 쓰는 사람은 이름표와 입력창을 짝짓기 어렵습니다.",
            ],
            [
              "가로 · 이름표 오른쪽 맞춤",
              "항목이 많고 복잡한데, 이름표와 입력창이 한눈에 이어져 보여야 합니다.",
              "이름표와 입력창이 붙어 있어 짝이 분명합니다. 왼쪽 맞춤보다 빨리 채웁니다.",
              "이름표의 시작 위치가 줄마다 달라 훑어보기 어렵습니다. 이름표가 길면 자리가 모자랍니다.",
            ],
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Flex direction="column" gap={3}>
                <Checkbox label="승인 결과를 이메일로 받기" />
                <Flex gap={2}>
                  <Button use="primary" theme="info">저장</Button>
                  <Button>취소</Button>
                </Flex>
              </Flex>
            ),
            text: "버튼에는 일어나는 일을 적고, 주요 버튼을 맨 앞에 하나만 둡니다.",
          }}
          bad={{
            demo: (
              <Flex gap={2} alignItems="center">
                <Input size="l" w={140}><Input.Value aria-label="거래처 이름" /></Input>
                <Button use="primary" theme="info">확인</Button>
              </Flex>
            ),
            text: "한 폼에서 크기가 다른 컨트롤을 섞지 않습니다. \"확인\"처럼 뜻이 흐린 버튼 글자도 피합니다.",
          }}
        />
        <Rules
          items={[
            "입력창의 폭은 들어갈 값의 길이에 맞춥니다. 우편번호 칸을 주소 칸만큼 넓히지 않습니다.",
            "미리 알 수 있는 값은 채워 둡니다(로그인한 사람의 부서, 오늘 날짜).",
            "항목이 많으면 뜻이 가까운 것끼리 묶고 묶음마다 작은 제목을 붙입니다.",
            "보내는 버튼은 비활성으로 두지 않습니다. 누르면 무엇이 빠졌는지 알려 줍니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

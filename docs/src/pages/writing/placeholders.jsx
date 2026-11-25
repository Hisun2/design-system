import React from "react";
import { Flex, Input, Select, Text, Textarea } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont } from "../../kit.jsx";

export const meta = { title: "입력 예시 문구", order: 7 };

const Field = ({ label, children, help }) => (
  <Flex direction="column" gap={1}>
    <Text size={200}>{label}</Text>
    {children}
    {help ? <Text size={100} color="text-secondary">{help}</Text> : null}
  </Flex>
);

export default function PlaceholdersPage() {
  return (
    <Page
      meta={meta}
      lead="입력 예시 문구(placeholder)는 빈 입력창 안에 흐리게 보이는 글입니다. 무엇을 하라고 시키는 글이 아니라, 어떤 값을 어떤 모양으로 넣는지 보여 주는 귀띔입니다."
    >
      <Section title="하는 일">
        <Rules
          items={[
            "이름표를 돕습니다. 이름표가 말한 것을 되풀이하지 않습니다.",
            "무엇을 넣어야 하는지 분명하게 합니다.",
            "실제로 넣을 수 있는 정확한 예를 보여 줍니다.",
            "이름표를 대신하지 않습니다. 입력을 시작하면 사라지기 때문입니다. 입력창에는 언제나 이름표가 있어야 합니다.",
            "꼭 알아야 하는 조건(글자 수, 필수 여부, 형식 제한)은 입력 예시에 적지 않습니다. 입력창 아래 도움말에 적습니다.",
            "이름표만으로 충분하면 비워 둡니다. 모든 입력창에 예시를 채우지 않습니다.",
          ]}
        />
        <DoDont
          good={{
            demo: (
              <Field label="이메일">
                <Input w={240}><Input.Value placeholder="name@example.com" aria-label="이메일" /></Input>
              </Field>
            ),
            text: "이름표는 무엇을, 예시는 어떤 모양으로 넣는지 알려 줍니다.",
          }}
          bad={{
            demo: (
              <Field label="이메일">
                <Input w={240}><Input.Value placeholder="이메일을 입력하세요" aria-label="이메일" /></Input>
              </Field>
            ),
            text: "이름표가 한 말을 되풀이하지 않습니다.",
          }}
        />
      </Section>

      <Section title="쓰는 법">
        <Rules
          items={[
            "값의 모양이 정해져 있으면 예시 값만 적습니다. \"2026-11-25\", \"02-1234-5678\".",
            "값의 모양이 자유로우면 \"예: \"를 붙여 예시임을 밝힙니다. \"예: 한빛상사\". 실제 값으로 잘못 읽히지 않게 하려는 것입니다.",
            "고르는 입력창에는 \"~ 선택\"으로 적습니다. \"담당자 선택\".",
            "찾는 입력창에는 무엇으로 찾을 수 있는지 적습니다. \"거래처 이름, 사업자등록번호\".",
            "문장으로 쓰지 않고 마침표를 붙이지 않습니다. \"~을 입력하세요\", \"~해 주세요\"로 끝내지 않습니다.",
            "드물게 문장이 필요한 넓은 입력창에서는 합쇼체 문장으로 쓰고 마침표를 붙입니다.",
            "예시는 입력창 폭 안에 들어가는 길이로 씁니다. 잘리는 예시는 쓰지 않습니다.",
            "예시의 날짜·숫자·전화번호는 날짜·숫자·단위 페이지의 형식을 따릅니다.",
          ]}
        />
        <Table
          head={["입력창", "이렇게 씁니다", "이렇게 쓰지 않습니다"]}
          rows={[
            ["거래처 이름", "예: 한빛상사", "거래처 이름을 입력해 주세요."],
            ["사업자등록번호", "123-45-67890", "숫자 10자리, '-' 포함"],
            ["전화번호", "02-1234-5678", "전화번호 입력"],
            ["날짜", "2026-11-25", "YYYY-MM-DD 형식으로 입력"],
            ["금액", "0", "금액(원)을 숫자만 입력하세요"],
            ["담당자 (선택 목록)", "담당자 선택", "선택하세요, -- 선택 --, 전체"],
            ["검색", "거래처 이름, 사업자등록번호", "검색어를 입력하세요"],
            ["비고", "(비워 둠)", "비고를 입력하세요"],
          ]}
        />
        <Demo caption="값의 모양에 따라">
          <Field label="사업자등록번호">
            <Input w={200}><Input.Value placeholder="123-45-67890" aria-label="사업자등록번호" /></Input>
          </Field>
          <Field label="거래처 이름">
            <Input w={200}><Input.Value placeholder="예: 한빛상사" aria-label="거래처 이름" /></Input>
          </Field>
          <Field label="담당자">
            <Select placeholder="담당자 선택" options={[{ value: 1, children: "김담당" }, { value: 2, children: "이담당" }]} />
          </Field>
        </Demo>
      </Section>

      <Section title="예시에 쓰는 값">
        <P>예시 값은 실제로 있는 사람, 회사, 주소가 아니어야 합니다. 아래 값을 씁니다.</P>
        <Table
          head={["종류", "예시 값"]}
          rows={[
            ["이메일", "name@example.com"],
            ["웹 주소", "https://example.com"],
            ["사람 이름", "홍길동, 김담당"],
            ["회사 이름", "한빛상사"],
            ["전화번호", "02-1234-5678, 010-1234-5678"],
            ["사업자등록번호", "123-45-67890"],
            ["날짜, 시간", "2026-11-25, 14:30"],
            ["금액", "0"],
          ]}
        />
        <Rules
          items={[
            "이메일과 웹 주소는 example.com을 씁니다. 실제 서비스의 주소를 쓰지 않습니다.",
            "실제 직원, 실제 거래처의 이름을 예시로 쓰지 않습니다.",
          ]}
        />
      </Section>

      <Section title="조건은 도움말에">
        <P>입력을 시작하면 입력 예시는 사라집니다. 입력하는 동안 계속 보여야 하는 말은 입력창 아래에 적습니다.</P>
        <DoDont
          good={{
            demo: (
              <Field label="반려 사유" help="승인 요청자에게 그대로 전달됩니다. 200자까지 쓸 수 있습니다.">
                <Textarea w={280} placeholder="예: 견적서가 첨부되지 않았습니다." aria-label="반려 사유" />
              </Field>
            ),
            text: "조건은 도움말에, 예시는 입력창 안에 둡니다.",
          }}
          bad={{
            demo: (
              <Field label="반려 사유">
                <Textarea w={280} placeholder="반려 사유를 200자 이내로 입력하세요. 요청자에게 전달됩니다." aria-label="반려 사유" />
              </Field>
            ),
            text: "입력을 시작하면 조건이 보이지 않습니다.",
          }}
        />
      </Section>
    </Page>
  );
}

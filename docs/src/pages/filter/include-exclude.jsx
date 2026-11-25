import React from "react";
import { Dropdown, FilterTrigger, BulkTextarea, RadioGroup, Radio, Button, Notice, Text, Flex, Box } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "포함·제외 낱말 필터", order: 6 };

const MAX_WORDS = 300;
const MAX_LENGTH = 255;
const validate = (line) => {
  if (line.length > MAX_LENGTH) return { isValid: false, errorMessage: `한 줄은 ${MAX_LENGTH}자까지 넣을 수 있습니다.` };
  if (/[<>{}|\\^~`]/.test(line)) return { isValid: false, errorMessage: "쓸 수 없는 기호가 들어 있습니다. 기호를 지워 주세요." };
  return { isValid: true, errorMessage: "" };
};

function WordsField({ value, onChange, label, withLogic, logic, onLogicChange }) {
  return (
    <Flex direction="column" gap={2}>
      {withLogic ? (
        <RadioGroup value={logic} onChange={onLogicChange} aria-label="낱말을 잇는 방식">
          <Flex gap={4}>
            <Radio value="all" label="모든 낱말" />
            <Radio value="any" label="어느 낱말이든" />
          </Flex>
        </RadioGroup>
      ) : null}
      <Text size={100} color="text-secondary">
        한 줄에 하나씩 넣습니다. [대괄호]로 감싸면 정확히 같은 것만 찾습니다.
      </Text>
      <BulkTextarea
        value={value}
        onChange={onChange}
        minRows={7}
        maxRows={7}
        maxLines={MAX_WORDS}
        linesDelimiters={["Enter", ",", ";"]}
        validateOn={["blurLine", "paste", "blur"]}
        lineValidation={validate}
      >
        <BulkTextarea.InputField aria-label={label} placeholder={["계약", "[공급 계약서]", "갱신"]} />
        <Flex justifyContent="space-between" alignItems="center" mt={2}>
          <BulkTextarea.ErrorsNavigation />
          <BulkTextarea.Counter />
        </Flex>
        <Flex gap={2} mt={3}>
          <BulkTextarea.ClearAll />
        </Flex>
      </BulkTextarea>
    </Flex>
  );
}

function WordsFilter({ name, shortName, withLogic }) {
  const [visible, setVisible] = React.useState(false);
  const [draft, setDraft] = React.useState([]);
  const [applied, setApplied] = React.useState([]);
  const [logic, setLogic] = React.useState("all");
  const clear = () => {
    setDraft([]);
    setApplied([]);
  };
  const apply = () => {
    setApplied(draft.map((l) => l.trim()).filter(Boolean));
    setVisible(false);
  };
  return (
    <Dropdown visible={visible} onVisibleChange={setVisible}>
      <Dropdown.Trigger tag={FilterTrigger} wMin={140} placeholder={name} empty={!applied.length} onClear={clear}>
        {`${shortName}: ${applied.length}개`}
      </Dropdown.Trigger>
      <Dropdown.Popper w={280} p={4} aria-label={name}>
        <WordsField value={draft} onChange={setDraft} label={name} withLogic={withLogic} logic={logic} onLogicChange={setLogic} />
        <Button use="primary" theme="info" w="100%" mt={3} onClick={apply}>적용</Button>
      </Dropdown.Popper>
    </Dropdown>
  );
}

function InlineField({ withLogic }) {
  const [value, setValue] = React.useState([]);
  const [logic, setLogic] = React.useState("all");
  // BulkTextarea는 브라우저에서만 그릴 수 있어, 화면에 붙은 뒤에 보여 줍니다.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <Box w={280} h={260} />;
  return (
    <Box w={280}>
      <WordsField value={value} onChange={setValue} label="낱말 입력" withLogic={withLogic} logic={logic} onLogicChange={setLogic} />
    </Box>
  );
}

export default function FilterIncludeExcludePage() {
  return (
    <Page
      meta={meta}
      lead="낱말을 여러 개 넣어, 그 낱말이 든 것만 남기거나(포함) 그 낱말이 든 것을 빼는(제외) 필터입니다. 문서 제목, 품목 이름, 메모처럼 글자로 된 열에 씁니다. 먼저 '필터 공통 규칙' 문서를 읽습니다."
    >
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "낱말을 많이 넣어야 할 때. 다른 곳에서 목록을 복사해 붙여 넣고 그 자리에서 고쳐야 할 때.",
            "넣은 낱말을 \"모두 들어 있는 것\" 또는 \"하나라도 들어 있는 것\"으로 골라 찾아야 할 때.",
            "낱말이 들어 있기만 하면 되는 것과 정확히 같은 것을 구분해 찾아야 할 때.",
          ]}
        />
        <P>낱말 하나로 찾는 것으로 충분하면 이 필터가 아니라 "검색 필터"를 씁니다.</P>
      </Section>

      <Section title="지켜야 할 것">
        <Rules
          items={[
            "많은 낱말을 복사해 붙여 넣을 수 있어야 합니다.",
            "붙여 넣은 내용이 한 줄에 하나씩 바르게 나뉘었는지 확인할 수 있어야 합니다.",
            "넣은 내용을 빨리 지우고 다시 찾을 수 있어야 합니다.",
            "넣은 내용을 고칠 수 있어야 합니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Demo caption="눌러서 낱말을 넣고 적용해 보세요">
          <WordsFilter name="포함할 낱말" shortName="포함" withLogic />
          <WordsFilter name="제외할 낱말" shortName="제외" />
        </Demo>
        <Sub title="필터 버튼">
          <Rules
            items={[
              <><Code>FilterTrigger</Code>를 씁니다.</>,
              "최소 폭은 140px입니다. 이보다 좁게 만들지 않습니다.",
              "자리가 넉넉하면 폭이 내용에 맞춰 늘어나게 둡니다. 글자가 잘리지 않습니다.",
              "적용한 뒤에는 적용된 낱말의 수를 보여 줍니다(\"포함: 12개\").",
              "\"포함할 낱말\", \"제외할 낱말\"이 다 들어가지 않으면 \"포함\", \"제외\"로 줄입니다.",
            ]}
          />
        </Sub>
        <Sub title="드롭다운">
          <Demo caption="포함 필터의 드롭다운 안 / 제외 필터의 드롭다운 안">
            <InlineField withLogic />
            <InlineField />
          </Demo>
          <Rules
            items={[
              "포함 필터에는 낱말을 잇는 방식을 고르는 라디오 버튼이 있습니다. \"모든 낱말\"은 넣은 낱말이 모두 든 것을, \"어느 낱말이든\"은 하나라도 든 것을 찾습니다. 제외 필터에는 없습니다.",
              "입력란은 기본 7줄 높이입니다.",
              "드롭다운이 열리면 입력란에 곧바로 초점이 갑니다.",
              "입력란 앞의 설명과 안내 글자(placeholder)로 \"들어 있는 것\"과 \"정확히 같은 것\"을 넣는 법을 알려 줍니다.",
              "대괄호 없이 넣은 낱말은 그 낱말이 들어 있는 것을 모두 찾습니다. [대괄호]로 감싼 낱말은 정확히 같은 것만 찾습니다.",
              "드롭다운의 폭은 224px보다 좁게 만들지 않습니다. 긴 낱말도 대부분 읽을 수 있어야 합니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="동작">
        <Sub title="낱말을 넣었을 때">
          <Rules
            items={[
              "Enter를 누르거나 쉼표(,) 또는 쌍반점(;)을 넣으면 다음 줄로 넘어갑니다. 한 줄이 조건 하나입니다.",
              "7줄을 넘으면 입력란 안에서 스크롤합니다.",
              "\"적용\"을 누르면 넣은 내용으로 걸러 내고, 필터 버튼에 적용된 낱말의 수를 보여 줍니다.",
              "\"모두 지우기\"는 입력란을 비웁니다. 그다음 \"적용\"을 누르면 빈 필터가 적용되어 필터가 풀립니다.",
              "넣기만 하고 적용하지 않은 내용은 화면을 새로 고치기 전까지 남겨 둡니다.",
            ]}
          />
        </Sub>
        <Sub title="줄과 대괄호">
          <Rules
            items={[
              "한 줄 안에 띄어 쓴 낱말들은 언제나 \"모두\"로 잇습니다. \"공급 계약\"은 두 낱말이 모두 든 것을 찾습니다.",
              "줄과 줄을 잇는 방식은 포함 필터의 라디오 버튼으로 바꿉니다.",
              "여는 대괄호만 넣고 쉼표를 넣거나 Enter를 누르면 그 줄의 대괄호를 닫아 줍니다. 닫는 대괄호만 넣었을 때도 짝을 맞춰 줍니다.",
              "줄 끝에 닫는 대괄호를 넣으면 커서를 다음 줄로 옮깁니다.",
              "대괄호 안에 대괄호를 또 넣을 수 없습니다. 대괄호 안에서 새 여는 대괄호를 넣거나 붙여 넣으면, 앞의 낱말을 닫고 새 줄로 넘깁니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="입력값 확인">
        <Rules
          items={[
            "잘못된 줄은 줄 맨 앞에 경고 아이콘을 붙여 표시합니다.",
            "\"적용\"을 누르면 쓸 수 없는 기호를 빼고 낱말만 남겨 적용합니다.",
          ]}
        />
        <Table
          head={["한도", "규칙"]}
          rows={[
            ["낱말의 수", `포함과 제외를 합쳐 ${MAX_WORDS}개까지입니다. 두 필터는 한도를 함께 씁니다. 입력란 아래에 지금 몇 개인지 보여 줍니다.`],
            ["낱말의 길이", `한 줄은 ${MAX_LENGTH}자까지입니다. 한 줄에 다 들어가지 않으면 다음 줄로 넘겨 보여 줍니다. 넘은 줄은 표시하고 설명 풍선으로 까닭을 알려 줍니다.`],
            ["기호", "찾는 데 쓸 수 없는 기호는 넣지 못하게 막습니다."],
          ]}
        />
        <Sub title="오류가 여러 개일 때">
          <Rules
            items={[
              "오류가 있는 줄이 여럿이면 입력란 아래에 오류의 수와 이전·다음으로 옮겨 다니는 버튼을 보여 줍니다.",
              "오류마다 무엇을 고쳐야 하는지 설명 풍선으로 알려 줍니다. 다른 오류로 옮기면 설명 풍선의 내용도 바뀝니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="간단한 모양으로 바꿔야 할 때">
        <Demo column>
          <Notice>
            <Notice.Content>
              지금 쓰는 브라우저에서는 줄마다 바로 확인해 드릴 수 없습니다. "적용"을 누르면 한꺼번에 확인합니다.
            </Notice.Content>
          </Notice>
        </Demo>
        <P>줄 번호, 줄마다의 오류 표시, 입력하는 즉시 확인하는 기능은 오래된 브라우저에서 동작하지 않을 수 있습니다. 그런 환경에서도 필터는 쓸 수 있어야 합니다.</P>
        <Rules
          items={[
            "지원하는 브라우저에서는 입력하는 즉시 확인하고, 잘못된 줄을 표시하고, 줄 번호를 보여 줍니다.",
            "지원하지 않는 브라우저에서는 일반 여러 줄 입력란으로 바꾸고, \"적용\"을 누른 뒤에만 확인합니다.",
            "이때는 어느 줄이 틀렸는지 짚어 줄 수 없으므로 오류를 한데 묶어 알려 줍니다(\"쓸 수 없는 기호가 든 줄이 3개 있습니다\").",
            "모양이 바뀌었다는 것과 그 까닭을 알림 상자로 알려 줍니다. 처음 입력하는 순간에 판단해 바꿉니다.",
          ]}
        />
      </Section>

      <Section title="찾은 것 없음">
        <P>결과가 없을 때는 표에 "찾은 것 없음" 안내와 필터를 지우는 버튼을 보여 줍니다. "필터 공통 규칙"을 따릅니다.</P>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <FilterTrigger onClear={() => {}}>포함: 12개</FilterTrigger>,
            text: "적용한 낱말이 많으므로 버튼에는 개수만 보여 줍니다.",
          }}
          bad={{
            demo: <FilterTrigger onClear={() => {}}>포함: 계약, 갱신, 공급, 견적…</FilterTrigger>,
            text: "넣은 낱말을 버튼에 죽 늘어놓지 않습니다.",
          }}
        />
      </Section>
    </Page>
  );
}

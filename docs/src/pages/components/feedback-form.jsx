import React from "react";
import { Dropdown, Button, Textarea, Input, Checkbox, Link, Text, Flex, Box } from "@ec21rnc/ui";
import { FeedbackForm } from "@ec21rnc/ui/feedback-form";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "FeedbackForm" };

const checkText = FeedbackForm.validate.description("의견은 세 낱말(10자) 이상 적어 주세요.");
const checkMail = FeedbackForm.validate.email("답변받을 메일 주소를 올바르게 적어 주세요.");

function Form({ id, onSubmit, onCancel, loading }) {
  return (
    <FeedbackForm onSubmit={onSubmit} loading={loading}>
      <Box p={4}>
        <Flex tag="label" direction="column" htmlFor={`${id}-text`}>
          <Text size={200} mb={2}>개선할 점이나 불편한 점을 알려 주세요</Text>
          <FeedbackForm.Item name="feedback" validate={checkText}>
            {({ input }) => <Textarea {...input} id={`${id}-text`} minRows={4} maxRows={8} />}
          </FeedbackForm.Item>
        </Flex>
        <Flex tag="label" direction="column" mt={4} htmlFor={`${id}-mail`}>
          <Text size={200} mb={2}>답변받을 메일</Text>
          <FeedbackForm.Item name="email" validate={checkMail}>
            {({ input }) => (
              <Input state={input.state}>
                <Input.Value {...input} id={`${id}-mail`} type="email" />
              </Input>
            )}
          </FeedbackForm.Item>
        </Flex>
        <Box mt={4}>
          <FeedbackForm.Item name="needHelp" type="checkbox">
            {({ input }) => <Checkbox {...input} label="도움이 필요합니다. 연락해 주세요" />}
          </FeedbackForm.Item>
        </Box>
        <Text tag="p" size={100} color="var(--ec-text-secondary)" mt={4} mb={0}>
          메일 주소는 이 의견에 답변하는 데만 씁니다. <Link href="#">개인정보 처리방침</Link>
        </Text>
        <Flex gap={2} mt={4}>
          <FeedbackForm.Submit>의견 보내기</FeedbackForm.Submit>
          <FeedbackForm.Cancel onClick={onCancel}>취소</FeedbackForm.Cancel>
        </Flex>
      </Box>
      <FeedbackForm.Notice>
        <Text size={200}>메일로도 보낼 수 있습니다. <Link href="mailto:help@example.com">help@example.com</Link></Text>
      </FeedbackForm.Notice>
    </FeedbackForm>
  );
}

function InDropdown() {
  const [visible, setVisible] = React.useState(false);
  const [status, setStatus] = React.useState("default");
  const timers = React.useRef([]);
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const onSubmit = () => {
    setStatus("loading");
    timers.current.push(setTimeout(() => setStatus("success"), 1000));
    timers.current.push(
      setTimeout(() => {
        setVisible(false);
        setStatus("default");
      }, 3500),
    );
  };

  return (
    <Dropdown visible={visible} onVisibleChange={setVisible}>
      <Dropdown.Trigger tag={Button} active={visible}>의견 보내기</Dropdown.Trigger>
      <Dropdown.Popper w={320} aria-label="의견 보내기">
        {status === "success" ? (
          <FeedbackForm.Success>의견을 보냈습니다. 고맙습니다.</FeedbackForm.Success>
        ) : (
          <Form id="popup" onSubmit={onSubmit} onCancel={() => setVisible(false)} loading={status === "loading"} />
        )}
      </Dropdown.Popper>
    </Dropdown>
  );
}

export default function FeedbackFormPage() {
  return (
    <Page meta={meta} lead="시스템에 대한 의견이나 개선 요청을 받는 작은 폼입니다. 대개 &quot;의견 보내기&quot; 링크나 버튼을 누르면 열립니다.">
      <Section title="구성">
        <Demo caption="폼의 모양 (실제로는 버튼을 눌러 여는 상자 안에 넣습니다)" column>
          <Box w={320} style={{ background: "var(--ec-bg-surface)", borderRadius: "var(--ec-radius-notice)" }}>
            <Form id="inline" onSubmit={() => {}} />
          </Box>
        </Demo>
        <Sub title="꼭 있어야 하는 것">
          <Rules
            items={[
              "의견을 적는 여러 줄 입력창",
              "보내기 버튼과 취소 버튼",
              "메일 주소를 받는다면, 그 주소를 어디에 쓰는지 알리는 글과 개인정보 처리방침 링크. 보내기 버튼 바로 위에 둡니다.",
            ]}
          />
        </Sub>
        <Sub title="필요할 때 넣는 것">
          <Rules
            items={[
              "답변받을 메일 입력창. 반드시 적게 만들 수도 있습니다.",
              "\"도움이 필요합니다. 연락해 주세요\" 체크박스.",
              "다른 방법으로 보내는 길을 알리는 글. 예: \"메일로도 보낼 수 있습니다. help@example.com\"",
            ]}
          />
        </Sub>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>FeedbackForm</Code>, "폼 전체입니다. 보낼 때 onSubmit이 불립니다. loading을 주면 폼 위에 큰 Spin이 덮입니다."],
            [<Code>FeedbackForm.Item</Code>, "입력 하나를 감쌉니다. 이름(name)과 검사 규칙(validate)을 주면 잘못됐을 때 설명 풍선을 띄웁니다."],
            [<Code>FeedbackForm.Submit</Code>, "보내기 버튼입니다."],
            [<Code>FeedbackForm.Cancel</Code>, "취소 버튼입니다."],
            [<Code>FeedbackForm.Notice</Code>, "폼 아래에 붙는 안내 줄입니다."],
            [<Code>FeedbackForm.Success</Code>, "보낸 뒤 폼 대신 보여 주는 고맙다는 글입니다."],
          ]}
        />
        <P>
          이 폼을 바탕으로 별점으로 묻는 폼(<Code>FeedbackRating</Code>)과 예·아니요로 묻는 폼도 만듭니다.
        </P>
      </Section>

      <Section title="놓는 자리">
        <Demo caption="버튼을 눌러 엽니다">
          <InDropdown />
        </Demo>
        <Rules
          items={[
            "대개 페이지 오른쪽 위의 \"의견 보내기\" 버튼이나 의견을 묻는 알림 상자에서 엽니다.",
            "페이지 제목 줄에 링크로 둘 때는 언제나 오른쪽 맨 끝에 둡니다.",
            "카드(위젯) 안의 \"의견 보내기\" 버튼에서 열기도 합니다.",
            "폼이 열려 있는 동안 연 버튼은 눌린(active) 상태로 보여 줍니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <P>사용자가 적다가 폼을 닫고 다시 열면, 적어 둔 내용이 그대로 남아 있어야 합니다.</P>
        <Sub title="의견 입력창">
          <Rules
            items={[
              "폼이 열리면 바로 의견 입력창에 커서를 둡니다.",
              "열 자 이상, 세 낱말 이상 적어야 보낼 수 있습니다. 모자란 채로 보내면 얼마나 적어야 하는지 설명 풍선으로 알립니다.",
              "사용자가 손으로 크기를 늘릴 수 없습니다. 네 줄을 넘게 적으면 줄 수에 맞춰 저절로 높아지고, 여덟 줄을 넘으면 입력창 안에서 스크롤합니다.",
              "이름표는 \"개선할 점이나 불편한 점을 알려 주세요\"로 적습니다.",
            ]}
          />
        </Sub>
        <Sub title="체크박스">
          <Rules
            items={[
              "이름표는 \"도움이 필요합니다. 연락해 주세요\"로 적습니다.",
              "체크한 의견은 기능을 맡은 담당자와 사용자 지원 담당자 양쪽에 함께 보냅니다. 지원 담당자가 사용자에게 연락할 수 있어야 합니다.",
            ]}
          />
        </Sub>
        <Sub title="버튼">
          <Rules
            items={[
              "보내기를 누르면 입력값을 검사합니다. 문제가 없으면 보내고 \"의견을 보냈습니다. 고맙습니다.\"를 보여 줍니다.",
              "고맙다는 글은 2.5초 보여 준 뒤 0.5초에 걸쳐 서서히 사라지며 폼이 닫힙니다.",
              "취소를 누르면 폼이 닫힙니다.",
            ]}
          />
        </Sub>
        <Sub title="보내는 중">
          <P>
            보내는 동안에는 폼 전체를 가장 큰 Spin으로 덮습니다. <Code>loading</Code>을 주면 됩니다. 두 번 보내는 것을 막습니다.
          </P>
        </Sub>
        <Sub title="보낸 뒤">
          <Rules
            items={[
              "폼 자리에 고맙다는 글을 보여 줍니다. 3~5초 뒤 저절로 닫힙니다.",
              "사용자가 바깥을 눌러 먼저 닫을 수도 있습니다.",
              "글은 \"의견을 보냈습니다. 고맙습니다.\"로 적습니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="검사">
        <Table
          head={["경우", "보이는 것", "알리는 글"]}
          rows={[
            ["의견을 적지 않음", "입력창이 잘못됨 상태가 되고 설명 풍선이 뜹니다.", "의견은 세 낱말(10자) 이상 적어 주세요."],
            ["의견이 열 자·세 낱말보다 짧음", "위와 같습니다.", "의견은 세 낱말(10자) 이상 적어 주세요."],
            ["메일을 적지 않음", "메일 입력창이 잘못됨 상태가 되고 설명 풍선이 뜹니다.", "메일 주소를 적어 주세요."],
            ["메일 주소의 꼴이 틀림", "위와 같습니다.", "답변받을 메일 주소를 올바르게 적어 주세요."],
          ]}
        />
        <Sub title="보내지 못했을 때">
          <Rules
            items={[
              "보내는 도중 오류가 나면 보내기 버튼 아래의 안내 줄 자리에 오류 글을 보여 줍니다.",
              <>안내 줄에 이미 메일 안내가 있었다면 그 글을 오류 글로 바꾸고 색을 빨강(<Code>--ec-text-critical</Code>)으로 바꿉니다.</>,
              "글은 \"의견을 보내지 못했습니다. 다시 시도하거나 help@example.com으로 보내 주세요.\"처럼 적습니다.",
              "사용자가 적은 내용은 지우지 않습니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "입력은 의견, 메일, 체크박스 정도로 짧게 둡니다. 적기 쉬워야 의견이 들어옵니다." }}
          bad={{ text: "부서, 직급, 분류처럼 물어볼 것을 늘리지 않습니다. 화면 한가운데에 띄워 일을 막지 않습니다." }}
        />
        <Rules
          items={[
            "이름표 끝에 쌍점(:)을 붙이지 않습니다.",
            "버튼은 \"의견 보내기\", \"취소\"처럼 동작을 나타내는 낱말로 끝냅니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

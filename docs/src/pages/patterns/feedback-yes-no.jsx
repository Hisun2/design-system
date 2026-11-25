import React from "react";
import { Button, Dropdown, Notice, Textarea, getIllustrationPath, Flex, Box, Text } from "@ec21rnc/ui";
import { FeedbackForm } from "@ec21rnc/ui/feedback-form";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "예/아니요 의견", order: 15 };

const validate = (value = "") => (value.trim().length < 10 ? "열 글자 이상 적어 주십시오." : undefined);

/** 예·아니요 버튼 하나와 거기서 열리는 의견 폼. */
function AnswerButton({ label, open, onOpenChange, onSent }) {
  const [sent, setSent] = React.useState(false);
  const onSubmit = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        setSent(true);
        resolve();
        setTimeout(onSent, 2500);
      }, 1000);
    });
  return (
    <Dropdown visible={open} onVisibleChange={onOpenChange} placement="bottom-start">
      <Dropdown.Trigger tag={Button} active={open}>{label}</Dropdown.Trigger>
      <Dropdown.Popper aria-label="의견 보내기" w={320}>
        {sent ? (
          <FeedbackForm.Success>의견을 보내 주셔서 고맙습니다.</FeedbackForm.Success>
        ) : (
          <FeedbackForm onSubmit={onSubmit}>
            <Box p={4}>
              <Flex tag="label" direction="column" gap={2}>
                <Text size={200}>바라는 점이나 불편한 점을 적어 주십시오</Text>
                <FeedbackForm.Item name="comment" validate={validate}>
                  {({ input }) => <Textarea {...input} autoFocus h={80} placeholder="예: 승인 버튼이 화면 아래에 있어 찾기 어렵습니다" />}
                </FeedbackForm.Item>
              </Flex>
            </Box>
            <Flex px={4} pb={4} gap={2}>
              <FeedbackForm.Submit>의견 보내기</FeedbackForm.Submit>
              <FeedbackForm.Cancel onClick={() => onOpenChange(false)}>취소</FeedbackForm.Cancel>
            </Flex>
          </FeedbackForm>
        )}
      </Dropdown.Popper>
    </Dropdown>
  );
}

function YesNoDemo({ closable }) {
  const [hidden, setHidden] = React.useState(false);
  const [open, setOpen] = React.useState(null);
  if (hidden) {
    return (
      <Flex alignItems="center" gap={3}>
        <Text size={200} color="text-secondary">알림이 닫혔습니다.</Text>
        <Button onClick={() => { setHidden(false); setOpen(null); }}>예시 다시 보기</Button>
      </Flex>
    );
  }
  const answer = (key, label) => (
    <AnswerButton
      label={label}
      open={open === key}
      onOpenChange={(next) => setOpen(next ? key : null)}
      onSent={() => setHidden(true)}
    />
  );
  return (
    <Notice theme="info" w="100%">
      <Notice.Label>
        <Box tag="img" src={getIllustrationPath("suggestion")} alt="" w={40} h={40} />
      </Notice.Label>
      <Notice.Content>
        <Notice.Text>승인 기록 화면이 새로 바뀌었습니다. 쓰기에 괜찮습니까?</Notice.Text>
        <Notice.Actions>
          <Flex gap={2}>
            {answer("yes", "예")}
            {answer("no", "아니요")}
            <Button use="tertiary" theme="info" onClick={() => setHidden(true)}>나중에 묻기</Button>
          </Flex>
        </Notice.Actions>
      </Notice.Content>
      {closable ? <Notice.Close onClick={() => setHidden(true)} /> : null}
    </Notice>
  );
}

export default function FeedbackYesNoPage() {
  return (
    <Page meta={meta} lead="새 기능을 알리면서 쓸 만한지 예/아니요로 가볍게 묻는 알림입니다. 알림 상자(Notice)와 의견 보내기 폼(FeedbackForm)으로 이루어집니다.">
      <Section title="구성">
        <Demo caption="'예'나 '아니요'를 누르면 그 버튼 아래로 의견 폼이 열립니다">
          <YesNoDemo />
        </Demo>
        <Table
          head={["요소", "규칙"]}
          rows={[
            ["그림", "글 왼쪽에 의견을 뜻하는 그림을 둡니다."],
            ["묻는 말", "새 기능을 소개하는 한 문장과 예/아니요로 답할 수 있는 물음 한 문장: \"승인 기록 화면이 새로 바뀌었습니다. 쓰기에 괜찮습니까?\""],
            ["\"예\", \"아니요\" 버튼", "누르면 의견 폼이 열립니다."],
            ["\"나중에 묻기\" 버튼", "늘 있습니다. 예, 아니요 뒤에 둡니다."],
            ["닫기 버튼", "선택입니다. 아래 '닫기' 규칙을 따릅니다."],
          ]}
        />
        <P>이 패턴에서는 물음에 대한 답이므로 예외로 "예", "아니요"를 버튼 글자로 씁니다. 다른 곳의 버튼에는 쓰지 않습니다.</P>
      </Section>

      <Section title="보이는 때">
        <Table
          head={["방식", "설명"]}
          rows={[
            ["화면과 함께", "업무 화면이 뜰 때 알림도 같이 뜹니다."],
            ["두 번째 방문부터 (권장)", "처음 방문에는 보이지 않고 두 번째 방문에서 처음 보입니다. 그 뒤로는 닫거나 \"나중에 묻기\"를 누를 때까지 보입니다."],
          ]}
        />
        <P>'방문'의 기준은 정해 쓰면 됩니다. 일정한 시간 간격, 다음 번 화면 열기, 데이터가 새로 바뀐 때 가운데 하나로 합니다.</P>
      </Section>

      <Section title="놓는 자리">
        <Rules
          items={[
            "보통 업무 화면이나 보고서의 맨 위에 둡니다.",
            "의견을 받고 싶은 기능 바로 옆에 둘 수도 있습니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Sub title={`"예", "아니요" 버튼`}>
          <Rules
            items={[
              "누른 버튼은 눌린 모양이 됩니다.",
              "의견 폼이 누른 버튼에서 아래로 열립니다.",
              "여러 줄 입력창에 바로 초점이 갑니다. 안내 글자로 무엇을 적으면 되는지 알려 줍니다.",
            ]}
          />
        </Sub>
        <Sub title={`"의견 보내기" 버튼`}>
          <Rules
            items={[
              "폼이 열려 있는 동안 폼을 연 버튼은 눌린 모양을 유지합니다.",
              "잘 보냈으면 폼 자리에 그림과 함께 \"의견을 보내 주셔서 고맙습니다.\"를 보입니다.",
              "2.5초 뒤 폼이 0.5초에 걸쳐 흐려지며 닫힙니다.",
              "0.5초 더 지나 알림 상자도 닫힙니다. 아래의 화면 내용이 0.5초에 걸쳐 부드럽게 올라옵니다.",
            ]}
          />
        </Sub>
        <Sub title={`"취소" 버튼`}>
          <Rules
            items={[
              "의견 폼만 닫습니다.",
              "알림 상자는 그대로 남습니다.",
            ]}
          />
        </Sub>
        <P>폼 안의 입력 검사, 로딩, 오류 표시는 의견 보내기 폼(FeedbackForm)의 규칙을 그대로 따릅니다.</P>
      </Section>

      <Section title="닫기">
        <Sub title={`"나중에 묻기" 버튼`}>
          <Rules
            items={[
              "누르면 알림 상자가 닫힙니다.",
              "아래의 화면 내용이 0.5초에 걸쳐 올라옵니다.",
              "다음 방문 때 알림이 다시 나옵니다.",
            ]}
          />
        </Sub>
        <Sub title="닫기 버튼">
          <Demo caption="닫기 버튼이 있는 모양">
            <YesNoDemo closable />
          </Demo>
          <Rules
            items={[
              "닫기 버튼은 의견을 보낼 다른 길(예: 페이지 머리의 \"의견 보내기\" 링크)이 있을 때만 둡니다.",
              "방법 1: 처음부터 늘 닫기 버튼을 둡니다.",
              "방법 2 (권장): 처음에는 두지 않습니다. 사용자가 \"나중에 묻기\"를 누른 뒤, 다음 방문에서 알림이 다시 나올 때부터 닫기 버튼을 보입니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="기억해 둘 것">
        <Rules
          items={[
            "의견을 보낸 사람에게는 이 알림을 다시 보이지 않습니다.",
            "보냈다는 사실은 사용자 정보에 저장합니다. 기기를 바꿔도 다시 묻지 않게 하기 위해서입니다.",
            "닫았는지, 언제 다시 보일지는 브라우저 저장소에 두어도 됩니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "새로 바꾼 화면 하나에 대해, 한 번에 하나만 묻습니다." }}
          bad={{ text: "닫아도 매번 다시 띄우거나, 한 화면에 묻는 알림을 여러 개 두지 않습니다." }}
        />
      </Section>
    </Page>
  );
}

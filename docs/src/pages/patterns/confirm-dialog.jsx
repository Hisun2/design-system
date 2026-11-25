import React from "react";
import { Button, Modal, Input, Flex, Text } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "확인 창", order: 3 };

/** 되돌릴 수 없는 동작 앞에서 한 번 더 묻는 창. */
function DeleteDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>문서 삭제</Button>
      <Modal visible={open} onClose={() => setOpen(false)} w={400}>
        <Modal.Title size={400}>문서를 삭제할까요?</Modal.Title>
        <Text tag="p" size={300} mt={0} mb={4}>
          '11월 거래 명세서'와 첨부 파일 3개가 함께 삭제됩니다. 삭제한 문서는 되돌릴 수 없습니다.
        </Text>
        <Flex gap={2}>
          <Button use="primary" theme="danger" size="l" onClick={() => setOpen(false)}>삭제</Button>
          <Button size="l" onClick={() => setOpen(false)}>취소</Button>
        </Flex>
      </Modal>
    </>
  );
}

/** 결과가 무거운 동작: 요구한 값을 직접 적어야 진행됩니다. */
function TypeToConfirmDemo() {
  const name = "가나다 상사";
  const [open, setOpen] = React.useState(false);
  const [typed, setTyped] = React.useState("");
  const close = () => {
    setOpen(false);
    setTyped("");
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>거래처 삭제</Button>
      <Modal visible={open} onClose={close} w={440}>
        <Modal.Title size={400}>거래처를 삭제할까요?</Modal.Title>
        <Text tag="p" size={300} mt={0} mb={4}>
          '{name}'에 딸린 문서 128건과 승인 기록이 모두 삭제됩니다. 다른 담당자도 더는 볼 수 없습니다.
        </Text>
        <Flex direction="column" gap={2} mb={4}>
          <Text tag="label" size={300} htmlFor="confirm-typed">계속하려면 거래처 이름을 적습니다</Text>
          <Input size="l"><Input.Value id="confirm-typed" value={typed} onChange={setTyped} placeholder={name} /></Input>
        </Flex>
        <Flex gap={2}>
          <Button use="primary" theme="danger" size="l" disabled={typed !== name} onClick={close}>거래처 삭제</Button>
          <Button size="l" onClick={close}>취소</Button>
        </Flex>
      </Modal>
    </>
  );
}

export default function ConfirmDialogPage() {
  return (
    <Page meta={meta} lead="방금 시킨 일을 정말 진행할지 한 번 더 묻는 작은 모달입니다. 생길 수 있는 문제나 잃게 될 데이터를 알리고, 마음을 바꿀 기회를 줍니다.">
      <Section title="구성">
        <P>Modal 컴포넌트로 만듭니다. 제목, 설명, 버튼 두 개로 이루어집니다.</P>
        <Demo caption="버튼을 누르면 확인 창이 열립니다">
          <DeleteDemo />
        </Demo>
        <Table
          head={["부분", "규칙"]}
          rows={[
            ["제목", <>무엇을 하려는지 묻는 한 문장입니다. 20px(<Code>--ec-fs-400</Code>).</>],
            ["설명", <>무엇이 바뀌거나 사라지는지 구체적으로 적습니다. 16px(<Code>--ec-fs-300</Code>).</>],
            ["진행 버튼", "일어나는 일의 이름을 적습니다(\"삭제\", \"승인 취소\"). 되돌릴 수 없으면 위험 색을 씁니다."],
            ["취소 버튼", "아무 일도 일어나지 않고 창이 닫힙니다. 항상 둡니다."],
          ]}
        />
        <Rules
          items={[
            "사용자가 글만 읽고도 무슨 일이 일어날지 알 수 있어야 합니다.",
            "닫기(×), 바깥 누르기, Esc는 모두 취소와 같게 동작합니다.",
            "내용이 길어 스크롤이 생기지 않게 합니다. 확인 창은 한눈에 읽혀야 합니다.",
          ]}
        />
      </Section>

      <Section title="언제 쓰는가">
        <Rules
          items={[
            "되돌릴 수 없는 동작 앞에 씁니다. 영구 삭제, 저장하지 않은 내용을 버리고 나가기 등입니다.",
            "결과가 무거운 동작 앞에 씁니다. 여러 사람에게 영향을 주는 설정 변경, 한꺼번에 승인·반려 등입니다.",
            "쉽게 되돌릴 수 있는 동작에는 쓰지 않습니다. 대신 실행한 뒤 '되돌리기'를 제공합니다.",
            "자주 하는 동작마다 띄우지 않습니다. 너무 자주 나오면 읽지 않고 누르게 됩니다.",
          ]}
        />
      </Section>

      <Section title="결과가 무거운 동작">
        <P>
          잘못 누르면 피해가 큰 동작은 버튼만으로 진행하지 않게 합니다. 무엇이 바뀌는지 정확히 적고, 요구한 값을 사용자가 직접 적어야 진행 버튼이 켜지게 합니다.
        </P>
        <Demo caption="거래처 이름을 그대로 적어야 삭제 버튼이 켜집니다">
          <TypeToConfirmDemo />
        </Demo>
        <Rules
          items={[
            "바뀌는 대상의 이름과 개수를 적습니다(\"문서 128건\").",
            "적어야 할 값은 대상의 이름처럼 사용자가 화면에서 확인할 수 있는 것으로 합니다.",
            "이때의 비활성 버튼은 예외입니다. 왜 꺼져 있는지 입력창 이름표가 설명합니다.",
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "제목은 \"문서를 삭제할까요?\"처럼 동작을 넣어 묻습니다. \"정말입니까?\", \"확인\"처럼 쓰지 않습니다.",
            "설명에는 결과를 적습니다. 제목을 되풀이하지 않습니다.",
            "진행 버튼의 글자는 제목의 동작과 같은 낱말을 씁니다.",
            "\"예\", \"아니요\", \"확인\"은 쓰지 않습니다. 제목을 읽지 않으면 뜻을 알 수 없습니다.",
          ]}
        />
        <DoDont
          good={{
            demo: (
              <Flex gap={2}>
                <Button use="primary" theme="danger">삭제</Button>
                <Button>취소</Button>
              </Flex>
            ),
            text: "버튼만 읽어도 무슨 일이 일어나는지 압니다.",
          }}
          bad={{
            demo: (
              <Flex gap={2}>
                <Button use="primary" theme="info">예</Button>
                <Button>아니요</Button>
              </Flex>
            ),
            text: "\"예/아니요\"는 질문을 다시 읽어야 뜻을 압니다. 삭제에 일반 색을 쓰지도 않습니다.",
          }}
        />
      </Section>

      <Section title="다른 것과의 구분">
        <Table
          head={["상황", "쓰는 것"]}
          rows={[
            ["되돌릴 수 없는 동작을 한 번 더 묻기", "확인 창"],
            ["끝난 일을 알리기만 하기", "짧은 알림(NoticeBubble)"],
            ["값을 받아야 하는 작업", "일반 모달 — '모달 안의 내용' 문서를 따릅니다"],
          ]}
        />
      </Section>
    </Page>
  );
}

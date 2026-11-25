import React from "react";
import { Button, Checkbox, Flex, Modal, Switch, Text } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont } from "../../kit.jsx";

export const meta = { title: "모달 문구", order: 9 };

function ModalDemo({ open, title, body, actions }) {
  const [visible, setVisible] = React.useState(false);
  const close = () => setVisible(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>{open}</Button>
      <Modal visible={visible} onClose={close}>
        <Modal.Title>{title}</Modal.Title>
        {body ? <Text tag="p" size={200} mt={2} mb={4}>{body}</Text> : null}
        <Flex gap={2} mt={4}>
          {actions.map((action, i) => (
            <Button key={i} use={i === 0 ? "primary" : "secondary"} theme={i === 0 ? action.theme ?? "info" : undefined} onClick={close}>
              {action.text}
            </Button>
          ))}
        </Flex>
      </Modal>
    </>
  );
}

export default function ModalsPage() {
  return (
    <Page
      meta={meta}
      lead="모달은 제목, 본문, 버튼이 이어져 한 문장이 되게 씁니다. 제목이 무엇을 할지 묻고, 본문이 결과를 알리고, 버튼이 제목의 낱말로 답합니다."
    >
      <Section title="한 문장으로 봅니다">
        <P>모달 하나를 문장 하나로 봅니다. 제목이 주어이고 버튼이 서술어입니다. 본문은 그 사이에서 대상을 설명합니다. 이렇게 보면 빠진 것과 어긋난 것이 바로 드러납니다.</P>
        <Table
          head={["자리", "하는 일", "쓰는 법", "예"]}
          rows={[
            ["제목", "무엇을 하려는지 알립니다.", "\"~할까요?\" 또는 명사로 끝냅니다. 한 줄에 들어가게 씁니다.", "문서를 삭제할까요?"],
            ["본문", "누르면 일어나는 일, 되돌릴 수 있는지를 알립니다.", "합쇼체 한두 문장. 제목을 되풀이하지 않습니다. 보탤 말이 없으면 비웁니다.", "삭제한 문서는 되돌릴 수 없습니다."],
            ["주요 버튼", "제목이 물은 동작을 실행합니다.", "제목에 쓴 낱말을 그대로 씁니다.", "삭제"],
            ["보조 버튼", "하려던 일을 그만둡니다.", "\"취소\". 안내만 하는 모달에는 두지 않습니다.", "취소"],
          ]}
        />
        <Demo caption="제목 — 본문 — 버튼이 한 문장으로 이어집니다">
          <ModalDemo
            open="문서 삭제"
            title="문서를 삭제할까요?"
            body="삭제한 문서는 되돌릴 수 없습니다."
            actions={[{ text: "삭제", theme: "danger" }, { text: "취소" }]}
          />
        </Demo>
      </Section>

      <Section title="간단한 모달">
        <Rules
          items={[
            "바로 본론을 적습니다. \"정말\", \"진짜로\", \"확실히\"로 시작하지 않습니다.",
            "\"~하시겠습니까?\" 대신 \"~할까요?\"로 묻습니다.",
            "제목에서 쓴 동작 낱말을 버튼에서 다른 낱말로 바꾸지 않습니다. 제목이 \"삭제\"면 버튼도 \"삭제\"입니다.",
            "버튼에 \"확인\", \"예\", \"아니요\"를 쓰지 않습니다. 버튼만 읽어도 무슨 일이 일어나는지 알 수 있어야 합니다.",
            "대상이 여럿이면 개수를 적습니다. \"문서 3건을 삭제할까요?\"",
            "대상의 이름을 넣을 때는 이름 뒤에 종류를 적어 조사가 어긋나지 않게 합니다. \"한빛상사 거래처를 삭제할까요?\"",
            "되돌릴 수 없는 일은 본문에서 그 사실을 한 문장으로 알립니다. 겁을 주는 말(\"주의\", \"경고\", 느낌표)은 붙이지 않습니다.",
            "제목이 이미 다 말했으면 본문을 비웁니다. 같은 말을 길게 풀어 다시 적지 않습니다.",
          ]}
        />
        <Table
          head={["", "제목", "본문", "버튼"]}
          rows={[
            ["이렇게 씁니다", "문서를 삭제할까요?", "삭제한 문서는 되돌릴 수 없습니다.", "삭제 / 취소"],
            ["이렇게 쓰지 않습니다", "정말 삭제하시겠습니까?", "삭제하시면 복구가 불가능하오니 신중히 결정하시기 바랍니다.", "확인 / 취소"],
            ["이렇게 쓰지 않습니다", "문서를 삭제할까요?", "삭제한 문서는 되돌릴 수 없습니다.", "제거 / 아니요"],
            ["이렇게 씁니다", "승인 요청을 취소할까요?", "취소하면 승인자의 목록에서 사라집니다.", "요청 취소 / 닫기"],
            ["이렇게 쓰지 않습니다", "승인 요청을 취소할까요?", "", "취소 / 취소"],
            ["이렇게 씁니다", "저장하지 않고 나갈까요?", "작성 중인 내용이 사라집니다.", "나가기 / 계속 작성"],
            ["이렇게 쓰지 않습니다", "알림", "변경 사항이 저장되지 않았습니다. 계속하시겠습니까?", "예 / 아니요"],
          ]}
        />
        <P>
          동작 자체가 "취소"인 모달에서는 보조 버튼을 "닫기"로 적습니다. "취소"가 두 번 나오면 어느 쪽이 무엇을 취소하는지 알 수 없습니다.
        </P>
        <Demo caption="눌러서 비교해 봅니다">
          <ModalDemo
            open="이렇게 씁니다"
            title="저장하지 않고 나갈까요?"
            body="작성 중인 내용이 사라집니다."
            actions={[{ text: "나가기" }, { text: "계속 작성" }]}
          />
          <ModalDemo
            open="이렇게 쓰지 않습니다"
            title="알림"
            body="변경 사항이 저장되지 않았습니다. 계속하시겠습니까?"
            actions={[{ text: "예" }, { text: "아니요" }]}
          />
        </Demo>
      </Section>

      <Section title="안내만 하는 모달">
        <Rules
          items={[
            "읽고 닫기만 하면 되는 모달의 버튼은 \"확인\" 하나입니다.",
            "제목에는 일어난 일을 적습니다. \"알림\", \"안내\", \"확인\" 같은 제목은 쓰지 않습니다.",
            "닫아도 되는 짧은 완료 알림은 모달로 띄우지 않습니다. 화면 구석의 알림으로 보여 줍니다.",
          ]}
        />
        <Demo>
          <ModalDemo
            open="점검 안내 보기"
            title="2026-11-28 02:00~04:00에 시스템을 점검합니다"
            body="점검하는 동안에는 문서를 열거나 저장할 수 없습니다. 작성 중인 문서는 점검 전에 저장하세요."
            actions={[{ text: "확인" }]}
          />
        </Demo>
      </Section>

      <Section title="복잡한 창">
        <P>입력창과 선택지가 여럿 들어가는 창도 긴 문장 하나로 봅니다. 간단한 모달의 규칙을 그대로 따르고, 같은 종류의 요소는 같은 모양으로 씁니다.</P>
        <Rules
          items={[
            "제목은 이 창에서 하는 일을 명사로 적습니다. \"승인 요청\", \"거래처 추가\".",
            "주요 버튼은 제목의 동작을 그대로 받습니다. 제목이 \"승인 요청\"이면 버튼도 \"승인 요청\"입니다. \"저장\", \"확인\"으로 바꾸지 않습니다.",
            "확인란은 모두 같은 끝맺음으로 씁니다. \"~하기\"로 썼으면 모두 \"~하기\"입니다.",
            "스위치는 켜고 끄는 대상을 명사로 적습니다. \"자동 저장\", \"승인 알림\". \"~ 사용\", \"~ 켜기\"를 붙이지 않습니다.",
            "확인란과 스위치를 부정문으로 쓰지 않습니다. \"알림 받지 않기\"가 아니라 \"알림 받기\"입니다.",
            "입력창 이름표는 명사로 적고 쌍점을 붙이지 않습니다.",
            "구역을 나눌 때는 구역 제목도 모두 명사로 맞춥니다.",
          ]}
        />
        <DoDont
          good={{
            demo: (
              <Flex direction="column" gap={2}>
                <Checkbox label="승인자에게 이메일 보내기" defaultChecked />
                <Checkbox label="참조자에게 사본 보내기" />
                <Switch><Switch.Value defaultChecked aria-label="자동 저장" /><Switch.Addon>자동 저장</Switch.Addon></Switch>
                <Switch><Switch.Value aria-label="승인 알림" /><Switch.Addon>승인 알림</Switch.Addon></Switch>
              </Flex>
            ),
            text: "확인란은 모두 \"~하기\", 스위치는 모두 명사입니다.",
          }}
          bad={{
            demo: (
              <Flex direction="column" gap={2}>
                <Checkbox label="승인자에게 이메일을 보냅니다." defaultChecked />
                <Checkbox label="참조자 사본 발송 안 함" />
                <Switch><Switch.Value defaultChecked aria-label="자동 저장" /><Switch.Addon>자동 저장 사용하기</Switch.Addon></Switch>
                <Switch><Switch.Value aria-label="승인 알림" /><Switch.Addon>승인되면 알려 드릴까요?</Switch.Addon></Switch>
              </Flex>
            ),
            text: "같은 종류의 요소인데 끝맺음이 모두 다르고, 부정문이 섞였습니다.",
          }}
        />
      </Section>

      <Section title="점검">
        <Rules
          items={[
            "제목과 주요 버튼만 읽어도 무슨 일이 일어나는지 알 수 있습니까?",
            "제목의 동작 낱말과 버튼의 낱말이 같습니까?",
            "본문이 제목을 되풀이하고 있지 않습니까?",
            "되돌릴 수 없는 일이라면 그 사실을 적었습니까?",
            "같은 종류의 요소가 같은 모양으로 끝납니까?",
          ]}
        />
      </Section>
    </Page>
  );
}

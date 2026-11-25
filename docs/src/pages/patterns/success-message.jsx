import React from "react";
import { Button, Modal, Notice, noticeBubbleDefaultManager, getIllustrationPath, Flex, Box, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "완료 안내", order: 8 };

/** 완료 안내의 기본 모양: 모두 가운데 맞춤. */
function SuccessContent({ onClose }) {
  return (
    <Flex direction="column" alignItems="center">
      <Box tag="img" src={getIllustrationPath("congrats")} alt="" w={120} h={120} mb={4} />
      <Text tag="h3" size={400} bold m={0} mb={2} textAlign="center">승인을 요청했습니다</Text>
      <Text tag="p" size={200} m={0} textAlign="center">담당자가 승인하면 이메일로 알려 드립니다.</Text>
      <Button use="primary" theme="info" size="l" mt={6} onClick={onClose}>문서 목록으로</Button>
    </Flex>
  );
}

function ModalDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>승인 요청</Button>
      <Modal visible={open} onClose={() => setOpen(false)} w={400}>
        <SuccessContent onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
}

/** 폼을 보낸 자리에 그대로 완료 안내를 보입니다. 몇 초 뒤 스스로 닫힙니다. */
function InPlaceDemo() {
  const [sent, setSent] = React.useState(false);
  React.useEffect(() => {
    if (!sent) return undefined;
    const timer = setTimeout(() => setSent(false), 4000);
    return () => clearTimeout(timer);
  }, [sent]);
  return sent ? (
    <Notice theme="success" w={360}>
      <Notice.Content>
        <Notice.Text>초대를 보냈습니다.</Notice.Text>
      </Notice.Content>
      <Notice.Close onClick={() => setSent(false)} />
    </Notice>
  ) : (
    <Button onClick={() => setSent(true)}>담당자 초대 보내기</Button>
  );
}

export default function SuccessMessagePage() {
  return (
    <Page meta={meta} lead="시킨 일이 끝났음을 알리는 시스템의 응답입니다. 사용자는 목적이 있어서 화면을 씁니다. 그 목적을 이뤘다는 것을 분명히 알려 줍니다.">
      <Section title="모양">
        <Demo caption="버튼을 누르면 완료 안내가 모달로 열립니다">
          <ModalDemo />
        </Demo>
        <Table
          head={["부분", "규칙"]}
          rows={[
            ["맞춤", "모든 내용을 가운데로 맞춥니다."],
            ["제목", <>20px(<Code>--ec-fs-400</Code>, <Code>--ec-lh-400</Code>), 색 <Code>--ec-text-primary</Code>, 아래 여백 8px.</>],
            ["설명", <>14px(<Code>--ec-fs-200</Code>, <Code>--ec-lh-200</Code>), 색 <Code>--ec-text-primary</Code>.</>],
            ["버튼", "없어도 됩니다. 둘 때는 L 크기로 합니다."],
            ["그림", "없어도 됩니다. 둘 때는 제목 위에 놓습니다."],
          ]}
        />
      </Section>

      <Section title="언제 쓰는가">
        <Table
          head={["일이 끝난 계기", "예"]}
          rows={[
            ["사용자가 직접 보낸 것", "폼 제출, 승인 요청, 초대 보내기"],
            ["자동으로 일어난 것", "자동 저장"],
            ["사용자가 시작한 뒤 시간이 걸린 것", "데이터 내보내기, 여러 문서 한꺼번에 승인"],
          ]}
        />
      </Section>

      <Section title="놓는 자리와 때">
        <Rules
          items={[
            "사용자가 지금 쓰고 있는 요소 안이나 바로 옆에 보입니다. 무엇에 대한 안내인지 바로 알 수 있어야 합니다.",
            "일이 끝난 바로 그때 보입니다. 어떤 동작의 결과인지 헷갈리지 않아야 합니다.",
            "다음에 무엇을 하면 되는지 분명히 적습니다. 할 일이 없으면 끝났다는 사실만 알립니다.",
            "사용자는 언제든 완료 안내를 닫을 수 있어야 합니다. 닫기 버튼과 Esc 키를 모두 지원합니다.",
          ]}
        />
        <Demo caption="폼을 보낸 자리에 그대로 보입니다. 4초 뒤 스스로 닫힙니다.">
          <InPlaceDemo />
        </Demo>
        <P>예를 들어 의견 보내기 폼을 다 보냈으면, 그 폼이 있던 자리(폼을 연 버튼 옆)에 완료 안내를 보입니다.</P>
      </Section>

      <Section title="닫는 법">
        <Rules
          items={[
            "\"닫기\"나 다음 할 일을 적은 버튼을 누릅니다.",
            "닫기(×)를 누릅니다.",
            "모달이면 바깥을 누릅니다.",
            "3~5초 뒤 스스로 닫히게 할 수도 있습니다. 이때는 읽기 전에 사라져 불편하지 않은지 실제로 써 보고 정합니다.",
          ]}
        />
      </Section>

      <Section title="다른 방법">
        <Sub title="짧은 알림 (NoticeBubble)">
          <P>큰 흐름 가운데 작은 한 단계가 끝났을 때는 짧은 알림으로 충분합니다. 하던 일을 멈추지 않게 합니다.</P>
          <Demo>
            <Button onClick={() => noticeBubbleDefaultManager.add({ children: "저장했습니다.", initialAnimation: true, duration: 4000 })}>저장</Button>
          </Demo>
        </Sub>
        <Sub title="알림 상자 (Notice)">
          <P>화면 안에 머물러 있어야 하는 완료 안내는 성공 색 알림 상자로 보입니다.</P>
          <Demo>
            <Notice theme="success" w={420}>
              <Notice.Content>
                <Notice.Title>문서 12건을 승인했습니다</Notice.Title>
                <Notice.Text>승인한 문서는 승인 기록에서 다시 볼 수 있습니다.</Notice.Text>
              </Notice.Content>
            </Notice>
          </Demo>
        </Sub>
        <Table
          head={["방법", "언제"]}
          rows={[
            ["모달 또는 화면 안의 완료 안내 (이 문서)", "하나의 흐름이 완전히 끝났고, 다음 할 일을 안내해야 할 때"],
            ["짧은 알림", "저장·복사·삭제처럼 작은 동작이 끝났을 때"],
            ["알림 상자", "결과를 화면에 계속 남겨 두어야 할 때"],
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "끝난 일을 과거형 합쇼체로 적습니다: \"저장했습니다\", \"초대를 보냈습니다\".",
            "\"성공\", \"완료\"만 적지 않습니다. 무엇이 끝났는지 적습니다.",
            "버튼에는 다음에 갈 곳이나 할 일을 적습니다: \"문서 목록으로\", \"닫기\".",
          ]}
        />
        <DoDont
          good={{ text: "\"승인을 요청했습니다. 담당자가 승인하면 이메일로 알려 드립니다.\"" }}
          bad={{ text: "\"성공!\" — 무엇이 끝났는지, 다음에 무슨 일이 있는지 알 수 없습니다." }}
        />
      </Section>
    </Page>
  );
}

import React from "react";
import { Modal, Button, Text, Input, Flex, Box, SpinContainer } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Modal" };

function ConfirmExample() {
  const [visible, setVisible] = React.useState(false);
  const close = () => setVisible(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>확인 모달 열기</Button>
      <Modal visible={visible} onClose={close} w={400}>
        <Modal.Title>문서를 삭제할까요?</Modal.Title>
        <Text tag="p" size={200} mt={0} mb={4}>삭제한 문서는 되돌릴 수 없습니다.</Text>
        <Flex gap={2}>
          <Button use="primary" theme="danger" size="l" onClick={close}>삭제</Button>
          <Button size="l" onClick={close}>취소</Button>
        </Flex>
      </Modal>
    </>
  );
}

function FormExample() {
  const [visible, setVisible] = React.useState(false);
  const close = () => setVisible(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>폼 모달 열기</Button>
      <Modal visible={visible} onClose={close} w={400}>
        <Modal.Title>거래처 추가</Modal.Title>
        <Flex direction="column" mb={4}>
          <Text tag="label" htmlFor="modal-partner-name" size={300} mb={2}>거래처 이름</Text>
          <Input size="l">
            <Input.Value id="modal-partner-name" autoFocus />
          </Input>
        </Flex>
        <Flex gap={2}>
          <Button use="primary" theme="info" size="l" onClick={close}>추가</Button>
          <Button size="l" onClick={close}>취소</Button>
        </Flex>
      </Modal>
    </>
  );
}

function NestedExample() {
  const [first, setFirst] = React.useState(false);
  const [second, setSecond] = React.useState(false);
  return (
    <>
      <Button onClick={() => setFirst(true)}>모달 위에 모달 열기</Button>
      <Modal visible={first} onClose={() => setFirst(false)} w={480}>
        <Modal.Title>거래처 수정</Modal.Title>
        <Text tag="p" size={200} mt={0} mb={4}>고친 내용이 아직 저장되지 않았습니다.</Text>
        <Flex gap={2}>
          <Button use="primary" theme="info" size="l" onClick={() => setFirst(false)}>저장</Button>
          <Button size="l" onClick={() => setSecond(true)}>저장하지 않고 닫기</Button>
        </Flex>
      </Modal>
      <Modal visible={second} onClose={() => setSecond(false)} w={360}>
        <Modal.Title>고친 내용을 버릴까요?</Modal.Title>
        <Text tag="p" size={200} mt={0} mb={4}>닫으면 적어 둔 내용이 사라집니다.</Text>
        <Flex gap={2}>
          <Button
            use="primary"
            theme="danger"
            size="l"
            onClick={() => {
              setSecond(false);
              setFirst(false);
            }}
          >
            버리기
          </Button>
          <Button size="l" onClick={() => setSecond(false)}>계속 수정</Button>
        </Flex>
      </Modal>
    </>
  );
}

function LoadingExample() {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>불러오는 모달 열기</Button>
      <Modal visible={visible} onClose={() => setVisible(false)} w={400}>
        <Modal.Title>승인 내역</Modal.Title>
        <SpinContainer loading size="xxl">
          <Box h={160} />
        </SpinContainer>
      </Modal>
    </>
  );
}

export default function ModalPage() {
  return (
    <Page meta={meta} lead="화면 위에 떠서 중요한 내용을 보여 주거나 답을 받는 대화 상자입니다. 떠 있는 동안 아래 화면은 보이지만 쓸 수 없고, 사용자가 일을 끝내거나 닫을 때까지 남아 있습니다.">
      <Section title="언제 쓰는가">
        <Demo>
          <ConfirmExample />
          <FormExample />
        </Demo>
        <Sub title="씁니다">
          <Rules
            items={[
              "딸린 내용을 보여 줄 때. 설정, 작은 폼, 단계를 밟는 일, 어떤 값의 자세한 정보가 그런 예입니다.",
              "한 가지 요청이나 일에 눈길을 모을 때. 실행을 확인받거나 값을 추가하는 경우입니다.",
              "꼭 봐야 하는 중요한 내용을 알릴 때. 한도 도달, 항목 삭제, 내용이 사라지는 경우입니다.",
              "그림이나 영상을 크게 볼 때.",
            ]}
          />
        </Sub>
        <Sub title="쓰지 않습니다">
          <Rules
            items={[
              "화면이나 시스템의 오류를 알리는 데 쓰지 않습니다.",
              "그 화면의 주된 일을 하는 데 꼭 필요한 내용을 모달에 넣지 않습니다.",
              "사용자가 화면에서 아무것도 하기 전에 띄우지 않습니다. 한도 안내만 예외입니다.",
              "내용이 많으면 모달이 맞는지 다시 봅니다. FullscreenModal이나 별도 페이지가 낫습니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="구성">
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>Modal</Code>, <>전체입니다. <Code>visible</Code>로 열고 닫고, <Code>onClose</Code>로 닫힘을 받습니다.</>],
            [<Code>Modal.Overlay</Code>, "아래 화면을 덮는 어두운 막입니다."],
            [<Code>Modal.Window</Code>, "내용이 담기는 흰 상자입니다."],
            [<Code>Modal.Title</Code>, "제목입니다."],
            ["내용", "제목 아래에 자유롭게 넣습니다."],
            [<Code>Modal.Close</Code>, <>오른쪽 위의 닫기 버튼입니다. 기본으로 들어가고 <Code>closable={"{false}"}</Code>로 뺄 수 있습니다.</>],
          ]}
        />
        <P>보통은 Modal 안에 제목과 내용만 넣으면 막, 상자, 닫기 버튼이 알아서 들어갑니다.</P>
      </Section>

      <Section title="종류">
        <Rules
          items={[
            "기본 모달: 내용 구역이 하나이거나 둘입니다.",
            "Carousel을 담은 모달: 그림을 넘겨 가며 크게 봅니다.",
            "FullscreenModal: 화면 전체를 덮습니다. 이것도 구역이 하나이거나 둘입니다.",
          ]}
        />
      </Section>

      <Section title="크기와 자리">
        <Rules
          items={[
            "데스크톱에서 폭은 320px보다 좁아질 수 없습니다.",
            "기본 자리는 브라우저 창의 가로·세로 한가운데입니다.",
            "내용이 커서 모달이 커져야 하면 네 변 모두 창에서 40px씩 띄웁니다.",
            "쓰는 동안 모달의 크기가 달라지면 위쪽을 창에서 40px 띄운 자리에 고정합니다. 가운데에 두면 크기가 바뀔 때마다 모달이 위아래로 움직입니다.",
          ]}
        />
        <Sub title="창 크기가 바뀔 때">
          <Table
            head={["바뀜", "모달이 하는 일"]}
            rows={[
              ["창이 세로로 커짐", "크기는 그대로이고 가운데에 머뭅니다."],
              ["창이 세로로 작아짐", "들어갈 자리가 있는 동안은 가운데에 머뭅니다. 위아래 최소 간격에 닿으면 아래로 넘치고 스크롤이 생깁니다."],
              ["창이 가로로 작아짐", "폭 320px까지 창에 맞춰 줄어듭니다. 이때 양옆 간격은 12px를 지킵니다."],
            ]}
          />
          <Rules
            items={[
              "휴대 기기에서는 모달을 피합니다.",
              "휴대 기기에서 꼭 써야 하면 모달을 연 화면으로 돌아가는 링크를 넣습니다.",
              "내용이 길어 스크롤해야 하면 닫기 버튼을 위와 아래에 모두 두거나, 머리 영역과 함께 고정합니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="스크롤">
        <Rules
          items={[
            "모달이 창보다 길면 위에서 40px 띄운 자리에 두고 모달 전체를 스크롤합니다.",
            "모달이 떠 있는 동안 막 아래의 화면은 스크롤되지 않습니다.",
            "모달 안의 표 같은 요소는 그것만 따로 스크롤할 수 있습니다. 이때는 ScrollArea를 씁니다.",
            "필요하면 버튼 줄처럼 늘 보여야 하는 부분을 고정할 수 있습니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Sub title="열기">
          <Rules
            items={[
              "모달이 열리면 키보드 초점이 모달 안으로 들어갑니다.",
              "폼이 들어 있으면 첫 입력창이나 첫 누름 요소에 초점을 둡니다.",
            ]}
          />
        </Sub>
        <Sub title="모달 위에 모달 열기">
          <Demo>
            <NestedExample />
          </Demo>
          <Rules
            items={[
              "다른 방법이 없을 때만 모달 위에 모달을 엽니다.",
              "아래 모달을 닫지 않습니다. 닫아 버리면 앞 단계로 돌아갈 수 없다고 느낍니다.",
              "아래 모달 위에 막을 한 겹 더 덮어 어느 것이 위인지 분명히 합니다. 두 번째 막은 첫 번째 막보다 옅습니다.",
            ]}
          />
        </Sub>
        <Sub title="닫기">
          <Table
            head={["닫는 방법", <>onClose가 받는 값</>]}
            rows={[
              ["오른쪽 위 닫기 버튼", <Code>onCloseClick</Code>],
              ["Esc 키", <Code>onEscape</Code>],
              ["모달 바깥(막)을 누름", <Code>onOutsideClick</Code>],
              ["주요 버튼 · 취소 버튼", "버튼의 onClick에서 직접 닫습니다."],
              ["브라우저의 뒤로 가기", "아래 화면은 달라지지 않습니다."],
            ]}
          />
          <Rules
            items={[
              "닫힌 뒤 초점은 언제나 모달을 연 요소로 돌아갑니다.",
              "실수로 닫았을 때 잃는 것이 크면, 닫기 전에 내용이 사라진다고 알립니다.",
              "닫았다가 다시 열어도 적어 둔 내용이 남아 있게 합니다. 그럴 수 없으면 닫으면 사라진다고 미리 알립니다.",
            ]}
          />
        </Sub>
        <Sub title="불러오는 중">
          <Demo>
            <LoadingExample />
          </Demo>
          <Rules
            items={[
              "내용을 불러오거나 다시 불러올 때 내용 위에 SpinContainer를 덮습니다.",
              "돌아가는 표시는 가장 큰 크기(XXL)를 쓰고 내용의 한가운데에 둡니다.",
              "필요하면 표시 아래에 글을 덧붙입니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "사용자에게 무언가를 하게 하는 모달은 제목을 짧고 분명하게 씁니다. 서너 낱말을 넘기지 않습니다.",
            "확인을 받는 모달은 제목을 물음으로 쓰고(\"문서를 삭제할까요?\"), 버튼이 그 물음에 답하게 합니다(\"삭제\", \"취소\").",
            "주요 버튼에 \"확인\", \"예\"처럼 두루뭉술한 말을 쓰지 않습니다. 무엇이 일어나는지 읽는 데 시간이 더 걸립니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Flex gap={2}>
                <Button use="primary" theme="danger">삭제</Button>
                <Button>취소</Button>
              </Flex>
            ),
            text: "버튼은 제목과 같은 쪽에 맞추고, 눈에 띄는 버튼은 둘까지만 둡니다. 주요 버튼은 하나입니다.",
          }}
          bad={{
            demo: (
              <Flex gap={2}>
                <Button use="primary" theme="info">확인</Button>
                <Button>예</Button>
                <Button>아니요</Button>
              </Flex>
            ),
            text: "뜻이 흐린 버튼을 여럿 늘어놓지 않습니다.",
          }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Rules
          items={[
            "내용이 많거나 넓은 자리가 필요하면 FullscreenModal을 씁니다.",
            "아래 화면을 보면서 딸린 내용을 다뤄야 하면 SidePanel을 씁니다.",
            "방금 한 일의 결과를 잠깐 알리는 데는 NoticeBubble을, 화면에 머무는 알림에는 Notice를 씁니다.",
            "어떤 요소 옆에 붙는 작은 내용에는 Dropdown이나 Tooltip을 씁니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

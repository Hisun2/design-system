import React from "react";
import { FullscreenModal, Button, Text, Box, Flex, Input, SpinContainer, WidgetError } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "FullscreenModal" };

function TwoZoneExample() {
  const [visible, setVisible] = React.useState(false);
  const close = () => setVisible(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>두 구역 전체 화면 모달 열기</Button>
      <FullscreenModal visible={visible} onClose={close}>
        <FullscreenModal.Header title="거래처 일괄 등록" description="2026-11-25 올린 파일">
          <FullscreenModal.Back onClick={close}>거래처 목록으로</FullscreenModal.Back>
        </FullscreenModal.Header>
        <FullscreenModal.Body>
          <FullscreenModal.Section w={320}>
            <Text tag="h3" size={300} bold mt={0} mb={3}>등록 조건</Text>
            <Text tag="label" htmlFor="fsm-owner" size={200}>담당자</Text>
            <Input mt={2}>
              <Input.Value id="fsm-owner" placeholder="이름을 적습니다" />
            </Input>
          </FullscreenModal.Section>
          <FullscreenModal.Section>
            <Text tag="h3" size={300} bold mt={0} mb={3}>올린 거래처 1,248곳</Text>
            <Text tag="p" size={200} mt={0}>오른쪽 구역에는 표처럼 넓은 자리가 필요한 내용을 둡니다.</Text>
          </FullscreenModal.Section>
        </FullscreenModal.Body>
        <FullscreenModal.Footer>
          <Button use="primary" theme="info" size="l" onClick={close}>등록</Button>
          <Button size="l" ml={2} onClick={close}>취소</Button>
        </FullscreenModal.Footer>
      </FullscreenModal>
    </>
  );
}

function OneZoneExample() {
  const [visible, setVisible] = React.useState(false);
  const close = () => setVisible(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>한 구역 전체 화면 모달 열기</Button>
      <FullscreenModal visible={visible} onClose={close}>
        <FullscreenModal.Header title="승인 내역" />
        <FullscreenModal.Body>
          <FullscreenModal.Section>
            <Flex direction="column" alignItems="center">
              <Box w={480}>
                <Text tag="h3" size={400} bold mt={0} mb={3}>이번 달 승인 문서</Text>
                <Text tag="p" size={200} mt={0}>구역이 하나뿐이면 내용을 가로 가운데에 둡니다.</Text>
              </Box>
            </Flex>
          </FullscreenModal.Section>
        </FullscreenModal.Body>
        <FullscreenModal.Footer justifyContent="center">
          <Button use="primary" theme="info" onClick={close}>닫기</Button>
        </FullscreenModal.Footer>
      </FullscreenModal>
    </>
  );
}

export default function FullscreenModalPage() {
  return (
    <Page meta={meta} lead="화면 전체를 덮으며 열리는 모달입니다. 아래 화면의 기능을 모두 막고, 자기 주소(URL)를 따로 가집니다. 많은 내용을 채우거나 살펴보는 일에 사용자를 집중시킬 때 씁니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "많은 양의 정보를 입력·수정·검토하는 일에 온전히 집중시켜야 할 때 씁니다.",
            "화면에 딸린 자료를 많이 보여 주고, 그 자료로 무엇을 할지 사용자에게 정하게 할 때 씁니다.",
            "딸린 자료를 보여 줘야 하지만 별도 페이지로 떼어 내고 싶지 않을 때 씁니다.",
            "화면 폭이 768px보다 좁으면 보통 모달 대신 전체 화면 모달로 엽니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Demo>
          <TwoZoneExample />
          <OneZoneExample />
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>FullscreenModal.Header</Code>, <>위에 고정되는 머리 영역입니다. <Code>title</Code>, <Code>description</Code>으로 제목과 덧붙이는 설명을 넣습니다.</>],
            [<Code>FullscreenModal.Title</Code>, "제목입니다. Header의 title로 넣으면 따로 쓰지 않습니다."],
            [<Code>FullscreenModal.Description</Code>, "제목 옆의 설명입니다. Header의 description으로 넣으면 따로 쓰지 않습니다."],
            [<Code>FullscreenModal.Back</Code>, "모달을 연 화면으로 돌아가는 링크입니다. 돌아갈 화면의 이름을 적습니다."],
            [<Code>FullscreenModal.Close</Code>, "오른쪽 위의 닫기 버튼입니다. 기본으로 들어갑니다."],
            [<Code>FullscreenModal.Body</Code>, "내용 영역입니다. 안에 구역을 나란히 놓습니다."],
            [<Code>FullscreenModal.Section</Code>, "내용 구역 하나입니다. 구역마다 따로 스크롤합니다."],
            [<Code>FullscreenModal.Footer</Code>, "아래에 고정되는 영역입니다. 제출 버튼과 그 밖의 버튼을 둡니다."],
          ]}
        />
      </Section>

      <Section title="내용의 모양">
        <Rules
          items={[
            <>내용 안의 제목은 20px(<Code>--ec-fs-400</Code>) 이하로 씁니다. 모달 머리의 제목보다 커지면 위계가 뒤집힙니다.</>,
            <>내용을 여러 구역으로 나눌 수 있습니다. 구역을 눈으로 가르려면 한쪽 구역의 바탕을 <Code>--ec-bg-page</Code>로 칠합니다.</>,
            "구역이 둘이면 각 구역의 내용을 왼쪽에 맞춥니다.",
            "구역이 하나면 내용을 가로 가운데에 둡니다. 다만 이 경우에는 보통 모달(Modal)로 충분한지 먼저 살핍니다.",
          ]}
        />
      </Section>

      <Section title="버튼">
        <Rules
          items={[
            "아래 영역의 버튼은 M과 L 가운데 화면에 맞는 크기를 씁니다. 한 모달 안에서는 한 가지 크기만 씁니다.",
            "주요 버튼을 맨 앞에 두고 취소를 그 뒤에 둡니다. 정렬은 내용의 정렬을 따릅니다. 내용이 왼쪽 맞춤이면 버튼도 왼쪽, 가운데 맞춤이면 버튼도 가운데에 둡니다.",
            "주요 버튼은 하나만 둡니다.",
          ]}
        />
      </Section>

      <Section title="상태">
        <Demo caption="불러오는 중 — SpinContainer(가장 큰 크기)로 내용을 덮습니다">
          <SpinContainer loading size="xxl">
            <Box w={320} h={120} />
          </SpinContainer>
        </Demo>
        <Demo caption="불러오지 못함 — 빈 상태 컴포넌트와 다시 불러오기 버튼">
          <WidgetError description="잠시 뒤에 다시 시도해 주세요.">
            <Button mt={4}>다시 불러오기</Button>
          </WidgetError>
        </Demo>
        <Rules
          items={[
            "내용을 처음 불러올 때와 다시 불러올 때 모두 내용 영역 위에 SpinContainer를 띄웁니다.",
            "불러오다 오류가 나면 내용 자리에 오류 안내와 \"다시 불러오기\" 버튼을 보여 줍니다. 오류 안내에는 WidgetError를 씁니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Table
          head={["닫는 방법", "설명"]}
          rows={[
            ["닫기 버튼", "머리 영역 오른쪽 위의 × 를 누릅니다."],
            ["주요 버튼 · 취소 버튼", "아래 영역의 버튼을 눌러 일을 끝내거나 그만둡니다."],
            ["Esc 키", "키보드로 닫습니다."],
            ["브라우저의 뒤로 가기", "모달이 자기 주소를 가지므로 뒤로 가면 닫힙니다. 이때 아래 화면은 달라지지 않습니다."],
          ]}
        />
        <Rules
          items={[
            "닫히면 초점은 언제나 모달을 연 요소로 돌아갑니다.",
            <>어떻게 닫혔는지는 <Code>onClose</Code>의 첫 값으로 알 수 있습니다(<Code>onBackClick</Code>, <Code>onCloseClick</Code>, <Code>onEscape</Code>).</>,
            "입력하던 내용이 사라지는 경우에는 닫기 전에 알립니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "거래처 수백 곳을 한꺼번에 올리고 검토하는 일처럼, 넓은 자리와 집중이 필요한 일에 씁니다." }}
          bad={{ text: "\"삭제할까요?\" 같은 짧은 확인에는 쓰지 않습니다. 보통 모달을 씁니다." }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Rules
          items={[
            "내용이 적고 구역이 하나면 Modal을 씁니다.",
            "아래 화면을 보면서 덧붙는 내용을 다뤄야 하면 SidePanel을 씁니다.",
            "여러 사람이 주소로 바로 들어와 오래 머무는 화면이면 별도 페이지로 만듭니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

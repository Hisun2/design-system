import React from "react";
import { Button, Modal, Input, Select, Notice, SpinContainer, ScrollArea, Flex, Box, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code, Swatch } from "../../kit.jsx";

export const meta = { title: "모달 안의 내용", order: 4 };

const ROLES = [
  { value: "view", children: "보기" },
  { value: "edit", children: "편집" },
  { value: "approve", children: "승인" },
];

/** 일반 모달: 제목 24px, 본문 16px, L 크기 컨트롤. */
function BasicDemo() {
  const [open, setOpen] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const close = () => {
    setOpen(false);
    setFailed(false);
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>담당자 초대</Button>
      <Modal visible={open} onClose={close} w={480}>
        <Modal.Title>담당자 초대</Modal.Title>
        <Text tag="p" size={300} mt={0} mb={0}>초대받은 사람은 이 거래처의 문서를 볼 수 있습니다.</Text>
        <Flex direction="column" gap={4} mt={6}>
          <Flex direction="column" gap={2}>
            <Text tag="label" size={300} htmlFor="mc-mail">이메일</Text>
            <Input size="l"><Input.Value id="mc-mail" placeholder="이름@회사 주소" /></Input>
          </Flex>
          <Flex direction="column" gap={2}>
            <Text size={300} id="mc-role">권한</Text>
            <Select size="l" options={ROLES} defaultValue="view" aria-labelledby="mc-role" />
          </Flex>
        </Flex>
        {failed ? (
          <Notice theme="danger" mt={4}>
            <Notice.Content>
              <Notice.Text>초대를 보내지 못했습니다. 잠시 뒤 다시 시도해 주십시오.</Notice.Text>
            </Notice.Content>
          </Notice>
        ) : null}
        <Flex gap={2} mt={6}>
          <Button use="primary" theme="info" size="l" onClick={() => setFailed(true)}>초대 보내기</Button>
          <Button size="l" onClick={close}>취소</Button>
        </Flex>
      </Modal>
    </>
  );
}

/** 두 구역 모달: 한쪽은 입력, 다른 쪽은 회색 바탕의 미리 보기. */
function DualZoneDemo() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("11월 거래 명세서");
  return (
    <>
      <Button onClick={() => setOpen(true)}>문서 만들기</Button>
      <Modal visible={open} onClose={() => setOpen(false)} p={0} w={720}>
        <Flex>
          <Box p={10} flex="1 1 0">
            <Modal.Title>문서 만들기</Modal.Title>
            <Flex direction="column" gap={2} mt={6}>
              <Text tag="label" size={300} htmlFor="mc-title">문서 제목</Text>
              <Input size="l"><Input.Value id="mc-title" value={title} onChange={setTitle} /></Input>
            </Flex>
            <Flex gap={2} mt={6}>
              <Button use="primary" theme="info" size="l" onClick={() => setOpen(false)}>만들기</Button>
              <Button size="l" onClick={() => setOpen(false)}>취소</Button>
            </Flex>
          </Box>
          <Box p={10} flex="1 1 0" bg="var(--ec-bg-page)" borderRadius="0 14px 14px 0">
            <Text size={200} color="text-secondary">미리 보기</Text>
            <Box mt={4} p={6} bg="var(--ec-bg-surface)" borderRadius="12px">
              <Text size={300} bold>{title || "제목 없음"}</Text>
              <Text tag="p" size={200} color="text-secondary" mb={0}>작성일 2026-11-25</Text>
            </Box>
          </Box>
        </Flex>
      </Modal>
    </>
  );
}

/** 머리와 바닥을 고정하고 가운데만 스크롤합니다. */
function FixedDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>승인 기록 보기</Button>
      <Modal visible={open} onClose={() => setOpen(false)} p={0} w={480}>
        <Box px={10} pt={10} pb={2}>
          <Modal.Title>승인 기록</Modal.Title>
        </Box>
        <ScrollArea h={240} shadow>
          <Box px={10} py={2}>
            {Array.from({ length: 12 }, (_, i) => (
              <Text tag="p" size={300} key={i}>2026-11-{String(25 - i).padStart(2, "0")} 14:30 · 문서 {12 - i}건 승인</Text>
            ))}
          </Box>
        </ScrollArea>
        <Flex gap={2} px={10} pt={2} pb={10}>
          <Button use="primary" theme="info" size="l" onClick={() => setOpen(false)}>내려받기</Button>
          <Button size="l" onClick={() => setOpen(false)}>닫기</Button>
        </Flex>
      </Modal>
    </>
  );
}

/** 불러오는 동안 내용 위를 덮습니다. */
function LoadingDemo() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const save = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1500);
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>거래처 이름 바꾸기</Button>
      <Modal visible={open} onClose={() => setOpen(false)} p={0} w={440}>
        <SpinContainer loading={loading} size="xxl" p={10}>
          <Modal.Title>거래처 이름 바꾸기</Modal.Title>
          <Flex direction="column" gap={2} mt={6}>
            <Text tag="label" size={300} htmlFor="mc-rename">새 이름</Text>
            <Input size="l"><Input.Value id="mc-rename" defaultValue="가나다 상사" /></Input>
          </Flex>
          <Flex gap={2} mt={6}>
            <Button use="primary" theme="info" size="l" onClick={save}>저장</Button>
            <Button size="l" onClick={() => setOpen(false)}>취소</Button>
          </Flex>
        </SpinContainer>
      </Modal>
    </>
  );
}

/** 가운데 맞춤: 그림이 있는 완료 안내처럼 버튼이 하나인 알림. */
function CenterDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>가운데 맞춤 보기</Button>
      <Modal visible={open} onClose={() => setOpen(false)} w={400}>
        <Flex direction="column" alignItems="center">
          <Modal.Title mr={0} textAlign="center">초대를 보냈습니다</Modal.Title>
          <Text tag="p" size={300} mt={0} mb={6} textAlign="center">담당자가 수락하면 알려 드립니다.</Text>
          <Button use="primary" theme="info" size="l" onClick={() => setOpen(false)}>닫기</Button>
        </Flex>
      </Modal>
    </>
  );
}

export default function ModalContentPage() {
  return (
    <Page meta={meta} lead="모달 안에 글, 입력창, 버튼을 놓을 때의 간격·글자 크기·맞춤 규칙입니다. 모달 자체의 동작은 Modal 문서를 봅니다.">
      <Section title="간격">
        <Demo caption="일반 모달 — '초대 보내기'를 누르면 실패 알림이 버튼 위에 나옵니다">
          <BasicDemo />
        </Demo>
        <Table
          head={["자리", "일반 모달", "확인 창"]}
          rows={[
            ["제목과 글 사이", <>16px <Code>--ec-spacing-4x</Code></>, <>8px <Code>--ec-spacing-2x</Code></>],
            ["제목·글과 입력창·컨트롤 사이", <>24px <Code>--ec-spacing-6x</Code></>, <>16px <Code>--ec-spacing-4x</Code></>],
            ["내용과 아래 버튼 사이", <>24px <Code>--ec-spacing-6x</Code></>, <>16px <Code>--ec-spacing-4x</Code></>],
            ["모달 테두리와 내용 사이", "40px (Modal 기본값)", "40px (Modal 기본값)"],
          ]}
        />
        <P>확인 창은 묻는 말과 버튼이 한 덩어리로 읽히도록 간격을 한 단계씩 줄입니다.</P>
      </Section>

      <Section title="제목과 글">
        <Table
          head={["글자", "크기", "토큰"]}
          rows={[
            ["확인 창의 제목", "20px", <><Code>--ec-fs-400</Code>, <Code>--ec-lh-400</Code></>],
            ["그 밖의 모달 제목", "24px", <><Code>--ec-fs-500</Code>, <Code>--ec-lh-500</Code></>],
            ["읽어야 하는 글", "16px", <><Code>--ec-fs-300</Code>, <Code>--ec-lh-300</Code></>],
          ]}
        />
        <Rules
          items={[
            "사용자가 읽어야 하는 글은 16px보다 작게 쓰지 않습니다.",
            "14px는 덧붙이는 설명에만 조심해서 씁니다. 쓸 때는 배경과의 대비가 4.5:1 이상인지 확인합니다.",
            <>제목은 <Code>Modal.Title</Code>로 넣습니다. 그래야 화면 낭독기가 모달의 이름으로 읽습니다.</>,
          ]}
        />
      </Section>

      <Section title="버튼">
        <Rules
          items={[
            "모달에는 주요 버튼이 반드시 하나 있습니다. 둘 이상 두지 않습니다.",
            "취소 버튼과 닫기(×)는 없어도 되지만 두는 것을 권합니다.",
            "모달 안의 입력창과 버튼은 L 크기(44px)를 씁니다.",
            "주요 버튼을 맨 앞에, 취소를 그 뒤에 놓습니다. 버튼 사이는 8px입니다.",
          ]}
        />
      </Section>

      <Section title="알림 상자">
        <P>
          일이 잘못되면 알림 상자(Notice)를 그 일을 일으킨 요소 옆에 둡니다. 보내기에 실패했으면 버튼 바로 위에, 특정 입력 묶음의 문제면 그 묶음 아래에 둡니다. 모달 맨 위에 멀리 떨어뜨려 두지 않습니다.
        </P>
      </Section>

      <Section title="두 구역 모달">
        <Demo caption="왼쪽은 입력, 오른쪽은 미리 보기">
          <DualZoneDemo />
        </Demo>
        <Rules
          items={[
            <>모달을 두 구역으로 나눌 때 보조 구역(미리 보기, 요약)의 바탕은 회색 <Swatch token="bg-page" /> <Code>--ec-bg-page</Code>로 합니다.</>,
            "주요 버튼은 입력하는 구역에 둡니다.",
            "두 구역의 안쪽 여백은 같게 맞춥니다.",
          ]}
        />
      </Section>

      <Section title="고정된 머리와 바닥">
        <Demo caption="가운데만 스크롤되고 제목과 버튼은 제자리에 있습니다">
          <FixedDemo />
        </Demo>
        <Rules
          items={[
            "내용이 길면 제목(머리)과 버튼(바닥)을 고정하고 가운데만 스크롤합니다.",
            "스크롤할 내용이 더 있는 쪽의 고정 영역 경계에 그림자가 생깁니다. 위에 더 있으면 위쪽, 아래에 더 있으면 아래쪽입니다.",
            "고정 영역과 스크롤 영역이 만나는 쪽의 여백은 8px 정도로 좁게 둡니다.",
          ]}
        />
      </Section>

      <Section title="불러오는 중">
        <Demo caption="'저장'을 누르면 내용 전체가 덮입니다">
          <LoadingDemo />
        </Demo>
        <Rules
          items={[
            "모달 안의 내용을 불러오거나 다시 불러오는 동안, 내용 위에 SpinContainer를 덮습니다.",
            <>도는 표시는 가장 큰 크기(<Code>size="xxl"</Code>)를 씁니다.</>,
            "도는 표시는 덮인 내용의 한가운데에 놓습니다.",
            "\"저장하고 있습니다\" 같은 글은 넣어도 되고 안 넣어도 됩니다.",
          ]}
        />
      </Section>

      <Section title="맞춤">
        <P>대부분의 모달은 제목, 내용, 버튼을 모두 왼쪽으로 맞춥니다.</P>
        <Table
          head={["맞춤", "이럴 때"]}
          rows={[
            [
              "왼쪽",
              <Rules
                items={[
                  "목록이나 긴 글이 있습니다. 왼쪽 맞춤이 읽기 쉽습니다.",
                  "폭이 서로 다른 입력창이 있는 폼입니다.",
                  "모달이 여러 구역으로 나뉩니다(단계형 창, 미리 보기가 있는 두 구역 모달, 필터 구역).",
                  "폼, 목록, 표처럼 종류가 다른 내용이 섞여 있습니다.",
                  "머리나 바닥이 고정되어 있습니다.",
                ]}
              />,
            ],
            [
              "가운데",
              <Rules
                items={[
                  "그림이 들어간 완료 안내입니다.",
                  "주요 버튼 하나만 있는 알림이거나, 넘겨 보는 버튼이 있는 안내입니다.",
                ]}
              />,
            ],
          ]}
        />
        <Demo caption="가운데 맞춤의 예">
          <CenterDemo />
        </Demo>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Flex gap={2}>
                <Button use="primary" theme="info" size="l">초대 보내기</Button>
                <Button size="l">취소</Button>
              </Flex>
            ),
            text: "L 크기 버튼을 쓰고 주요 버튼은 하나만 둡니다.",
          }}
          bad={{
            demo: (
              <Flex gap={2}>
                <Button>취소</Button>
                <Button use="primary" theme="info">확인</Button>
              </Flex>
            ),
            text: "M 크기 버튼을 쓰거나, 취소를 앞에 두거나, \"확인\"으로 뭉뚱그리지 않습니다.",
          }}
        />
      </Section>
    </Page>
  );
}

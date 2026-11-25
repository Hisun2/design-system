import React from "react";
import { Button, Modal, Input, Select, Tooltip, Notice, noticeBubbleDefaultManager, Flex, Text } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "새 항목 만들기 창", order: 16 };

const OWNERS = [
  { value: "sales1", children: "영업 1팀" },
  { value: "sales2", children: "영업 2팀" },
  { value: "purchase", children: "구매팀" },
];

const TAKEN = "가나다 상사";

function CreateDemo() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const nameRef = React.useRef(null);

  const close = () => {
    setOpen(false);
    setName("");
    setError("");
  };
  const submit = () => {
    const trimmed = name.trim();
    const next = !trimmed ? "거래처 이름을 적습니다." : trimmed === TAKEN ? "이미 등록된 거래처입니다. 다른 이름을 적습니다." : "";
    setError(next);
    if (next) {
      nameRef.current?.focus();
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      close();
      noticeBubbleDefaultManager.add({ children: `'${trimmed}' 거래처를 등록했습니다.`, initialAnimation: true, duration: 4000 });
    }, 1000);
  };

  return (
    <>
      <Button use="primary" theme="info" onClick={() => setOpen(true)}>새 거래처 등록</Button>
      <Modal visible={open} onClose={close} w={480}>
        <Modal.Title>새 거래처 등록</Modal.Title>
        <Text tag="p" size={300} mt={0} mb={0}>등록하면 이 거래처의 문서와 승인 기록을 모아 볼 수 있습니다.</Text>
        <Flex direction="column" gap={4} mt={6}>
          <Flex direction="column" gap={2}>
            <Text tag="label" size={300} htmlFor="pc-name">거래처 이름</Text>
            <Tooltip title={error} theme="warning" placement="right" interaction={error ? "focus" : "none"}>
              <Input size="l" state={error ? "invalid" : "normal"}>
                <Input.Value
                  id="pc-name"
                  ref={nameRef}
                  autoFocus
                  value={name}
                  aria-invalid={Boolean(error)}
                  placeholder="사업자등록증에 적힌 이름"
                  onChange={(v) => {
                    setName(v);
                    setError("");
                  }}
                />
              </Input>
            </Tooltip>
          </Flex>
          <Flex direction="column" gap={2}>
            <Text tag="label" size={300} htmlFor="pc-no">사업자 번호 <Text color="text-secondary">(선택)</Text></Text>
            <Input size="l"><Input.Value id="pc-no" placeholder="숫자 10자리" /></Input>
          </Flex>
          <Flex direction="column" gap={2}>
            <Text size={300} id="pc-owner">담당 부서</Text>
            <Select size="l" options={OWNERS} defaultValue="sales1" aria-labelledby="pc-owner" />
          </Flex>
        </Flex>
        <Flex gap={2} mt={6}>
          <Button use="primary" theme="info" size="l" loading={loading} onClick={submit}>거래처 등록</Button>
          <Button size="l" onClick={close}>취소</Button>
        </Flex>
      </Modal>
    </>
  );
}

export default function ProjectCreatePage() {
  return (
    <Page meta={meta} lead="거래처, 문서함, 부서처럼 일의 가장 큰 단위가 되는 항목을 새로 만드는 모달입니다. 어느 화면에서 열어도 같은 모양과 같은 순서로 나옵니다.">
      <Section title="구성">
        <Demo caption="버튼을 누르면 만들기 창이 열립니다. 이름을 비우거나 '가나다 상사'로 적고 등록해 봅니다.">
          <CreateDemo />
        </Demo>
        <Table
          head={["부분", "규칙"]}
          rows={[
            ["제목", "\"새 거래처 등록\"처럼 무엇을 만드는지 적습니다."],
            ["설명", "만들면 무엇을 할 수 있는지 한 문장으로 적습니다. 없어도 됩니다."],
            ["입력 항목", "만드는 데 꼭 필요한 것만 받습니다. 세로 배치, L 크기."],
            ["주요 버튼", "\"거래처 등록\"처럼 만드는 동작을 적습니다. 하나만 둡니다."],
            ["취소 버튼", "아무것도 만들지 않고 닫습니다."],
          ]}
        />
      </Section>

      <Section title="여는 곳">
        <Rules
          items={[
            "항목 목록 화면의 주요 버튼(\"새 거래처 등록\")에서 엽니다.",
            "작업 대상 고르기 목록의 맨 아래 \"새 거래처 등록\"에서 엽니다.",
            "아직 항목이 하나도 없는 빈 화면의 주요 버튼에서 엽니다.",
            "어디서 열어도 같은 창입니다. 화면마다 다른 만들기 창을 만들지 않습니다.",
          ]}
        />
      </Section>

      <Section title="입력 항목">
        <Rules
          items={[
            "지금 꼭 있어야 만들 수 있는 것만 묻습니다. 나머지는 만든 뒤 설정 화면에서 채우게 합니다.",
            "항목이 다섯 개를 넘으면 모달 대신 따로 화면을 만들거나 단계형 창(Wizard)으로 나눕니다.",
            "첫 입력창(대개 이름)에 초점을 둔 채로 엽니다.",
            "미리 알 수 있는 값은 채워 둡니다(로그인한 사람의 부서).",
            "선택 항목은 이름표 뒤에 \"(선택)\"을 적습니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Table
          head={["때", "일어나는 일"]}
          rows={[
            ["주요 버튼을 누름", "입력값을 검사합니다. 틀린 곳이 있으면 처음 틀린 입력창으로 초점을 옮기고 설명 풍선을 보입니다."],
            ["만드는 중", "주요 버튼이 로딩 상태가 됩니다. 두 번 눌러 둘이 만들어지지 않게 합니다."],
            ["다 만듦", "창을 닫고, 새로 만든 항목의 화면으로 이동하거나 목록 맨 위에 새 항목을 보입니다. 짧은 알림으로 \"거래처를 등록했습니다\"라고 알립니다."],
            ["실패함", "창을 닫지 않습니다. 버튼 위에 알림 상자로 까닭을 알리고, 적은 값은 그대로 둡니다."],
            ["취소·닫기·Esc", "아무것도 만들지 않고 닫습니다. 적은 값이 있으면 버릴지 묻지 않고 닫되, 항목이 많은 창이면 확인 창으로 한 번 묻습니다."],
          ]}
        />
        <Demo caption="실패했을 때 버튼 위에 나오는 알림 상자">
          <Notice theme="danger" w={400}>
            <Notice.Content>
              <Notice.Text>거래처를 등록하지 못했습니다. 잠시 뒤 다시 시도해 주십시오.</Notice.Text>
            </Notice.Content>
          </Notice>
        </Demo>
        <P>이름이 이미 있는 것과 겹치는지는 서버가 알려 줍니다. 겹치면 이름 입력창에 틀림 표시를 하고 "이미 등록된 거래처입니다"라고 알립니다.</P>
      </Section>

      <Section title="한도와 권한">
        <Rules
          items={[
            "만들 권한이 없는 사람에게는 여는 버튼을 보이지 않습니다. 보여야 한다면 비활성으로 하고 까닭을 설명 풍선에 적습니다.",
            "만들 수 있는 개수에 한도가 있고 다 찼으면, 창 안에 알림 상자로 알리고 주요 버튼을 비활성으로 합니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Flex gap={2}>
                <Button use="primary" theme="info" size="l">거래처 등록</Button>
                <Button size="l">취소</Button>
              </Flex>
            ),
            text: "만드는 것의 이름을 버튼에 적습니다.",
          }}
          bad={{
            demo: (
              <Flex gap={2}>
                <Button use="primary" theme="info" size="l">확인</Button>
                <Button size="l">닫기</Button>
              </Flex>
            ),
            text: "\"확인\"만 적지 않습니다. 무엇이 만들어지는지 알 수 없습니다.",
          }}
        />
      </Section>
    </Page>
  );
}

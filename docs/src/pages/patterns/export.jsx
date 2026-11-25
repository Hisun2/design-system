import React from "react";
import FileExportM from "@semcore/icon/FileExport/m";
import {
  Button, Dropdown, DropdownMenu, Tooltip, Radio, RadioGroup, Input, Notice, Divider, SpinContainer,
  noticeBubbleDefaultManager, Flex, Box, Text,
} from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "내보내기", order: 11 };

/** 형식만 고르면 되는 간단한 목록. */
function ListDemo({ compact }) {
  const pick = (format) => () => noticeBubbleDefaultManager.add({ children: `${format} 파일을 내려받습니다.`, initialAnimation: true, duration: 4000 });
  const menu = (
    <DropdownMenu.Menu>
      <DropdownMenu.Item onClick={pick("엑셀")}>엑셀 (.xlsx)</DropdownMenu.Item>
      <DropdownMenu.Item onClick={pick("CSV")}>CSV</DropdownMenu.Item>
      <DropdownMenu.Item onClick={pick("PDF")}>PDF</DropdownMenu.Item>
    </DropdownMenu.Menu>
  );
  if (compact) {
    return (
      <DropdownMenu>
        <Tooltip title="내보내기">
          <DropdownMenu.Trigger tag={Button} addonLeft={FileExportM} aria-label="내보내기" />
        </Tooltip>
        {menu}
      </DropdownMenu>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger tag={Button} addonLeft={FileExportM}>내보내기</DropdownMenu.Trigger>
      {menu}
    </DropdownMenu>
  );
}

/** 형식이 하나뿐이고 설정이 없을 때: 누르면 바로 내려받습니다. */
function SingleDemo() {
  const [loading, setLoading] = React.useState(false);
  const run = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      noticeBubbleDefaultManager.add({ children: "엑셀 파일을 내려받았습니다.", initialAnimation: true, duration: 4000 });
    }, 1500);
  };
  return <Button addonLeft={FileExportM} loading={loading} onClick={run}>엑셀로 내보내기</Button>;
}

/** 설정이 있는 내보내기. state: normal | error | limit */
function SettingsDemo({ label, state = "normal", selected = 0 }) {
  const [visible, setVisible] = React.useState(false);
  const [scope, setScope] = React.useState("all");
  const [loading, setLoading] = React.useState(false);
  const onVisibleChange = (next) => {
    setVisible(next);
    if (next) setScope(selected > 0 ? "selected" : "all");
  };
  const run = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (state === "normal") setVisible(false);
    }, 1500);
  };
  return (
    <Dropdown visible={visible} onVisibleChange={onVisibleChange}>
      <Dropdown.Trigger tag={Button} addonLeft={FileExportM}>{label}</Dropdown.Trigger>
      <Dropdown.Popper aria-label="데이터 내보내기" w={320}>
        <SpinContainer loading={loading} size="xl" p={4}>
          <Text tag="h4" size={300} bold m={0} mb={4}>데이터 내보내기</Text>
          <RadioGroup value={scope} onChange={setScope} aria-label="내보낼 범위">
            <Flex direction="column" gap={2}>
              <Radio value="all" label="전체 (1,280건)" />
              <Radio value="selected" label={`고른 것만 (${selected}건)`} disabled={selected === 0} />
              <Radio value="first" label="처음 100건" />
            </Flex>
          </RadioGroup>
          <Flex gap={2} mt={4}>
            <Button use="primary" theme="info" disabled={state === "limit"} onClick={run}>엑셀로 내보내기</Button>
            <Button disabled={state === "limit"} onClick={run}>CSV로 내보내기</Button>
          </Flex>
          {state === "error" ? (
            <Notice theme="warning" mt={4}>
              <Notice.Content>
                <Notice.Title>파일을 만들지 못했습니다</Notice.Title>
                <Notice.Text>잠시 뒤 다시 시도해 주십시오. 계속되면 관리자에게 문의해 주십시오.</Notice.Text>
              </Notice.Content>
            </Notice>
          ) : null}
          {state === "limit" ? (
            <Notice theme="warning" mt={4}>
              <Notice.Content>
                <Notice.Text>오늘 내보낼 수 있는 횟수(10회)를 모두 썼습니다. 내일 다시 내보낼 수 있습니다.</Notice.Text>
              </Notice.Content>
            </Notice>
          ) : null}
          {state === "normal" ? (
            <>
              <Divider my={4} />
              <Text tag="p" size={200} color="text-secondary" m={0}>한 번에 10,000건까지 내보냅니다. 그보다 많으면 관리자에게 요청해 주십시오.</Text>
            </>
          ) : null}
        </SpinContainer>
      </Dropdown.Popper>
    </Dropdown>
  );
}

/** 파일이 커서 바로 줄 수 없을 때: 이메일로 보냅니다. */
function PostponedDemo() {
  const [visible, setVisible] = React.useState(false);
  const send = () => {
    setVisible(false);
    noticeBubbleDefaultManager.add({ children: "파일이 준비되면 이메일로 보내 드립니다.", initialAnimation: true, duration: 4000 });
  };
  return (
    <Dropdown visible={visible} onVisibleChange={setVisible}>
      <Dropdown.Trigger tag={Button} addonLeft={FileExportM}>내보내기</Dropdown.Trigger>
      <Dropdown.Popper aria-label="데이터 내보내기" w={320} p={4}>
        <Text tag="h4" size={300} bold m={0} mb={2}>데이터 내보내기</Text>
        <Text tag="p" size={200} m={0} mb={4}>파일이 커서 만드는 데 시간이 걸립니다. 준비되면 이메일로 보내 드립니다.</Text>
        <Flex direction="column" gap={1}>
          <Text tag="label" size={200} htmlFor="export-mail">받을 이메일</Text>
          <Input><Input.Value id="export-mail" defaultValue="담당자@회사 주소" /></Input>
        </Flex>
        <Flex gap={2} mt={4}>
          <Button use="primary" theme="info" onClick={send}>엑셀로 받기</Button>
          <Button onClick={send}>CSV로 받기</Button>
        </Flex>
      </Dropdown.Popper>
    </Dropdown>
  );
}

export default function ExportPage() {
  return (
    <Page meta={meta} lead="화면의 데이터를 파일로 내려받게 하는 흐름과 거기에 쓰는 요소입니다. 버튼 하나를 두고, 누르면 바로 내려받거나 형식과 범위를 고르게 합니다.">
      <Section title="여는 버튼">
        <Demo caption="기본 / 좁은 자리 / 형식이 하나일 때">
          <ListDemo />
          <ListDemo compact />
          <SingleDemo />
        </Demo>
        <Table
          head={["모양", "언제", "누르면"]}
          rows={[
            ["기본 — 아이콘과 \"내보내기\"", "자리가 넉넉하고 형식이나 설정을 골라야 할 때", "형식 목록 또는 설정 폼이 열립니다."],
            ["좁은 자리 — 아이콘만", "표 머리처럼 자리가 좁을 때", "기본 모양과 같습니다."],
            ["풀어 쓴 이름 — \"엑셀로 내보내기\"", "형식이 하나뿐이고 고를 설정이 없을 때", "바로 내려받기 시작합니다."],
          ]}
        />
        <Rules
          items={[
            "내보내기가 그 화면의 가장 중요한 동작이면 주요 버튼으로 합니다. 그렇지 않으면 보조 버튼입니다.",
            <>아이콘만 있는 버튼에는 설명 풍선을 달고 <Code>aria-label</Code>로 이름을 붙입니다.</>,
            "목록이나 폼이 열려 있는 동안 버튼은 눌린 모양이 됩니다.",
            "시간이 걸리면 버튼을 로딩 상태로 바꿉니다. 300ms 안에 끝나면 로딩 표시를 보이지 않습니다.",
            "내보낼 데이터가 없어도 파일은 내려받게 합니다. 열 제목만 든 파일을 줍니다. 빈 파일을 주거나 버튼을 막으면 기능이 고장 난 것처럼 보입니다.",
          ]}
        />
      </Section>

      <Section title="열리는 내용">
        <P>폭과 높이는 안의 내용에 맞춰집니다. 내용은 화면에 따라 달라지지만, 내려받는 버튼은 되도록 둘 이상(두 가지 형식) 둡니다.</P>
        <Sub title="형식 목록">
          <P>형식이 둘 이상이고 다른 설정이 없으면 형식의 목록만 엽니다. 위의 기본 예시가 이 모양입니다.</P>
          <Rules
            items={[
              "항목을 누르면 목록이 닫히고 브라우저가 파일을 내려받습니다.",
              "시간이 걸리면 여는 버튼이 로딩 상태가 됩니다.",
            ]}
          />
        </Sub>
        <Sub title="설정이 있는 내보내기">
          <Demo caption="범위를 고른 뒤 형식 버튼을 누릅니다">
            <SettingsDemo label="내보내기" />
          </Demo>
          <Rules
            items={[
              "맨 위에 \"데이터 내보내기\"라는 제목을 둡니다.",
              "형식이 하나나 둘이면 버튼에 풀어 씁니다: \"엑셀로 내보내기\", \"CSV로 내보내기\".",
              "형식이 셋이면 형식 이름만 씁니다: \"엑셀\", \"CSV\", \"PDF\".",
              "고른 설정에 맞는 데이터가 없어도 버튼을 막지 않습니다. 열 제목만 든 파일을 줍니다.",
            ]}
          />
        </Sub>
        <Sub title="범위 고르기">
          <Demo caption="표에서 3건을 골라 둔 상태 — 열면 '고른 것만'이 선택되어 있습니다">
            <SettingsDemo label="내보내기 (3건 선택됨)" selected={3} />
          </Demo>
          <Rules
            items={[
              "표에서 아무것도 고르지 않았으면 \"전체\"가 선택된 채로 열립니다.",
              "표에서 행을 골랐으면 \"고른 것만\"이 선택된 채로 열립니다.",
              "이 선택은 열 때마다 표의 상태에 맞춰 자동으로 정해집니다.",
            ]}
          />
        </Sub>
        <Sub title="나중에 받는 내보내기">
          <P>파일이 커서 그 자리에서 바로 줄 수 없을 때 씁니다.</P>
          <Demo>
            <PostponedDemo />
          </Demo>
          <Rules
            items={[
              "이메일 입력창에는 로그인한 사람의 이메일을 미리 채워 둡니다.",
              "버튼에는 받을 수 있는 형식을 적습니다.",
              "보낸 뒤에는 \"파일이 준비되면 이메일로 보내 드립니다\"라고 알립니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="덧붙이는 설명">
        <Rules
          items={[
            "전체 데이터를 받는 조건, 건수 제한, 큰 파일에 대한 안내는 버튼 아래에 둡니다.",
            "구분선(Divider)으로 위의 폼과 나눕니다.",
            "전체를 받으려면 따로 요청해야 하는 경우에는 \"전체 데이터가 필요하면 관리자에게 요청해 주십시오\"처럼 적거나 요청 화면으로 가는 링크를 둡니다.",
            "고른 설정 때문에 달라지는 점(예: \"PDF에는 첨부 파일이 들어가지 않습니다\")도 같은 자리에, 구분선 아래에 적습니다.",
          ]}
        />
      </Section>

      <Section title="예외 상태">
        <Sub title="오류">
          <Demo caption="내보내기를 누르면 실패 알림이 아래에 나옵니다">
            <SettingsDemo label="내보내기 (실패 예)" state="error" />
          </Demo>
          <Rules
            items={[
              "내보내기에 실패하면 열린 폼의 맨 아래에 주의 알림 상자를 보입니다.",
              "원인을 알면 알림 상자의 제목에 바로 적습니다.",
              "원인을 모르면 기본 글을 씁니다: \"잠시 뒤 다시 시도해 주십시오. 계속되면 관리자에게 문의해 주십시오.\"",
              "형식 목록만 있는 간단한 모양에서는 알림 상자를 둘 자리가 없으므로 짧은 알림(NoticeBubble)으로 알립니다.",
            ]}
          />
        </Sub>
        <Sub title="한도">
          <Demo caption="한도를 다 쓴 상태">
            <SettingsDemo label="내보내기 (한도 예)" state="limit" />
          </Demo>
          <Rules
            items={[
              "한도에 걸렸으면 폼의 맨 아래에 알림 상자로 알립니다.",
              "설정은 그대로 만질 수 있게 둡니다. 어떤 선택이 가능한지는 볼 수 있어야 합니다.",
              "내보내는 버튼만 비활성으로 합니다. 왜 꺼졌는지는 알림 상자가 설명합니다.",
            ]}
          />
        </Sub>
        <Sub title="불러오는 중">
          <Rules
            items={[
              "폼을 처음 열 때와 내보내는 버튼을 누른 뒤에 로딩이 생길 수 있습니다.",
              <>로딩 동안 폼 전체를 SpinContainer로 덮습니다. 도는 표시는 <Code>size="xl"</Code>입니다.</>,
              "로딩이 끝나면 폼이 닫히고 브라우저가 파일을 내려받습니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <Button addonLeft={FileExportM}>내보내기</Button>,
            text: "표의 오른쪽 위처럼 내보낼 데이터 가까이에 둡니다.",
          }}
          bad={{
            demo: <Button addonLeft={FileExportM} disabled>내보내기</Button>,
            text: "데이터가 없다고 버튼을 막지 않습니다.",
          }}
        />
      </Section>
    </Page>
  );
}

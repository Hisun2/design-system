import React from "react";
import { Button, Errors, getIconPath, Flex, Box, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "오류 화면", order: 7 };

/** 다시 연결을 기다리는 예시: 남은 시간을 세고 0이 되면 다시 불러옵니다(여기서는 숫자만 되돌립니다). */
function ConnectionLostDemo() {
  const [left, setLeft] = React.useState(30);
  React.useEffect(() => {
    const timer = setInterval(() => setLeft((s) => (s <= 1 ? 30 : s - 1)), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Errors icon={getIconPath("connection_lost")}>
      <Errors.Title tag="h3">연결이 끊겼습니다</Errors.Title>
      <Errors.Description>인터넷 연결을 확인한 뒤 화면을 다시 불러와 주십시오.</Errors.Description>
      <Errors.Controls>
        <Flex alignItems="center" gap={3}>
          <Button use="primary" theme="info" size="l" onClick={() => setLeft(30)}>다시 불러오기</Button>
          <Text size={300} color="text-secondary">{left}초 뒤 자동으로 다시 불러옵니다</Text>
        </Flex>
      </Errors.Controls>
    </Errors>
  );
}

export default function ErrorMessagePage() {
  return (
    <Page meta={meta} lead="화면 전체를 쓸 수 없게 된 까닭을 알리는 안내입니다. 서버 오류, 권한 없음, 점검처럼 내용을 불러올 수 없어 사용자가 더 나아갈 수 없을 때 씁니다.">
      <Section title="구성">
        <Demo caption="찾을 수 없는 화면">
          <Errors icon={getIconPath("page_not_found")}>
            <Errors.Title tag="h3">화면을 찾을 수 없습니다</Errors.Title>
            <Errors.Description>주소가 바뀌었거나 삭제된 화면입니다. 이전 화면으로 돌아가거나 처음 화면에서 다시 찾아 주십시오.</Errors.Description>
            <Errors.Controls>
              <Button use="primary" theme="info" size="l">처음 화면으로</Button>
            </Errors.Controls>
          </Errors>
        </Demo>
        <Table
          head={["부분", "규칙"]}
          rows={[
            ["그림", <>상황을 나타내는 그림 하나. <Code>icon</Code>에 넣습니다.</>],
            ["제목", <>무슨 일이 일어났는지 한 문장으로. <Code>Errors.Title</Code></>],
            ["설명", <>왜 그런지, 무엇을 하면 되는지. 짧은 문장 두세 개면 충분합니다. <Code>Errors.Description</Code></>],
            ["버튼", <>벗어나거나 다시 시도하는 길. L 크기. <Code>Errors.Controls</Code></>],
          ]}
        />
        <P>
          <Code>PageNotFound</Code>, <Code>PageError</Code>, <Code>AccessDenied</Code>, <Code>Maintenance</Code>는 글자가 미리 들어 있는 완성품입니다.
          미리 든 글자가 우리 글쓰기 규칙(합쇼체, 동작을 적는 버튼)과 다르므로, <Code>Errors</Code>에 제목·설명·버튼을 직접 넣어 조립합니다.
        </P>
      </Section>

      <Section title="놓는 자리">
        <Rules
          items={[
            "안내를 화면의 가로·세로 한가운데에 놓습니다.",
            "시스템 전체가 막힌 경우에는 상단바와 메뉴 없이 화면 전체에 띄웁니다.",
            "한 업무 화면만 막힌 경우에는 상단바와 메뉴를 그대로 두고 본문 영역에 띄웁니다. 다른 메뉴로는 갈 수 있어야 합니다.",
            "두 경우 모두 자리는 같습니다. 띄우는 영역의 한가운데입니다.",
          ]}
        />
        <Sub title="좁은 화면">
          <P>화면 폭이 648px보다 좁아지면 모양이 바뀝니다.</P>
          <Rules
            items={[
              "그림과 글이 좌우로 나란하던 배치가 위아래로 바뀝니다.",
              "그림 크기가 200px × 200px로 줄어듭니다.",
              "둘레 여백이 줄어듭니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="종류">
        <Table
          head={["종류", "제목", "설명", "버튼"]}
          rows={[
            ["화면을 찾을 수 없음 (404)", "화면을 찾을 수 없습니다", "주소가 바뀌었거나 삭제된 화면입니다. 이전 화면으로 돌아가거나 처음 화면에서 다시 찾아 주십시오.", "처음 화면으로"],
            ["항목을 찾을 수 없음 (404)", "거래처를 찾을 수 없습니다", "삭제되었거나 주소가 잘못되었을 수 있습니다. 볼 권한이 없는 경우에는 담당자에게 권한을 요청해 주십시오.", "거래처 목록으로 / 관리자에게 문의"],
            ["예상하지 못한 오류 (500)", "문제가 생겼습니다", "원인을 확인하고 있습니다. 잠시 뒤 다시 시도해 주십시오.", "다시 시도"],
            ["알고 있는 오류 (500)", "문제가 생겼습니다", "지금 고치고 있습니다. 잠시 뒤 다시 시도하거나 관리자에게 문의해 주십시오.", "다시 불러오기 / 관리자에게 문의"],
            ["점검 중", "(업무 이름) 점검 중입니다", "2026-11-25 14:30까지 점검합니다. 끝난 뒤 다시 들어와 주십시오.", "처음 화면으로"],
            ["로그인 필요 (401)", "로그인한 뒤 볼 수 있습니다", "이 화면은 로그인한 사람만 볼 수 있습니다.", "로그인 / 계정 신청"],
            ["권한 없음 (403)", "이 화면을 볼 권한이 없습니다", "권한이 필요하면 부서 관리자에게 요청해 주십시오.", "처음 화면으로"],
            ["연결 끊김 (408)", "연결이 끊겼습니다", "인터넷 연결을 확인한 뒤 화면을 다시 불러와 주십시오.", "다시 불러오기 + 남은 시간(0이 되면 자동으로 다시 불러옴)"],
            ["응답 시간 초과 (522)", "서버가 응답하지 않습니다", "서버에 연결하는 데 시간이 너무 오래 걸려 화면을 보여 줄 수 없습니다. 아래에 요청 번호, 접속 주소(IP), 오류 번호를 적습니다.", "없음"],
            ["잘못된 요청 (400)", "요청을 처리할 수 없습니다", "주소가 맞는지 확인해 주십시오. 계속되면 브라우저의 쿠키를 지우거나 확장 프로그램을 끈 뒤 다시 시도해 주십시오.", "처음 화면으로 / 관리자에게 문의"],
            ["사람인지 확인", "사람인지 확인합니다", "자동 접속을 막기 위한 절차입니다. 확인을 마치면 가려던 화면으로 이동합니다.", "확인 제출, 또는 확인 도구"],
            ["이용할 수 없는 계정", "이 계정으로는 이용할 수 없습니다", "사용이 중지되었거나 삭제된 계정입니다. 다시 쓰려면 관리자에게 문의해 주십시오.", "처음 화면으로"],
            ["주소를 찾지 못함 (DNS)", "서버 주소를 찾을 수 없습니다", "주소 등록이 아직 퍼지지 않았거나 서버 설정에 문제가 있습니다. 아래에 요청 번호, 시각, 접속 주소(IP), 요청한 주소, 오류 번호를 적습니다.", "없음"],
          ]}
        />
        <Demo caption="예상하지 못한 오류">
          <Errors icon={getIconPath("page_error")}>
            <Errors.Title tag="h3">문제가 생겼습니다</Errors.Title>
            <Errors.Description>원인을 확인하고 있습니다. 잠시 뒤 다시 시도해 주십시오.</Errors.Description>
            <Errors.Controls>
              <Flex gap={2}>
                <Button use="primary" theme="info" size="l">다시 시도</Button>
                <Button size="l">관리자에게 문의</Button>
              </Flex>
            </Errors.Controls>
          </Errors>
        </Demo>
        <Demo caption="권한 없음">
          <Errors icon={getIconPath("access_denied")}>
            <Errors.Title tag="h3">이 화면을 볼 권한이 없습니다</Errors.Title>
            <Errors.Description>권한이 필요하면 부서 관리자에게 요청해 주십시오.</Errors.Description>
            <Errors.Controls>
              <Button use="primary" theme="info" size="l">처음 화면으로</Button>
            </Errors.Controls>
          </Errors>
        </Demo>
        <Demo caption="점검 중">
          <Errors icon={getIconPath("maintenance")}>
            <Errors.Title tag="h3">문서 관리 점검 중입니다</Errors.Title>
            <Errors.Description>2026-11-25 14:30까지 점검합니다. 끝난 뒤 다시 들어와 주십시오.</Errors.Description>
            <Errors.Controls>
              <Button use="primary" theme="info" size="l">처음 화면으로</Button>
            </Errors.Controls>
          </Errors>
        </Demo>
        <Demo caption="연결 끊김 — 남은 시간을 셉니다">
          <ConnectionLostDemo />
        </Demo>
      </Section>

      <Section title="언제 쓰는가">
        <Table
          head={["경우", "예"]}
          rows={[
            ["서버가 상태 번호로 알려 주는 오류", "잘못된 요청(400), 로그인 필요(401), 권한 없음(403), 찾을 수 없음(404), 연결 끊김(408), 서버 오류(500), 응답 시간 초과(522), 주소를 찾지 못함"],
            ["보안 때문에 막은 상태", "잘못된 요청 차단, 사람인지 확인"],
            ["내용 전체를 막는 그 밖의 상태", "삭제된 계정, 사용이 중지된 계정, 점검 중"],
          ]}
        />
        <P>화면의 일부만 불러오지 못했을 때는 이 패턴을 쓰지 않습니다. 그 위젯 안에 <Code>WidgetError</Code>를 씁니다.</P>
      </Section>

      <Section title="버튼">
        <Rules
          items={[
            "벗어날 길을 줍니다: \"처음 화면으로\", \"거래처 목록으로\".",
            "문제를 풀고 다시 해 볼 길을 줍니다: \"다시 불러오기\", \"다시 시도\", \"확인 제출\".",
            "\"관리자에게 문의\"는 예상하지 못한 오류에만 둡니다. 사용자가 문제를 알릴 수 있게 하기 위한 것입니다.",
            "우리 화면이 뜨기 전에 네트워크 장비(게이트웨이)가 대신 보여 주는 오류에는 버튼을 두지 않습니다. 눌러도 할 수 있는 일이 없습니다. 대신 문의할 때 필요한 요청 번호와 오류 번호를 적습니다.",
            "주요 버튼은 하나입니다. 두 번째 버튼은 보조 버튼으로 합니다.",
            "\"처음 화면으로\"는 로그인했으면 첫 업무 화면으로, 로그인하지 않았으면 로그인 화면으로 보냅니다.",
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "설명은 짧게 씁니다. 짧은 문장 두세 개면 충분합니다.",
            "사용자를 탓하지 않습니다. 무슨 일이 일어났는지와 할 수 있는 일을 적습니다.",
            "오류 번호와 기술 용어는 제목에 쓰지 않습니다. 문의에 필요하면 설명 아래에 작게 적습니다.",
            "농담이나 꾸미는 말을 쓰지 않습니다. 일을 못 하고 있는 사람에게는 거슬립니다.",
          ]}
        />
        <DoDont
          good={{ text: "\"이 화면을 볼 권한이 없습니다. 권한이 필요하면 부서 관리자에게 요청해 주십시오.\"" }}
          bad={{ text: "\"403 Forbidden\" 또는 \"비밀 화면을 찾으셨네요!\" — 번호만 보이거나 가볍게 넘기지 않습니다." }}
        />
      </Section>
    </Page>
  );
}

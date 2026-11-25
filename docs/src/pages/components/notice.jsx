import React from "react";
import { Notice, NoticeSmart, Button, Input, Flex, Box } from "@ec21rnc/ui";
import InfoM from "@semcore/icon/Info/m";
import WarningM from "@semcore/icon/Warning/m";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Notice" };

function ClosableNotice() {
  const [hidden, setHidden] = React.useState(false);
  return (
    <Flex direction="column" gap={2} w="100%">
      <Notice theme="info" hidden={hidden} icon={<InfoM />}>
        <Notice.Content>
          <Notice.Title>승인 규칙이 바뀝니다</Notice.Title>
          <Notice.Text>2026-12-01부터 1,000,000원이 넘는 문서는 부서장 승인이 필요합니다.</Notice.Text>
          <Notice.Actions>
            <Button use="primary" theme="info">바뀐 규칙 보기</Button>
            <Button ml={2} onClick={() => setHidden(true)}>나중에 보기</Button>
          </Notice.Actions>
        </Notice.Content>
        <Notice.Close onClick={() => setHidden(true)} />
      </Notice>
      {hidden ? <Box><Button onClick={() => setHidden(false)}>알림 다시 보이기</Button></Box> : null}
    </Flex>
  );
}

export default function NoticePage() {
  return (
    <Page meta={meta} lead="사용자가 하고 있는 일과 관련된 소식을 화면 안에 자리를 잡고 알리는 상자입니다. 조건이 맞을 때 나타났다가 조건이 끝나면 사라집니다.">
      <Section title="Notice인지 가리는 기준">
        <Table
          head={["기준", "Notice", "NoticeBubble"]}
          rows={[
            ["시스템 전체에 관한 내용이다", "아님", "그럴 수도, 아닐 수도 있음"],
            ["넓은 범위에 관한 내용이다 (요소 하나가 아니라 페이지·구역·큰 컴포넌트)", "맞음", "그럴 수도, 아닐 수도 있음"],
            ["중요하다 (놓치면 기회를 놓치거나 자료를 잃을 수 있음)", "맞음", "아님"],
            ["한때만 보인다 (조건에 따라 나타났다 사라지고, 구역에 늘 붙어 있는 것이 아님)", "맞음", "맞음"],
          ]}
        />
        <P>네 가지를 모두 채워야 Notice입니다. 알리는 범위에 따라 화면·위젯·카드에 붙는 것과 제품 전체에 관한 것으로 나뉩니다.</P>
      </Section>

      <Section title="구성">
        <Demo caption="넣을 수 있는 것을 모두 넣은 모습">
          <ClosableNotice />
        </Demo>
        <Demo caption="가장 적게 넣은 모습">
          <Notice theme="muted">
            <Notice.Content>
              <Notice.Text>문서는 30일 동안 임시 보관함에 남습니다.</Notice.Text>
            </Notice.Content>
          </Notice>
        </Demo>
        <Table
          head={["부분", "꼭 있어야 하는가", "하는 일"]}
          rows={[
            [<Code>Notice.Content</Code>, "예", "제목·글·버튼을 감쌉니다."],
            [<Code>Notice.Text</Code>, "예", "알리는 글입니다."],
            [<Code>Notice.Title</Code>, "아니요", "제목입니다."],
            [<Code>Notice.Actions</Code>, "아니요", "버튼 줄입니다."],
            [<Code>Notice.Close</Code>, "아니요", "닫기 버튼입니다."],
            [<><Code>icon</Code> · <Code>illustration</Code></>, "아니요", <>글 앞에 붙는 아이콘이나 그림입니다. 예전 방식인 <Code>Notice.Label</Code> 대신 이 속성을 씁니다.</>],
          ]}
        />
        <Demo caption="NoticeSmart — 속성만으로 짧게 쓰는 방식">
          <NoticeSmart theme="success" title="거래처 12곳을 등록했습니다" text="등록한 거래처는 목록에서 바로 볼 수 있습니다." closable />
        </Demo>
        <Rules
          items={[
            "모양은 알림 상자 규칙을 따릅니다. 모서리 8px, 안쪽 여백 16px입니다.",
          ]}
        />
      </Section>

      <Section title="종류와 색">
        <Demo column>
          <Notice theme="muted"><Notice.Content><Notice.Text>차분 (muted) — 보통의 안내와 귀띔</Notice.Text></Notice.Content></Notice>
          <Notice theme="info"><Notice.Content><Notice.Text>정보 (info) — 알아 둘 소식, 의견 받기, 새 기능 소개</Notice.Text></Notice.Content></Notice>
          <Notice theme="success"><Notice.Content><Notice.Text>성공 (success) — 일이 잘 끝났음을 알림</Notice.Text></Notice.Content></Notice>
          <Notice theme="warning" icon={<WarningM />}><Notice.Content><Notice.Text>주의 (warning) — 급하지 않은 오류와 경고</Notice.Text></Notice.Content></Notice>
          <Notice theme="danger" icon={<WarningM />}><Notice.Content><Notice.Text>위험 (danger) — 일을 이어 갈 수 없거나 자료를 잃는 문제</Notice.Text></Notice.Content></Notice>
        </Demo>
        <Table
          head={["종류", "언제 쓰는가"]}
          rows={[
            ["차분", "보통의 안내와 귀띔."],
            ["정보", "치우치지 않은 중요한 소식, 의견을 받는 알림. 새 기능이나 다른 메뉴를 소개할 때는 큰 그림을 곁들인 소개 알림으로 쓸 수 있습니다."],
            ["성공", "폼 제출처럼 일이 잘 끝났음을 알릴 때, 신청·가입을 권할 때."],
            ["주의", "중요하지만 급하지 않은 오류와 경고. 점검 안내, 쓸 수 없는 기능, 잠깐의 장애."],
            ["위험", "심각한 오류, 일을 이어 갈 수 없게 하는 문제, 자료를 잃게 되는 동작."],
          ]}
        />
        <Rules
          items={[
            "색의 뜻은 상태 색 규칙과 같습니다. 초록은 문제없이 끝남, 노랑은 사람이 봐야 함, 빨강은 문제 있음입니다.",
            "색만으로 뜻을 전하지 않습니다. 주의와 위험에는 아이콘이나 제목을 함께 둡니다.",
            "같은 글이라도 상황에 따라 다른 색으로 내보낼 수 있습니다. 색이 뜻을 바꿉니다.",
          ]}
        />
      </Section>

      <Section title="글의 폭">
        <Demo>
          <Notice theme="info" w="100%">
            <Notice.Content>
              <Box wMax={720}>
                <Notice.Text>
                  상자가 화면 폭 전체로 늘어나도 글은 일정 폭에서 줄을 바꿉니다. 한 줄이 너무 길면 다음 줄의 첫머리를 찾기 어렵습니다.
                </Notice.Text>
              </Box>
            </Notice.Content>
          </Notice>
        </Demo>
        <P>글을 상자 폭 끝까지 늘이지 않습니다. 글의 가장 큰 폭은 650~800px로 잡습니다.</P>
      </Section>

      <Section title="놓는 자리">
        <Table
          head={["알리는 범위", "자리", "폭"]}
          rows={[
            ["화면 전체", "페이지 머리 영역 안, 경로(Breadcrumbs) 아래", "내용 영역의 폭"],
            ["탭 하나의 내용", "탭 줄(TabLine) 바로 아래", "내용 영역의 폭"],
            ["위젯·카드 하나", "그 위젯 안. 정확한 자리는 내용에 따라 정합니다.", "위젯 내용 영역의 폭"],
            ["컴포넌트 하나", "그 컴포넌트의 맨 위나 맨 아래", "컴포넌트의 폭"],
          ]}
        />
        <Rules
          items={[
            "한 화면에 알림 상자를 여러 개 한꺼번에 두지 않습니다.",
            "화면 전체에 관한 알림의 여백은 ProductHead의 여백 규칙을 따릅니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Sub title="보이는 기간">
          <P>Notice는 한때만 보이는 알림입니다. 언제까지 보일지를 미리 정해 둡니다.</P>
          <Rules
            items={[
              "날짜 수 (시범 운영 기간 동안 등)",
              "접속 횟수",
              "어떤 일이 일어날 때까지 (작업 완료, 오류 수정, 시험 기능의 정식 전환 등)",
              "사용자가 어떤 일을 할 때까지 (설정을 마침, 내용을 봄, 오류를 고침 등)",
            ]}
          />
        </Sub>
        <Sub title="숨기기">
          <Rules
            items={[
              "닫기 버튼을 누르면 숨깁니다.",
              "\"나중에 보기\", \"다시 보지 않기\"처럼 다시 나타날 조건을 정하는 링크를 눌러도 숨깁니다.",
              "닫기 버튼도 숨기는 링크도 없으면 사용자가 직접 숨길 수 없습니다. 정해 둔 조건(기간, 접속 횟수, 어떤 동작)에 따라 알아서 사라집니다.",
            ]}
          />
        </Sub>
        <Sub title="움직임">
          <Rules
            items={[
              "숨길 때는 200ms 동안 서서히 흐려지며 사라집니다.",
              "아래 내용은 같은 200ms 동안 빈자리를 메우며 올라옵니다. 뚝 끊기듯 움직이지 않습니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="맞춤 알림">
        <Sub title="의견을 받는 알림">
          <Demo>
            <Notice theme="info" w="100%">
              <Notice.Content>
                <Flex alignItems="center" gap={3}>
                  <Notice.Text>새 승인 화면이 일하는 데 도움이 됩니까?</Notice.Text>
                  <Button>예</Button>
                  <Button>아니요</Button>
                </Flex>
              </Notice.Content>
            </Notice>
          </Demo>
          <P>페이지 머리 영역에 붙여 내용 영역의 폭 전체로 펼칩니다. 위·왼쪽·오른쪽에 바깥 여백을 두지 않습니다.</P>
        </Sub>
        <Sub title="소개 알림">
          <Demo>
            <Notice theme="info" w="100%">
              <Notice.Content>
                <Notice.Title>문서 자동 분류가 생겼습니다</Notice.Title>
                <Notice.Text>올린 문서를 종류별로 나눠 줍니다. 소식을 받을 메일 주소를 남겨 주세요.</Notice.Text>
                <Notice.Actions>
                  <Flex gap={2}>
                    <Input w={240}><Input.Value placeholder="name@example.com" aria-label="메일 주소" /></Input>
                    <Button use="primary" theme="info">소식 받기</Button>
                  </Flex>
                </Notice.Actions>
              </Notice.Content>
              <Notice.Close />
            </Notice>
          </Demo>
          <Rules
            items={[
              "보통 알림보다 눈길을 더 끌어야 할 때 씁니다. 새 기능, 새 판, 메뉴 이동, 기간이 정해진 행사를 알리는 경우입니다.",
              "그만큼 드러낼 필요가 없으면 정보(info) 알림으로 충분합니다.",
              "큰 그림을 넣을 수 있고, 입력창이나 선택 목록을 넣어 그 자리에서 바로 참여하게 할 수 있습니다.",
              "화면이나 컴포넌트가 비었을 때의 빈 상태 대신으로 쓰지 않습니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "짧게 씁니다. 다른 위젯과 화면의 기능을 가리지 않아야 합니다.",
            "화면에 놓이는 알림은 두 줄, 구역이나 컴포넌트 안의 알림은 네 줄 안에 뜻을 전합니다.",
            "문제를 알릴 때는 무엇을 하면 풀리는지도 함께 적습니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <Rules
          items={[
            "새 기능과 화면 소식, 의견 받기, 덧붙은 기능의 짧은 도움말, 시스템 상태(오류, 장애, 작업 완료)를 알리는 데 씁니다.",
            "알림이 겹치면 더 급한 것이 자리를 차지합니다. 순서는 위험 > 주의 > 성공 > 정보입니다.",
            "입력값이 잘못된 폼에서 오류를 모아 알리는 자리에도 씁니다. 자리는 위의 \"놓는 자리\" 규칙을 따릅니다.",
          ]}
        />
        <DoDont
          good={{ text: "잠깐의 장애로 생긴 오류는 주의(warning) 알림으로 알립니다." }}
          bad={{ text: "잠깐의 장애를 위험(danger)으로 알리지 않습니다. 위험은 일을 이어 갈 수 없을 때만 씁니다." }}
        />
        <DoDont
          good={{ text: "보이지 않는 곳에서 끝난 작업은 NoticeBubble로 알립니다." }}
          bad={{ text: "작업이 끝났다는 알림을 화면 내용 위에 Notice로 덮어 띄우지 않습니다." }}
        />
        <DoDont
          good={{ text: "폼에 늘 있어야 하는 안내는 도움말 글로 적습니다." }}
          bad={{ text: "폼 안에 늘 붙어 있는 안내를 Notice로 만들지 않습니다. Notice는 한때만 보이는 것입니다." }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["컴포넌트", "다른 점"]}
          rows={[
            ["NoticeBubble", "사용자가 방금 한 일에 대한 대답이고 화면 한쪽에 잠깐 뜹니다. Notice는 범위가 넓고, 보통 사용자의 동작과 상관없이 나옵니다."],
            ["Tooltip", "기능의 뜻이나 귀띔을 알려 주고 마우스를 올릴 때마다 늘 나옵니다. Notice는 한때만 보입니다."],
            ["도움말 · 귀띔 글", "기능을 설명하는 글이고 늘 그 자리에 있습니다. Notice는 기능을 설명하지 않습니다. 생긴 문제를 푸는 방법이나 해야 할 일을 알려 주는 데 그칩니다."],
          ]}
        />
      </Section>
    </Page>
  );
}

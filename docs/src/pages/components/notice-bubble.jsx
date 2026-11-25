import React from "react";
import { noticeBubbleDefaultManager, Button, Spin, Flex } from "@ec21rnc/ui";
import CheckM from "@semcore/icon/Check/m";
import WarningM from "@semcore/icon/Warning/m";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "NoticeBubble" };

const show = (props) => noticeBubbleDefaultManager.add({ initialAnimation: true, ...props });

function UndoExample() {
  const open = () => {
    let done = false;
    const notice = show({
      children: "문서 3건을 보관함으로 옮겼습니다.",
      duration: 0,
      action: (
        <Button
          use="secondary"
          theme="invert"
          onClick={() => {
            if (done) return;
            done = true;
            notice.update({
              children: (
                <Flex alignItems="center" gap={2}>
                  <Spin size="xs" theme="invert" />
                  되돌리는 중입니다
                </Flex>
              ),
              action: null,
              duration: 0,
            });
            setTimeout(() => {
              notice.update({ children: "되돌렸습니다.", icon: <CheckM />, action: null, duration: 2000 });
            }, 1500);
          }}
        >
          되돌리기
        </Button>
      ),
    });
  };
  return <Button onClick={open}>되돌리기가 있는 알림</Button>;
}

export default function NoticeBubblePage() {
  return (
    <Page meta={meta} lead="방금 한 일이 끝났거나, 보이지 않는 곳에서 작업이 시작되고 끝났음을 화면 오른쪽 위에 잠깐 띄워 알리는 알림입니다.">
      <Section title="NoticeBubble인지 가리는 기준">
        <Table
          head={["기준", "Notice", "NoticeBubble"]}
          rows={[
            ["시스템 전체에 관한 내용이다", "아님", "그럴 수도, 아닐 수도 있음"],
            ["넓은 범위에 관한 내용이다 (요소 하나가 아니라 페이지·구역·큰 컴포넌트)", "맞음", "그럴 수도, 아닐 수도 있음"],
            ["중요하다 (놓치면 기회를 놓치거나 자료를 잃을 수 있음)", "맞음", "아님"],
            ["한때만 보인다 (조건에 따라 나타났다 사라짐)", "맞음", "맞음"],
          ]}
        />
        <P>놓쳐도 큰일이 나지 않는 소식만 NoticeBubble로 알립니다. 놓치면 안 되는 내용은 Notice나 Modal로 알립니다.</P>
      </Section>

      <Section title="구성">
        <Demo>
          <Button onClick={() => show({ children: "거래처 12곳을 등록했습니다.", duration: 4000 })}>기본 알림 띄우기</Button>
        </Demo>
        <Table
          head={["들어가는 것", "규칙"]}
          rows={[
            ["글", "두 줄 안에 씁니다. 아무리 길어도 네 줄을 넘기지 않습니다."],
            ["닫기 버튼", "눌러서 바로 닫을 수 있습니다."],
            ["버튼", <>하나 또는 둘까지 넣을 수 있습니다. <Code>action</Code>으로 넣습니다.</>],
            ["아이콘", <>성공·실패를 빨리 알아보게 하는 작은 아이콘입니다. <Code>icon</Code>으로 넣습니다.</>],
          ]}
        />
        <Rules
          items={[
            "그림은 넣지 않습니다. 기념일 같은 특별한 날의 알림만 예외입니다.",
            "버튼을 셋 이상 넣지 않습니다.",
          ]}
        />
        <P>
          화면 맨 바깥에 <Code>NoticeBubbleContainer</Code>를 한 번만 두고, 알림은 <Code>noticeBubbleDefaultManager.add()</Code>로 띄웁니다. 돌려받은 값의 <Code>update()</Code>로 내용을 바꾸고 <Code>remove()</Code>로 지웁니다.
        </P>
      </Section>

      <Section title="종류">
        <Demo>
          <Button onClick={() => show({ children: "보고서를 만들기 시작했습니다. 끝나면 알려 드립니다.", duration: 5000 })}>정보 (info)</Button>
          <Button onClick={() => show({ type: "warning", children: "연결이 끊겼습니다. 다시 연결하고 있습니다.", duration: 6000 })}>경고 (warning)</Button>
        </Demo>
        <Table
          head={["type", "언제 쓰는가"]}
          rows={[
            [<Code>info</Code>, "보이지 않는 곳에서 작업이 시작되거나 끝났음을 알릴 때. 기본값입니다."],
            [<Code>warning</Code>, "연결이 끊겼음을 알릴 때."],
          ]}
        />
      </Section>

      <Section title="쓰임에 따른 모양">
        <Demo caption="눌러서 하나씩 띄워 봅니다">
          <UndoExample />
          <Button
            onClick={() =>
              show({
                children: "목록을 새로 받지 못했습니다.",
                duration: 0,
                action: <Button use="secondary" theme="invert">다시 불러오기</Button>,
              })
            }
          >
            다시 불러오기가 있는 알림
          </Button>
          <Button onClick={() => show({ children: "승인 요청을 보냈습니다.", icon: <CheckM />, duration: 4000 })}>성공</Button>
          <Button onClick={() => show({ children: "승인 요청을 보내지 못했습니다.", icon: <WarningM />, duration: 6000 })}>실패</Button>
          <Button onClick={() => show({ type: "warning", children: "연결이 끊겼습니다.", duration: 6000 })}>연결 끊김</Button>
          <Button
            onClick={() =>
              show({
                type: "warning",
                children: "연결이 끊겼습니다.",
                duration: 0,
                action: <Button use="secondary" theme="invert" onClick={() => window.location.reload()}>화면 새로 고침</Button>,
              })
            }
          >
            연결 끊김 · 새로 고침
          </Button>
        </Demo>
        <Table
          head={["쓰임", "설명"]}
          rows={[
            ["기본", "보이지 않는 곳에서 작업이 시작되거나 끝났음을 알립니다. 지금 보고 있지 않은 다른 화면의 내용이 바뀌었음을 알릴 때도 씁니다."],
            ["되돌리기", <>끝난 일을 무를 수 있게 합니다. 옮기기와 지우기에 알맞습니다. 버튼은 <Code>use="secondary"</Code>, <Code>theme="invert"</Code>, M 크기입니다.</>],
            ["다시 불러오기", "버튼 이름은 상황에 맞게 바꿉니다."],
            ["되돌리는 중", "되돌리는 데 시간이 걸리면 같은 알림 안에서 돌아가는 표시(XS)와 글로 바꿉니다. 이동안 사용자는 아무것도 누를 수 없습니다. 다른 작업의 진행을 보여 주는 데는 쓰지 않습니다. 그때는 ProgressBar를 씁니다."],
            ["되돌림 끝", "되돌리기가 끝났음을 M 크기 아이콘과 함께 알립니다. 알림의 높이는 앞 단계와 같게 유지합니다."],
            ["성공", "사용자가 한 일이 잘됐음을 알립니다. 색 있는 아이콘을 붙여 글을 읽지 않아도 결과를 알게 합니다."],
            ["실패", "사용자가 한 일이 되지 않았음을 알립니다."],
            ["연결 끊김", "화면이 연결 상태를 스스로 살필 수 있으면 버튼 없이 띄웁니다."],
            ["연결 끊김 · 버튼", "화면이 연결 상태를 스스로 살필 수 없어 새로 고쳐야 하면 \"화면 새로 고침\" 버튼을 넣습니다."],
            ["특별한 날", "기념일이나 행사를 알리는 알림입니다. 안의 요소를 움직이게 해 눈길을 끌 수 있습니다."],
          ]}
        />
      </Section>

      <Section title="자리와 움직임">
        <Rules
          items={[
            "화면 오른쪽 위, 상단 메뉴 바로 아래에 뜹니다.",
            "화면을 스크롤해도 같은 여백을 지키며 그 자리에 머뭅니다.",
            "오른쪽 끝에서 밀려 들어오고, 닫힐 때는 서서히 흐려집니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Sub title="보이는 시간과 닫기">
          <Rules
            items={[
              "닫기 버튼으로 언제든 닫을 수 있습니다.",
              <>닫기 버튼 말고 누를 것이 없으면 4~10초 뒤에 알아서 닫습니다. 글이 길수록 오래 둡니다. 시간은 <Code>duration</Code>에 밀리초로 적습니다.</>,
              <>버튼이나 링크가 들어 있으면 알아서 닫지 않습니다. 사용자가 닫거나 그 가운데 하나를 누를 때까지 둡니다(<Code>duration: 0</Code>).</>,
              "알아서 닫히는 알림에 마우스를 올리거나 안의 요소에 초점을 두면 시간 재기를 처음으로 되돌립니다. 마우스나 초점이 떠나면 다시 셉니다.",
            ]}
          />
        </Sub>
        <Sub title="여러 알림">
          <Rules
            items={[
              "한 번에 하나만 보여 주는 것이 원칙입니다. 여럿이 뜨면 일할 자리를 가리고 눈길이 흩어져 결국 아무것도 읽히지 않습니다.",
              "꼭 필요하면 여럿을 함께 보여 줄 수 있습니다. 신중하게 씁니다.",
              "시스템이 여러 일을 한꺼번에 해서 알림이 겹치면 사용자의 동작으로 생긴 알림과 똑같이 겹쳐지고, 마지막 것만 보입니다.",
              "알림의 수 자체를 줄입니다. 너무 잦으면 사용자가 아예 보지 않게 되고 짜증을 냅니다.",
            ]}
          />
        </Sub>
        <Sub title="되돌리기">
          <Rules
            items={[
              "\"되돌리기\"를 누르면 방금 끝난 일을 무릅니다.",
              "누른 뒤 같은 알림에 \"되돌렸습니다\"를 2초 동안 보여 줍니다.",
              "되돌리는 데 시간이 걸리면 그 사이에 돌아가는 표시와 글을 같은 알림에 보여 주고, 끝나면 \"되돌렸습니다\"로 바꿉니다.",
              "되돌리는 중에 사용자가 알림을 닫았으면 \"되돌렸습니다\"를 띄우지 않습니다.",
            ]}
          />
        </Sub>
        <Sub title="연결 끊김">
          <Rules
            items={[
              "연결이 끊기는 즉시 띄웁니다. 연결 없이도 하던 일을 이어 갈 수 있는 화면에서 주로 씁니다.",
              "따로 떨어진 알림이고 순위가 가장 높습니다. 이 알림이 떠 있으면 다른 알림은 모두 그 아래에 뜹니다.",
              "연결이 돌아오면 알아서 닫습니다.",
              "연결 상태를 스스로 살필 수 있는 화면은 버튼 없이, 그럴 수 없어 새로 고쳐야 하는 화면은 \"화면 새로 고침\" 버튼과 함께 띄웁니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "\"저장했습니다\", \"옮겼습니다\"처럼 끝난 일을 합쇼체 한 문장으로 적습니다.",
            "무엇을 몇 개 했는지 적습니다(\"문서 3건을 보관함으로 옮겼습니다\").",
            "실패를 알릴 때는 다음에 할 수 있는 일을 버튼으로 줍니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <Sub title="씁니다">
          <Rules
            items={[
              "보이지 않는 곳에서 작업이 시작되거나 끝났을 때.",
              "지금 보고 있지 않은 다른 화면의 내용이 바뀌었을 때. 자료 모으기가 시작되거나 끝난 경우, 문서를 임시 저장한 경우처럼 바뀐 것이 당장 눈에 보이지 않는 때입니다.",
              "화면의 내용을 바꾸는 동작을 한 뒤. 항목을 지우고 \"되돌리기\"를 줄 때가 그렇습니다.",
              "항목이 지금 자리에서 사라져 다른 목록·표·화면으로 옮겨 갔을 때.",
            ]}
          />
        </Sub>
        <Sub title="쓰지 않습니다">
          <Rules
            items={[
              "돌아가는 표시나 진행 막대로 불러오는 과정을 보여 주는 데 쓰지 않습니다. 연결이 끊긴 경우만 예외입니다.",
              "바로 눈에 보이는 변화에는 쓰지 않습니다. 태그를 붙이면 태그가 바로 보이고, 즐겨찾기에 넣으면 별 색이 바로 바뀝니다. 그것으로 충분합니다.",
            ]}
          />
        </Sub>
        <DoDont
          good={{ text: "문서를 다른 보관함으로 옮긴 뒤 \"문서 3건을 옮겼습니다\"와 \"되돌리기\"를 띄웁니다." }}
          bad={{ text: "입력창 옆에 저장 결과가 바로 보이는데도 \"저장했습니다\" 알림을 또 띄우지 않습니다." }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Rules
          items={[
            "화면 안에 자리를 잡고 머무는 중요한 알림에는 Notice를 씁니다.",
            "사용자의 답을 받아야만 넘어갈 수 있는 일에는 Modal을 씁니다.",
            "오래 걸리는 작업의 진행 정도는 ProgressBar로 보여 줍니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

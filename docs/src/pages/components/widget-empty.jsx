import React from "react";
import { WidgetEmpty, NoData, WidgetError, Button, Box } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "WidgetEmpty" };

export default function WidgetEmptyPage() {
  return (
    <Page meta={meta} lead="카드, 표, 차트 영역에 보여 줄 데이터가 없을 때 그 자리를 채우는 안내입니다. 왜 비어 있는지와 무엇을 하면 되는지를 알려 줍니다.">
      <Section title="구성">
        <Demo caption="제목과 설명을 직접 적은 모양">
          <Box w={420}>
            <WidgetEmpty>
              <WidgetEmpty.Title>등록된 거래처가 없습니다</WidgetEmpty.Title>
              <WidgetEmpty.Description>거래처를 추가하면 여기에 목록이 나옵니다.</WidgetEmpty.Description>
              <Button mt={4} use="primary" theme="info">거래처 추가</Button>
            </WidgetEmpty>
          </Box>
        </Demo>
        <Table
          head={["부품", "역할"]}
          rows={[
            [<Code>WidgetEmpty</Code>, <>바탕 틀입니다. <Code>icon</Code>에 그림의 주소를 넘기면 맨 위에 그림이 나옵니다.</>],
            [<Code>WidgetEmpty.Title</Code>, "무슨 상태인지 알리는 제목입니다."],
            [<Code>WidgetEmpty.Description</Code>, "이유와 해결 방법을 적는 설명입니다."],
            ["버튼·필터", "상황을 바로 풀 수 있는 컨트롤입니다. 설명 아래에 둡니다."],
            [<Code>NoData</Code>, "\"데이터 없음\" 상태를 그림과 제목까지 갖춰 미리 만들어 둔 것입니다."],
            [<Code>WidgetError</Code>, "\"문제 발생\" 상태를 그림과 제목까지 갖춰 미리 만들어 둔 것입니다."],
          ]}
        />
        <P>NoData와 WidgetError의 제목은 UiProvider가 정한 언어로 저절로 나옵니다. 설명은 <Code>description</Code>으로, 버튼은 안에 넣어서 줍니다.</P>
      </Section>

      <Section title="크기와 배치">
        <Rules
          items={[
            "빈 상태가 되어도 영역의 높이는 바꾸지 않습니다. 데이터가 있을 때와 같은 높이를 유지합니다.",
            "안내는 영역의 가로·세로 가운데에 둡니다.",
            "설명의 폭은 400px을 넘기지 않습니다. 줄이 길면 읽기 어렵습니다.",
            "글은 짧게 씁니다. 짧은 문장 두세 개면 충분합니다.",
          ]}
        />
        <Sub title="높이를 줄여야 할 때">
          <Demo caption="설명을 빼고 제목 한 문장만 남긴 모양">
            <Box w={420}>
              <WidgetEmpty>
                <WidgetEmpty.Title>이번 달 승인 요청이 없습니다</WidgetEmpty.Title>
              </WidgetEmpty>
            </Box>
          </Demo>
          <P>화면의 자리를 아껴야 하는 드문 경우에만 높이를 줄입니다. 이때는 설명을 빼고 제목 한 문장으로 전부 전합니다.</P>
        </Sub>
      </Section>

      <Section title="상태의 종류">
        <Table
          head={["상태", "언제"]}
          rows={[
            ["데이터 없음 / 결과 없음", "보여 줄 데이터가 없거나 검색·필터에 맞는 것이 없을 때"],
            ["문제 발생", "시스템 오류로 데이터를 보여 줄 수 없을 때"],
            ["사용자가 고쳐야 함", "걸러 보기·검색·정렬을 지금 조건으로는 할 수 없을 때"],
            ["설정 필요", "연결이나 설정을 마쳐야 데이터가 생길 때"],
            ["더 없음", "목록의 끝까지 다 보았을 때"],
          ]}
        />

        <Sub title="데이터 없음">
          <Demo caption="NoData — type에 그 영역이 평소 보여 주는 데이터 종류를 넘깁니다">
            <Box w={320}><NoData type="line-chart" description="기간을 넓히면 추이를 볼 수 있습니다." /></Box>
            <Box w={320}><NoData type="other-data" description="아직 등록된 문서가 없습니다." /></Box>
          </Demo>
          <Rules
            items={[
              "데이터가 없거나 어떤 이유로 보여 줄 수 없을 때 씁니다.",
              "영역에 제목이 있으면 빈 상태에서도 제목은 그대로 보여 줍니다.",
              <>그림은 평소 그 자리에 나오는 데이터의 종류를 나타내는 것으로 고릅니다(<Code>line-chart</Code>, <Code>pie-chart</Code>, <Code>other-data</Code> 등).</>,
              "설명에는 왜 데이터가 없는지, 어떻게 하면 생기는지를 적습니다.",
              "한 번에 풀 수 있으면 버튼을 둡니다(예: \"필터 지우기\"). 필터를 직접 둘 수도 있습니다.",
            ]}
          />
        </Sub>

        <Sub title="결과 없음">
          <Demo>
            <Box w={420}>
              <NoData type="nothing-found" description="필터를 바꿔 보세요.">
                <Button mt={4}>필터 지우기</Button>
              </NoData>
            </Box>
          </Demo>
          <Rules
            items={[
              "데이터 없음의 한 갈래입니다. 검색이나 필터에 맞는 결과가 없을 때 씁니다.",
              <>그림은 <Code>type="nothing-found"</Code>를 씁니다.</>,
              "제목은 \"결과가 없습니다\", 설명은 \"필터를 바꿔 보세요\"처럼 적습니다.",
              "필터를 지우는 등 한 번에 풀 수 있는 버튼을 둘 수 있습니다.",
            ]}
          />
        </Sub>

        <Sub title="문제 발생">
          <Demo>
            <Box w={420}>
              <WidgetError description="문제를 확인하고 고치는 중입니다. 잠시 후 다시 시도해 주세요.">
                <Button mt={4}>다시 불러오기</Button>
              </WidgetError>
            </Box>
          </Demo>
          <Table
            head={["경우", "설명에 적을 것"]}
            rows={[
              ["운영 쪽에서 문제를 알고 있을 때", "고치는 중임을 알리고 나중에 다시 시도해 달라고 적습니다. 예: \"문제를 확인하고 고치는 중입니다. 잠시 후 다시 시도해 주세요.\""],
              ["운영 쪽에서 아직 모르는 문제일 때", "무슨 일이 있었는지와 사용자가 할 수 있는 일을 적습니다. 예: \"잠시 후 다시 시도해 주세요. 문제가 계속되면 관리자에게 알려 주세요.\""],
            ]}
          />
          <Rules
            items={[
              "두 경우 모두 다시 불러오는 버튼을 두기를 권합니다.",
              "버튼이 페이지 전체를 새로 고치면 \"페이지 새로 고침\", 이 영역만 다시 불러오면 \"다시 불러오기\"라고 적습니다.",
              "오류 코드나 개발 용어를 그대로 보여 주지 않습니다.",
            ]}
          />
        </Sub>

        <Sub title="사용자가 고쳐야 함">
          <Demo>
            <Box w={420}>
              <WidgetEmpty>
                <WidgetEmpty.Title>이 조건으로는 걸러 볼 수 없습니다</WidgetEmpty.Title>
                <WidgetEmpty.Description>기간을 1년 이내로 줄인 뒤 다시 시도해 주세요.</WidgetEmpty.Description>
              </WidgetEmpty>
            </Box>
          </Demo>
          <Rules
            items={[
              "사용자가 넣은 조건 때문에 결과를 보여 줄 수 없을 때 씁니다.",
              "제목은 \"…할 수 없습니다\"로 무엇이 안 되는지 적습니다(걸러 보기, 검색, 정렬).",
              "설명에는 어떻게 고치면 되는지를 적습니다. 사용자를 탓하는 말투를 쓰지 않습니다.",
            ]}
          />
        </Sub>

        <Sub title="설정 필요">
          <Demo>
            <Box w={420}>
              <WidgetEmpty>
                <WidgetEmpty.Title>승인 알림을 설정해 보세요</WidgetEmpty.Title>
                <WidgetEmpty.Description>알림을 받을 담당자를 정하면 승인 요청이 올 때마다 여기에 모입니다.</WidgetEmpty.Description>
                <Button mt={4} use="primary" theme="info">알림 설정</Button>
              </WidgetEmpty>
            </Box>
          </Demo>
          <Rules
            items={[
              "사용자가 무언가를 연결하거나 설정해야 데이터가 생길 때 씁니다. 다른 상태보다 자세히 적고, 기능을 소개하는 역할도 합니다.",
              "제목과 설명은 긍정문으로 적습니다. \"알림이 설정되지 않았습니다\"가 아니라 \"승인 알림을 설정해 보세요\"입니다.",
              "버튼 하나로 바로 설정할 수 있으면 버튼을 둡니다. 관리자에게 요청해야 하면 누구에게 요청하는지 적습니다.",
              "그림은 그 영역의 데이터 종류를 나타내는 것이나 기능을 소개하는 그림을 씁니다.",
            ]}
          />
        </Sub>

        <Sub title="더 없음">
          <P>스크롤로 이어 불러오는 목록을 끝까지 다 보았을 때 씁니다. 그림 없이 "모두 보았습니다"처럼 제목 한 줄만 둡니다.</P>
        </Sub>
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "제목은 지금 상태를, 설명은 이유와 다음에 할 일을 적습니다.",
            "합쇼체로 적습니다(\"결과가 없습니다\", \"필터를 바꿔 보세요\").",
            "버튼에는 누르면 일어나는 일을 적습니다(\"필터 지우기\", \"다시 불러오기\", \"거래처 추가\").",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "\"결과가 없습니다. 필터를 바꿔 보세요.\" — 이유와 할 일을 함께 알립니다." }}
          bad={{ text: "빈 영역을 아무 안내 없이 비워 두거나 \"데이터 없음\"만 적지 않습니다. 오류인지 원래 없는 것인지 알 수 없습니다." }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["상황", "쓸 것"]}
          rows={[
            ["카드·표·차트 영역 하나가 비었을 때", "WidgetEmpty, NoData, WidgetError"],
            ["페이지 전체를 볼 수 없을 때(권한 없음, 주소 없음, 점검 중)", "Errors의 페이지 오류 화면"],
            ["영역을 불러오는 중일 때", "Skeleton 또는 SpinContainer"],
            ["동작의 결과를 잠깐 알릴 때", "NoticeBubble"],
          ]}
        />
      </Section>
    </Page>
  );
}

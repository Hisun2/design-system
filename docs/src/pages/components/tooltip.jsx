import React from "react";
import { Tooltip, TooltipHint, DescriptionTooltip, Button, ButtonLink, Link, Flex, Text } from "@ec21rnc/ui";
import InfoM from "@semcore/icon/Info/m";
import EditM from "@semcore/icon/Edit/m";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Tooltip" };

export default function TooltipPage() {
  return (
    <Page meta={meta} lead="요소에 마우스를 올리거나 초점을 주었을 때 그 요소에 대한 보충 설명을 보여 주는 설명 풍선입니다. 기능이나 데이터를 한 문장으로 덧붙여 설명할 때 씁니다.">
      <Section title="네 가지의 차이">
        <P>모양이 비슷한 요소가 넷 있습니다. 무엇을 담는지와 어떻게 여는지로 구분합니다.</P>
        <Table
          head={["", "Tooltip", "TooltipHint", "DescriptionTooltip", "Dropdown"]}
          rows={[
            ["담는 것", "요소에 대한 보충 설명", "가려지거나 잘린 요소의 이름", "기능·데이터에 대한 자세한 설명", "폼, 설정"],
            ["안에 누를 수 있는 것", "넣지 않음", "넣지 않음", "넣을 수 있음", "넣을 수 있음"],
            ["여는 요소가 곧 설명 대상인가", "예", "예", "아니요 (따로 둔 설명 아이콘)", "—"],
            ["열리는 때", "마우스 올림 · 초점", "마우스 올림 · 초점", "누름 · Enter", "누름 · Enter"],
            ["화살표", "있음", "없음", "있음", "없음"],
          ]}
        />
        <Demo caption="Tooltip / TooltipHint / DescriptionTooltip">
          <Tooltip title="승인이 끝난 문서는 고칠 수 없습니다">
            <Button>문서 고치기</Button>
          </Tooltip>
          <TooltipHint title="고치기">
            <Button aria-label="고치기"><Button.Addon><EditM /></Button.Addon></Button>
          </TooltipHint>
          <Flex gap={1} alignItems="center">
            <Text size={200}>승인 소요 시간</Text>
            <DescriptionTooltip>
              <DescriptionTooltip.Trigger tag={ButtonLink} use="secondary" aria-label="승인 소요 시간 설명">
                <ButtonLink.Addon><InfoM /></ButtonLink.Addon>
              </DescriptionTooltip.Trigger>
              <DescriptionTooltip.Popper aria-label="승인 소요 시간 설명">
                <Text size={200} tag="p" mb={2}>요청한 때부터 마지막 승인자가 승인한 때까지 걸린 시간입니다. 주말과 공휴일은 뺍니다.</Text>
                <Link href="#">계산 방법 자세히 보기</Link>
              </DescriptionTooltip.Popper>
            </DescriptionTooltip>
          </Flex>
        </Demo>
      </Section>

      <Section title="구성">
        <Table
          head={["부품", "역할"]}
          rows={[
            [<Code>Tooltip.Trigger</Code>, "마우스를 올리거나 눌러서 풍선을 여는 요소입니다."],
            [<Code>Tooltip.Popper</Code>, "풍선 자체입니다. 내용을 담는 상자입니다."],
          ]}
        />
        <Demo caption="짧은 모양(title) / 부품을 직접 적은 모양">
          <Tooltip title="CSV 파일로 내려받습니다">
            <Button>내려받기</Button>
          </Tooltip>
          <Tooltip>
            <Tooltip.Trigger tag={Button}>내려받기</Tooltip.Trigger>
            <Tooltip.Popper>CSV 파일로 내려받습니다</Tooltip.Popper>
          </Tooltip>
        </Demo>
        <P>글자만 넣을 때는 <Code>title</Code>로 충분합니다. TooltipHint와 DescriptionTooltip도 같은 두 부품(<Code>.Trigger</Code>, <Code>.Popper</Code>)으로 이루어집니다.</P>
      </Section>

      <Section title="종류와 색">
        <Demo caption="theme=&quot;default&quot; / &quot;invert&quot; / &quot;warning&quot; — 마우스를 올려 봅니다">
          <Tooltip title="기본 풍선입니다" theme="default"><Button>기본</Button></Tooltip>
          <Tooltip title="어두운 바탕 위에서 씁니다" theme="invert"><Button>반전</Button></Tooltip>
          <Tooltip title="종료일은 시작일보다 늦어야 합니다" theme="warning"><Button>주의</Button></Tooltip>
        </Demo>
        <Table
          head={["종류", "언제 쓰는가"]}
          rows={[
            ["default", "기본입니다. 밝은 바탕의 화면에서 씁니다."],
            ["invert", "어둡거나 색이 있는 바탕 위의 요소에 씁니다."],
            ["warning", "입력값 검사의 오류 문구에만 씁니다. 일반 설명에 쓰지 않습니다."],
          ]}
        />
        <P>세 가지 모두 얇은 테두리와 그림자가 있습니다. 색은 정해진 것만 쓰고 따로 바꾸지 않습니다.</P>
      </Section>

      <Section title="크기와 여백">
        <Rules
          items={[
            <>최대 폭은 228px입니다. 내용에 따라 <Code>wMax</Code>로 바꿀 수 있습니다.</>,
            "여는 요소와 풍선 사이의 거리는 4px입니다.",
            "풍선의 안쪽 여백은 12px입니다.",
            "제목을 넣을 때 제목의 글자 크기는 14px(크기 번호 200)이고 굵기는 700입니다.",
            "풍선 안에 그림을 넣을 때 그림 크기는 130×130px입니다.",
            "풍선 안에서 이름과 값을 나란히 보여 줄 때의 간격은 차트 풍선의 규칙을 따릅니다.",
          ]}
        />
      </Section>

      <Section title="놓는 자리">
        <Demo caption="placement — top(기본) / right / bottom / left">
          <Tooltip title="위에 나옵니다" placement="top"><Button>top</Button></Tooltip>
          <Tooltip title="오른쪽에 나옵니다" placement="right"><Button>right</Button></Tooltip>
          <Tooltip title="아래에 나옵니다" placement="bottom"><Button>bottom</Button></Tooltip>
          <Tooltip title="왼쪽에 나옵니다" placement="left"><Button>left</Button></Tooltip>
        </Demo>
        <Rules
          items={[
            "기본은 여는 요소의 위쪽 가운데(top)입니다.",
            <>방향마다 <Code>-start</Code>, <Code>-end</Code>를 붙여 시작 쪽·끝 쪽에 맞출 수 있습니다(<Code>top-start</Code>, <Code>bottom-end</Code> 등 모두 열두 가지).</>,
            "화살표의 자리는 placement에 따라 정해집니다.",
            "자리가 모자라면 반대쪽으로 저절로 뒤집힙니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Sub title="여는 요소">
          <Rules
            items={[
              "Tooltip은 표의 머리글, 버튼, 링크처럼 누를 수 있는 요소에 답니다.",
              "일반 글자나 비활성 컨트롤처럼 초점을 받지 못하는 요소에는 달지 않습니다. 키보드와 화면 낭독기 사용자가 내용을 볼 수 없습니다.",
              "DescriptionTooltip은 설명 대상 옆에 여는 요소를 따로 둡니다. 설명 아이콘 버튼이나 \"자세히 보기\" 글자 버튼을 씁니다.",
            ]}
          />
        </Sub>
        <Sub title="열리고 닫히는 때">
          <Table
            head={["", "열림", "닫힘"]}
            rows={[
              ["Tooltip · TooltipHint", "마우스를 올리거나 키보드 초점을 줄 때", "마우스가 여는 요소와 풍선을 모두 벗어날 때, 초점이 떠날 때, Esc"],
              ["DescriptionTooltip", "누르거나 Space·Enter를 누를 때", "바깥을 누를 때, 초점이 여는 요소와 풍선 밖으로 나갈 때, Esc"],
            ]}
          />
        </Sub>
        <Sub title="시간">
          <Rules
            items={[
              "마우스를 올린 뒤 100ms 뒤에 열리고, 벗어난 뒤 50ms 뒤에 닫힙니다.",
              "풍선 안에 누를 수 있는 것이 있으면 닫히는 시간을 100ms로 늘립니다. 마우스를 풍선으로 옮길 틈이 필요합니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="내용">
        <Table
          head={["컴포넌트", "하는 일", "담는 내용"]}
          rows={[
            ["Tooltip", "이름이 보이는 요소에 보충 설명을 덧붙입니다.", "꾸밈 없는 짧은 글. 되도록 한 문장."],
            ["TooltipHint", "아이콘만 있는 버튼의 이름, 잘린 글자의 전체를 알려 줍니다.", "이름 한 줄."],
            ["DescriptionTooltip", "여는 요소가 아닌 다른 요소나 기능 전체를 설명합니다.", "길이 제한 없는 글. 제목, 그림, 링크, 버튼을 넣을 수 있습니다."],
          ]}
        />
        <P>폼이나 설정처럼 복잡한 내용은 풍선이 아니라 Dropdown에 담습니다.</P>
      </Section>

      <Section title="쓰는 법">
        <Rules
          items={[
            "풍선에는 도움말과 보충 정보만 담습니다. 복잡한 기능을 넣지 않습니다.",
            "풍선이 사용자에게 필요한 정보를 가리지 않게 방향을 정합니다.",
            "풍선이 옆에 있는 다른 여는 요소를 가려 누르지 못하게 되면 안 됩니다.",
            "여는 요소의 글자를 풍선 제목에 그대로 되풀이하지 않습니다. 여는 요소의 글자만으로 무엇에 대한 설명인지 알 수 있으면 제목은 없어도 됩니다.",
            "여는 요소만으로 주제를 알기 어려울 때는 제목을 붙입니다. 조건을 덧붙이거나 뜻을 풀어 적습니다.",
            "글이 길면 문단으로 나눕니다.",
            "내용이 너무 많으면 풍선으로 보기 불편합니다. 줄일 수 없다면 풍선 대신 화면이나 카드 안에 문단으로 적습니다.",
            "꼭 알아야 하는 내용은 풍선에 숨기지 않고 화면에 바로 적습니다.",
          ]}
        />
        <DoDont
          good={{
            demo: (
              <Tooltip title="승인이 끝난 문서는 고칠 수 없습니다">
                <Button>문서 고치기</Button>
              </Tooltip>
            ),
            text: "버튼의 글자에 없는 정보를 한 문장으로 덧붙입니다.",
          }}
          bad={{
            demo: (
              <Tooltip title="문서 고치기">
                <Button>문서 고치기</Button>
              </Tooltip>
            ),
            text: "보이는 글자를 그대로 되풀이하지 않습니다.",
          }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["상황", "쓸 것"]}
          rows={[
            ["버튼·링크·머리글에 한 문장을 덧붙일 때", "Tooltip"],
            ["아이콘만 있는 버튼의 이름, 잘린 글자의 전체", "TooltipHint"],
            ["기능이나 숫자를 길게 설명하고 링크를 넣을 때", "DescriptionTooltip"],
            ["폼, 설정, 목록을 띄울 때", "Dropdown"],
            ["새 기능을 처음 알릴 때", "FeaturePopover"],
          ]}
        />
      </Section>
    </Page>
  );
}

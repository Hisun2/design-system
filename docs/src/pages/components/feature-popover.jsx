import React from "react";
import { FeaturePopover, Button, Text, Flex, Box } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "FeaturePopover" };

function Sample({ theme, wMax = 350, step, illustration }) {
  const [visible, setVisible] = React.useState(false);
  const close = () => setVisible(false);
  return (
    <Flex alignItems="center" gap={6}>
      <Button use="tertiary" theme="info" onClick={() => setVisible(true)}>안내 보기</Button>
      <FeaturePopover theme={theme} visible={visible} onVisibleChange={setVisible} placement="right-start">
        <FeaturePopover.Trigger>
          <Button onClick={close}>일괄 승인</Button>
          <FeaturePopover.Spot />
        </FeaturePopover.Trigger>
        <FeaturePopover.Popper closeIcon wMax={wMax} aria-label="새 기능 안내">
          <Flex>
            {illustration ? (
              <Box w={illustration} h={illustration} mr={4} flex="0 0 auto" style={{ background: "var(--ec-bg-surface)", borderRadius: "var(--ec-radius-control)" }} />
            ) : null}
            <Box>
              <Text tag="h3" size={300} bold mb={1} mt={0}>문서를 한 번에 승인하세요</Text>
              <Text tag="p" size={200} my={0}>목록에서 여러 건을 고른 뒤 이 버튼을 누르면 한꺼번에 승인합니다.</Text>
              <Flex alignItems="center" gap={2} mt={4}>
                <Button use="primary" theme={theme === "neutral" ? "invert" : "info"} onClick={close}>알겠습니다</Button>
                <Button use="tertiary" theme={theme === "neutral" ? "invert" : "muted"} onClick={close}>나중에 보기</Button>
                {step ? <Text size={200} ml="auto">{step}</Text> : null}
              </Flex>
            </Box>
          </Flex>
        </FeaturePopover.Popper>
      </FeaturePopover>
    </Flex>
  );
}

export default function FeaturePopoverPage() {
  return (
    <Page meta={meta} lead="화면의 한 부분이나 컨트롤로 사용자의 눈길을 끄는 말풍선입니다. 새로 생긴 기능을 알리거나 다음에 할 일을 짚어 줄 때 씁니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "화면의 어느 부분에 눈길을 끌어야 할 때 씁니다.",
            "사용자가 다음에 무엇을 해야 하는지 짚어 줄 때 씁니다.",
            "기본적인 안내와 소개만 담습니다. 이 요소의 목적은 기능을 가리키고 써 보도록 권하는 것입니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Demo caption="&quot;안내 보기&quot;를 눌러 엽니다">
          <Sample />
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>FeaturePopover.Trigger</Code>, "말풍선이 가리키는 컨트롤을 감쌉니다."],
            [<Code>FeaturePopover.Spot</Code>, "컨트롤 모서리에서 깜빡이는 점입니다."],
            [<Code>FeaturePopover.Popper</Code>, "말풍선입니다. closeIcon을 주면 닫기 버튼이 붙습니다."],
            ["내용", "제목, 설명, 버튼 두 개, 필요하면 그림과 단계 표시를 넣습니다."],
          ]}
        />
      </Section>

      <Section title="색">
        <Demo caption="강조 (theme=&quot;accent&quot;, 기본값)">
          <Sample />
        </Demo>
        <Demo caption="차분한 (theme=&quot;neutral&quot;)">
          <Sample theme="neutral" />
        </Demo>
        <Table
          head={["theme", "모양", "언제 쓰는가"]}
          rows={[
            [<Code>accent</Code>, <>옅은 파란 바탕(<Code>--ec-bg-info</Code>)</>, "새 기능을 알릴 때, 그 기능의 쓰는 법을 처음 안내할 때"],
            [<Code>neutral</Code>, <>남색 바탕(<Code>--ec-brand-navy</Code>)에 흰 글자</>, "시스템 전체를 처음 쓰는 사람에게 하는 첫 안내에만"],
          ]}
        />
      </Section>

      <Section title="깜빡이는 점">
        <Rules
          items={[
            <>눈길을 끌려는 요소의 모서리에 둡니다. 색은 주황(<Code>--ec-brand-orange</Code>)입니다.</>,
            "한 컨트롤에 Dot과 깜빡이는 점을 함께 두지 않습니다. 점이 둘이면 뜻이 섞입니다.",
          ]}
        />
      </Section>

      <Section title="내용">
        <Sub title="제목">
          <Rules
            items={[
              "짧게 씁니다. 문단의 핵심을 한마디로 줄입니다.",
              "사용자가 얻는 것을 적습니다. \"저장한 필터\"가 아니라 \"필터를 저장해 다시 쓰세요\", \"공동 작업\"이 아니라 \"담당자와 함께 검토하세요\".",
              "반드시 움직씨(동사)를 넣어 무엇을 하라는 것인지 알립니다.",
              "가리키는 컨트롤의 이름을 그대로 되풀이하지 않습니다.",
              "아래 설명의 문장을 되풀이하지 않습니다.",
            ]}
          />
        </Sub>
        <Sub title="설명">
          <Rules
            items={[
              "한두 문장으로 적습니다.",
              "기능이 무엇인지만이 아니라 어떻게 쓰는지, 무엇에 도움이 되는지 적습니다.",
              "링크와 굵은 글자를 넣을 수 있습니다.",
            ]}
          />
        </Sub>
        <Sub title="닫기 버튼">
          <P>말풍선의 오른쪽 위에 둡니다. 언제나 보여 줍니다. 사용자에게서 닫을 방법을 빼앗지 않습니다.</P>
        </Sub>
        <Sub title="버튼">
          <Table
            head={["버튼", "누르면"]}
            rows={[
              ["알겠습니다", "말풍선을 닫고 다시는 보여 주지 않습니다."],
              ["나중에 보기", "말풍선을 닫고, 다음에 접속했을 때 다시 보여 줍니다."],
            ]}
          />
          <P>두 버튼은 언제나 설명 아래에 둡니다.</P>
        </Sub>
        <Sub title="단계 표시">
          <Demo caption="여러 기능을 이어서 안내할 때">
            <Sample wMax={400} step="1 / 3" />
          </Demo>
          <P>사용자가 읽어야 할 말풍선이 몇 개인지 보여 줍니다. 여러 기능이나 바뀐 점을 차례로 안내할 때 켭니다.</P>
        </Sub>
        <Sub title="그림">
          <Demo caption="큰 그림 자리 (80 × 80px)">
            <Sample wMax={550} illustration={80} />
          </Demo>
          <Rules
            items={[
              "핵심을 한눈에 알게 돕는 그림을 넣을 수 있습니다. 움직이는 그림이 이해에 도움이 되면 움직여도 됩니다.",
              "크기는 두 가지입니다. 작은 그림 40 × 40px, 큰 그림 80 × 80px.",
              "그림은 글 왼쪽에 두고 오른쪽으로 16px 띄웁니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="크기와 여백">
        <Table
          head={["경우", "최대 폭 (wMax)"]}
          rows={[
            ["그림 없음", "350px"],
            ["단계 표시 있음", "400px"],
            ["큰 그림 있음", "550px"],
          ]}
        />
        <Rules
          items={[
            "제목은 300(16px), 아래 여백 4px입니다.",
            "설명은 200(14px)입니다.",
            "버튼은 M 크기입니다. 버튼 묶음의 위 여백은 16px입니다.",
            "강조 색에서는 주요 버튼과 차분한 약한 버튼을, 남색 바탕에서는 뒤집은 색(invert)의 버튼을 씁니다.",
          ]}
        />
      </Section>

      <Section title="나타나고 사라지기">
        <Rules
          items={[
            <>정해 둔 시간 뒤에 나타납니다. 시간은 <Code>timeout</Code>으로 정합니다.</>,
            "버튼 가운데 하나를 누르면 사라집니다.",
            "Esc를 누르면 사라집니다.",
            "가리키던 컨트롤을 사용자가 쓰면 사라집니다.",
            "바깥을 눌러도 사라지지 않습니다. 사용자가 읽고 스스로 닫게 합니다.",
          ]}
        />
        <Sub title="첫 안내의 일부로 쓸 때">
          <P>첫 안내는 한 번도 본 적 없는 새 사용자에게만 보여 줍니다. 한 번 본 사용자에게는 다시 보여 주지 않습니다.</P>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <Rules
          items={[
            "기능을 알리거나 처음 안내하는 데만 씁니다. 그 기능이 왜 쓸모 있는지 알리는 것이 목적입니다.",
            "사용자가 어떤 길로 와서 어떤 상황에서 이 말풍선을 만나는지 생각합니다. 그때 필요한 말만 적습니다.",
            "언제나 닫을 수 있게 합니다. 알리는 기능을 억지로 쓰게 만들지 않습니다.",
            "짧게 씁니다. 기능을 쓰기 시작하는 데 필요한 만큼만 적습니다. 차례대로 따라 하는 긴 설명은 DescriptionTooltip이나 도움말 문서로 옮깁니다.",
            "사용자가 지금 써야 하는 화면의 중요한 부분을 가리지 않게 합니다.",
          ]}
        />
        <Sub title="보여 주는 조건">
          <Rules
            items={[
              "한 번에 하나만 보여 줍니다.",
              "새 기능의 말풍선은 한 달을 넘겨 보여 주지 않습니다.",
              "상황에 맞을 때 보여 줍니다. 사용자가 그 근처의 요소를 쓰고 있거나, 다음에 할 일이 바로 그 요소일 때입니다. 필터를 만지고 있는 사용자에게 표 안의 요소를 가리키지 않습니다.",
              "사용자가 그 기능을 이미 써 봤으면 보여 주지 않습니다.",
              "한 번만 보여 줍니다. 닫았거나 \"알겠습니다\"를 눌렀으면 다시 보여 주지 않습니다. \"나중에 보기\"를 누른 경우만 예외입니다.",
            ]}
          />
        </Sub>
        <DoDont
          good={{ text: "제목: \"문서를 한 번에 승인하세요\" — 사용자가 얻는 것을 움직씨로 적습니다." }}
          bad={{ text: "제목: \"일괄 승인\" — 버튼 이름을 되풀이할 뿐 무엇이 좋은지 알 수 없습니다." }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["컴포넌트", "쓰임"]}
          rows={[
            ["FeaturePopover", "시스템이 먼저 띄워 새 기능을 알립니다. 사용자가 닫을 때까지 남습니다."],
            ["Tooltip", "사용자가 마우스를 올렸을 때 보여 주는 짧은 설명."],
            ["Dot", "글 없이 새 소식이 있음만 알립니다."],
            ["Badge", "기능의 단계(신규, 베타)를 이름표로 붙여 둡니다."],
          ]}
        />
      </Section>
    </Page>
  );
}

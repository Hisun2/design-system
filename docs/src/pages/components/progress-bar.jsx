import React from "react";
import { ProgressBar, Button, Text, Flex, Box } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "ProgressBar" };

function RunningExample() {
  const [value, setValue] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  React.useEffect(() => {
    if (!running) return undefined;
    const timer = setInterval(() => {
      setValue((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setRunning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
    return () => clearInterval(timer);
  }, [running]);
  const total = 1248;
  return (
    <Flex direction="column" gap={2} w={320}>
      <Flex justifyContent="space-between">
        <Text size={200}>{value >= 100 ? "거래처를 모두 올렸습니다." : "거래처를 올리는 중입니다"}</Text>
        <Text size={200} color="var(--ec-text-secondary)">
          {Math.round((total * value) / 100).toLocaleString("ko-KR")} / {total.toLocaleString("ko-KR")}
        </Text>
      </Flex>
      <ProgressBar value={value} aria-label="거래처 올리기 진행" />
      <Box>
        <Button
          onClick={() => {
            setValue(0);
            setRunning(true);
          }}
          disabled={running}
        >
          {value >= 100 ? "다시 해 보기" : "올리기 시작"}
        </Button>
      </Box>
    </Flex>
  );
}

export default function ProgressBarPage() {
  return (
    <Page meta={meta} lead="오래 걸리는 작업이 얼마나 진행됐는지 보여 주는 막대입니다. 보통 5초 넘게 걸리는 일에 씁니다. 자료 모으기, 여러 파일 올리기가 그런 예입니다.">
      <Section title="구성">
        <Demo>
          <Box w={320}><ProgressBar value={40} aria-label="진행 40%" /></Box>
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>ProgressBar</Code>, <>막대가 지나가는 바탕입니다. <Code>value</Code>에 0~100의 백분율을 줍니다.</>],
            [<Code>ProgressBar.Value</Code>, "채워진 부분입니다. 따로 적지 않아도 들어갑니다."],
          ]}
        />
        <P>ProgressBar는 보통 화면의 다른 기능을 막지 않습니다. 화면을 처음 열어 자료가 일부만 있거나 아직 없을 때만 예외입니다.</P>
      </Section>

      <Section title="크기">
        <Demo column>
          <Box w={320}><ProgressBar size="s" value={40} aria-label="S 크기" /></Box>
          <Box w={320}><ProgressBar size="m" value={40} aria-label="M 크기" /></Box>
          <Box w={320}><ProgressBar size="l" value={40} aria-label="L 크기" /></Box>
        </Demo>
        <Table
          head={["크기", "높이", "어디에 쓰는가"]}
          rows={[
            ["S", "4px", "화면 안의 위젯·카드 속"],
            ["M (기본)", "8px", "화면 본문"],
            ["L", "12px", "모달, 처음 여는 화면"],
          ]}
        />
      </Section>

      <Section title="종류와 색">
        <Demo caption="기본 (default) / 강조 (brand)" column>
          <Box w={320}><ProgressBar value={40} aria-label="기본" /></Box>
          <Box w={320}><ProgressBar theme="brand" value={40} aria-label="강조" /></Box>
        </Demo>
        <Demo caption="어두운 바탕용 (invert)">
          <Box w={352} p={4} bg="var(--ec-brand-navy)">
            <ProgressBar theme="invert" value={40} aria-label="어두운 바탕" />
          </Box>
        </Demo>
        <Table
          head={["theme", "언제 쓰는가"]}
          rows={[
            [<Code>default</Code>, "밝은 바탕 위. 대부분의 자리에 씁니다."],
            [<Code>brand</Code>, "밝은 바탕은 같고 채워진 부분만 강조색으로 칠합니다. 진행 자체를 눈에 띄게 해야 할 때 씁니다."],
            [<Code>invert</Code>, "어둡거나 색이 깔린 바탕 위."],
          ]}
        />
      </Section>

      <Section title="상태">
        <Demo caption="0% / 1~99% / 100%" column>
          <Box w={320}><ProgressBar value={0} aria-label="0%" /></Box>
          <Box w={320}><ProgressBar value={60} aria-label="60%" /></Box>
          <Box w={320}><ProgressBar value={100} aria-label="100%" /></Box>
        </Demo>
        <Table
          head={["값", "모양"]}
          rows={[
            ["0%", "막대 전체가 회색이고 무늬가 흐릅니다. 일이 시작됐음을 알립니다."],
            ["1~99%", "값만큼 채워지고, 채워진 부분의 무늬가 흐릅니다."],
            ["100%", "가득 차고 움직임이 멈춥니다."],
          ]}
        />
        <Rules
          items={[
            "100%인 채로 두지 않습니다. 일이 끝나면 성공을 알리는 글을 보여 주거나 다음에 할 일을 줍니다.",
            "다음 일을 바로 할 수 없으면 끝났음을 알리고, 무엇을 하면 되는지 적습니다.",
          ]}
        />
      </Section>

      <Section title="개수와 함께 쓰기">
        <Demo>
          <RunningExample />
        </Demo>
        <Rules
          items={[
            "막대 옆이나 위에 지금까지 처리한 개수를 적을 수 있습니다.",
            "전체 개수를 정확히 모르면 개수를 적지 않습니다.",
            "개수와 막대 사이 간격은 4px의 배수로 합니다.",
          ]}
        />
      </Section>

      <Section title="고정하기">
        <P>화면을 스크롤해도 막대가 보여야 하면 위쪽에 고정할 수 있습니다. 이때 막대는 필터와 표의 머리줄을 포함한 모든 요소 위에 놓입니다.</P>
      </Section>

      <Section title="시간에 따른 규칙">
        <Table
          head={["경우", "하는 일"]}
          rows={[
            ["오래 걸릴 것을 미리 앎", "시작하자마자 진행을 보여 줍니다."],
            ["얼마나 걸릴지 모름", "3초 기다린 뒤 대강의 진행을 보여 줍니다."],
            ["아주 빨리 끝남", "막대를 적어도 3초는 보여 줍니다. 나타났다 바로 사라지면 화면이 깜빡이는 것처럼 보입니다."],
          ]}
        />
        <P>
          얼마나 걸릴지 알 수 없는 첫 자료 모으기에서는 채워지는 부분 없이 흐르는 무늬만 보여 줄 수 있습니다. 끝이 다가온다는 느낌만 줍니다.
        </P>
      </Section>

      <Section title="쓰는 법">
        <Sub title="씁니다">
          <Rules
            items={[
              "오래 걸리지만 그동안 다른 일을 할 수 있는 작업을 보여 줄 때.",
              "짧은 작업이라도 끝까지 얼마나 남았는지가 중요할 때. 여러 파일을 올리는 경우입니다.",
              "오래 걸리고 그동안 다른 일을 할 수 없지만, 언제 끝나는지는 알아야 할 때.",
            ]}
          />
        </Sub>
        <Sub title="쓰지 않습니다">
          <Rules
            items={[
              "5초 안에 끝나는 일에는 쓰지 않습니다. Spin을 씁니다.",
              "폼의 단계를 보여 주는 데 쓰지 않습니다. Wizard를 씁니다.",
            ]}
          />
        </Sub>
        <DoDont
          good={{
            demo: (
              <Flex direction="column" gap={2} w={240}>
                <Text size={200}>문서 12건 가운데 5건을 올렸습니다</Text>
                <ProgressBar value={42} aria-label="문서 올리기" />
              </Flex>
            ),
            text: "무슨 일이 얼마나 됐는지 글로 함께 알립니다.",
          }}
          bad={{
            demo: <Box w={240}><ProgressBar value={100} aria-label="끝난 작업" /></Box>,
            text: "끝난 뒤에도 가득 찬 막대를 그대로 두지 않습니다.",
          }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Rules
          items={[
            "짧게 기다리는 일에는 Spin, 내용이 들어올 자리를 미리 보여 줄 때는 Skeleton을 씁니다.",
            "보이지 않는 곳에서 작업이 끝났음을 알릴 때는 NoticeBubble을 씁니다.",
            "값의 크기를 견주는 막대는 차트입니다. ProgressBar는 진행에만 씁니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

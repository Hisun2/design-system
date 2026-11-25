import React from "react";
import { Button, Spin, SpinContainer, Skeleton, ProgressBar, Input, Flex, Box, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "로딩 상태", order: 5 };

const ROWS = ["가나다 상사 · 문서 12건", "라마바 물산 · 문서 4건", "사아자 유통 · 문서 27건"];

/** 처음 불러올 때: 0.6초가 지나도 안 끝났을 때만 뼈대를 보입니다. */
function SkeletonDemo() {
  const [state, setState] = React.useState("done"); // done | waiting | skeleton
  const load = () => {
    setState("waiting");
    setTimeout(() => setState((s) => (s === "waiting" ? "skeleton" : s)), 600);
    setTimeout(() => setState("done"), 2600);
  };
  return (
    <Flex direction="column" gap={4} w={320}>
      <Box h={84}>
        {state === "skeleton" ? (
          <Skeleton h={84}>
            <Skeleton.Text amount={3} />
          </Skeleton>
        ) : state === "done" ? (
          ROWS.map((row) => <Text tag="p" size={200} my={2} key={row}>{row}</Text>)
        ) : null}
      </Box>
      <Flex>
        <Button onClick={load} disabled={state !== "done"}>처음부터 다시 불러오기</Button>
      </Flex>
    </Flex>
  );
}

/** 이미 있는 내용을 다시 거를 때: 내용 위를 덮습니다. */
function SpinContainerDemo() {
  const [loading, setLoading] = React.useState(false);
  const search = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };
  return (
    <Flex direction="column" gap={4} w={320}>
      <Flex gap={2}>
        <Input><Input.Value aria-label="거래처 검색" placeholder="거래처 이름" /></Input>
        <Button onClick={search}>검색</Button>
      </Flex>
      <SpinContainer loading={loading} size="l">
        {ROWS.map((row) => <Text tag="p" size={200} my={2} key={row}>{row}</Text>)}
      </SpinContainer>
    </Flex>
  );
}

/** 오래 걸리는 일: 얼마나 됐는지 보여 줍니다. */
function ProgressDemo() {
  const [value, setValue] = React.useState(0);
  const timer = React.useRef(null);
  const start = () => {
    setValue(0);
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setValue((v) => {
        if (v >= 100) {
          clearInterval(timer.current);
          return 100;
        }
        return v + 10;
      });
    }, 600);
  };
  React.useEffect(() => () => clearInterval(timer.current), []);
  return (
    <Flex direction="column" gap={2} w={320}>
      <Text size={200}>{value >= 100 ? "문서 1,280건을 모두 모았습니다." : `문서를 모으고 있습니다. ${value}%`}</Text>
      <ProgressBar value={value} aria-label="문서 모으기 진행률" />
      <Flex mt={2}>
        <Button onClick={start}>모으기 시작</Button>
      </Flex>
    </Flex>
  );
}

export default function LoadingStatesPage() {
  return (
    <Page meta={meta} lead="기다리는 동안 무슨 일이 일어나고 있는지, 얼마나 기다려야 하는지 알려 주는 방법입니다. 상황에 따라 뼈대, 도는 표시, 진행 막대를 골라 씁니다.">
      <Section title="종류">
        <Demo>
          <Skeleton h={48} w={200}><Skeleton.Text amount={2} /></Skeleton>
          <Spin size="l" />
          <Box w={200}><ProgressBar value={60} aria-label="진행률 예시" /></Box>
        </Demo>
        <Table
          head={["컴포넌트", "무엇을 알리는가", "언제 쓰는가"]}
          rows={[
            ["Skeleton (뼈대)", "곧 나올 화면의 모양", "화면이나 데이터를 처음 불러올 때"],
            ["SpinContainer (덮는 표시)", "이미 보이는 내용을 바꾸는 중", "필터, 정렬, 검색으로 내용을 다시 불러올 때"],
            ["Spin (도는 표시)", "요소 하나가 처리 중", "표의 칸 하나, 버튼 하나처럼 작은 요소"],
            ["ProgressBar (진행 막대)", "얼마나 진행됐는지", "5초 넘게 걸리는 일"],
          ]}
        />
      </Section>

      <Section title="여백">
        <Rules
          items={[
            "로딩 표시를 담은 상자에는 바깥 여백을 둡니다. 화면 폭이 바뀌어도 옆의 요소와 달라붙지 않게 합니다.",
            "여백은 4px의 배수로 합니다. 도는 표시 둘레에는 40px을 권합니다.",
            "로딩 상태의 높이는 내용이 나온 뒤의 높이와 비슷하게 맞춥니다. 내용이 나오면서 화면이 덜컥 움직이지 않게 합니다.",
          ]}
        />
        <Demo caption="도는 표시 둘레 40px" gray>
          <Box bg="var(--ec-bg-surface)" borderRadius="12px">
            <Spin size="xl" m={10} />
          </Box>
        </Demo>
      </Section>

      <Section title="시스템의 응답">
        <Sub title="차례로 불러오기">
          <P>
            화면이 빨리 뜨는 것을 알고 있으면 뼈대도 도는 표시도 없이, 준비된 것부터 차례로 보여 줍니다. 입력창과 보내는 버튼처럼 일하는 데 꼭 필요한 것을 먼저 보이고, 그림이나 안내 글은 그 뒤에 보입니다.
          </P>
        </Sub>
        <Sub title="화면 불러오기">
          <P>그 밖의 경우에는 화면을 불러오는 동안 뼈대를 보입니다.</P>
          <Demo caption="불러오기 시작 후 0.6초 동안은 아무것도 보이지 않다가, 그 뒤에 뼈대가 나옵니다">
            <SkeletonDemo />
          </Demo>
          <Rules
            items={[
              "뼈대는 불러오기 시작 후 600ms가 지나도 끝나지 않았을 때 보입니다. 금방 끝나는 화면에서 뼈대가 번쩍였다 사라지는 것을 막습니다.",
              "이 600ms 규칙은 모든 화면에 똑같이 적용합니다. 화면 사이를 옮겨 다닐 때 깜빡임이 없어야 합니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <Sub title="Skeleton">
          <Rules
            items={[
              "데이터를 처음 불러올 때 씁니다.",
              "불러오는 화면과 데이터의 짜임새(제목, 줄 수, 표의 모양)를 미리 보여 줄 때 씁니다.",
              "스크롤을 내려 새 데이터를 더 불러올 때 씁니다.",
            ]}
          />
        </Sub>
        <Sub title="SpinContainer">
          <Demo caption="'검색'을 누르면 목록 위가 덮입니다">
            <SpinContainerDemo />
          </Demo>
          <Rules
            items={[
              "위젯·표·화면의 많은 데이터를 필터로 거를 때 씁니다.",
              "많은 데이터를 정렬할 때 씁니다.",
              "데이터를 검색할 때 씁니다.",
              "금방 끝나면 이 상태를 건너뜁니다. 잠깐 덮였다 걷히는 것은 오히려 거슬립니다.",
              "덮여 있는 동안에도 이전 내용이 비쳐 보이게 둡니다. 화면이 비지 않아야 합니다.",
            ]}
          />
        </Sub>
        <Sub title="Spin">
          <Demo>
            <Text size={200}>승인 상태</Text>
            <Spin size="xs" />
            <Button loading>저장</Button>
          </Demo>
          <P>표의 칸 하나처럼 요소 하나만 기다릴 때는 SpinContainer 대신 Spin을 그 자리에 둡니다. 버튼은 <Code>loading</Code> 상태를 씁니다.</P>
        </Sub>
        <Sub title="ProgressBar">
          <Demo>
            <ProgressDemo />
          </Demo>
          <Rules
            items={[
              "데이터를 모으는 데 5초 넘게 걸리면 진행 막대를 씁니다.",
              "기준 시간은 자리에 따라 달라질 수 있습니다. 예를 들어 표에서는 1분 넘게 걸릴 때 씁니다.",
              "막대 가까이에 지금 무엇을 하는지와 얼마나 됐는지를 글로 적습니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="고르는 법">
        <DoDont
          good={{
            demo: <Skeleton h={48} w={200}><Skeleton.Text amount={2} /></Skeleton>,
            text: "처음 불러오는 화면에는 뼈대를 씁니다. 무엇이 나올지 미리 알 수 있습니다.",
          }}
          bad={{
            demo: <Spin size="xxl" />,
            text: "빈 화면 한가운데에 큰 도는 표시만 두지 않습니다. 무엇을 기다리는지 알 수 없습니다.",
          }}
        />
      </Section>
    </Page>
  );
}

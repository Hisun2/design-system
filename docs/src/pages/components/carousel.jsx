import React from "react";
import { Carousel, Flex, Box, Text } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Carousel" };

const slides = [
  { title: "문서 일괄 승인", body: "여러 건을 골라 한 번에 승인합니다." },
  { title: "거래처 묶음 등록", body: "목록을 붙여 넣어 한꺼번에 등록합니다." },
  { title: "담당자 알림", body: "승인 요청이 오면 담당자에게 알립니다." },
];

function Slide({ title, body }) {
  return (
    <Flex direction="column" justifyContent="center" h={140} p={6} style={{ background: "var(--ec-bg-info)" }}>
      <Text size={300} bold>{title}</Text>
      <Text size={200} mt={1}>{body}</Text>
    </Flex>
  );
}

export default function CarouselPage() {
  return (
    <Page meta={meta} lead="같은 급의 내용 여러 장을 한 자리에 겹쳐 두고 한 장씩 넘겨 보는 요소입니다. 그림 모음이나 카드 묶음에 씁니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "그림이나 카드처럼 같은 급의 내용이 여러 장 있을 때 씁니다.",
            "화면에 자리가 모자라 여러 장을 한 자리에 넣어야 할 때 씁니다.",
            "첫 화면의 Carousel은 사용자가 지나치기 쉽습니다. 둘째 장부터는 거의 보지 않는다고 생각하고 씁니다.",
            "중요한 기능이나 정보를 한 번 더 알리는 자리로만 씁니다. 중요한 내용으로 가는 길이 Carousel 하나뿐이면 안 됩니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Demo column>
          <Carousel w={480} aria-label="새 기능 안내">
            <Flex>
              <Carousel.Prev />
              <Carousel.ContentBox>
                <Carousel.Container>
                  {slides.map((s) => (
                    <Carousel.Item key={s.title}><Slide {...s} /></Carousel.Item>
                  ))}
                </Carousel.Container>
              </Carousel.ContentBox>
              <Carousel.Next />
            </Flex>
            <Carousel.Indicators />
          </Carousel>
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>Carousel.Container</Code>, "여러 장을 담는 틀입니다. 이 틀이 옆으로 움직입니다."],
            [<Code>Carousel.Item</Code>, "한 장입니다. 그림, 영상, 카드 등 무엇이든 담을 수 있습니다."],
            [<><Code>Carousel.Prev</Code>, <Code>Carousel.Next</Code></>, "앞 장·다음 장으로 넘기는 버튼입니다."],
            [<Code>Carousel.Indicators</Code>, "몇 장이 있고 지금 몇째 장인지 알리는 점입니다. 점을 눌러 그 장으로 갈 수 있습니다. 없어도 됩니다."],
          ]}
        />
      </Section>

      <Section title="종류">
        <Table
          head={["indicators", "모양"]}
          rows={[
            [<Code>default</Code>, "아래에 점으로 표시합니다. 기본값입니다."],
            [<Code>preview</Code>, "아래에 작은 미리 보기 그림으로 표시합니다. 그림 모음에 씁니다."],
            [<Code>hide</Code>, "표시하지 않습니다. 넘기는 버튼만 남습니다."],
          ]}
        />
        <Demo caption="끝에서 멈추기 (bounded)" column>
          <Carousel w={480} bounded aria-label="새 기능 안내">
            {slides.map((s) => (
              <Carousel.Item key={s.title}><Slide {...s} /></Carousel.Item>
            ))}
          </Carousel>
        </Demo>
        <Rules
          items={[
            <>기본은 마지막 장 다음에 첫 장으로 돌아갑니다. <Code>bounded</Code>를 주면 첫 장과 마지막 장에서 멈추고, 더 갈 수 없는 쪽 버튼이 흐려집니다.</>,
            <>그림을 크게 봐야 하면 <Code>zoom</Code>을 줍니다. 장을 누르면 큰 창으로 열립니다.</>,
            "어두운 그림 위에 놓는 버튼과 점은 inverted로 색을 뒤집습니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "버튼, 점, 키보드의 좌우 화살표로 넘깁니다.",
            "넘어가는 움직임은 0.35초입니다.",
            "스스로 넘어가게 만들지 않습니다. 사용자가 읽는 도중에 내용이 바뀌면 안 됩니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <Rules
          items={[
            "다섯 장을 넘기지 않습니다. 그보다 많으면 사용자가 끝까지 넘기지 않고, 이미 본 장을 다시 찾기도 어렵습니다.",
            "모두 몇 장인지, 지금 몇째 장인지 알립니다. 사용자가 끝을 알 수 있어야 합니다.",
            "장 안의 링크와 버튼은 충분히 크게 만듭니다. 작은 버튼이 바짝 붙어 있거나 어지러운 그림 위에 있으면 찾기도 누르기도 어렵습니다.",
            "어떤 사용자는 첫 장만 봅니다. 장마다 그 장만 봐도 뜻이 통하게 만듭니다.",
            "넘길 필요가 없다면 그림 한 장이나 멈춰 있는 카드 묶음으로 바꾸는 것을 먼저 생각합니다.",
          ]}
        />
        <DoDont
          good={{ text: "새 기능 소개처럼 놓쳐도 일에 지장이 없는 내용을 담습니다." }}
          bad={{ text: "승인 대기 건수, 오류 알림처럼 반드시 봐야 하는 내용을 둘째 장 뒤에 두지 않습니다." }}
        />
        <P>장에 그림만 있으면 그림마다 대신 읽을 글(alt)을 답니다.</P>
      </Section>
    </Page>
  );
}

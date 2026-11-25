import React from "react";
import { Button, DropdownMenu, WidgetEmpty, NoData, getIllustrationPath, Flex, Box, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "빈 화면", order: 6 };

/** 화면 전체가 비었을 때의 기본 모양: 왼쪽 그림, 오른쪽 글과 버튼. */
function EmptyPage({ title, text, action, more }) {
  return (
    <Flex gap={8} alignItems="center" flexWrap>
      <Box tag="img" src={getIllustrationPath("suggestion")} alt="" w={300} h={230} flex="0 0 auto" />
      <Box wMax={360}>
        <Text tag="h3" size={400} bold m={0}>{title}</Text>
        <Text tag="p" size={200} mt={2} mb={4}>{text}</Text>
        <Flex gap={2}>
          <Button use="primary" theme="info">{action}</Button>
          {more}
        </Flex>
      </Box>
    </Flex>
  );
}

export default function EmptyPagePage() {
  return (
    <Page meta={meta} lead="아직 보여 줄 데이터가 없는 화면의 모습입니다. 왜 비어 있는지 알리고, 시작하려면 무엇을 해야 하는지 안내합니다.">
      <Section title="언제 나오는가">
        <P>대개 사용자가 무언가를 해야 기능이 돌아가고 데이터가 쌓이는 화면에서 나옵니다.</P>
        <Table
          head={["상황", "알릴 것", "권하는 동작"]}
          rows={[
            ["이 기능이나 데이터를 볼 권한이 없습니다", "무엇을 볼 수 없는지, 누구에게 요청하는지", "\"권한 요청\""],
            ["아직 아무것도 만들거나 설정하지 않았습니다", "이 화면에서 무엇을 할 수 있는지", "\"거래처 등록\", \"문서 만들기\""],
            ["곧 생길 기능의 자리입니다", "어떤 기능이 언제쯤 생기는지", "없음, 또는 \"소식 받기\""],
          ]}
        />
        <P>빈 화면은 이 기능이 무엇을 해 주는지 소개하는 자리이기도 합니다. 처음 온 사람이 다음에 할 일을 바로 알 수 있어야 합니다.</P>
      </Section>

      <Section title="모양">
        <Demo caption="기본 모양">
          <EmptyPage
            title="등록한 거래처가 없습니다"
            text="거래처를 등록하면 문서와 승인 기록을 거래처별로 모아 볼 수 있습니다."
            action="거래처 등록"
          />
        </Demo>
        <Table
          head={["부분", "규칙"]}
          rows={[
            ["그림", "글의 왼쪽에 둡니다. 크기는 300px × 230px입니다."],
            ["제목", <>20px(<Code>--ec-fs-400</Code>, <Code>--ec-lh-400</Code>), 굵게.</>],
            ["설명", <>14px(<Code>--ec-fs-200</Code>, <Code>--ec-lh-200</Code>). 작은 글자이므로 배경과의 대비를 확인합니다.</>],
            ["주요 버튼", <>M 크기의 주요 버튼(<Code>use="primary"</Code>) 하나.</>],
            ["덧붙이는 버튼", "필요하면 약한 버튼을 하나 더 둡니다. 누르면 도움이 되는 정보의 목록이 열립니다."],
          ]}
        />
        <Rules
          items={[
            "안내 전체를 화면 왼쪽에 맞춥니다. 화면 폭 전체로 늘이지 않습니다.",
            "그림과 글을 합친 폭이 660px을 넘지 않게 합니다. 넘으면 읽기 어렵습니다.",
            "설명은 두세 문장을 넘기지 않습니다.",
          ]}
        />
        <Demo caption="덧붙이는 버튼이 있는 모양">
          <EmptyPage
            title="만든 문서가 없습니다"
            text="문서를 만들어 담당자에게 승인을 요청할 수 있습니다."
            action="문서 만들기"
            more={
              <DropdownMenu>
                <DropdownMenu.Trigger tag={Button} use="tertiary" theme="info">더 알아보기</DropdownMenu.Trigger>
                <DropdownMenu.Menu>
                  <DropdownMenu.Item>문서 만드는 법</DropdownMenu.Item>
                  <DropdownMenu.Item>승인 절차 안내</DropdownMenu.Item>
                  <DropdownMenu.Item>자주 묻는 질문</DropdownMenu.Item>
                </DropdownMenu.Menu>
              </DropdownMenu>
            }
          />
        </Demo>
      </Section>

      <Section title="여백과 크기">
        <Table
          head={["자리", "값"]}
          rows={[
            ["그림과 글 사이", <>32px <Code>--ec-spacing-8x</Code></>],
            ["제목과 설명 사이", <>8px <Code>--ec-spacing-2x</Code></>],
            ["설명과 버튼 사이", <>16px <Code>--ec-spacing-4x</Code></>],
            ["버튼과 버튼 사이", <>8px <Code>--ec-spacing-2x</Code></>],
            ["글 영역의 최대 폭", "360px"],
          ]}
        />
      </Section>

      <Section title="그림">
        <Rules
          items={[
            "상황에 맞는 그림을 따로 그려 쓸 수 있습니다.",
            "그림은 지금 가려져 있는 기능의 핵심을 보여 줍니다. 표가 나올 화면이면 표를, 차트가 나올 화면이면 차트를 닮게 합니다.",
            "그림은 꾸밈입니다. 뜻은 글로 전하고, 그림의 대체 글은 비워 둡니다.",
            "그림에도 색 규칙을 지킵니다. 회색을 바탕으로 하고 Blue를 조금만 씁니다.",
          ]}
        />
      </Section>

      <Section title="쓰이는 자리">
        <Sub title="옆 메뉴가 있는 화면">
          <P>옆 메뉴는 그대로 두고 본문 영역만 빈 화면으로 바꿉니다. 안내는 본문 영역의 왼쪽 위에서 시작합니다. 메뉴까지 가리면 다른 곳으로 갈 수 없습니다.</P>
          <Demo gray>
            <Flex w="100%" gap={4}>
              <Box w={140} p={4} bg="var(--ec-bg-surface)" borderRadius="12px" flex="0 0 auto">
                <Text tag="p" size={200} m={0} mb={2} bold>거래처</Text>
                <Text tag="p" size={200} m={0} mb={2}>문서</Text>
                <Text tag="p" size={200} m={0}>승인</Text>
              </Box>
              <Box p={6} bg="var(--ec-bg-surface)" borderRadius="12px" flex="1 1 0">
                <Text tag="h3" size={400} bold m={0}>등록한 거래처가 없습니다</Text>
                <Text tag="p" size={200} mt={2} mb={4}>거래처를 등록하면 여기에 목록이 나옵니다.</Text>
                <Button use="primary" theme="info">거래처 등록</Button>
              </Box>
            </Flex>
          </Demo>
        </Sub>
        <Sub title="표와 위젯 안">
          <P>화면 전체가 아니라 표나 위젯 하나만 비었을 때는 이 패턴 대신 WidgetEmpty를 씁니다. 가운데에 맞추고 작은 그림을 씁니다. 자세한 규칙은 테이블의 상태 문서를 봅니다.</P>
          <Demo>
            <WidgetEmpty icon={getIllustrationPath("nothing-found")}>
              <WidgetEmpty.Title>조건에 맞는 문서가 없습니다</WidgetEmpty.Title>
              <WidgetEmpty.Description>기간을 넓히거나 필터를 지워 보십시오.</WidgetEmpty.Description>
              <Button mt={4}>필터 지우기</Button>
            </WidgetEmpty>
          </Demo>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "\"등록한 거래처가 없습니다\" + \"거래처 등록\" 버튼 — 왜 비었는지와 다음 할 일을 함께 알립니다." }}
          bad={{ text: "\"데이터 없음\"만 적고 끝내지 않습니다. 사용자가 무엇을 해야 할지 알 수 없습니다." }}
        />
      </Section>

      <Section title="다른 것과의 구분">
        <Table
          head={["상황", "쓰는 것"]}
          rows={[
            ["기능을 아직 쓰기 시작하지 않아 화면 전체가 비었음", "빈 화면 (이 문서)"],
            ["검색·필터 결과가 없거나 위젯 하나가 비었음", <><Code>WidgetEmpty</Code>, <Code>NoData</Code></>],
            ["오류 때문에 화면을 보여 줄 수 없음", "오류 화면"],
          ]}
        />
      </Section>
    </Page>
  );
}

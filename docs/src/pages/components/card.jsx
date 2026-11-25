import React from "react";
import { Card, Button, Divider, Text, Flex, Box, Link } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Card" };

export default function CardPage() {
  return (
    <Page meta={meta} lead="서로 관련 있는 데이터와 컨트롤을 한 덩어리로 묶는 상자입니다. 대시보드의 위젯, 상세 화면의 정보 묶음에 씁니다.">
      <Section title="구성">
        <Demo gray column>
          <Card w={420}>
            <Card.Header>
              <Card.Title>이번 달 승인 현황</Card.Title>
              <Card.Description>승인 요청일 기준으로 집계합니다.</Card.Description>
            </Card.Header>
            <Card.Body>
              <Text size={200}>승인 42건, 반려 3건, 대기 7건</Text>
            </Card.Body>
          </Card>
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>Card.Header</Code>, "제목, 설명, 카드 전체에 걸리는 컨트롤(내려받기, 설정)을 담습니다."],
            [<Code>Card.Title</Code>, "카드 제목입니다."],
            [<Code>Card.Description</Code>, "제목 아래 덧붙이는 설명입니다. 없어도 됩니다."],
            [<Code>Card.Body</Code>, "내용을 담습니다. 위쪽 컨트롤, 내용, 아래쪽 컨트롤 순서로 놓습니다."],
          ]}
        />
      </Section>

      <Section title="모양">
        <Rules
          items={[
            <>테두리와 그림자가 없습니다. 흰 바탕(<Code>--ec-bg-surface</Code>)이 회색 페이지 바탕(<Code>--ec-bg-page</Code>)과 구분됩니다.</>,
            <>모서리는 12px(<Code>--ec-radius-card</Code>)입니다.</>,
            "안쪽 여백은 24px입니다.",
            "카드에 색을 칠하지 않습니다. 화면의 틀은 흰색과 회색만 씁니다.",
          ]}
        />
      </Section>

      <Section title="크기">
        <Demo gray caption="작은 카드 / 큰 카드">
          <Card w={200}>
            <Card.Header><Card.Title>승인 대기</Card.Title></Card.Header>
            <Card.Body><Text size={500} bold>7</Text></Card.Body>
          </Card>
          <Card w={420}>
            <Card.Header>
              <Card.Title>거래처별 문서 수</Card.Title>
              <Card.Description>최근 30일 동안 올라온 문서입니다.</Card.Description>
            </Card.Header>
            <Card.Body><Text size={200}>표나 차트가 들어가는 자리입니다.</Text></Card.Body>
          </Card>
        </Demo>
        <Rules
          items={[
            "폭과 높이는 정해져 있지 않습니다. 놓이는 격자와 내용에 맞춥니다.",
            "작은 카드는 숫자 하나, 짧은 목록처럼 한눈에 읽는 내용에 씁니다.",
            "큰 카드는 차트, 표처럼 살펴봐야 하는 내용에 씁니다.",
            "한 줄에 놓인 카드는 높이를 맞춥니다.",
          ]}
        />
      </Section>

      <Section title="머리 부분">
        <Demo gray column>
          <Card w={420}>
            <Card.Header>
              <Flex justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Card.Title hintAfter="승인 요청일 기준입니다">거래처별 문서 수</Card.Title>
                  <Card.Description>최근 30일 동안 올라온 문서입니다.</Card.Description>
                </Box>
                <Button use="tertiary" theme="muted">내려받기</Button>
              </Flex>
            </Card.Header>
            <Card.Body><Text size={200}>내용</Text></Card.Body>
          </Card>
        </Demo>
        <Sub title="제목">
          <Rules
            items={[
              "글자 크기 300(16px), 굵기 700입니다.",
              "제목 뒤에 정보 아이콘을 붙여 설명 풍선으로 뜻을 덧붙일 수 있습니다.",
              "자리가 모자라면 제목을 말줄임표로 줄이고, 마우스를 올리면 전체를 보여 줍니다.",
            ]}
          />
        </Sub>
        <Sub title="설명">
          <Rules
            items={[
              "데이터가 무엇을 기준으로 한 것인지, 눈여겨볼 점이 무엇인지 적습니다.",
              <>제목에서 8px 아래에 둡니다. 색은 <Code>--ec-text-secondary</Code>입니다.</>,
            ]}
          />
        </Sub>
        <Sub title="카드 전체에 걸리는 컨트롤">
          <P>내려받기, 설정처럼 카드 전체에 걸리는 컨트롤은 머리 부분의 오른쪽 끝에 둡니다. 약한 버튼을 씁니다.</P>
        </Sub>
      </Section>

      <Section title="내용 부분">
        <Rules
          items={[
            "필터나 버튼 같은 위쪽 컨트롤이 있으면 내용보다 먼저 놓습니다.",
            "내용은 위쪽 컨트롤에서 20px 아래에 둡니다.",
            "아래쪽 컨트롤(더 보기, 페이지 이동)은 내용에서 20px 아래에 둡니다.",
            "위·아래 컨트롤은 필요할 때만 둡니다.",
          ]}
        />
        <Sub title="안쪽 여백">
          <Table
            head={["내용", "여백"]}
            rows={[
              ["글, 숫자, 차트", "사방 24px"],
              ["표", "표가 카드의 좌우 끝까지 닿게 하려면 내용 부분의 좌우 여백을 0으로 합니다. 표의 첫 칸과 끝 칸이 24px 안쪽 여백을 대신합니다."],
            ]}
          />
        </Sub>
        <Sub title="카드 사이 간격">
          <P>카드와 카드 사이는 가로세로 모두 16px입니다. 4px의 배수를 지킵니다.</P>
        </Sub>
      </Section>

      <Section title="구역 나누기">
        <Demo gray column>
          <Card w={420}>
            <Card.Header><Card.Title>거래처 정보</Card.Title></Card.Header>
            <Card.Body>
              <Text size={200}>담당자 3명</Text>
            </Card.Body>
            <Divider />
            <Card.Body>
              <Text size={200}>첨부 문서 12건</Text>
            </Card.Body>
          </Card>
        </Demo>
        <P>한 카드 안에서 내용을 나눠야 하면 Divider로 구역을 가릅니다. 구역마다 안쪽 여백은 같게 둡니다.</P>
      </Section>

      <Section title="동작">
        <Demo gray column>
          <Card w={320}>
            <Card.Header>
              <Card.Title tag={Link} href="#">승인 대기 문서</Card.Title>
            </Card.Header>
            <Card.Body><Text size={200}>7건</Text></Card.Body>
          </Card>
        </Demo>
        <Rules
          items={[
            "카드 자체는 눌리지 않는 것이 기본입니다.",
            "상세 화면으로 보내야 하면 제목을 링크로 만듭니다.",
            "카드 전체를 누르게 만들 때는 마우스를 올렸을 때 그림자로 눌린다는 것을 알립니다. 이때는 카드 안에 다른 버튼을 두지 않습니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "한 카드에는 한 가지 주제만 담습니다. 제목이 그 주제를 말합니다." }}
          bad={{ text: "카드 안에 카드를 넣지 않습니다. 나눠야 하면 Divider로 구역을 가릅니다." }}
        />
      </Section>
    </Page>
  );
}

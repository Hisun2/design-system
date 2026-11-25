import React from "react";
import { Text, Breadcrumbs, Card, Box } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Ellipsis" };

const longName = "2026년 하반기 해외 거래처 공급 계약서 승인 요청 문서 (최종 수정본)";
const longBody =
  "이 문서는 거래처와 맺는 공급 계약의 조건을 담고 있습니다. 담당자가 먼저 검토한 뒤 부서장이 승인합니다. 반려한 경우에는 반려 사유를 적어 요청한 사람에게 돌려보냅니다. 승인이 끝난 문서는 수정할 수 없습니다.";

export default function EllipsisPage() {
  return (
    <Page meta={meta} lead="자리에 다 들어가지 않는 글을 말줄임표(…)로 줄여 보여 주는 기능입니다. 한 줄 글은 마우스를 올리면 전체가 설명 풍선으로 나옵니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "글이 다음 줄로 넘어가면 안 될 때 씁니다.",
            "문단을 정해진 줄 수에서 끊어야 할 때 씁니다.",
            "사용자가 적은 글이나 그때그때 달라지는 글이어서 자리를 얼마나 잡아야 할지 알 수 없을 때 씁니다. 예: 제자리에서 고치는 이름",
          ]}
        />
        <P>아래 경우에는 쓰지 않습니다.</P>
        <Rules
          items={[
            "오류 글, 입력 검사 결과, 그 밖의 알림은 줄이지 않습니다. 끝까지 읽어야 하는 글입니다.",
            "자리가 넉넉한데 줄이지 않습니다.",
            "문장 끝의 문장 부호로 말줄임표를 쓰지 않습니다.",
          ]}
        />
      </Section>

      <Section title="줄이는 위치">
        <Demo caption="끝을 줄임 (기본)" column>
          <Box w={280}>
            <Text size={200} ellipsis>{longName}</Text>
          </Box>
        </Demo>
        <Demo caption="가운데를 줄임 (ellipsis:cropPosition=&quot;middle&quot;)" column>
          <Box w={280}>
            <Text size={200} ellipsis ellipsis:cropPosition="middle">{longName}</Text>
          </Box>
        </Demo>
        <Demo caption="여러 줄 뒤에서 줄임 (ellipsis:maxLine={2})" column>
          <Box w={280}>
            <Text size={200} ellipsis ellipsis:maxLine={2}>{longBody}</Text>
          </Box>
        </Demo>
        <Table
          head={["위치", "언제 쓰는가"]}
          rows={[
            ["끝", "가장 흔한 경우입니다. 글이 더 있음을 알리거나 긴 글을 짧게 보여 줄 때 씁니다."],
            ["가운데", "여러 글의 앞뒤는 다르고 가운데가 같을 때 씁니다. 파일 이름의 확장자, 문서 번호의 끝자리처럼 끝이 잘리면 안 될 때도 씁니다."],
            ["여러 줄 뒤", "문단을 두세 줄만 보여 줄 때 씁니다. 끝을 줄이는 경우에만 됩니다."],
          ]}
        />
        <P>
          Text에 <Code>ellipsis</Code>를 주면 줄여집니다. 가운데를 줄일 때 끝에 반드시 남길 글자 수는 <Code>ellipsis:lastRequiredSymbols</Code>로 정합니다.
        </P>
      </Section>

      <Section title="설명 풍선">
        <Rules
          items={[
            "한 줄 글을 줄였으면, 줄인 글에 마우스를 올렸을 때 전체 글이 설명 풍선으로 나옵니다.",
            "글이 줄여지지 않았으면 설명 풍선은 나오지 않습니다.",
            "여러 줄을 줄인 문단에는 설명 풍선을 달지 않습니다. 전체 글이 풍선에 담기에는 너무 깁니다. 전체를 볼 방법(펼치기, 상세 화면)을 따로 둡니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 곳">
        <Sub title="긴 주소와 파일 이름">
          <Demo column>
            <Box w={280}>
              <Text size={200} ellipsis ellipsis:cropPosition="middle">공급계약서_해외거래처_2026년하반기_최종수정본_검토의견반영.pdf</Text>
            </Box>
          </Demo>
          <P>표와 카드에는 긴 주소와 파일 이름이 자주 나옵니다. 끝이 중요한 글이므로 가운데를 줄입니다.</P>
        </Sub>
        <Sub title="표의 머리글">
          <P>좁은 자리에 열을 더 넣으려고 열 이름을 줄일 수 있습니다. 이때는 반드시 마우스를 올리면 열 이름 전체가 나오게 합니다.</P>
        </Sub>
        <Sub title="Breadcrumbs">
          <Demo column>
            <Box w={320}>
              <Breadcrumbs>
                <Breadcrumbs.Item href="#">문서</Breadcrumbs.Item>
                <Breadcrumbs.Item href="#">2026년 하반기 거래처 계약 문서 모음</Breadcrumbs.Item>
                <Breadcrumbs.Item active>공급 계약서 승인 요청 상세</Breadcrumbs.Item>
              </Breadcrumbs>
            </Box>
          </Demo>
          <P>경로가 길면 항목마다 끝을 줄입니다.</P>
        </Sub>
        <Sub title="카드 제목">
          <Demo gray column>
            <Card w={240}>
              <Card.Header>
                <Card.Title tag={Text} ellipsis wMax="100%">{longName}</Card.Title>
              </Card.Header>
              <Card.Body><Text size={200}>승인 대기</Text></Card.Body>
            </Card>
          </Demo>
          <P>좁은 카드에서 제목을 줄일 수 있습니다. 마우스를 올리면 제목 전체가 나오게 합니다.</P>
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <Box w={220}><Text size={200} ellipsis>{longName}</Text></Box>,
            text: "한 줄을 줄였으면 전체 글을 볼 방법을 함께 줍니다.",
          }}
          bad={{
            demo: <Text size={200} color="var(--ec-text-critical)">사업자 번호는 000-00-…</Text>,
            text: "오류나 안내 글을 줄이지 않습니다. 사용자가 무엇을 고쳐야 하는지 알 수 없게 됩니다.",
          }}
        />
        <Rules
          items={[
            "숫자, 금액, 날짜는 줄이지 않습니다. 잘린 숫자는 다른 값으로 읽힙니다.",
            "버튼의 글자는 줄이지 않습니다. 글자를 짧게 고칩니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

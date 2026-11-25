import React from "react";
import { Text, Box, Link, Card } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "말줄임", order: 1 };

const long = "2026년 하반기 거래처별 납품 일정 및 단가 협의 결과 정리 문서";
const paragraph =
  "이번 분기에는 신규 거래처 12곳과 계약을 맺었고, 기존 거래처 가운데 34곳이 계약을 갱신했습니다. 납품 지연은 지난 분기보다 줄었으며, 지연 사유의 대부분은 서류 보완 요청이었습니다. 다음 분기에는 서류 접수 단계의 안내를 고쳐 보완 요청을 줄일 계획입니다.";

export default function EllipsisPage() {
  return (
    <Page meta={meta} lead="글자가 주어진 자리보다 길 때 넘치는 부분을 말줄임표(…)로 줄이는 기능입니다. 한 줄 글자를 줄이면 마우스를 올렸을 때 전체 글자가 설명 풍선으로 나옵니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "글자가 다음 줄로 넘어가면 안 되는 자리일 때(표의 칸, 탭, 태그).",
            "문단을 정해진 줄 수까지만 보여 줘야 할 때(카드의 설명 글).",
            "사용자가 입력했거나 데이터에서 오는 글자여서 길이를 미리 알 수 없을 때. 예를 들어 제자리 수정 입력창의 폭.",
          ]}
        />
        <Sub title="쓰지 않는 경우">
          <Rules
            items={[
              "오류 문구, 입력 검증 문구, 그 밖의 알림은 줄이지 않습니다. 끝까지 읽혀야 합니다.",
              "자리가 넉넉한데 글자를 줄이지 않습니다.",
              "문장 끝의 문장부호처럼 말줄임표를 쓰지 않습니다. \"불러오는 중…\" 같은 표현은 이 기능과 관계없습니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <P>
          <Code>Text</Code>에 <Code>ellipsis</Code>를 줍니다. 세부 설정은 <Code>ellipsis:cropPosition</Code>, <Code>ellipsis:maxLine</Code>처럼 <Code>ellipsis:</Code>를 앞에 붙여 줍니다. 글자가 자리에 다 들어가면 아무 일도 일어나지 않습니다.
        </P>
      </Section>

      <Section title="줄이는 위치">
        <Demo caption="끝 (기본)" column>
          <Box w={280}>
            <Text ellipsis>{long}</Text>
          </Box>
        </Demo>
        <Demo caption="가운데 (ellipsis:cropPosition=&quot;middle&quot;)" column>
          <Box w={280}>
            <Text ellipsis ellipsis:cropPosition="middle">거래처_납품일정_단가협의_결과정리_최종본_2026-11-25.xlsx</Text>
          </Box>
        </Demo>
        <Demo caption="여러 줄 (ellipsis:maxLine={2})" column>
          <Box w={360}>
            <Text ellipsis ellipsis:maxLine={2}>{paragraph}</Text>
          </Box>
        </Demo>
        <Table
          head={["위치", "언제 쓰는가"]}
          rows={[
            ["끝", "가장 흔한 경우입니다. 글자나 문단의 뒤에 내용이 더 있음을 알리거나, 긴 글자를 짧게 보여 줄 때 씁니다."],
            ["가운데", "여러 글자가 앞과 끝은 서로 다른데 가운데가 똑같을 때 씁니다. 끝을 자르면 안 되는 글자에도 씁니다(파일 이름의 확장자, 문서 번호의 끝자리, 주소의 끝부분)."],
            ["여러 줄 뒤", "문단을 정해진 줄 수에서 자릅니다. 끝에서 줄일 때만 됩니다."],
          ]}
        />
        <P>
          가운데를 줄일 때 끝에 반드시 남길 글자 수는 <Code>ellipsis:lastRequiredSymbols</Code>로 정합니다.
        </P>
      </Section>

      <Section title="설명 풍선">
        <Rules
          items={[
            "한 줄 글자가 줄어들면, 그 글자에 마우스를 올리거나 키보드로 옮겨 갔을 때 전체 글자가 설명 풍선으로 나옵니다.",
            "글자가 줄어들지 않았으면 설명 풍선은 나오지 않습니다.",
            "여러 줄 문단을 줄일 때는 설명 풍선이 나오지 않습니다. 전체 글이 풍선에 담기에는 너무 길기 때문입니다. 전체 내용을 볼 방법(\"더 보기\", 상세 화면)을 따로 둡니다.",
            <>설명 풍선을 끄려면 <Code>hint={"{false}"}</Code>를 줍니다. 끌 때는 전체 글자를 볼 다른 방법이 있어야 합니다.</>,
          ]}
        />
      </Section>

      <Section title="자리별 규칙">
        <Sub title="긴 주소(URL)">
          <Demo column>
            <Box w={280}>
              <Link href="#">
                <Text ellipsis ellipsis:cropPosition="middle">https://example.com/documents/2026/contracts/renewal/detail?id=20261125</Text>
              </Link>
            </Box>
          </Demo>
          <P>표와 카드에는 긴 주소가 자주 나옵니다. 주소는 앞(어느 사이트인지)과 끝(어느 문서인지)이 중요하므로 가운데를 줄입니다. 자세한 것은 표의 링크 규칙을 따릅니다.</P>
        </Sub>
        <Sub title="표의 머리글">
          <Demo column>
            <Box w={96}>
              <Text ellipsis size={100} medium>평균 처리 소요 일수</Text>
            </Box>
          </Demo>
          <P>좁은 자리에 열을 더 넣으려고 열 이름을 줄일 수 있습니다. 이때는 반드시 마우스를 올리면 전체 이름이 나와야 합니다.</P>
        </Sub>
        <Sub title="이동 경로(Breadcrumbs)">
          <P>이동 경로의 항목을 줄여야 하면 항목마다 끝을 줄입니다. 경로 전체를 한 덩어리로 줄이지 않습니다.</P>
        </Sub>
        <Sub title="카드 제목">
          <Demo column>
            <Card w={280}>
              <Card.Header>
                <Card.Title tag="h4">
                  <Text ellipsis>{long}</Text>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Text ellipsis ellipsis:maxLine={2}>{paragraph}</Text>
              </Card.Body>
            </Card>
          </Demo>
          <P>좁은 자리에 정보를 더 담으려고 카드 제목을 줄일 수 있습니다. 이때도 마우스를 올리면 전체 제목이 나와야 합니다.</P>
        </Sub>
      </Section>

      <Section title="쓰는 법 정리">
        <DoDont
          good={{
            demo: (
              <Box w={200}>
                <Text ellipsis>{long}</Text>
              </Box>
            ),
            text: "길이를 알 수 없는 데이터 글자를 한 줄로 줄이고, 전체 글자는 설명 풍선으로 보여 줍니다.",
          }}
          bad={{
            demo: (
              <Box w={200}>
                <Text ellipsis color="var(--ec-text-critical)">거래처 이름은 반드시 입력해야 하며 50자를 넘을 수 없습니다.</Text>
              </Box>
            ),
            text: "오류 문구와 알림은 줄이지 않습니다. 자리가 모자라면 다음 줄로 넘깁니다.",
          }}
        />
      </Section>
    </Page>
  );
}

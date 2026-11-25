import React from "react";
import { Flags, iso2Name, Flex, ScrollArea, Text } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Flags" };

const MAIN = [
  ["KR", "대한민국"],
  ["US", "미국"],
  ["CN", "중국"],
  ["JP", "일본"],
  ["VN", "베트남"],
  ["DE", "독일"],
];

export default function FlagsPage() {
  return (
    <Page meta={meta} lead="나라를 나타내는 작은 국기 그림입니다. 나라 이름이나 국가 번호 옆에 붙여 빨리 알아보게 돕습니다.">
      <Section title="종류">
        <Demo caption="자주 쓰는 나라">
          {MAIN.map(([code, name]) => (
            <Flex key={code} alignItems="center" gap={2}>
              <Flags iso2={code} />
              <Text size={200}>{name}</Text>
            </Flex>
          ))}
        </Demo>
        <Demo caption="쓸 수 있는 국기 전체 (두 글자 나라 코드)" column>
          <ScrollArea h={240}>
            <Flex flexWrap>
              {Object.keys(iso2Name).map((code) => (
                <Flex key={code} direction="column" alignItems="center" w={64} p={2} gap={1}>
                  <Flags name={code} />
                  <Text size={100}>{code}</Text>
                </Flex>
              ))}
            </Flex>
          </ScrollArea>
        </Demo>
        <P>
          국기는 나라 코드로 고릅니다. 쓸 수 있는 코드와 영어 나라 이름의 짝은 <Code>iso2Name</Code>에 들어 있습니다.
        </P>
        <Table
          head={["속성", "넣는 값", "예"]}
          rows={[
            [<Code>iso2</Code>, "두 글자 나라 코드", <Code>iso2="KR"</Code>],
            [<Code>iso3</Code>, "세 글자 나라 코드", <Code>iso3="KOR"</Code>],
            [<Code>name</Code>, "두 글자·세 글자 코드 모두, 그리고 코드가 없는 지역·연합 이름", <Code>name="KR"</Code>],
          ]}
        />
        <P>
          세 글자 코드를 두 글자로 바꿀 때는 <Code>iso3iso2</Code>를 씁니다.
        </P>
      </Section>

      <Section title="크기와 여백">
        <Demo>
          <Flex alignItems="center">
            <Flags iso2="KR" mr={2} />
            <Text size={200}>대한민국</Text>
          </Flex>
          <Flex alignItems="center">
            <Flags iso2="KR" mr={2} />
            <Text size={300}>대한민국</Text>
          </Flex>
        </Demo>
        <Rules
          items={[
            "국기 크기는 한 가지입니다. 늘리거나 줄이지 않습니다.",
            "국기와 글자 사이는 8px 띄웁니다.",
            "국기와 글자는 세로 가운데를 맞춥니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Flex alignItems="center" gap={2}>
                <Flags iso2="VN" />
                <Text size={200}>베트남</Text>
              </Flex>
            ),
            text: "국기 옆에 나라 이름을 함께 적습니다.",
          }}
          bad={{
            demo: <Flags iso2="VN" />,
            text: "국기만 두지 않습니다. 비슷한 국기가 많고, 그림만으로는 화면 낭독기가 읽지 못합니다.",
          }}
        />
        <Rules
          items={[
            "국기는 나라를 뜻할 때만 씁니다. 언어를 고르는 자리에는 쓰지 않습니다. 한 나라가 여러 언어를 쓰고, 한 언어를 여러 나라가 씁니다.",
            "입력창 안(전화번호의 국가 번호), 선택 목록의 항목, 표의 나라 칸에 덧붙이는 요소로 넣습니다.",
            "자리가 좁아 국기만 둘 수밖에 없으면 설명 풍선으로 나라 이름을 알려 줍니다.",
            "나라와 관계없는 장식으로 쓰지 않습니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

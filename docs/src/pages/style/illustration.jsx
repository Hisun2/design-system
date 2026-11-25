import React from "react";
import { NoData, Flex } from "@ec21rnc/ui";
import NothingFound from "@semcore/illustration/NothingFound";
import Maintenance from "@semcore/illustration/Maintenance";
import Congrats from "@semcore/illustration/Congrats";
import { Page, Section, P, Rules, Table, Demo, Code } from "../../kit.jsx";

export const meta = { title: "일러스트레이션", order: 5 };

export default function IllustrationPage() {
  return (
    <Page meta={meta} lead="빈 화면, 오류 화면, 완료 화면처럼 글자만으로는 허전한 자리에 넣는 그림입니다.">
      <Section title="무엇을 쓰는가">
        <P>
          Intergalactic의 그림 묶음을 씁니다. 그림의 색은 우리 차트 색과 상태 색에 연결되어 있어 화면의 다른 색과 어울립니다.
        </P>
        <Demo>
          <Flex gap={6} alignItems="center">
            <NothingFound />
            <Maintenance />
            <Congrats />
          </Flex>
        </Demo>
        <P>
          그림은 하나씩 불러옵니다. 예: <Code>import NothingFound from "@semcore/illustration/NothingFound"</Code>
        </P>
      </Section>

      <Section title="쓰는 자리">
        <Table
          head={["자리", "예", "함께 보는 장"]}
          rows={[
            ["데이터가 없는 영역", "검색 결과 없음, 아직 등록된 항목 없음", "WidgetEmpty, 빈 화면 패턴"],
            ["오류 화면", "페이지 없음, 권한 없음, 점검 중", "오류 화면 패턴"],
            ["완료 안내", "등록 완료, 신청 완료", "완료 안내 패턴"],
          ]}
        />
        <Demo caption="빈 상태 컴포넌트에는 그림이 이미 들어 있습니다">
          <NoData />
        </Demo>
      </Section>

      <Section title="규칙">
        <Rules
          items={[
            "그림은 한 화면에 하나만 둡니다.",
            "그림 아래에는 반드시 무슨 상황인지와 다음에 할 일을 글로 적습니다. 그림만으로 뜻을 전하지 않습니다.",
            "그림의 색, 비율을 바꾸지 않습니다. 잘라 쓰지 않습니다.",
            "표의 줄, 버튼, 입력창처럼 작은 자리에는 그림 대신 아이콘을 씁니다.",
            "업무 중 자주 보는 화면(목록, 폼)에는 꾸미기 위한 그림을 넣지 않습니다.",
            "외부에서 가져온 그림이나 사진을 섞어 쓰지 않습니다. 필요한 그림이 묶음에 없으면 그림 없이 글자와 버튼만으로 구성합니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

import React from "react";
import { Breadcrumbs, Box } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Breadcrumbs" };

export default function BreadcrumbsPage() {
  return (
    <Page meta={meta} lead="지금 보는 화면이 전체 구조에서 어디에 있는지 보여 주는 경로 표시입니다. 주 메뉴를 돕는 보조 이동 수단입니다.">
      <Section title="왜 쓰는가">
        <Rules
          items={[
            "사용자가 지금 어느 화면에 있는지 조용히 알려 줍니다.",
            "위 단계 화면으로 가는 링크가 됩니다. 브라우저의 뒤로 가기를 누르지 않고 한 번에 올라갈 수 있습니다.",
            "첫 화면처럼 맨 위 단계의 화면에는 두지 않습니다. 보여 줄 경로가 없습니다.",
          ]}
        />
      </Section>

      <Section title="모양">
        <Demo>
          <Breadcrumbs>
            <Breadcrumbs.Item href="#">거래처</Breadcrumbs.Item>
            <Breadcrumbs.Item href="#">거래처 목록</Breadcrumbs.Item>
            <Breadcrumbs.Item active>거래처 상세</Breadcrumbs.Item>
          </Breadcrumbs>
        </Demo>
        <Table
          head={["부분", "모양"]}
          rows={[
            ["링크", <>글자 크기 200(14px), 색 <Code>--ec-text-secondary</Code>, 손 모양 커서</>],
            ["구분 화살표", "오른쪽을 보는 작은 화살표. 링크보다 흐린 회색"],
            ["마지막 항목", <>지금 화면입니다. 색 <Code>--ec-text-primary</Code>, 누를 수 없습니다.</>],
          ]}
        />
        <P>
          마지막 항목에는 <Code>active</Code>를 줍니다. 마지막 항목은 언제나 누를 수 없습니다.
        </P>
      </Section>

      <Section title="여백">
        <P>항목과 구분 화살표 사이 간격은 8px입니다.</P>
      </Section>

      <Section title="상태">
        <Table
          head={["상태", "모양"]}
          rows={[
            ["기본", <>색 <Code>--ec-text-secondary</Code></>],
            ["마우스를 올림", <>색 <Code>--ec-text-primary</Code>, 밑줄</>],
            ["지금 화면 (active)", <>색 <Code>--ec-text-primary</Code>, 밑줄 없음</>],
          ]}
        />
      </Section>

      <Section title="긴 이름 줄이기">
        <Demo caption="폭이 모자라면 항목마다 끝을 줄입니다" column>
          <Box w={320}>
            <Breadcrumbs>
              <Breadcrumbs.Item href="#">문서</Breadcrumbs.Item>
              <Breadcrumbs.Item href="#">2026년 하반기 거래처 계약 문서 모음</Breadcrumbs.Item>
              <Breadcrumbs.Item active>공급 계약서 승인 요청 상세</Breadcrumbs.Item>
            </Breadcrumbs>
          </Box>
        </Demo>
        <Rules
          items={[
            "화면이 좁거나 이름이 길어 자리가 모자라면 항목의 끝을 말줄임표로 줄입니다.",
            "줄인 항목에 마우스를 올리면 전체 이름이 설명 풍선으로 나와야 합니다.",
            "두 줄로 넘기지 않습니다.",
          ]}
        />
      </Section>

      <Section title="단계의 순서">
        <Rules
          items={[
            "첫째 항목은 그 업무의 첫 화면이나 목록입니다. 예: 거래처",
            "둘째 항목은 그 안에서 고른 대상의 이름입니다. 예: 거래처 이름",
            "셋째 항목은 그 대상 안에서 보고 있는 화면입니다. 예: 계약 문서",
            "항목 이름은 그 화면의 제목과 같게 씁니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Breadcrumbs>
                <Breadcrumbs.Item href="#">문서</Breadcrumbs.Item>
                <Breadcrumbs.Item href="#">승인 대기</Breadcrumbs.Item>
                <Breadcrumbs.Item active>문서 상세</Breadcrumbs.Item>
              </Breadcrumbs>
            ),
            text: "화면의 위아래 구조를 그대로 보여 줍니다. 페이지 제목 위에 둡니다.",
          }}
          bad={{
            demo: (
              <Breadcrumbs>
                <Breadcrumbs.Item href="#">검색 결과</Breadcrumbs.Item>
                <Breadcrumbs.Item href="#">문서 상세</Breadcrumbs.Item>
                <Breadcrumbs.Item href="#">담당자</Breadcrumbs.Item>
              </Breadcrumbs>
            ),
            text: "사용자가 지나온 화면의 기록을 나열하지 않습니다. 마지막 항목을 링크로 두지 않습니다.",
          }}
        />
      </Section>
    </Page>
  );
}

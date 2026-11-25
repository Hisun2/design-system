import React from "react";
import { DataTable, StatusTag } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, Code } from "../../kit.jsx";

export const meta = { title: "테이블 한눈에 보기", order: 1 };

const rows = [
  { name: "가나상사", manager: "김담당", status: <StatusTag status="success">승인</StatusTag>, amount: "12,480", date: "2026-11-25" },
  { name: "다라물산", manager: "이담당", status: <StatusTag status="progress">진행 중</StatusTag>, amount: "8,300", date: "2026-11-24" },
  { name: "마바산업", manager: "박담당", status: <StatusTag status="warning">확인 필요</StatusTag>, amount: "154,000", date: "2026-11-21" },
  { name: "사아유통", manager: "최담당", status: <StatusTag status="neutral">시작 전</StatusTag>, amount: "2,950", date: "2026-11-20" },
];

export default function TableOverviewPage() {
  return (
    <Page
      meta={meta}
      lead="사내 업무 시스템의 화면은 대부분 목록입니다. 표와 관련된 규칙이 어느 문서에 있는지 여기서 찾습니다. 표는 모두 DataTable 컴포넌트 하나로 만듭니다."
    >
      <Section title="표의 모습">
        <Demo column>
          <DataTable
            aria-label="거래처 문서 목록"
            data={rows}
            columns={[
              { name: "name", children: "거래처" },
              { name: "manager", children: "담당자" },
              { name: "status", children: "상태" },
              { name: "amount", children: "금액(원)", justifyContent: "flex-end" },
              { name: "date", children: "등록일" },
            ]}
          />
        </Demo>
        <Rules
          items={[
            "숫자와 금액은 오른쪽에 맞추고 세 자리마다 쉼표를 찍습니다. 단위는 머리글에 적습니다.",
            "날짜는 2026-11-25 모양으로 적습니다.",
            <>데이터의 상태는 <Code>StatusTag</Code>로 보여 줍니다.</>,
          ]}
        />
      </Section>

      <Section title="표의 종류">
        <Table
          head={["종류", "쓰임", "기능"]}
          rows={[
            ["기본 표", "많은 데이터를 보여 주고 다루는 표. 목록 화면의 중심입니다.", "정렬, 행 선택, 펼치는 행, 고정 머리글 등을 모두 씁니다."],
            ["보조 표", "카드나 요약 상자 안에서 적은 데이터를 간단히 보여 주는 표", "보기 전용입니다. 복잡한 조작을 넣지 않습니다."],
          ]}
        />
        <P>두 종류 모두 DataTable로 만들고 <Code>use</Code>(<Code>primary</Code>, <Code>secondary</Code>)로 구분합니다.</P>
      </Section>

      <Section title="문서 안내">
        <Table
          head={["문서", "다루는 내용"]}
          rows={[
            ["DataTable", "표의 구성, 종류와 변형, 칸 내용의 모양, 머리글(설명 풍선·긴 이름·고정·여러 단), 행의 상태, 맞춤, 가로 스크롤"],
            ["표 안의 조작", "정렬, 펼치는 행, 행 선택과 일괄 동작, 열 너비, 칸에서 바로 고치기, 찾은 글자 강조, 링크, 긴 글자, 쪽 이동, 표 설정과 열 관리"],
            ["표의 상태", "처음 불러올 때, 오래 걸릴 때, 다시 불러올 때, 볼 수 없는 데이터, 빈 표, 데이터 없음, 찾은 것 없음, 오류, 칸의 상태"],
            ["필터 공통 규칙", "표 위에 두는 필터의 모양과 동작. 필터 묶음의 문서에서 종류별 규칙을 다룹니다."],
          ]}
        />
      </Section>

      <Section title="자주 만나는 경우">
        <Table
          head={["경우", "쓰는 것", "볼 문서"]}
          rows={[
            ["목록 화면", "기본 표 + 표 위의 필터 + 표 아래의 쪽 이동", "DataTable, 표 안의 조작"],
            ["여러 건을 한꺼번에 승인·삭제", "행 선택과 일괄 동작 줄", "표 안의 조작"],
            ["한 행의 자세한 내용을 그 자리에서 보기", "펼치는 행", "표 안의 조작"],
            ["열이 많은 표", "좁은 표, 첫 열 고정, 가로 스크롤, 열 관리", "DataTable, 표 안의 조작"],
            ["카드 안의 요약 표", "보조 표, 카드 변형", "DataTable"],
            ["결과가 없거나 불러오지 못함", "빈 상태 안내", "표의 상태"],
          ]}
        />
      </Section>
    </Page>
  );
}

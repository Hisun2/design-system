import React from "react";
import { DataTable, ROW_GROUP, StatusTag, Tag, Card, Tooltip, Text, Flex, Box, Spin, Button } from "@ec21rnc/ui";
import FileExportM from "@semcore/icon/FileExport/m";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code, Swatch } from "../../kit.jsx";

export const meta = { title: "DataTable", order: 2 };

const rows = [
  { id: "D-1042", name: "가나상사", manager: "김담당", status: <StatusTag status="success">승인</StatusTag>, amount: "12,480", date: "2026-11-25" },
  { id: "D-1041", name: "다라물산", manager: "이담당", status: <StatusTag status="progress">진행 중</StatusTag>, amount: "8,300", date: "2026-11-24" },
  { id: "D-1040", name: "마바산업", manager: "박담당", status: <StatusTag status="warning">확인 필요</StatusTag>, amount: "154,000", date: "2026-11-21" },
  { id: "D-1039", name: "사아유통", manager: "최담당", status: <StatusTag status="critical">반려</StatusTag>, amount: "2,950", date: "2026-11-20" },
];

const baseColumns = [
  { name: "name", children: "거래처" },
  { name: "manager", children: "담당자" },
  { name: "status", children: "상태" },
  { name: "amount", children: "금액(원)", justifyContent: "flex-end" },
  { name: "date", children: "등록일" },
];

const manyRows = Array.from({ length: 12 }, (_, i) => ({
  id: `D-${1042 - i}`,
  name: ["가나상사", "다라물산", "마바산업", "사아유통"][i % 4],
  manager: ["김담당", "이담당", "박담당", "최담당"][i % 4],
  amount: ["12,480", "8,300", "154,000", "2,950"][i % 4],
  date: `2026-11-${String(25 - i).padStart(2, "0")}`,
}));

const stateRows = [
  { id: "1", state: "기본", name: "가나상사", amount: "12,480" },
  { id: "2", state: "읽지 않음 (muted)", name: "다라물산", amount: "8,300" },
  { id: "3", state: "선택됨 (info)", name: "마바산업", amount: "154,000" },
  { id: "4", state: "새로 추가됨 (success)", name: "사아유통", amount: "2,950" },
  { id: "5", state: "주의 (warning)", name: "자차기업", amount: "41,200" },
  { id: "6", state: "문제 있음 (danger)", name: "카타상회", amount: "0" },
  { id: "7", state: <Flex gap={2} alignItems="center">내 항목<Tag size="m" theme="primary">나</Tag></Flex>, name: "파하무역", amount: "7,700" },
  { id: "8", state: <Flex gap={2} alignItems="center"><Spin size="xs" />처리 중</Flex>, name: "거너상사", amount: "3,100" },
];
const stateTheme = { 2: "muted", 3: "info", 4: "success", 5: "warning", 6: "danger" };

const mergedRows = [
  {
    team: "영업1팀",
    [ROW_GROUP]: [
      { name: "가나상사", amount: "12,480" },
      { name: "다라물산", amount: "8,300" },
    ],
  },
  {
    team: "영업2팀",
    [ROW_GROUP]: [
      { name: "마바산업", amount: "154,000" },
      { name: "사아유통", amount: "2,950" },
    ],
  },
];

const wideColumns = [
  { name: "name", children: "거래처", fixed: "left", gtcWidth: "140px" },
  { name: "id", children: "문서 번호", gtcWidth: "140px" },
  { name: "manager", children: "담당자", gtcWidth: "140px" },
  { name: "date", children: "등록일", gtcWidth: "140px" },
  { name: "amount", children: "공급가액(원)", gtcWidth: "160px", justifyContent: "flex-end" },
  { name: "tax", children: "세액(원)", gtcWidth: "160px", justifyContent: "flex-end" },
  { name: "total", children: "합계(원)", gtcWidth: "160px", justifyContent: "flex-end" },
];
const wideRows = manyRows.slice(0, 4).map((r) => ({ ...r, tax: "1,248", total: "13,728" }));

export default function DataTablePage() {
  return (
    <Page
      meta={meta}
      lead="행과 열로 된 데이터를 보여 주는 표입니다. 목록 화면의 중심이며 정렬, 선택, 펼치기, 고정 머리글 같은 기능을 함께 제공합니다."
    >
      <Section title="구성">
        <Demo column>
          <DataTable aria-label="거래처 문서 목록" data={rows} columns={baseColumns} />
        </Demo>
        <Table
          head={["부분", "설명"]}
          rows={[
            ["머리글", "열의 이름을 적는 맨 윗줄입니다. 정렬 표시와 설명 풍선이 여기에 붙습니다."],
            ["행", "데이터 한 건입니다. 마우스를 올리면 행 전체의 바탕색이 바뀝니다."],
            ["칸", "글자, 숫자, 상태 태그, 링크, 버튼 같은 내용이 들어갑니다."],
            ["표 주변", "표 위에는 필터와 일괄 동작 줄을, 표 아래에는 쪽 이동(Pagination)을 둡니다."],
          ]}
        />
        <Rules
          items={[
            <>표에는 반드시 이름을 붙입니다. <Code>aria-label</Code>에 "거래처 문서 목록"처럼 표의 내용을 적습니다.</>,
            <><Code>columns</Code>의 <Code>name</Code>은 데이터의 키와 같아야 합니다. 영문자, 숫자, 붙임표(-), 밑줄(_)만 씁니다.</>,
            <>행을 구분하는 값이 있으면 <Code>uniqueRowKey</Code>로 알려 줍니다. 선택과 펼치기가 이 값을 기준으로 동작합니다.</>,
          ]}
        />
      </Section>

      <Section title="종류">
        <Demo caption="기본 표 (use=&quot;primary&quot;, 기본값)" column>
          <DataTable aria-label="기본 표" data={rows.slice(0, 3)} columns={baseColumns} />
        </Demo>
        <Demo caption="보조 표 (use=&quot;secondary&quot;)" column>
          <DataTable
            aria-label="보조 표"
            use="secondary"
            data={rows.slice(0, 3)}
            columns={[baseColumns[0], baseColumns[2], baseColumns[3]]}
          />
        </Demo>
        <Table
          head={["종류", "언제 쓰는가", "기능"]}
          rows={[
            ["기본 표", "목록 화면처럼 데이터가 많고 조작이 필요한 곳", "정렬, 선택, 펼치기, 고정 머리글 등 모두 사용"],
            ["보조 표", "카드나 요약 상자 안에서 적은 데이터를 간단히 보여 줄 때", "보기 전용. 조작 기능을 넣지 않음"],
          ]}
        />
        <Rules
          items={[
            "보조 표에는 체크박스와 펼치는 행을 넣지 않습니다.",
            "보조 표에서는 눌러서 바꾸는 정렬 대신, 지금 어떤 순서인지만 알려 주는 표시를 씁니다.",
            "한 화면에서 가장 중요한 표 하나만 기본 표로 합니다.",
          ]}
        />
      </Section>

      <Section title="변형">
        <Sub title="좁은 표">
          <Demo caption="compact — 칸의 좌우 여백이 8px로 줄어듭니다" column>
            <DataTable aria-label="좁은 표" compact data={rows.slice(0, 3)} columns={baseColumns} />
          </Demo>
          <P>열이 많아 가로 공간이 부족할 때 기본 표에 <Code>compact</Code>를 줍니다. 위아래 여백은 그대로입니다.</P>
        </Sub>
        <Sub title="카드 안의 표">
          <Demo caption="variant=&quot;card&quot;" gray column>
            <Card w="100%">
              <Card.Header>
                <Card.Title>최근 등록 문서</Card.Title>
              </Card.Header>
              <Card.Body px={0} pb={0}>
                <DataTable
                  aria-label="최근 등록 문서"
                  variant="card"
                  use="secondary"
                  data={rows.slice(0, 3)}
                  columns={[baseColumns[0], baseColumns[2], baseColumns[3]]}
                />
              </Card.Body>
            </Card>
          </Demo>
          <Rules
            items={[
              <>표를 카드 안에 넣을 때는 <Code>variant="card"</Code>를 줍니다. 첫 열과 마지막 열의 바깥 여백이 20px로 늘어 카드의 제목 줄과 맞습니다.</>,
              "마지막 행의 아래 선은 없어집니다. 카드의 모서리와 선이 겹치지 않게 하기 위해서입니다.",
              "카드 본문의 좌우 여백은 0으로 하고 표가 카드 폭을 가득 채우게 합니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="칸 안 내용의 모양">
        <Demo column>
          <DataTable
            aria-label="칸 내용의 모양"
            data={[
              {
                name: "가나상사",
                note: <Text color="text-secondary">메모 없음</Text>,
                file: (
                  <Flex gap={1} alignItems="center">
                    <FileExportM color="icon-secondary-neutral" />
                    견적서.pdf
                  </Flex>
                ),
              },
            ]}
            columns={[
              { name: "name", children: "본문 글자" },
              { name: "note", children: "보조 글자" },
              { name: "file", children: "아이콘과 글자" },
            ]}
          />
        </Demo>
        <Table
          head={["내용", "모양"]}
          rows={[
            ["본문 글자", <>크기 200(14px), 굵기 400. 색은 <Swatch token="text-primary" /> <Code>--ec-text-primary</Code></>],
            ["보조 글자", <>덜 중요한 설명, 단위, 빈 값. 색은 <Swatch token="text-secondary" /> <Code>--ec-text-secondary</Code></>],
            ["머리글 글자", <>크기 100(12px). 색은 <Code>--ec-text-secondary</Code>. 정렬된 열은 <Code>--ec-text-primary</Code>에 굵기 700</>],
            ["아이콘", "M 크기. 글자 옆이든 혼자든 보조 글자와 같은 회색을 씁니다."],
            ["상태", <>색 글자 대신 <Code>StatusTag</Code>를 씁니다.</>],
          ]}
        />
        <Rules
          items={[
            "날짜는 2026-11-25, 금액은 12,480처럼 적습니다. 단위(원, 건, %)는 칸마다 되풀이하지 않고 머리글에 적습니다.",
            "색을 칠한 칸에서는 아이콘 색을 한 단계 진하게 해 대비를 지킵니다.",
          ]}
        />
      </Section>

      <Section title="머리글">
        <Sub title="설명 풍선">
          <Demo column>
            <DataTable
              aria-label="머리글 설명 풍선"
              data={rows.slice(0, 2)}
              columns={[
                baseColumns[0],
                {
                  name: "amount",
                  justifyContent: "flex-end",
                  children: <Tooltip title="부가세를 뺀 공급가액입니다.">금액(원)</Tooltip>,
                },
                baseColumns[4],
              ]}
            />
          </Demo>
          <P>열 이름만으로 뜻을 알기 어려우면 머리글에 설명 풍선을 답니다. 계산 방법, 기준일처럼 한두 문장으로 끝나는 설명만 넣습니다.</P>
        </Sub>

        <Sub title="긴 이름">
          <Demo caption="기본: 다음 줄로 넘김 / 공간이 좁을 때: 말줄임" column>
            <Box w={420}>
              <DataTable
                aria-label="긴 머리글"
                data={[{ a: "12", b: "3" }]}
                columns={[
                  { name: "a", gtcWidth: "210px", children: "이번 달에 새로 등록한 거래처 문서 건수" },
                  {
                    name: "b",
                    gtcWidth: "210px",
                    children: <Text ellipsis>이번 달에 승인이 반려된 거래처 문서 건수</Text>,
                  },
                ]}
              />
            </Box>
          </Demo>
          <Rules
            items={[
              "긴 열 이름은 기본으로 다음 줄로 넘깁니다.",
              "공간이 정말 부족할 때만 한 줄로 자르고 말줄임표(…)를 붙입니다. 이때 마우스를 올리면 전체 이름이 나와야 합니다.",
              "먼저 이름을 줄일 수 있는지 봅니다. \"등록 건수\"처럼 짧게 쓰고 자세한 뜻은 설명 풍선으로 옮깁니다.",
            ]}
          />
        </Sub>

        <Sub title="고정 머리글">
          <Demo caption="headerProps={{ sticky: true }} — 표 안에서 스크롤해 보세요" column>
            <DataTable
              aria-label="고정 머리글"
              h={220}
              headerProps={{ sticky: true }}
              data={manyRows}
              columns={[
                { name: "id", children: "문서 번호" },
                { name: "name", children: "거래처" },
                { name: "manager", children: "담당자" },
                { name: "amount", children: "금액(원)", justifyContent: "flex-end" },
                { name: "date", children: "등록일" },
              ]}
            />
          </Demo>
          <Rules
            items={[
              "행이 많아 화면을 넘기는 표는 머리글을 고정해 스크롤해도 열 이름이 보이게 합니다.",
              "고정된 머리글에는 그림자를 넣지 않습니다. 아래 선만으로 구분합니다.",
              <>화면 위에 고정된 상단바가 있으면 <Code>headerProps.top</Code>으로 그 높이만큼 내려 줍니다.</>,
            ]}
          />
        </Sub>

        <Sub title="여러 단 머리글">
          <Demo column>
            <DataTable
              aria-label="여러 단 머리글"
              data={[
                { name: "가나상사", supply: "12,480", tax: "1,248", total: "13,728" },
                { name: "다라물산", supply: "8,300", tax: "830", total: "9,130" },
              ]}
              columns={[
                { name: "name", children: "거래처" },
                {
                  name: "money",
                  children: "금액(원)",
                  borders: "both",
                  columns: [
                    { name: "supply", children: "공급가액", justifyContent: "flex-end" },
                    { name: "tax", children: "세액", justifyContent: "flex-end" },
                    { name: "total", children: "합계", justifyContent: "flex-end" },
                  ],
                },
              ]}
            />
          </Demo>
          <Rules
            items={[
              "서로 관련된 열은 위 단에 묶음 이름을 두어 묶을 수 있습니다.",
              "묶음은 두 단까지만 씁니다. 묶음의 양옆에는 세로선을 넣어 범위를 보여 줍니다.",
              "위 단의 묶음 이름으로는 정렬하지 않습니다. 정렬은 아래 단의 열에서만 합니다.",
            ]}
          />
        </Sub>

        <Sub title="정렬">
          <P>정렬 표시와 동작은 "표 안의 조작" 문서의 정렬 부분을 따릅니다.</P>
        </Sub>
      </Section>

      <Section title="행의 상태">
        <P>
          행에 마우스를 올리면 행 전체의 바탕색이 바뀝니다. 데이터가 많을 때 지금 보고 있는 줄을 놓치지 않게 하고, 열기·삭제 같은 동작이 어느 행에 대한 것인지 알려 줍니다.
        </P>
        <Demo caption="rowProps로 행마다 theme을 줍니다. 마우스를 올려 보세요" column>
          <DataTable
            aria-label="행의 상태"
            uniqueRowKey="id"
            data={stateRows}
            rowProps={(row) => ({ theme: stateTheme[row.id] })}
            columns={[
              { name: "state", children: "행의 상태" },
              { name: "name", children: "거래처" },
              { name: "amount", children: "금액(원)", justifyContent: "flex-end" },
            ]}
          />
        </Demo>
        <Table
          head={["상태", "theme", "바탕색", "마우스를 올렸을 때"]}
          rows={[
            ["기본", "없음", <><Swatch token="bg-surface" /> <Code>--ec-bg-surface</Code></>, <><Swatch token="bg-page" /> <Code>--ec-bg-page</Code></>],
            ["읽지 않음", <Code>muted</Code>, "옅은 회색", "기본 행과 같음"],
            ["선택됨", <Code>info</Code>, <><Swatch token="bg-selected" /> <Code>--ec-bg-selected</Code></>, "선택 색 유지"],
            ["새로 추가됨", <Code>success</Code>, <><Swatch token="bg-success" /> <Code>--ec-bg-success</Code></>, "색 유지"],
            ["주의", <Code>warning</Code>, <><Swatch token="bg-warning" /> <Code>--ec-bg-warning</Code></>, "색 유지"],
            ["문제 있음", <Code>danger</Code>, <><Swatch token="bg-critical" /> <Code>--ec-bg-critical</Code></>, "색 유지"],
            ["내 항목", "없음", "기본 행과 같고 \"나\" 태그를 붙임", "기본 행과 같음"],
            ["처리 중", "없음", "행 안의 내용을 흐리게 하고 XS 크기 Spin을 둠", "바뀌지 않음"],
            ["볼 수 없음(제한)", "없음", "행 위에 흐린 덮개를 씌움", "바뀌지 않음"],
          ]}
        />
        <Rules
          items={[
            "행의 어느 칸에 마우스를 올려도 행 전체가 반응합니다.",
            "칸 안의 링크나 버튼 위에 마우스가 있으면 행은 올린 상태를 유지하고, 그 요소도 따로 강조됩니다.",
            "행 전체가 비활성이면 마우스를 올려도 바탕색이 바뀌지 않습니다.",
            "바탕색만으로 상태를 전하지 않습니다. 상태 태그나 글자를 함께 둡니다.",
            "색 바탕은 꼭 알려야 할 행에만 씁니다. 표의 절반 이상이 색이면 강조의 뜻이 사라집니다.",
          ]}
        />

        <Sub title="합친 칸">
          <Demo column>
            <DataTable
              aria-label="부서별 거래처"
              data={mergedRows}
              columns={[
                { name: "team", children: "담당 부서" },
                { name: "name", children: "거래처" },
                { name: "amount", children: "금액(원)", justifyContent: "flex-end" },
              ]}
            />
          </Demo>
          <Rules
            items={[
              "여러 행에 걸쳐 합친 칸이 있을 때, 아래 행 하나에 마우스를 올리면 그 행과 합친 칸이 함께 강조됩니다.",
              "합친 칸에 마우스를 올리면 거기에 딸린 행이 모두 강조됩니다.",
            ]}
          />
        </Sub>

        <Sub title="색을 칠한 칸">
          <Demo caption="renderCell에서 칸 하나에만 theme을 줍니다" column>
            <DataTable
              aria-label="칸 색"
              data={[
                { name: "가나상사", rate: "98" },
                { name: "다라물산", rate: "41" },
              ]}
              renderCell={({ columnName, value }) => (columnName === "rate" && Number(value) < 50 ? { theme: "danger" } : undefined)}
              columns={[
                { name: "name", children: "거래처" },
                { name: "rate", children: "승인율(%)", justifyContent: "flex-end" },
              ]}
            />
          </Demo>
          <P>칸에 색이 있으면 행에 마우스를 올려도 그 색을 유지합니다. 마우스를 올렸다고 칸의 색 정보가 사라지면 안 됩니다.</P>
        </Sub>
      </Section>

      <Section title="칸 내용의 맞춤">
        <P>세로로는 머리글과 본문 모두 항상 위쪽에 맞춥니다. 여러 줄인 칸이 섞여 있어도 첫 줄의 높이가 같아야 행을 따라 읽기 쉽습니다.</P>
        <P>가로로는 내용의 종류에 따라 맞추고, 머리글도 본문과 같은 쪽에 맞춥니다.</P>
        <Demo column>
          <DataTable
            aria-label="맞춤 예시"
            data={[
              { name: "가나상사", date: "2026-11-25", status: <StatusTag status="success">승인</StatusTag>, done: "✓", amount: "12,480", rate: "98.5" },
              { name: "다라물산", date: "2026-11-24", status: <StatusTag status="progress">진행 중</StatusTag>, done: "–", amount: "154,000", rate: "7.25" },
            ]}
            columns={[
              { name: "name", children: "거래처" },
              { name: "date", children: "등록일" },
              { name: "status", children: "상태" },
              { name: "done", children: "첨부", justifyContent: "center" },
              { name: "amount", children: "금액(원)", justifyContent: "flex-end" },
              { name: "rate", children: "비율(%)", justifyContent: "flex-end" },
            ]}
          />
        </Demo>
        <Table
          head={["맞춤", "내용"]}
          rows={[
            ["왼쪽", "글자, 링크, 문서 번호·코드처럼 숫자와 글자가 섞인 값, 약어, 날짜, 버튼·Select 같은 조작 요소, 태그, 아이콘 여러 개"],
            ["가운데", "옆 칸과 가로로 비교하는 숫자, 아이콘 하나, 기호 하나(✓, –), 그림"],
            ["오른쪽", "위아래로 크기를 비교하는 숫자, 소수, 금액, 행 전체를 나타내는 태그"],
          ]}
        />
        <Rules
          items={[
            <>오른쪽 맞춤은 열에 <Code>justifyContent: "flex-end"</Code>를, 가운데 맞춤은 <Code>"center"</Code>를 줍니다.</>,
            "소수는 한 열 안에서 자릿수를 맞춥니다.",
            "한 열 안에서 맞춤을 섞지 않습니다.",
          ]}
        />
      </Section>

      <Section title="가로 스크롤">
        <Demo caption="첫 열 고정(fixed: &quot;left&quot;) + 가로 스크롤" column>
          <DataTable aria-label="열이 많은 표" data={wideRows} columns={wideColumns} w={520} />
        </Demo>
        <P>가로 스크롤은 화면 밖에 열이 더 있다는 뜻입니다. 보통 표 아래쪽에 스크롤 막대가 나옵니다. 아래와 같을 때 씁니다.</P>
        <Rules
          items={[
            "열이 많아 한 화면에 다 들어가지 않을 때",
            "사용자가 열 설정에서 열을 더 켜서 표가 화면 폭을 넘을 때",
            "화면 폭이 992px보다 좁을 때",
          ]}
        />
        <Rules
          items={[
            "가로 스크롤은 나쁜 것이 아닙니다. 엑셀처럼 익숙한 방식입니다. 한 화면에 넣으려고 열을 지나치게 좁히면 오히려 읽기 어렵습니다.",
            <>행을 구분하는 열(거래처, 문서 번호)은 <Code>fixed: "left"</Code>로 고정해 스크롤해도 보이게 합니다.</>,
            <>표가 길고 고정 열이 있으면 스크롤 막대를 머리글과 아래쪽 두 곳에 둘 수 있습니다(<Code>{"headerProps={{ withScrollBar: true }}"}</Code>). 표 끝까지 내려가지 않고도 가로로 움직일 수 있습니다.</>,
          ]}
        />
      </Section>

      <Section title="쪽 이동과 표의 상태">
        <Rules
          items={[
            "쪽 이동(Pagination)을 놓는 법은 \"표 안의 조작\" 문서를 따릅니다.",
            "불러오는 중, 빈 표, 찾은 것 없음, 오류 같은 상태는 \"표의 상태\" 문서를 따릅니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <DataTable
                aria-label="좋은 예"
                data={rows.slice(0, 2)}
                columns={[baseColumns[0], baseColumns[2], baseColumns[3]]}
              />
            ),
            text: "금액은 오른쪽에 맞추고 단위는 머리글에 적습니다. 상태는 StatusTag로 보여 줍니다.",
          }}
          bad={{
            demo: (
              <DataTable
                aria-label="나쁜 예"
                data={[
                  { name: "가나상사", status: "승인", amount: "12480원" },
                  { name: "다라물산", status: "진행중", amount: "8300원" },
                ]}
                columns={[
                  { name: "name", children: "거래처" },
                  { name: "status", children: "상태" },
                  { name: "amount", children: "금액" },
                ]}
              />
            ),
            text: "금액을 왼쪽에 맞추거나 쉼표 없이 적지 않습니다. 상태를 일반 글자로만 적지 않습니다.",
          }}
        />
        <DoDont
          good={{
            demo: <Button use="tertiary" theme="info">자세히 보기</Button>,
            text: "칸 안의 동작은 약한 버튼이나 링크로 둡니다. 표에서 눈에 띄어야 하는 것은 데이터입니다.",
          }}
          bad={{
            demo: <Button use="primary" theme="info">자세히 보기</Button>,
            text: "행마다 주요 버튼을 두지 않습니다.",
          }}
        />
      </Section>

      <Section title="다른 것과의 구분">
        <Rules
          items={[
            "항목이 서너 개이고 비교할 열이 없으면 표 대신 목록이나 카드를 씁니다.",
            "한 건의 자세한 내용(이름–값 쌍)은 표가 아니라 상세 화면의 항목 목록으로 보여 줍니다.",
            "값의 흐름이나 비율을 보여 주려면 차트를 씁니다. 정확한 값을 찾아 읽어야 하면 표를 씁니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

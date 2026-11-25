import React from "react";
import {
  DataTable, ACCORDION, StatusTag, Pagination, Button, Link, Checkbox, Counter, Dropdown, Text, Flex, Box,
  InlineEdit, InlineInput,
} from "@ec21rnc/ui";
import EditM from "@semcore/icon/Edit/m";
import LinkExternalM from "@semcore/icon/LinkExternal/m";
import SettingsM from "@semcore/icon/Settings/m";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "표 안의 조작", order: 3 };

const won = (n) => n.toLocaleString("ko-KR");

const source = [
  { id: "D-1042", name: "가나상사", manager: "김담당", status: "승인", amount: 12480, date: "2026-11-25" },
  { id: "D-1041", name: "다라물산", manager: "이담당", status: "진행 중", amount: 8300, date: "2026-11-24" },
  { id: "D-1040", name: "마바산업", manager: "박담당", status: "확인 필요", amount: 154000, date: "2026-11-21" },
  { id: "D-1039", name: "사아유통", manager: "최담당", status: "반려", amount: 2950, date: "2026-11-20" },
  { id: "D-1038", name: "자차기업", manager: "김담당", status: "승인", amount: 41200, date: "2026-11-18" },
  { id: "D-1037", name: "카타상회", manager: "이담당", status: "진행 중", amount: 0, date: "2026-11-17" },
  { id: "D-1036", name: "파하무역", manager: "박담당", status: "승인", amount: 7700, date: "2026-11-14" },
  { id: "D-1035", name: "거너상사", manager: "최담당", status: "확인 필요", amount: 3100, date: "2026-11-13" },
];
const statusOf = { "승인": "success", "진행 중": "progress", "확인 필요": "warning", "반려": "critical" };
const view = (r) => ({
  ...r,
  amount: won(r.amount),
  status: <StatusTag status={statusOf[r.status]}>{r.status}</StatusTag>,
});

function SortDemo() {
  const [sort, setSort] = React.useState(["date", "desc"]);
  const data = React.useMemo(() => {
    const [key, dir] = sort;
    const sorted = [...source.slice(0, 5)].sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0));
    return (dir === "desc" ? sorted.reverse() : sorted).map(view);
  }, [sort]);
  return (
    <DataTable
      aria-label="정렬할 수 있는 표"
      data={data}
      sort={sort}
      onSortChange={setSort}
      columns={[
        { name: "name", children: "거래처", sortable: "asc" },
        { name: "manager", children: "담당자" },
        { name: "amount", children: "금액(원)", justifyContent: "flex-end", sortable: true },
        { name: "date", children: "등록일", sortable: true },
      ]}
    />
  );
}

const accordionRows = source.slice(0, 3).map((r) => ({
  ...view(r),
  [ACCORDION]: (
    <Box p={4}>
      <Text size={200}>
        {r.name}의 {r.id} 문서입니다. 담당자 {r.manager}, 등록일 {r.date}. 펼친 자리에는 이 행에 딸린 설명, 작은 표, 차트, 링크를 넣습니다.
      </Text>
    </Box>
  ),
}));

const cellAccordionRows = source.slice(0, 2).map((r) => ({
  name: r.name,
  date: r.date,
  amount: {
    toString: () => won(r.amount),
    [ACCORDION]: (
      <Box p={4}>
        <Text size={200}>공급가액 {won(r.amount)}원, 세액 {won(Math.round(r.amount / 10))}원</Text>
      </Box>
    ),
  },
}));

function SelectDemo() {
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const pageRows = source.slice((page - 1) * 4, page * 4);
  const pageIds = pageRows.map((r) => r.id);
  return (
    <Flex direction="column" w="100%">
      <Flex alignItems="center" gap={2} py={2} hMin={48}>
        {selected.length ? (
          <>
            <Text size={200}>{selected.length}건 선택</Text>
            <Button onClick={() => setSelected([])}>모두 선택 해제</Button>
            <Button onClick={() => setSelected([...new Set([...selected, ...pageIds])])}>이 쪽 모두 선택({pageIds.length})</Button>
            <Button onClick={() => setSelected(source.map((r) => r.id))}>표 전체 선택({source.length})</Button>
            <Button use="tertiary" theme="info">승인</Button>
            <Button use="tertiary" theme="info">내려받기</Button>
          </>
        ) : (
          <Text size={200} color="text-secondary">전체 {source.length}건</Text>
        )}
      </Flex>
      <DataTable
        aria-label="선택할 수 있는 표"
        uniqueRowKey="id"
        data={pageRows.map(view)}
        selectedRows={selected}
        onSelectedRowsChange={setSelected}
        columns={[
          { name: "id", children: "문서 번호" },
          { name: "name", children: "거래처" },
          { name: "status", children: "상태" },
          { name: "amount", children: "금액(원)", justifyContent: "flex-end" },
        ]}
      />
      <Pagination mt={4} currentPage={page} onCurrentPageChange={setPage} totalPages={2} />
    </Flex>
  );
}

function EditableCell({ initial }) {
  const [text, setText] = React.useState(initial);
  const [editing, setEditing] = React.useState(false);
  return (
    <InlineEdit editable={editing} onEditableChange={setEditing}>
      <InlineEdit.View>
        <Flex alignItems="center" gap={1}>
          <Text size={200}>{text}</Text>
          <EditM color="icon-secondary-neutral" />
        </Flex>
      </InlineEdit.View>
      <InlineEdit.Edit>
        <InlineInput onConfirm={(v) => { setText(v); setEditing(false); }} onCancel={() => setEditing(false)}>
          <InlineInput.Value defaultValue={text} aria-label="메모 수정" />
          <InlineInput.ConfirmControl />
          <InlineInput.CancelControl />
        </InlineInput>
      </InlineEdit.Edit>
    </InlineEdit>
  );
}

const longName = "2026년 하반기 해외 거래처 공급 계약 갱신 검토 요청 문서";
const longUrl = "https://example.com/documents/2026/contracts/renewal/review-request-000128";

const allColumns = [
  { name: "name", children: "거래처", required: true },
  { name: "manager", children: "담당자" },
  { name: "status", children: "상태" },
  { name: "amount", children: "금액(원)", justifyContent: "flex-end" },
  { name: "date", children: "등록일" },
];

function ColumnManagerDemo() {
  const [shown, setShown] = React.useState(["name", "status", "amount"]);
  const toggle = (name) => setShown((s) => (s.includes(name) ? s.filter((n) => n !== name) : [...s, name]));
  return (
    <Flex direction="column" gap={2} w="100%">
      <Flex>
        <Dropdown>
          <Dropdown.Trigger tag={Button} addonLeft={SettingsM}>
            열 설정
            <Counter ml={2}>{shown.length}/{allColumns.length}</Counter>
          </Dropdown.Trigger>
          <Dropdown.Popper p={3} aria-label="표시할 열">
            <Flex direction="column" gap={2}>
              {allColumns.map((c) => (
                <Checkbox
                  key={c.name}
                  label={c.children}
                  checked={shown.includes(c.name)}
                  disabled={c.required}
                  onChange={() => toggle(c.name)}
                />
              ))}
            </Flex>
          </Dropdown.Popper>
        </Dropdown>
      </Flex>
      <DataTable
        aria-label="열을 고를 수 있는 표"
        data={source.slice(0, 3).map(view)}
        columns={allColumns.filter((c) => shown.includes(c.name)).map(({ required, ...c }) => c)}
      />
    </Flex>
  );
}

function PaginationDemo() {
  const [page, setPage] = React.useState(1);
  return (
    <Flex direction="column" w="100%">
      <DataTable
        aria-label="쪽을 나눈 표"
        data={source.slice((page - 1) * 3, page * 3).map(view)}
        columns={[
          { name: "id", children: "문서 번호" },
          { name: "name", children: "거래처" },
          { name: "amount", children: "금액(원)", justifyContent: "flex-end" },
        ]}
      />
      <Pagination mt={4} currentPage={page} onCurrentPageChange={setPage} totalPages={3} />
    </Flex>
  );
}

export default function TableControlsPage() {
  return (
    <Page
      meta={meta}
      lead="표에서 데이터를 정렬하고, 고르고, 펼치고, 고치는 조작의 규칙입니다. 표의 모양과 기본 원칙은 DataTable 문서를 따릅니다."
    >
      <Section title="표에서 하는 일">
        <P>사용자가 표에서 하는 일은 다섯 가지로 나뉩니다. 조작 요소를 넣기 전에 이 표가 어느 일을 위한 것인지 먼저 정합니다.</P>
        <Table
          head={["하는 일", "필요한 조작"]}
          rows={[
            ["보기", "정렬, 쪽 이동, 열 설정, 긴 글자 처리"],
            ["입력하기", "칸에서 바로 고치기, 행 추가"],
            ["찾기", "필터, 검색, 찾은 글자 강조"],
            ["다루기", "행 선택, 일괄 동작, 펼치기"],
            ["모으기", "선택한 행 내려받기, 다른 곳으로 보내기"],
          ]}
        />
      </Section>

      <Section title="정렬">
        <Demo caption="머리글을 눌러 정렬을 바꿔 보세요" column>
          <SortDemo />
        </Demo>
        <Sub title="원칙">
          <Rules
            items={[
              "정렬할 수 있는 열은 머리글에 마우스를 올리면 정렬 아이콘이 나옵니다.",
              "처음 누르면 내림차순(큰 것부터)으로 정렬합니다. 한 번 더 누르면 방향이 바뀝니다.",
              "지금 정렬된 열은 아이콘이 항상 보이고, 아이콘 모양으로 방향을 알려 줍니다. 머리글 글자도 진하고 굵게 바뀝니다.",
              "한 열을 정렬해도 다른 열의 아이콘 방향은 바뀌지 않습니다.",
              "정렬하면 표를 다시 불러오고 첫 행으로 돌아갑니다. 쪽 이동도 1쪽으로 되돌립니다.",
              "여러 단 머리글에서 위 단의 묶음 이름으로는 정렬하지 않습니다.",
              "정렬할 수 없는 열에는 정렬 아이콘을 아예 두지 않습니다.",
            ]}
          />
          <P>
            열에 <Code>sortable: true</Code>를 주고, 표에 <Code>sort</Code>(예: <Code>["date", "desc"]</Code>)와 <Code>onSortChange</Code>를 넘깁니다.
            이름처럼 오름차순이 자연스러운 열은 <Code>sortable: "asc"</Code>로 첫 방향을 바꿉니다.
          </P>
        </Sub>

        <Sub title="보조 표의 정렬">
          <Demo caption="누를 수 없는 정렬 표시" column>
            <DataTable
              aria-label="금액 순 상위 거래처"
              use="secondary"
              sort={["amount", "desc"]}
              data={[...source].sort((a, b) => b.amount - a.amount).slice(0, 3).map(view)}
              columns={[
                { name: "name", children: "거래처" },
                { name: "amount", children: "금액(원)", justifyContent: "flex-end" },
              ]}
            />
          </Demo>
          <P>보조 표에서는 눌러서 바꾸는 정렬을 피합니다. 지금 어떤 순서로 놓였는지만 아이콘으로 알려 줍니다. 열에 <Code>sortable</Code>을 주지 않고 <Code>sort</Code>만 넘기면 됩니다.</P>
        </Sub>

        <Sub title="누르는 영역">
          <Rules
            items={[
              "머리글 칸에 글자나 눌리지 않는 아이콘만 있으면 칸 전체를 눌러 정렬할 수 있습니다.",
              "머리글 칸에 Select 같은 조작 요소가 있으면 그 요소는 정렬 영역에서 뺍니다. 그 요소를 눌러도 정렬되지 않아야 합니다.",
            ]}
          />
        </Sub>

        <Sub title="정렬 방향">
          <Table
            head={["데이터", "오름차순", "내림차순"]}
            rows={[
              ["숫자", "작은 것에서 큰 것으로 (0, 1, 2 … 9)", "큰 것에서 작은 것으로 (9, 8, 7 … 0)"],
              ["글자", "가나다순 (ㄱ → ㅎ, A → Z)", "가나다 역순 (ㅎ → ㄱ, Z → A)"],
              ["상태", "화면마다 정합니다", "화면마다 정합니다"],
              ["날짜", "오래된 날짜에서 최근 날짜로", "최근 날짜에서 오래된 날짜로"],
            ]}
          />
          <Rules
            items={[
              "값이 없는 칸(–, 없음)과 0은 가장 작은 값으로 봅니다.",
              "한글과 영문이 섞인 열은 글자 종류별로 묶어서 정렬합니다. 어느 묶음을 먼저 둘지는 사용자가 더 자주 찾는 쪽으로 정합니다.",
              "상태는 좋음–나쁨, 급함–급하지 않음, 최근–오래됨처럼 단계를 정해 그 순서로 정렬합니다. 가나다순으로 정렬하지 않습니다.",
              "목록 화면의 처음 정렬은 등록일 내림차순(최근 것부터)을 기본으로 합니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="펼치는 행">
        <Demo caption="행을 누르면 아래로 펼쳐집니다" column>
          <DataTable
            aria-label="펼치는 행이 있는 표"
            uniqueRowKey="id"
            data={accordionRows}
            columns={[
              { name: "id", children: "문서 번호" },
              { name: "name", children: "거래처" },
              { name: "status", children: "상태" },
              { name: "amount", children: "금액(원)", justifyContent: "flex-end" },
            ]}
          />
        </Demo>
        <Demo caption="칸 하나만 펼치는 버튼이 되는 경우" column>
          <DataTable
            aria-label="금액 칸을 펼치는 표"
            data={cellAccordionRows}
            columns={[
              { name: "name", children: "거래처" },
              { name: "date", children: "등록일" },
              { name: "amount", children: "금액(원)" },
            ]}
          />
        </Demo>
        <Rules
          items={[
            "행을 펼쳐 그 행에 딸린 자세한 표, 차트, 글, 링크를 보여 줄 수 있습니다.",
            "펼친 내용이 그 행의 특정 칸 하나에만 관련되면 행 전체가 아니라 그 칸만 펼치는 버튼으로 만듭니다.",
            "펼친 내용이 너무 많으면 상세 화면으로 옮깁니다. 펼친 자리에서 다시 스크롤해야 한다면 너무 많은 것입니다.",
            <>기본으로 여러 행을 동시에 펼칠 수 있습니다. 한 번에 하나만 펼치게 하려면 <Code>accordionMode="toggle"</Code>을 줍니다.</>,
          ]}
        />
        <P>
          행 데이터에 <Code>[ACCORDION]</Code> 키로 펼칠 내용을 넣습니다. 내용은 화면 요소 하나이거나, 표 안의 표로 보여 줄 행 배열입니다.
        </P>
      </Section>

      <Section title="행 선택">
        <Demo caption="행을 고르면 표 위의 줄이 선택 정보와 일괄 동작으로 바뀝니다" column>
          <SelectDemo />
        </Demo>
        <Rules
          items={[
            "행을 고를 수 있는 표는 머리글을 포함한 모든 행의 맨 앞에 체크박스를 둡니다.",
            "머리글의 체크박스는 지금 쪽의 모든 행을 고르거나 풉니다. 일부만 골랐을 때는 일부 선택 모양(–)이 됩니다.",
            "고른 행은 선택 바탕색으로 바뀝니다.",
          ]}
        />
        <P><Code>selectedRows</Code>에 고른 행의 키 배열을, <Code>onSelectedRowsChange</Code>에 바꾸는 함수를 넘기고 <Code>uniqueRowKey</Code>를 정합니다.</P>

        <Sub title="쪽을 넘겨도 선택 유지">
          <P>쪽을 옮겨도 선택은 풀리지 않습니다. 1쪽에서 3건을 고르고 2쪽에서 5건을 더 고른 뒤 1쪽으로 돌아오면, 처음 고른 3건이 그대로 선택되어 있어야 합니다. 위 예시에서 쪽을 넘겨 확인할 수 있습니다.</P>
        </Sub>

        <Sub title="Shift로 여러 행 선택">
          <P>한 행을 고른 뒤 Shift 키를 누른 채 다른 행을 고르면 그 사이의 행이 한꺼번에 선택됩니다.</P>
        </Sub>

        <Sub title="선택 정보와 일괄 동작 줄">
          <Rules
            items={[
              "고른 행의 수와 일괄 동작은 표 위의 줄에 보여 줍니다. 머리글과 본문 사이에는 두지 않습니다. 화면 낭독기와 키보드로 표를 읽는 흐름이 끊기기 때문입니다.",
              "줄은 행을 골랐을 때만 나타나게 하거나, 항상 보이게 할 수 있습니다.",
              "나타났다 사라지는 줄은 표의 시작 부분이 보일 때 표 전체를 아래로 밀고 올립니다. 이때 150~200ms의 움직임을 주어 표가 튀지 않게 합니다.",
              "항상 보이는 줄은 행을 고르면 그 안의 내용만 더하거나 바꿉니다. 표의 높이가 바뀌지 않아 더 안정적입니다.",
              "스크롤하면 이 줄을 머리글과 함께 화면 위에 고정합니다.",
              "표의 시작 부분이 화면 밖에 있을 때 줄이 나타나거나 사라지면, 머리글만 밀고 행은 움직이지 않습니다.",
              <>바탕은 <Code>--ec-bg-surface</Code>, 아래 선은 <Code>--ec-border</Code>입니다.</>,
            ]}
          />
          <Table
            head={["동작", "하는 일"]}
            rows={[
              ["모두 선택 해제", "모든 쪽의 선택을 풉니다."],
              ["이 쪽 모두 선택(N)", "지금 쪽의 행을 모두 고릅니다. N은 행의 수입니다."],
              ["표 전체 선택(N)", "모든 쪽의 행을 고릅니다. N은 전체 행의 수입니다."],
            ]}
          />
          <Rules
            items={[
              "\"전체 선택\"이라고만 쓰지 않습니다. 이 쪽인지 표 전체인지 알 수 없기 때문입니다. 위 표의 이름을 씁니다.",
              "일괄 동작은 자주 쓰는 것 3~5개만 둡니다. 나머지는 \"더 보기\" 메뉴에 넣습니다.",
              "삭제처럼 되돌릴 수 없는 일괄 동작은 실행 전에 몇 건이 대상인지 다시 묻습니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="열 너비 바꾸기">
        <Rules
          items={[
            "머리글의 열 경계선에 마우스를 올리면 커서가 좌우 화살표 모양으로 바뀌고 경계선 색이 진해집니다.",
            "잡을 수 있는 영역은 경계선과 그 왼쪽 5px입니다.",
            "한 열의 너비를 바꿔도 다른 열의 너비는 바뀌지 않습니다. 넘치는 만큼 가로 스크롤이 생깁니다.",
          ]}
        />
        <P>지금의 DataTable에는 끌어서 너비를 바꾸는 기능이 없습니다. 열 너비는 <Code>gtcWidth</Code>로 미리 정합니다. 기능을 직접 만들 때 위 규칙을 따릅니다.</P>
      </Section>

      <Section title="칸에서 바로 고치기">
        <Demo caption="메모 칸을 눌러 고쳐 보세요" column>
          <DataTable
            aria-label="메모를 고칠 수 있는 표"
            data={[
              { name: "가나상사", memo: <EditableCell initial="계약 갱신 예정" /> },
              { name: "다라물산", memo: <EditableCell initial="담당자 변경 확인" /> },
            ]}
            columns={[
              { name: "name", children: "거래처" },
              { name: "memo", children: "메모", gtcWidth: "minmax(280px, 1fr)" },
            ]}
          />
        </Demo>
        <Rules
          items={[
            "고칠 수 있는 칸은 행에 마우스를 올렸을 때 연필 아이콘 버튼을 보여 줍니다. 아이콘은 보조 회색이고 글자와 4px 떨어뜨립니다.",
            "아이콘을 누르면 그 자리가 입력란(InlineInput)으로 바뀝니다. Enter 또는 확인 버튼으로 저장하고 Esc 또는 취소 버튼으로 되돌립니다.",
            "같은 칸에 다른 동작 아이콘도 있으면 연필 아이콘을 글자에 가장 가깝게 둡니다.",
            "저장에 실패하면 입력란을 닫지 않고 이유를 알려 줍니다.",
            "새 행을 추가하는 버튼은 표 위 오른쪽에 둡니다. 추가한 행은 \"새로 추가됨\" 바탕색으로 잠시 표시합니다.",
          ]}
        />
      </Section>

      <Section title="찾은 글자 강조">
        <Rules
          items={[
            "표 안에서 검색했을 때 칸 안의 일치하는 글자에 강조 바탕색을 칠합니다.",
            "강조 바탕의 높이는 글줄 높이와 같게 합니다.",
            "글자 색과 굵기는 바꾸지 않습니다. 바탕색만 바꿉니다.",
          ]}
        />
      </Section>

      <Section title="안쪽 링크와 바깥 링크">
        <Demo column>
          <DataTable
            aria-label="링크가 있는 표"
            data={[
              {
                name: <Link href="#">가나상사</Link>,
                site: <Link href="#" addonRight={LinkExternalM}>example.com</Link>,
                action: <Button use="tertiary" theme="info">승인 내역</Button>,
              },
            ]}
            columns={[
              { name: "name", children: "거래처 (안쪽 링크)" },
              { name: "site", children: "누리집 (바깥 링크)" },
              { name: "action", children: "동작 (버튼)" },
            ]}
          />
        </Demo>
        <Rules
          items={[
            "시스템 안의 다른 화면으로 가는 것은 링크로, 그 자리에서 무언가를 실행하는 것은 버튼으로 만듭니다.",
            "시스템 밖으로 나가는 링크는 끝에 바깥 링크 아이콘을 붙입니다. 아이콘은 M 크기, 보조 회색입니다.",
            "행 전체를 링크로 만들지 않습니다. 행을 대표하는 칸(거래처 이름, 문서 번호) 하나를 링크로 합니다.",
          ]}
        />
      </Section>

      <Section title="긴 글자와 긴 링크">
        <Demo column>
          <Box w={560}>
            <DataTable
              aria-label="긴 글자 처리"
              data={[
                {
                  end: <Text ellipsis>{longName}</Text>,
                  middle: <Text ellipsis {...{ "ellipsis:cropPosition": "middle" }}>{longUrl}</Text>,
                  wrap: longName,
                },
              ]}
              columns={[
                { name: "end", children: "끝을 줄임", gtcWidth: "180px" },
                { name: "middle", children: "가운데를 줄임", gtcWidth: "200px" },
                { name: "wrap", children: "다음 줄로 넘김", gtcWidth: "180px" },
              ]}
            />
          </Box>
        </Demo>
        <Table
          head={["방법", "언제 쓰는가", "규칙"]}
          rows={[
            ["끝을 줄임", "대부분의 표. 한 칸에 한 줄이 원칙일 때", "마우스를 올리면 전체 글자를 설명 풍선으로 보여 줍니다."],
            ["가운데를 줄임", "주소(URL)나 파일 경로처럼 끝부분이 서로 다른 값", "마우스를 올리면 전체 글자를 설명 풍선으로 보여 줍니다."],
            ["다음 줄로 넘김", "칸에 여러 줄의 내용이 있어도 되는 표. 합친 칸 안에 작은 줄들이 있을 때", "행 높이가 달라지므로 세로 맞춤은 위쪽을 지킵니다."],
          ]}
        />
      </Section>

      <Section title="쪽 이동">
        <Demo column>
          <PaginationDemo />
        </Demo>
        <Rules
          items={[
            "표가 한 쪽을 넘으면 표 아래에 Pagination을 둡니다. 표와의 간격은 16px입니다.",
            "쪽을 옮기거나 필터를 적용하면 표를 첫 행으로 스크롤합니다.",
            "필터나 정렬을 바꾸면 1쪽으로 돌아갑니다.",
            "한 쪽뿐이면 Pagination을 보여 주지 않습니다.",
          ]}
        />
      </Section>

      <Section title="표 설정과 열 관리">
        <Demo caption="열 관리 — 버튼의 숫자는 켠 열 / 전체 열" column>
          <ColumnManagerDemo />
        </Demo>
        <P>복잡한 표에는 표 설정 또는 열 관리 버튼을 표 위 오른쪽에 둘 수 있습니다. 둘은 역할이 다릅니다.</P>
        <Table
          head={["", "표 설정", "열 관리"]}
          rows={[
            ["담는 것", "열 켜고 끄기부터 표의 모양(좁은 표, 줄 수) 바꾸기까지 여러 설정", "열 켜고 끄기와 순서 바꾸기만"],
            ["열 순서 바꾸기", "하지 않습니다", "여기서 합니다"],
            ["숨길 수 없는 열", "목록에 보여 주지 않습니다", "비활성 상태로 보여 줍니다"],
            ["버튼", "톱니바퀴 아이콘과 \"표 설정\"", "켠 열의 수를 Counter로 보여 줍니다"],
          ]}
        />
        <Rules
          items={[
            "설정은 사용자별로 기억해 다음에 들어와도 그대로 보여 줍니다.",
            "처음 상태로 되돌리는 \"기본값으로\" 동작을 함께 둡니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Flex gap={2} alignItems="center">
                <Text size={200}>3건 선택</Text>
                <Button>모두 선택 해제</Button>
                <Button>이 쪽 모두 선택(20)</Button>
              </Flex>
            ),
            text: "선택 범위를 이름에 밝히고 대상의 수를 함께 적습니다.",
          }}
          bad={{
            demo: (
              <Flex gap={2} alignItems="center">
                <Button>전체 선택</Button>
                <Button>해제</Button>
              </Flex>
            ),
            text: "\"전체 선택\"처럼 범위를 알 수 없는 이름을 쓰지 않습니다.",
          }}
        />
      </Section>
    </Page>
  );
}

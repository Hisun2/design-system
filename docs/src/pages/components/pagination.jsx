import React from "react";
import { Pagination, Select, Text, Flex } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Pagination" };

function Pager({ start = 1, total = 24, ...rest }) {
  const [page, setPage] = React.useState(start);
  return <Pagination currentPage={page} onCurrentPageChange={setPage} totalPages={total} {...rest} />;
}

function PagerWithRows() {
  const [page, setPage] = React.useState(3);
  const [rows, setRows] = React.useState(20);
  const totalRows = 1248;
  return (
    <Flex alignItems="center" gap={4} flexWrap>
      <Pagination currentPage={page} onCurrentPageChange={setPage} totalPages={Math.ceil(totalRows / rows)} />
      <Flex alignItems="center" gap={2}>
        <Text size={200} color="var(--ec-text-secondary)">한 번에 볼 줄 수</Text>
        <Select
          value={rows}
          onChange={(next) => {
            setRows(next);
            setPage(1);
          }}
          options={[10, 20, 50, 100].map((count) => ({ value: count, children: `${count}줄` }))}
          aria-label="한 번에 볼 줄 수"
        />
      </Flex>
    </Flex>
  );
}

function ApproximatePager() {
  const [page, setPage] = React.useState(2);
  return (
    <Pagination currentPage={page} onCurrentPageChange={setPage} totalPages={120}>
      <Pagination.FirstPage />
      <Pagination.PrevPage />
      <Pagination.NextPage />
      <Pagination.PageInput />
      <Text size={200} ml={2}>/ ≈ 120</Text>
    </Pagination>
  );
}

export default function PaginationPage() {
  return (
    <Page meta={meta} lead="긴 목록을 쪽으로 나눠 넘겨 보게 하는 조작 묶음입니다. 표, 그리고 쪽 단위로 훑어보는 긴 목록 아래에 둡니다.">
      <Section title="구성">
        <Demo>
          <Pager start={3} />
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>Pagination.FirstPage</Code>, "첫 쪽으로 갑니다."],
            [<Code>Pagination.PrevPage</Code>, "앞 쪽으로 갑니다."],
            [<Code>Pagination.NextPage</Code>, "다음 쪽으로 갑니다."],
            [<Code>Pagination.PageInput</Code>, "지금 쪽을 보여 주고, 숫자를 적어 그 쪽으로 바로 갑니다."],
            [<Code>Pagination.PageInput.Value</Code>, "쪽 번호를 적는 곳입니다."],
            [<Code>Pagination.TotalPages</Code>, "전체 쪽 수입니다. 누르면 마지막 쪽으로 갑니다."],
          ]}
        />
        <P>
          <Code>currentPage</Code>, <Code>totalPages</Code>, <Code>onCurrentPageChange</Code>만 주면 위 부분이 모두 들어갑니다. 순서나 구성을 바꿀 때만 부분을 직접 적습니다.
        </P>
      </Section>

      <Section title="크기">
        <Demo column>
          <Pager start={3} />
          <Pager start={3} size="l" />
        </Demo>
        <Rules
          items={[
            "M과 L 두 가지입니다. M은 M 크기 버튼·입력창으로, L은 L 크기 버튼·입력창으로 이루어집니다.",
            "위에 놓인 표나 필터의 조작 요소와 같은 크기를 씁니다.",
          ]}
        />
      </Section>

      <Section title="여백과 배치">
        <Rules
          items={[
            <>표와 Pagination 사이는 16px(<Code>--ec-spacing-4x</Code>) 띄웁니다.</>,
            "한 줄에 놓을 자리가 없으면 가로 배치를 세로 배치로 바꿉니다. 요소를 줄이거나 숨기지 않습니다.",
          ]}
        />
      </Section>

      <Section title="한 쪽에 담는 줄 수">
        <Demo>
          <PagerWithRows />
        </Demo>
        <Rules
          items={[
            "표 한 쪽은 화면 두 개 높이(대략 2,000px)는 채우게 잡습니다. 너무 짧으면 쪽을 자주 넘겨야 합니다.",
            "한 쪽에 100줄을 넘기지 않습니다. 한 줄이 글자 두 줄 높이면 50줄이 한도입니다.",
            "줄 수를 고르게 할 때 보기는 10, 20, 50, 100으로 합니다.",
            "줄 수를 바꾸면 표를 새로 그리고 고른 줄 수를 적용합니다. 이때 첫 쪽으로 돌아갑니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Table
          head={["요소", "누르면"]}
          rows={[
            ["첫 쪽 버튼", "첫 쪽을 엽니다."],
            ["앞 쪽 버튼", "앞 쪽을 엽니다."],
            ["다음 쪽 버튼", "다음 쪽을 엽니다."],
            ["쪽 입력창", "숫자를 적고 Enter를 누르면 그 쪽을 엽니다. 입력창 안의 아이콘을 눌러도 됩니다."],
            ["전체 쪽 수", "마지막 쪽을 엽니다."],
          ]}
        />
        <Rules
          items={[
            "쪽을 넘기면 표를 맨 위로 스크롤합니다.",
            "정렬이나 필터를 바꾸면 언제나 첫 쪽으로 돌아갑니다.",
            "입력창에는 늘 지금 쪽이 보여야 합니다. 숫자를 고쳐 놓고 Enter를 누르지 않은 채 초점을 옮기면 지금 쪽 번호로 되돌립니다.",
            "입력창을 비우거나 0을 적고 Enter를 누르면 첫 쪽으로 갑니다.",
            "입력창에는 숫자만 들어갑니다.",
          ]}
        />
      </Section>

      <Section title="경계에서 일어나는 일">
        <Demo caption="첫 쪽 / 마지막 쪽 / 한 쪽뿐" column>
          <Pager start={1} />
          <Pager start={24} />
          <Pager start={1} total={1} />
        </Demo>
        <Demo caption="전체 쪽 수를 정확히 알 수 없을 때">
          <ApproximatePager />
        </Demo>
        <Table
          head={["경우", "모양과 동작"]}
          rows={[
            ["첫 쪽", "첫 쪽 버튼과 앞 쪽 버튼이 비활성입니다."],
            ["마지막 쪽", "다음 쪽 버튼이 비활성이고, 전체 쪽 수가 링크가 아닌 보통 글자로 바뀝니다."],
            ["전체보다 큰 숫자를 적음", "오류를 띄우지 않고 마지막 쪽으로 보냅니다."],
            ["한 쪽뿐", "자료가 있고 앞으로 더 늘 수 있을 때만 이 모습으로 둡니다."],
            ["자료 없음 · 필터 결과 없음", "Pagination을 보여 주지 않습니다. 표 안에 자료가 없다는 안내를 둡니다."],
            ["표를 불러오는 중", "표와 딸린 자료를 불러오는 동안에는 Pagination을 보여 주지 않습니다."],
            ["전체 쪽 수를 정확히 모름", "쪽 수 앞에 물결표(≈)를 붙이고, 전체 쪽 수를 링크가 아닌 보통 글자로 둡니다."],
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "표 바로 아래에 두고, 정렬·필터가 바뀌면 첫 쪽으로 돌려보냅니다." }}
          bad={{ text: "걸러 낸 결과가 없는데 \"1 / 1\"만 남은 Pagination을 그대로 두지 않습니다." }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Rules
          items={[
            "몇 쪽 안 되는 서로 다른 화면을 오가는 데는 TabLine이나 Pills를 씁니다.",
            "정해진 순서를 밟아 가는 일에는 Wizard를 씁니다.",
            "그림을 한 장씩 넘겨 보는 데는 Carousel을 씁니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

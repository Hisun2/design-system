import React from "react";
import {
  DataTable, StatusTag, WidgetEmpty, NoData, WidgetError, Skeleton, ProgressBar, Spin, Tooltip, Button, Text, Flex, Box,
} from "@ec21rnc/ui";
import WarningM from "@semcore/icon/Warning/m";
import LockYesM from "@semcore/icon/LockYes/m";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "표의 상태", order: 4 };

const columns = [
  { name: "name", children: "거래처" },
  { name: "status", children: "상태" },
  { name: "amount", children: "금액(원)", justifyContent: "flex-end" },
  { name: "date", children: "등록일" },
];

const rows = [
  { name: "가나상사", status: <StatusTag status="success">승인</StatusTag>, amount: "12,480", date: "2026-11-25" },
  { name: "다라물산", status: <StatusTag status="progress">진행 중</StatusTag>, amount: "8,300", date: "2026-11-24" },
  { name: "마바산업", status: <StatusTag status="warning">확인 필요</StatusTag>, amount: "154,000", date: "2026-11-21" },
  { name: "사아유통", status: <StatusTag status="critical">반려</StatusTag>, amount: "2,950", date: "2026-11-20" },
];

const bone = (w) => (
  <Skeleton h={18} w={w}>
    <Skeleton.Text amount={1} />
  </Skeleton>
);
const skeletonRows = [0, 1, 2].map(() => ({ name: bone(120), status: bone(60), amount: bone(80), date: bone(90) }));

const sortableColumns = [
  { name: "name", children: "거래처", sortable: true },
  { name: "status", children: "상태" },
  { name: "amount", children: "금액(원)", justifyContent: "flex-end", sortable: true },
  { name: "date", children: "등록일", sortable: true },
];

export default function TableStatesPage() {
  return (
    <Page
      meta={meta}
      lead="표가 데이터를 불러오는 중이거나, 비어 있거나, 오류가 났을 때 무엇을 보여 주는지 정합니다. 표의 모양과 기본 원칙은 DataTable 문서를 따릅니다."
    >
      <Section title="기본 규칙">
        <Rules
          items={[
            "표 안의 안내는 표의 가로 가운데에 두고, 스크롤해도 화면 안에 머물게 합니다. 표 맨 위로 올라가지 않아도 지금 표에 무슨 일이 일어나는지 알 수 있어야 합니다.",
            "상태가 바뀌어도 표의 높이는 되도록 바꾸지 않습니다. 화면이 위아래로 튀면 보던 자리를 잃습니다.",
            "불러오는 중 안내와 오류 안내는 머리글에서 40px 아래에 둡니다. 화면이 작아져도 안내가 머리글에 달라붙지 않습니다.",
            "어떤 상태에서도 머리글은 그대로 둡니다. 정렬 표시도 그대로 둡니다.",
          ]}
        />
      </Section>

      <Section title="처음 불러올 때">
        <Demo caption="Skeleton으로 3~5행만 보여 줍니다" column>
          <DataTable aria-label="불러오는 중인 표" data={skeletonRows} columns={columns} />
        </Demo>
        <Rules
          items={[
            "데이터를 처음 불러올 때는 Skeleton으로 표의 틀을 먼저 보여 줍니다.",
            "표 전체가 아니라 처음 3~5행만 Skeleton으로 채웁니다.",
            "화면을 처음 열 때, 데이터를 처음 불러올 때, 새로 추가한 데이터를 불러올 때 씁니다.",
            "이때는 Pagination을 보여 주지 않습니다. 몇 쪽인지 아직 모르기 때문입니다.",
            "Skeleton의 폭은 실제 내용의 길이와 비슷하게 합니다. 숫자 열은 오른쪽에 맞춥니다.",
          ]}
        />
      </Section>

      <Section title="오래 걸릴 때">
        <Demo column>
          <DataTable
            aria-label="데이터를 모으는 중인 표"
            data={[]}
            columns={columns}
            renderEmptyData={() => (
              <Flex direction="column" alignItems="center" gap={3} py={10}>
                <Text size={200}>거래 내역을 모으고 있습니다. 1~2분쯤 걸립니다.</Text>
                <Box w={320}>
                  <ProgressBar value={45} aria-label="데이터 수집 진행률" />
                </Box>
              </Flex>
            )}
          />
        </Demo>
        <Rules
          items={[
            "데이터를 모으는 데 1분 넘게 걸리면 ProgressBar로 얼마나 진행됐는지 보여 줍니다.",
            "ProgressBar는 표의 가운데에 두고 스크롤해도 화면 안에 머물게 합니다.",
            "무엇을 하고 있는지, 얼마나 걸리는지 한 문장으로 적습니다.",
            "다른 화면에 다녀와도 진행이 이어지게 하고, 끝나면 알려 줍니다.",
          ]}
        />
      </Section>

      <Section title="필터·정렬한 결과를 불러올 때">
        <Demo caption="loading" column>
          <DataTable aria-label="다시 불러오는 중인 표" loading data={rows} columns={sortableColumns} sort={["date", "desc"]} />
        </Demo>
        <P>이미 보이는 표를 다시 불러올 때는 표 위에 반투명한 덮개와 Spin을 올립니다. 표에 <Code>loading</Code>을 주면 됩니다. 아래와 같을 때 씁니다.</P>
        <Rules
          items={[
            "많은 데이터를 필터로 거를 때",
            "많은 데이터를 정렬할 때",
            "다른 쪽으로 옮길 때",
            "표 안에서 검색할 때. 검색어는 입력란에 그대로 남겨 둡니다.",
            "그 밖에 오래 기다리지 않는 데이터 작업",
          ]}
        />
        <Rules
          items={[
            "금방 끝나는 작업이면 이 상태를 건너뜁니다. 덮개가 깜박이기만 하면 오히려 방해가 됩니다.",
            "Spin은 표의 가운데에 두고 스크롤해도 화면 안에 머물게 합니다.",
            "이전 데이터는 덮개 아래에 그대로 둡니다. 표의 높이가 바뀌지 않습니다.",
          ]}
        />
      </Section>

      <Section title="볼 수 없는 데이터">
        <Demo column>
          <DataTable
            aria-label="일부를 볼 수 없는 표"
            data={rows}
            columns={columns}
            limit={{
              fromRow: 2,
              renderOverlay: () => (
                <Flex direction="column" alignItems="center" gap={2}>
                  <Text size={200} bold>이 아래는 볼 권한이 없습니다</Text>
                  <Text size={200} color="text-secondary">담당 부서의 문서만 볼 수 있습니다. 더 보려면 권한을 신청하세요.</Text>
                  <Button mt={1}>권한 신청</Button>
                </Flex>
              ),
            }}
          />
        </Demo>
        <Rules
          items={[
            "권한이나 한도 때문에 보여 줄 수 없는 행은 흐린 덮개로 가립니다.",
            "덮개 위에 왜 가려졌는지, 어떻게 하면 볼 수 있는지 적습니다. 가능하면 바로 해결하는 버튼을 둡니다.",
            "가려진 행에는 마우스를 올려도 반응하지 않습니다.",
          ]}
        />
        <P><Code>limit</Code>에 가리기 시작할 행(<Code>fromRow</Code>) 또는 열(<Code>fromColumn</Code>)과 덮개에 넣을 내용(<Code>renderOverlay</Code>)을 넘깁니다.</P>
      </Section>

      <Section title="빈 표">
        <Demo column>
          <DataTable
            aria-label="비어 있는 거래처 표"
            data={[]}
            columns={columns}
            renderEmptyData={() => (
              <WidgetEmpty>
                <WidgetEmpty.Title>등록한 거래처가 없습니다</WidgetEmpty.Title>
                <WidgetEmpty.Description>거래처를 등록하면 여기에 목록이 나옵니다.</WidgetEmpty.Description>
                <Button use="primary" theme="info" mt={4}>거래처 추가</Button>
              </WidgetEmpty>
            )}
          />
        </Demo>
        <Rules
          items={[
            "아직 데이터를 넣은 적이 없거나 연결이 필요할 때, 사용자가 데이터를 모두 지웠을 때 씁니다.",
            "무엇이 없는지와 어떻게 채우는지를 적고, 채우는 동작 버튼을 둡니다.",
            "이 버튼이 화면의 주요 버튼이 될 수 있습니다. 표 위에 같은 주요 버튼이 이미 있으면 여기서는 보조 버튼으로 둡니다.",
            "그림을 넣을 때는 그 화면의 내용에 맞는 것을 씁니다. 맞는 그림이 없으면 넣지 않습니다.",
          ]}
        />
      </Section>

      <Section title="데이터 없음">
        <Demo column>
          <DataTable aria-label="데이터가 없는 표" data={[]} columns={columns} renderEmptyData={() => <NoData />} />
        </Demo>
        <Rules
          items={[
            "어떤 까닭으로 보여 줄 데이터가 없을 때, 또는 데이터는 있지만 보여 줄 수 없을 때 씁니다.",
            "사용자가 할 수 있는 일이 있으면 설명에 적습니다(기간 바꾸기 등).",
            <>표에 데이터가 없으면 따로 정하지 않아도 이 안내가 나옵니다. 문구를 바꾸려면 <Code>renderEmptyData</Code>를 씁니다.</>,
          ]}
        />
      </Section>

      <Section title="찾은 것 없음">
        <Demo column>
          <DataTable
            aria-label="검색 결과가 없는 표"
            data={[]}
            columns={sortableColumns}
            sort={["amount", "desc"]}
            renderEmptyData={() => (
              <NoData type="nothing-found" description="검색어나 필터를 바꿔 보세요.">
                <Button mt={4}>필터 지우기</Button>
              </NoData>
            )}
          />
        </Demo>
        <Rules
          items={[
            "사용자가 검색하거나 필터를 건 결과가 한 건도 없을 때 씁니다.",
            "\"필터 지우기\"처럼 상황을 바로 되돌리는 버튼을 둡니다.",
            "정렬된 열의 표시는 그대로 둡니다. 필터를 지우면 그 정렬로 다시 보여 줍니다.",
            "\"데이터 없음\"과 구분합니다. 필터 때문에 안 보이는 것인지, 원래 없는 것인지에 따라 사용자가 할 일이 다릅니다.",
          ]}
        />
      </Section>

      <Section title="문제가 생겼을 때">
        <Demo column>
          <DataTable
            aria-label="오류가 난 표"
            data={[]}
            columns={columns}
            renderEmptyData={() => (
              <WidgetError description="목록을 불러오지 못했습니다. 잠시 뒤 다시 시도해 주세요.">
                <Button mt={4}>다시 불러오기</Button>
              </WidgetError>
            )}
          />
        </Demo>
        <P>서버 오류로 데이터를 보여 줄 수 없을 때 씁니다. 표를 불러오다 오류가 났을 때와, 표를 쓰는 도중 오류가 났을 때 모두 해당합니다.</P>
        <Table
          head={["경우", "보여 줄 것"]}
          rows={[
            ["우리가 이미 알고 고치는 중인 문제", "문제를 알고 있으며 고치는 중임을 알립니다. 언제쯤 되는지 알면 적습니다. 다시 불러오기 버튼은 두지 않아도 됩니다."],
            ["아직 원인을 모르는 문제", "불러오지 못했다고 알리고 \"다시 불러오기\" 버튼을 둡니다. 되풀이되면 문의할 곳을 알려 줍니다."],
          ]}
        />
        <Rules
          items={[
            "오류 코드나 서버 메시지를 그대로 보여 주지 않습니다.",
            "표의 일부만 실패했으면 표 전체를 오류로 바꾸지 않습니다. 실패한 칸만 표시합니다(아래 \"칸의 상태\").",
          ]}
        />
      </Section>

      <Section title="안내 글자">
        <Table
          head={["부분", "쓰는 법", "예"]}
          rows={[
            ["제목", "지금 상황의 핵심을 한 줄로 적습니다.", "\"찾은 것이 없습니다\""],
            ["설명", "상황을 바꾸려면 무엇을 해야 하는지 적습니다.", "\"검색어나 필터를 바꿔 보세요.\""],
            ["동작", "가능하면 상황을 바꾸는 버튼이나 링크를 하나 둡니다.", "\"필터 지우기\""],
          ]}
        />
        <Rules
          items={[
            "합쇼체로 씁니다. 사용자를 탓하는 말투를 쓰지 않습니다.",
            "제목에 마침표를 찍지 않습니다. 설명은 문장으로 쓰고 마침표를 찍습니다.",
          ]}
        />
      </Section>

      <Section title="머리글">
        <Demo column>
          <DataTable
            aria-label="머리글이 남아 있는 빈 표"
            data={[]}
            columns={sortableColumns}
            sort={["date", "desc"]}
            renderEmptyData={() => <NoData type="nothing-found" description="검색어나 필터를 바꿔 보세요." />}
          />
        </Demo>
        <P>빈 표, 데이터 없음, 찾은 것 없음, 오류 어느 상태에서도 머리글은 남겨 둡니다. 정렬 아이콘도 그대로 둡니다. 머리글이 있어야 무엇이 나올 자리인지 알 수 있습니다.</P>
      </Section>

      <Section title="칸의 상태">
        <Demo column>
          <DataTable
            aria-label="칸의 상태"
            data={[
              {
                kind: "값 없음",
                value: (
                  <Tooltip title="아직 정산하지 않아 금액이 없습니다.">
                    <Text color="text-secondary">없음</Text>
                  </Tooltip>
                ),
              },
              { kind: "불러오는 중", value: <Spin size="xs" /> },
              {
                kind: "오류",
                value: (
                  <Flex alignItems="center" gap={2}>
                    <Tooltip title="금액을 불러오지 못했습니다.">
                      <WarningM color="icon-primary-warning" />
                    </Tooltip>
                    <Button use="tertiary" theme="info">다시 불러오기</Button>
                  </Flex>
                ),
              },
              {
                kind: "잠김",
                value: (
                  <Tooltip title="담당 부서만 금액을 볼 수 있습니다. 권한을 신청하세요.">
                    <LockYesM color="icon-secondary-neutral" />
                  </Tooltip>
                ),
              },
            ]}
            columns={[
              { name: "kind", children: "칸의 상태" },
              { name: "value", children: "금액(원)" },
            ]}
          />
        </Demo>
        <Sub title="값 없음">
          <Rules
            items={[
              <>값이 없는 칸은 비워 두지 않고 "없음"을 <Code>--ec-text-secondary</Code> 색으로 적습니다. 숫자 열에서는 줄표(–)를 써도 됩니다.</>,
              "설명 풍선으로 왜 값이 없는지 알려 줍니다.",
              "0과 값 없음을 구분합니다. 0은 0으로 적습니다.",
            ]}
          />
        </Sub>
        <Sub title="불러오는 중">
          <Rules
            items={[
              "칸 하나 또는 몇 개만 불러오는 중이면 그 칸에 XS 크기 Spin을 둡니다.",
              "표를 처음 불러올 때는 칸마다 Spin을 두지 않고 Skeleton을 씁니다.",
            ]}
          />
        </Sub>
        <Sub title="오류">
          <Rules
            items={[
              <>칸의 값을 가져오지 못했으면 M 크기 경고 아이콘을 둡니다. 색은 <Code>--ec-text-warning</Code>입니다.</>,
              "마우스를 올리면 무엇이 잘못됐는지 설명 풍선으로 알려 줍니다. 설명 풍선은 꼭 답니다.",
              "가능하면 그 칸에서 바로 다시 불러오는 버튼을 둡니다.",
            ]}
          />
        </Sub>
        <Sub title="잠김">
          <Rules
            items={[
              "권한이나 한도 때문에 볼 수 없는 칸, 먼저 해야 할 일이 있는 칸에는 M 크기 자물쇠 아이콘을 둡니다. 색은 보조 회색입니다.",
              "마우스를 올리면 왜 잠겼는지, 가능하면 어떻게 푸는지 설명 풍선으로 알려 줍니다. 설명 풍선은 꼭 답니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <NoData type="nothing-found" description="검색어나 필터를 바꿔 보세요.">
                <Button mt={4}>필터 지우기</Button>
              </NoData>
            ),
            text: "무엇을 하면 되는지 적고, 바로 할 수 있는 버튼을 둡니다.",
          }}
          bad={{
            demo: <Text size={200} color="text-secondary">No data</Text>,
            text: "까닭도 할 일도 없이 \"데이터 없음\"만 적지 않습니다. 머리글을 없애고 빈 화면만 남기지도 않습니다.",
          }}
        />
      </Section>
    </Page>
  );
}

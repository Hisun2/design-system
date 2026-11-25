import React from "react";
import { AutoSuggest, Select, TimePicker, Flex, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "자동 완성", order: 12 };

const CLIENTS = ["가나다 상사", "가람 물산", "나라 유통", "다온 전자", "라온 식품", "마루 건설", "바다 해운", "사랑 제약"];
const WORDS = ["거래 명세서", "거래처 등록 신청서", "견적서", "계약서", "승인 요청서", "세금 계산서", "지출 결의서"];

/** 서버에서 받아 오는 것처럼 0.8초 뒤에 결과를 돌려줍니다. */
const loadWords = (value, signal) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(WORDS.filter((w) => w.includes(value.trim()))), 800);
    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new Error("취소"));
    });
  });

/** 정해진 목록을 글자로 걸러 고르는 선택 상자. */
function CompleteDemo() {
  const [value, setValue] = React.useState(null);
  const [query, setQuery] = React.useState("");
  const shown = CLIENTS.filter((c) => c.includes(query.trim()));
  return (
    <Flex direction="column" gap={1}>
      <Text size={200} id="as-client">거래처</Text>
      <Select value={value} onChange={setValue} onVisibleChange={() => setQuery("")}>
        <Select.Trigger placeholder="거래처 선택" w={240} aria-labelledby="as-client" />
        <Select.Popper aria-label="거래처 목록">
          <Select.InputSearch value={query} onChange={setQuery} placeholder="이름으로 찾기" />
          <Select.List hMax={180}>
            {shown.map((c) => <Select.Option value={c} key={c}>{c}</Select.Option>)}
            {shown.length === 0 ? <Text tag="div" size={200} color="text-secondary" p={3}>찾는 거래처가 없습니다.</Text> : null}
          </Select.List>
        </Select.Popper>
      </Select>
    </Flex>
  );
}

export default function AutoSuggestPage() {
  return (
    <Page meta={meta} lead="글자를 치는 동안 고를 만한 값을 아래에 보여 주는 입력 방식입니다. 목록에서만 고르게 할지, 자유롭게 적게 할지에 따라 세 가지로 나뉩니다.">
      <Section title="세 가지 방식">
        <Table
          head={["방식", "초점을 두면 목록이 열림", "치는 대로 목록을 거름", "치면 목록이 그 자리로 스크롤됨", "목록에 없는 값을 넣을 수 있음"]}
          rows={[
            ["골라 넣기 (Combobox)", "예", "아니요", "예", "아니요"],
            ["목록 완성 (AutoComplete)", "아니요", "예", "예", "예"],
            ["추천 완성 (AutoSuggest)", "아니요", "예", "아니요", "예"],
          ]}
        />
        <Rules
          items={[
            "골라 넣기는 정해진 목록 안에서만 값을 받습니다. 글자로 치는 것은 빨리 찾아가기 위한 수단입니다.",
            "목록 완성은 이름·코드처럼 끝이 정해진 목록에서 찾습니다(거래처, 부서, 담당자).",
            "추천 완성은 낱말·문장처럼 끝이 열린 목록에서 찾습니다(검색어, 문서 제목).",
            "세 방식 모두 입력창(Input)과 선택 목록(Select)을 합친 것입니다.",
          ]}
        />
      </Section>

      <Section title="골라 넣기">
        <P>입력창과 선택 상자를 합친 것입니다. 목록의 값을 글자로 쳐서 넣을 수 있는 선택 상자라고 보면 됩니다. 일반 입력창, 선택 상자, 자동 완성 어느 것도 맞지 않을 때 씁니다. 시간 선택(TimePicker)이 이 방식입니다.</P>
        <Demo caption="시간 선택 — 누르면 목록이 열리고, 숫자를 치면 그 값으로 스크롤됩니다">
          <TimePicker defaultValue="14:30" aria-label="회의 시작 시간" />
        </Demo>
        <Rules
          items={[
            "입력창에 초점이 가면 바로 목록이 열립니다.",
            "글자를 쳐도 목록을 거르지 않습니다. \"14\"를 치면 모든 항목이 그대로 있고, \"14\"로 시작하는 첫 항목까지 목록이 스크롤됩니다.",
            "목록의 값과 정확히 같은 글자를 치고 Enter를 누르면 그 값이 선택됩니다.",
            "목록에 없는 값을 치고 Enter를 누르면 \"목록에서 골라 주십시오\"라는 설명 풍선을 보입니다. 목록에 없는 값은 받지 않습니다.",
            "검사는 다른 폼 요소와 같습니다. '입력값 검사' 문서를 따릅니다.",
            "목록을 불러오는 데 시간이 걸리면 입력창 안에 도는 표시(Spin)를 보입니다.",
          ]}
        />
      </Section>

      <Section title="목록 완성과 추천 완성">
        <P>둘 다 사용자가 입력창에 글자를 넣으면 맞는 결과를 아래 목록에 보여 줍니다. 목록에 없는 값을 그대로 넣을 수도 있습니다. 차이는 찾는 대상입니다. 목록 완성은 닫힌 목록, 추천 완성은 열린 목록입니다.</P>
        <Demo caption="추천 완성 — 미리 가진 낱말 목록에서 거릅니다. '서'를 쳐 봅니다.">
          <Flex direction="column" gap={1}>
            <Text tag="label" size={200} htmlFor="as-word">문서 제목</Text>
            <AutoSuggest id="as-word" w={280} suggestions={WORDS} statusItemPlaceholder="제목을 입력하면 비슷한 문서 이름이 나옵니다" />
          </Flex>
        </Demo>
        <Demo caption="추천 완성 — 서버에서 받아 옵니다. 받는 동안 입력창 안에 도는 표시가 나옵니다.">
          <Flex direction="column" gap={1}>
            <Text tag="label" size={200} htmlFor="as-word-async">문서 제목</Text>
            <AutoSuggest id="as-word-async" w={280} suggestions={loadWords} statusItemPlaceholder="제목을 입력하면 비슷한 문서 이름이 나옵니다" />
          </Flex>
        </Demo>
        <Demo caption="닫힌 목록에서 찾기 — 선택 상자 안에 찾기 입력창을 둡니다">
          <CompleteDemo />
        </Demo>
        <Sub title="동작">
          <Rules
            items={[
              "글자를 넣는 대로 목록을 걸러, 넣은 글자와 맞는 결과만 남깁니다.",
              "맞은 부분은 굵게 표시합니다.",
              "목록의 항목을 누르거나 화살표 키로 옮겨 Enter를 누르면 그 값이 입력창에 들어가고 목록이 닫힙니다.",
              "Esc를 누르면 값은 그대로 두고 목록만 닫습니다.",
            ]}
          />
        </Sub>
        <Sub title="상태">
          <Table
            head={["상태", "보이는 것"]}
            rows={[
              ["기본", "입력창만 보입니다. 목록은 닫혀 있습니다."],
              ["입력 시작 전", "초점을 두면 \"입력하면 추천이 나옵니다\" 같은 안내 한 줄을 보일 수 있습니다. 필요 없으면 비워 둡니다."],
              ["결과를 불러오는 중", "입력창 오른쪽에 도는 표시를 보입니다. 이전 결과가 있으면 그대로 둡니다."],
              ["문제가 생김", "목록 자리에 \"결과를 불러오지 못했습니다\"와 \"다시 시도\"를 보입니다."],
              ["결과 있음", "맞는 항목의 목록을 보입니다. 많으면 목록 안에서 스크롤합니다."],
              ["결과 없음", "목록 완성은 \"찾는 값이 없습니다\"를 보입니다. 추천 완성은 목록을 닫고 넣은 값을 그대로 받습니다."],
            ]}
          />
        </Sub>
      </Section>

      <Section title="고르는 법">
        <Table
          head={["상황", "쓰는 것", "예"]}
          rows={[
            ["값이 정해져 있고 수가 적음", "선택 상자 (Select)", "승인 상태, 등급"],
            ["값이 정해져 있고 순서가 있어 쳐서 찾아가면 빠름", "골라 넣기", "시간"],
            ["값이 정해져 있고 수가 많음", "목록 완성 — 찾기 입력창이 있는 선택 상자", "거래처, 담당자"],
            ["값이 열려 있고 추천만 해 주면 됨", "추천 완성 (AutoSuggest)", "검색어, 문서 제목"],
          ]}
        />
        <DoDont
          good={{ text: "거래처처럼 반드시 등록된 값이어야 하는 것은 목록에서만 고르게 합니다." }}
          bad={{ text: "등록된 값만 받아야 하는 칸에 추천 완성을 쓰지 않습니다. 목록에 없는 값이 그대로 들어갑니다." }}
        />
      </Section>
    </Page>
  );
}

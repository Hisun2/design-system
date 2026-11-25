import React from "react";
import MathPlusM from "@semcore/icon/MathPlus/m";
import { Button, Select, ProductHead, ProductHeadTitle, noticeBubbleDefaultManager, Flex, Box, Text } from "@ec21rnc/ui";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "작업 대상 고르기", order: 17 };

const MINE = ["가나다 상사", "가람 물산", "나라 유통", "다온 전자"];
const SHARED = ["라온 식품", "마루 건설"];

/** 지금 보고 있는 거래처를 바꾸는 선택 상자. */
function ClientSelect({ value, onChange }) {
  const [query, setQuery] = React.useState("");
  const match = (name) => name.includes(query.trim());
  const mine = MINE.filter(match);
  const shared = SHARED.filter(match);
  const create = () => noticeBubbleDefaultManager.add({ children: "'새 거래처 등록' 창이 열립니다.", initialAnimation: true, duration: 4000 });
  return (
    <Select value={value} onChange={onChange} onVisibleChange={() => setQuery("")}>
      <Select.Trigger tag={Button} use="tertiary" theme="muted" aria-label="거래처 바꾸기" />
      <Select.Popper aria-label="거래처 목록" w={260}>
        <Select.InputSearch value={query} onChange={setQuery} placeholder="거래처 이름으로 찾기" />
        <Select.List hMax={220}>
          {mine.length ? (
            <Select.Group title="내 거래처">
              {mine.map((name) => <Select.Option value={name} key={name}>{name}</Select.Option>)}
            </Select.Group>
          ) : null}
          {shared.length ? (
            <Select.Group title="공유받은 거래처">
              {shared.map((name) => <Select.Option value={name} key={name}>{name}</Select.Option>)}
            </Select.Group>
          ) : null}
          {!mine.length && !shared.length ? (
            <Text tag="div" size={200} color="text-secondary" p={3}>찾는 거래처가 없습니다.</Text>
          ) : null}
        </Select.List>
        <Select.Divider />
        <Box p={1}>
          <Button use="tertiary" theme="info" addonLeft={MathPlusM} onClick={create}>새 거래처 등록</Button>
        </Box>
      </Select.Popper>
    </Select>
  );
}

function HeadDemo() {
  const [client, setClient] = React.useState("가나다 상사");
  return (
    <Box w="100%">
      <ProductHead>
        <ProductHead.Row>
          <ProductHeadTitle tag="h3">
            문서 관리
            <ProductHeadTitle.Tool>
              <ClientSelect value={client} onChange={setClient} />
            </ProductHeadTitle.Tool>
          </ProductHeadTitle>
        </ProductHead.Row>
      </ProductHead>
      <Text tag="p" size={200} color="text-secondary" m={0}>아래 내용은 '{client}'의 문서입니다.</Text>
    </Box>
  );
}

export default function ProjectSelectPage() {
  return (
    <Page meta={meta} lead="지금 보고 있는 작업 대상(거래처, 부서, 문서함)을 다른 것으로 바꾸는 선택 상자입니다. 페이지 머리의 제목 옆에 둡니다.">
      <Section title="하는 일">
        <Rules
          items={[
            "저장된 작업 대상 사이를 오갑니다. 고르면 화면 전체의 내용이 그 대상의 것으로 바뀝니다.",
            "목록 안에서 바로 새 대상을 만들 수 있습니다.",
            "다른 사람이 공유해 준 대상을 따로 묶어 보여 줍니다.",
          ]}
        />
        <Demo caption="거래처 이름을 누르면 목록이 열립니다">
          <HeadDemo />
        </Demo>
      </Section>

      <Section title="구성">
        <Table
          head={["부분", "규칙"]}
          rows={[
            ["여는 버튼", "지금 고른 대상의 이름과 아래 화살표. 페이지 제목 바로 뒤에 둡니다."],
            ["찾기 입력창", "대상이 여덟 개를 넘으면 목록 맨 위에 둡니다. 이름으로 거릅니다."],
            ["내 것 묶음", "내가 만들었거나 맡은 대상."],
            ["공유받은 것 묶음", "다른 사람이 공유해 준 대상. 묶음 제목으로 구분합니다."],
            ["새로 만들기", "목록 맨 아래에 구분선을 두고 그 밑에 둡니다. 누르면 '새 항목 만들기 창'이 열립니다."],
          ]}
        />
      </Section>

      <Section title="놓는 자리">
        <Rules
          items={[
            <>페이지 머리(<Code>ProductHead</Code>)의 제목 줄에, 화면 이름 바로 뒤에 둡니다.</>,
            "한 화면에 하나만 둡니다.",
            "같은 업무 안의 모든 화면에서 같은 자리에 둡니다. 화면을 옮겨도 고른 대상은 그대로입니다.",
            "대상의 이름이 길면 말줄임표로 자릅니다. 오른쪽에 다른 컨트롤이 있으면 24px을 띄웁니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Table
          head={["때", "일어나는 일"]}
          rows={[
            ["목록을 엶", "지금 고른 대상에 선택 표시가 되어 있습니다. 찾기 입력창에 초점이 갑니다."],
            ["다른 대상을 고름", "목록이 닫히고 화면 내용을 그 대상의 것으로 다시 불러옵니다. 불러오는 동안 본문에 로딩 상태를 보입니다."],
            ["찾는 이름이 없음", "\"찾는 거래처가 없습니다\"를 보이고, 새로 만들기는 그대로 둡니다."],
            ["새로 만들기를 누름", "목록이 닫히고 만들기 창이 열립니다. 다 만들면 새 대상이 고른 상태가 됩니다."],
            ["대상이 하나도 없음", "선택 상자 대신 빈 화면을 보이고 만들기 버튼을 둡니다."],
            ["고른 대상이 삭제됨·권한 없어짐", "오류 화면의 '항목을 찾을 수 없음'을 보입니다."],
          ]}
        />
        <Rules
          items={[
            "마지막으로 고른 대상을 기억합니다. 다음에 들어오면 그 대상으로 엽니다.",
            "고른 대상은 주소에도 담습니다. 주소를 다른 사람에게 보내면 같은 대상이 열려야 합니다.",
            "저장하지 않은 내용이 있을 때 대상을 바꾸려 하면 확인 창으로 한 번 묻습니다.",
          ]}
        />
      </Section>

      <Section title="공유받은 대상">
        <Rules
          items={[
            "내 것과 섞지 않고 따로 묶습니다.",
            "볼 수만 있는 대상은 이름 옆에 \"보기 전용\"이라고 적습니다.",
            "공유받은 대상도 나만의 설정(즐겨찾기, 열 순서 등)은 따로 저장합니다. 다른 사람의 화면에는 영향을 주지 않습니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "화면 이름 뒤에 지금 고른 거래처 이름을 늘 보이게 둡니다. 누구의 데이터를 보고 있는지 항상 알 수 있습니다." }}
          bad={{ text: "대상을 바꾸는 컨트롤을 필터 줄에 섞어 두지 않습니다. 필터는 보이는 범위를 좁히고, 이 선택 상자는 화면 전체의 대상을 바꿉니다." }}
        />
      </Section>
    </Page>
  );
}

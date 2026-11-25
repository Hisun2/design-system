import React from "react";
import { Button, Tooltip, Flex, Text, Input } from "@ec21rnc/ui";
import EditM from "@semcore/icon/Edit/m";
import EditL from "@semcore/icon/Edit/l";
import TrashM from "@semcore/icon/Trash/m";
import SearchM from "@semcore/icon/Search/m";
import MathPlusM from "@semcore/icon/MathPlus/m";
import FavoriteM from "@semcore/icon/Favorite/m";
import FavoriteFilledM from "@semcore/icon/FavoriteFilled/m";
import WarningM from "@semcore/icon/Warning/m";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "아이콘", order: 4 };

export default function IconPage() {
  return (
    <Page meta={meta} lead="아이콘은 글자를 돕는 표시입니다. Intergalactic 아이콘 묶음(375종)을 그대로 씁니다.">
      <Section title="불러오는 법">
        <P>
          아이콘은 수가 많아 하나씩 불러옵니다. 주소는 <Code>@semcore/icon/이름/크기</Code>입니다. 이것이 <Code>@semcore</Code>에서 직접 불러오는 유일한 예외입니다.
        </P>
        <Demo>
          <EditM /> <TrashM /> <SearchM /> <MathPlusM /> <WarningM />
        </Demo>
        <P>
          예: <Code>import EditM from "@semcore/icon/Edit/m"</Code>
        </P>
      </Section>

      <Section title="크기">
        <Table
          head={["보기", "크기", "주소 끝", "쓰는 곳"]}
          rows={[
            [<EditM />, "M · 16px", <Code>/m</Code>, "기본. 버튼, 입력창, 표, 본문 옆"],
            [<EditL />, "L · 24px", <Code>/l</Code>, "큰 버튼(L), 빈 화면처럼 넓은 자리"],
          ]}
        />
        <Rules
          items={[
            "선의 굵기는 두 크기 모두 2px입니다. 아이콘을 늘리거나 줄여 쓰지 않고 맞는 크기를 불러옵니다.",
            "한 줄에 놓인 아이콘은 같은 크기로 맞춥니다.",
          ]}
        />
      </Section>

      <Section title="선 아이콘과 채운 아이콘">
        <Demo>
          <Flex gap={2} alignItems="center"><FavoriteM /><Text size={200}>즐겨찾기 안 함</Text></Flex>
          <Flex gap={2} alignItems="center"><FavoriteFilledM /><Text size={200}>즐겨찾기 함</Text></Flex>
        </Demo>
        <Rules
          items={[
            "기본은 선으로 그린 아이콘입니다.",
            <>일부 아이콘에는 채운 모양이 있습니다. 이름 끝에 <Code>Filled</Code>가 붙습니다.</>,
            "채운 모양은 \"이미 했다\"는 상태를 나타낼 때만 씁니다. 꾸미려고 섞어 쓰지 않습니다.",
          ]}
        />
      </Section>

      <Section title="색">
        <Rules
          items={[
            "아이콘은 옆에 있는 글자의 색을 따라갑니다. 따로 색을 주지 않는 것이 기본입니다.",
            <>글자 없이 혼자 있는 아이콘은 보조 글자색(<Code>--ec-text-secondary</Code>)으로 둡니다.</>,
            "상태를 나타내는 아이콘만 상태 색(성공·주의·오류)을 씁니다.",
            "누를 수 없는 아이콘과 누를 수 있는 아이콘은 마우스를 올렸을 때의 반응으로 구분합니다. 누를 수 있는 것은 버튼 안에 넣습니다.",
          ]}
        />
      </Section>

      <Section title="버튼·입력창과 함께">
        <Demo>
          <Button use="primary" theme="info"><Button.Addon><MathPlusM /></Button.Addon><Button.Text>거래처 추가</Button.Text></Button>
          <Tooltip title="수정"><Button aria-label="수정"><Button.Addon><EditM /></Button.Addon></Button></Tooltip>
          <Input w={220}><Input.Addon><SearchM /></Input.Addon><Input.Value placeholder="거래처 이름" aria-label="거래처 검색" /></Input>
        </Demo>
        <Rules
          items={[
            "아이콘과 글자 사이는 4px(컴포넌트에 이미 들어 있음)입니다.",
            <>글자 없이 아이콘만 있는 버튼에는 <Code>aria-label</Code>로 이름을 붙이고 설명 풍선을 답니다.</>,
            "뜻이 널리 알려진 아이콘(돋보기, 휴지통, 연필, 닫기) 말고는 글자를 함께 둡니다.",
          ]}
        />
      </Section>

      <Section title="아이콘 고르기">
        <Rules
          items={[
            "같은 뜻에는 모든 시스템에서 같은 아이콘을 씁니다. 수정은 연필(Edit), 삭제는 휴지통(Trash), 검색은 돋보기(Search), 추가는 더하기(MathPlus)입니다.",
            "한 아이콘에 두 가지 뜻을 주지 않습니다.",
            "맞는 아이콘이 없으면 비슷한 것을 억지로 쓰지 말고 글자만 씁니다.",
          ]}
        />
        <DoDont
          good={{
            demo: <Button><Button.Addon><TrashM /></Button.Addon><Button.Text>삭제</Button.Text></Button>,
            text: "아이콘은 글자의 뜻을 돕는 자리에 둡니다.",
          }}
          bad={{
            demo: <Button aria-label="무슨 뜻인지 알 수 없음"><Button.Addon><WarningM /></Button.Addon></Button>,
            text: "뜻이 분명하지 않은 아이콘을 글자 없이 쓰지 않습니다.",
          }}
        />
      </Section>

      <Section title="새 아이콘을 그릴 때">
        <P>묶음에 없는 아이콘이 꼭 필요하면 아래 규칙으로 그려 기존 아이콘과 같은 모양이 되게 합니다.</P>
        <Rules
          items={[
            "틀은 16×16px(M)와 24×24px(L) 두 가지를 함께 그립니다.",
            "선 굵기 2px, 선은 도형의 안쪽으로 맞춥니다.",
            "바깥 모서리는 1px 둥글게, 안쪽 모서리는 둥글리지 않습니다. 열린 선의 끝은 둥글게 합니다.",
            "도형 사이는 2px 이상 띄웁니다.",
            "입체로 그리지 않고 평면으로 그립니다. 알아보는 데 필요한 것만 남깁니다.",
            "위치와 크기는 소수점 없는 픽셀에 맞춥니다.",
            "금지·꺼짐을 나타내는 사선은 굵기 2px, 왼쪽 위에서 오른쪽 아래로 45도, 도형과 2px 띄웁니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

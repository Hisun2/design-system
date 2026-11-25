import React from "react";
import { ProductHead, ProductHeadTitle, ProductHeadInfo, Breadcrumbs, Link, ButtonLink, Button, Select, Box } from "@ec21rnc/ui";
import SettingsM from "@semcore/icon/Settings/m";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "ProductHead" };

function FullHead() {
  return (
    <Box w="100%">
      <ProductHead>
        <ProductHead.Row>
          <Breadcrumbs>
            <Breadcrumbs.Item href="#product-head">홈</Breadcrumbs.Item>
            <Breadcrumbs.Item href="#product-head">거래처 관리</Breadcrumbs.Item>
            <Breadcrumbs.Item active>거래처 목록</Breadcrumbs.Item>
          </Breadcrumbs>
          <ProductHead.Links>
            <Link href="#product-head">이용 안내</Link>
            <ButtonLink>의견 보내기</ButtonLink>
          </ProductHead.Links>
        </ProductHead.Row>
        <ProductHead.Row>
          <ProductHeadTitle toolName="거래처 목록:">
            해외 영업 1팀
            <ButtonLink use="secondary" addonLeft={SettingsM} aria-label="화면 설정" ml={2} />
          </ProductHeadTitle>
          <ProductHead.Buttons>
            <Button>내려받기</Button>
            <Button use="primary" theme="info">거래처 추가</Button>
          </ProductHead.Buttons>
        </ProductHead.Row>
        <ProductHead.Row>
          <ProductHeadInfo>
            <ProductHeadInfo.Item label="기간">
              <Select
                defaultValue="month"
                options={[
                  { value: "month", children: "이번 달" },
                  { value: "quarter", children: "이번 분기" },
                ]}
                aria-label="기간"
              />
            </ProductHeadInfo.Item>
            <ProductHeadInfo.Item label="담당자">김 담당</ProductHeadInfo.Item>
            <ProductHeadInfo.Item label="마지막 갱신">2026-11-25 14:30</ProductHeadInfo.Item>
          </ProductHeadInfo>
        </ProductHead.Row>
      </ProductHead>
    </Box>
  );
}

function SimpleHead() {
  return (
    <Box w="100%">
      <ProductHead>
        <ProductHead.Row>
          <ProductHeadTitle>승인 대기 문서</ProductHeadTitle>
          <ProductHead.Buttons>
            <Button use="primary" theme="info">문서 작성</Button>
          </ProductHead.Buttons>
        </ProductHead.Row>
      </ProductHead>
    </Box>
  );
}

function LongHead() {
  return (
    <Box w={480}>
      <ProductHead>
        <ProductHead.Row>
          <ProductHeadTitle toolName="거래처 상세:">
            2026년 하반기 해외 영업 본부 동남아시아 지역 신규 거래처 묶음
          </ProductHeadTitle>
          <ProductHead.Buttons ml={6}>
            <Button>수정</Button>
          </ProductHead.Buttons>
        </ProductHead.Row>
      </ProductHead>
    </Box>
  );
}

export default function ProductHeadPage() {
  return (
    <Page meta={meta} lead="화면 맨 위에 놓이는 페이지 머리 영역입니다. 경로, 제목, 주요 버튼, 화면 전체에 걸리는 필터를 한데 모읍니다. 언제나 상단바 바로 아래에 둡니다.">
      <Section title="구성">
        <Demo caption="넣을 수 있는 것을 모두 넣은 모습">
          <FullHead />
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>ProductHead</Code>, "머리 영역 전체입니다."],
            [<Code>ProductHead.Row</Code>, "줄 하나입니다. 머리 영역은 여러 줄로 나뉘고, 줄 사이 간격은 모두 같습니다."],
            [<Code>ProductHead.Links</Code>, "덧붙이는 링크 묶음입니다. 보통 첫 줄의 오른쪽 끝에 둡니다."],
            [<Code>ProductHead.Buttons</Code>, "주요 버튼 묶음입니다. 제목 줄의 오른쪽 끝에 둡니다."],
            [<Code>ProductHeadTitle</Code>, <>화면 이름과 대상 이름입니다. <Code>toolName</Code>에 화면 이름을, 안쪽에 대상(부서, 과제 등) 이름을 적습니다. 화면을 설정하는 버튼을 곁들일 수 있습니다.</>],
            [<Code>ProductHeadInfo</Code>, "화면 전체에 걸리는 필터와 덧붙이는 정보가 놓이는 줄입니다."],
            [<Code>ProductHeadInfo.Item</Code>, <>정보 하나 또는 필터 하나입니다. <Code>label</Code>로 이름을 붙입니다.</>],
          ]}
        />
      </Section>

      <Section title="여백">
        <Table
          head={["자리", "값"]}
          rows={[
            ["머리 영역의 왼쪽·오른쪽 안쪽 여백", <>32px (<Code>--ec-spacing-8x</Code>)</>],
            ["머리 영역 위", <>16px (<Code>--ec-spacing-4x</Code>)</>],
            ["머리 영역 아래 (본문과의 사이)", <>24px (<Code>--ec-spacing-6x</Code>)</>],
            ["줄과 줄 사이", "위아래 8px씩"],
            ["버튼과 버튼 사이", <>8px (<Code>--ec-spacing-2x</Code>)</>],
            ["덧붙이는 링크 사이", "20px"],
            ["정보 항목 사이", <>24px (<Code>--ec-spacing-6x</Code>)</>],
            ["정보 항목의 이름과 값 사이", <>4px (<Code>--ec-spacing-1x</Code>)</>],
          ]}
        />
        <P>좌우 안쪽 여백은 머리 영역을 담는 쪽에서 줍니다. 본문의 좌우 여백과 같게 맞춥니다.</P>
      </Section>

      <Section title="줄마다의 모양">
        <Sub title="경로와 덧붙이는 링크">
          <Rules
            items={[
              "경로(Breadcrumbs)와 링크는 세로 가운데를 맞춥니다.",
              "링크는 14px입니다.",
              "모달을 열거나 화면의 무언가를 바꾸는 것처럼 버튼 구실을 하는 것은 Link가 아니라 ButtonLink로 만듭니다.",
            ]}
          />
        </Sub>
        <Sub title="제목과 주요 버튼">
          <Rules
            items={[
              "제목, 버튼, 곁들이는 표시는 서로 세로 가운데를 맞춥니다.",
              <>제목은 20px(<Code>--ec-fs-400</Code>, <Code>--ec-lh-400</Code>)입니다.</>,
              <>화면 이름은 <Code>--ec-text-primary</Code>, 대상 이름은 <Code>--ec-text-secondary</Code> 색입니다.</>,
              <>제목 옆 아이콘은 M 크기, <Code>--ec-text-secondary</Code> 색이고 제목의 글자 밑선에 맞춥니다.</>,
              "버튼은 M 크기입니다. 주요 버튼은 하나만 둡니다.",
            ]}
          />
        </Sub>
        <Sub title="필터와 덧붙이는 정보">
          <Rules
            items={[
              "모든 요소의 세로 가운데를 맞춥니다.",
              <>글자는 14px(<Code>--ec-fs-200</Code>, <Code>--ec-lh-200</Code>), <Code>--ec-text-primary</Code> 색입니다.</>,
              "아이콘은 M 크기입니다.",
              "여기에는 화면 전체의 자료를 바꾸는 필터만 둡니다. 표 하나에만 걸리는 필터는 그 표 위에 둡니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="경우에 따른 모양">
        <Sub title="이름이 길 때">
          <Demo>
            <LongHead />
          </Demo>
          <Rules
            items={[
              "대상 이름이 길어 자리에 들어가지 않으면 말줄임으로 자릅니다. 줄을 바꾸지 않습니다.",
              <>오른쪽에 버튼이 있으면 제목과 버튼 사이를 24px(<Code>--ec-spacing-6x</Code>) 띄웁니다.</>,
            ]}
          />
        </Sub>
        <Sub title="필터·정보 줄이나 탭이 없을 때">
          <Demo>
            <SimpleHead />
          </Demo>
          <P>
            필터와 정보 줄이 없어도 머리 영역 아래의 24px(<Code>--ec-spacing-6x</Code>) 여백은 그대로 둡니다.
          </P>
        </Sub>
      </Section>

      <Section title="좁은 화면에서">
        <Rules
          items={[
            "화면 폭이 768px보다 좁아지면 한 줄에 있던 요소가 여러 줄로 내려갑니다.",
            "버튼 묶음은 제목 아래로 내려가 왼쪽에 맞춰집니다.",
            "덧붙이는 링크 묶음은 숨습니다. 꼭 필요한 동작을 여기에만 두지 않습니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "모든 화면에서 같은 순서를 지킵니다. 경로 → 제목과 버튼 → 필터와 정보 순입니다." }}
          bad={{ text: "화면마다 버튼과 필터의 자리를 바꾸지 않습니다. 사용자가 매번 다시 찾아야 합니다." }}
        />
        <Rules
          items={[
            "화면 전체에 관한 알림(Notice)은 머리 영역 안, 경로 아래에 둡니다.",
            "탭(TabLine)으로 화면을 나누면 탭 줄을 머리 영역의 마지막 줄에 둡니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

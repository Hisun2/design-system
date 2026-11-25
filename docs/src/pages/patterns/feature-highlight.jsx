import React from "react";
import SummaryAI from "@semcore/icon/SummaryAI/m";
import {
  BadgeFH, ButtonFH, CheckboxFH, InputFH, NoticeFH, PillsFH, RadioFH, SelectFH, SwitchFH, TabLineFH,
  Button, Checkbox, Radio, RadioGroup, DataTable, FeaturePopover, ScreenReaderOnly, Flex, Box, Text,
} from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "새 기능 알리기", order: 13 };

const ICON_COLOR = "--intergalactic-feature-highlight-icon-primary";

const DOCS = [
  { name: "11월 거래 명세서", risk: "낮음", amount: "12,480원" },
  { name: "납품 계약서", risk: "높음", amount: "1,250,000원" },
];

function SelectDemo() {
  const [value, setValue] = React.useState("");
  return (
    <>
      <SelectFH onChange={setValue}>
        <SelectFH.Trigger aria-label="분류 방법" aria-describedby="fh-select-desc" w={200}>
          <SelectFH.Trigger.Addon />
          <SelectFH.Trigger.Text>{value || "분류 방법 선택"}</SelectFH.Trigger.Text>
        </SelectFH.Trigger>
        <SelectFH.Menu>
          <SelectFH.Option value="자동 분류">자동 분류</SelectFH.Option>
          <SelectFH.Option value="부서별">부서별</SelectFH.Option>
          <SelectFH.Option value="날짜별">날짜별</SelectFH.Option>
        </SelectFH.Menu>
      </SelectFH>
      <ScreenReaderOnly id="fh-select-desc">새로 생긴 기능</ScreenReaderOnly>
    </>
  );
}

function PopoverDemo() {
  const [visible, setVisible] = React.useState(false);
  return (
    <FeaturePopover visible={visible} onVisibleChange={setVisible} placement="right">
      <FeaturePopover.Trigger>
        <Button onClick={() => setVisible(true)}>문서 요약</Button>
        <FeaturePopover.Spot />
      </FeaturePopover.Trigger>
      <FeaturePopover.Popper closeIcon wMax={350} aria-label="문서 요약 기능 안내">
        <Text tag="h4" size={300} bold m={0} mb={1}>긴 문서를 세 줄로 읽으십시오</Text>
        <Text tag="p" size={200} m={0}>문서를 열고 '문서 요약'을 누르면 핵심만 간추려 보여 줍니다.</Text>
        <Flex gap={2} mt={4}>
          <Button use="primary" theme="invert" onClick={() => setVisible(false)}>알겠습니다</Button>
          <Button use="tertiary" theme="invert" onClick={() => setVisible(false)}>나중에 다시 보기</Button>
        </Flex>
      </FeaturePopover.Popper>
    </FeaturePopover>
  );
}

export default function FeatureHighlightPage() {
  return (
    <Page meta={meta} lead="새로 생긴 기능을 눈에 띄게 하는 강조 모양입니다. 이름 끝에 FH가 붙은 컴포넌트를 씁니다. 모두 기존 컴포넌트(Button, Notice 등)를 감싼 것이어서 원래의 속성을 그대로 쓸 수 있습니다.">
      <Section title="기본 원칙">
        <Rules
          items={[
            "한 화면에서 강조하는 기능은 한두 개까지만 둡니다. 여럿을 강조하면 아무것도 강조되지 않습니다.",
            "알린 지 한 달쯤 지나면 강조 모양을 일반 컴포넌트로 되돌립니다.",
            "누를 때 반짝이는 움직임이 있는 컨트롤은, 여러 번 누르게 되는 것이면 몇 번 누른 뒤 움직임을 끕니다.",
            "컨트롤의 글자에 새 기능이라는 말이 없으면, 화면 낭독기가 읽을 설명을 따로 붙입니다(아래 예시의 ScreenReaderOnly).",
            "강조 색은 이 용도로만 씁니다. 새 기능이 아닌 것을 꾸미는 데 쓰지 않습니다.",
          ]}
        />
      </Section>

      <Section title="배지">
        <Demo>
          <BadgeFH>자동 요약</BadgeFH>
          <BadgeFH use="neutral">많이 쓰는 기능</BadgeFH>
        </Demo>
        <P>
          입력창, 탭 등 다른 컴포넌트에 강조를 더할 때 <Code>BadgeFH</Code>를 붙입니다. 일반 배지(Badge)는 종류와 글자가 여섯 가지로 고정이지만, 이 배지는 강조하려는 기능의 이름을 짧게 적습니다. <Code>use="neutral"</Code>은 덜 튀는 모양입니다.
        </P>
      </Section>

      <Section title="버튼">
        <Demo caption="L 크기">
          <ButtonFH use="primary" addonLeft={SummaryAI} size="l" aria-describedby="fh-button-desc">문서 요약</ButtonFH>
          <ScreenReaderOnly id="fh-button-desc">새로 생긴 기능</ScreenReaderOnly>
          <ButtonFH size="l">
            <ButtonFH.Addon animatedSparkleCount={5} />
            <ButtonFH.Text>문서 요약</ButtonFH.Text>
            <ButtonFH.Addon><BadgeFH>자동 요약</BadgeFH></ButtonFH.Addon>
          </ButtonFH>
        </Demo>
        <Demo caption="M 크기">
          <ButtonFH use="primary" addonLeft={SummaryAI} aria-describedby="fh-button-desc">문서 요약</ButtonFH>
          <ButtonFH aria-describedby="fh-button-desc">
            <ButtonFH.Addon animatedSparkleCount={5} />
            <ButtonFH.Text>문서 요약</ButtonFH.Text>
          </ButtonFH>
        </Demo>
        <Rules
          items={[
            <>주요 버튼에는 일반 아이콘 자리(<Code>addonLeft</Code>)를 씁니다.</>,
            <>보조 버튼에는 전용 아이콘(<Code>ButtonFH.Addon</Code>)을 씁니다. 누르면 반짝이는 움직임이 들어 있습니다.</>,
            <>반짝임의 수는 <Code>animatedSparkleCount</Code>로 바꿉니다. 0으로 하거나 주지 않으면 움직임이 꺼집니다.</>,
            "강조한 주요 버튼도 주요 버튼입니다. 한 화면에 주요 버튼은 하나라는 규칙은 그대로입니다.",
          ]}
        />
      </Section>

      <Section title="체크박스">
        <Demo column>
          <Flex direction="column" gap={2}>
            <CheckboxFH aria-describedby="fh-checkbox-desc">
              <CheckboxFH.Value />
              <CheckboxFH.AnimatedSparkles count={5} />
              <CheckboxFH.Text>
                비슷한 문서 함께 보기
                <Box tag={SummaryAI} color={ICON_COLOR} ml={2} />
              </CheckboxFH.Text>
            </CheckboxFH>
            <ScreenReaderOnly id="fh-checkbox-desc">새로 생긴 기능</ScreenReaderOnly>
            <Checkbox label="반려 문서 포함" />
          </Flex>
          <Flex direction="column" gap={2}>
            <CheckboxFH size="l" defaultChecked>
              <CheckboxFH.Value />
              <CheckboxFH.AnimatedSparkles count={5} />
              <CheckboxFH.Text>
                비슷한 문서 함께 보기
                <BadgeFH ml={2}>새 기능</BadgeFH>
              </CheckboxFH.Text>
            </CheckboxFH>
            <Checkbox size="l" label="반려 문서 포함" />
          </Flex>
        </Demo>
        <Rules
          items={[
            <>누를 때의 반짝임은 <Code>CheckboxFH.AnimatedSparkles</Code>로 켜고 <Code>count</Code>로 수를 정합니다.</>,
            "이름표 뒤에 강조 색 아이콘이나 배지를 붙여 더 눈에 띄게 할 수 있습니다.",
            <>아이콘 색에 강조 토큰을 쓸 때는 이름 앞에 <Code>--intergalactic</Code>을 붙여 적습니다(<Code>{ICON_COLOR}</Code>).</>,
          ]}
        />
      </Section>

      <Section title="표의 열">
        <Demo>
          <DataTable
            data={DOCS}
            aria-label="강조한 열이 있는 표"
            wMax={560}
            columns={[
              { name: "name", children: "문서" },
              {
                name: "risk",
                children: (
                  <>
                    <Box tag={SummaryAI} color={ICON_COLOR} mr={1} />
                    위험도
                    <ScreenReaderOnly>새로 생긴 기능</ScreenReaderOnly>
                  </>
                ),
              },
              { name: "amount", children: "금액", justifyContent: "end" },
            ]}
          />
        </Demo>
        <P>새로 생긴 열은 열 제목 앞에 강조 색 아이콘을 둡니다. 열 제목에 새 기능이라는 말이 없으면 화면 낭독기용 글을 열 제목 안에 넣습니다.</P>
      </Section>

      <Section title="입력창">
        <Demo>
          <InputFH w={220}>
            <InputFH.Addon />
            <InputFH.Value placeholder="문장으로 찾기" aria-label="문서 찾기" aria-describedby="fh-input-desc" />
          </InputFH>
          <ScreenReaderOnly id="fh-input-desc">새로 생긴 기능</ScreenReaderOnly>
          <InputFH w={300} size="l">
            <InputFH.Addon />
            <InputFH.Value placeholder="문장으로 찾기" aria-label="문서 찾기" aria-describedby="fh-input-badge" />
            <InputFH.Addon><BadgeFH id="fh-input-badge">새 기능</BadgeFH></InputFH.Addon>
          </InputFH>
        </Demo>
        <P>전용 아이콘(<Code>InputFH.Addon</Code>)이나 배지를 넣어 강조를 더합니다. 배지가 있으면 입력창의 설명(<Code>aria-describedby</Code>)을 그 배지에 잇습니다.</P>
      </Section>

      <Section title="알림 상자">
        <Demo>
          <NoticeFH closable aria-label="새 기능 안내" label={<SummaryAI />} text="문서를 세 줄로 간추려 주는 요약 기능이 생겼습니다." />
        </Demo>
        <P>화면 위쪽에서 새 기능을 알릴 때 <Code>NoticeFH</Code>를 씁니다. 닫을 수 있게 하고, 닫으면 다시 보이지 않습니다.</P>
      </Section>

      <Section title="알약 버튼">
        <Demo>
          <ScreenReaderOnly id="fh-pills-desc">새로 생긴 기능</ScreenReaderOnly>
          <PillsFH defaultValue={1} aria-label="보기 방식">
            <PillsFH.Item value={1}>목록</PillsFH.Item>
            <PillsFH.HighlightedItem value={2} aria-describedby="fh-pills-desc">
              <PillsFH.HighlightedItem.Addon animatedSparkleCount={5} />
              <PillsFH.HighlightedItem.Text>요약</PillsFH.HighlightedItem.Text>
            </PillsFH.HighlightedItem>
            <PillsFH.Item value={3}>달력</PillsFH.Item>
          </PillsFH>
          <PillsFH defaultValue={3} size="l" aria-label="보기 방식(큰 크기)">
            <PillsFH.Item value={1}>목록</PillsFH.Item>
            <PillsFH.Item value={2}>달력</PillsFH.Item>
            <PillsFH.HighlightedItem value={3}>
              <PillsFH.HighlightedItem.Addon animatedSparkleCount={5} />
              <PillsFH.HighlightedItem.Text>요약</PillsFH.HighlightedItem.Text>
              <PillsFH.HighlightedItem.Addon><BadgeFH>새 기능</BadgeFH></PillsFH.HighlightedItem.Addon>
            </PillsFH.HighlightedItem>
          </PillsFH>
        </Demo>
        <P>묶음 전체를 <Code>PillsFH</Code>로 바꾸고, 강조할 항목만 <Code>HighlightedItem</Code>으로 씁니다. 전용 아이콘에는 누를 때의 반짝임이 들어 있습니다.</P>
      </Section>

      <Section title="라디오">
        <Demo>
          <RadioGroup name="fh-radio" defaultValue={2} aria-label="정렬 방법">
            <Flex direction="column" gap={3} alignItems="flex-start">
              <RadioFH value={1}>
                <RadioFH.Value />
                <RadioFH.AnimatedSparkles count={5} />
                <RadioFH.Text>
                  중요한 순서
                  <BadgeFH ml={2}>새 기능</BadgeFH>
                </RadioFH.Text>
              </RadioFH>
              <Radio value={2} label="최근 순서" />
            </Flex>
          </RadioGroup>
        </Demo>
        <P>체크박스와 같습니다. <Code>RadioFH.AnimatedSparkles</Code>로 반짝임을 켜고, 이름표 뒤에 아이콘이나 배지를 붙일 수 있습니다.</P>
      </Section>

      <Section title="선택 상자">
        <Demo>
          <SelectDemo />
        </Demo>
        <P>전용 아이콘(<Code>SelectFH.Trigger.Addon</Code>)을 글자 앞에 둡니다. 뒤에 배지를 하나 더 둘 수도 있습니다.</P>
      </Section>

      <Section title="스위치">
        <Demo>
          <SwitchFH>
            <SwitchFH.Value aria-describedby="fh-switch-desc" ml={0} />
            <SwitchFH.AnimatedSparkles count={5} />
            <SwitchFH.Addon>
              자동 분류
              <Box tag={SummaryAI} color={ICON_COLOR} ml={2} />
            </SwitchFH.Addon>
          </SwitchFH>
          <ScreenReaderOnly id="fh-switch-desc">새로 생긴 기능</ScreenReaderOnly>
          <SwitchFH size="l">
            <SwitchFH.Value defaultChecked ml={0} />
            <SwitchFH.AnimatedSparkles count={5} />
            <SwitchFH.Addon>자동 분류</SwitchFH.Addon>
            <BadgeFH ml={2}>새 기능</BadgeFH>
          </SwitchFH>
        </Demo>
        <P>크기는 M, L, XL이 있습니다. 이름표 뒤에 아이콘이나 배지를 붙여 강조를 더합니다.</P>
      </Section>

      <Section title="탭">
        <Demo column>
          <TabLineFH defaultValue={1} aria-label="문서 보기">
            <TabLineFH.Item value={1}>전체</TabLineFH.Item>
            <TabLineFH.HighlightedItem value={2} aria-describedby="fh-tab-desc">
              <TabLineFH.HighlightedItem.Addon animatedSparkleCount={5} />
              <TabLineFH.HighlightedItem.Text>요약</TabLineFH.HighlightedItem.Text>
            </TabLineFH.HighlightedItem>
            <TabLineFH.Item value={3}>승인 기록</TabLineFH.Item>
          </TabLineFH>
          <ScreenReaderOnly id="fh-tab-desc">새로 생긴 기능</ScreenReaderOnly>
          <TabLineFH size="l" defaultValue={2} aria-label="문서 보기(큰 크기)">
            <TabLineFH.Item value={1}>전체</TabLineFH.Item>
            <TabLineFH.HighlightedItem value={2}>
              <TabLineFH.HighlightedItem.Addon animatedSparkleCount={5} />
              <TabLineFH.HighlightedItem.Text>요약</TabLineFH.HighlightedItem.Text>
              <TabLineFH.HighlightedItem.Addon><BadgeFH>새 기능</BadgeFH></TabLineFH.HighlightedItem.Addon>
            </TabLineFH.HighlightedItem>
            <TabLineFH.Item value={3}>승인 기록</TabLineFH.Item>
          </TabLineFH>
        </Demo>
        <P>묶음 전체를 <Code>TabLineFH</Code>로 바꾸고 강조할 탭만 <Code>HighlightedItem</Code>으로 씁니다. 글자 앞에 전용 아이콘, 뒤에 배지를 둘 수 있습니다.</P>
      </Section>

      <Section title="접근성">
        <Table
          head={["경우", "할 일"]}
          rows={[
            ["글자나 배지에 새 기능이라는 말이 있음", "따로 할 일이 없습니다."],
            ["아이콘과 색으로만 강조함", <><Code>ScreenReaderOnly</Code>로 "새로 생긴 기능"을 적고 <Code>aria-describedby</Code>로 컨트롤에 잇습니다.</>],
            ["배지가 컨트롤 밖에 따로 있음", <>배지에 <Code>id</Code>를 주고 <Code>aria-describedby</Code>로 잇습니다.</>],
          ]}
        />
      </Section>

      <Section title="다른 것과의 구분">
        <P>강조 모양은 기능이 어디 있는지 눈에 띄게만 합니다. 무엇을 하는 기능인지 한두 문장으로 설명해야 하면 기능 안내 풍선(FeaturePopover)을 씁니다.</P>
        <Demo caption="버튼을 누르면 안내 풍선이 열립니다">
          <PopoverDemo />
        </Demo>
        <Table
          head={["쓰는 것", "언제"]}
          rows={[
            ["강조 모양 (FH 컴포넌트)", "새 기능의 자리를 한 달쯤 눈에 띄게 할 때"],
            ["기능 안내 풍선 (FeaturePopover)", "새 기능을 짧게 설명하고 써 보라고 권할 때. 한 번에 하나만 띄웁니다."],
            ["배지 (Badge) — 신규·베타", "기능의 상태를 오래 표시해 둘 때"],
          ]}
        />
        <DoDont
          good={{ text: "이번에 새로 낸 기능 하나에만 강조 모양을 씁니다." }}
          bad={{ text: "오래된 기능을 다시 띄우려고 강조하거나, 한 화면의 여러 컨트롤을 한꺼번에 강조하지 않습니다." }}
        />
      </Section>
    </Page>
  );
}

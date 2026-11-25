// 자주 쓰지 않는 컴포넌트와 차트를 확인하는 구역입니다.
import React from "react";
import {
  Box, Flex, Text, Button, Slider, TimePicker, ColorPicker, InlineInput, InlineEdit, InputMask, BulkTextarea,
  Flags, Carousel, Wizard, FullscreenModal, FeaturePopover, ProductHead, ProductHeadTitle, PageNotFound, RadioCards,
} from "@ec21rnc/ui";
import { Chart, MiniChart } from "@ec21rnc/ui/chart";

const line = Array.from({ length: 8 }, (_, i) => ({ x: i, 뉴스: 10 + i * 2 + (i % 3), 보고서: 14 + (i % 4) * 2, 통계: 6 + i }));
const bars = [
  { 분기: "1분기", 수출: 12, 수입: 8 }, { 분기: "2분기", 수출: 15, 수입: 9 },
  { 분기: "3분기", 수출: 11, 수입: 13 }, { 분기: "4분기", 수출: 18, 수입: 10 },
];
const many = Array.from({ length: 6 }, (_, i) => Object.fromEntries([["x", i], ...Array.from({ length: 12 }, (_, k) => [`계열${k + 1}`, 5 + k * 2 + ((i * (k + 1)) % 5)])]));

export default function More({ Block }) {
  const [wizard, setWizard] = React.useState(false);
  const [full, setFull] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [text, setText] = React.useState("눌러서 수정");
  const [editing, setEditing] = React.useState(false);
  return (
    <>
      <Block title="추가 입력">
        <Box w={200}><Slider defaultValue={30} min={0} max={100} step={1} aria-label="비율" /></Box>
        <TimePicker defaultValue="09:30" />
        <ColorPicker />
        <InputMask w={160}><InputMask.Value mask="9999-99-99" placeholder="2026-11-25" aria-label="날짜 형식" /></InputMask>
      </Block>

      <Block title="제자리 수정">
        <InlineEdit editable={editing} onEditableChange={setEditing}>
          <InlineEdit.View><Text size={200}>{text}</Text></InlineEdit.View>
          <InlineEdit.Edit>
            <InlineInput onConfirm={(v) => { setText(v); setEditing(false); }} onCancel={() => setEditing(false)}>
              <InlineInput.Value defaultValue={text} aria-label="이름 수정" />
              <InlineInput.ConfirmControl /><InlineInput.CancelControl />
            </InlineInput>
          </InlineEdit.Edit>
        </InlineEdit>
      </Block>

      <Block title="여러 줄 묶음 입력"><Box w={360}><BulkTextarea><BulkTextarea.InputField placeholder="한 줄에 하나씩 입력" /><Flex justifyContent="space-between" mt={2}><BulkTextarea.Counter /><BulkTextarea.ClearAll /></Flex></BulkTextarea></Box></Block>

      <Block title="카드형 선택">
        <RadioCards defaultValue="a" aria-label="요금제">
          <RadioCards.Item value="a">기본 (일반 사용자)</RadioCards.Item>
          <RadioCards.Item value="b">관리자 (전체 권한)</RadioCards.Item>
        </RadioCards>
      </Block>

      <Block title="국기"><Flags iso2="KR" /><Flags iso2="US" /><Flags iso2="VN" /><Flags iso2="DE" /></Block>

      <Block title="회전 배너" column>
        <Carousel w={420} aria-label="배너">
          <Flex>
            <Carousel.Prev />
            <Carousel.Container>
              {["첫째", "둘째", "셋째"].map((t) => <Carousel.Item key={t}><Box h={120} p={6} style={{ background: "var(--ec-bg-info)" }}>{t} 장</Box></Carousel.Item>)}
            </Carousel.Container>
            <Carousel.Next />
          </Flex>
          <Carousel.Indicators />
        </Carousel>
      </Block>

      <Block title="기능 안내 말풍선">
        <FeaturePopover defaultVisible placement="right">
          <FeaturePopover.Trigger><Button>새 기능</Button><FeaturePopover.Spot /></FeaturePopover.Trigger>
          <FeaturePopover.Popper closeIcon wMax={260}>새로 생긴 기능을 알리는 말풍선입니다.</FeaturePopover.Popper>
        </FeaturePopover>
      </Block>

      <Block title="페이지 머리">
        <ProductHead><ProductHead.Row><ProductHeadTitle>거래처 관리</ProductHeadTitle></ProductHead.Row></ProductHead>
      </Block>

      <Block title="단계 창·전체 화면 창">
        <Button onClick={() => setWizard(true)}>단계 창 열기</Button>
        <Button onClick={() => setFull(true)}>전체 화면 창 열기</Button>
        <Wizard visible={wizard} step={step} onStepChange={setStep} onClose={() => setWizard(false)} w={640}>
          <Wizard.Sidebar title="등록 절차">
            <Wizard.Stepper step={1} onActive={() => setStep(1)}>기본 정보</Wizard.Stepper>
            <Wizard.Stepper step={2} onActive={() => setStep(2)}>담당자</Wizard.Stepper>
          </Wizard.Sidebar>
          <Wizard.Content>
            <Wizard.Step step={1}>기본 정보를 입력합니다.</Wizard.Step>
            <Wizard.Step step={2}>담당자를 입력합니다.</Wizard.Step>
          </Wizard.Content>
        </Wizard>
        <FullscreenModal visible={full} onClose={() => setFull(false)}>
          <FullscreenModal.Close />
          <FullscreenModal.Header title="전체 화면 창" />
          <FullscreenModal.Body><Box p={6}>넓은 작업 공간이 필요할 때 씁니다.</Box></FullscreenModal.Body>
        </FullscreenModal>
      </Block>

      <Block title="오류 페이지"><PageNotFound /></Block>

      <Block title="차트: 꺾은선 (색 1~3)" column><Chart.Line data={line} groupKey="x" plotWidth={640} plotHeight={220} aria-label="꺾은선 차트" /></Block>
      <Block title="차트: 막대" column><Chart.Bar data={bars} groupKey="분기" plotWidth={640} plotHeight={220} aria-label="막대 차트" /></Block>
      <Block title="차트: 도넛"><Chart.Donut data={{ 뉴스: 52, 보고서: 24, 통계: 12, 기타: 12 }} plotWidth={220} plotHeight={220} aria-label="도넛 차트" /></Block>
      <Block title="차트: 계열 12개 (색 1~12)" column><Chart.Line data={many} groupKey="x" plotWidth={640} plotHeight={240} aria-label="계열이 많은 차트" /></Block>
      <Block title="작은 차트"><MiniChart.TrendLine data={[3, 5, 4, 7, 6, 9, 8]} w={120} h={32} aria-label="추세" /></Block>
    </>
  );
}

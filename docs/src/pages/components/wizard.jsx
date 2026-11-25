import React from "react";
import { Wizard, Button, Input, Select, Flex, Text } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Wizard" };

const steps = ["기본 정보", "담당자", "확인"];

function PartnerWizard() {
  const [visible, setVisible] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const close = () => setVisible(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>거래처 등록 시작</Button>
      <Wizard visible={visible} step={step} onClose={close} w={720} aria-label="거래처 등록">
        <Wizard.Sidebar title="거래처 등록">
          <Wizard.Stepper step={1} onActive={() => setStep(1)} completed={step > 1}>
            {steps[0]}
          </Wizard.Stepper>
          <Wizard.Stepper step={2} onActive={() => setStep(2)} completed={step > 2}>
            {steps[1]}
            <Text tag="div" size={100} fontWeight={400} mt={1}>선택</Text>
          </Wizard.Stepper>
          <Wizard.Stepper step={3} onActive={() => setStep(3)} disabled={step < 2}>
            {steps[2]}
          </Wizard.Stepper>
        </Wizard.Sidebar>
        <Wizard.Content tag={Flex} direction="column" justifyContent="space-between">
          <Wizard.Step step={1}>
            <Wizard.StepTitle>기본 정보</Wizard.StepTitle>
            <Flex direction="column" gap={2}>
              <Text size={300}>거래처 이름</Text>
              <Input size="l"><Input.Value placeholder="거래처 이름 입력" aria-label="거래처 이름" /></Input>
              <Text size={300} mt={2}>거래 구분</Text>
              <Select size="l" placeholder="거래 구분 선택" options={[{ value: "buy", children: "매입" }, { value: "sell", children: "매출" }]} />
            </Flex>
          </Wizard.Step>
          <Wizard.Step step={2}>
            <Wizard.StepTitle>담당자</Wizard.StepTitle>
            <Flex direction="column" gap={2}>
              <Text size={300}>담당자 이름</Text>
              <Input size="l"><Input.Value placeholder="담당자 이름 입력" aria-label="담당자 이름" /></Input>
            </Flex>
          </Wizard.Step>
          <Wizard.Step step={3}>
            <Wizard.StepTitle>확인</Wizard.StepTitle>
            <Text size={300}>입력한 내용을 확인한 뒤 등록해 주세요.</Text>
          </Wizard.Step>
          <Flex mt={6} gap={3}>
            {step > 1 ? <Wizard.StepBack size="l" stepName={steps[step - 2]} onActive={() => setStep(step - 1)} /> : null}
            {step < 3 ? <Wizard.StepNext size="l" ml="auto" stepName={steps[step]} onActive={() => setStep(step + 1)} /> : null}
            {step === 3 ? <Button size="l" ml="auto" use="primary" theme="info" onClick={close}>거래처 등록</Button> : null}
          </Flex>
        </Wizard.Content>
      </Wizard>
    </>
  );
}

export default function WizardPage() {
  return (
    <Page meta={meta} lead="큰 작업 하나를 정해진 순서의 단계로 나누어 차례로 끝내게 하는 창입니다. 왼쪽에 단계 목록, 오른쪽에 지금 단계의 내용이 놓입니다.">
      <Section title="언제 쓰는가">
        <Rules
          items={[
            "더 줄일 수 없는 큰 작업을 단계로 나눠 한 번에 한 부분에만 집중하게 할 때 씁니다.",
            "정해진 순서를 지켜야 하는 작업에 씁니다. 빠뜨리는 단계가 없어지고 실수가 줄어듭니다.",
            "단계가 셋에서 다섯일 때 알맞습니다.",
            "단계가 둘뿐이면 Modal이나 한 화면의 폼으로 충분합니다. 열을 넘으면 작업 자체를 나누거나 별도 화면으로 만듭니다.",
            "같은 종류의 작업(등록, 초기 설정)은 시스템 전체에서 같은 방식으로 Wizard를 씁니다.",
          ]}
        />
        <Sub title="쓰지 않는 경우">
          <Rules
            items={[
              "기능을 알려 주고 익히게 하는 용도로 쓰지 않습니다. Wizard는 작업을 끝내게 하는 요소입니다. 안내에는 FeaturePopover, DescriptionTooltip, 도움말 문서를 씁니다.",
              "능숙한 사용자가 순서 없이 빠르게 처리하는 작업에는 쓰지 않습니다. 정해진 단계가 오히려 걸림돌이 됩니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="구성">
        <Demo caption="눌러서 엽니다">
          <PartnerWizard />
        </Demo>
        <Table
          head={["부품", "역할"]}
          rows={[
            [<Code>Wizard</Code>, <>창 전체입니다. <Code>step</Code>에 지금 단계의 번호를 넘깁니다.</>],
            [<Code>Wizard.Sidebar</Code>, <>왼쪽의 단계 목록입니다. <Code>title</Code>에 작업의 이름을 적습니다.</>],
            [<Code>Wizard.Stepper</Code>, "단계 목록의 한 줄입니다. 번호와 이름이 나옵니다."],
            [<Code>Wizard.Content</Code>, "오른쪽의 내용 영역입니다."],
            [<Code>Wizard.Step</Code>, <>단계 하나의 내용입니다. <Code>step</Code>이 지금 단계와 같을 때만 보입니다.</>],
            [<Code>Wizard.StepTitle</Code>, "단계 내용의 제목입니다."],
            [<Code>Wizard.StepBack</Code>, <>앞 단계로 돌아가는 버튼입니다. <Code>stepName</Code>에 돌아갈 단계의 이름을 넘깁니다.</>],
            [<Code>Wizard.StepNext</Code>, <>다음 단계로 가는 버튼입니다. <Code>stepName</Code>에 다음 단계의 이름을 넘깁니다.</>],
          ]}
        />
      </Section>

      <Section title="크기">
        <Rules
          items={[
            "창은 최대 폭 980px, 최대 높이 700px입니다. 내용이 적으면 그보다 작게 씁니다.",
            "창은 보이는 화면의 가운데에 둡니다. 창 바깥으로 사방 40px의 여백을 남깁니다.",
            "화면 폭이 1,060px보다 좁아지면 단계 목록이 44px 폭으로 접히고 번호만 남습니다. 번호에 마우스를 올리면 단계 이름이 나옵니다.",
          ]}
        />
      </Section>

      <Section title="단계 목록의 상태">
        <Table
          head={["상태", "모양과 뜻"]}
          rows={[
            ["기본", "아직 하지 않은 단계입니다. 번호와 이름이 나옵니다."],
            ["마우스 올림", "바탕이 조금 밝아집니다. 누르면 그 단계로 갑니다."],
            ["지금 단계", "바탕이 채워져 눈에 띕니다."],
            ["완료", <>번호 자리에 확인 표시가 나옵니다. <Code>completed</Code>를 줍니다.</>],
            ["비활성", <>아직 갈 수 없는 단계입니다. 흐리게 보이고 눌리지 않습니다. <Code>disabled</Code>를 줍니다.</>],
          ]}
        />
        <Sub title="건너뛸 수 있는 단계">
          <P>꼭 하지 않아도 되는 단계는 이름 아래에 "선택"이라고 작게 적습니다. 굵기 400, 위 여백 4px입니다. 위 예시의 "담당자" 단계가 그 모양입니다.</P>
        </Sub>
      </Section>

      <Section title="아래 버튼 줄">
        <Rules
          items={[
            "버튼은 L 크기를 씁니다.",
            "버튼 사이 간격은 12px, 내용과 버튼 줄 사이는 24px입니다.",
            "돌아가는 버튼(StepBack)은 왼쪽, 넘어가는 버튼(StepNext)은 오른쪽 끝에 둡니다. 첫 단계에는 돌아가는 버튼을 두지 않습니다.",
            "두 버튼에는 화살표와 함께 옮겨 갈 단계의 이름이 나옵니다. 어디로 가는지 누르기 전에 알 수 있습니다.",
            "마지막 단계의 주요 버튼에는 \"거래처 등록\"처럼 작업을 끝내는 동작을 적습니다. \"완료\"만 적지 않습니다.",
            "주요 버튼은 단계마다 하나만 둡니다.",
          ]}
        />
      </Section>

      <Section title="놓는 자리와 스크롤">
        <Rules
          items={[
            "창 안팎의 스크롤, 내용의 일반 규칙은 Modal과 같습니다.",
            "내용이 길면 내용 영역 안에서만 스크롤됩니다. 단계 목록과 버튼 줄은 제자리에 둡니다.",
            "설정 화면처럼 드문 경우에는 창을 띄우지 않고 페이지의 내용 영역에 단계를 그대로 둘 수 있습니다.",
          ]}
        />
      </Section>

      <Section title="키보드">
        <Rules
          items={[
            "창이 열리면 초점이 창 안으로 옮겨 갑니다.",
            "Tab으로 창 안의 컨트롤을 차례로 옮겨 다닙니다. 초점은 창 밖으로 나가지 않습니다.",
            "Esc로 창을 닫습니다.",
            "창이 닫히면 초점은 창을 연 요소로 돌아갑니다.",
          ]}
        />
      </Section>

      <Section title="폼을 담을 때">
        <Table
          head={["경우", "처리"]}
          rows={[
            ["입력값 검사", "다음 단계로 넘어가려 할 때 그 단계의 잘못된 입력창을 모두 오류 상태로 바꾸고, 첫 번째 잘못된 입력창에 초점을 둡니다."],
            ["서버 오류", "제출하다 서버에서 오류가 나면 폼 위에 오류 문구를 보여 줍니다."],
            ["컨트롤 크기", "한 폼 안의 입력창과 컨트롤은 모두 같은 크기를 씁니다."],
            ["넣은 값 보존", "제출하지 않고 창을 닫아도 넣은 값을 지우지 않습니다. 다시 열면 이어서 쓸 수 있게 합니다."],
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "단계 이름은 \"기본 정보\", \"담당자\"처럼 한두 낱말의 명사로 적습니다.",
            "단계 목록의 제목에는 작업의 이름을 적습니다(\"거래처 등록\").",
            "단계 이름은 단계 목록, 내용 제목, 이전·다음 버튼에서 모두 같은 말로 씁니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "거래처 등록처럼 순서가 정해진 세 단계에서 다섯 단계의 작업에 씁니다." }}
          bad={{ text: "\"삭제할까요?\"처럼 한 번에 끝나는 확인이나 두 단계짜리 폼에 쓰지 않습니다. Modal을 씁니다." }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["상황", "쓸 것"]}
          rows={[
            ["순서가 있는 세 단계 이상의 작업", "Wizard"],
            ["한 번에 끝나는 확인이나 짧은 폼", "Modal"],
            ["화면 전체가 필요한 긴 편집", "FullscreenModal"],
            ["화면을 보면서 하는 딸린 작업", "SidePanel"],
          ]}
        />
      </Section>
    </Page>
  );
}

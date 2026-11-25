import React from "react";
import { Radio, RadioGroup, Link, DescriptionTooltip, ButtonLink, Tooltip, Flex } from "@ec21rnc/ui";
import InfoM from "@semcore/icon/Info/m";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Radio" };

function Group({ size = "m", name, direction = "column", gap, options = ["메일로 받기", "문자로 받기", "받지 않기"], ...rest }) {
  const [value, setValue] = React.useState(options[0]);
  return (
    <RadioGroup name={name} value={value} onChange={setValue} size={size} direction={direction} gap={gap ?? (size === "l" ? 4 : 3)} aria-label="승인 알림" {...rest}>
      {options.map((option) => (
        <Radio value={option} label={option} key={option} />
      ))}
    </RadioGroup>
  );
}

export default function RadioPage() {
  return (
    <Page meta={meta} lead="여러 보기 가운데 하나만 고르게 하는 조작 요소입니다. 지금 무엇이 골라져 있는지를 보여 주며, 주로 설정 목록에서 씁니다.">
      <Section title="구성">
        <Demo>
          <Group name="radio-basic" />
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>RadioGroup</Code>, <>보기 묶음입니다. <Code>name</Code>, <Code>value</Code>, <Code>onChange</Code>로 고른 값을 다룹니다. 크기와 비활성을 묶음 전체에 줄 수 있습니다.</>],
            [<Code>Radio</Code>, <>보기 하나입니다. <Code>value</Code>와 <Code>label</Code>만 주면 동그라미와 글자가 함께 나옵니다.</>],
            [<Code>Radio.Value</Code>, "동그라미입니다. 글자를 직접 짤 때 따로 적습니다."],
            [<Code>Radio.Text</Code>, "보기의 글자입니다. 안에 링크나 아이콘을 넣을 때 따로 적습니다."],
          ]}
        />
      </Section>

      <Section title="크기">
        <Demo>
          <Group name="radio-size-m" options={["M · 16px", "두 번째 보기"]} />
          <Group name="radio-size-l" size="l" options={["L · 20px", "두 번째 보기"]} />
        </Demo>
        <Table
          head={["크기", "동그라미", "글자"]}
          rows={[
            ["M (기본)", "16 × 16px", <>14px (<Code>--ec-fs-200</Code>, <Code>--ec-lh-200</Code>)</>],
            ["L", "20 × 20px", <>16px (<Code>--ec-fs-300</Code>, <Code>--ec-lh-300</Code>)</>],
          ]}
        />
        <Rules
          items={[
            "글자는 언제나 동그라미의 오른쪽에 둡니다.",
            "같은 폼의 다른 입력 요소와 같은 크기를 씁니다.",
          ]}
        />
      </Section>

      <Section title="여백">
        <Rules
          items={[
            "보기 사이 간격은 쓰는 자리에 따라 달라질 수 있습니다. 어느 경우든 4px의 배수로 맞춥니다.",
            "세로로 늘어놓을 때의 기본 간격은 M에서 12px, L에서 16px입니다.",
            "가로로 늘어놓을 때는 어느 글자가 어느 동그라미의 것인지 헷갈리지 않게 더 넓게 띄웁니다.",
          ]}
        />
      </Section>

      <Section title="글자와 함께 쓰는 모양">
        <Sub title="긴 설명이 붙은 보기">
          <Demo>
            <RadioGroup name="radio-paragraph" defaultValue="all" direction="column" gap={3} aria-label="열람 범위">
              <Radio value="all">
                <Radio.Value />
                <Radio.Text>
                  부서 전체에 공개합니다. 같은 부서 사람이면 누구나 문서를 열어 볼 수 있고, 승인 내역도 함께 보입니다.
                </Radio.Text>
              </Radio>
              <Radio value="me">
                <Radio.Value />
                <Radio.Text>담당자만 봅니다.</Radio.Text>
              </Radio>
            </RadioGroup>
          </Demo>
          <P>글이 여러 줄이어도 됩니다. 동그라미는 첫 줄에 맞춰 놓입니다. M에는 14px 문단, L에는 16px 문단을 씁니다.</P>
        </Sub>
        <Sub title="정보 아이콘이 붙은 보기">
          <Demo>
            <RadioGroup name="radio-info" defaultValue="auto" direction="column" gap={3} aria-label="승인 방식">
              <Flex alignItems="center">
                <Radio value="auto" label="자동 승인" />
                <DescriptionTooltip>
                  <DescriptionTooltip.Trigger tag={ButtonLink} use="secondary" addonLeft={InfoM} aria-label="자동 승인 설명" ml={1} />
                  <DescriptionTooltip.Popper aria-label="자동 승인 설명">
                    1,000,000원 이하 문서는 올리는 즉시 승인됩니다.
                  </DescriptionTooltip.Popper>
                </DescriptionTooltip>
              </Flex>
              <Radio value="manual" label="직접 승인" />
            </RadioGroup>
          </Demo>
          <Rules
            items={[
              "보기의 뜻을 더 알려야 하면 글자 옆에 정보 아이콘을 둡니다. 누르면 설명이 열립니다.",
              "아이콘은 글자와 4px 띄웁니다.",
              "아이콘은 보기의 누르는 영역 밖에 둡니다. 아이콘을 눌러도 보기가 골라지지 않아야 합니다.",
            ]}
          />
        </Sub>
        <Sub title="링크가 든 보기">
          <Demo>
            <RadioGroup name="radio-link" defaultValue="agree" direction="column" gap={3} aria-label="규칙 동의">
              <Radio value="agree">
                <Radio.Value />
                <Radio.Text>
                  <Link href="#radio">승인 규칙</Link>에 따라 처리합니다
                </Radio.Text>
              </Radio>
              <Radio value="later" label="나중에 정합니다" />
            </RadioGroup>
          </Demo>
          <P>글자 안에 Link를 넣을 수 있습니다. 링크를 누르면 링크만 열리고 보기는 골라지지 않아야 합니다.</P>
        </Sub>
      </Section>

      <Section title="상태">
        <Demo>
          <Radio label="기본" />
          <Radio label="고름" checked />
          <Radio label="잘못됨" state="invalid" />
          <Tooltip title="관리자만 바꿀 수 있습니다">
            <Radio label="비활성" disabled />
          </Tooltip>
          <Radio label="고른 채 비활성" checked disabled />
        </Demo>
        <Rules
          items={[
            "꼭 골라야 하는데 고르지 않았으면 묶음의 모든 보기를 잘못됨으로 표시하고, 무엇을 해야 하는지 글로 적습니다.",
            "비활성일 때는 동그라미뿐 아니라 글자와 딸린 말도 함께 흐리게 합니다.",
            "왜 고를 수 없는지 설명 풍선으로 알려 줍니다.",
            "키보드로 선택하면 파란 초점 테두리가 나옵니다. 이 표시를 없애지 않습니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "동그라미와 글자를 합친 영역 전체에서 커서가 손가락 모양으로 바뀝니다.",
            "그 영역 어디를 눌러도 보기가 골라집니다. 동그라미만 눌리게 하지 않습니다.",
            "글자 안에 링크나 링크 모양 버튼이 있으면 그 부분을 눌렀을 때는 보기의 상태가 바뀌지 않습니다.",
            "한 묶음에서는 하나만 골라집니다. 다른 보기를 고르면 앞서 고른 것이 풀립니다.",
            "키보드에서는 Tab으로 묶음에 들어가고 화살표 키로 보기를 옮겨 갑니다.",
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "보기 이름은 긍정문으로 씁니다. 골랐을 때 무슨 일이 일어나는지 분명해야 합니다(\"메일로 받기\").",
            "\"받지 않지 않기\"처럼 부정을 겹쳐 쓰지 않습니다.",
            "한 묶음의 보기는 같은 꼴의 말로 맞춥니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: <Group name="radio-good" />,
            text: "보기는 세로로, 왼쪽에 맞춰, 한 줄에 하나씩 놓습니다.",
          }}
          bad={{
            demo: <Group name="radio-bad" direction="row" gap={1} />,
            text: "가로로 좁게 붙여 놓지 않습니다. 가로로 놓아야 하면 보기 사이를 넉넉히 띄웁니다.",
          }}
        />
        <Rules
          items={[
            "서로 겹칠 수 없는 보기 가운데 꼭 하나를 골라야 할 때만 씁니다.",
            "가장 흔한 쓰임은 설정 목록입니다.",
            "필터에서는 Radio 대신 Pills를 씁니다.",
          ]}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Rules
          items={[
            "여러 개를 함께 고를 수 있으면 Checkbox를 씁니다.",
            "켜고 끄는 값 하나이고 바로 적용되면 Switch를 씁니다.",
            "보기가 많아 자리를 많이 차지하면 Select를 씁니다.",
            "보기마다 설명과 그림을 곁들여 크게 보여 주려면 RadioCards를 씁니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

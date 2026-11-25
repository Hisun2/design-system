import React from "react";
import { Checkbox, Tooltip, ButtonLink, Link, Flex, Box, Text } from "@ec21rnc/ui";
import InfoM from "@semcore/icon/Info/m";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Checkbox" };

const managers = ["영업 담당자", "구매 담당자", "회계 담당자"];

function Tree() {
  const [checked, setChecked] = React.useState([true, false, false]);
  const all = checked.every(Boolean);
  const some = checked.some(Boolean);
  return (
    <Flex direction="column" gap={3}>
      <ButtonLink onClick={() => setChecked(checked.map(() => !all))}>{all ? "모두 해제" : "모두 선택"}</ButtonLink>
      <Checkbox
        label="알림 받을 담당자"
        checked={all}
        indeterminate={some && !all}
        onChange={(value) => setChecked(checked.map(() => value))}
      />
      <Flex direction="column" gap={3} ml={6}>
        {managers.map((name, i) => (
          <Checkbox
            key={name}
            label={name}
            checked={checked[i]}
            onChange={(value) => setChecked(checked.map((c, j) => (j === i ? value : c)))}
          />
        ))}
      </Flex>
    </Flex>
  );
}

export default function CheckboxPage() {
  return (
    <Page meta={meta} lead="여러 항목 가운데 원하는 만큼 고르거나, 한 가지 설정을 켜고 끄는 요소입니다. 고른 상태인지 아닌지를 보여 줍니다.">
      <Section title="구성">
        <Demo>
          <Checkbox label="승인 요청을 메일로 받기" defaultChecked />
          <Checkbox>
            <Checkbox.Value />
            <Checkbox.Text>문서 원본 함께 보내기</Checkbox.Text>
          </Checkbox>
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>Checkbox</Code>, "네모와 글자를 묶는 바깥 틀입니다. 글자만 있으면 label로 한 번에 씁니다."],
            [<Code>Checkbox.Value</Code>, "표시가 들어가는 네모입니다."],
            [<Code>Checkbox.Text</Code>, "이름표 글자입니다. 언제나 네모의 오른쪽에 둡니다."],
          ]}
        />
      </Section>

      <Section title="크기">
        <Demo>
          <Checkbox size="m" label="M · 16px" defaultChecked />
          <Checkbox size="l" label="L · 20px" defaultChecked />
        </Demo>
        <Table
          head={["크기", "네모", "글자", "네모와 글자 사이", "항목 사이"]}
          rows={[
            ["M (기본)", "16 × 16px", "200 (14px)", "8px", "세로 12px, 가로 16px"],
            ["L", "20 × 20px", "300 (16px)", "8px", "세로 16px, 가로 24px"],
          ]}
        />
        <Rules
          items={[
            "항목 사이 간격은 놓이는 자리에 따라 달라질 수 있습니다. 4px의 배수는 지킵니다.",
            "함께 놓인 입력창, 버튼과 크기를 맞춥니다. M 컨트롤 옆에는 M을 씁니다.",
          ]}
        />
      </Section>

      <Section title="글이 긴 경우">
        <Demo column>
          <Box w={360}>
            <Checkbox>
              <Checkbox.Value />
              <Checkbox.Text>
                승인이 끝나면 거래처 담당자에게 결과를 알립니다. 반려한 경우에는 반려 사유도 함께 보냅니다.
              </Checkbox.Text>
            </Checkbox>
          </Box>
        </Demo>
        <P>글이 여러 줄이어도 네모는 첫 줄에 맞춥니다. M에는 14px 문단, L에는 16px 문단을 씁니다.</P>
      </Section>

      <Section title="덧붙이는 요소">
        <Sub title="정보 아이콘">
          <Demo>
            <Flex alignItems="center">
              <Checkbox label="자동 승인" />
              <Tooltip title="금액이 기준보다 적은 문서는 담당자 확인 없이 승인합니다.">
                <ButtonLink use="secondary" addonLeft={InfoM} aria-label="자동 승인 설명" ml={1} />
              </Tooltip>
            </Flex>
          </Demo>
          <P>설정의 뜻을 더 알려야 하면 이름표 뒤에 정보 아이콘을 붙입니다. 이름표와 아이콘 사이는 4px입니다.</P>
        </Sub>
        <Sub title="글자 안의 링크">
          <Demo>
            <Checkbox>
              <Checkbox.Value />
              <Checkbox.Text>
                <Link href="#" onClick={(e) => e.stopPropagation()}>문서 보관 규정</Link>을 확인했습니다
              </Checkbox.Text>
            </Checkbox>
          </Demo>
          <P>이름표 안에 링크를 넣을 수 있습니다. 링크를 누르면 링크만 열리고 체크 상태는 바뀌지 않아야 합니다.</P>
        </Sub>
      </Section>

      <Section title="상태">
        <Demo>
          <Checkbox label="고르지 않음" />
          <Checkbox label="고름" defaultChecked />
          <Checkbox label="일부만 고름" indeterminate />
          <Checkbox label="잘못됨" state="invalid" />
          <Checkbox label="비활성" disabled />
          <Checkbox label="비활성 · 고름" disabled defaultChecked />
        </Demo>
        <Rules
          items={[
            "비활성일 때는 네모와 이름표가 함께 흐려집니다.",
            "왜 고를 수 없는지 설명 풍선으로 알립니다.",
            "잘못됨 상태는 색만으로 알리지 않습니다. 무엇을 해야 하는지 글로 함께 적습니다.",
          ]}
        />
      </Section>

      <Section title="묶음과 모두 선택">
        <Demo column>
          <Tree />
        </Demo>
        <Rules
          items={[
            "항목이 여섯 개를 넘으면 \"모두 선택\"을 둡니다.",
            "\"모두 선택\"을 누르면 모든 단계의 항목이 선택되고, 글자가 \"모두 해제\"로 바뀝니다.",
            "\"모두 해제\"를 누르면 모든 단계의 항목이 풀립니다.",
            "어느 단계에서든 하나라도 풀리면 \"모두 해제\"는 다시 \"모두 선택\"으로 바뀝니다.",
          ]}
        />
        <Sub title="위아래 단계가 있을 때">
          <Rules
            items={[
              "위 단계의 체크박스는 세 가지 상태를 가집니다: 고르지 않음, 고름, 일부만 고름.",
              "아래 항목 가운데 일부만 골랐으면 위 단계는 \"일부만 고름\"이 됩니다.",
              "\"일부만 고름\" 상태인 위 단계를 누르면 아래 항목이 모두 선택됩니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="동작">
        <Rules
          items={[
            "네모와 글자 어디에 마우스를 올려도 손 모양 커서가 됩니다.",
            "네모와 글자 어디를 눌러도 상태가 바뀝니다.",
            "글자 안의 링크를 누를 때는 상태가 바뀌지 않습니다.",
            "표에서 줄을 고르는 체크박스는 네모가 든 칸 전체를 눌러도 선택되게 합니다.",
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "켜면 무엇이 일어나는지 긍정문으로 씁니다. 예: \"승인 결과를 메일로 받기\"",
            "\"메일을 받지 않기\"처럼 부정문으로 쓰지 않습니다. 하지 않으려고 체크해야 하는 꼴이 되어 헷갈립니다.",
            "이름표 끝에 쌍점(:)이나 마침표를 붙이지 않습니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{
            demo: (
              <Flex direction="column" gap={3}>
                <Checkbox label="거래처" defaultChecked />
                <Checkbox label="문서" />
                <Checkbox label="담당자" />
              </Flex>
            ),
            text: "한 줄에 하나씩 세로로, 왼쪽에 맞춰 놓습니다.",
          }}
          bad={{
            demo: (
              <Flex gap={1}>
                <Checkbox label="거래처" defaultChecked />
                <Checkbox label="문서" />
                <Checkbox label="담당자" />
              </Flex>
            ),
            text: "가로로 놓을 때 간격을 좁히지 않습니다. 어느 네모가 어느 글자의 것인지 구분할 수 있어야 합니다.",
          }}
        />
        <Rules
          items={[
            "설정을 바꾸는 데만 씁니다. 누르자마자 무언가를 실행하는 버튼처럼 쓰지 않습니다.",
            "체크박스는 저장이나 적용을 눌러야 반영되는 설정에 씁니다. 사용자가 고른 것을 다시 확인할 수 있습니다.",
          ]}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["컴포넌트", "쓰임"]}
          rows={[
            ["Checkbox", "여러 개를 고를 때. 저장·적용을 눌러야 반영되는 설정."],
            ["Radio", "여럿 가운데 하나만 고를 때. 둘 중 하나를 고르는 설정에도 씁니다."],
            ["Switch", "켜고 끄는 즉시 반영되는 설정."],
            ["Select (여러 개 선택)", "필터처럼 자리가 좁고 항목이 많을 때."],
          ]}
        />
      </Section>
    </Page>
  );
}

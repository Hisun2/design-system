import React from "react";
import { BulkTextarea, Text, Flex, Box } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "BulkTextarea" };

const checkNumber = (line) => {
  const ok = /^\d{3}-\d{2}-\d{5}$/.test(line.trim());
  return { isValid: ok, errorMessage: ok ? "" : "사업자 번호는 000-00-00000 꼴로 적습니다." };
};

/** BulkTextarea는 브라우저에서만 그릴 수 있어, 화면에 올라온 뒤에 그립니다. */
function Mounted({ children }) {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => setReady(true), []);
  return ready ? children : null;
}

function Sample({ size, maxLines = 100, validateOn, lineValidation, placeholder = "한 줄에 하나씩 입력합니다", label = "거래처 이름" }) {
  return (
    <Mounted>
    <Box w={360}>
      <BulkTextarea size={size} maxLines={maxLines} validateOn={validateOn} lineValidation={lineValidation} placeholder={placeholder}>
        <Flex alignItems="center" gap={2} mb={2}>
          <Text size={size === "l" ? 300 : 200}>{label}</Text>
          <BulkTextarea.Counter />
        </Flex>
        <BulkTextarea.InputField aria-label={label} />
        <Flex justifyContent="space-between" alignItems="center" mt={2}>
          <BulkTextarea.ErrorsNavigation />
          <BulkTextarea.ClearAll />
        </Flex>
      </BulkTextarea>
    </Box>
    </Mounted>
  );
}

export default function BulkTextareaPage() {
  return (
    <Page meta={meta} lead="여러 값을 한 줄에 하나씩 적어 한꺼번에 넣는 여러 줄 입력창입니다. 거래처 이름, 사업자 번호, 메일 주소처럼 같은 꼴의 값을 여러 건 등록할 때 씁니다.">
      <Section title="무엇을 하는가">
        <Rules
          items={[
            "직접 칠 때는 Enter나 쉼표를 누르면 다음 줄로 넘어갑니다.",
            "쉼표로 이어진 목록을 붙여 넣으면 값마다 한 줄로 나뉩니다.",
            "어떤 글자에서 줄을 나눌지 따로 정할 수 있습니다.",
            "줄마다, 그리고 입력창 전체를 검사할 수 있습니다.",
          ]}
        />
      </Section>

      <Section title="구성">
        <Demo column>
          <Sample />
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>BulkTextarea.InputField</Code>, "값을 적는 입력창입니다. 줄마다 번호가 붙습니다."],
            [<Code>BulkTextarea.Counter</Code>, "적은 값의 수와 한도를 보여 줍니다."],
            [<Code>BulkTextarea.ErrorsNavigation</Code>, "잘못된 줄 사이를 오가는 버튼과 잘못된 줄의 수입니다. 검사한 뒤 잘못된 줄이 있을 때만 나옵니다."],
            [<Code>BulkTextarea.ClearAll</Code>, "적은 것을 모두 지우는 버튼입니다."],
          ]}
        />
        <P>한 줄의 잘못된 내용은 그 줄에 붙는 설명 풍선으로 보여 줍니다.</P>
      </Section>

      <Section title="크기">
        <Demo caption="M (기본)" column>
          <Sample />
        </Demo>
        <Demo caption="L" column>
          <Sample size="l" />
        </Demo>
        <Table
          head={["크기", "글자", "함께 쓰는 Counter"]}
          rows={[
            ["M (기본)", "200 (14px)", "한 단계 큰 것"],
            ["L", "300 (16px)", "가장 큰 것"],
          ]}
        />
        <Sub title="폭과 높이">
          <Rules
            items={[
              "폭은 160~200px보다 좁게 만들지 않습니다.",
              "높이는 서너 줄보다 낮게 만들지 않습니다. 많은 값을 좁은 창에서 다루기는 어렵습니다.",
              <>보이는 줄 수는 <Code>minRows</Code>와 <Code>maxRows</Code>로 정합니다. 기본은 2줄에서 10줄까지 늘어나고, 그 뒤로는 창 안에서 스크롤합니다.</>,
            ]}
          />
        </Sub>
      </Section>

      <Section title="줄">
        <Rules
          items={[
            "줄마다 왼쪽에 번호가 붙습니다.",
            "검사를 통과하지 못한 줄은 오른쪽에 경고 아이콘이 붙습니다.",
            "한도를 넘어선 줄은 바탕색으로 표시합니다.",
          ]}
        />
      </Section>

      <Section title="개수 표시">
        <Demo caption="한도 5줄 — 줄을 채워 가며 색이 바뀌는 것을 확인합니다" column>
          <Sample maxLines={5} />
        </Demo>
        <Rules
          items={[
            "개수 표시는 언제나 이름표 옆에 둡니다.",
            "줄에 글자를 하나라도 치면 그 줄을 셉니다. 글자와 줄을 지우면 다시 줄어듭니다.",
            "빈 줄에서 Enter나 쉼표를 눌러도 다음 줄로 넘어가지 않습니다. 쓸데없는 빈 줄이 생기지 않습니다.",
            "같은 값이 두 번 있어도 따로 셉니다.",
          ]}
        />
        <Table
          head={["상황", "개수 표시의 색", "줄"]}
          rows={[
            ["한도보다 적음", "기본", "그대로"],
            ["한도에 다다름", "주황 (warning)", "그대로"],
            ["한도를 넘음", "빨강 (danger)", "넘어선 줄에 바탕색"],
          ]}
        />
      </Section>

      <Section title="컨트롤">
        <P>아래 컨트롤은 기본 자리가 있지만, 화면에 맞게 다른 곳에 놓아도 됩니다.</P>
        <Sub title="모두 지우기">
          <Rules
            items={[
              "글자를 하나라도 치면 나타납니다.",
              "기본 자리는 입력창의 오른쪽 아래입니다.",
            ]}
          />
        </Sub>
        <Sub title="잘못된 줄 오가기">
          <Demo caption="아무 글자나 적고 입력창 밖을 누르면 검사합니다" column>
            <Sample label="사업자 번호" placeholder="000-00-00000" lineValidation={checkNumber} />
          </Demo>
          <Rules
            items={[
              "검사가 끝난 뒤 잘못된 줄이 있으면 나타납니다. 버튼 옆에 잘못된 줄의 수를 적습니다.",
              "버튼을 누르면 커서가 앞이나 뒤의 잘못된 줄로 옮겨 갑니다. 그 줄의 값 전체가 선택되어 바로 지우거나 고칠 수 있습니다.",
              "버튼, 키보드, 마우스로 잘못된 줄에 들어가면 옆 글자가 \"몇째 / 모두 몇 줄\"로 바뀝니다.",
              "잘못된 줄에서 올바른 줄로 옮겨 가면 그 숫자는 그대로 둡니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="상태">
        <Demo column>
          <Mounted>
          <Box w={360}>
            <BulkTextarea disabled placeholder="비활성">
              <BulkTextarea.InputField aria-label="비활성 예시" />
            </BulkTextarea>
          </Box>
          <Box w={360}>
            <BulkTextarea state="invalid" placeholder="잘못됨">
              <BulkTextarea.InputField aria-label="잘못됨 예시" />
            </BulkTextarea>
          </Box>
          </Mounted>
        </Demo>
        <P>기본, 선택(포커스), 잘못됨, 올바름, 읽기 전용, 비활성 상태는 Textarea와 모양이 같습니다.</P>
      </Section>

      <Section title="검사">
        <Table
          head={["validateOn", "검사하는 때"]}
          rows={[
            [<Code>blur</Code>, "입력창 밖으로 나갈 때. 기본값입니다."],
            [<Code>blurLine</Code>, "한 줄을 떠날 때마다."],
            [<Code>paste</Code>, "붙여 넣을 때."],
            ["(직접 처리)", "제출 버튼을 누를 때 검사하려면 errors와 showErrors를 화면에서 직접 넘깁니다."],
          ]}
        />
        <Rules
          items={[
            <>줄 하나의 규칙은 <Code>lineValidation</Code>에 적습니다. 올바른지와 알릴 글을 돌려줍니다.</>,
            "잘못된 값이 있으면 입력창 전체에 설명 풍선을 보여 주거나, 마우스를 올린 줄·커서가 있는 줄에 그 줄의 설명 풍선을 보여 줍니다.",
            "알리는 글은 무엇이 잘못됐고 어떻게 고치는지 적습니다. 예: \"사업자 번호는 000-00-00000 꼴로 적습니다.\"",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "이름표에 무엇을 적는지 쓰고, 안내 글자에 \"한 줄에 하나씩\"처럼 적는 방법을 알립니다." }}
          bad={{ text: "값이 한두 개뿐인 자리에 쓰지 않습니다. 그럴 때는 Input이나 InputTags를 씁니다." }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["컴포넌트", "쓰임"]}
          rows={[
            ["BulkTextarea", "같은 꼴의 값을 여러 건, 줄마다 검사하며 넣을 때."],
            ["Textarea", "긴 글 한 편을 적을 때."],
            ["InputTags", "값이 몇 개뿐이고 한 줄 안에서 태그로 보여 줄 때."],
          ]}
        />
      </Section>
    </Page>
  );
}

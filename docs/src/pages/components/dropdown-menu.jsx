import React from "react";
import { DropdownMenu, Button, Badge, Switch, Divider, Text, Tooltip } from "@ec21rnc/ui";
import EditM from "@semcore/icon/Edit/m";
import CopyM from "@semcore/icon/Copy/m";
import TrashM from "@semcore/icon/Trash/m";
import UserM from "@semcore/icon/User/m";
import ChevronRightM from "@semcore/icon/ChevronRight/m";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "DropdownMenu" };

function Selectable() {
  const [value, setValue] = React.useState("list");
  const options = [
    { value: "list", label: "목록으로 보기" },
    { value: "board", label: "보드로 보기" },
    { value: "calendar", label: "달력으로 보기" },
  ];
  return (
    <DropdownMenu selectable>
      <DropdownMenu.Trigger tag={Button}>보기 방식</DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        {options.map((o) => (
          <DropdownMenu.Item key={o.value} selected={value === o.value} onClick={() => setValue(o.value)}>
            {o.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
}

function Multiselect() {
  const [value, setValue] = React.useState(["거래처", "담당자"]);
  const toggle = (name) => setValue(value.includes(name) ? value.filter((v) => v !== name) : [...value, name]);
  return (
    <DropdownMenu multiselect>
      <DropdownMenu.Trigger tag={Button}>표에 보일 열</DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        {["거래처", "문서 번호", "담당자", "승인 상태"].map((name) => (
          <DropdownMenu.Item key={name} selected={value.includes(name)} onClick={() => toggle(name)}>
            {name}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
}

export default function DropdownMenuPage() {
  return (
    <Page meta={meta} lead="누르면 동작이나 항목의 목록이 펼쳐지는 메뉴입니다. 항목 안에 또 다른 메뉴를 둘 수 있습니다.">
      <Section title="무엇을 하는가">
        <Demo caption="버튼을 눌러 엽니다">
          <DropdownMenu>
            <DropdownMenu.Trigger tag={Button}>문서 작업</DropdownMenu.Trigger>
            <DropdownMenu.Menu>
              <DropdownMenu.Item>수정</DropdownMenu.Item>
              <DropdownMenu.Item>복제</DropdownMenu.Item>
              <DropdownMenu.Item>삭제</DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
        </Demo>
        <P>
          DropdownMenu는 고른 항목을 누르는 요소에 보여 주지 않습니다. 고른 값을 누르는 요소에 보여 줘야 하면 Select를 씁니다.
        </P>
      </Section>

      <Section title="크기">
        <Demo>
          <DropdownMenu size="m">
            <DropdownMenu.Trigger tag={Button}>M</DropdownMenu.Trigger>
            <DropdownMenu.Menu>
              <DropdownMenu.Item>수정</DropdownMenu.Item>
              <DropdownMenu.Item>복제</DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
          <DropdownMenu size="l">
            <DropdownMenu.Trigger tag={Button} size="l">L</DropdownMenu.Trigger>
            <DropdownMenu.Menu>
              <DropdownMenu.Item>수정</DropdownMenu.Item>
              <DropdownMenu.Item>복제</DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
        </Demo>
        <Rules
          items={[
            "M이 기본입니다. 항목 글자는 200(14px)입니다.",
            "L은 항목 글자가 300(16px)입니다. L 크기 컨트롤에서 열 때 씁니다.",
            "누르는 요소와 메뉴의 크기를 맞춥니다.",
          ]}
        />
        <Sub title="폭">
          <Rules
            items={[
              "폭을 정하는 방법은 두 가지입니다. 누르는 요소의 폭에 맞추거나, 가장 긴 항목에 맞춥니다.",
              "동작 메뉴는 가장 긴 항목에 맞춥니다. 항목 글자가 잘리면 안 됩니다.",
            ]}
          />
        </Sub>
        <Sub title="높이">
          <Rules
            items={[
              "메뉴의 높이는 묶어 두지 않습니다. 사용자가 고를 수 있는 것을 모두 한눈에 봐야 합니다. 링크나 컨트롤이 든 메뉴는 더욱 그렇습니다.",
              "메뉴 안에서 스크롤하게 만들지 않습니다. 항목이 너무 많으면 묶음으로 나누거나 다른 화면으로 옮깁니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="위치">
        <P>메뉴는 언제나 누르는 요소의 아래로 열립니다. 아래에 자리가 모자라도 위로 뒤집지 않습니다. 키보드로 위아래를 오갈 때 방향이 뒤바뀌지 않게 하려는 것입니다.</P>
      </Section>

      <Section title="항목의 종류와 상태">
        <Table
          head={["종류", "쓰임", "주는 값"]}
          rows={[
            ["기본", "동작을 실행합니다. 고른 상태가 남지 않습니다.", "없음"],
            ["하나 고르기", "여럿 가운데 하나를 고릅니다. 고르면 메뉴가 닫힙니다.", <Code>selectable</Code>],
            ["여럿 고르기", "여러 개를 고릅니다. 항목마다 체크박스가 붙고, 골라도 메뉴가 닫히지 않습니다.", <Code>multiselect</Code>],
          ]}
        />
        <Sub title="기본 항목">
          <Demo>
            <DropdownMenu>
              <DropdownMenu.Trigger tag={Button}>문서 작업</DropdownMenu.Trigger>
              <DropdownMenu.Menu>
                <DropdownMenu.Item>수정</DropdownMenu.Item>
                <DropdownMenu.Item disabled>승인 취소</DropdownMenu.Item>
              </DropdownMenu.Menu>
            </DropdownMenu>
          </Demo>
          <Table
            head={["상태", "모양"]}
            rows={[
              ["기본", "바탕 없음"],
              ["마우스를 올림", <>옅은 회색 바탕(<Code>--ec-overlay-hover</Code>)</>],
              ["비활성", "흐리게 보이고 눌리지 않습니다."],
            ]}
          />
        </Sub>
        <Sub title="하나 고르기">
          <Demo>
            <Selectable />
          </Demo>
          <Table
            head={["상태", "모양"]}
            rows={[
              ["고름", <>옅은 파란 바탕(<Code>--ec-bg-selected</Code>)과 왼쪽의 파란 줄(<Code>--ec-control-primary-info</Code>)</>],
              ["고름 + 마우스를 올림", <>바탕은 <Code>--ec-bg-selected</Code> 그대로</>],
            ]}
          />
          <P>기본·마우스를 올림·비활성 상태는 기본 항목과 같습니다.</P>
        </Sub>
        <Sub title="여럿 고르기">
          <Demo>
            <Multiselect />
          </Demo>
          <Rules
            items={[
              "항목 앞의 체크박스가 고른 상태를 알립니다.",
              "고른 항목과 고르지 않은 항목의 바탕과 테두리는 같습니다. 고른 항목에 바탕색을 칠하지 않습니다.",
              "마우스를 올림·비활성 상태는 기본 항목과 같습니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="항목 추가 버튼">
        <P>메뉴 맨 아래에 새 항목을 더하는 버튼을 둘 수 있습니다. 누르면 그 자리가 입력창으로 바뀝니다.</P>
        <Table
          head={["상태", "모습"]}
          rows={[
            ["기본", "다른 항목과 같은 모양의 \"항목 추가\" 버튼입니다."],
            ["입력창 열림", "버튼을 누르면 입력창이 선택된 상태로 열립니다. 이때 그 항목에는 마우스를 올려도 바탕이 바뀌지 않습니다."],
            ["값 적는 중", "확인(✓) 아이콘을 누르면 항목이 더해집니다. 입력창 바깥을 누르거나 Esc를 누르면 입력창이 닫힙니다. 적다가 닫아도 적던 값은 남겨 둡니다."],
            ["처리 중", "확인 아이콘이 가장 작은 Spin으로 바뀌고 입력창은 비활성이 됩니다."],
            ["오류", "더하지 못했으면 입력창을 잘못됨 상태로 바꾸고 설명 풍선으로 까닭을 알립니다."],
          ]}
        />
      </Section>

      <Section title="항목 묶기">
        <Demo caption="구분 선 / 제목이 있는 묶음">
          <DropdownMenu>
            <DropdownMenu.Trigger tag={Button}>구분 선</DropdownMenu.Trigger>
            <DropdownMenu.Menu>
              <DropdownMenu.Item>수정</DropdownMenu.Item>
              <DropdownMenu.Item>복제</DropdownMenu.Item>
              <Divider my={1} />
              <DropdownMenu.Item>삭제</DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenu.Trigger tag={Button}>제목이 있는 묶음</DropdownMenu.Trigger>
            <DropdownMenu.Menu>
              <DropdownMenu.Group title="문서">
                <DropdownMenu.Item>내려받기</DropdownMenu.Item>
                <DropdownMenu.Item>인쇄</DropdownMenu.Item>
              </DropdownMenu.Group>
              <DropdownMenu.Group title="승인">
                <DropdownMenu.Item>승인 요청</DropdownMenu.Item>
                <DropdownMenu.Item>반려</DropdownMenu.Item>
              </DropdownMenu.Group>
            </DropdownMenu.Menu>
          </DropdownMenu>
        </Demo>
        <Sub title="구분 선">
          <Rules
            items={[
              "항목 사이에 Divider를 넣어 묶음을 가릅니다.",
              "선의 위아래 여백은 M 메뉴에서 4px, L 메뉴에서 8px입니다.",
            ]}
          />
        </Sub>
        <Sub title="제목이 있는 묶음">
          <Rules
            items={[
              <><Code>DropdownMenu.Group</Code>으로 묶습니다. 묶음에는 반드시 제목(title)이 있습니다.</>,
              "제목은 누를 수 없습니다. 굵기 700이고 크기는 항목 글자와 같습니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="항목 안에 넣는 것">
        <P>항목 글자의 앞뒤에 아이콘, 국기, 배지, 사람 그림, 그리고 Link·Button·Switch 같은 컨트롤을 넣을 수 있습니다.</P>
        <Demo caption="글자 앞 / 글자 뒤 / 덧붙이는 글">
          <DropdownMenu>
            <DropdownMenu.Trigger tag={Button}>글자 앞</DropdownMenu.Trigger>
            <DropdownMenu.Menu>
              <DropdownMenu.Item><DropdownMenu.Item.Addon tag={EditM} />수정</DropdownMenu.Item>
              <DropdownMenu.Item><DropdownMenu.Item.Addon tag={CopyM} />복제</DropdownMenu.Item>
              <DropdownMenu.Item><DropdownMenu.Item.Addon tag={UserM} />담당자 바꾸기</DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenu.Trigger tag={Button}>글자 뒤</DropdownMenu.Trigger>
            <DropdownMenu.Menu>
              <DropdownMenu.Item>일괄 승인<Badge type="new" ml={1} /></DropdownMenu.Item>
              <DropdownMenu.Item>대기 문서<Text color="var(--ec-text-secondary)" ml={1}>12</Text></DropdownMenu.Item>
              <DropdownMenu.Item>
                메일 알림
                <DropdownMenu.Item.Addon ml="auto" pl={4}>
                  <Switch size="m" aria-label="메일 알림"><Switch.Value /></Switch>
                </DropdownMenu.Item.Addon>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                임시 저장본
                <DropdownMenu.Item.Addon ml="auto" pl={4} tag={TrashM} />
              </DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenu.Trigger tag={Button}>덧붙이는 글</DropdownMenu.Trigger>
            <DropdownMenu.Menu>
              <DropdownMenu.Item>
                <DropdownMenu.Item.Content>승인 요청</DropdownMenu.Item.Content>
                <DropdownMenu.Item.Hint>담당자에게 알림이 갑니다</DropdownMenu.Item.Hint>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <DropdownMenu.Item.Content>임시 저장</DropdownMenu.Item.Content>
                <DropdownMenu.Item.Hint>나만 볼 수 있습니다</DropdownMenu.Item.Hint>
              </DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
        </Demo>
        <Sub title="글자 앞">
          <Rules
            items={[
              "아이콘, 국기, 그림(사람 그림 포함)을 둡니다.",
              "아이콘의 색은 언제나 항목 글자의 색과 같습니다. 아이콘에 따로 색을 칠하지 않습니다.",
              "아이콘을 쓰면 한 메뉴의 모든 항목에 씁니다. 일부에만 쓰면 글자의 시작 위치가 어긋납니다.",
            ]}
          />
        </Sub>
        <Sub title="글자 뒤">
          <Rules
            items={[
              "누를 수 없는 것(아이콘, 배지, 개수)과 누를 수 있는 것(Switch, Link, Button)을 모두 둘 수 있습니다.",
              "항목을 지울 수 있으면 휴지통 아이콘의 약한 버튼(차분한 색)을 뒤에 둡니다.",
              <>항목을 끌어 순서를 바꿀 수 있으면 옮기기 아이콘을 <Code>--ec-text-secondary</Code> 색으로 둡니다. 아이콘은 항목에 마우스를 올렸을 때만 나오고, 커서는 옮기기 모양으로 바뀝니다. 자세한 규칙은 DragAndDrop 문서를 봅니다.</>,
              "개수는 상자 없이 글자로 적습니다. 크기는 항목 글자와 같습니다.",
              "배지와 글자 사이는 언제나 4px입니다. 배지가 붙은 항목을 골라도 누르는 요소에는 배지를 보여 주지 않습니다.",
            ]}
          />
        </Sub>
        <Sub title="덧붙이는 글">
          <Rules
            items={[
              <>항목 아래에 한 줄 설명을 붙일 때는 <Code>DropdownMenu.Item.Hint</Code>를 씁니다.</>,
              "글자 크기는 항목과 같습니다. M은 200(14px), L은 300(16px)입니다.",
              <>색은 <Code>--ec-text-secondary</Code>입니다.</>,
            ]}
          />
        </Sub>
        <Sub title="설명 풍선">
          <Demo>
            <DropdownMenu>
              <DropdownMenu.Trigger tag={Button}>문서 작업</DropdownMenu.Trigger>
              <DropdownMenu.Menu>
                <DropdownMenu.Item>수정</DropdownMenu.Item>
                <Tooltip title="승인이 끝난 문서는 삭제할 수 없습니다" placement="right">
                  <DropdownMenu.Item disabled>삭제</DropdownMenu.Item>
                </Tooltip>
              </DropdownMenu.Menu>
            </DropdownMenu>
          </Demo>
          <Rules
            items={[
              "설명 풍선은 항목 전체에 답니다.",
              "항목 안에 정보 아이콘을 따로 넣지 않습니다. 메뉴 안의 작은 아이콘은 마우스를 올려도 풍선이 잘 뜨지 않고, 누르면 항목이 실행되어 버립니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="메뉴 안의 메뉴">
        <Demo>
          <DropdownMenu>
            <DropdownMenu.Trigger tag={Button}>문서 작업</DropdownMenu.Trigger>
            <DropdownMenu.Menu>
              <DropdownMenu.Item>수정</DropdownMenu.Item>
              <DropdownMenu.Item>
                <DropdownMenu placement="right-start" interaction={DropdownMenu.nestedMenuInteraction} timeout={[0, 300]}>
                  <DropdownMenu.Trigger tag={DropdownMenu.Item.Content}>
                    내려받기
                    <DropdownMenu.Item.Addon ml="auto" pl={4} tag={ChevronRightM} />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Menu>
                    <DropdownMenu.Item>PDF</DropdownMenu.Item>
                    <DropdownMenu.Item>엑셀</DropdownMenu.Item>
                  </DropdownMenu.Menu>
                </DropdownMenu>
              </DropdownMenu.Item>
              <DropdownMenu.Item>삭제</DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
        </Demo>
        <Rules
          items={[
            "아래 메뉴가 있는 항목은 오른쪽 끝에 오른쪽 화살표를 붙여 알립니다.",
            "단계는 둘까지만 둡니다. 될 수 있으면 메뉴 안의 메뉴 자체를 피합니다. 항목이 많고 깊은 메뉴는 다루기 불편합니다.",
            "아래 메뉴는 자리가 있으면 오른쪽으로, 없으면 왼쪽으로 열립니다.",
          ]}
        />
        <P>아래 메뉴는 다음 경우에 0.3초 뒤 닫힙니다.</P>
        <Rules
          items={[
            "위 메뉴의 다른 항목에 마우스를 올렸을 때",
            "마우스가 메뉴 밖으로 나갔을 때",
            "메뉴 전체가 닫힐 때 (예: Esc를 눌렀을 때)",
          ]}
        />
        <P>아래 메뉴 안의 항목이 골라져 있어도, 메뉴를 열 때 아래 메뉴까지 줄줄이 펼치지 않습니다. 화면이 작은 사용자에게는 메뉴가 화면을 덮어 버립니다.</P>
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "동작 항목은 \"수정\", \"복제\", \"삭제\"처럼 동작을 나타내는 낱말로 적습니다.",
            "한 메뉴 안에서는 말의 꼴을 맞춥니다.",
            "되돌릴 수 없는 동작(삭제)은 맨 아래에 두고 구분 선으로 가릅니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "자리가 모자라 버튼으로 다 늘어놓을 수 없는 덜 중요한 동작을 모읍니다." }}
          bad={{ text: "화면에서 가장 중요한 동작을 메뉴 안에 숨기지 않습니다. 주요 버튼으로 밖에 둡니다." }}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["컴포넌트", "쓰임"]}
          rows={[
            ["DropdownMenu", "동작이나 항목의 목록. 고른 값을 누르는 요소에 보여 주지 않습니다."],
            ["Select", "값을 고르고, 고른 값을 누르는 요소에 보여 줍니다."],
            ["Dropdown", "목록이 아닌 자유로운 내용(폼, 안내)을 담습니다."],
          ]}
        />
      </Section>
    </Page>
  );
}

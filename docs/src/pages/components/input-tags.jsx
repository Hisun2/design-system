import React from "react";
import { InputTags, Tooltip } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "InputTags" };

const isMail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function TagsField({ size = "m", initial = [], label, placeholder, validate, tagProps = {}, colors = {} }) {
  const [tags, setTags] = React.useState(initial);
  const [value, setValue] = React.useState("");

  const append = (values) => {
    const cleaned = values.map((item) => item.trim()).filter(Boolean);
    setTags((prev) => [...prev, ...cleaned]);
    setValue("");
  };
  const editLast = () => {
    if (tags.length === 0) return;
    setTags(tags.slice(0, -1));
    setValue(`${tags[tags.length - 1]} ${value}`.trim());
  };
  const edit = (index) => {
    const rest = tags.filter((_, i) => i !== index);
    setTags(value.trim() ? [...rest, value.trim()] : rest);
    setValue(tags[index]);
  };
  const remove = (index, event) => {
    event.stopPropagation();
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <InputTags size={size} w={360} onAppend={append} onRemove={editLast}>
      {tags.map((tag, index) => {
        const wrong = validate ? !validate(tag) : false;
        const item = (
          <InputTags.Tag
            key={`${tag}-${index}`}
            theme="primary"
            editable
            color={wrong ? "var(--ec-text-critical)" : colors[tag]}
            onClick={() => edit(index)}
            {...tagProps}
          >
            <InputTags.Tag.Text>{tag}</InputTags.Tag.Text>
            <InputTags.Tag.Close onClick={(event) => remove(index, event)} />
          </InputTags.Tag>
        );
        return wrong ? (
          <Tooltip key={`${tag}-${index}`} title="메일 주소 꼴이 아닙니다">{item}</Tooltip>
        ) : (
          item
        );
      })}
      <InputTags.Value value={value} onChange={setValue} placeholder={tags.length ? undefined : placeholder} aria-label={label} />
    </InputTags>
  );
}

export default function InputTagsPage() {
  return (
    <Page meta={meta} lead="적은 값을 하나씩 태그로 감싸 주는 입력창입니다. 담당자 메일 주소나 검색어처럼 같은 종류의 값을 한 칸에 여러 개 받을 때 씁니다.">
      <Section title="구성">
        <Demo>
          <TagsField initial={["계약서", "견적서"]} label="문서 분류" placeholder="분류를 적습니다" />
        </Demo>
        <Table
          head={["부분", "하는 일"]}
          rows={[
            [<Code>InputTags</Code>, <>바깥 상자입니다. <Code>onAppend</Code>(태그로 만들 값이 생김), <Code>onRemove</Code>(마지막 태그를 되돌림)를 받습니다.</>],
            [<Code>InputTags.Tag</Code>, <>태그 하나입니다. <Code>editable</Code>을 주면 눌러서 고칠 수 있습니다.</>],
            [<Code>InputTags.Tag.Text</Code>, "태그의 글자입니다."],
            [<Code>InputTags.Tag.Close</Code>, "태그를 지우는 버튼입니다."],
            [<><Code>InputTags.Tag.Addon</Code> · <Code>InputTags.Tag.Circle</Code></>, "태그 안에 붙이는 아이콘과 동그란 그림 자리입니다."],
            [<Code>InputTags.Value</Code>, "글자를 적는 곳입니다. 태그들 뒤에 놓입니다."],
          ]}
        />
        <P>보기 목록에서 골라 넣게 하려면 Select의 선택 목록과 함께 씁니다.</P>
      </Section>

      <Section title="크기">
        <Demo column>
          <TagsField initial={["계약서", "견적서"]} label="문서 분류 M" />
          <TagsField size="l" initial={["계약서", "견적서"]} label="문서 분류 L" />
        </Demo>
        <Table
          head={["입력창", "안에 넣는 태그"]}
          rows={[
            ["M · 32px", "M 태그 (20px)"],
            ["L · 44px", "L 태그 (28px)"],
          ]}
        />
        <Rules
          items={[
            "태그가 한 줄에 다 들어가지 않으면 입력창이 글자 한 줄만큼씩 아래로 늘어납니다.",
            "태그 사이, 태그와 테두리 사이 간격은 4px입니다.",
          ]}
        />
      </Section>

      <Section title="태그의 색">
        <Demo caption="기본(회색) / 잘못된 값(빨강, 설명 풍선) / 분류별 색" column>
          <TagsField initial={["계약서", "견적서", "발주서"]} label="문서 분류" />
          <TagsField initial={["kim@example.com", "lee@example"]} validate={isMail} label="받는 사람" />
          <TagsField
            initial={["영업", "구매", "재무"]}
            colors={{ 영업: "var(--ec-text-info)", 구매: "var(--ec-text-success)", 재무: "var(--ec-text-review)" }}
            label="부서"
          />
        </Demo>
        <Rules
          items={[
            <>같은 종류의 값을 받을 때는 채운 모양(<Code>theme="primary"</Code>)의 회색 태그를 씁니다.</>,
            "테두리만 있는 태그는 입력창 안에 넣지 않습니다. 입력창 테두리와 겹쳐 어수선해 보입니다.",
            "값을 검사해서 잘못된 태그는 빨간색으로 바꿉니다. 무엇이 잘못됐는지는 설명 풍선에 분명하게 적습니다.",
            "필요하면 분류마다 다른 색을 쓸 수 있습니다. 색만으로 뜻을 전하지 않습니다.",
          ]}
        />
      </Section>

      <Section title="동작">
        <Sub title="태그를 넣는 방법">
          <Table
            head={["방법", "설명"]}
            rows={[
              ["목록에서 고르기", "초점이 들어가면 미리 준비된 보기(등록된 담당자, 전에 적은 검색어 등)의 목록이 열립니다. Enter를 누르거나 항목을 누르면 그 값이 태그로 들어갑니다."],
              ["직접 적기", "글자를 적으면 아래 조건에서 태그로 바뀝니다."],
              ["둘 다", "목록에서 고를 수도, 목록에 없는 값을 적을 수도 있게 합니다."],
            ]}
          />
        </Sub>
        <Sub title="글자가 태그로 바뀌는 때">
          <Rules
            items={[
              "입력창이 초점을 잃을 때(다른 곳을 누르거나 Tab으로 넘어갈 때)",
              "Enter, Tab, Shift+Tab을 누를 때",
              "구분 기호인 쉼표(,), 쌍반점(;), 세로줄(|)을 칠 때",
              "빈칸을 두 번 이어서 칠 때",
            ]}
          />
          <P>
            태그로 만들 때 앞뒤의 빈칸은 잘라 냅니다. 구분 기호는 <Code>delimiters</Code>로 바꿀 수 있습니다.
          </P>
        </Sub>
        <Sub title="붙여 넣기">
          <P>복사한 글을 붙여 넣으면 쉼표, 쌍반점, 세로줄에서 끊어 여러 태그로 만듭니다.</P>
        </Sub>
        <Sub title="고치기와 지우기">
          <Rules
            items={[
              "태그에 초점을 두고 Enter나 빈칸 키를 누르면 그 태그를 다시 글자로 풀어 고칩니다.",
              "글자가 없는 상태에서 Backspace를 누르면 마지막 태그를 풀어 고칩니다.",
              "태그의 × 버튼을 누르면 지워집니다.",
              "고치는 중에 글자를 모두 지워도 그 태그는 지워집니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="긴 글자">
        <Demo>
          <TagsField
            initial={["2026년 하반기 해외 거래처 재계약 검토 문서"]}
            tagProps={{ wMax: 200 }}
            label="문서 이름"
          />
        </Demo>
        <Rules
          items={[
            "태그의 가장 큰 폭을 정할 수 있습니다. 꼭 정해야 하는 것은 아닙니다.",
            "폭을 넘는 글자는 말줄임으로 자르고, 마우스를 올리면 전체 글자를 보여 줍니다.",
            "이 방식은 될 수 있으면 피합니다. 화면이 좁거나 글자를 키워 보는 사용자에게는 잘린 글자가 읽기 어렵습니다.",
          ]}
        />
      </Section>

      <Section title="쓰는 법">
        <DoDont
          good={{ text: "메일 주소 여러 개, 검색어 여러 개처럼 같은 종류의 값을 한 칸에 모아 받을 때 씁니다." }}
          bad={{ text: "값이 하나뿐인 칸이나 긴 문장을 받는 칸에는 쓰지 않습니다. Input이나 Textarea를 씁니다." }}
        />
        <Rules
          items={[
            "이름표를 붙이고, 여러 값을 어떻게 나눠 적는지(쉼표 또는 Enter) 도움말로 알려 줍니다.",
            "수십 개가 넘는 값을 한꺼번에 붙여 넣어 검사해야 하면 BulkTextarea를 씁니다.",
          ]}
        />
      </Section>
    </Page>
  );
}

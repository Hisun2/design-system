import React from "react";
import { Button, Flex, Text } from "@ec21rnc/ui";
import { FeedbackRating } from "@ec21rnc/ui/feedback-form";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "별점 의견", order: 14 };

const HEADERS = {
  low: "어떤 점이 불편했습니까?",
  high: "어떤 점이 좋았습니까?",
};

const CHECKS = {
  low: [
    { key: "slow", label: "화면이 느립니다", type: "checkbox" },
    { key: "hard", label: "쓰는 법을 알기 어렵습니다", type: "checkbox" },
    { key: "missing", label: "필요한 기능이 없습니다", type: "checkbox" },
  ],
  high: [
    { key: "fast", label: "일이 빨리 끝납니다", type: "checkbox" },
    { key: "easy", label: "쓰기 쉽습니다", type: "checkbox" },
    { key: "clear", label: "한눈에 잘 보입니다", type: "checkbox" },
  ],
};

/** failFirst를 주면 처음 보낼 때 한 번 실패합니다(오류 상태를 보기 위한 것). */
function RatingDemo({ failFirst }) {
  const [status, setStatus] = React.useState("default");
  const [noticeVisible, setNoticeVisible] = React.useState(true);
  const [rating, setRating] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const tried = React.useRef(false);

  const kind = rating > 3 ? "high" : "low";
  const formConfig = [
    ...CHECKS[kind],
    {
      key: "comment",
      label: "더 나아졌으면 하는 점이 있습니까? (선택)",
      type: "textarea",
      validate: (value = "") => (value && value.trim().length < 3 ? "세 글자 이상 적어 주십시오." : undefined),
    },
    {
      key: "email",
      label: "답변받을 이메일 (선택)",
      type: "email",
      description: "이 주소는 보내신 의견에 답하는 데만 씁니다.",
      validate: FeedbackRating.validate.email("이메일 주소 형식이 아닙니다."),
    },
  ];

  const onVisibleChange = (nextVisible, nextRating) => {
    setVisible(nextVisible);
    setRating(nextVisible ? nextRating : 0);
    if (!nextVisible) setStatus("default");
  };

  const onSubmit = () => {
    setStatus("loading");
    setTimeout(() => {
      if (failFirst && !tried.current) {
        tried.current = true;
        setStatus("error");
        return;
      }
      setStatus("success");
      setVisible(false);
      setNoticeVisible(false);
    }, 1200);
  };

  if (!noticeVisible) {
    return (
      <Flex alignItems="center" gap={3}>
        <Text size={200} color="text-secondary">알림이 닫혔습니다. 실제 화면에서는 다시 보이지 않습니다.</Text>
        <Button
          onClick={() => {
            setNoticeVisible(true);
            setStatus("default");
            setRating(0);
          }}
        >
          예시 다시 보기
        </Button>
      </Flex>
    );
  }

  return (
    <FeedbackRating
      status={status}
      notificationVisible={noticeVisible}
      onNotificationClose={() => setNoticeVisible(false)}
      notificationText="새 문서 승인 화면은 쓰기에 어떻습니까?"
      rating={rating}
      visible={visible}
      onVisibleChange={onVisibleChange}
      header={HEADERS[kind]}
      submitText="의견 보내기"
      formConfig={formConfig}
      initialValues={{ rating, comment: "", email: "담당자@회사.example" }}
      errorFeedbackEmail="관리자@회사.example"
      onSubmit={onSubmit}
    />
  );
}

export default function FeedbackRatingPage() {
  return (
    <Page meta={meta} lead="사용자에게 별 다섯 개로 점수를 받고, 이어서 까닭을 묻는 묶음입니다. 어떤 단계를 마쳤거나 어떤 기능을 써 본 직후에 그 경험을 물을 때 씁니다.">
      <Section title="구성">
        <Demo caption="별을 누르면 의견 창이 열립니다. 별 수에 따라 묻는 말과 보기가 달라집니다.">
          <RatingDemo />
        </Demo>
        <Table
          head={["순서", "요소", "하는 일"]}
          rows={[
            ["1", "알림 상자 (Notice, 정보 색) + 별점", "묻는 말을 보이고 별점을 받습니다."],
            ["2", "모달 + 의견 폼", "별점의 까닭을 고르거나 적게 합니다."],
            ["3", "짧은 알림 (NoticeBubble)", "보낸 뒤 고맙다고 알립니다."],
          ]}
        />
        <P><Code>FeedbackRating</Code> 컴포넌트 하나가 이 셋을 모두 담고 있습니다. <Code>@ec21rnc/ui/feedback-form</Code>에서 불러옵니다.</P>
      </Section>

      <Section title="알림 상자">
        <Table
          head={["요소", "필수", "규칙"]}
          rows={[
            ["그림", "필수", "의견을 뜻하는 정해진 그림입니다. 바꾸지 않습니다."],
            ["묻는 말", "필수", "상황에 맞게 적습니다: \"새 문서 승인 화면은 쓰기에 어떻습니까?\""],
            ["별점", "필수", "처음 값은 0(아무것도 고르지 않음)입니다."],
            ["닫기 버튼", "필수", "언제든 닫을 수 있어야 합니다."],
            ["\"더 알아보기\" 링크", "선택", "글자는 늘 \"더 알아보기\"이고 가는 곳만 바뀝니다."],
          ]}
        />
        <Sub title="보이는 때">
          <Rules
            items={[
              "사용자가 닫았으면 다시 보이지 않습니다.",
              "사용자가 닫기 버튼으로 닫거나, 의견을 보내거나, 정해 둔 기간이 지날 때까지 보입니다.",
              "한 업무 화면 안에서 이런 알림을 여러 개 한꺼번에 보이지 않습니다.",
              "하나를 닫자마자 다음 알림을 보이지 않습니다. 사이를 둡니다.",
              "기능 안내 풍선(FeaturePopover)과 한 화면에 함께 띄우지 않습니다. 한 번에 눈길을 끄는 것은 하나여야 합니다.",
            ]}
          />
        </Sub>
      </Section>

      <Section title="의견 창">
        <Table
          head={["요소", "필수", "규칙"]}
          rows={[
            ["별점", "필수", "앞에서 고른 값을 보여 주기만 합니다. 여기서는 바꿀 수 없습니다. 창을 닫으면 고른 값이 지워집니다."],
            ["제목", "필수", "고른 별 수에 맞는 말을 씁니다. 낮으면 \"어떤 점이 불편했습니까?\", 높으면 \"어떤 점이 좋았습니까?\". 제목 태그로 넣습니다."],
            ["보기 (체크박스)", "필수", "별 수에 따라 다른 보기 묶음을 보일 수 있습니다. 최대 세 개까지입니다."],
            ["여러 줄 입력창", "필수", "자유롭게 적는 칸입니다. 이름표의 기본은 \"더 나아졌으면 하는 점이 있습니까?\"이고 바꿀 수 있습니다. 글자 수 한도를 둘 수 있습니다."],
            ["보내는 버튼", "필수", "기본 글자는 \"의견 보내기\"입니다. 바꿀 수 있습니다."],
            ["이메일 입력창", "선택", "답변을 받을 주소입니다. 로그인한 사람의 이메일을 미리 채우고, 지울 수 있게 합니다."],
            ["개인정보 안내", "선택", "이메일 칸을 둘 때 함께 둡니다: \"이 주소는 보내신 의견에 답하는 데만 씁니다.\""],
          ]}
        />
      </Section>

      <Section title="입력 규칙">
        <Table
          head={["입력", "규칙"]}
          rows={[
            ["보기 (체크박스)", "고르지 않아도 됩니다. 몇 개든 고를 수 있습니다."],
            ["여러 줄 입력창", "비워도 됩니다. 적었는데 세 글자가 안 되면 틀림 표시를 하고, 어떻게 고칠지 설명 풍선으로 알립니다. 이때도 보내는 버튼은 비활성으로 두지 않습니다."],
            ["이메일", "비워도 됩니다. 지워도 오류가 나지 않고 보내기를 막지 않습니다. 적었으면 형식만 검사합니다."],
          ]}
        />
        <P>아무것도 더 채우지 않고 별점만으로도 보낼 수 있어야 합니다. 창이 열리자마자 보내는 버튼을 눌러도 됩니다.</P>
      </Section>

      <Section title="상태">
        <Demo caption="오류 상태 보기 — 별을 고르고 '의견 보내기'를 누르면 처음 한 번은 실패합니다">
          <RatingDemo failFirst />
        </Demo>
        <Table
          head={["상태", "언제", "보이는 것"]}
          rows={[
            ["불러오는 중", "보내는 버튼을 누른 뒤, 또는 폼을 처음 불러올 때", "폼 전체가 덮이고 도는 표시가 나옵니다."],
            ["오류", "어떤 까닭으로 보내지 못했을 때", "보내는 버튼 위에 알림 상자가 나옵니다. 다시 시도하거나 적힌 주소로 문의하라고 안내합니다. 문의 주소는 화면마다 정해 넣습니다."],
            ["완료", "의견을 보낸 뒤", "창과 알림 상자가 닫히고 짧은 알림으로 고맙다고 알립니다."],
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "묻는 말은 한 가지만 묻습니다. 무엇에 대한 점수인지 이름을 넣습니다.",
            "보기는 사용자가 할 법한 말로 짧게 적습니다.",
            "보낸 뒤의 알림은 고맙다는 한 문장으로 끝냅니다.",
          ]}
        />
        <DoDont
          good={{ text: "문서 승인을 마친 직후에 \"새 문서 승인 화면은 쓰기에 어떻습니까?\"라고 묻습니다." }}
          bad={{ text: "화면에 들어오자마자, 아직 아무것도 써 보지 않은 사람에게 점수를 묻지 않습니다." }}
        />
      </Section>

      <Section title="다른 것과의 구분">
        <Table
          head={["쓰는 것", "언제"]}
          rows={[
            ["별점 의견", "경험이 얼마나 좋았는지 정도를 알고 싶을 때"],
            ["예/아니요 의견", "새 기능이 쓸 만한지 한 가지만 빠르게 물을 때"],
            ["의견 보내기 폼 (FeedbackForm)", "사용자가 원할 때 언제든 의견을 보낼 수 있게 열어 둘 때"],
          ]}
        />
      </Section>
    </Page>
  );
}

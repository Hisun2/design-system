import React from "react";
import { Switch } from "@ec21rnc/ui";
import CheckM from "@semcore/icon/Check/m";
import CloseM from "@semcore/icon/Close/m";
import { Page, Section, P, Rules, Table, Demo, DoDont, Code } from "../../kit.jsx";

export const meta = { title: "Switch" };

function IconSwitch({ size }) {
  const [checked, setChecked] = React.useState(true);
  return (
    <Switch size={size}>
      <Switch.Value checked={checked} onChange={setChecked}>
        {checked ? <CheckM /> : <CloseM />}
      </Switch.Value>
      <Switch.Addon>자동 승인</Switch.Addon>
    </Switch>
  );
}

export default function SwitchPage() {
  return (
    <Page meta={meta} lead="두 가지 상태 사이를 바로 오가는 스위치입니다. 누르는 즉시 적용되며, 저장 버튼이나 화면 새로 고침이 따로 필요하지 않은 설정에 씁니다.">
      <Section title="구성">
        <Demo>
          <Switch>
            <Switch.Value defaultChecked />
            <Switch.Addon>알림 받기</Switch.Addon>
          </Switch>
        </Demo>
        <Table
          head={["부품", "역할"]}
          rows={[
            [<Code>Switch.Value</Code>, "켜고 끄는 스위치 자체입니다."],
            [<Code>Switch.Addon</Code>, "스위치 옆의 글자입니다. 앞, 뒤, 또는 양쪽에 둘 수 있습니다."],
          ]}
        />
        <Demo caption="글자를 양쪽에 둔 모양 — 두 상태에 각각 이름이 있을 때">
          <Switch>
            <Switch.Addon>월별</Switch.Addon>
            <Switch.Value />
            <Switch.Addon>분기별</Switch.Addon>
          </Switch>
        </Demo>
      </Section>

      <Section title="색">
        <Demo caption="theme=&quot;info&quot;(기본) / theme=&quot;success&quot;">
          <Switch theme="info">
            <Switch.Value defaultChecked />
            <Switch.Addon>알림 받기</Switch.Addon>
          </Switch>
          <Switch theme="success">
            <Switch.Value defaultChecked />
            <Switch.Addon>거래 가능</Switch.Addon>
          </Switch>
        </Demo>
        <Table
          head={["색", "언제 쓰는가"]}
          rows={[
            ["info (Blue)", "기본입니다. 대부분의 설정에 씁니다."],
            ["success (초록)", "켜진 상태가 좋은 결과임을 드러낼 때만 씁니다."],
          ]}
        />
      </Section>

      <Section title="크기">
        <Demo caption="M(기본) / L / XL">
          <Switch size="m">
            <Switch.Value defaultChecked />
            <Switch.Addon>알림 받기</Switch.Addon>
          </Switch>
          <Switch size="l">
            <Switch.Value defaultChecked />
            <Switch.Addon>알림 받기</Switch.Addon>
          </Switch>
          <Switch size="xl">
            <Switch.Value defaultChecked />
            <Switch.Addon>알림 받기</Switch.Addon>
          </Switch>
        </Demo>
        <Rules
          items={[
            "M이 기본입니다. 표, 필터, 설정 목록 등 대부분의 자리에 씁니다.",
            "L과 XL은 설정 하나가 화면의 중심일 때, 또는 손가락으로 누르는 화면에서 씁니다.",
            "스위치와 글자 사이 간격은 크기와 상관없이 8px입니다.",
            <>글자 크기는 M이 <Code>--ec-fs-200</Code>, L과 XL이 <Code>--ec-fs-300</Code>입니다.</>,
            <>켜진 쪽 글자는 <Code>--ec-text-primary</Code>, 꺼진 쪽 글자는 <Code>--ec-text-secondary</Code>입니다.</>,
          ]}
        />
      </Section>

      <Section title="아이콘이 든 스위치">
        <Demo caption="L / XL — 켜짐과 꺼짐에 서로 다른 아이콘">
          <IconSwitch size="l" />
          <IconSwitch size="xl" />
        </Demo>
        <Rules
          items={[
            "아이콘은 L과 XL에서만 넣습니다. M은 자리가 없습니다.",
            "켜진 상태와 꺼진 상태에 서로 다른 아이콘을 씁니다. 색만으로 상태를 전하지 않기 위함입니다.",
          ]}
        />
      </Section>

      <Section title="상태">
        <Demo caption="꺼짐 / 켜짐 / 비활성(꺼짐) / 비활성(켜짐)">
          <Switch><Switch.Value /><Switch.Addon>꺼짐</Switch.Addon></Switch>
          <Switch><Switch.Value defaultChecked /><Switch.Addon>켜짐</Switch.Addon></Switch>
          <Switch disabled><Switch.Value /><Switch.Addon>비활성</Switch.Addon></Switch>
          <Switch disabled><Switch.Value defaultChecked /><Switch.Addon>비활성</Switch.Addon></Switch>
        </Demo>
        <Table
          head={["상태", "모양"]}
          rows={[
            ["꺼짐", <>바탕 <Code>--ec-control-switch-off</Code></>],
            ["켜짐", <>바탕 <Code>--ec-control-primary-info</Code> 또는 <Code>--ec-control-primary-success</Code></>],
            ["비활성", "전체가 30% 정도로 흐려집니다. 누를 수 없습니다."],
          ]}
        />
        <Rules
          items={[
            "비활성 스위치는 왜 바꿀 수 없는지 가까운 곳에 적습니다.",
            "키보드로 초점을 주면 파란 테두리가 나옵니다. Space로 켜고 끕니다.",
          ]}
        />
      </Section>

      <Section title="글자">
        <Rules
          items={[
            "켰을 때 일어나는 일을 긍정문으로 적습니다. \"알림 숨기기\"보다 \"알림 받기\"가 켜짐·꺼짐의 뜻을 헷갈리지 않게 합니다.",
            "\"메일로 보내기\", \"자동 승인하기\"처럼 동작을 나타내는 말로 적습니다.",
            "자리가 좁거나 설정 목록 안에 여러 스위치가 나란히 있을 때는 \"메일 알림\", \"자동 승인\"처럼 명사로만 적어도 됩니다.",
            "글자 끝에 쌍점(:)을 붙이지 않습니다.",
          ]}
        />
        <DoDont
          good={{
            demo: <Switch><Switch.Value defaultChecked /><Switch.Addon>승인 결과를 메일로 받기</Switch.Addon></Switch>,
            text: "켜면 무엇이 일어나는지 긍정문으로 적습니다.",
          }}
          bad={{
            demo: <Switch><Switch.Value defaultChecked /><Switch.Addon>승인 결과 메일 받지 않기</Switch.Addon></Switch>,
            text: "부정문으로 적지 않습니다. 켜진 것이 받는다는 뜻인지 안 받는다는 뜻인지 알 수 없습니다.",
          }}
        />
      </Section>

      <Section title="쓰는 법">
        <Rules
          items={[
            "누르는 즉시 적용되는 설정에만 씁니다. 저장 버튼을 눌러야 적용되는 폼에서는 Checkbox를 씁니다.",
            "적용에 시간이 걸리면 그동안 스위치를 비활성으로 두고 끝난 뒤 결과를 알립니다.",
          ]}
        />
      </Section>

      <Section title="다른 컴포넌트와의 구분">
        <Table
          head={["상황", "쓸 것"]}
          rows={[
            ["즉시 적용되는 켜기·끄기", "Switch"],
            ["폼 안에서 저장할 때 함께 적용되는 예·아니요", "Checkbox"],
            ["여러 항목 가운데 여럿을 고를 때", "Checkbox"],
            ["둘 이상의 보기 가운데 하나를 고를 때", "Radio 또는 Pills"],
          ]}
        />
        <P>탭처럼 화면의 내용을 바꾸는 용도로 Switch를 쓰지 않습니다. TabLine이나 Pills를 씁니다.</P>
      </Section>
    </Page>
  );
}

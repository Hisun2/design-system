// 타입 정의가 맞는지 확인하는 파일입니다. npm run typecheck 로 검사합니다.
import { Button, DataTable, Input, StatusTag, UiProvider, Wizard, Slider } from "@ec21rnc/ui";
import { Chart } from "@ec21rnc/ui/chart";

export const ok = (
  <UiProvider>
    <Button use="primary" theme="info" size="l">저장</Button>
    <Input><Input.Value placeholder="이름" /></Input>
    <StatusTag status="success">승인</StatusTag>
    <DataTable aria-label="예시" data={[{ a: "1" }]} columns={[{ name: "a", children: "가" }]} />
  </UiProvider>
);
export const exists = [Wizard, Slider, Chart];

// @ts-expect-error 정해지지 않은 상태 값은 막혀야 합니다.
export const bad1 = <StatusTag status="done">완료</StatusTag>;
// @ts-expect-error 없는 버튼 종류는 막혀야 합니다.
export const bad2 = <Button use="super">저장</Button>;

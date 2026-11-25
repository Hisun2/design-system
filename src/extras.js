// Intergalactic에 없어서 우리가 따로 만든 것, 그리고 외부 서버 대신 패키지 안의 파일을 쓰도록 감싼 것.
import { createElement, forwardRef, Fragment } from "react";
import { I18nProvider } from "@semcore/ui/core/lib/utils/enhances/WithI18n";
import Tag from "@semcore/ui/tag";
import { NoData as BaseNoData, Error as BaseWidgetError } from "@semcore/ui/widget-empty";
import {
  AccessDenied as BaseAccessDenied,
  Maintenance as BaseMaintenance,
  PageError as BasePageError,
  PageNotFound as BasePageNotFound,
  ProjectNotFound as BaseProjectNotFound,
} from "@semcore/ui/errors";
import {
  DatePicker as BaseDatePicker,
  DateRangePicker as BaseDateRangePicker,
  MonthPicker as BaseMonthPicker,
  MonthRangePicker as BaseMonthRangePicker,
} from "@semcore/ui/date-picker";
import { FLAGS_MARKER, illustrations } from "./generated/assets.js";

// Flags 컴포넌트는 이 표시가 head에 있으면 Semrush 서버의 국기 스타일을 불러오지 않습니다.
// 국기 스타일은 styles.css에 들어 있습니다.
function useOwnFlagSprite() {
  if (typeof document === "undefined" || document.head.querySelector(`.${FLAGS_MARKER}`)) return;
  const marker = document.createElement("meta");
  marker.className = FLAGS_MARKER;
  document.head.appendChild(marker);
}

/** 앱 맨 바깥에 한 번 감쌉니다. 컴포넌트 안의 기본 문구를 한국어로 맞추고, 국기를 패키지 안의 파일로 그리게 합니다. */
export function UiProvider({ locale = "ko", children }) {
  useOwnFlagSprite();
  return createElement(I18nProvider, { value: locale }, children);
}

/** 그림의 주소. 이름은 "nothing-found", "page_not_found", "NothingFound" 어느 꼴이든 됩니다. */
export function getIllustrationPath(name) {
  const key = name.split(/_|-/).map((part) => part[0].toUpperCase() + part.slice(1)).join("");
  if (!(key in illustrations)) throw new Error(`getIllustrationPath: "${name}"이라는 그림이 없습니다.`);
  return illustrations[key];
}
export const getIconPath = getIllustrationPath;

// 기본 그림을 패키지 안의 파일로 바꿔 끼웁니다. icon을 직접 주면 그것을 씁니다.
const withOwnIcon = (Base, pick) => {
  const Wrapped = forwardRef((props, ref) => createElement(Base, { icon: getIllustrationPath(pick(props)), ...props, ref }));
  for (const key of Object.keys(Base)) if (/^[A-Z]/.test(key)) Wrapped[key] = Base[key];
  Wrapped.displayName = Base.displayName;
  return Wrapped;
};

export const NoData = withOwnIcon(BaseNoData, (props) => props.type ?? "other-data");
export const WidgetError = withOwnIcon(BaseWidgetError, () => "warning");
export const AccessDenied = withOwnIcon(BaseAccessDenied, () => "access_denied");
export const Maintenance = withOwnIcon(BaseMaintenance, () => "maintenance");
export const PageError = withOwnIcon(BasePageError, () => "page_error");
export const PageNotFound = withOwnIcon(BasePageNotFound, () => "page_not_found");
export const ProjectNotFound = withOwnIcon(BaseProjectNotFound, () => "project_not_found");

// 날짜 선택기를 우리 표기(2026-11-25)에 맞춥니다.
// - 빈 자리 표시: 기본 한국어 표시("년년년년. 월월. 일일") 대신 Y, M, D
// - 구분 기호: 입력란은 날짜 형식을 언어 설정에서 가져옵니다. 한국어 그대로면 "2026. 11. 25"가 되므로
//   입력란만 "한국어 + ISO 8601 달력"이라는 언어 코드로 감싸 "2026-11-25"가 되게 합니다.
//   달력(머리글, 요일, 오늘 버튼)은 바깥의 한국어 설정을 그대로 씁니다.
// - 이 언어 코드에는 Intergalactic의 번역이 없으므로, 입력란이 쓰는 문구를 한국어로 직접 넣습니다.
const DATE_PLACEHOLDERS = { year: "Y", month: "M", day: "D" };
const DATE_LOCALE = "ko-u-ca-iso8601";
const DATE_INPUT_TEXTS = {
  [DATE_LOCALE]: {
    input: "날짜 필드",
    fromDate: "{date}부터",
    toDate: "종료 날짜",
    fromDatePlaceholder: "시작 날짜",
    toDatePlaceholder: "종료 날짜",
    unavailableDate: "가능한 날짜를 선택하세요.",
    unavailableMonth: "가능한 달을 선택하세요.",
    unavailableEndDate: "가능한 마감일을 선택하세요.",
    unavailableEndMonth: "가능한 마감월을 선택하세요.",
    "placeholder-years": "Y",
    "placeholder-months": "M",
    "placeholder-days": "D",
  },
};
const copyParts = (from, to) => {
  for (const key of Object.keys(from)) if (/^[A-Z]/.test(key)) to[key] = from[key];
  to.displayName = from.displayName;
  return to;
};
// label: 입력란이 하나인 선택기의 화면 읽기용 이름. 범위 선택기는 "시작 날짜", "종료 날짜"가 이미 들어 있어 주지 않습니다.
const withDatePlaceholders = (Base, label) => {
  // 부품을 직접 조립해 쓸 때도 적용되도록 Trigger 자체를 바꿔 둡니다.
  const Trigger = copyParts(
    Base.Trigger,
    forwardRef((props, ref) =>
      createElement(
        I18nProvider,
        { value: DATE_LOCALE },
        createElement(Base.Trigger, { placeholders: DATE_PLACEHOLDERS, i18n: DATE_INPUT_TEXTS, ...(label ? { labelPrefix: label } : {}), ...props, ref }),
      ),
    ),
  );
  const Wrapped = forwardRef((props, ref) =>
    createElement(
      Base,
      { ...props, ref },
      props.children ?? createElement(Fragment, null, createElement(Trigger), createElement(Base.Popper)),
    ),
  );
  copyParts(Base, Wrapped);
  Wrapped.Trigger = Trigger;
  return Wrapped;
};

export const DatePicker = withDatePlaceholders(BaseDatePicker, "날짜");
export const DateRangePicker = withDatePlaceholders(BaseDateRangePicker);
export const MonthPicker = withDatePlaceholders(BaseMonthPicker, "달");
export const MonthRangePicker = withDatePlaceholders(BaseMonthRangePicker);

// 상태 색 규칙: 초록=끝났고 문제없음, 파랑=진행 중, 노랑=사람이 봐야 함, 빨강=문제 있음, 보라=검토, 회색=시작 전
const STATUS_COLOR = {
  success: "var(--ec-text-success)",
  progress: "var(--ec-text-info)",
  warning: "var(--ec-text-warning)",
  critical: "var(--ec-text-critical)",
  review: "var(--ec-text-review)",
  neutral: "var(--ec-text-secondary)",
};

/** 데이터의 상태를 표시하는 태그. status: success | progress | warning | critical | review | neutral */
export function StatusTag({ status = "neutral", size = "m", children, ...rest }) {
  if (!(status in STATUS_COLOR)) throw new Error(`StatusTag: 알 수 없는 status "${status}"`);
  return createElement(Tag, { theme: "primary", color: STATUS_COLOR[status], size, ...rest }, children);
}

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

// 날짜 입력란의 빈 자리 표시. 기본 한국어 표시("년년년년. 월월. 일일")가 어색해서 Y, M, D로 바꿉니다.
const DATE_PLACEHOLDERS = { year: "Y", month: "M", day: "D" };
const copyParts = (from, to) => {
  for (const key of Object.keys(from)) if (/^[A-Z]/.test(key)) to[key] = from[key];
  to.displayName = from.displayName;
  return to;
};
const withDatePlaceholders = (Base) => {
  // 부품을 직접 조립해 쓸 때도 적용되도록 Trigger 자체를 바꿔 둡니다.
  const Trigger = copyParts(
    Base.Trigger,
    forwardRef((props, ref) => createElement(Base.Trigger, { placeholders: DATE_PLACEHOLDERS, ...props, ref })),
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

export const DatePicker = withDatePlaceholders(BaseDatePicker);
export const DateRangePicker = withDatePlaceholders(BaseDateRangePicker);
export const MonthPicker = withDatePlaceholders(BaseMonthPicker);
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

import type { ComponentProps, ReactElement, ReactNode } from "react";
import type Tag from "@semcore/ui/tag";

/** 앱 맨 바깥에 한 번 감쌉니다. 컴포넌트 안의 기본 문구를 한국어로 맞춥니다. */
export declare function UiProvider(props: { locale?: string; children?: ReactNode }): ReactElement;

export type Status = "success" | "progress" | "warning" | "critical" | "review" | "neutral";

/** 데이터의 상태를 표시하는 태그. */
export declare function StatusTag(
  props: Omit<ComponentProps<typeof Tag>, "theme" | "color"> & { status?: Status },
): ReactElement;

/** 그림의 주소. 이름은 "nothing-found", "page_not_found", "NothingFound" 어느 꼴이든 됩니다. */
export declare function getIllustrationPath(name: string): string;
export declare const getIconPath: typeof getIllustrationPath;

// 기본 그림을 패키지 안의 파일로 바꿔 끼운 것. 쓰는 법은 원래 컴포넌트와 같습니다.
export declare const NoData: typeof import("@semcore/ui/widget-empty").NoData;
export declare const WidgetError: typeof import("@semcore/ui/widget-empty").Error;
export declare const AccessDenied: typeof import("@semcore/ui/errors").AccessDenied;
export declare const Maintenance: typeof import("@semcore/ui/errors").Maintenance;
export declare const PageError: typeof import("@semcore/ui/errors").PageError;
export declare const PageNotFound: typeof import("@semcore/ui/errors").PageNotFound;
export declare const ProjectNotFound: typeof import("@semcore/ui/errors").ProjectNotFound;

// 날짜 입력란의 빈 자리 표시를 Y, M, D로 바꾼 것. 쓰는 법은 원래 컴포넌트와 같습니다.
export declare const DatePicker: typeof import("@semcore/ui/date-picker").DatePicker;
export declare const DateRangePicker: typeof import("@semcore/ui/date-picker").DateRangePicker;
export declare const MonthPicker: typeof import("@semcore/ui/date-picker").MonthPicker;
export declare const MonthRangePicker: typeof import("@semcore/ui/date-picker").MonthRangePicker;

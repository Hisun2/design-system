# @ec21rnc/ui

EC21 R&C 사내 시스템(이노잉, ERP, 모아)이 함께 쓰는 디자인 토큰과 UI 컴포넌트입니다.
컴포넌트는 Semrush의 [Intergalactic](https://developer.semrush.com/intergalactic/)(MIT) 위에 우리 토큰을 입힌 것입니다.

패키지 이름과 토큰 앞머리 `ec`는 임시입니다.

## 설치

저장소는 비공개입니다. 설치하는 사람의 GitHub 계정에 이 저장소를 볼 권한이 있어야 합니다. 버전은 git 태그로 고정합니다.

```sh
npm install git+https://github.com/Hisun2/design-system.git#v0.1.0
```

React 18 또는 19가 필요합니다.

## 사용

앱 시작 파일에서 스타일을 한 번 불러오고, 앱 전체를 `UiProvider`로 감쌉니다.

```jsx
import "@ec21rnc/ui/styles.css";
import { UiProvider, Button, StatusTag } from "@ec21rnc/ui";

export default function App() {
  return (
    <UiProvider>
      <Button use="primary" theme="info">저장</Button>
      <StatusTag status="success">승인</StatusTag>
    </UiProvider>
  );
}
```

- Intergalactic이 제공하는 컴포넌트는 빠짐없이 내보냅니다. 지금 쓰지 않는 것도 나중에 쓸 수 있게 전부 들어 있습니다.
- 컴포넌트는 `@semcore/ui`에서 직접 불러오지 말고 반드시 `@ec21rnc/ui`에서 불러옵니다. 나중에 기반 라이브러리를 바꿔도 각 시스템 코드를 고치지 않기 위해서입니다.
- 색·크기·간격은 값을 직접 쓰지 말고 `var(--ec-text-secondary)`처럼 의미 토큰을 씁니다.
- 각 컴포넌트의 속성은 Intergalactic 문서와 같습니다.

### 불러오는 곳

| 불러오는 곳 | 내용 |
|---|---|
| `@ec21rnc/ui` | 일반 컴포넌트 전부 (버튼, 입력, 표, 모달, 단계 창, 회전 배너 등 162개 이름) |
| `@ec21rnc/ui/chart` | 차트 전부 (`Chart.Line`, `Chart.Bar`, `Chart.Donut`, `MiniChart` 등). 용량이 커서 따로 둡니다. |
| `@ec21rnc/ui/feedback-form` | 피드백 폼. `react-final-form`을 추가로 설치해야 해서 따로 둡니다. |
| `@semcore/icon/<이름>/m` | 아이콘. 수가 많아 하나씩 직접 불러옵니다(유일한 예외). |

이름이 겹쳐 바꾼 것: `ProductHeadTitle`, `ProductHeadInfo`, `WidgetError`, `TooltipHint`.

### 우리가 따로 만든 것

| 이름 | 설명 |
|---|---|
| `UiProvider` | 컴포넌트 기본 문구를 한국어로 맞춥니다. |
| `StatusTag` | 데이터 상태 태그. `status`는 `success`(끝났고 문제없음), `progress`(진행 중), `warning`(사람이 봐야 함), `critical`(문제 있음), `review`(검토), `neutral`(시작 전) 중 하나입니다. |

## 폴더

| 위치 | 내용 |
|---|---|
| `src/` | 배포되는 패키지 본체 |
| `src/generated/` | 토큰에서 자동 생성한 CSS. 직접 고치지 않습니다. |
| `src/fonts/` | Spoqa Han Sans Neo (SIL OFL 1.1, `OFL.txt`) |
| `src/assets/` | 빈 상태·오류 화면의 그림과 국기 그림. Intergalactic에서 복사한 것(MIT)이며 `npm run gen`이 다시 만듭니다. |
| `tokens/tokens.json` | 우리 토큰의 원본 |
| `tokens/intergalactic-map.json` | Intergalactic 토큰을 우리 토큰에 연결하는 표 |
| `scripts/gen-index.mjs` | Intergalactic의 모든 컴포넌트를 다시 내보내는 파일을 만드는 스크립트 |
| `playground/` | 모든 컴포넌트를 한 화면에서 확인하는 시험 화면 |
| `docs/` | 규칙 문서 사이트. 작성 방법은 `docs/README.md` |
| `01_목차_초안.md`, `02_CI_제안.md` | 처음 기획할 때의 기록. 지금의 규칙은 문서 사이트가 기준입니다. |

## 개발

```sh
npm install
npm run tokens            # 토큰을 고친 뒤 CSS 다시 만들기
npm run gen               # Intergalactic 버전을 올린 뒤 내보내기 목록과 그림 파일 다시 만들기
npm run docs              # 규칙 문서 사이트 (http://localhost:5198)
npm run check:docs        # 문서의 모든 페이지를 그려 보고 오류 확인
npm run dev               # 시험 화면 (http://localhost:5199)
npm run typecheck         # 타입 정의 검사
npm run build:playground  # 시험 화면 운영용 빌드
```

`npm run tokens`는 연결표에 Intergalactic에 없는 이름이 있으면 오류로 멈추고, 연결하지 않은 토큰을 이유별로 세어 보여줍니다.
Intergalactic 토큰 600개 중 색감이 있는 것은 전부 연결되어 있습니다. 연결하지 않은 것은 색이 아닌 값, 색감 없는 회색·그림자, 어두운 배경 위의 흰색, 외부 서비스 로고 색뿐입니다. "색감이 있는데 연결하지 않음"이 출력되면 연결표에 추가해야 합니다.
`src/generated/`는 git에 함께 올립니다. 설치하는 쪽에서 따로 빌드하지 않아도 되게 하기 위해서입니다.

## 외부 서버에 기대지 않습니다

글꼴, 그림, 국기는 모두 이 패키지 안의 파일로 그립니다. Intergalactic은 원래 그림과 국기를 Semrush 서버에서 불러오는데, 이를 막기 위해 다음을 해 두었습니다.

- 빈 상태·오류 화면 컴포넌트(`NoData`, `WidgetError`, `PageNotFound`, `PageError`, `AccessDenied`, `Maintenance`, `ProjectNotFound`)는 패키지 안의 그림을 쓰도록 감싼 것을 내보냅니다.
- 그림 주소가 필요하면 `@ec21rnc/ui`의 `getIllustrationPath("nothing-found")`를 씁니다. `@semcore/illustration`의 같은 이름 함수는 외부 주소를 돌려주므로 쓰지 않습니다.
- 국기 스타일은 `styles.css`에 들어 있고, `UiProvider`가 외부 스타일을 불러오지 않게 막습니다. 그래서 `UiProvider`로 앱을 감싸는 것이 필수입니다.

## 알려진 문제

- Node 24.11.1은 한글이 든 폴더 경로에서 폴더 삭제(`fs.rmSync`)가 메시지 없이 멈춥니다. 이 저장소는 영문 경로에 둡니다.
- 폰트 파일은 자주 쓰는 글자만 담은 공식 웹용(Subset) 파일입니다. 여기에 없는 드문 글자는 맑은 고딕으로 표시됩니다.
- `@semcore/ui`가 끌어오는 `dompurify`에 중간 등급 보안 경고가 있습니다. `BulkTextarea`에서만 쓰입니다.

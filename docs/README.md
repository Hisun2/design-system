# 규칙 문서 작성 안내

`docs/`는 디자인 시스템의 규칙 문서 사이트입니다. 예시는 그림이 아니라 실제 컴포넌트(`@ec21rnc/ui`)로 그립니다.

```sh
npm run docs               # 문서 사이트 (http://localhost:5198)
npm run check:docs         # 모든 페이지를 그려 보고 오류가 나는 페이지를 알려 줌
npm run check:docs table   # 경로에 "table"이 든 페이지만 검사
```

## 페이지 추가하는 법

`docs/src/pages/<묶음>/<이름>.jsx` 파일을 만들면 목차에 자동으로 들어갑니다. 묶음 폴더는 `start`, `principles`, `style`, `layout`, `writing`, `components`, `table`, `filter`, `charts`, `patterns`, `utils`입니다.

기준 예시는 `docs/src/pages/components/button.jsx`입니다. 새 페이지는 이 파일을 보고 같은 모양으로 씁니다.

```jsx
import React from "react";
import { Button } from "@ec21rnc/ui";
import { Page, Section, Sub, P, Rules, Table, Demo, DoDont, Code, Swatch } from "../../kit.jsx";

export const meta = { title: "Button" }; // order를 주면 그 순서, 없으면 제목 가나다순

export default function ButtonPage() {
  return (
    <Page meta={meta} lead="한두 문장으로 이것이 무엇인지 적습니다.">
      <Section title="종류">...</Section>
    </Page>
  );
}
```

### 쓸 수 있는 부품 (`docs/src/kit.jsx`)

| 부품 | 쓰임 |
|---|---|
| `Page` | 페이지 한 장. `meta`, `lead` |
| `Section` / `Sub` | 큰 구역(h2) / 작은 구역(h3). `title` |
| `P` | 문단 |
| `Rules` | 규칙 목록. `items`는 문자열 또는 JSX의 배열 |
| `Table` | 표. `head`는 문자열 배열, `rows`는 칸 배열의 배열 |
| `Demo` | 실제 컴포넌트 예시 상자. `caption`, `column`(세로 배치), `gray`(회색 바탕) |
| `DoDont` | 이렇게 씁니다 / 쓰지 않습니다. `good`, `bad`는 `{ demo?, text }` |
| `Code` | 코드·토큰 이름 표기 |
| `Swatch` | 토큰 색 견본. `token="text-primary"` |
| `Figure` | 컴포넌트가 없는 것을 설명하는 그림 상자. 직접 그린 `<svg>`를 넣고 색은 토큰으로 줌. `caption` |

이 부품 밖의 HTML 태그나 직접 쓴 CSS는 쓰지 않습니다. 필요한 배치는 `@ec21rnc/ui`의 `Flex`, `Box`로 합니다.

## 화면으로 확인하기

`npm run check:docs`는 오류 없이 그려지는지만 봅니다. 글자가 겹치거나, 눌러도 반응이 없거나, 차트가 비어 보이는 문제는 잡지 못합니다.
예시를 쓰거나 고친 뒤에는 실제 브라우저로 찍은 화면을 봅니다. 방법은 `scripts/shot-docs.mjs` 맨 위에 적혀 있습니다.
눌러서 바뀌는 예시(탭, 기간 선택, 범례)는 눌러 본 뒤의 화면도 확인합니다.

## 내용 규칙

1. **우리 말로 씁니다.** Intergalactic 문서는 어떤 주제를 다뤄야 하는지 알기 위한 참고 자료입니다. 문장을 옮기거나 번역하지 않습니다. 규칙의 뜻을 이해한 뒤 우리 결정에 맞춰 새로 씁니다. Intergalactic 문서의 그림도 쓰지 않습니다.
2. **문체는 합쇼체**입니다("~합니다", "~씁니다"). 짧게 끊어 씁니다. 한 문장에 규칙 하나.
3. **빼지 않습니다.** 참고 자료가 다루는 주제(구성, 종류, 크기, 상태, 여백, 동작, 쓰는 법)는 모두 다룹니다. 지금 쓰지 않을 것 같다는 이유로 빼지 않습니다. 다만 Semrush 제품에만 해당하는 내용(SEO 용어, Semrush 요금제 등)은 사내 업무 시스템에 맞는 예로 바꿉니다.
4. **페이지 순서**: 설명(lead) → 구성 → 종류·색 → 크기 → 상태 → 동작 → 글자 → 쓰는 법(`DoDont`) → 다른 컴포넌트와의 구분. 해당 없는 구역은 건너뜁니다.
5. **예시 글자는 한국어**로, 일반적인 업무 낱말을 씁니다(거래처, 문서, 승인, 담당자 등). 특정 시스템 이름(이노잉, ERP, 모아)과 실제 사람·회사 이름은 쓰지 않습니다.
6. **예시는 작게.** 규칙 하나를 보여 주는 데 필요한 만큼만 넣습니다. 팝업류(모달, 드롭다운, 옆 패널)는 처음부터 열어 두지 말고 버튼을 눌러 열게 합니다.
7. 색·크기를 말할 때는 값 대신 토큰 이름을 적습니다(`--ec-text-secondary`). 값은 `tokens/tokens.json`에서 확인합니다.
8. 컴포넌트는 `@ec21rnc/ui`(차트는 `@ec21rnc/ui/chart`)에서만 불러옵니다. 차트의 축 범위를 정하는 `scaleLinear`, `scaleBand` 등도 `@ec21rnc/ui/chart`에서 불러옵니다. `@semcore/...`에서 직접 불러오지 않습니다. 아이콘(`@semcore/icon/<이름>/m`)과 그림 컴포넌트(`@semcore/illustration/<이름>`)만 예외입니다. 그림의 주소가 필요하면 `@ec21rnc/ui`의 `getIllustrationPath`를 씁니다.
9. 다 쓴 뒤 `npm run check:docs <묶음>/<이름>`이 통과해야 합니다.

## 우리가 이미 정한 것

문서 전체가 아래 결정과 어긋나지 않아야 합니다.

**색**
- 화면의 틀(상단바, 메뉴, 카드)은 흰색과 회색만 씁니다. 색은 세 곳에만 씁니다: 누를 수 있는 것(Blue), 상태(성공·위험·주의), 데이터(차트 색).
- 주요 색: Blue `--ec-control-primary-info`. Navy(`--ec-brand-navy`)와 Orange(`--ec-brand-orange`)는 로고와 작은 강조에만 씁니다. Orange는 글자에 쓰지 않습니다.
- 상태: 초록=끝났고 문제없음, 파랑=진행 중, 노랑=사람이 봐야 함, 빨강=문제 있음, 보라=검토, 회색=시작 전. 데이터의 상태는 `StatusTag`(`status`: success, progress, warning, critical, review, neutral)로 표시합니다.
- 차트 색은 `--ec-chart-1`부터 `--ec-chart-24`까지 번호 순서대로 씁니다. 1~6이 기본이고 7~12는 진한 단계, 13~18은 연한 단계, 19~24는 가장 진한 단계입니다.
- 글자와 배경의 대비는 4.5:1 이상. 색만으로 뜻을 전하지 않습니다.

**글자**
- 글꼴은 Spoqa Han Sans Neo. 굵기는 400(본문), 500(버튼·태그·큰 숫자), 700(제목)뿐입니다. 600은 없습니다.
- 크기 번호는 100=12px, 200=14px(본문 기본), 300=16px, 350=18px, 400=20px, 500=24px(페이지 제목), 600=32px, 700=36px, 800=48px.

**모양**
- 컨트롤 높이는 M 32px(기본), L 44px. 모서리 6px.
- 태그 높이는 M 20px, L 28px, XL 40px. 양 끝이 둥근 모양.
- 배지(Badge)는 기능의 상태 표시 전용이고 종류가 여섯 가지로 고정입니다: 관리자(admin), 알파(alpha), 베타(beta), 신규(new), 서비스 예정(soon), 사용 불가(unavailable). 문구를 바꿀 수 없습니다.
- 카드는 테두리·그림자 없이 모서리 12px, 안쪽 여백 24px. 알림 상자는 모서리 8px, 안쪽 여백 16px.
- 모든 간격은 4px의 배수입니다(4, 8, 12, 16, 24, 32).
- 한 화면에서 주요 버튼(`use="primary"`)은 하나만 둡니다.

**글쓰기 (UX 라이팅)**
- 화면 문구는 합쇼체입니다("저장했습니다", "삭제할까요?"). 버튼은 "저장", "삭제"처럼 동작을 나타내는 낱말로 끝냅니다.
- 날짜는 `2026-11-25`, 시간은 24시간제 `14:30`, 숫자는 세 자리마다 쉼표, 금액은 `12,480원`.
- 입력창 이름표 끝에 쌍점(:)을 붙이지 않습니다.

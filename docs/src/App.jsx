// 문서 사이트의 틀: 왼쪽 목차와 본문. 페이지는 pages 폴더에 파일을 추가하면 자동으로 목차에 들어갑니다.
import React from "react";
import { UiProvider, NoticeBubbleContainer } from "@ec21rnc/ui";

// 폴더 이름 → 목차 묶음 이름. 이 순서대로 목차에 나옵니다.
const GROUPS = [
  ["start", "시작하기"],
  ["principles", "핵심 원칙"],
  ["style", "스타일"],
  ["layout", "레이아웃"],
  ["writing", "UX 라이팅"],
  ["components", "컴포넌트"],
  ["table", "테이블"],
  ["filter", "필터"],
  ["charts", "차트"],
  ["patterns", "패턴"],
  ["utils", "유틸"],
];

const modules = import.meta.glob("./pages/**/*.jsx", { eager: true });
const pages = Object.entries(modules)
  .map(([path, mod]) => {
    const [, group, slug] = path.match(/\.\/pages\/([^/]+)\/(.+)\.jsx$/);
    return { group, slug, route: `/${group}/${slug}`, meta: mod.meta, Component: mod.default };
  })
  .sort((a, b) => (a.meta.order ?? 999) - (b.meta.order ?? 999) || a.meta.title.localeCompare(b.meta.title, "ko"));

const useRoute = () => {
  const read = () => decodeURIComponent(window.location.hash.replace(/^#/, "")) || pages[0]?.route;
  const [route, setRoute] = React.useState(read);
  React.useEffect(() => {
    const on = () => {
      setRoute(read());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
};

export default function App() {
  const route = useRoute();
  // "#/__all": 모든 페이지를 한 번에 그려 실패한 예시가 없는지 확인할 때 씁니다.
  const shown = route === "/__all" ? pages : pages.filter((p) => p.route === route);
  return (
    <UiProvider>
      <NoticeBubbleContainer />
      <div className="doc-top">
        <b>EC21 R&amp;C 디자인 시스템</b>
      </div>
      <div className="doc-wrap">
        <nav className="doc-nav" aria-label="목차">
          {GROUPS.map(([dir, label]) => {
            const items = pages.filter((p) => p.group === dir);
            if (!items.length) return null;
            return (
              <React.Fragment key={dir}>
                <h4>{label}</h4>
                {items.map((p) => (
                  <a key={p.route} href={`#${p.route}`} className={p.route === route ? "on" : undefined}>
                    {p.meta.title}
                  </a>
                ))}
              </React.Fragment>
            );
          })}
        </nav>
        <main className="doc-main">
          {shown.length ? shown.map((p) => <p.Component key={p.route} />) : <p>페이지를 찾을 수 없습니다.</p>}
        </main>
      </div>
    </UiProvider>
  );
}

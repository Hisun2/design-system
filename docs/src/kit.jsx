// 규칙 문서 페이지를 쓸 때 쓰는 공통 부품입니다. 모든 페이지는 이 부품만으로 구성합니다.
import React from "react";

/** 예시 하나가 실패해도 페이지 전체가 멈추지 않게 감쌉니다. */
export class Guard extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return <span className="doc-failed" data-failed>예시 표시 실패: {String(this.state.error.message).slice(0, 200)}</span>;
    }
    return this.props.children;
  }
}

/** 페이지 한 장. meta는 같은 파일에서 export한 것을 그대로 넘깁니다. */
export function Page({ meta, lead, children }) {
  return (
    <article data-page={meta.title}>
      <h1>{meta.title}</h1>
      {lead ? <p className="doc-lead">{lead}</p> : null}
      {children}
    </article>
  );
}

/** 큰 구역(h2). */
export function Section({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

/** 작은 구역(h3). */
export function Sub({ title, children }) {
  return (
    <>
      <h3>{title}</h3>
      {children}
    </>
  );
}

/** 문단. */
export const P = ({ children }) => <p>{children}</p>;

/** 규칙 목록. items는 문자열 또는 JSX의 배열. */
export const Rules = ({ items }) => (
  <ul>
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

/** 표. head는 문자열 배열, rows는 칸 배열의 배열(칸은 문자열 또는 JSX). */
export const Table = ({ head, rows }) => (
  <div className="doc-table-wrap">
    <table className="doc-table">
      <thead>
        <tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, r) => (
          <tr key={r}>{row.map((cell, c) => <td key={c}>{cell}</td>)}</tr>
        ))}
      </tbody>
    </table>
  </div>
);

/** 실제 컴포넌트 예시 상자. caption은 상자 위 설명, column은 세로 배치, gray는 회색 바탕. */
export const Demo = ({ caption, column, gray, children }) => (
  <div className={`doc-demo${column ? " column" : ""}${gray ? " gray" : ""}`} data-demo>
    {caption ? <span className="doc-demo-cap">{caption}</span> : null}
    <Guard>{children}</Guard>
  </div>
);

/** 이렇게 씁니다 / 이렇게 쓰지 않습니다. good·bad는 { demo?: JSX, text: 문자열 }. */
export const DoDont = ({ good, bad }) => (
  <div className="doc-dd">
    <div>
      <b>이렇게 씁니다</b>
      {good.demo ? <div className="row"><Guard>{good.demo}</Guard></div> : null}
      {good.text}
    </div>
    <div className="bad">
      <b>이렇게 쓰지 않습니다</b>
      {bad.demo ? <div className="row"><Guard>{bad.demo}</Guard></div> : null}
      {bad.text}
    </div>
  </div>
);

/** 코드·토큰 이름 표기. */
export const Code = ({ children }) => <code>{children}</code>;

/** 토큰 색 견본. token은 "text-primary"처럼 앞머리 없는 이름. */
export const Swatch = ({ token }) => <span className="doc-swatch" style={{ background: `var(--ec-${token})` }} />;

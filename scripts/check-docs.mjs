// 문서 페이지를 하나씩 그려 보고, 오류가 나는 페이지를 알려 줍니다.
// 실행: npm run check:docs            (전체)
//       npm run check:docs components (경로에 이 글자가 든 페이지만)
import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "docs");
const filter = process.argv[2] ?? "";
const files = [];
const walk = (dir, rel) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) walk(join(dir, e.name), `${rel}/${e.name}`);
    else if (e.name.endsWith(".jsx")) files.push(`${rel}/${e.name}`);
  }
};
walk(join(root, "src", "pages"), "/src/pages");

const server = await createServer({ root, logLevel: "error", server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom" });
const { UiProvider } = await server.ssrLoadModule("@ec21rnc/ui");

let failed = 0;
const targets = files.filter((f) => f.includes(filter)).sort();
for (const file of targets) {
  try {
    const mod = await server.ssrLoadModule(file);
    if (!mod.meta?.title) throw new Error("meta.title이 없습니다.");
    if (typeof mod.default !== "function") throw new Error("기본 내보내기가 컴포넌트가 아닙니다.");
    const html = renderToString(React.createElement(UiProvider, null, React.createElement(mod.default)));
    if (html.includes("data-failed")) throw new Error("예시 표시 실패가 있습니다.");
  } catch (error) {
    failed += 1;
    console.log(`실패  ${file}\n      ${String(error?.message ?? error).split("\n")[0].slice(0, 300)}`);
  }
}
await server.close();
console.log(`${targets.length}개 페이지 중 ${targets.length - failed}개 정상, ${failed}개 실패`);
process.exit(failed ? 1 : 0);

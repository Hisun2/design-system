// @semcore/ui가 제공하는 모든 컴포넌트를 우리 패키지 이름으로 다시 내보내는 파일을 만듭니다.
// Intergalactic 버전을 올린 뒤 다시 실행합니다: npm run gen
import { readdirSync, existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ui = join(root, "node_modules", "@semcore", "ui");
const header = "// 자동 생성 파일입니다. 직접 고치지 말고 npm run gen 을 실행하세요.\n";

// 따로 내보내는 것: 무겁거나 추가 설치가 필요한 것
const SUBPATH = { "d3-chart": "chart", "mini-chart": "chart", "feedback-form": "feedback-form" };
const SKIP = new Set(["core", "icon"]); // core는 내부용, 아이콘은 README의 방법으로 하나씩 불러옵니다.
const RENAME = { "base-components:Ellipsis": "EllipsisMeasure", "product-head:Info": "ProductHeadInfo", "product-head:Title": "ProductHeadTitle", "widget-empty:Error": "WidgetError", "tooltip:Hint": "TooltipHint", "skeleton:default": "Skeleton" };
// src/extras.js가 패키지 안의 그림을 쓰도록 감싼 것으로 대신 내보내는 이름
const REPLACED = new Set([
  "widget-empty:NoData", "widget-empty:Error", "widget-empty:getIconPath",
  "errors:AccessDenied", "errors:Maintenance", "errors:PageError", "errors:PageNotFound", "errors:ProjectNotFound", "errors:getIconPath",
  "illustration:getIllustrationPath",
]);
const pascal = (s) => s.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());

const files = { index: [], chart: [], "feedback-form": [] };
const taken = { index: new Map(), chart: new Map(), "feedback-form": new Map() };
const skipped = [];

for (const name of readdirSync(ui).sort()) {
  if (SKIP.has(name) || !existsSync(join(ui, name, "index.mjs"))) continue;
  const target = SUBPATH[name] ?? "index";
  const mod = await import(`@semcore/ui/${name}`);
  const parts = [];
  for (const key of Object.keys(mod).sort()) {
    if (/^(wrap|__)/.test(key)) continue; // 내부 도우미
    if (REPLACED.has(`${name}:${key}`)) continue;
    const exported = RENAME[`${name}:${key}`] ?? (key === "default" ? pascal(name) : key);
    if (taken[target].has(exported)) { skipped.push(`${name}.${key} (${exported}: ${taken[target].get(exported)}에 이미 있음)`); continue; }
    taken[target].set(exported, name);
    parts.push(key === exported ? key : `${key} as ${exported}`);
  }
  if (parts.length) files[target].push(`export { ${parts.join(", ")} } from "@semcore/ui/${name}";`);
}

files.index.push('export * from "./extras.js";');
for (const [file, lines] of Object.entries(files)) {
  const body = header + lines.join("\n") + "\n";
  writeFileSync(join(root, "src", `${file}.js`), body, "utf8");
  writeFileSync(join(root, "src", `${file}.d.ts`), body, "utf8");
}
console.log(`내보낸 이름: 기본 ${taken.index.size}개, 차트 ${taken.chart.size}개, 피드백 폼 ${taken["feedback-form"].size}개`);
if (skipped.length) console.log(`이름이 겹쳐 건너뜀:\n  ${skipped.join("\n  ")}`);

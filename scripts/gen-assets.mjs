// 그림과 국기를 외부 서버가 아니라 우리 패키지 안에서 불러오도록, 설치된 Intergalactic에서 파일을 복사해 옵니다.
// Intergalactic 버전을 올린 뒤 다시 실행합니다: npm run gen
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const semcore = join(root, "node_modules", "@semcore");
const assets = join(root, "src", "assets");
const generated = join(root, "src", "generated");
const header = "자동 생성 파일입니다. 직접 고치지 말고 npm run gen 을 실행하세요.";

rmSync(assets, { recursive: true, force: true });
mkdirSync(join(assets, "illustrations"), { recursive: true });
mkdirSync(join(assets, "flags"), { recursive: true });
mkdirSync(generated, { recursive: true });

// 1) 일러스트레이션
const svgDir = join(semcore, "illustration", "svg");
const names = readdirSync(svgDir).filter((f) => f.endsWith(".svg")).map((f) => f.slice(0, -4)).sort();
for (const name of names) cpSync(join(svgDir, `${name}.svg`), join(assets, "illustrations", `${name}.svg`));
cpSync(join(semcore, "illustration", "LICENSE"), join(assets, "illustrations", "LICENSE"));

// 2) 국기: 묶음 그림 두 장과, 그 그림을 우리 파일로 가리키게 고친 스타일
const sprites = join(semcore, "flags", "lib", "sprites");
const css = (scale) =>
  readFileSync(join(sprites, `sprite@${scale}x.css`), "utf8").replace(/url\([^)]*\)/g, `url("../assets/flags/sprite@${scale}x.png")`);
for (const scale of [1, 2]) cpSync(join(sprites, `sprite@${scale}x.png`), join(assets, "flags", `sprite@${scale}x.png`));
cpSync(join(semcore, "flags", "LICENSE"), join(assets, "flags", "LICENSE"));
const css1 = css(1);
const marker = css1.match(/\.flag-(\d+_\d+_\d+)\s*\{/)?.[1];
if (!marker) throw new Error("국기 스타일에서 버전 표시를 찾지 못했습니다.");
if (/semrush\.com/.test(css1 + css(2))) throw new Error("국기 스타일에 외부 주소가 남아 있습니다.");
writeFileSync(
  join(generated, "flags.css"),
  `/* ${header} */\n${css1}\n@media (min-resolution: 2dppx) {\n${css(2)}\n}\n`,
  "utf8",
);

// 3) 코드에서 쓰는 주소 목록
writeFileSync(
  join(generated, "assets.js"),
  [
    `// ${header}`,
    "// Flags 컴포넌트는 이 이름의 요소가 head에 있으면 외부 스타일을 불러오지 않습니다.",
    `export const FLAGS_MARKER = "_css-style-flags-${marker}";`,
    "",
    "export const illustrations = {",
    ...names.map((n) => `  ${n}: new URL("../assets/illustrations/${n}.svg", import.meta.url).href,`),
    "};",
    "",
  ].join("\n"),
  "utf8",
);
console.log(`그림 ${names.length}개, 국기 묶음 2장 복사. 국기 표시 이름: _css-style-flags-${marker}`);

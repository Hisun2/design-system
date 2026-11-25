// tokens.json + intergalactic-map.json -> src/generated/{tokens,theme}.css
// 실행: npm run tokens
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const root = join(dir, "..");
const read = (p) => readFileSync(p, "utf8");
const { prefix, base, semantic } = JSON.parse(read(join(dir, "tokens.json")));
const map = JSON.parse(read(join(dir, "intergalactic-map.json")));

const header = "/* 자동 생성 파일입니다. 직접 고치지 말고 tokens 폴더의 json을 고친 뒤 npm run tokens를 실행하세요. */";
const refTo = (owner, value, table) =>
  value.replace(/\{([^}]+)\}/g, (_, ref) => {
    if (!(ref in table)) throw new Error(`"${owner}"가 없는 토큰 "${ref}"를 가리킵니다.`);
    return `var(--${prefix}-${ref})`;
  });

// 1) 우리 토큰
const tokensCss = [
  header,
  ":root {",
  "  /* 기본 토큰: 색 원본. 화면 코드에서는 직접 쓰지 않습니다. */",
  ...Object.entries(base).map(([k, v]) => `  --${prefix}-${k}: ${v};`),
  "",
  "  /* 의미 토큰: 화면 코드에서는 이것만 씁니다. */",
  ...Object.entries(semantic).map(([k, v]) => `  --${prefix}-${k}: ${refTo(k, v, base)};`),
  "}",
  "",
].join("\n");

// 2) Intergalactic 토큰을 우리 토큰에 연결
const themeCss = [
  header,
  ":root {",
  ...Object.entries(map).map(([k, v]) => `  --intergalactic-${k}: ${refTo(k, v, semantic)};`),
  "}",
  "",
].join("\n");

const out = join(root, "src", "generated");
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "tokens.css"), tokensCss, "utf8");
writeFileSync(join(out, "theme.css"), themeCss, "utf8");

console.log(`우리 토큰: 기본 ${Object.keys(base).length}개, 의미 ${Object.keys(semantic).length}개`);

// 3) 연결표 점검: Intergalactic 토큰 전체와 비교해, 연결하지 않은 것을 이유별로 셉니다.
const light = join(root, "node_modules", "@semcore", "theme", "lib", "light.css");
if (!existsSync(light)) {
  console.log("Intergalactic이 설치되어 있지 않아 연결표 점검은 건너뜁니다.");
} else {
  const theirs = new Map([...read(light).matchAll(/--intergalactic-([a-z0-9-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
  const unknown = Object.keys(map).filter((k) => !theirs.has(k));
  if (unknown.length) throw new Error(`Intergalactic에 없는 이름: ${unknown.join(", ")}`);

  const isColor = (v) => /oklch|#[0-9a-f]{3,8}\b|rgb|transparent/i.test(v);
  // 색감이 있는 값인지: 채도가 있거나, Intergalactic이 강조색으로 쓰는 거의 검정이거나, 흰색이 아닌 16진수 색
  const hasHue = (v) =>
    [...v.matchAll(/oklch\((?:from oklch\()?([\d.]+) ([\d.]+) ([\d.]+)(?: \/ ([\d.]+))?/g)].some(
      ([, , c, h, alpha]) => Number(c) >= 0.03 && !(alpha && Number(h) > 225 && Number(h) < 250),
    ) || /oklch\(0\.2[23] 0\.00[89] 245\)/.test(v) || /#(?!f{6}\b)[0-9a-f]{6}\b/i.test(v);
  const kind = (name, value) => {
    if (!isColor(value)) return "색이 아닌 값 (간격·크기·시간 등)";
    if (/^brand-(facebook|google|instagram|pinterest|twitter|youtube)/.test(name)) return "외부 서비스 로고 색 (바꾸면 안 됨)";
    if (name.includes("invert")) return "어두운 배경 위의 흰색·밝은 색";
    return hasHue(value) ? "색감이 있는데 연결하지 않음" : "회색·그림자 (색감 없음)";
  };
  const left = {};
  for (const [name, value] of theirs) if (!(name in map)) (left[kind(name, value)] ??= []).push(name);
  console.log(`Intergalactic 토큰 ${theirs.size}개 중 ${Object.keys(map).length}개 연결. 연결하지 않은 것:`);
  for (const [k, names] of Object.entries(left)) console.log(`  ${k} ${names.length}개`);
  const miss = left["색감이 있는데 연결하지 않음"];
  if (miss) console.log(`  -> ${miss.join(", ")}`);
}

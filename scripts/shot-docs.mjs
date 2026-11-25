// 문서 사이트의 한 화면을 실제 브라우저(ego-browser)로 열어 찍습니다. 눈으로 봐야 보이는 문제를 확인할 때 씁니다.
//
// 1) 문서 사이트를 켭니다: npm run docs  (http://localhost:5198)
// 2) scripts/.shot-<이름>.json 에 할 일을 적습니다:
//    { "hash": "/charts/donut", "out": "C:/.../donut.png",
//      "scrollTo": "가운데 숫자",        // (선택) 이 글자가 든 제목·예시로 스크롤
//      "click": "추세",                   // (선택) 이 글자가 든 버튼·선택 요소를 누름
//      "eval": "document.title" }         // (선택) 페이지 안에서 실행해 결과를 출력할 식
// 3) 실행합니다(이름이 a 라면):
//    ego-browser nodejs -e "await import('file:///C:/Users/swhs9/Node/design-system/scripts/shot-docs.mjs?job=a&t=1')"
//    같은 주소를 다시 실행하면 캐시된 결과가 나오므로 t 값을 매번 바꿉니다.
const fs = await import("node:fs/promises");
const url = new URL(import.meta.url);
const jobName = url.searchParams.get("job") ?? "default";
const dir = decodeURIComponent(url.pathname).replace(/^\/([A-Za-z]:)/, "$1").replace(/\/[^/]+$/, "");
const job = JSON.parse(await fs.readFile(`${dir}/.shot-${jobName}.json`, "utf8"));

const spaceName = `docs-shot-${jobName}`;
const existing = (await listTaskSpaces()).find((s) => s.name === spaceName);
const task = existing ? (existing.ownership === "user" ? await claimTaskSpace(existing.id) : await taskSpace(existing.id)) : await taskSpace(spaceName);
const page = (await task.pages())[0] ?? (await task.adopt((await task.tabs())[0].page));

await page.goto(`http://localhost:5198/?t=${Date.now()}#${job.hash}`, { timeout: 60000 });
await page.waitForTimeout(job.wait ?? 5000);

const report = await page.evaluate(({ scrollTo, click }) => {
  const out = { failed: document.querySelectorAll("[data-failed]").length };
  const find = (text, selector) => [...document.querySelectorAll(selector)].find((el) => el.textContent.includes(text));
  if (scrollTo) {
    const el = find(scrollTo, "h2, h3, .doc-demo-cap") ?? find(scrollTo, "[data-demo]");
    out.scrolled = Boolean(el);
    el?.scrollIntoView({ block: "start" });
    window.scrollBy(0, -70);
  }
  if (click) {
    const candidates = [...document.querySelectorAll("button, [role=button], [role=tab], [role=radio], [role=combobox], label, [data-ui-name='Pills.Item']")];
    const visible = candidates.filter((el) => { const r = el.getBoundingClientRect(); return r.width && r.top >= 0 && r.top < innerHeight && el.textContent.includes(click); });
    const el = visible[0];
    out.clicked = el ? el.textContent.trim().slice(0, 30) : null;
    el?.click();
  }
  return out;
}, { scrollTo: job.scrollTo, click: job.click });
await page.waitForTimeout(job.click ? 1500 : 300);
if (job.eval) report.eval = await page.evaluate(job.eval);
if (job.out) await page.screenshot({ path: job.out });
console.log(JSON.stringify(report));

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const src = fileURLToPath(new URL("../src", import.meta.url));

export default defineConfig({
  plugins: [react()],
  // 시험 화면은 설치된 패키지 대신 바로 옆의 src를 봅니다.
  resolve: {
    alias: [
      { find: "@ec21rnc/ui/styles.css", replacement: `${src}/styles.css` },
      { find: "@ec21rnc/ui/chart", replacement: `${src}/chart.js` },
      { find: "@ec21rnc/ui/feedback-form", replacement: `${src}/feedback-form.js` },
      { find: "@ec21rnc/ui", replacement: `${src}/index.js` },
    ],
  },
  server: { fs: { allow: [".."] } },
});

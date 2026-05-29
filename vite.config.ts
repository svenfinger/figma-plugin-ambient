import { resolve } from "node:path";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  root: resolve(__dirname, "ui"),
  plugins: [viteSingleFile()],
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    rollupOptions: {
      treeshake: {
        moduleSideEffects(id) {
          return id.includes("@rogieking/figui3");
        },
      },
    },
  },
});

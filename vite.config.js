import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import { copyFileSync } from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),
    {
      name: "copy-types",
      closeBundle: () => {
        copyFileSync("src/index.d.ts", "dist/index.d.ts");
      },
    },
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    lib: {
      entry: "src/index.jsx", // Entry point utama
      name: "vnzru-markdown_editor",
      formats: ["es", "cjs", "umd"], // Format output yang umum digunakan
      fileName: (format) => `vnzru-markdown_editor.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-markdown",
        "rehype-raw",
        "remark-gfm",
      ], // Hindari membundel React untuk mencegah duplikasi
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});

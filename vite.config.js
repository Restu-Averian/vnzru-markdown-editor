import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({ open: false })],
  build: {
    sourcemap: false,
    lib: {
      entry: "src/index.jsx", // Entry point utama
      name: "vnzru-markdown_editor",
      formats: ["es", "cjs", "umd"], // Format output yang umum digunakan
      fileName: (format) => `vnzru-markdown_editor.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"], // Hindari membundel React untuk mencegah duplikasi
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});

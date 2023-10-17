import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config//
export default defineConfig({
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        "@assets": path.resolve(__dirname, "./src/assets")
      },
    },
    plugins: [react()],
  });
  
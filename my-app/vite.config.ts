import { defineConfig } from "vite";

export default defineConfig({
  // Base path (use "/my-app/" if deploying to a sub-folder)
  base: "/",

  // Dev server settings
  server: {
    port: 3000,   // change default from 5173
    open: true,   // auto-open browser

    // Forward /api requests to your backend (avoids CORS issues in dev)
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },

  // Production build settings
  build: {
    outDir: "dist",
    sourcemap: true,
  },

  // Path aliases — import from "@/utils" instead of "../../utils"
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite({ autoCodeSplitting: true })],
  resolve: {
    alias: {
      "@web": path.resolve(__dirname, "./src"),
    },
  },
});

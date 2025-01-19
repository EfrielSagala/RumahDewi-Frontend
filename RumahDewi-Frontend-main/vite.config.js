import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/rooms": {
        target: "http://localhost:4002", // Alamat backend
        changeOrigin: true,
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({ base: '/portfolio/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          r3f: ["@react-three/fiber", "@react-three/drei"],
          motion: ["framer-motion"],
          lenis: ["lenis"],
        },
      },
    },
  },
  server: {
    port: 5173,
  },
});

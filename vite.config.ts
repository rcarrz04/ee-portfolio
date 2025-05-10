import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_URL || "/ee-portfolio/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    assetsDir: "assets",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name][extname]",
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            'react-router',
            '@tanstack/react-query',
            'sonner',
            'lucide-react',
            'class-variance-authority',
            'tailwind-merge',
            'clsx',
            '@radix-ui/react-slot',
            '@radix-ui/react-label',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-avatar',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-aspect-ratio'
          ]
        }
      }
    }
  },
});

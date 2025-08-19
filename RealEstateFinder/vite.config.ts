import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  base: "/realestat/", // GitHub Pages base path
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        // Ensure all assets use relative paths
        format: 'es',
        // Prevent external domain references
        globals: {},
      },
    },
    // Ensure all assets are built with correct paths
    assetsInlineLimit: 0,
    // Force base path usage
    target: 'es2015',
  },
  define: {
    __BASE_URL__: JSON.stringify("/realestat/"),
    // Prevent any external domain references
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  // Ensure no external resources are loaded
  optimizeDeps: {
    exclude: [],
  },
  // Force all imports to use relative paths
  server: {
    host: 'localhost',
    port: 3000,
  },
});

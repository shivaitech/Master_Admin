import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5176,
    hmr: {
      overlay: false  // Disable error overlay for better UX
    }
  },
  base: "/",
  
  // Configuration for widget builds with WASM support
  build: {
    rollupOptions: {
      output: {
        // Don't inline all dynamic imports to avoid resource issues
        inlineDynamicImports: false,
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['react-icons'],
          admin: [
            './src/Admin/Dashboard/DashboardLayout.jsx',
            './src/Admin/Dashboard/DashboardOverview/DashboardHome.jsx'  
          ]
        }
      },
    },  
    // Increase chunk size warning limit


    chunkSizeWarningLimit: 1000,
    // Optimize dependencies
    target: 'esnext',
    minify: 'esbuild',  // Use esbuild instead of terser
  },

  // Include WASM files as assets
  assetsInclude: ["**/*.wasm"],
  
  // Ensure proper handling of dynamic imports
  optimizeDeps: {
    exclude: ["@vonage/noise-suppression"],
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-icons/ri'
    ]
  },
  
  // Handle CSS imports better
  css: {
    devSourcemap: true,
  },
});

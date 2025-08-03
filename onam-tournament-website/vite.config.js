import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // The address of your Flask backend
        changeOrigin: true,
        secure: false, // Use 'false' since the backend is running on http
        // Optional: rewrite the path if your backend routes don't have '/api' prefix
        // rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
})

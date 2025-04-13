import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": [path.resolve(__dirname, "./src")], // 設置路徑代表的東西
    },
  },
  server: {
    watch: {
      ignored: ['**/db.json'], // 忽略特定路徑的文件，避免後端影響前端
    }
  },
})

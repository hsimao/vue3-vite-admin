import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/'
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 全域引入 variable
        additionalData: `
          @import "./src/assets/style/variable.scss";
          @import "./src/assets/style/mixins.scss";
        `
      }
    }
  }
})

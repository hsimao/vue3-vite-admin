import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents from 'vite-plugin-components'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  },
  plugins: [vue(), ViteComponents()],
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

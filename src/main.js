import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'

console.log(import.meta.env)

createApp(App).use(ElementPlus).mount('#app')

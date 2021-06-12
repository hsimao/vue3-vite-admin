import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from 'axios'
import config from './config'

axios.get(config.mockApi + '/login').then((res) => {
  console.log('api res', res)
})

console.log(import.meta.env)

createApp(App).use(router).use(ElementPlus).mount('#app')

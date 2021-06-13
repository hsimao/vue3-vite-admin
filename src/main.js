import { createApp } from 'vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'
import request from './api/request'
import api from './api'
import storage from './utils/storage'

const app = createApp(App)

app.config.globalProperties.$request = request
app.config.globalProperties.$api = api
app.config.globalProperties.$storage = storage

app.use(router).use(store).use(ElementPlus).mount('#app')

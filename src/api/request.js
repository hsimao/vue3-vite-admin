import axios from 'axios'
import config from '@/config'
import router from '@/router'
import { hasProperty } from '@/utils'
import { ElMessage } from 'element-plus'

const TOKEN_INVALID = 'Token 認證失敗, 請重新登入'
const NETWORK_ERROR = '網路請求異常，請稍後重試'

const service = axios.create({
  baseURL: config.mock ? config.mockApi : config.baseApi,
  timeout: 8000
})

service.interceptors.request.use((req) => {
  const headers = req.headers
  if (!headers.Authorization) {
    headers.Authorization = 'Bear aaa'
  }
  return req
})

service.interceptors.response.use((res) => {
  switch (res.data.code) {
    case 200:
      return res.data

    // 請求失敗一律調用成功 resolve, 即可省略 try catch, 或 .catch 語法
    // 調用時可直接判斷 code 或 data 是否有值來判斷是否成功
    case 50001:
      ElMessage.error(TOKEN_INVALID)
      setTimeout(() => {
        router.push('/login')
      }, 1500)
      return Promise.resolve(res.data || {})
    default:
      ElMessage.error(res.data.msg || NETWORK_ERROR)
      return Promise.resolve(res.data || {})
  }
})

const request = (options) => {
  options.method = options.method || 'get'

  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
    delete options.data
  }

  // 提供單獨設定某 api mock 為 false 的情境
  if (hasProperty(options, 'mock')) {
    service.defaults.baseURL = options.mock ? config.mockApi : config.baseApi
  }

  return service(options)
}

/*
將原本調用方法
return request({
  url: '/login',
  method: 'get',
  data: params,
})

擴展成可用以下方法
request.get('login', params, options)
request.post('login', data, options)
*/
;['get', 'post', 'put', 'delete', 'patch'].forEach((method) => {
  request[method] = (url, data, options) => {
    return request({ url, data, method, ...options })
  }
})

export default request

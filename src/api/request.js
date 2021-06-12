import axios from 'axios'
import config from '../config'
import router from '../router'
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
  const { code, data, msg } = res.data

  switch (code) {
    case 200:
      return data
    case 40001:
      ElMessage.error(TOKEN_INVALID)
      setTimeout(() => {
        router.push('/login')
      }, 1500)
      return Promise.reject(TOKEN_INVALID)
    default:
      ElMessage.error(msg || NETWORK_ERROR)
      return Promise.reject(msg || NETWORK_ERROR)
  }
})

const request = (options) => {
  options.method = options.method || 'get'

  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
    delete options.data
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

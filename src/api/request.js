import axios from 'axios'
import config from '@/config'
import storage from '@/utils/storage'
import { hasProperty } from '@/utils'
import errorHandler from './errorHandler'

const service = axios.create({
  baseURL: config.mock ? config.mockApi : config.baseApi,
  timeout: 8000
})

service.interceptors.request.use((req) => {
  const headers = req.headers
  const { token } = storage.getItem('userInfo')
  if (!headers.authorization && token) {
    headers.authorization = `Bearer ${token}`
  }
  return req
})

service.interceptors.response.use(
  (res) => {
    return res.data.code === 200
      ? res.data
      : Promise.resolve(errorHandler(res.data))
  },
  (err) => {
    // 請求失敗一律調用成功 resolve, 即可省略 try catch, 或 .catch 語法
    // 調用時可直接判斷 code 或 data 是否有值來判斷是否成功
    return Promise.resolve(errorHandler(err.response.data))
  }
)

const mockSetting = (options) => {
  const hasMockProperty = hasProperty(options, 'mock')
  const isMock = hasMockProperty && options.mock

  // api 有獨立配置 mock 屬性才需進入此判斷, 否則預設使用初始的 config.baseApi
  if (hasMockProperty) {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  } else {
    service.defaults.baseURL = config.baseApi
  }
}

const request = (options) => {
  options.method = options.method || 'get'

  // 提供單獨設定某 api mock 為 false 的情境
  mockSetting(options)

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
  request[method] = (url, data, otherOptions) => {
    return request({ url, data, method, ...otherOptions })
  }
})

export default request

const env = import.meta.env.MODE || 'production'
const EnvConfig = {
  development: {
    baseApi: '/',
    mockApi:
      'https://www.fastmock.site/mock/5a43111788188a7ff3b1d28431be3016/api'
  },
  test: {
    baseApi: '//test.futurefe.com/api',
    mockApi:
      'https://www.fastmock.site/mock/5a43111788188a7ff3b1d28431be3016/api'
  },
  production: {
    baseApi: '//futurefe.com/api',
    mockApi:
      'https://www.fastmock.site/mock/5a43111788188a7ff3b1d28431be3016/api'
  }
}
export default {
  env,
  mock: true,
  storageNamespace: 'admin-v1',
  ...EnvConfig[env]
}

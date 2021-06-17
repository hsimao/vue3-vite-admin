import { ElMessage } from 'element-plus'
import router from '@/router'

const TOKEN_INVALID = 'Token 認證失敗, 請重新登入'
const NETWORK_ERROR = '網路請求異常，請稍後重試'

const makeErrorData = (res) => {
  return { data: res.data }
}

export default function (res) {
  switch (res.code) {
    case 50001:
      ElMessage.error(TOKEN_INVALID)
      setTimeout(() => {
        router.push('/login')
      }, 1500)
      return makeErrorData(res)
    default:
      ElMessage.error(res.msg || NETWORK_ERROR)
      return makeErrorData(res)
  }
}

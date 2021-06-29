import { ElMessage } from 'element-plus'
import { debounce } from 'throttle-debounce'
import router from '@/router'

const TOKEN_INVALID = 'Token 認證失敗, 請重新登入'
const NETWORK_ERROR = '網路請求異常，請稍後重試'

const debounceMessage = debounce(300, (message) => {
  ElMessage.error(message)
})

export default function (res) {
  switch (res.code) {
    case 50001:
      debounceMessage(TOKEN_INVALID)
      setTimeout(() => {
        router.push('/login')
      }, 1500)
      return res
    default:
      debounceMessage(res.msg || NETWORK_ERROR)
      return res
  }
}

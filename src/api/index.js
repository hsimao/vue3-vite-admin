import request from './request'
import users from './users'

export default {
  ...users,
  login(data) {
    return request.post('users/login', data)
  },
  getNoticeCount() {
    return request.get('leave/count', {}, { mock: true })
  },
  getMenuList() {
    return request.get('menu/list', {}, { mock: true })
  }
}

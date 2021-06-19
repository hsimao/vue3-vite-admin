import request from './request'

export default {
  login(data) {
    return request.post('users/login', data)
  },
  getNoticeCount() {
    return request.get('leave/count', { mock: true })
  },
  getMenuList() {
    return request.get('menu/list', { mock: true })
  }
}

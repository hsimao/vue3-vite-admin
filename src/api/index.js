import request from './request'

export default {
  login(data) {
    return request.post('users/login', data)
  },
  getNoticeCount() {
    return request.get('leave/count')
  },
  getMenuList() {
    return request.get('menu/list')
  }
}

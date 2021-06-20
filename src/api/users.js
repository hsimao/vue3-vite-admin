import request from './request'

export default {
  getUserList(data) {
    return request.get('users/list', data, { mock: true })
  },
  deleteUsers(userIds) {
    return request.post('users/delete', { userIds }, { mock: true })
  }
}

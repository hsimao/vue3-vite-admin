import request from './request'

export default {
  getUserList(data) {
    return request.get('users/list', data, { mock: false })
  },
  deleteUsers(userIds) {
    return request.post('users/delete', { userIds }, { mock: true })
  },
  createUser(data) {
    return request.post('users/create', data, { mock: true })
  }
}

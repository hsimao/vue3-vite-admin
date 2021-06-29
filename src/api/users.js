import request from './request'

const userPrefix = 'users/'

export default {
  getUserList(data) {
    return request.get(`${userPrefix}list`, data, { mock: false })
  },
  deleteUsers(userIds) {
    return request.delete(`${userPrefix}delete`, { userIds }, { mock: false })
  },
  createUser(data) {
    return request.post(`${userPrefix}create`, data, { mock: false })
  },
  editUser(data) {
    return request.post(`${userPrefix}edit`, data, { mock: false })
  }
}

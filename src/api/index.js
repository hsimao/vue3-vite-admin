import request from './request'

export default {
  login(params) {
    return request.post('users/login', params)
  }
}

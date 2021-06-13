import storage from '../utils/storage'

const state = {
  userInfo: storage.getItem('userInfo')
}

export default state

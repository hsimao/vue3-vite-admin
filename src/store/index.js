import { createStore, createLogger } from 'vuex'
import state from './state'
import mutations from './mutations'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

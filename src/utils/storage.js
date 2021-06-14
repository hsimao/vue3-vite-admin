import config from '@/config'

export default {
  getStorage() {
    return JSON.parse(localStorage.getItem(config.storageNamespace) || '{}')
  },
  getItem(key) {
    return this.getStorage()[key]
  },
  setItem(key, val) {
    const storage = this.getStorage()
    storage[key] = val
    localStorage.setItem(config.storageNamespace, JSON.stringify(storage))
  },
  clearItem(key) {
    const storage = this.getStorage()
    delete storage[key]
    localStorage.setItem(config.storageNamespace, JSON.stringify(storage))
  },
  clearAll() {
    localStorage.clear()
  }
}

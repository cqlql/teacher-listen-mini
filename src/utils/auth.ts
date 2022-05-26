import { getStorage } from './storage'

export function hasLogin() {
  try {
    const value = getStorage('token')
    if (value) {
      return true
    }
  } catch (e) {
    // Do something when catch error
  }
}

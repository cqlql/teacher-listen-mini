import Taro from '@tarojs/taro'

/**
 * pageTemp: 页面跳转临时参数，比如用于 wx.navigateBack 传参数*
 * userId 登录用户ID
 * campusId 登录用户所属校区
 * */
type keyName = 'openid' | 'token' | 'refreshToken' | 'userId' | 'pageTemp' | 'campusId'

/**
 *
 * @param k key name
 * @returns 不存在返回空字符串
 */
export function getStorage<T = string>(k: keyName): '' | T {
  return Taro.getStorageSync(k)
}

export function setStorage(k: keyName, value) {
  Taro.setStorageSync(k, value)
}

export function removeStorage(k: keyName) {
  Taro.removeStorageSync(k)
}

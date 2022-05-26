import Taro from '@tarojs/taro'

/**
 * pageTemp: 页面跳转临时参数，比如用于 wx.navigateBack 传参数
 *
 * userId 登录用户ID
 * */
type keyName = 'openid' | 'token' | 'userId' | 'pageTemp'

/**
 *
 * @param k key name
 * @returns 不存在返回空字符串
 */
export function getStorage(k: keyName): '' | string {
  return Taro.getStorageSync(k)
}

export function setStorage(k: keyName, value) {
  Taro.setStorageSync(k, value)
}

export function removeStorage(k: keyName) {
  Taro.removeStorageSync(k)
}

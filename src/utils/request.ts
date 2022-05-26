import type { RequestConfig } from '@/types/request'
import Taro, { request } from '@tarojs/taro'
import { getStorage } from './storage'

export const servers = {
  api: 'https://app.shenduedu.com',
  // sms: 'http://sms.lwk.com',
}

export async function requestPlus(options: Taro.request.Option, config: RequestConfig = {}) {
  const { urlPrefixName = 'api', hasUrlPrefix = true, fail = () => {} } = config
  options.header = {
    'X-Sd-token': getStorage('token'),
    ...options.header,
  }

  if (hasUrlPrefix) {
    options.url = servers[urlPrefixName] + options.url
  }

  const {
    data,
  }: {
    data: {
      status: number
      code: number | string
      message: 'ok'
      result: any
      data: any
    }
  } = await request(options)

  if (data.code === 0 || data.status === 200) {
    return data.result
  }

  // token 过期
  if (data.status === 401) {
    Taro.redirectTo({
      url: '/pages/login/index',
    })
  }

  fail(data.message)

  return Promise.reject(new Error(data.message))
}

export function post(url, data?, config?: RequestConfig) {
  return requestPlus(
    {
      method: 'POST',
      url,
      data,
    },
    config,
  )
}

export function get(url, data?, config?: RequestConfig) {
  return requestPlus(
    {
      method: 'GET',
      url,
      data,
    },
    config,
  )
}

// post.uc = function (url, data) {
//   return post(url, data, 'uc');
// };
// get.uc = function (url, data?) {
//   return get(url, data, 'uc');
// };

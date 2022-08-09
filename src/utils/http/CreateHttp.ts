import Taro, { request } from '@tarojs/taro'
import { getStorage, setStorage } from '../storage'

// interface HttpRequest {
//   new (): CreateHttp
//   post: () => Promise<any>
//   get: () => Promise<any>
// }

const TOKEN_KEY = 'X-Sd-token'

interface ResultType {
  code: number
  message: string
  result: any
}

interface RequestOptions {
  apiUrl: string // 'http://test.io',
  urlPrefix: string // '/api',

  // 是否显示 错误消息
  // errorMessageShow: boolean
  // 是否携带token
  withToken: boolean

  // 错误回调
  fail: (message: string) => void

  // 是否显示错误消息提示
  showErrorToast: boolean

  resultTransform: (data: any) => ResultType

  // 是否开启 RefreshToken 功能
  allowRefreshToken: boolean

  refreshToken: () => Promise<any>
}

export interface RequestOptionsNullable {
  apiUrl?: string // 'http://test.io',
  urlPrefix?: string // '/api',

  // 是否显示 错误消息
  // errorMessageShow: boolean
  // 是否携带token
  withToken?: boolean

  // 错误回调
  fail?: (message: string) => void

  // 是否显示错误消息提示
  showErrorToast?: boolean

  allowRefreshToken?: boolean

  resultTransform?: (data: any) => ResultType

  refreshToken?: () => Promise<any>
}

export default class CreateHttp {
  requestOptions: RequestOptions
  constructor(requestOptions?: RequestOptionsNullable) {
    this.requestOptions = {
      // 默认值
      ...{
        apiUrl: '',
        urlPrefix: '',
        withToken: true,
        fail() {},
        showErrorToast: true,
        allowRefreshToken: false,
        resultTransform: (data: any) => data,
        async refreshToken() {},
      },
      ...requestOptions,
    }
  }

  async request(
    requestConfig: Taro.request.Option,
    requestOptions?: RequestOptionsNullable,
  ): Promise<any> {
    const newRequestOptions: RequestOptions = {
      ...this.requestOptions,
      ...requestOptions,
    }

    const header: TaroGeneral.IAnyObject = (requestConfig.header = requestConfig.header || {})

    // token
    if (newRequestOptions.withToken) {
      header[TOKEN_KEY] = getStorage('token')
    }

    const res = await request({
      ...requestConfig,
      url: newRequestOptions.apiUrl + newRequestOptions.urlPrefix + requestConfig.url,
    })

    const { code, message, result } = newRequestOptions.resultTransform(res.data)

    if (code === 200) {
      return result
    }

    // 处理 token 过期
    if (code === 401) {
      // RefreshToken 情况
      if (newRequestOptions.allowRefreshToken) {
        await newRequestOptions.refreshToken()
        // 重新请求
        return this.request(requestConfig, {
          ...requestOptions,
          allowRefreshToken: false, // 重复请求如果还是token过期，将不再 RefreshToken
        })
      }

      // 不需要刷新token情况
      setStorage('token', '')
      setStorage('refreshToken', '')
      Taro.redirectTo({
        url: '/pages/login/auth',
      })
      return Promise.reject(new Error(message))
    }

    newRequestOptions.fail(message)

    if (newRequestOptions.showErrorToast) {
      Taro.showToast({
        title: message,
        icon: 'error',
      })
    }

    return Promise.reject(new Error(message))
  }

  post(requestConfig: Taro.request.Option, requestOptions?: RequestOptionsNullable): Promise<any> {
    requestConfig.method = 'POST'

    return this.request(requestConfig, requestOptions)
  }

  get(requestConfig: Taro.request.Option, requestOptions?: RequestOptionsNullable): Promise<any> {
    requestConfig.method = 'GET'

    return this.request(requestConfig, requestOptions)
  }
}

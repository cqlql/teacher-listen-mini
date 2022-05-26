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
}

interface RequestOptionsNullable {
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

  resultTransform?: (data: any) => ResultType
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
        resultTransform: (data: any) => data,
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

    requestConfig.url = newRequestOptions.apiUrl + newRequestOptions.urlPrefix + requestConfig.url

    const res = await request(requestConfig)

    const { code, message, result } = newRequestOptions.resultTransform(res.data)

    if (code === 200) {
      return result
    }

    if (code === 401) {
      setStorage('token', '')
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

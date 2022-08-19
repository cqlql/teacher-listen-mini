import Taro, { request } from '@tarojs/taro'
import getSign from './getSign'
import { getStorage, setStorage } from '../storage'

// interface HttpRequest {
//   new (): CreateHttp
//   post: () => Promise<any>
//   get: () => Promise<any>
// }

const TOKEN_KEY = 'Authorization'

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

  resultTransform: (data: any, res: Taro.request.SuccessCallbackResult<any>) => ResultType

  // 是否开启 RefreshToken 功能
  allowRefreshToken: boolean

  // 请求参数删除 undefined
  reqDataRemoveUndefined: boolean

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

  reqDataRemoveUndefined?: boolean

  resultTransform?: RequestOptions['resultTransform']

  refreshToken?: () => Promise<any>
}

function removeUndefined(obj: Record<string, any>) {
  if (obj instanceof Object) {
    const newObj = {}
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) {
        newObj[key] = value
      }
    }
    return newObj
  }

  return obj
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
        reqDataRemoveUndefined: false,
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

    let token = ''
    if (newRequestOptions.withToken) {
      token = getStorage('token')
      header[TOKEN_KEY] = 'Bearer ' + token
    }

    let reqData = requestConfig.data
    if (reqData && newRequestOptions.reqDataRemoveUndefined) {
      reqData = removeUndefined(reqData)
    }

    header['Sign'] = getSign(reqData, token)

    const res = await request({
      ...requestConfig,
      data: reqData,
      url: newRequestOptions.apiUrl + newRequestOptions.urlPrefix + requestConfig.url,
    })

    const { code, message, result } = newRequestOptions.resultTransform(res.data, res)

    if (code === 200) {
      return result
    }

    // 处理 token 过期
    if (code === 401) {
      // RefreshToken 情况
      if (newRequestOptions.allowRefreshToken) {
        try {
          await newRequestOptions.refreshToken()
          // 重新请求
          return this.request(requestConfig, {
            ...requestOptions,
            allowRefreshToken: false, // 重复请求如果还是token过期，将不再 RefreshToken
          })
        } catch (error) {
          console.error('❌ -- refreshToken', error)
        }
      }

      // 不需要 RefreshToken 或者 RefreshToken 出错情况执行
      // 清理登录信息并跳到登录页
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

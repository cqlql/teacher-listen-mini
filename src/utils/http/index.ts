import { getStorage, setStorage } from '../storage'
import CreateHttp from './CreateHttp'

// const apiUrl = 'https://app.shenduedu.com'
export const apiUrl = 'https://lecture.api.shenduedu.com'

export async function refreshToken() {
  const { accessToken } = await httpV2.post(
    {
      url: '/101',
      data: {
        refreshToken: getStorage('refreshToken'),
      },
    },
    {
      allowRefreshToken: false,
      withToken: false,
      showErrorToast: false,
    },
  )

  setStorage('token', accessToken)
}

/*
code:'200',
message: '',
data: {}
 */
export const httpV3 = new CreateHttp({
  apiUrl,
  // urlPrefix: '/api',

  // 结果数据格式统一
  resultTransform(data) {
    const codeMap = {
      // token 过期，将重新登录
      403: 401,
    }

    return {
      code: codeMap[data.code] || Number(data.code),
      message: data.message,
      result: data.data,
    }
  },
})

/*
status:200,
message: '',
result: {}
 */
export const httpV1 = new CreateHttp({
  apiUrl,
  // urlPrefix: '/api',

  // 结果数据格式统一
  resultTransform(data) {
    const codeMap = {
      // token 过期，将重新登录
      403: 401,
    }

    return {
      code: codeMap[data.status] || data.status,
      message: data.message,
      result: data.result,
    }
  },
})

export const httpV2 = new CreateHttp({
  apiUrl,
  // urlPrefix: '/api',

  allowRefreshToken: true,

  refreshToken,

  // 结果数据格式统一
  resultTransform(data, res) {
    let code = data.Basis?.Code

    // 部分接口不是通过 res.data 返回的 401，而是直接报的401错误
    if (res.statusCode === 401) {
      code = 401
    }

    return {
      code,
      message: data.Basis?.Msg || '',
      result: data.Result,
    }
  },
})

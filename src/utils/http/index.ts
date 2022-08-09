import { getStorage, setStorage } from '../storage'
import CreateHttp from './CreateHttp'

// const apiUrl = 'https://app.shenduedu.com'
const apiUrl = 'http://ting.api.weifos.com'

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

  async refreshToken() {
    const { accessToken } = await httpV2.post(
      {
        url: '/api/101',
        data: {
          refreshToken: getStorage('refreshToken'),
        },
      },
      {
        allowRefreshToken: false,
      },
    )

    setStorage('token', accessToken)
  },

  // 结果数据格式统一
  resultTransform(data) {
    return {
      code: data.Basis.Code,
      message: data.Basis.Msg,
      result: data.Result,
    }
  },
})

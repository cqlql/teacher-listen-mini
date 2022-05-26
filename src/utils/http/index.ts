import CreateHttp from './CreateHttp'

const apiUrl = 'https://app.shenduedu.com'

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

/**
  thmType 缩略图类型 0:不创建，1:创建小图，2:创建中图，3:创建中图和小图
  bizType 业务类型 
  OpenCoursesProcess 业务ID 当前公开课ID
 */

// import { get } from '@/utils/request'
// import type { QiniuTokenResult } from './model/uploadModel'
import type { UploadTask } from '@tarojs/taro'
import Taro, { uploadFile } from '@tarojs/taro'
import { getStorage } from '@/utils/storage'
import { refreshToken } from '@/utils/http'
import { clearLoginInfoJumpLogin, TOKEN_KEY } from '@/utils/http/CreateHttp'
import getSign from '@/utils/http/getSign'

export interface UploadResult {
  id: string
  url: string
}

const UploadUrlBase = 'http://ting.res.weifos.com'
const UploadApi = '/100'

// export async function getQiniuToken(): Promise<QiniuTokenResult> {
//   return get('/pi/v1/storage/qiniu/uptoken?type=50')
// }
// export async function minioPresignedUrl(): Promise<QiniuTokenResult> {
//   return get('/pi/v1/storage/qiniu/uptoken?type=50')
// }

export interface FileUploadParams {
  /**
   * 缩略图类型
   * 0:不创建，1:创建小图，2:创建中图，3:创建中图和小图
   */
  thmType: 0 | 1 | 2 | 3
  /**
   * 业务类型
   */
  bizType?: 'OCAttachment'
  /**
   * 业务id
   * 新增情況业务id给0 ，修改情況业务id给当前公开课id
   */
  OpenCoursesProcess: 0 | number
}
interface FileUploadOptionsRequired {
  progress?: UploadTask.OnProgressUpdateCallback
  allowRefreshToken: boolean
}
export interface FileUploadOptions {
  progress?: FileUploadOptionsRequired['progress']
  allowRefreshToken?: FileUploadOptionsRequired['allowRefreshToken']
}

export function fileUpload(
  tempFilePath: string,
  params: FileUploadParams,
  options?: FileUploadOptions,
): Promise<UploadResult> {
  const newParams: FileUploadParams = {
    bizType: 'OCAttachment',
    ...params,
  }

  const newOptions: FileUploadOptionsRequired = {
    allowRefreshToken: true,
    ...options,
  }

  console.log('🚀 -- newParams', newParams)
  return new Promise(function (resolve, reject) {
    const uploadApiUrl = UploadUrlBase + UploadApi
    const token = getStorage('token')
    const uploadTask = uploadFile({
      url: uploadApiUrl,
      filePath: tempFilePath,
      name: 'file',
      header: {
        [TOKEN_KEY]: 'Bearer ' + token,
        Sign: getSign(undefined, token),
      },
      formData: newParams,
      async success(res) {
        /**res 结构
         *
        {
          data: "{"Basis":{"Code":3,"Sign":"","Msg":"签名失败"},"Result":"d9481dd9cf492c5fcae93fcc8ec922dc"}"
          errMsg: "uploadFile:ok"
          header: {Server: "openresty/1.17.8.2", Date: "Fri, 10 Dec 2021 16:06:55 GMT", Content-Type: "application/json", Content-Length: "76", Connection: "keep-alive", …}
          statusCode: 200
        }
         */

        let errMsg = res.errMsg

        if (res.statusCode === 200) {
          const data: ResultTypeV2 = JSON.parse(res.data)
          const code = data.Basis.Code
          if (code === 200) {
            // 处理正确情况
            console.log('🚀 -- success -- data', data)
            return
          }

          errMsg = data.Basis.Msg

          if (code === 401) {
            res.statusCode = 401
          }

          // const fileId = data.data.id
          // uploadSignature({
          //   type: '1',
          //   name: 'file',
          //   id: fileId,
          // })
          //   .then((res) => {
          //     resolve({
          //       id: fileId,
          //       url: res.presigned_url,
          //     })
          //   })
          //   .catch((e) => {
          //     reject(e)
          //   })
        }

        if (res.statusCode === 401) {
          if (newOptions.allowRefreshToken) {
            try {
              await refreshToken()
              // 重新请求
              return fileUpload(tempFilePath, params, {
                ...options,
                // 重复请求如果还是token过期，将不再 RefreshToken
                allowRefreshToken: false,
              })
                .then(resolve)
                .catch(reject)
            } catch (error) {
              console.error('❌ -- refreshToken', error)
            }
          }
          clearLoginInfoJumpLogin()
        }

        Taro.showToast({
          title: errMsg,
          icon: 'error',
        })
        reject(errMsg)
      },
      fail(res) {
        Taro.showToast({
          title: res.errMsg,
          icon: 'error',
        })
        reject(res.errMsg)
      },
    })

    if (newOptions.progress) {
      uploadTask.progress(newOptions.progress)
      // toast.msg = msg(res.progress)
      // console.log('上传进度', res.progress);
      // console.log('已经上传的数据长度', res.totalBytesSent);
      // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend);
    }
  })
}

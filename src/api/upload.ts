import { get, servers } from '@/utils/request'
import type { QiniuTokenResult, UploadSignatureParams } from './model/uploadModel'
import type { UploadTask } from '@tarojs/taro'
import { uploadFile } from '@tarojs/taro'
import { getStorage } from '@/utils/storage'
import { httpV3 } from '@/utils/http'

export interface UploadResult {
  id: string
  url: string
}

enum Api {
  signature = '/quality/user/v1/presigned-url',
  uploadWX = '/file/v1/upload-for-wx-mini-program',
}

const AppId = '1494860795941629953'

export async function getQiniuToken(): Promise<QiniuTokenResult> {
  return get('/pi/v1/storage/qiniu/uptoken?type=50')
}
export async function minioPresignedUrl(): Promise<QiniuTokenResult> {
  return get('/pi/v1/storage/qiniu/uptoken?type=50')
}

export function uploadSignature(params: UploadSignatureParams) {
  return httpV3.post({
    url: Api.signature,
    data: params,
    header: {
      'X-Sd-App-Id': AppId,
    },
  })
}

export function fileUpload(
  tempFilePath: string,
  progress?: UploadTask.OnProgressUpdateCallback,
): Promise<UploadResult> {
  return new Promise(function (resolve, reject) {
    const uploadApiUrl = servers.api + Api.uploadWX
    const uploadTask = uploadFile({
      url: uploadApiUrl,
      filePath: tempFilePath,
      name: 'file',
      formData: {
        token: getStorage('token'),
        app_id: AppId,
      },
      success(res) {
        /**res 结构
         *
        {
          data: "{"code":"200","data":{"id":1498126259707555840},"message":"ok","success":true}"
          errMsg: "uploadFile:ok"
          header: {Server: "openresty/1.17.8.2", Date: "Fri, 10 Dec 2021 16:06:55 GMT", Content-Type: "application/json", Content-Length: "76", Connection: "keep-alive", …}
          statusCode: 200
        }
         */

        if (res.statusCode === 200) {
          const data: ResultTypeV3 = JSON.parse(res.data)
          const fileId = data.data.id
          uploadSignature({
            type: '1',
            name: 'file',
            id: fileId,
          })
            .then((res) => {
              resolve({
                id: fileId,
                url: res.presigned_url,
              })
            })
            .catch((e) => {
              reject(e)
            })
        } else {
          reject(res.errMsg)
        }
      },
      fail(res) {
        reject(res.errMsg)
      },
    })

    if (progress) {
      uploadTask.progress(progress)
      // toast.msg = msg(res.progress)
      // console.log('上传进度', res.progress);
      // console.log('已经上传的数据长度', res.totalBytesSent);
      // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend);
    }
  })
}

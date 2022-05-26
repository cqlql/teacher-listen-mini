import type { UploadResult } from '@/api/upload'
import { fileUpload, getQiniuToken } from '@/api/upload'
import type { UploadTask } from '@tarojs/taro'
import { uploadFile } from '@tarojs/taro'

function uploadFileQiniu(
  path,
  token,
  base_url,
  progress?: UploadTask.OnProgressUpdateCallback,
): Promise<string> {
  return new Promise(function (resolve, reject) {
    const uploadTask = uploadFile({
      url: 'http://upload.qiniup.com',
      filePath: path,
      name: 'file',
      formData: {
        token,
      },
      success(res) {
        /**res 结构
         *
        {
          data: "{"hash":"FuS2D2BiEN_6vmvDKRwUKiCvLcfV","key":"FuS2D2BiEN_6vmvDKRwUKiCvLcfV"}"
          errMsg: "uploadFile:ok"
          header: {Server: "openresty/1.17.8.2", Date: "Fri, 10 Dec 2021 16:06:55 GMT", Content-Type: "application/json", Content-Length: "76", Connection: "keep-alive", …}
          statusCode: 200
        }
         */

        if (res.statusCode === 200) {
          // 文件路径: base_url + '/' + data.hash
          const data = JSON.parse(res.data)
          resolve(base_url + '/' + data.hash)
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
// function uploadFileMinio(
//   url,
//   path,
//   // token,
//   // base_url,
//   progress?: UploadTask.OnProgressUpdateCallback,
// ): Promise<string> {
//   return new Promise(function (resolve, reject) {
//     const uploadTask = uploadFile({
//       url,
//       filePath: path,
//       name: 'file',
//       // formData: {
//       //   token,
//       // },
//       success(res) {
//         console.log('🚀 -- success -- res', res)
//         /**res 结构
//          *
//         {
//           data: "{"hash":"FuS2D2BiEN_6vmvDKRwUKiCvLcfV","key":"FuS2D2BiEN_6vmvDKRwUKiCvLcfV"}"
//           errMsg: "uploadFile:ok"
//           header: {Server: "openresty/1.17.8.2", Date: "Fri, 10 Dec 2021 16:06:55 GMT", Content-Type: "application/json", Content-Length: "76", Connection: "keep-alive", …}
//           statusCode: 200
//         }
//          */

//         if (res.statusCode === 200) {
//           // 文件路径: base_url + '/' + data.hash
//           // const data = JSON.parse(res.data)
//           // resolve(base_url + '/' + data.hash)
//         } else {
//           reject(res.errMsg)
//         }
//       },
//       fail(res) {
//         reject(res.errMsg)
//       },
//     })

//     if (progress) {
//       uploadTask.progress(progress)
//       // toast.msg = msg(res.progress)
//       // console.log('上传进度', res.progress);
//       // console.log('已经上传的数据长度', res.totalBytesSent);
//       // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend);
//     }
//   })
// }
export default function useFileUpload() {
  return {
    async fileUploadQiniu(
      imgPath: string,
      progress?: UploadTask.OnProgressUpdateCallback,
    ): Promise<string> {
      const { token, base_url } = await getQiniuToken()
      const fileUrl = await uploadFileQiniu(imgPath, token, base_url, progress)

      return fileUrl
      // return new Promise(async function (resolve, reject) {

      // })
    },

    // 上传单个文件
    fileUpload(
      tempFilePath: string,
      progress?: UploadTask.OnProgressUpdateCallback,
    ): Promise<UploadResult> {
      // 模拟上传
      // if (process.env.NODE_ENV !== 'production') {
      //   type Fun2 = (progress: number) => void
      //   function mockUploadPicture(cb2: Fun2, result: string): Promise<string> {
      //     return new Promise(function (resolve) {
      //       let i = 0
      //       function uploading() {
      //         i += 5
      //         cb2(i)
      //         if (i === 100) {
      //           resolve(result)
      //         } else {
      //           setTimeout(uploading, 10)
      //         }
      //       }

      //       uploading()
      //     })
      //   }

      //   return mockUploadPicture(function (p) {
      //     progress?.(p as any)
      //   }, '//ccc-x.jd.com/dsp/nc?ext=aHR0cHM6Ly9wcm9kZXYuamQuY29tL21hbGwvYWN0aXZlLzRFd1lVUjRkbXhpUnBYNXpaUFBMUnNWdFQ4RkYvaW5kZXguaHRtbD9iYWJlbENoYW5uZWw9dHR0Mjg&log=zKcaNFUZkAIkJJ_WaHisgTDvD1Uc20tTAFUqlPthKd-mgkDdqkLJBQNMqhZn8j5NFLH1mvR4v04H2t7NUmKL6wk75NoCDiCd0Eq1V969-Txc4NsZzJyh-fRpS2HT0tU0K3D6JuFWgzPGMq91qdxhfBGNAU9NB-El2eJ1bi7Osjnn3gPO3y37RpeJ-OIrFYRFoLj9HSZ2ikBg4eby9Wy3jy8N6wS-uvar9ZJMbhLFOEbOzWIx5A_pYqIf1ECD7ufUZf4lEGrtOZg8PWbyaAedh6nj1j3OfBbPq_mxp38O6gMP602hOmODKLxuDwihsUpvb0QcontJ_oBy6OZEVpTzmJ9PwDXq9zHJt6qLqmVj7zuCaVHclWceDHFANLaxlgB6MRpGYp-PmbRAlu0rLPxefTuvjXCVxPRJCOhvtL3AO8K7kfe11E9LOhdYCqPtremZvSytdOuREtafUwZCum_v_joI0pG-E9kWGTLkUNz-Q9grnRsySy52IjFOtRQdzcK5aV--LpmsIHJiyAIKCugmzc6RFiYTedeyL7LXu5xrCHzQAegFlcKsRaaWGmgOBIdxXKJyqCzQCcCyN2lQ0pXYoyz_xcBeabkddA7Fgu_epbWdUK1vU2-uIj90v27lEUU6c-MuA4FeuECwNXbKIUy67FZC3ZE96NbeVonA5b-TTusDR5grhtnihpzesRxltHWx-xXvSF0zC00C7QUH3cIzliFFfe7uA219kGxWNCjoGBitKezUnRdmg-3mCldDpSQBUElhyElI6RcrZ5IdknbrUwOf6xkJawFvfRbt9qo6bIyG4wfNvJA0YRzQK1xpVWu4I-h5IdAyaZNRiEvcy6zdiKihnzHR5xCS8rmdBAukcLWb40tHKsUfMtCImI3KMbylMNckTQyk5U9TMiLavjwm_N866SbBwTlSvB2suFDWFTR4WWwWRBhQSnxCtCLQ4yn8iZY8BZa7LoUEUzKjsMnRXUilRYraNSNQeE7HpzSO0S7VIOW3982gNSnGJHIbJcgbDgu6TiHdaR6kn0LM6sxtwVp76An4XipnVPpCaTRhmZ9wmqHdnb6sIU_sFlVTLzMEVo1RcU3z21wEBn6eB4fcSG60pDpBELFOK3e9lBfSisU&v=404')
      // }

      return fileUpload(tempFilePath, progress)
    },

    // 上传多个文件，实际也是依次调用 fileUpload
    // async filesUpload(
    //   tempFiles: Taro.chooseMedia.SuccessCallbackResult['tempFiles'],
    //   progress: (p: number) => void = (_p: number) => {},
    // ) {
    //   const urls: string[] = []
    //   const len = tempFiles.length
    //   for (let index = 0; index < len; index++) {
    //     const chooseMedia = tempFiles[index]

    //     const url = await fileUpload(chooseMedia.tempFilePath, (res) => {
    //       const p = res.progress
    //       progress((index * 100 + p) / (len * 100))
    //     })

    //     urls.push(url)
    //   }

    //   return urls
    // },
  }
}

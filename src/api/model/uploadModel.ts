export type QiniuTokenResult = {
  // http://o50.shenduxuetang.com
  base_url: string
  // deadline: number;
  // size_limit: number;
  token: string
}

export interface UploadSignatureParams {
  type: '1' | '2' // 1 下载 2 上传
  name: string // 文件名
  etag?: string // 文件MD5值, 可选参数
  id?: string // 文件ID,可选参数,文件下载获取签名地址时使用
}
export interface UploadSignatureModel {
  id: string // 文件ID
  to_upload: 'true' | 'false' // 是否还需要上传(当前应用待上传文件的etag已经存在时,会返回false,直接把文件ID保存提交即可)
  etag: string
  presigned_url: string // 签名地址,用于上传或下载文件
}

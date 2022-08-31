import { getStorage } from '@/utils/storage'
import base64url from 'base64url'

export interface UserDataType {
  // aud: "http://lecture.api.shendu.com"
  campus_name: string //"主校区"
  // exp: 1660232677
  // http://schemas.microsoft.com/ws/2008/06/identity/claims/role: "TingAPIRole"
  id: string // '7842'
  // iss: "http://lecture.api.shendu.com"
  login_name: string // "ym001"
  mobile: string
  name: string //"陈理"
  // nbf: 1660232077
  roles: string
  role_codes: string // 权限 code
  school_name: string //"深圳市龙岗区扬美实验学校"
}

export function getTokenInfo(): UserDataType | undefined {
  const token = getStorage('token')
  if (token) {
    return tokenParse<UserDataType>(token)
  }
}

export function tokenParse<T>(token: string) {
  const infoStr = token.split('.')[1]
  const data: T = JSON.parse(base64url.decode(infoStr))
  return data
}

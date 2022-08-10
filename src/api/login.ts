// import Taro, { request } from '@tarojs/taro';
import { httpV2 } from '@/utils/http'
// import type { RequestOptionsNullable } from '@/utils/http/CreateHttp'

interface LoginParams {
  // campus_id_str: string
  // /**学号/工号 */
  // no: string
  // password: string
  // /**0: 未知 1: 学生 2: 老师 */
  // role: number

  /**学校ID */
  schoolId: number
  /**校区ID */
  campusId: number
  /**登录名 */
  loginName: string
  /**密码 */
  pwd: string
}

interface LoginResult {
  // token: string
  // /** 1: 学生   2: 老师 */
  // role: string
  // uid: string
  // username: string

  accessToken: string
  refreshtoken: string
}

export function login(data: LoginParams): Promise<LoginResult> {
  return httpV2.post(
    {
      url: '/100',
      data,
    },
    {
      withToken: false,
      // ...config,
    },
  )
}

interface getCampusParams {
  pageSize: number
  pageIndex: number
  keyword: string
}

export interface Campus {
  id: number
  name: string
  school_id: number
  school_name: string
}

/**
 * 获取校区信息
 * 学校区域选择
 */
export function getCampus(data: getCampusParams): Promise<Campus[]> {
  return httpV2.post(
    {
      url: '/200',
      data,
    },
    {
      withToken: false,
    },
  )
}

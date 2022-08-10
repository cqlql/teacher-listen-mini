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
  // schoolId: number
  /**校区ID */
  campusId: string
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

export interface Campus {
  // campus_id: string;
  campus_id_str: string
  campus_name: string
  /**搜索显示 */
  // name?: string;
  // grades: string;
  // school_id: string;
  // school_id_str: string;
  school_name: string
}

/**
 * 获取校区信息
 * 学校区域选择
 */
export function getCampus(): Promise<Campus[]> {
  return httpV2.post(
    {
      url: '/200',
      data: {
        pageSize: 10,
        pageIndex: 0,
        keyword: '',
      },
    },
    {
      withToken: false,
    },
  )
}

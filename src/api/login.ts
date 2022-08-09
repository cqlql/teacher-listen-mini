// import Taro, { request } from '@tarojs/taro';
import { httpV2 } from '@/utils/http'
import type { RequestOptionsNullable } from '@/utils/http/CreateHttp'

interface LoginResult {
  // token: string
  // /** 1: 学生   2: 老师 */
  // role: string
  // uid: string
  // username: string

  accessToken: string
  refreshtoken: string
}

interface LoginParams {
  // campus_id_str: string
  // /**学号/工号 */
  // no: string
  // password: string
  // /**0: 未知 1: 学生 2: 老师 */
  // role: number

  loginName: string
  pwd: string
}

export function login(data: LoginParams, config: RequestOptionsNullable): Promise<LoginResult> {
  return httpV2.get(
    {
      url: '/api/100',
      data,
    },
    {
      withToken: false,
      ...config,
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
  return httpV2.get({
    url: '/comm/v1/campuses',
  })
}

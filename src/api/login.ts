// import Taro, { request } from '@tarojs/taro';
import type { RequestConfig } from '@/types/request'
import { post, get } from '@/utils/request'

interface LoginResult {
  token: string
  /** 1: 学生   2: 老师 */
  role: string
  uid: string
  username: string
}

export function login(
  data: {
    campus_id_str: string
    /**学号/工号 */
    no: string
    password: string
    /**0: 未知 1: 学生 2: 老师 */
    role: number
  },
  config?: RequestConfig,
): Promise<LoginResult>
export function login(data, config) {
  return post('/comm/v1/campustoken', data, config)
}

/**
 * 直接登录，或者判断是否登录
 *
 */
// export default function getOpenid(data: { appId: string; js_code: string }): Promise<LoginResult>;
// export default function getOpenid(data) {
//   return post('/applets_login/getopenid', data);
// }

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
  return get('/comm/v1/campuses')
}

/* 下拉列表 */

import { httpV1, httpV2 } from '@/utils/http'
import { get } from '@/utils/request'
import type {
  CampusgradeResult,
  CampusinfoResult,
  ClassroomsResult,
  SubjectGroupsResult,
} from './model/selectModel'

/**科目年级列表 */
export function getCampusGradeSelect(): Promise<CampusgradeResult> {
  return httpV1.get({
    url: '/lecture/v1/campusgrade',
  })
}

/**获取该校区对应的年级、班级、科目 */
export function getCampusinfo(): Promise<CampusinfoResult> {
  return httpV2.post({
    url: '/201',
  })
}

/**获取用户所属的科组列表
 * 参数：user_id => 查询的教师用户ID,不提交则默认查询当前用户
 */
export function getSubjectGroups(): Promise<SubjectGroupsResult> {
  return get('/lecture/v1/subjectGroups').then((res) => res.subject_groups)
}

/**授课地点 */
export function getClassrooms(): Promise<ClassroomsResult> {
  return get('/lecture/v1/classrooms').then((res) => res.classrooms)
}

interface CreateListenSelectDataResult {
  periods: {
    // campus_id: 7
    // created_date: '2017-08-15 17:19:46'
    // created_user_id: 1
    // id: 9
    period: number // 1001
    // school_id: 19
    // updated_date: '2017-08-15 17:19:46'
    // updated_user_id: 1
  }[]

  schoolSubjects: {
    // campus_id: 7
    // created_date: '2021-03-18 11:53:55'
    // created_user_id: 1
    // id: 23
    // is_enable: true
    // order_index: 0
    period: number //1001
    // school_id: 19
    subject_id: number // 2
    subject_name: string // '数学'
    // updated_date: '2021-03-18 11:53:55'
    // updated_user_id: 1
  }[]
}

/**创建公开课的选择数据 */
export function getCreateListenSelectData(): Promise<CreateListenSelectDataResult> {
  return httpV2.get({
    url: '/207',
  })
}

/* 下拉列表 */

import { httpV1 } from '@/utils/http'
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
  return httpV1.post({
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

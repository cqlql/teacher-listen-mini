/* 下拉列表 */

import { httpV1, httpV2 } from '@/utils/http'
import { get } from '@/utils/request'
import type {
  CampusgradeResult,
  CampusinfoResult,
  ClassroomsResult,
  CreateListenSelectDataResult,
  GetSemesterSelectDataResult,
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

/**
 * 创建公开课的选择数据
 * @param id 公开课id，新增情况给0
 * @returns
 */
export function getCreateListenSelectData(id: 0 | number): Promise<CreateListenSelectDataResult> {
  return httpV2.get({
    url: '/207',
    data: {
      id,
    },
  })
}

/**获取学期选择数据 */
export function getSemesterSelectData(): Promise<GetSemesterSelectDataResult> {
  return httpV2.get({
    url: '/211',
  })
}

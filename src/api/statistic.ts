import { httpV2 } from '@/utils/http'

/**1：本周，2：本月，3：本学期 */
export type DateRangeType = 1 | 2 | 3

export interface GetMyEvaluationStatisticsResult {
  give_num: number
  indicators: { name: string; num: number }[]
  listen_num: number
}

export interface GetSchoolEvaluationStatisticsResult {
  // give_num: number
  // g_subject: {
  //   'count(1)': number
  //   subject_name: string
  // }[]
  // l_subject: {
  //   'count(1)': number
  //   subject_name: string
  // }
  // listen_num: number
  group_total: {
    give_num: number // 62
    listen_num: number //34
    role_id: number //139
    role_name: string //'中学低段语文'
    sys_user_id: number //8040
    teacher_name: string //'钟洁娜'
  }[]
  roles: {
    created_date: string //'2022-08-26 16:39:17'
    created_user_id: number //7842
    id: number //5
    is_enable: true
    name: string //'科组'
    remarks: string //''
    updated_user_id: number //0
  }[]
  total: {
    give_num_tot: number //65
    listen_num_tot: number //34
  }[]
}

/**我的评课统计 */
export function getMyEvaluationStatistics(data: {
  dateRange: DateRangeType
}): Promise<GetMyEvaluationStatisticsResult> {
  return httpV2.get({
    url: '/215',
    data,
  })
}

/**全校评课统计 */
export function getSchoolEvaluationStatistics(data: {
  dateRange: DateRangeType
}): Promise<GetSchoolEvaluationStatisticsResult> {
  return httpV2.get({
    url: '/221',
    data,
  })
}
export function getSchoolAllEvaluationRecord(
  data: GetSchoolAllEvaluationRecordParams,
): Promise<GetSchoolAllEvaluationRecordResult> {
  return httpV2.get({
    url: '/220',
    data,
  })
}

/**
 * 授课评价统计
 *
 */
export function getEvaluationStatistics(data: {
  userId?: number
  dateRange?: DateRangeType
}): Promise<GetTeachRecordDetailsResult[]> {
  return httpV2.get({
    url: '/223',
    data,
  })
}

/**
 * 科组评课统计
 *
 */
export function getDepartmentEvaluationStatistics(data: {
  dateRange?: DateRangeType
}): Promise<GetTeachRecordDetailsResult[]> {
  return httpV2.get({
    url: '/224',
    data,
  })
}

export interface GetSchoolAllEvaluationRecordParams {
  pageSize: number
  pageIndex: number
  keyword: string
  dateRange: string
}

export interface GetSchoolAllEvaluationRecordResult {
  data: {
    give_num: number //62
    id: number //8040
    listen_num: number //34
    teacher_name: string //"钟洁娜
  }[]
  totalRow: number
}

interface GetTeachRecordDetailsResult {
  name: string
  num: number
}

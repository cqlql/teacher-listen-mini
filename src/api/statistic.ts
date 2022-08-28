import { httpV2 } from '@/utils/http'

/**1：本周，2：本月，3：本学期 */
export type DateRangeType = 1 | 2 | 3

export interface GetMyEvaluationStatisticsResult {
  give_num: number
  indicators: { name: string; num: number }[]
  listen_num: number
}

export interface GetSchoolEvaluationStatisticsResult {
  give_num: number
  g_subject: {
    'count(1)': number
    subject_name: string
  }[]
  l_subject: {
    'count(1)': number
    subject_name: string
  }
  listen_num: number
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
    url: '/219',
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

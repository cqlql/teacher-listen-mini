import { httpV2 } from '@/utils/http'

/**1：本周，2：本月，3：本学期 */
export type DateRangeType = 1 | 2 | 3

/**我的评课统计 */
export function getMyEvaluationStatistics(data: { dateRange: DateRangeType }) {
  return httpV2.get({
    url: '/215',
    data,
  })
}

/**全校评课统计 */
export function getSchoolEvaluationStatistics(data: { dateRange: DateRangeType }) {
  return httpV2.get({
    url: '/219',
    data,
  })
}

import { get } from '@/utils/request'

interface GetVideoListParams {
  /**"prior" 区级优质课 "peer" 联盟校课 "self" 校本课 "expert" 名师讲座 "boutique" 精品课  */
  video_type: 'prior' | 'peer' | 'self' | 'expert' | 'boutique'
  /**分页查询起始位置 */
  offset: string
  /**分页查询条数 */
  list_mun: string
  /**学段ID */
  period_id?: string
  /**科目ID */
  subject_id?: string
  /**课程名称模糊搜索 */
  course_name?: string
}

export function getVideoList(params: GetVideoListParams) {
  return get('/lecture/v1/recordVideoList', params)
}

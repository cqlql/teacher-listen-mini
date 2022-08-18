import type { OpenCourseItemResult } from '@/api/model/courseModel'

/**审批类型: 待审批 | 未通过 | 已通过 */
export type ApprovalStatus = 'pending' | 'failed' | 'passed'

/* 听课申请记录项 */
export interface CreatedCourseItem {
  /** 公开课记录ID */
  id: string
  courseName: string
  userName: string
  subjectName: string
  gradeName: string
  className: string
  date: string
  dateLocal: string
  time: string
  rawData?: OpenCourseItemResult
}

import type { FileObject } from '@/components/FileUpload/types'

export type FormType = Record<string, string>

export interface OpenCourseForm {
  /**公开课名称ID */
  course_id?: string
  /**'公开课测试'; // 公开课名称 */
  course_name: string
  /**学段ID */
  period: string
  /**'1'; // 科目ID */
  subject_id: string
  /** 年级班级ID : ['5601661057566615964','5015483610072272084']  */
  gradeClass: string[]
  /**'2018-01-10 10:20:00''; // 开课日期时间 */
  dateTime: string
  /**'1016730'; // 教室ID, 与 `class_room_name`选一个参数提交 */
  class_room_id: string
  /**'录播室'; // 教室名（上课地点） */
  class_room_name: string
  /**'4679665164583612636'; // 科组ID */
  subject_group_id: string

  /**附件 */
  files: FileObject[]
}

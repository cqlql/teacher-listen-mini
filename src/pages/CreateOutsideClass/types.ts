export type FormType = Record<string, string>
export interface OutsideCourseForm {
  /**公开课ID */
  id?: string

  /**'公开课测试'; // 公开课名称 */
  course_name: string
  /**授课学校 */
  school_name: string
  /**授课老师 */
  teacher_name: string
  /**学段ID */
  period: string
  /**'1'; // 科目ID */
  subject_id: string
  // 授课班级
  teach_target: string
  /**'2018-01-10 10:20:00''; // 开课日期时间 */
  dateTime: string
  /**'录播室'; // 教室名（上课地点） */
  class_room_name: string
}

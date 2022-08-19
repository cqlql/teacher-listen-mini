export interface TopSearchParams {
  subject: string
  subjectShortName: string
  // date: string
  startDate: string
  endDate: string
  // 执行搜索
  search: () => void
}
export default interface CourseItem {
  course_id: string
  user_id: string
  start_time: string
  date_time: string

  user_course_id: string

  subject: string
  userName: string
  courseName: string
  place: string
  date: string
  time: string
  gradClass: string
}

export interface TopSearchParams {
  subject: string
  subjectShortName: string
  // date: string
  startDate: string
  endDate: string
  // 执行搜索
  search: () => void
}

export interface CourseItem {
  course_id: string
  user_id: string
  // start_time: string
  // date_time: string

  subject: string
  userName: string
  courseName: string
  place: string
  date: string
  // time: string
  gradClass: string
  /**0 未添加 1 已添加 */
  is_add: 0 | 1

  type: 'open'
}

export interface AddedCourseItem {
  id: string
  courses_id: string
  user_id: string
  // start_time: string
  // date_time: string
  period: string

  subject: string
  subject_id: string
  userName: string
  courseName: string
  place: string
  date: string
  // time: string
  gradClass: string
  /**  类型 open：公开课 inside：校内课(推门听课) outside：校外课*/
  type: 'open' | 'inside' | 'outside'
  typeName: string

  school_name: string
}

// export interface AddedOutsideCourseItem extends AddedCourseItem {
//   teacher_name: string
//   school_name: string
// }

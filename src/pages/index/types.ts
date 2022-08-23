export interface CourseItemType {
  id: number
  sujectTag: string
  name: string
  user_id: number
  user_name: string
  course_id: number
  subject_id: number
  grade_id: number
  // startDate: string
  start_time: string
  // end_time: string
  // school_name: string
  // campus_name: string
  grade_name: string
  class_name: string
  class_room_name: string
  live_url: string
  files: {
    id: string
    name: string
    url: string
  }[]
  status: {
    id: string
    type: string
    label: string
  }
  type: {
    type: string
    label: string
  }
}

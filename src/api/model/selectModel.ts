export interface CampusgradeResult {
  subjects: {
    period_id: string
    period_name: string
    subject_id: string
    subject_name: string
  }[]
}

export interface CampusinfoResult {
  schoolClasses: {
    campus_id: string
    campus_name: string
    class_id: string
    class_name: string
    grade: string
    grade_id: string
    grade_name: string
    number: string
    school_id: string
    school_name: string
  }[]
}

export type SubjectGroupsResult = {
  subject_group_id: string
  subject_group_name: string
}[]

export type ClassroomsResult = {
  class_room_id: string
  class_room_name: string
}[]

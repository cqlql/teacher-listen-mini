export interface ClassInfoType {
  class: {
    /**'5153040568012195088' */
    id: string
    /**'1003' */
    period_id: string
    /**'2016' */
    year: string
    /**'10' */
    number: string
    /**'8班' */
    alias: string
    /**'53' */
    students_num: string
    /**'' */
    question: string
    /**'' */
    answer: string
    /**'5187489047437737282' */
    school_id: string
    /**'深圳高级中学' */
    school_name: string
    /**'1111' */
    grade_id: string
    /**'高一' */
    grade_name: string
    /**'5215494028518263026' */
    campus_id: string
  }
  subject: {
    /**'5' */
    subject_id: string
    /**'物理' */
    subject_name: string
  }
}

export interface ProfileResult {
  classInfo: ClassInfoType[]
  teacherInfo: {
    /**'444737' */
    id: string
    /**'5187489047437737282' */
    school_id: string
    /**'5215494028518263026' */
    campus_id: string
    /**'1003' */
    period_id: string
    /**'王俊' */
    name: string
    /**'' */
    avatar_url: string
    /**'5270' */
    teacher_code: string

    school_name: string
  }
}

export interface UserSubjectGroupsResult {
  subject_groups: {
    subject_group_id: string
    subject_group_name: string
  }[]
}

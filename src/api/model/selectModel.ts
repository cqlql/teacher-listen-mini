export interface CampusgradeResult {
  subjects: {
    period_id: string
    period_name: string
    subject_id: string
    subject_name: string
  }[]
}

export interface CampusinfoResult {
  classes: {
    campus_id: number //7
    created_date: string
    created_user_id: number //1
    grade_id: number //17
    id: number //36
    is_enable: number //1
    level: number //3
    name: string // "5班"
    no: string // "5"
    oid: number //4641525514111491000
    order_index: number //0
    period: number //1002
    range_num: number //3
    school_id: number //19
    type: number //0
    updated_user_id: number //1
    years: number //2020
  }[]

  grades: {
    campus_id: number //7
    created_date: string //"2020-09-08 15:55:06"
    created_user_id: number //1
    id: number //17
    is_enable: number //1
    level: number //3
    oid: number //4638209926726563000
    order_index: number //0
    period: number //1002
    range_num: number //3
    school_id: number //19
    start_level: number //6
    updated_date: string //"2020-09-08 15:55:06"
    updated_user_id: number //1
    years: number //2020
  }[]

  periods: {
    campus_id: number //7
    // created_date: '2017-08-15 17:19:46'
    created_user_id: number //1
    id: number //9
    // levels: [1, 2, 3, 4, 5, 6]
    period: number //1001
    school_id: number //19
    // updated_date: '2017-08-15 17:19:46'
    // updated_user_id: 1
  }[]

  subjects: {
    campus_id: number //7
    // created_date: '2021-03-18 11:53:55'
    created_user_id: number //1
    id: number //22
    // is_enable: true
    // order_index: 0
    period: number //1001
    school_id: number //19
    subject_id: number //1
    subject_name: string //'语文'
    // updated_date: '2021-03-18 11:53:55'
    // updated_user_id: 1
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

export interface CreateListenSelectDataResult {
  periods: {
    // campus_id: 7
    // created_date: '2017-08-15 17:19:46'
    // created_user_id: 1
    // id: 9
    period: number // 1001
    // school_id: 19
    // updated_date: '2017-08-15 17:19:46'
    // updated_user_id: 1
  }[]

  schoolSubjects: {
    // campus_id: 7
    // created_date: '2021-03-18 11:53:55'
    // created_user_id: 1
    // id: 23
    // is_enable: true
    // order_index: 0
    period: number //1001
    // school_id: 19
    subject_id: number // 2
    subject_name: string // '数学'
    // updated_date: '2021-03-18 11:53:55'
    // updated_user_id: 1
  }[]

  schoolGradeClasses: {
    // campus_id: 7
    // created_date: '2020-09-08 15:55:06'
    // created_user_id: 1
    grade_id: number // 17
    id: number // 36
    // is_enable: true
    name: string //'5班'
    no: string //'5'
    // order_index: 0
    period: number //1002
    // school_id: 19
    // type: 0
    // updated_user_id: 1
    years: number // 2020
  }[]

  classRooms: {
    address: string //'二(5）班教室'
    // campus_id: 7
    // created_date: '2017-10-24 09:15:37'
    // created_user_id: 1
    id: number //1
    // school_id: 19
    // type: 2
    // updated_date: '2017-10-24 09:15:37'
    // updated_user_id: 1
  }[]

  roles: {
    // created_date: '2022-07-27 22:55:19'
    // created_user_id: 1
    id: number //4
    // is_enable: true
    name: string //'校领导'
    // remarks: '121232'
    // updated_user_id: 0
  }[]

  entity: {
    campus_id: number //7
    classes_id: number //2124
    classes_name: string //'1班'
    classes_no: string //'1'
    classes_room_id: number //17
    created_date: string //'2022-08-22 20:30:51'
    created_user_id: number //7842
    e_time: string //'2022-08-22 22:14:14'
    grade_id: number //52
    id: number //14
    is_enable: true
    name: string //'test'
    period: number //1001
    role_id: number //4
    s_time: string //'2022-08-22 21:29:14'
    school_id: number //19
    status: number //0
    subject_id: number //3
    type: number //0
    updated_date: string //'2022-08-23 00:11:31'
    updated_user_id: number //7842
    years: number //2020
  }
}

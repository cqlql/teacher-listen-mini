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

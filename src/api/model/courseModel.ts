export interface AttachmentParams {
  /**附件名称*/
  name: string
  /**附件地址*/
  url: string
  /**附件类型*/
  file_type: string
  /**附件顺序*/
  display_order: string | number
}

/**听课记录 */
// interface RecordItem {
//   content: string //记录内容
//   content_type: 0 | 1 | 2 | 3 //类型 0 :文本，1：手绘图片 , 2：音频 ，3：拍照图片
//   label: 0 | 1 | 2 //标签 0:优点，1：建议，2：普通
//   display_order: number //记录排序
//   time_length?: string //语言时长
// }
// interface RecordItem2 extends RecordItem {
//   page_num?: string //页码
// }

interface TextRecordItem {
  content_label_type: 'body' | 'think'
  content: string
}

export interface FileRecordItemParam {
  content_label_type: 'picture' | 'handwriting' | 'audio' | 'video'
  contents: {
    file_id: string
    url: string
  }[]
}

export type RecordItemParam = TextRecordItem | FileRecordItemParam

/**评分 */
export interface LessonScoreParam {
  dimension_id: string //主维度ID
  dimension_item_id: string //维度子项 ，0 时为主维度ID
  score: string //打分，dimensionitemId = 0，记录平均分
}

export interface LessonScoreItem {
  dimension_id: string //主维度ID
  dimension_name: string //主维度
  dimension_item_id: string //维度子项 ，0 时为主维度ID
  score: string //打分，dimensionitemId = 0，记录平均分
}

// interface DimensionItemParams {
//   dimension_item_id: number; // 子维度ID
// }
// interface DimensionParams {
//   dimension_id: number; // 维度ID
//   diii: DimensionItemParams[];
// }

/**申请公开课 请求参数 */
export interface RequestOpenCourseParams {
  /**'公开课测试'; // 公开课名称 */
  course_name: string
  /**学段ID */
  period: string
  /**'1'; // 科目ID */
  subject_id: string
  /**'5601661057566615964'; // 年级ID */
  grade_id: string
  /**'5015483610072272084'; // 班级ID */
  class_id: string
  /**'2018-01-10'; // 开课日期 */
  lesson_date: string
  /**'10:20:00'; // 开课时间 */
  start_time: string
  /**'1016730'; // 教室ID, 与 `class_room_name`选一个参数提交 */
  class_room_id?: string
  /**'录播室'; // 教室名（上课地点） */
  class_room_name?: string
  /**'4679665164583612636'; // 科组ID */
  subject_group_id: string
  oca: AttachmentParams[]
  // dii: DimensionParams[];
  // is_prior: boolean; // false 普通公开课　true 区级优质观摩课
}
/**编辑公开课 请求参数 */
export interface EditOpenCourseParams extends RequestOpenCourseParams {
  /**公开课名称ID */
  course_id: string
}

export interface FileObject {
  /**文件地址 */
  url: string
  /**文件名 */
  name: string
  /**文件类型标识 */
  type: string
}

export interface RequestOpenCourseForm {
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

/**校外课 form */
export interface RequestOutsideCourseForm {
  /**公开课名称ID */
  course_id?: string
  /**'公开课测试'; // 公开课名称 */
  course_name: string
  /**学段ID */
  period: string
  /**'1'; // 科目ID */
  subject_id: string
  /**'2018-01-10 10:20:00''; // 开课日期时间 */
  dateTime: string

  /** 授课班级 */
  teach_target: string
  /**授课地点 */
  class_room_name: string
}

// 申请公开课记录结果项
export interface OpenCourseItemResult {
  /** 公开课ID */
  id: string
  campus_name: string
  class_id: string
  class_name: string
  class_room_id: string
  class_room_name: string
  end_time: string
  grade_id: string
  grade_name: string
  group_id: string
  group_name: string

  is_self: string
  lesson_date: string
  lesson_id: string
  lesson_name: string
  live_url: string
  /* 课程名称 */
  name: string
  observation: string
  period_id: string
  period_name: string
  relation: string
  school_name: string
  start_time: string
  status: string
  subject_id: string
  subject_name: string
  user_course: string
  user_id: string
  user_name: string
}

// export interface OpenCourseItemClient {
//   date: string
//   time: string
//   dateLocal: string
// }

export interface GetUserCourseResult {
  courselist: {
    /**[]*/
    // LA: string;
    /**"4667067775646393604"*/
    campus_id: string
    /**"主校区"*/
    campus_name: string
    /**"5425945210048457531"*/
    class_id: string
    /**"6班"*/
    class_name: string
    /**"七年级6班"*/
    class_room_name: string
    /**"3749478800558673522"*/
    course_id: string
    /**"21:45:00"*/
    end_time: string
    /**"0"*/
    evaluation_type: string
    /**"1107"*/
    grade_id: string
    /**"七年级"*/
    grade_name: string
    /**"true"*/
    is_self: string
    /**"2021-12-15T00:00:00+08:00"*/
    lesson_date: string
    /**""*/
    live_url: string
    /**"《test》"*/
    name: string
    /**"1"*/
    record_platform: string
    /**"myself"*/
    relation: string
    /**"5703644480394352156"*/
    school_id: string
    /**"深圳市龙岗区扬美实验学校"*/
    school_name: string
    /**"21:00:00"*/
    start_time: string
    /**"0"*/
    status: string
    /**"1"*/
    subject_id: string
    /**"语文"*/
    subject_name: string
    /**"0"*/
    user_course_id: string
    /**"0"*/
    user_evaluation: string
    /**"466954"*/
    user_id: string
    /**"陈理"*/
    user_name: string
  }
}

// 我的听课计划列表

export type userCourseList = {
  campus_id: string
  campus_name: string
  class_id: string
  class_name: string
  class_room_name: string
  course_id: string
  end_time: string
  evaluation_type: string
  grade_id: string
  grade_name: string
  is_self: string
  lesson_date: string
  /**直播听课url */
  live_url: string
  /**课程名 */
  name: string
  record_platform: string
  relation: string
  school_id: string
  school_name: string
  start_time: string
  status: string
  subject_id: string
  subject_name: string
  user_course_id: '0' | string
  user_evaluation: string
  user_id: string
  /**老师名 */
  user_name: string
  /**附件 */
  LA: {
    display_order: string
    file_type: string
    id: string
    name: string
    url: string
  }[]
}[]

// 听课评价 提交
export interface LessonRecordReqData {
  evaluation_id?: string //评价主ID
  course_id: string //课程ID
  campus_id?: string //校区ID
  campus_name?: string //校区名
  school_id?: string // 学校ID
  school_name?: string // 学校名
  type: 0 | 1 //0手机1 纸
  is_open_course: boolean // 是否为公开课,用户区分公开课和普通课
  is_boutique_course: boolean // 是否为精品课
  is_expert_course: boolean // 是否为专家讲座
  lesson_evaluation_text: string // 课堂点评文字
  lesson_record: {
    contents: RecordItemParam[]
  }[]
  //过程记录打分表
  Lesson_score: LessonScoreParam[]
}

// 听课详情结果
export interface LessonRecordResult {
  is_expert: 'true' | 'false'
  lesson_evaluation_text: string
  lesson_records: {
    contents: RecordItemParam[]
  }[]
  // organization_name: string

  /* 听课人 */
  user_id: string
  /* 听课人 */
  user_name: string
}

export interface CourseListParams {
  /**是否查询历史记录 0：查询今天记录  1：查询历史记录 */
  is_history: 0 | 1
  /**每页条数 */
  list_mun: number
  /**起始索引 */
  offset: number
  // 待审批 | 未通过 | 已通过
  status: '0' | '1' | '2'
}

export interface OpenClassListParams {
  /* 校区ID */
  campus_id?: string
  /* 年级ID */
  grade_id?: string
  /* 科目ID */
  subject_id?: string
  /**是否查询历史记录 0：查询今天记录  1：查询历史记录 */
  is_history: 0 | 1

  /* 用于过滤历史记录，只有is_history=1时，此参数生效 */
  lesson_date?: string
  /* 课程类型  0：公开课  1：普通课程(推门听课)，默认0 */
  less_type?: 0 | 1
  /**每页条数 */
  list_mun: number
  /**起始索引 */
  offset: number
  // 待审批 | 未通过 | 已通过
  status: '0' | '1' | '2'

  // ! 时间 - 此参数后端目前没有
  date?: string
}

export interface ApproveOpenClassParams {
  /** 1表示拒绝或撤销, 2表示通过 */
  status: '1' | '2'
  /**公开课ID */
  course_id: string
}

export interface ApproveOpenClassResult {
  /** true  审批成功 */
  success: boolean
  /**
   * 0 没有审批权限
   * 1 提交的课程ID不存在
   * 2 审批有效时间已过
   * 3 后台发生异常
   * */
  type: 0 | 1 | 2 | 3
}

export interface GetUserCourseParams {
  start_date?: string
  end_date?: string
  /**true 倒序   false 正序 */
  order_desc?: 'true' | 'false'
}

export interface AddUserCourse {
  /** 课程ID*/
  course_id: string
  /** 用户ID*/
  user_id: string
  /** 上课日期*/
  date: string
  /** 开始时间*/
  start_time: string
  /** 0（新增）或1（修改），新增时如果已经在指定的日期和时间存在课程会忽略这个请求*/
  status: '0'
}

export interface DimensionListParams {
  // course_id: string
  /**科目ID*/
  subject_id: string

  /**年级ID*/
  grade_id: string

  /**校区ID*/
  campus_id?: string
}

export interface DimensionListResult {
  dimensionList: [
    {
      dimension_id: string //维度ID
      dimension_name: string //维度名称
      display_order: string //顺序
      weight: string //权重（20表示20%）
      item_info: {
        item_id: string //所属维度ID
        item_name: string //维度子项名称
        item_order: string //顺序
      }[]
    },
  ]
}

export interface GetEvaluationListParams {
  /**课程ID */
  course_id: string
  /**评课人ID */
  user_id: string
}

interface AttachItem extends AttachmentParams {
  /**附件ID*/
  id: string
}
interface UserRecordItem {
  user_id: string //过程记录人ID
  user_name: string //记录人
  lesson_evaluation_text: string // 点评
  //记录项列表
  lesson_records: { contents: RecordItemParam[] }[]
}

export interface GetEvaluationListResult {
  /**查询课程的附件列表*/
  attachList: AttachItem[]
  /**获取过程记录 */
  lessonRecordList: UserRecordItem[] | null
  //获取课堂评价
  scoreList: LessonScoreParam[] | null
}

export interface CourseId {
  course_id: string
}
export interface GetAllEvaluationResult {
  courseNum: 1 //听课人数
  attachList: AttachItem[]
  scoreList: LessonScoreParam[]
}

export interface GetAttachListResult {
  attachList: AttachItem[]
}

export interface LessonCountResult {
  lesson_count: number[]
}

export interface CoursesRecordListParams {
  /** 获取每页的条数 */
  list_mun: number
  /** 获取的列表页数 */
  page: number
  /** 用于过滤记录 */
  lesson_date?: string
  /** 课程类型  0：公开课  1：普通课程 */
  less_type?: '0' | '1'
  /** 记录类型 0：查询授课记录 1：查询评课记录 */
  course_type: '0' | '1'
  /** 角色类型  0：个人   1：科组   2：校领导 */
  role_type: '0' | '1' | '2'
  /** 0：普通权限，1：组长权限(领导权限) */
  power: '0' | '1'
  /** 科目ID，不是必填项,只有role_type=1时，方可生效 */
  subject?: string

  search_name?: string
  start_date?: string
  end_date?: string

  /**目标用户 */
  user_id?: string
}

export interface CoursesRecordListResultItem {
  /**"2", //公开课ID */
  id: string
  /**"w", //公开课名称 */
  name: string
  /**"2017-05-13T00:00:00+08:00", //授课时间 */
  lesson_date: string

  // 直播听课地址
  live_url: string

  start_time: string
  /**"语文", //节时名称 */
  lesson_name: string
  /**"1", //科目ID */
  subject_id: string
  /**"12345", //授课人名称 */
  user_name: string
  /**"四年级", //授课年级 */
  grade_name: string
  /**"2班", //授课班级 */
  class_name: string
  /**"394349", //授课人ID */
  user_id: string
  /**"语文" //科目名称 */
  subject_name: string

  is_open_courses: 'true' | 'false'
  is_self: 'true' | 'false'
}

export interface CoursesRecordListResult {
  coursesList: CoursesRecordListResultItem[]
}

export interface AddTempOpenCourseParams {
  course_id?: string
  course_name: string
  subject_id: string
  period: string
  /**授课班级 */
  teach_target: string
  lesson_date: string
  start_time: string
  user_name?: string
  class_room_name: string
  /* false 校外课 true 校内课 */
  is_self: 'true' | 'false'
}

export interface GetListenAndTeachStatisticsParams {
  /** 时间范围  */
  range_type?:
    | 'full_semester'
    | 'this_semester'
    | 'this_month'
    | 'this_week'
    | 'first_semester'
    | 'second_semester'
    | ''
  start_date?: string
  end_date?: string
  /** 分页查询起始位置 起始值 0 */
  offset?: number
  /** 分页查询每页条数  */
  list_mun?: number
  /** 指定教师用户ID查询 */
  user_id?: string
  /** 科组ID*/
  group_id?: string
  /**老师名称过滤 */
  search_name?: string
}

export interface GetListenAndTeachStatisticsResult {
  course_frequence_list: {
    listen_num: string
    teaching_num: string
    total_num: string
    user_id: string
    user_name: string
  }[]
}

export interface GetSubjectGroupsMembersResult {
  count: number
  data: {
    classid: string
    id: string
    isleader: string
    mainid: string
    name: string
    sno: string
    userid: string
  }[]
}

export interface GetFullCourseStatisticsParams {
  role_type?: CoursesRecordListParams['role_type']
  power?: CoursesRecordListParams['power']
  less_type?: CoursesRecordListParams['less_type']
  range_type?: GetListenAndTeachStatisticsParams['range_type']

  /**科目ID */
  subject_id?: string
  /**学段ID */
  period_id?: string
  /**
   * 统计学期的起始年份
   * 当range_type取值为first_semester或者second_semester时，需要这个参数，其余情况不需要，目前取固定值2017,以后根据实际提交
   **/
  start_year?: string
}
export interface GetFullCourseStatisticsResult {
  listenNum: number
  listenSelfNum: number
  statisticsFrequency: {
    campus_id: string
    campus_name: string
    subject_info: {
      subject_id: string
      subject_name: string
      course_info: {
        teaching_num: string
        listen_num: string
      }
    }[]
  }[]
}

export interface GetSubjectGroupsResult {
  count: number
  data: {
    id: string
    name: string
    school_id: string
    campus_id: string
    is_deleted: string
    createdby: string
    createdbyname: string
    createdon: string
    displayorder: string
    // group_members: string[]
  }[]
}

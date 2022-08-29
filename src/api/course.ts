import { httpV1, httpV2, httpV3 } from '@/utils/http'
import type { RequestOptionsNullable } from '@/utils/http/CreateHttp'
import { post, get } from '@/utils/request'
import type {
  AddTempOpenCourseParams,
  AddUserCourse,
  ApproveOpenClassParams,
  ApproveOpenClassResult,
  CourseListParams,
  CoursesRecordListParams,
  CoursesRecordListResult,
  DimensionListParams,
  DimensionListResult,
  GetAllEvaluationResult,
  GetAttachListResult,
  GetFullCourseStatisticsParams,
  GetFullCourseStatisticsResult,
  GetListenAndTeachStatisticsParams,
  GetListenAndTeachStatisticsResult,
  GetSubjectGroupsMembersResult,
  GetSubjectGroupsResult,
  GetUserCourseParams,
  LessonCountResult,
  SaveListenProcessParams,
  LessonRecordResult,
  LessonScoreItem,
  OpenClassListParams,
  OpenCourseItemResult,
  OpenCourseItemResult2,
  RequestOpenCourseParams,
  userCourseList,
  GetEvaluationScoreResult,
  SaveEvaluationScoreReqParams,
  RequestOutsideCourseParams,
  GetPushDoorCourseListResult,
  GetListenDetailsResult,
} from './model/courseModel'

/** 获取听课、授课记录 */
export function coursesRecordList(data: CoursesRecordListParams): Promise<CoursesRecordListResult> {
  if (!data.user_id) {
    delete data.user_id
  }
  if (!data.search_name) {
    delete data.search_name
  }

  return httpV1.get({
    url: '/lecture/v1/coursesrecordlist',
    data,
  })
}

/** 最近一周听课任务 参数range_type=latest_week最近一周,参数默认值（可不提交） */
export function getLessonCount(): Promise<LessonCountResult[]> {
  return httpV2.get({
    url: '/214',
  })
}

/** 申请公开课 */
export function requestOpenCourse(data: RequestOpenCourseParams | RequestOutsideCourseParams) {
  return httpV2.post(
    {
      url: '/208',
      data,
    },
    {
      reqDataRemoveUndefined: true,
    },
  )
}

/** 编辑公开课 */
// export function editOpenCourse(data: EditOpenCourseParams) {
//   return post('/lecture/v1/EditOpenCourse', data)
// }

/** 添加/编辑校外课 */
export function addTempOpenCourse(data: AddTempOpenCourseParams) {
  return post('/lecture/v1/addTempOpenCourse', data)
}

/** 获取开课记录（未审核）*/
export function openCourseList(
  data: CourseListParams,
): Promise<{ listenList: OpenCourseItemResult[] }> {
  return get('/lecture/v2/listenlist', data)
}

/** 公开课列表*/
export function openCourseListV1(
  data: OpenClassListParams,
  config?: RequestOptionsNullable,
): Promise<OpenCourseItemResult2[]> {
  return httpV2.get(
    {
      url: '/202',
      data,
    },
    config,
  )
}

interface GetPushDoorCourseListParams {
  pageSize: number //每页大小
  pageIndex: number //当前页从0开始

  subject_id?: number //科目ID
  classId?: number //班级ID

  period: number // 学段ID 1001 小学 1002 初中 1003 高中
  teacher_name: string //老师名称
}
/**根据条件获取推门听课列表 - 课表数据 */
export function getPushDoorCourseList(
  data: GetPushDoorCourseListParams,
): Promise<GetPushDoorCourseListResult[]> {
  return httpV2.get({
    url: '/203',
    data,
  })
}

/**
 * 审核公开课申请
 */
export function approveOpenCourse(data: ApproveOpenClassParams): Promise<ApproveOpenClassResult> {
  return httpV2.get({
    url: '/212',
    data,
  })
}

/**
 *  公开课申请 使失效
 */
export function revokeOpenCourse(data: { id: string }): Promise<ApproveOpenClassResult> {
  return httpV2.get({
    url: '/213',
    data,
  })
}

/**
 * 当前用户是否有审批权限
 */
export function reqIsLeader(): Promise<{ is_leader: boolean }> {
  return get('/lecture/v1/isLeader')
}

/** 当前用户课程，包括自己的和计划听的 */
export function getUserCourse(data?: GetUserCourseParams): Promise<userCourseList> {
  return httpV2.get({
    url: '/209',
    data,
  })
}

interface GetUserTeachResult {
  class_name: string //'1班'
  class_room_address: string //'B栋一楼六（8）班'
  created_date: string //'2022-08-29 00:17:25'
  created_user_id: number //8040
  e_time: string //'2022-08-29 23:59:59'
  id: number //64
  is_enable: number //1
  name: string //'test8888'
  period: number //1001
  s_time: string //'2022-08-29 23:59:59'
  school_id: number //19
  status: number //10
  subject_id: number //64
  subject_name: string //'英语'
  teacher_id: number //9360
  teacher_name: string //'钟洁娜'
  type: number //0
  years: number //2020
}

/**getUserTeach */
export function getUserTeach(data?: GetUserCourseParams): Promise<GetUserTeachResult[]> {
  return httpV2.get({
    url: '/218',
    data,
  })
}

/** 添加听课计划 */
export function addUserCourse(data: AddUserCourse): Promise<{ usercourse: any[] }> {
  return httpV2.post({
    url: '/204',
    data,
  })
}

/**
 * 移出听课计划
 * @param id 课程id*
 */
export function delUserCourse(id: number) {
  return httpV2.get({
    url: '/210',
    data: { id },
  })
}

/** 保存听课过程（过程记录和打分） */
export function saveListenProcess(data: SaveListenProcessParams) {
  return httpV2.post({
    url: '/205',
    data,
  })
}

/**saveEvaluationScoreReq */
export function saveEvaluationScoreReq(data: SaveEvaluationScoreReqParams) {
  return httpV2.post({
    url: '/206',
    data,
  })
}

/** 听课评价 只有打分 修改？*/
export function subscore(course_id: string) {
  return get('/lecture/v1/subscore', { course_id })
}

/** 获取-维度列表 */
export function dimensionList(data: DimensionListParams): Promise<DimensionListResult> {
  return get('/lecture/v1/dimensionlist', data)
}

// 获取我的听课评价 - 过程记录
export function getProcessRecord(data: { id: number }): Promise<SaveListenProcessParams> {
  return httpV2.get({
    url: '/216',
    data,
  })
}

// 获取我的听课评价 - 评价打分
export function getEvaluationScore(data: { id: number }): Promise<GetEvaluationScoreResult> {
  return httpV2.get({
    url: '/217',
    data,
  })
}

// 获取所有听课评价 - 附件与评分，没有过程记录
export function getAllEvaluation(courseId: string): Promise<GetAllEvaluationResult> {
  return httpV1.get({
    url: '/lecture/v1/allscorelist',
    data: {
      course_id: courseId,
    },
  })
}

/**
 * 获取课程的附件列表
 * @param courseId 课程ID
 * @returns 附件列表
 */
export function getAttachList(courseId: string): Promise<GetAttachListResult> {
  return httpV1.get({
    url: '/lecture/v1/attachlist',
    data: {
      course_id: courseId,
    },
  })
}

/**听课老师名单 */
export function allRecordList(data: {
  course_id: string
}): Promise<{ lessonRecordList: LessonRecordResult[] }> {
  return httpV1.get({
    url: '/lecture/v1/allrecordlist',
    data: data,
  })
}

/**
 * 听课记录详情
 *
 */
export function getRecordList(data: { course_id: string; user_id: string }): Promise<{
  lessonRecordList: LessonRecordResult[]
  scoreList: LessonScoreItem[]
}> {
  return httpV3.get({
    url: '/lecture/v1/list',
    data: data,
  })
}

interface GetListenDetailsParams {
  // 听课记录ID
  id: number
}

/**听课详情 */
export function getListenDetails(data: GetListenDetailsParams): Promise<GetListenDetailsResult> {
  return httpV2.get({
    url: '/219',
    data,
  })
}

/**听授课次数统计 */
export function getListenAndTeachStatistics(
  data: GetListenAndTeachStatisticsParams,
): Promise<GetListenAndTeachStatisticsResult> {
  return httpV1.get({
    url: '/lecture/v1/statsCoursesFrequenceOfACampus',
    data,
  })
}

/**科组列表 */
export function getSubjectGroups(): Promise<GetSubjectGroupsResult> {
  return httpV1.get({
    url: '/lecture/v3/queryEvaluationGroup',
  })
}

/**科组用户列表 */
export function getSubjectGroupsMembers(data: {
  roleId: number
}): Promise<GetSubjectGroupsMembersResult[]> {
  return httpV2.get({
    url: '/222',
    data,
  })
}

/**课程统计 */
export function getFullCourseStatistics(
  data: GetFullCourseStatisticsParams,
): Promise<GetFullCourseStatisticsResult> {
  return httpV1.get({
    url: '/lecture/v1/statisticsv1',
    data,
  })
}

interface GetSubjectGroupsStatisticsParams {
  range_type?: GetListenAndTeachStatisticsParams['range_type']
}
interface GetSubjectGroupsStatisticsResult {
  course_frequence: {
    evaluation_group_id: string
    evaluation_group_name: string
    teaching_num: string
    listen_num: string
  }[]
}

/**科组听授课次数统计 */
export function getSubjectGroupsStatistics(
  data: GetSubjectGroupsStatisticsParams,
): Promise<GetSubjectGroupsStatisticsResult> {
  return httpV1.get({
    url: '/lecture/v1/evaluation_count_by_subject_group',
    data,
  })
}

interface GetDingListenRecordParams {
  // date_start: string
  // date_end: string
  range_type?: GetListenAndTeachStatisticsParams['range_type']
  search_name: string
  offset: number
  list_mun: number
}
interface GetDingListenRecordResult {
  data: {
    courses:
      | {
          class_name: string
          grade_name: string
          id: string
          lesson_date: string
          name: string
          start_time: string
          user_name: string

          recording_resources: {
            file_id: string
            play_url: string
          }[]
        }[]
      | null
  }
}

/**订订听课记录 */
export function getDingListenRecord(
  data: GetDingListenRecordParams,
): Promise<GetDingListenRecordResult> {
  return httpV1.get({
    url: '/lecture/v1/courses_with_recording_resource',
    data,
  })
}

interface GetCreatedCourseInitDataResult {
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
    out_school_name: string //''
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
    // 自定义授课地点
    address: string //''
    att_urls: { url: string }[]
  }
}

export function getCreatedCourseInitData(id: 0 | number): Promise<GetCreatedCourseInitDataResult> {
  return httpV2.get({
    url: '/225',
    data: { id },
  })
}

interface GetTeachRecordDetailsResult {
  entity: {
    campus_id: number //7
    classes_id: number //2124
    classes_name: string //'1班'
    classes_no: string //'1'
    classes_room_id: number //17
    created_date: string //'2022-08-29 10:58:24'
    created_user_id: number //8040
    e_time: string //'2022-08-30 12:43:00'
    grade_id: number //52
    id: number //68
    is_enable: number //true
    name: string //'test'
    period: number //1001
    role_id: number //4
    s_time: string //'2022-08-30 11:58:00'
    school_id: number //19
    status: number //10
    subject_id: number //3
    type: number //0
    updated_date: string //'2022-08-29 10:58:30'
    updated_user_id: number //8040
    years: number //2020
    att_urls?: { url: string }[]
  }
  evals: {
    name: string // "准备充分"
    num: string //1
  }[]
  total: number //1
}

/**
 * 授课记录
 */
export function getTeachRecordDetails(data: {
  /**课程ID */
  id: number
}): Promise<GetTeachRecordDetailsResult> {
  return httpV2.get({
    url: '/226',
    data,
  })
}

export interface GetListenTeacherListResult {
  num: string //"钟洁娜"
  sys_user_id: number //8040
}

/**听课老师名单 */
export function getListenTeacherList(data: {
  /**课程ID */
  id: number
}): Promise<GetListenTeacherListResult[]> {
  return httpV2.get({
    url: '/227',
    data,
  })
}

interface GetListenTeacherEvaluationDetails {
  campus_id: number //7
  classes_id: number //2124
  classes_name: string //"1班"
  classes_no: string //"1"
  classes_room_id: number //17
  comments: string //"点评50"
  courses_id: number //70
  courses_name: string //"test"
  created_date: string //"2022-08-30 00:32:19"
  created_user_id: number //8040
  e_time: string //"2022-08-30 02:17:02"
  eval_tmp_id: number //10
  grade_id: number //52
  id: number //61
  is_add_process: number //true
  lesson_num: number //0
  period: number //1001
  role_id: number //5
  s_time: string //"2022-08-30 01:32:02"
  school_id: number //19
  section_id: number //0
  subject_id: number //3
  subject_name: string //"英语"
  teacher_name: string //"钟洁娜"
  teacher_no: string //"ym115"
  teacher_user_id: number //8040
  timetable_id: number //0
  type: number //0
  updated_date: string //"2022-08-30 00:32:19"
  updated_user_id: number //8040
  week: number //0
  week_id: number //0
  years: number //2020

  eval_tmp_details: {
    created_date: string //'2022-08-30 00:32:42'
    created_user_id: number //8040
    eval_tmp_deatils_id: number //4
    eval_tmp_id: number //10
    id: number //36
    name: string //'互动积极'
    updated_date: string //'2022-08-30 00:32:42'
    updated_user_id: number //8040
    user_eval_id: number //61
  }[]
}

/**听课老师评价详情 */
export function getListenTeacherEvaluationDetails(data: {
  /**课程ID */
  courseId: number
  /**用户ID */
  sysUserId: number
}): Promise<GetListenTeacherEvaluationDetails> {
  return httpV2.get({
    url: '/228',
    data,
  })
}

import { httpV1, httpV3 } from '@/utils/http'
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
  EditOpenCourseParams,
  GetAllEvaluationResult,
  GetAttachListResult,
  GetEvaluationListParams,
  GetEvaluationListResult,
  GetFullCourseStatisticsParams,
  GetFullCourseStatisticsResult,
  GetListenAndTeachStatisticsParams,
  GetListenAndTeachStatisticsResult,
  GetSubjectGroupsMembersResult,
  GetSubjectGroupsResult,
  GetUserCourseParams,
  LessonCountResult,
  LessonRecordReqData,
  LessonRecordResult,
  LessonScoreItem,
  OpenClassListParams,
  OpenCourseItemResult,
  RequestOpenCourseParams,
  userCourseList,
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
export function getLessonCount(): Promise<LessonCountResult> {
  return get('/lecture/v1/lesson_count')
  // return new Promise((resolve) => {
  //   resolve({
  //     lesson_count: [
  //       1, // 今天的听课任务数
  //       2, // 明天...
  //       3,
  //       4,
  //       5,
  //       6,
  //       7,
  //     ],
  //   })
  // })
}

/** 申请公开课 */
export function requestOpenCourse(data: RequestOpenCourseParams) {
  return post('/lecture/v1/requestOpenCourse', data)
}

/** 编辑校外课 */
export function editOpenCourse(data: EditOpenCourseParams) {
  return post('/lecture/v1/EditOpenCourse', data)
}

/** 添加/编辑校外课 */
export function addTempOpenCourse(data: AddTempOpenCourseParams) {
  return post('/lecture/v1/addTempOpenCourse', data)
}

/** 获取公开课列表（已申请）*/
export function openCourseList(
  data: CourseListParams,
): Promise<{ listenList: OpenCourseItemResult[] }> {
  return get('/lecture/v2/listenlist', data)
}

/** 公开课列表 所有通过的课*/
export function openCourseListV1(
  data: OpenClassListParams,
): Promise<{ listenList: OpenCourseItemResult[] }> {
  return get('/lecture/v1/listenlist', data)
}

interface GetCourseListParams {
  campus_id?: string //校区
  subject_id?: string //科目ID
  grade_id?: string //年级ID
  class_id?: string //教室ID

  list_mun: number //条数
  page: string //页数
  user_name?: string //授课老师名
  period_id?: string // 学段ID 1001 小学 1002 初中 10 03 高中
  date: string
}
interface GetCourseListResult {
  getCurriculum: [
    {
      id: string
      user_id: string
      user_name: string
      subject_id: string
      grade_id: string
      grade_name: string
      class_id: string
      class_name: string
      lesson_date: string
      lesson_id: string
      lesson_name: string
      start_time: string
      end_time: string
      subject_name: string
      //不为0表示该课是公开课
      courses_id: string
      //课程名
      name: string
    },
  ]
  nowDate: string
}

/**根据条件获取课程 */
export function getCourseList(data: GetCourseListParams): Promise<GetCourseListResult> {
  return httpV1.get({
    url: '/lecture/v1/getCurriculum',
    data,
  })
}

/**
 * 审核公开课申请
 */
export default function approveOpenCourse(
  data: ApproveOpenClassParams,
): Promise<ApproveOpenClassResult> {
  return post('/lecture/v1/approveOpenCourse', data)
}

/**
 * 当前用户是否有审批权限
 */
export function reqIsLeader(): Promise<{ is_leader: boolean }> {
  return get('/lecture/v1/isLeader')
}

/** 当前用户课程，包括自己的和计划听的 */
export function getUserCourse(data?: GetUserCourseParams): Promise<{
  courselist: userCourseList
}> {
  return httpV1.get({
    url: '/lecture/v1/getUserCourse',
    data,
  })
}

/** 添加听课计划 */
export function addUserCourse(data: AddUserCourse): Promise<{ usercourse: any[] }> {
  return post('/lecture/v1/addUserCourse', data)
}

/**
 * 移出听课计划
 * @param id 课程id*
 */
export function delUserCourse(id: string) {
  return get('/lecture/v1/delUserCourse', { id })
}

/** 听课评价 新增（过程记录和打分） */
export function lessonRecord(data: LessonRecordReqData) {
  return post('/lecture/v1/lessonrecord', data)
}
/** 听课评价 只有打分 修改？*/
export function subscore(course_id: string) {
  return get('/lecture/v1/subscore', { course_id })
}

/** 获取-维度列表 */
export function dimensionList(data: DimensionListParams): Promise<DimensionListResult> {
  return get('/lecture/v1/dimensionlist', data)
}

// 获取我的听课评价 - 过程记录与评分
export function getEvaluationList(
  params: GetEvaluationListParams,
): Promise<GetEvaluationListResult> {
  return httpV3.get({
    url: '/lecture/v1/list',
    data: params,
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

interface GetTeachRecordDetailsResult {
  evaluation_count: {
    dimension_name: string
    evaluation_counts: {
      count: string
      dimension_item_name: string
    }[]
  }[]
}

/**
 * 授课评价统计
 *
 */
export function getEvaluationStatistics(data: {
  course_id?: string
  user_id?: string
  range_type?: GetListenAndTeachStatisticsParams['range_type']
}): Promise<GetTeachRecordDetailsResult> {
  return httpV1.get({
    url: '/lecture/v1/evaluation_count_by_dimension_item',
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
  group_id: string
}): Promise<GetSubjectGroupsMembersResult> {
  return httpV1.get({
    url: '/lecture/v3/queryEvaluationGroupMember',
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

// interface GetDingListenRecordParams {}
interface GetDingListenRecordResult {
  courses: {
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
}

/**订订听课记录 */
export function getDingListenRecord(data: any): Promise<GetDingListenRecordResult> {
  return httpV1.get({
    url: '/lecture/v1/courses_with_recording_resource',
    data,
  })
}

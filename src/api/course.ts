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
  GetCourseListResult,
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

interface GetCourseListParams {
  // campus_id?: string //校区
  // subject_id?: string //科目ID
  // grade_id?: string //年级ID
  // class_id?: string //教室ID

  // list_mun: number //条数
  // page: string //页数
  // user_name?: string //授课老师名
  // period_id?: string // 学段ID 1001 小学 1002 初中 1003 高中
  // lesson_date: string

  pageSize: number //每页大小
  pageIndex: number //当前页从0开始
  period: number // 学段ID 1001 小学 1002 初中 1003 高中
  classId: number //班级ID
  teacherName: string //老师名称
}

/**根据条件获取课程 - 推门听课 - 课表数据 */
export function getCourseList(data: GetCourseListParams): Promise<GetCourseListResult> {
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

/**getUserTeach */
export function getUserTeach(data?: GetUserCourseParams): Promise<userCourseList> {
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
export function delUserCourse(id: string) {
  return get('/lecture/v1/delUserCourse', { id })
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

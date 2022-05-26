import { httpV1, httpV3 } from '@/utils/http'
import { post, get } from '@/utils/request'
import type {
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

/**获取听课、授课记录 */
export function coursesRecordList(data: CoursesRecordListParams): Promise<CoursesRecordListResult> {
  return httpV1.get({
    url: '/lecture/v1/coursesrecordlist',
    data,
  })
}

/**最近一周听课任务 参数range_type=latest_week最近一周,参数默认值（可不提交） */
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

/**申请公开课 */
export function requestOpenCourse(data: RequestOpenCourseParams) {
  return post('/lecture/v1/requestOpenCourse', data)
}

/**编辑公开课 */
export function editOpenCourse(data: EditOpenCourseParams) {
  return post('/lecture/v1/EditOpenCourse', data)
}

/**获取公开课列表（已申请）*/
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

/**当前用户课程，包括自己的和计划听的 */
export function getUserCourse(data?: GetUserCourseParams): Promise<{
  courselist: userCourseList
}> {
  return httpV1.get({
    url: '/lecture/v1/getUserCourse',
    data,
  })
}

/**添加听课计划 */
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

/**听课评价 新增（过程记录和打分） */
export function lessonRecord(data: LessonRecordReqData) {
  return post('/lecture/v1/lessonrecord', data)
}
/** 听课评价 只有打分 修改？*/
export function subscore(course_id: string) {
  return get('/lecture/v1/subscore', { course_id })
}

/**获取-维度列表 */
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

/**
 * 听课记录详情
 *
 */
// export function allRecordList(courseId: string): Promise<GetAttachListResult> {
//   return httpV1.get({
//     url: '/lecture/v1/allrecordlist',
//     data: {
//       course_id: courseId,
//     },
//   })
// }

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

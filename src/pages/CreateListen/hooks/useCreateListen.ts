import { requestOpenCourse, editOpenCourse } from '@/api/course'
import type {
  AttachmentParams,
  // AttachmentParams,
  EditOpenCourseParams,
  RequestOpenCourseParams,
} from '@/api/model/courseModel'
import { setStorage } from '@/utils/storage'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import type { Ref } from 'vue'
import { reactive, ref } from 'vue'
import type { OpenCourseForm } from '../types'
import type { SubjectDataType } from './useGradeSubectData'

type FunStr = (p: string) => void

type Params = {
  toastSuccess: FunStr
  toastFail: FunStr
  subjectData: Ref<SubjectDataType>
}

export interface OpenCourseParams extends RequestOpenCourseParams {
  /**公开课名称ID */
  course_id?: string
}

// 编辑或者更新
function requestAddOrUpdate(params: OpenCourseParams) {
  if (params.course_id) {
    return editOpenCourse(params as EditOpenCourseParams)
  }
  return requestOpenCourse(params)
}

export default function useCreateListen({ toastSuccess, subjectData }: Params) {
  const isLoading = ref(false)

  const promptPopup = reactive({
    visible: false,
    content: '',
  })
  const form = ref<OpenCourseForm>({
    /**公开课名称ID */
    // course_id: '',
    /**'公开课测试'; // 公开课名称 */
    course_name: '',
    /**学段ID */
    period: '',
    /**'1'; // 科目ID */
    subject_id: '',
    /** 年级班级ID : ['5601661057566615964','5015483610072272084']  */
    gradeClass: [],
    /**'2018-01-10 10:20:00''; // 开课日期时间 */
    // dateTime: '',
    dateTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm'),
    /**'1016730'; // 教室ID, 与 `class_room_name`选一个参数提交 */
    class_room_id: '',
    /**'录播室'; // 教室名（上课地点） */
    class_room_name: '',
    /**'4679665164583612636'; // 科组ID */
    subject_group_id: '',
    /**学校ID */
    /**学校ID */

    files: [],
  })

  async function confirm() {
    const formVal = form.value

    isLoading.value = true
    await requestAddOrUpdate({
      /**公开课名称ID */
      course_id: formVal.course_id,

      /**'公开课测试'; // 公开课名称 */
      name: formVal.course_name,
      /**学段ID */
      period: Number(formVal.period),
      /**'1'; // 科目ID */
      subject_id: Number(formVal.subject_id),
      /**'5601661057566615964'; // 年级ID */
      grade_id: Number(formVal.gradeClass[0]),
      /**'5015483610072272084'; // 班级ID */
      classes_id: Number(formVal.gradeClass[1]),
      /**'2018-01-10'; // 开课日期 */
      s_time: dayjs(formVal.dateTime).format('YYYY-MM-DDTHH:mm:ss[Z]'),
      /**'10:20:00'; // 开课时间 */
      // start_time: startTime[1],
      /**'1016730'; // 教室ID, 与 `class_room_name`选一个参数提交 */
      classes_room_id: Number(formVal.class_room_id) || 0,
      /**'录播室'; // 教室名（上课地点） */
      classes_room_name: formVal.class_room_id ? undefined : formVal.class_room_name,
      /**'4679665164583612636'; // 科组ID */
      role_id: Number(formVal.subject_group_id),
      att_urls: formVal.files.map((file) => {
        return file.url
      }),
    }).finally(() => {
      isLoading.value = false
    })
    // if (res.success) {
    toastSuccess((formVal.course_id ? '编辑' : '添加') + '成功')

    setStorage('pageTemp', 'needReload')
    Taro.navigateBack()
    // } else {
    //   const { rocc } = res
    //   switch (res.type) {
    //     case 0:
    //       toastFail('开课时间已过')
    //       break
    //     case 1:
    //       promptPopup.visible = true
    //       promptPopup.content = `非常抱歉，【${rocc.lesson_date}${rocc.lesson_name}】，【${rocc.teacher_name}】已预订了【${rocc.class_room_name}】，如您需要可以直接联系管理员`
    //       break
    //     case 2:
    //       promptPopup.visible = true
    //       promptPopup.content = `非常抱歉，【${rocc.lesson_date}${rocc.lesson_name}】，【${rocc.teacher_name}】老师已预订了【${rocc.class_room_name}】，如您需要可以直接联系管理员`
    //       break
    //     case 3:
    //       toastFail('后台异常')
    //       break
    //     default:
    //       toastFail('失败，如您需要可以直接联系管理员')
    //   }
    // }
  }

  return {
    form,
    confirm,
    isLoading,
    promptPopup,

    periodChange(period_id) {
      // 如果学段中没有此科目将清理掉
      const subjectList = subjectData.value[period_id]
      const subject = form.value.subject_id
      if (!subjectList.some((item) => subject === item.subject_id)) {
        form.value.subject_id = ''
      }
    },
  }
}

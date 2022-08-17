import { addTempOpenCourse } from '@/api/course'
import type { AddTempOpenCourseParams, RequestOutsideCourseForm } from '@/api/model/courseModel'
import type { SubjectDataType } from '@/pages/CreateListen/hooks/useGradeSubectData'
import { setStorage } from '@/utils/storage'
import Taro from '@tarojs/taro'
import type { Ref } from 'vue'
import { reactive, ref } from 'vue'
import useToastInject from '@/hooks/useToastInject'

type Params = {
  subjectData: Ref<SubjectDataType>
}

// 新增或者编辑
function requestAddOrUpdate(params: AddTempOpenCourseParams) {
  if (params.course_id) {
    // return editOpenCourse(params as EditOpenCourseParams)
  }
  return addTempOpenCourse(params)
}

export default function useCreateListen({ subjectData }: Params) {
  const { toastFail, toastSuccess } = useToastInject()

  const isLoading = ref(false)

  const promptPopup = reactive({
    visible: false,
    content: '',
  })
  const form = ref<RequestOutsideCourseForm>({
    /**公开课名称ID */
    // course_id: '',
    /**'公开课测试'; // 公开课名称 */
    course_name: '',
    /**授课老师 */
    // user_name: '',
    /**学段ID */
    period: '',
    /**'1'; // 科目ID */
    subject_id: '',
    /**'2018-01-10 10:20:00''; // 开课日期时间 */
    dateTime: '',
    // 授课班级
    teach_target: '',
    /**授课地点 */
    class_room_name: '',
  })

  async function confirm() {
    const formVal = form.value

    const startTime = formVal.dateTime.split(' ')

    isLoading.value = true
    const res = await requestAddOrUpdate({
      /**公开课名称ID */
      course_id: formVal.course_id,
      /**'公开课测试'; // 公开课名称 */
      course_name: formVal.course_name,
      /**学段ID */
      period: formVal.period,
      /**'1'; // 科目ID */
      subject_id: formVal.subject_id,
      /**'2018-01-10'; // 开课日期 */
      lesson_date: startTime[0],
      /**'10:20:00'; // 开课时间 */
      start_time: startTime[1],
      teach_target: formVal.teach_target,
      class_room_name: formVal.class_room_name,
      is_self: 'false',
    }).finally(() => {
      isLoading.value = false
    })
    if (res.success) {
      toastSuccess((formVal.course_id ? '编辑' : '添加') + '成功')

      setStorage('pageTemp', 'needReload')
      Taro.navigateBack()
    } else {
      const { rocc } = res
      switch (res.type) {
        case 0:
          toastFail('开课时间已过')
          break
        case 1:
          promptPopup.visible = true
          promptPopup.content = `非常抱歉，【${rocc.lesson_date}${rocc.lesson_name}】，【${rocc.teacher_name}】已预订了【${rocc.class_room_name}】，如您需要可以直接联系管理员`
          break
        case 2:
          promptPopup.visible = true
          promptPopup.content = `非常抱歉，【${rocc.lesson_date}${rocc.lesson_name}】，【${rocc.teacher_name}】老师已预订了【${rocc.class_room_name}】，如您需要可以直接联系管理员`
          break
        case 3:
          toastFail('后台异常')
          break
        default:
          toastFail('失败，如您需要可以直接联系管理员')
      }
    }
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

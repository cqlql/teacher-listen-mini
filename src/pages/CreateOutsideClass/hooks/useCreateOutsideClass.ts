import { addTempOpenCourse, requestOpenCourse } from '@/api/course'
import type { AddTempOpenCourseParams } from '@/api/model/courseModel'
import type { SubjectDataType } from '@/pages/CreateListen/hooks/useGradeSubectData'
import { setStorage } from '@/utils/storage'
import Taro from '@tarojs/taro'
import type { Ref } from 'vue'
import { reactive, ref } from 'vue'
import useToastInject from '@/hooks/useToastInject'
import type { OutsideCourseForm } from '../types'

type Params = {
  subjectData: Ref<SubjectDataType>
}

// 新增或者编辑
// function requestAddOrUpdate(params: AddTempOpenCourseParams) {
//   if (params.course_id) {
//     // return editOpenCourse(params as EditOpenCourseParams)
//   }
//   return addTempOpenCourse(params)
// }

export default function useCreateListen({ subjectData }: Params, form: Ref<OutsideCourseForm>) {
  const { toastSuccess } = useToastInject()

  const isLoading = ref(false)

  const promptPopup = reactive({
    visible: false,
    content: '',
  })

  async function confirm() {
    const formVal = form.value

    isLoading.value = true
    await requestOpenCourse({
      /**公开课名称ID */
      // id: formVal.id ? Number(formVal.id) : undefined,
      id: formVal.courses_id ? Number(formVal.courses_id) : undefined,
      /**'公开课测试'; // 公开课名称 */
      name: formVal.course_name,

      out_school_name: formVal.school_name,
      teacher_name: formVal.teacher_name,
      /**学段ID */
      period: Number(formVal.period),
      /**'1'; // 科目ID */
      subject_id: Number(formVal.subject_id),
      /**'2018-01-10 10:20:00'; // 开课日期 */
      s_time: formVal.dateTime,
      classes_name: formVal.teach_target,
      address: formVal.class_room_name,

      type: 2,
    }).finally(() => {
      isLoading.value = false
    })
    // if (res.success) {
    toastSuccess((formVal.courses_id ? '编辑' : '添加') + '成功')

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

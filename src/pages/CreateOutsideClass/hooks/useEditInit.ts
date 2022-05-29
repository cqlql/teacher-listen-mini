import type { OpenCourseItemResult, RequestOutsideCourseForm } from '@/api/model/courseModel'
import type { Ref } from 'vue'
// import useRouterParams from '@/hooks/useRouterParams'
import usePage from '@/hooks/usePage'
// import dayjs from 'dayjs'

export default function useEditInit(formRef: Ref<RequestOutsideCourseForm>) {
  // const { id } = useRouterParams<{ id?: string }>()

  const { pageOn } = usePage()

  pageOn<OpenCourseItemResult>('transferData', (result) => {
    editInitFill(result)
  })

  function editInitFill(result: OpenCourseItemResult) {
    formRef.value = {
      course_id: result.id,
      course_name: result.name,
      period: result.period_id,
      subject_id: result.subject_id,
      dateTime: result.lesson_date.split('T')[0] + ' ' + result.start_time,
      class_room_name: result.class_room_name,
      teach_target: '',
    }
  }

  return {}
}

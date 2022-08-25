import type { Ref } from 'vue'
// import useRouterParams from '@/hooks/useRouterParams'
import usePage from '@/hooks/usePage'
import type { AddedCourseItem } from '@/pages/WantListen/types'
import type { OutsideCourseForm } from '../types'
// import dayjs from 'dayjs'

export default function useEditInit(formRef: Ref<OutsideCourseForm>) {
  // const { id } = useRouterParams<{ id?: string }>()

  const { pageOn } = usePage()

  pageOn<AddedCourseItem>('transferData', (result) => {
    editInitFill(result)
  })

  function editInitFill(result: AddedCourseItem) {
    formRef.value = {
      id: result.id,
      course_name: result.courseName,
      period: result.period, //result.courseName,
      subject_id: result.subject_id,
      dateTime: result.date,
      class_room_name: result.place,
      teach_target: result.gradClass,
      school_name: result.school_name,
      teacher_name: result.userName,
    }
  }

  return {}
}

import type { OpenCourseItemResult } from '@/api/model/courseModel'
import type { Ref } from 'vue'
// import useRouterParams from '@/hooks/useRouterParams'
import usePage from '@/hooks/usePage'
import { getAttachList } from '@/api/course'
import type { OpenCourseForm } from '../types'
// import dayjs from 'dayjs'

export default function useEditInit(formRef: Ref<OpenCourseForm>) {
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
      gradeClass: [result.grade_id, result.class_id],
      dateTime: result.lesson_date.split('T')[0] + ' ' + result.start_time,
      class_room_id: result.class_room_id,
      class_room_name: result.class_room_name,
      subject_group_id: result.group_id,
      files: [],
    }

    // 获取课程相关附件
    getAttachList(result.id).then((res) => {
      const files: OpenCourseForm['files'] = []
      res.attachList.forEach((att) => {
        files.push({
          name: att.name,
          url: att.url,
          type: att.file_type,
        })
      })

      formRef.value.files = files
    })
  }

  return {}
}

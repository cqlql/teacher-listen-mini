import type { OpenCourseItemResult, RequestOpenCourseForm } from '@/api/model/courseModel'
import type { Ref } from 'vue'
// import useRouterParams from '@/hooks/useRouterParams'
import usePage from '@/hooks/usePage'
// import dayjs from 'dayjs'

export default function useEditInit(formRef: Ref<RequestOpenCourseForm>) {
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
      files: [
        {
          name: 'GKtmpMHEsNuR3b8b12cbf9436ae636d67b108dbdfe27.webp',
          url: 'https://s3-cn-south-1.qiniucs.com/smallpi/3b8b12cbf9436ae636d67b108dbdfe27.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=FlOuHhYOGakSvFFka9eBRf5emNuGpEcCEZmtNsLd%2F20220304%2Fcn-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220304T033536Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6a85cea80d11f607d414c192c7f402d2f3eabb729ce0a65a049a512225432a1f',
          type: '51',
        },
      ],
    }
  }

  return {}
}

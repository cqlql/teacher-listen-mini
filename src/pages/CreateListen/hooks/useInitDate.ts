import type { CreateListenSelectDataResult } from '@/api/model/selectModel'
import { getCreateListenSelectData } from '@/api/select'
import getPeriodMap from '@/data/get-period-map'
import useRouterParams from '@/hooks/useRouterParams'
// import { getSubjectGroups } from '@/api/select'
// import usePeriodSubjectData from '@/hooks/usePeriodSubjectData'
import classify from '@/utils/each/classify'
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { OpenCourseForm } from '../types'

export interface SubjectDataType {
  [key: string]: SubjectInfo[]
}

interface SubjectInfo {
  period_id: string
  period_name: string
  subject_id: string
  subject_name: string
}

type Option = { id: string; name: string }
export default function useInitDate(formRef: Ref<OpenCourseForm>) {
  const { id } = useRouterParams<{ id?: string }>() // 公开课id
  const periodOptions = ref<Option[]>([])
  const subjectData = ref<SubjectDataType>({})
  const subjectGroups = ref<{ id: string; name: string }[]>([])
  const classRawData = ref<CreateListenSelectDataResult['schoolGradeClasses']>([])
  const classRoomsRawDate = ref<CreateListenSelectDataResult['classRooms']>([])

  getCreateListenSelectData(id ? Number(id) : 0).then((res) => {
    const periodMap = getPeriodMap()
    periodOptions.value = res.periods.map((periodItem) => {
      const id = periodItem.period
      return {
        id: String(id),
        name: periodMap[id],
      }
    })

    subjectData.value = classify(
      res.schoolSubjects,
      'period',
      () => {
        return []
      },
      (item) => {
        return {
          id: String(item.subject_id),
          name: item.subject_name,
        }
      },
    )

    classRawData.value = res.schoolGradeClasses
    classRoomsRawDate.value = res.classRooms
    subjectGroups.value = res.roles.map((role) => {
      return {
        id: String(role.id),
        name: role.name,
      }
    })

    // 编辑情况初始
    if (id) {
      initEdit(res.entity)
    }
  })

  function initEdit(rawData: CreateListenSelectDataResult['entity']) {
    formRef.value = {
      course_id: String(rawData.id),
      course_name: rawData.name,
      period: String(rawData.period),
      subject_id: String(rawData.subject_id),
      gradeClass: [String(rawData.grade_id), String(rawData.classes_id)],
      dateTime: rawData.s_time.replace(/:\d\d$/, ''),
      class_room_id: String(rawData.classes_room_id),
      class_room_name: rawData.class_room_name,
      subject_group_id: String(rawData.role_id),
      files: [],
    }
  }

  return {
    periodOptions,
    subjectData,
    subjectGroups,
    classRawData,
    classRoomsRawDate,
  }
}

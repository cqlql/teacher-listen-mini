import type { SubjectGroupsResult } from '@/api/model/selectModel'
import { getCreateListenSelectData } from '@/api/select'
import getPeriodMap from '@/data/get-period-map'
// import { getSubjectGroups } from '@/api/select'
// import usePeriodSubjectData from '@/hooks/usePeriodSubjectData'
import classify from '@/utils/each/classify'
import { ref } from 'vue'

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
export default function useInitSelectDate() {
  const periodOptions = ref<Option[]>([])
  const subjectData = ref<SubjectDataType>({})

  const subjectGroups = ref<SubjectGroupsResult | []>([])

  getCreateListenSelectData().then((res) => {
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
  })

  return {
    periodOptions,
    subjectData,
    subjectGroups,
  }
}

import type { SubjectGroupsResult } from '@/api/model/selectModel'
import { getCampusGradeSelect } from '@/api/select'
import type { Ref } from 'vue'
import { ref } from 'vue'

interface SubjectInfo {
  period_id: string
  period_name: string
  subject_id: string
  subject_name: string
}

export interface SubjectDataType {
  [key: string]: SubjectInfo[]
}
/**
 * 学段科目数据
 * 可根据学段查找科目
 *
 *
 */
export default function usePeriodSubjectData() {
  type Option = { id: string; name: string }
  const periodOptions: Ref<Option[]> = ref([])
  const subjectData: Ref<SubjectDataType> = ref({})
  const subjectGroups = ref<SubjectGroupsResult | []>([])
  getCampusGradeSelect().then((resData) => {
    const periodOptionsNew: Option[] = []
    subjectData.value = resData.subjects.reduce((newDict, item) => {
      let subjects: any[] | undefined = newDict[item.period_id]
      if (!subjects) {
        subjects = newDict[item.period_id] = []
        periodOptionsNew.push({
          id: item.period_id,
          name: item.period_name,
        })
      }
      subjects.push(item)
      return newDict
    }, {})

    periodOptions.value = periodOptionsNew
  })

  return {
    periodOptions,
    subjectData,
    subjectGroups,
  }
}

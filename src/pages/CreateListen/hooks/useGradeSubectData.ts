import type { SubjectGroupsResult } from '@/api/model/selectModel'
import { getSubjectGroups } from '@/api/select'
import usePeriodSubjectData from '@/hooks/usePeriodSubjectData'
import { ref } from 'vue'

export interface SubjectDataType {
  [key: string]: {
    period_id: string
    period_name: string
    subject_id: string
    subject_name: string
  }[]
}

export default function useGradeSubectData() {
  const { periodOptions, subjectData } = usePeriodSubjectData()

  const subjectGroups = ref<SubjectGroupsResult | []>([])

  getSubjectGroups().then((res) => {
    subjectGroups.value = res
  })

  return {
    periodOptions,
    subjectData,
    subjectGroups,
  }
}

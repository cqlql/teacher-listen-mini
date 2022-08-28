import { getSemesterSelectData } from '@/api/select'
import type { SemesterRangeOption } from '@/pages/ListenEvaluationRecord/types'
import dayjs from 'dayjs'
import { ref } from 'vue'

export default function useSemesterRangeRemoteData() {
  const semesterSelectDataLoading = ref(true)
  const semesterSelectOptions = ref<SemesterRangeOption[]>([])
  getSemesterSelectData()
    .then((res) => {
      function splitDateRange(rangeDate: string) {
        const [start, end] = rangeDate.split('-')
        return {
          start: dayjs(start).format('YYYY/MM/DD'),
          end: dayjs(end).format('YYYY/MM/DD'),
        }
      }

      const options: SemesterRangeOption[] = []
      for (const [, item] of Object.entries(res)) {
        options.push({
          label: item.name,
          ...splitDateRange(item.val),
        })
      }

      semesterSelectOptions.value = options
    })
    .finally(() => {
      semesterSelectDataLoading.value = false
    })

  return {
    semesterSelectDataLoading,
    semesterSelectOptions,
  }
}

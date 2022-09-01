import type { GetSemesterSelectDataResult } from '@/api/model/selectModel'
import { getSemesterSelectData } from '@/api/select'
import type { SemesterRangeOption } from '@/pages/ListenEvaluationRecord/types'
import eachBySort from '@/utils/each/each-by-sort'
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
      eachBySort(
        res,
        function (item: GetSemesterSelectDataResult['curSemester']) {
          options.push({
            label: item.name,
            ...splitDateRange(item.val),
          })
        },
        ['curSemester', 'curYearSemester', 'semester', 'yearSemester'],
      )

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

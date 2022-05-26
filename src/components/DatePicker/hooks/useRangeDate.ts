import type { OptionType } from '@/types/components/picker'
import dayjs from 'dayjs'
import type { Ref } from 'vue'
import { ref } from 'vue'

export default function useRangeDate(
  setRange: (arr: OptionType[][]) => OptionType[][] = (arr) => arr,
  setSelectedIndex: (arr: number[], raw: number[]) => number[] = (arr) => arr,
) {
  const rangeDate: Ref<OptionType[][]> = ref([])
  const rangeYear: OptionType[] = []
  const rangeMonth: OptionType[] = []
  const selectedIndexs: Ref<number[]> = ref([])
  // const rangeDay: optionType[] = [];

  const nowDate = new Date()
  const nowYear = nowDate.getFullYear()
  const startYear = nowYear - 1

  // 20年的范围
  for (let index = 0; index < 20; index++) {
    const v = startYear + index
    rangeYear.push({
      id: v,
      name: v + ' 年',
    })
  }

  // 月
  for (let index = 0; index < 12; index++) {
    rangeMonth.push({
      id: index, // 从0起始，与date同步
      name: index + 1 + ' 月',
    })
  }

  rangeDate.value = setRange([rangeYear, rangeMonth, []])

  return {
    rangeDate,
    selectedIndexs,
    updateDay(dateArray: number[]) {
      const [year, month] = dateArray

      const date = dayjs(new Date(year, month))
      const dayNum = date.daysInMonth()

      const newRangeDay: OptionType[] = []
      for (let index = 0; index < dayNum; index++) {
        const v = index + 1
        newRangeDay.push({
          id: v,
          name: v + ' 日',
        })
      }

      rangeDate.value = setRange([rangeYear, rangeMonth, newRangeDay])
    },
    updateSelectedIndexs(dateArray: number[]) {
      selectedIndexs.value = setSelectedIndex(
        [dateArray[0] - startYear, dateArray[1], dateArray[2] - 1],
        dateArray,
      )
    },
  }
}

import type { OptionType } from '@/types/components/picker'

import useRangeDate from './useRangeDate'
export default function useRangeDateTime() {
  const rangeHour: OptionType[] = []
  const rangeMinute: OptionType[] = []

  // 小时
  for (let index = 0; index < 24; index++) {
    const v = index
    rangeHour.push({
      id: v,
      name: v + ' 时',
    })
  }

  // 分钟
  for (let index = 0; index < 60; index++) {
    const v = index
    rangeMinute.push({
      id: v,
      name: v + ' 分',
    })
  }

  const { rangeDate, selectedIndexs, updateDay, updateSelectedIndexs } = useRangeDate(
    (range) => {
      return range.concat([rangeHour, rangeMinute])
    },
    (dateArray, raw) => {
      return dateArray.concat([raw[3], raw[4]])
    },
  )

  return {
    rangeDate,
    selectedIndexs,
    updateDay,
    updateSelectedIndexs,
  }
}

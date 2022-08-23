import { getLessonCount } from '@/api/course'
import type { LessonCountResult } from '@/api/model/courseModel'
import type { DateItem } from '@/components/OneWeek/typing'
import dayjs from 'dayjs'
import { watch, ref } from 'vue'

export default function useWeekDateSelect() {
  const todayDate = dayjs()
  const isExpanded = ref(false)
  const isToday = ref(true)
  const weekDate = ref(dayjs())
  const weekBtnText = ref('')

  const weekItems = ref<DateItem[][]>([])

  watch([isExpanded, weekItems], ([isExpandedValue, weekItemsValue]) => {
    if (isExpandedValue) {
      getLessonCount().then((list) => {
        const resItemMap: Record<string, LessonCountResult> = list.reduce((record, item) => {
          record[item.created_date.replace(/\d+\/\d\d\//, '')] = item
          return record
        }, {})

        weekItemsValue.forEach((items) => {
          items.forEach((item) => {
            if (item.value) {
              const resItem = resItemMap[item.value]
              item.info = resItem ? `${resItem.count} 节` : ''
            }
          })
        })
      })
    }
  })

  watch(
    weekDate,
    (weekDateValue) => {
      isToday.value = todayDate.format('YYYY-M-D') === weekDateValue.format('YYYY-M-D')
      weekBtnText.value = weekDateValue.format('M月D日')
    },
    {
      immediate: true,
    },
  )

  return {
    isExpanded,
    weekDate,
    weekBtnText,
    weekItems,
    isToday,
  }
}

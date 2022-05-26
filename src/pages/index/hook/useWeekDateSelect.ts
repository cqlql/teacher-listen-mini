import { getLessonCount } from '@/api/course'
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
      getLessonCount().then(({ lesson_count: resList }) => {
        let index = 0
        weekItemsValue.forEach((items) => {
          items.forEach((item) => {
            if (item.value) {
              const resItem = resList[index]
              item.info = resItem ? `${resItem} 节` : ''
              index += 1
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

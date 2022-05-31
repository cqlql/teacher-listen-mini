import { getEvaluationStatistics } from '@/api/course'
import type { GetListenAndTeachStatisticsParams } from '@/api/model/courseModel'
import type { ChartBarCustomItem } from '@/components/ChartBarCustom'
import { ref } from 'vue'

export default function useEvaluationStatistics(userId) {
  const empty = ref(false)
  const chartBarData = ref<ChartBarCustomItem[]>([])

  function update(rangeType: GetListenAndTeachStatisticsParams['range_type']) {
    return getEvaluationStatistics({
      user_id: userId,
      range_type: rangeType,
    }).then((res) => {
      const list: ChartBarCustomItem[] = []
      res.evaluation_count.forEach((item) => {
        item.evaluation_counts.forEach((childItem) => {
          list.push({
            name: childItem.dimension_item_name,
            count: Number(childItem.count),
          })
        })
      })
      empty.value = list.length === 0
      chartBarData.value = list
    })
  }

  return {
    empty,
    chartBarData,
    update,
  }
}

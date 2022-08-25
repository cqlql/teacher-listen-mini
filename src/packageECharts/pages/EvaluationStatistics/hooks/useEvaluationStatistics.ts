import type { GetMyEvaluationStatisticsResult } from '@/api/statistic'
import type { ChartBarCustomItem } from '@/components/ChartBarCustom'
import { ref } from 'vue'

export default function useEvaluationStatistics(userId) {
  const empty = ref(false)
  const chartBarData = ref<ChartBarCustomItem[]>([])

  function update(rawData: GetMyEvaluationStatisticsResult) {
    const list: ChartBarCustomItem[] = []

    rawData.indicators.forEach((item) =>
      list.push({
        name: item.name,
        count: item.num,
      }),
    )
    empty.value = list.length === 0
    chartBarData.value = list
  }

  return {
    empty,
    chartBarData,
    update,
  }
}

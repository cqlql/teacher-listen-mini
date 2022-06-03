import { getEvaluationStatistics, getSubjectGroups } from '@/api/course'
import type { GetListenAndTeachStatisticsParams } from '@/api/model/courseModel'
import type { ChartBarCustomItem } from '@/components/ChartBarCustom'
import OncePromise from '@/utils/once/once-promise'
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

  const onceGetSubjectGroupList = new OncePromise(() => {
    return getSubjectGroups()
  })

  async function updateEvaluation(rangeType: GetListenAndTeachStatisticsParams['range_type']) {
    const subjectGroupList = await onceGetSubjectGroupList.execute()
    console.log('🚀 -- updateEvaluation -- subjectGroupList', subjectGroupList)
  }

  return {
    empty,
    chartBarData,
    update,
    updateEvaluation,
  }
}

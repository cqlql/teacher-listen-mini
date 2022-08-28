import { getSubjectGroupsMembers } from '@/api/course'
import type {
  GetListenAndTeachStatisticsParams,
  GetSubjectGroupsMembersResult,
} from '@/api/model/courseModel'
import { getEvaluationStatistics } from '@/api/statistic'
import type { ChartBarCustomItem } from '@/components/ChartBarCustom'
import useToastInject from '@/hooks/useToastInject'
import { ref } from 'vue'

export default function useEvaluationStatistics() {
  const empty = ref(false)
  const chartBarData = ref<ChartBarCustomItem[]>([])
  const memberId = ref('')
  const subjectGroupMembers = ref<GetSubjectGroupsMembersResult['data']>([])

  const { toastLoading, toastClose } = useToastInject()

  let currentRangeType: GetListenAndTeachStatisticsParams['range_type'] = 'first_semester'

  async function updateByRangeType(
    rangeType: GetListenAndTeachStatisticsParams['range_type'],
    groupId: string,
  ) {
    const members = (subjectGroupMembers.value = await getSubjectGroupsMembers({
      group_id: groupId,
    }).then((res) => res.data))

    memberId.value = members[0]?.userid

    currentRangeType = rangeType

    return updateByMember()
  }

  function updateByMember() {
    return getEvaluationStatistics({
      user_id: memberId.value,
      range_type: currentRangeType,
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
    updateByRangeType,
    memberId,
    subjectGroupMembers,
    memberChange() {
      toastLoading()
      updateByMember().finally(() => {
        toastClose()
      })
    },
  }
}

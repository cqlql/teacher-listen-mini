import { getEvaluationStatistics, getSubjectGroups, getSubjectGroupsMembers } from '@/api/course'
import type {
  GetListenAndTeachStatisticsParams,
  GetSubjectGroupsResult,
} from '@/api/model/courseModel'
import type { ChartBarCustomItem } from '@/components/ChartBarCustom'
import OncePromise from '@/utils/once/once-promise'
import testKeyword from '@/utils/search/test-keyword'
import type { Ref } from 'vue'
import { reactive, ref } from 'vue'

type IdName = { id: string; name: string }

export default function useEvaluationStatistics(
  rangeType: Ref<GetListenAndTeachStatisticsParams['range_type']>,
) {
  const empty = ref(false)
  const chartBarData = ref<ChartBarCustomItem[]>([])
  const subjectGroups = ref<{ text: string; value: string }[]>([])
  const evaluationState = reactive({
    groupId: '',
    keyword: '',
  })
  const subjectGroupMembers = ref<IdName[]>([])
  const subjectGroupMembersSearchResults = ref<IdName[]>([])
  const subjectGroupMemberId = ref('')

  function updateEvaluationStatistics() {
    return getEvaluationStatistics({
      user_id: subjectGroupMemberId.value,
      range_type: rangeType.value,
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
    return getSubjectGroups().then(({ data }: GetSubjectGroupsResult) => {
      const list = (subjectGroups.value = data.map((item) => {
        return {
          text: item.name,
          value: item.id,
        }
      }))
      evaluationState.groupId = list[0]?.value
    })
  })
  const onceGetSubjectGroupMembers = new OncePromise(() => {
    return getSubjectGroupsMembers({
      group_id: evaluationState.groupId,
    }).then((result) => {
      const userList: IdName[] = []
      result.data.forEach((item) => {
        userList.push({
          id: item.userid,
          name: item.name,
        })
      })
      subjectGroupMembers.value = userList
      updateMembersByKeyword()
      subjectGroupMemberId.value = subjectGroupMembersSearchResults.value[0]?.id
    })
  })

  async function updateEvaluation() {
    await onceGetSubjectGroupList.execute()
    await onceGetSubjectGroupMembers.execute()
    return updateEvaluationStatistics()
  }

  function updateMembersByKeyword() {
    const keyword = evaluationState.keyword
    subjectGroupMembersSearchResults.value = subjectGroupMembers.value.filter((member) => {
      return testKeyword(keyword, member.name)
    })
  }

  return {
    empty,
    chartBarData,

    updateEvaluation,
    subjectGroups,
    subjectGroupMembers,
    subjectGroupMemberId,

    evaluationState,
    evaluationGroupConfirm() {
      onceGetSubjectGroupMembers.clear()
      onceGetSubjectGroupMembers.execute()
    },
    evaluationTearchSearch() {
      updateMembersByKeyword()
    },
    subjectGroupMemberChange() {
      updateEvaluation()
    },
    subjectGroupMembersSearchResults,
  }
}

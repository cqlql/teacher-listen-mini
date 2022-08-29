import { getSubjectGroupsMembers } from '@/api/course'

import type { DateRangeType, GetSchoolEvaluationStatisticsResult } from '@/api/statistic'
import { getEvaluationStatistics } from '@/api/statistic'
import type { ChartBarCustomItem } from '@/components/ChartBarCustom'

import OncePromise from '@/utils/once/once-promise'
import testKeyword from '@/utils/search/test-keyword'
import type { Ref } from 'vue'
import { reactive, ref } from 'vue'

type IdName = { id: string; name: string }

export default function useEvaluationStatistics(rangeType: Ref<DateRangeType>) {
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
      userId: Number(subjectGroupMemberId.value),
      dateRange: rangeType.value,
    }).then((res) => {
      const list: ChartBarCustomItem[] = []
      res.forEach((item) => {
        list.push({
          name: item.name,
          count: item.num,
        })
      })
      empty.value = list.length === 0
      chartBarData.value = list
    })
  }

  function initSubjectGroupList(rawData: GetSchoolEvaluationStatisticsResult) {
    const list = (subjectGroups.value = rawData.group_total.map((group) => {
      return {
        text: group.role_name,
        value: String(group.role_id),
      }
    }))

    evaluationState.groupId = list[0]?.value
  }

  const onceGetSubjectGroupMembers = new OncePromise(() => {
    return getSubjectGroupsMembers({
      roleId: Number(evaluationState.groupId),
    }).then((result) => {
      const userList: IdName[] = []
      result.forEach((item) => {
        userList.push({
          id: String(item.sysuser_id),
          name: item.teacher_name,
        })
      })
      subjectGroupMembers.value = userList
      updateMembersByKeyword()
      subjectGroupMemberId.value = subjectGroupMembersSearchResults.value[0]?.id
    })
  })

  async function updateEvaluation(rawData: GetSchoolEvaluationStatisticsResult) {
    await initSubjectGroupList(rawData)

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
      updateEvaluationStatistics()
    },
    subjectGroupMembersSearchResults,
  }
}

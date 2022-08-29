import { getSubjectGroupsMembers } from '@/api/course'

import type { DateRangeType } from '@/api/statistic'
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
  const groupId = ref('0')
  // const subjectGroups = ref<{ text: string; value: string }[]>([])
  const subjectGroups = ref<{ id: string; name: string }[]>([
    // { id: '', name: '领导' },
    // {
    //   id: '2',
    //   name: '高级语文',
    // },
  ])
  const evaluationState = reactive({
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

  const onceGetSubjectGroupMembers = new OncePromise(() => {
    return getSubjectGroupsMembers({
      roleId: Number(groupId.value),
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

  async function updateEvaluation() {
    if (groupId.value !== '0') {
      await onceGetSubjectGroupMembers.execute()
    }

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
    groupId,
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

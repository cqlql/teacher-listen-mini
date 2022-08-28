import type { GetEvaluationScoreResult } from '@/api/model/courseModel'

import { ref } from 'vue'
import type { EvaluationScore, ScoreItem } from '../types'

async function initEvaluationScore(
  res: GetEvaluationScoreResult,
): Promise<{ scoreList: ScoreItem[] }> {
  // return dimensionList({
  //   subject_id: routeParams.subject_id,
  //   grade_id: routeParams.grade_id,
  //   campus_id: getStorage('campusId'),
  // })

  const scoreList: ScoreItem[] = []

  scoreList.push({
    id: '',
    ids: res.userEvalDetails.map((item) => String(item.eval_tmp_deatils_id)),
    name: '',
    weight: '', //item.weight,
    options: res.evalTmpDetails.map((item) => {
      return {
        id: String(item.id),
        name: item.name,
      }
    }),
    dict: res.evalTmpDetails.reduce((acc, item) => {
      acc[item.id] = item
      return acc
    }, {}),
  })

  return {
    scoreList,
  }
}

export default function useEvaluationScoreStore() {
  const evaluationScore = ref<EvaluationScore>({
    reviews: '',
    scoreList: [],
  })

  return {
    evaluationScore,
    async editInit(res: GetEvaluationScoreResult) {
      const evaluationScoreValue = evaluationScore.value
      const { scoreList } = await initEvaluationScore(res)
      evaluationScoreValue.scoreList = scoreList

      evaluationScoreValue.reviews = '!!没有'
    },
  }
}

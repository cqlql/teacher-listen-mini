import { dimensionList } from '@/api/course'
import type { GetEvaluationListResult, GetEvaluationScoreResult } from '@/api/model/courseModel'
import { getStorage } from '@/utils/storage'
import { ref } from 'vue'
import type { EvaluationScore, ScoreItem } from '../types'
import type { RouteParams } from './useListenEvaluationStore'

async function initEvaluationScore(
  res: GetEvaluationScoreResult,
): Promise<{ record: Record<string, ScoreItem>; scoreList: ScoreItem[] }> {
  // return dimensionList({
  //   subject_id: routeParams.subject_id,
  //   grade_id: routeParams.grade_id,
  //   campus_id: getStorage('campusId'),
  // })

  const scoreList: ScoreItem[] = []

  scoreList.push({
    id: '',
    ids: [],
    name: '',
    weight: '', //item.weight,
    options: res.evalTmpDetails.map((item) => {
      return {
        id: String(item.id),
        name: item.name,
      }
    }),
  })

  return {
    scoreList,
    record: {},
  }
}

export default function useEvaluationScoreStore(routeParams: RouteParams) {
  const evaluationScore = ref<EvaluationScore>({
    reviews: '',
    scoreList: [],
  })

  return {
    evaluationScore,
    async editInit(res: GetEvaluationScoreResult) {
      const evaluationScoreValue = evaluationScore.value
      const { record, scoreList } = await initEvaluationScore(res)
      evaluationScoreValue.scoreList = scoreList
      console.log('🚀 -- editInit -- scoreList', scoreList)

      // res.scoreList?.forEach((scoreItem) => {
      //   const currentRecord = record[scoreItem.dimension_id]
      //   currentRecord.ids.push(scoreItem.dimension_item_id)
      // })

      // res.lessonRecordList?.forEach((record) => {
      //   evaluationScoreValue.reviews = record.lesson_evaluation_text
      // })
    },
  }
}

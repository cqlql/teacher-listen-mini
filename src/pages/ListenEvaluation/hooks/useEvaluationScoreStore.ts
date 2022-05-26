import { dimensionList } from '@/api/course'
import type { GetEvaluationListResult } from '@/api/model/courseModel'
import { ref } from 'vue'
import type { EvaluationScore, ScoreItem } from '../types'
import type { RouteParams } from './useListenEvaluationStore'

function initEvaluationScore(
  routeParams,
): Promise<{ record: Record<string, ScoreItem>; scoreList: ScoreItem[] }> {
  return dimensionList({
    subject_id: routeParams.subject_id,
    grade_id: routeParams.grade_id,
  }).then((res) => {
    const record: Record<string, any> = {}
    const scoreList: ScoreItem[] = []

    res.dimensionList.forEach((item) => {
      const id = item.dimension_id
      const newItem: ScoreItem = {
        id,
        ids: [],
        name: item.dimension_name,
        weight: item.weight,
        options: item.item_info.map((item) => {
          return {
            id: item.item_id,
            name: item.item_name,
          }
        }),
      }

      record[id] = newItem

      scoreList.push(newItem)
    })

    return {
      record,
      scoreList,
    }
  })
}

export default function useEvaluationScoreStore(routeParams: RouteParams) {
  const evaluationScore = ref<EvaluationScore>({
    reviews: '',
    scoreList: [],
  })

  return {
    evaluationScore,
    async editInit(res: GetEvaluationListResult) {
      const evaluationScoreValue = evaluationScore.value
      const { record, scoreList } = await initEvaluationScore(routeParams)
      evaluationScoreValue.scoreList = scoreList

      res.scoreList?.forEach((scoreItem) => {
        const currentRecord = record[scoreItem.dimension_id]
        currentRecord.ids.push(scoreItem.dimension_item_id)
      })

      res.lessonRecordList?.forEach((record) => {
        evaluationScoreValue.reviews = record.lesson_evaluation_text
      })
    },
  }
}

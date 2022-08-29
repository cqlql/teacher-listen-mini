import type {
  EvaluationScore,
  ListenEvaluationStore,
  ProcessRecordUrlParams,
  RecordChildItem,
} from '../types'
import {
  getEvaluationScore,
  getProcessRecord,
  saveEvaluationScoreReq,
  saveListenProcess,
} from '@/api/course'
import useRouterParams from '@/hooks/useRouterParams'
import type { ProcessRecordStore } from './useProcessRecordStore'
import useProcessRecordStore from './useProcessRecordStore'
import useToastInject from '@/hooks/useToastInject'
import useEvaluationScoreStore from './useEvaluationScoreStore'
// import type { Ref } from 'vue'
import type {
  SaveEvaluationScoreReqParams,
  // FileRecordItemParam,
  SaveListenProcessParams,
  SaveListenProcessParamsDetail,
  // LessonScoreParam,
  // RecordItemParam,
  // SaveListenProcessParamsDetail,
} from '@/api/model/courseModel'
import type { Ref } from 'vue'

function useSave(
  routeParams: ProcessRecordUrlParams,
  processRecordStore: ProcessRecordStore,
  evaluationScore: Ref<EvaluationScore>,
) {
  const { loading, toastSuccess } = useToastInject()

  const { processRecordList } = processRecordStore

  function resolveRequestData(): SaveListenProcessParams {
    const userEvalId = Number(routeParams.id)

    return {
      id: userEvalId,
      process_list: processRecordList.value.map((record, i) => {
        const details: SaveListenProcessParamsDetail[] = []
        let orderIndex = 0
        function createDetailItem(
          type: RecordChildItem['type'],
          value,
        ): SaveListenProcessParamsDetail {
          const typeMap: Record<RecordChildItem['type'], SaveListenProcessParamsDetail['type']> = {
            think: 1,
            picture: 5,
            drawing: 10,
            video: 15,
          }
          return {
            // id: 0,
            user_eval_id: userEvalId,
            // process_id: 0,
            type: typeMap[type],
            val: value,
            order_index: orderIndex,
          }
        }
        record.list.forEach((item) => {
          switch (item.type) {
            case 'think':
              details.push(createDetailItem(item.type, item.text))
              orderIndex++
              break

            case 'picture':
            case 'drawing':
            case 'video':
              item.files.forEach((file) => {
                details.push(createDetailItem(item.type, file.url))
                orderIndex++
              })
              break
          }
        })

        return {
          // id: 0,
          user_eval_id: userEvalId,
          title: record.text,
          order_index: i,
          details,
        }
      }),
    }
  }

  function resolveEvaluationScoreRequestData(): SaveEvaluationScoreReqParams {
    const evaluationScoreVal = evaluationScore.value
    const scoreItem = evaluationScoreVal.scoreList[0]
    return {
      id: Number(routeParams.id),
      comments: evaluationScoreVal.reviews,
      eval_tmp_details: scoreItem.ids.map((id) => {
        const item = scoreItem.dict[id]
        return {
          eval_tmp_deatils_id: Number(item.id),
          name: item.name,
        }
      }),
    }
  }

  return {
    async save() {
      // if (process.env.NODE_ENV !== 'production') {
      //   console.log(processRecordList, evaluationScore)
      //   console.log(resolveRequestData())
      //   toastSuccess('提交成功')
      //   return
      // }

      if (loading.value) return
      loading.value = true
      await saveListenProcess(resolveRequestData()).finally(() => {
        loading.value = false
      })

      toastSuccess('保存成功')
    },

    async saveEvaluationScore() {
      if (loading.value) return
      loading.value = true
      await saveEvaluationScoreReq(resolveEvaluationScoreRequestData()).finally(() => {
        loading.value = false
      })

      toastSuccess('保存成功')
    },
  }
}

export default function useListenEvaluationStore(): ListenEvaluationStore {
  const routeParams = useRouterParams<ProcessRecordUrlParams>()

  // if (process.env.NODE_ENV !== 'production') {
  //   routeParams = {
  //     course_id: '3349473812636956689',
  //     grade_id: '1108',
  //     subject_id: '1',
  //     user_id: '467067',
  //   }
  // }

  const processRecordStore = useProcessRecordStore()

  const evaluationScoreStore = useEvaluationScoreStore()
  const { evaluationScore } = evaluationScoreStore

  const { save, saveEvaluationScore } = useSave(routeParams, processRecordStore, evaluationScore)

  // 编辑初始 - 过程记录
  getProcessRecord({
    // 课评ID
    id: Number(routeParams.id),
  }).then((res) => {
    processRecordStore.editInit(res)

    // 单独初始打分评价
    evaluationScore.value.reviews = res.comments
  })

  // 评价选项/编辑 初始 - 听课评价
  getEvaluationScore({
    id: Number(routeParams.id),
  }).then((res) => {
    evaluationScoreStore.editInit(res)
  })

  return {
    save,
    saveEvaluationScore,
    liveClassUrl: decodeURIComponent(routeParams.live_url),
    evaluationScore: evaluationScore,
    processRecordStore,
  }
}

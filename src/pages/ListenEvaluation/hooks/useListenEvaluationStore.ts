import type { /* EvaluationScore,  */ ListenEvaluationStore } from '../types'
import { getEvaluationList, saveListenProcess } from '@/api/course'
import useRouterParams from '@/hooks/useRouterParams'
import type { ProcessRecordStore } from './useProcessRecordStore'
import useProcessRecordStore from './useProcessRecordStore'
import useToastInject from '@/hooks/useToastInject'
import useEvaluationScoreStore from './useEvaluationScoreStore'
// import type { Ref } from 'vue'
import type {
  // FileRecordItemParam,
  SaveListenProcessParams,
  // LessonScoreParam,
  // RecordItemParam,
  // SaveListenProcessParamsDetail,
} from '@/api/model/courseModel'

export interface RouteParams {
  id: string
  course_id: string
  subject_id: string
  grade_id: string
  user_id: string
  live_url: string
}

function useSave(
  routeParams: RouteParams,
  processRecordStore: ProcessRecordStore,
  // evaluationScore: Ref<EvaluationScore>,
) {
  const { loading, toastSuccess } = useToastInject()

  const { processRecordList } = processRecordStore

  function resolveRequestData(): SaveListenProcessParams[] {
    // return [
    //   {
    //     // id: 0,
    //     user_eval_id: 0,
    //     title: 'string',
    //     order_index: 0,
    //     details: [
    //       {
    //         id: 0,
    //         user_eval_id: 0,
    //         process_id: 0,
    //         type: 0,
    //         val: 'string',
    //         order_index: 0,
    //       },
    //     ],
    //   },
    // ]
    const userEvalId = Number(routeParams.id)
    return processRecordList.value.map((record, i) => {
      const details: SaveListenProcessParams['details'] = []
      let orderIndex = 0
      record.list.forEach((item) => {
        switch (item.type) {
          case 'think':
            details.push({
              // id: 0,
              user_eval_id: userEvalId,
              // process_id: 0,
              type: 1,
              val: item.text,
              order_index: orderIndex,
            })
            break

          case 'picture':
          case 'drawing':
            item.files.forEach((file) => {
              details.push({
                // id: 0,
                user_eval_id: userEvalId,
                // process_id: 0,
                type: 2,
                val: file.url,
                order_index: orderIndex,
              })
            })
            break
          case 'video':
            item.files.forEach((file) => {
              details.push({
                // id: 0,
                user_eval_id: userEvalId,
                // process_id: 0,
                type: 3,
                val: file.url,
                order_index: orderIndex,
              })
            })
            break
        }

        orderIndex++
      })
      return {
        // id: 0,
        user_eval_id: userEvalId,
        title: record.text,
        order_index: i,
        details,
      }
    })

    // const lessonRecordParam: SaveListenProcessParams['lesson_record'] = []

    // processRecordList.value.forEach((record) => {
    //   const contents: RecordItemParam[] = []
    //   lessonRecordParam.push({
    //     contents,
    //   })
    //   contents.push({
    //     content_label_type: 'body',
    //     content: record.text,
    //   })

    //   record.list.forEach((item) => {
    //     switch (item.type) {
    //       case 'think':
    //         contents.push({
    //           content_label_type: 'think',
    //           content: item.text,
    //         })
    //         break

    //       case 'picture':
    //       case 'drawing':
    //       case 'video':
    //         const filesParam: FileRecordItemParam['contents'] = []
    //         item.files.forEach((file) => {
    //           filesParam.push({
    //             file_id: file.id,
    //             url: file.url,
    //           })
    //         })

    //         const map: {
    //           picture: 'picture'
    //           drawing: 'handwriting'
    //           video: 'video'
    //         } = {
    //           picture: 'picture',
    //           drawing: 'handwriting',
    //           video: 'video',
    //         }

    //         contents.push({
    //           content_label_type: map[item.type],
    //           contents: filesParam,
    //         })
    //         break
    //     }
    //   })
    // })

    // const lessonScore: LessonScoreParam[] = evaluationScore.value.scoreList.map((scoreItem) => {
    //   const selectedIndex = scoreItem.index
    //   let itemId = '0'
    //   let score = '0'
    //   if (selectedIndex > -1) {
    //     const option = scoreItem.options[selectedIndex]
    //     itemId = option.id
    //     score = scoreItem.weight
    //   }
    //   return {
    //     dimension_id: scoreItem.id, //主维度ID
    //     dimension_item_id: itemId, //维度子项 ，0 时为主维度ID
    //     score: score, //打分，dimensionitemId = 0，记录平均分
    //   }
    // })

    // const lessonScore: LessonScoreParam[] = evaluationScore.value.scoreList.reduce<
    //   LessonScoreParam[]
    // >((lessonScore, scoreItem) => {
    //   scoreItem.ids.forEach((itemId) => {
    //     lessonScore.push({
    //       dimension_id: scoreItem.id, //主维度ID
    //       dimension_item_id: itemId, //维度子项 ，0 时为主维度ID
    //       score: scoreItem.weight, //打分，dimensionitemId = 0，记录平均分
    //     })
    //   })

    //   return lessonScore
    // }, [])

    // return {
    //   course_id: routeParams.course_id, //课程ID
    //   // campus_id: 'string', //校区ID
    //   // campus_name: 'string', //校区名
    //   // evaluation_id: 'string', //评价主ID
    //   // school_id: 'string', // 学校ID
    //   // school_name: 'string', // 学校名
    //   type: 0, //0手机1 纸
    //   is_open_course: true, // 是否为公开课,用户区分公开课和普通课

    //   is_boutique_course: false, // 是否为精品课
    //   is_expert_course: false, // 是否为专家讲座
    //   lesson_evaluation_text: evaluationScore.value.reviews,

    //   lesson_record: lessonRecordParam,

    //   Lesson_score: lessonScore,
    // }
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
  }
}

export default function useListenEvaluationStore(): ListenEvaluationStore {
  const routeParams = useRouterParams<RouteParams>()

  // if (process.env.NODE_ENV !== 'production') {
  //   routeParams = {
  //     course_id: '3349473812636956689',
  //     grade_id: '1108',
  //     subject_id: '1',
  //     user_id: '467067',
  //   }
  // }

  const processRecordStore = useProcessRecordStore()
  const { evaluationScore, editInit: evaluationScoreEditInit } =
    useEvaluationScoreStore(routeParams)

  const { save } = useSave(routeParams, processRecordStore /* , evaluationScore */)

  // 编辑初始
  getEvaluationList({
    /**课程ID */
    course_id: routeParams.course_id,
    /**评课人ID */
    user_id: routeParams.user_id,
  }).then((res) => {
    processRecordStore.editInit(res)
    evaluationScoreEditInit(res)
  })

  return {
    save,
    liveClassUrl: decodeURIComponent(routeParams.live_url),
    evaluationScore: evaluationScore,
    processRecordStore,
  }
}

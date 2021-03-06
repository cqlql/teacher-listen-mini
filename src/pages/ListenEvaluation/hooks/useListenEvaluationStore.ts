import type { EvaluationScore, ListenEvaluationStore } from '../types'
import { getEvaluationList, lessonRecord } from '@/api/course'
import useRouterParams from '@/hooks/useRouterParams'
import type { ProcessRecordStore } from './useProcessRecordStore'
import useProcessRecordStore from './useProcessRecordStore'
import useToastInject from '@/hooks/useToastInject'
import useEvaluationScoreStore from './useEvaluationScoreStore'
import type { Ref } from 'vue'
import type {
  FileRecordItemParam,
  LessonRecordReqData,
  LessonScoreParam,
  RecordItemParam,
} from '@/api/model/courseModel'

export interface RouteParams {
  course_id: string
  subject_id: string
  grade_id: string
  user_id: string
  live_url: string
}

function useSave(
  routeParams: RouteParams,
  processRecordStore: ProcessRecordStore,
  evaluationScore: Ref<EvaluationScore>,
) {
  const { loading, toastSuccess } = useToastInject()

  const { processRecordList } = processRecordStore

  function resolveRequestData(): LessonRecordReqData {
    const lessonRecordParam: LessonRecordReqData['lesson_record'] = []

    processRecordList.value.forEach((record) => {
      const contents: RecordItemParam[] = []
      lessonRecordParam.push({
        contents,
      })
      contents.push({
        content_label_type: 'body',
        content: record.text,
      })

      record.list.forEach((item) => {
        switch (item.type) {
          case 'think':
            contents.push({
              content_label_type: 'think',
              content: item.text,
            })
            break

          case 'picture':
          case 'drawing':
          case 'video':
            const filesParam: FileRecordItemParam['contents'] = []
            item.files.forEach((file) => {
              filesParam.push({
                file_id: file.id,
                url: file.url,
              })
            })

            const map: {
              picture: 'picture'
              drawing: 'handwriting'
              video: 'video'
            } = {
              picture: 'picture',
              drawing: 'handwriting',
              video: 'video',
            }

            contents.push({
              content_label_type: map[item.type],
              contents: filesParam,
            })
            break
        }
      })
    })

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
    //     dimension_id: scoreItem.id, //?????????ID
    //     dimension_item_id: itemId, //???????????? ???0 ???????????????ID
    //     score: score, //?????????dimensionitemId = 0??????????????????
    //   }
    // })

    const lessonScore: LessonScoreParam[] = evaluationScore.value.scoreList.reduce<
      LessonScoreParam[]
    >((lessonScore, scoreItem) => {
      scoreItem.ids.forEach((itemId) => {
        lessonScore.push({
          dimension_id: scoreItem.id, //?????????ID
          dimension_item_id: itemId, //???????????? ???0 ???????????????ID
          score: scoreItem.weight, //?????????dimensionitemId = 0??????????????????
        })
      })

      return lessonScore
    }, [])

    return {
      course_id: routeParams.course_id, //??????ID
      // campus_id: 'string', //??????ID
      // campus_name: 'string', //?????????
      // evaluation_id: 'string', //?????????ID
      // school_id: 'string', // ??????ID
      // school_name: 'string', // ?????????
      type: 0, //0??????1 ???
      is_open_course: true, // ??????????????????,?????????????????????????????????

      is_boutique_course: false, // ??????????????????
      is_expert_course: false, // ?????????????????????
      lesson_evaluation_text: evaluationScore.value.reviews,

      lesson_record: lessonRecordParam,

      Lesson_score: lessonScore,
    }
  }

  return {
    async save() {
      // if (process.env.NODE_ENV !== 'production') {
      //   console.log(processRecordList, evaluationScore)
      //   console.log(resolveRequestData())
      //   toastSuccess('????????????')
      //   return
      // }

      if (loading.value) return
      loading.value = true
      await lessonRecord(resolveRequestData()).finally(() => {
        loading.value = false
      })

      toastSuccess('????????????')
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

  const { course_id: courseId } = routeParams

  const processRecordStore = useProcessRecordStore()
  const { evaluationScore, editInit: evaluationScoreEditInit } =
    useEvaluationScoreStore(routeParams)

  const { save } = useSave(routeParams, processRecordStore, evaluationScore)

  // ????????????
  getEvaluationList({
    /**??????ID */
    course_id: courseId,
    /**?????????ID */
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

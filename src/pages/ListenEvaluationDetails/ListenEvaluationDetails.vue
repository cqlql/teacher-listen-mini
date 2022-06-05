<script lang="ts" setup>
import CardPlus from '@/components/CardPlus.vue'
import TitleContent from '../ListenRecordDetails/comp/TitleContent.vue'
import TagView from '@/components/Tag/TagView.vue'
import { ref } from 'vue'
import { getRecordList } from '@/api/course'
import classify from '@/utils/each/classify'
import type { LessonScoreItem } from '@/api/model/courseModel'
import useRouterParams from '@/hooks/useRouterParams'
type PointList = {
  name: string
  children: {
    type: string
    name: string
  }[]
}[]

const pointList = ref<PointList>([])

const evaluationText = ref('')

let routeQuery = useRouterParams<{ userId: string; userName: string; courseId: string }>()
console.log('🚀 -- routeQuery', routeQuery)

getRecordList({
  course_id: routeQuery.courseId,
  user_id: routeQuery.userId,
}).then((res) => {
  console.log('🚀 -- res', res)
  let newList: PointList = []
  res.scoreList &&
    classify<LessonScoreItem>(
      res.scoreList,
      'dimension_id',
      (item) => {
        let children = []
        newList.push({
          name: item.dimension_name,
          children,
        })
        return children
      },
      (item) => {
        return {
          type: '',
          name: item.dimension_item_id,
        }
      },
    )

  pointList.value = newList
})
</script>
<template>
  <div class="ListenEvaluationDetails">
    <CardPlus :title2="routeQuery.userName + '的听课评价'">
      <TitleContent title="已选亮点：">
        <div v-for="(point, index) of pointList" :key="index" class="tags-list">
          <span class="name">{{ point.name }}:</span>
          <TagView v-for="(tag, i) of point.children" :key="i" :class="tag.type">{{
            tag.name
          }}</TagView>
        </div>
      </TitleContent>
      <TitleContent title="点评">{{ evaluationText }}</TitleContent>
    </CardPlus>
  </div>
</template>

<style lang="scss">
page {
  background-color: #f6f6f6;
}
.ListenEvaluationDetails {
  padding: 10px;
  margin-bottom: 30px;

  em {
    display: inline-block;
    width: 42px;
    height: 42px;
    background-color: #3aa6ff;
    font-size: 24px;
    line-height: 42px;
    border-radius: 42px;
    color: #fff;
    text-align: center;
  }

  .box {
    padding-top: 2px;
    padding-bottom: 30px;
  }

  .tags-list {
    .name {
      // margin-right: 10px;
    }

    .LabelView {
      margin-left: 5px;
      border-radius: 100px;
    }
  }

  .LabelContent {
    margin: 15px 0;
  }
}
</style>

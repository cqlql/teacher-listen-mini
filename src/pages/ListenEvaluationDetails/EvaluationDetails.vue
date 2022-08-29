<script lang="ts" setup>
import CardPlus from '@/components/CardPlus.vue'
import TitleContent from './comp/TitleContent.vue'
import TagView from '@/components/Tag/TagView.vue'
import { ref } from 'vue'
import { getListenTeacherEvaluationDetails } from '@/api/course'
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

getListenTeacherEvaluationDetails({
  courseId: Number(routeQuery.courseId),
  sysUserId: Number(routeQuery.userId),
}).then((res) => {
  pointList.value = [
    {
      name: '',
      children: res.eval_tmp_details.map((item) => {
        return {
          type: '',
          name: item.name,
        }
      }),
    },
  ]

  evaluationText.value = res.comments
})
</script>
<template>
  <div class="ListenEvaluationDetails">
    <CardPlus :title2="routeQuery.userName + '的听课评价'">
      <TitleContent title="已选亮点：">
        <div v-for="(point, index) of pointList" :key="index" class="tags-list">
          <!-- <span class="name">{{ point.name }}:</span> -->
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
    margin-top: 8px;
    .name {
      // margin-right: 10px;
    }

    .LabelView {
      margin-left: 5px;
      border-radius: 100px;
      height: 22px;
    }
  }

  .LabelContent {
    margin: 15px 0;
  }
}
</style>

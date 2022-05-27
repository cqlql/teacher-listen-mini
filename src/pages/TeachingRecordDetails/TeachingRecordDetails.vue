<script lang="ts" setup>
import InfoBox from '@/components/InfoBox.vue'
import CardPlus from '@/components/CardPlus.vue'
import ChartBarCustom from '@/components/ChartBarCustom.vue'
import { allRecordList } from '@/api/course'
import useRouterParams from '@/hooks/useRouterParams'
import type { EvaluationDataItem } from '../ListenEvaluationRecord/types'
import { ref } from 'vue'

let courseInfo = useRouterParams<EvaluationDataItem>()
console.log('🚀 -- courseInfo', courseInfo)

let courseInfoData = [
  {
    label: '授课名称',
    value: courseInfo.name,
  },

  {
    label: '授课人',
    value: courseInfo.teacher,
  },

  {
    label: '授课班级',
    value: courseInfo.className,
  },

  {
    label: '授课时间',
    value: courseInfo.dateTime,
  },
]

const numberListen = ref(0)
allRecordList({
  course_id: courseInfo.id,
}).then((res) => {
  console.log(res)
  numberListen.value = res.lessonRecordList.length
})
</script>
<template>
  <div class="ListenRecordDetails">
    <InfoBox title="课程信息" :data="courseInfoData"></InfoBox>
    <CardPlus title2="授课评价">
      <template #title2Right>
        <navigator class="navigator" url="/pages/ListeningTeacherList/ListeningTeacherList"
          >查看详情</navigator
        >
      </template>
      <template #title>
        <div>
          听评课人数： <em>{{ numberListen }}</em> 人
        </div>
      </template>
      <ChartBarCustom></ChartBarCustom>
    </CardPlus>
  </div>
</template>

<style lang="scss">
page {
  background-color: #f6f6f6;
}
.ListenRecordDetails {
  padding: 10px;
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
    padding-bottom: 30px;
  }

  .navigator {
    color: $primary-color;
  }
}
</style>

<script lang="ts" setup>
import InfoBox from '@/components/InfoBox.vue'
import CardPlus from '@/components/CardPlus.vue'
import ChartBarCustom from '@/components/ChartBarCustom.vue'
import { allRecordList, getAttachList, getTeachRecordDetails } from '@/api/course'
import useRouterParams from '@/hooks/useRouterParams'
import type { EvaluationDataItem } from '../ListenEvaluationRecord/types'
import type { Ref } from 'vue'
import { ref } from 'vue'

let courseInfo = useRouterParams<EvaluationDataItem>()

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

const files = ref<{ name: string }[]>([])

const numberListen = ref(0)

const evaluationChart: Ref<ChartBarCustomItem[]> = ref([])

// 加载授课文件列表
getAttachList(courseInfo.id).then((res) => {
  let attrs: { name: string }[] = []
  res.attachList.forEach((att) => {
    attrs.push(att)
  })
  files.value = attrs
})

allRecordList({
  course_id: courseInfo.id,
}).then((res) => {
  numberListen.value = res.lessonRecordList.length
})

getTeachRecordDetails({
  course_id: courseInfo.id,
}).then((res) => {
  let list: ChartBarCustomItem[] = []
  res.evaluation_count.forEach((item) => {
    item.evaluation_counts.forEach((childItem) => {
      list.push({
        name: childItem.dimension_item_name,
        count: Number(childItem.count),
      })
    })
  })
  evaluationChart.value = list
})
</script>
<template>
  <div class="ListenRecordDetails">
    <InfoBox title="课程信息" filesTitle="授课文件" :data="courseInfoData" :files="files"></InfoBox>
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
      <ChartBarCustom :data="evaluationChart"></ChartBarCustom>
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

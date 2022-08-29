<script lang="ts" setup>
import InfoBox from '@/components/InfoBox.vue'
import CardPlus from '@/components/CardPlus.vue'
import ChartBarCustom from '@/components/ChartBarCustom.vue'
import { getTeachRecordDetails } from '@/api/course'
import useRouterParams from '@/hooks/useRouterParams'
import type { EvaluationDataItem } from '../ListenEvaluationRecord/types'
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { ChartBarCustomItem } from '@/components/ChartBarCustom'
import { getFileNameByPath } from '@/utils/file'
import { Empty } from '@nutui/nutui-taro'

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
const evaluationChartIsEmpty = ref(false)

getTeachRecordDetails({
  id: Number(courseInfo.id),
}).then((res) => {
  evaluationChart.value = res.evals.map((e) => {
    return {
      name: e.name,
      count: Number(e.num),
    }
  })

  evaluationChartIsEmpty.value = res.evals.length === 0

  numberListen.value = res.total

  // 授课附件列表
  if (res.entity.att_urls) {
    files.value = res.entity.att_urls.map((att) => {
      return {
        name: getFileNameByPath(att.url),
      }
    })
  }
})
</script>
<template>
  <div class="ListenRecordDetails">
    <InfoBox title="课程信息" filesTitle="授课文件" :data="courseInfoData" :files="files"></InfoBox>
    <CardPlus title2="授课评价">
      <template #title2Right>
        <navigator
          class="navigator"
          :url="`/pages/ListeningTeacherList/ListeningTeacherList?courseId=${courseInfo.id}`"
          >查看详情</navigator
        >
      </template>
      <template #title>
        <div>
          听评课人数： <em>{{ numberListen }}</em> 人
        </div>
      </template>
      <ChartBarCustom :data="evaluationChart"></ChartBarCustom>
      <Empty v-if="evaluationChartIsEmpty"></Empty>
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

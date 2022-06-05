<script lang="ts" setup>
import InfoBox from '@/components/InfoBox.vue'
import useRouterParams from '@/hooks/useRouterParams'
import type { DingListenItem } from '../ListenEvaluationRecord/types'

let courseInfo = useRouterParams<DingListenItem>()

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
</script>
<template>
  <div class="DingListenDetails">
    <div class="info">
      <InfoBox title="课程信息" :data="courseInfoData"></InfoBox>
    </div>
    <video class="video" :src="courseInfo.videoUrl"></video>
  </div>
</template>

<style lang="scss">
page {
  background-color: #f6f6f6;
}
.DingListenDetails {
  // margin-bottom: 30px;

  .info {
    padding: 10px;
  }

  .video {
    width: 100%;
  }
}
</style>

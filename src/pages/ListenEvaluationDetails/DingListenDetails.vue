<script lang="ts" setup>
import InfoBox from '@/components/InfoBox.vue'
import usePage from '@/hooks/usePage'
import { ref } from 'vue'
import type { DingListenItem } from '../ListenEvaluationRecord/types'

let { pageOn } = usePage()
// let courseInfoData = ref<{ label: string; value: string }[]>([])
let courseInfoData = ref([
  {
    label: '授课名称',
    value: '',
  },

  {
    label: '授课人',
    value: '',
  },

  {
    label: '授课班级',
    value: '',
  },

  {
    label: '授课时间',
    value: '',
  },
])

const videos = ref<DingListenItem['videos']>([])

pageOn<DingListenItem>('acceptPageParams', (data) => {
  videos.value = data.videos
  courseInfoData.value = [
    {
      label: '授课名称',
      value: data.name,
    },

    {
      label: '授课人',
      value: data.teacher,
    },

    {
      label: '授课班级',
      value: data.className,
    },

    {
      label: '授课时间',
      value: data.dateTime,
    },
  ]
})
</script>
<template>
  <div class="DingListenDetails">
    <!-- <div class="info"> -->
    <InfoBox title="课程信息" :data="courseInfoData"></InfoBox>
    <!-- </div> -->
    <div class="video-wrapper">
      <div class="title">钉钉评课视频：</div>
      <div v-for="v of videos" :key="v.file_id" class="video-item">
        <video class="video" :src="v.play_url"></video>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
page {
  background-color: #f6f6f6;
}
.DingListenDetails {
  // margin-bottom: 30px;
  padding: 10px;
  // .info {
  //   padding: 10px;
  // }

  .video-wrapper {
    margin-top: 10px;

    .title {
      font-size: 16px;
      color: #000;
      padding: 10px 10px 8px;
      font-weight: bold;
    }

    .video-item + .video-item {
      margin-top: 5px;
    }

    .video {
      width: 100%;
      display: block;
    }
  }
}
</style>

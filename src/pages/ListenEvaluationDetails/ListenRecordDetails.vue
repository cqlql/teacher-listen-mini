<script lang="ts" setup>
import InfoBox from '@/components/InfoBox.vue'
import CardPlus from '@/components/CardPlus.vue'
import TitleContent from './comp/TitleContent.vue'
import LabelContent from './comp/LabelContent.vue'
import ImgList from '@/components/ImgView/ImgList.vue'
import VideoList from '@/components/VideoView/VideoList.vue'
import TagView from '@/components/Tag/TagView.vue'
import useRouterParams from '@/hooks/useRouterParams'
import { getListenDetails } from '@/api/course'
import type { EvaluationDataItem } from '../ListenEvaluationRecord/types'
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

// allRecordList(courseInfo.id).then((res) => {
//   console.log('🚀 -- allRecordList -- 听课详情', res)
// })
type PointList = {
  name: string
  children: {
    type: string
    name: string
  }[]
}[]

const pointList = ref<PointList>([])

const evaluationText = ref('')

interface ContentType {
  tag: string
  type: '' | 'warning' | 'cyan' | 'purple'
  text: string
  imgs: { url: string }[]
  videos: { url: string }[]
}

const recordList = ref<
  {
    name: string
    text: string
    contentList: ContentType[]
  }[]
>([])

getListenDetails({
  id: Number(courseInfo.id),
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
  recordList.value = res.process_list.map((record, index) => {
    let text = record.title
    const contentList: ContentType[] = []
    let grouping: {
      pictureItem: any
      drawingItem: any
      videoItem: any
    } = {
      pictureItem: null,
      drawingItem: null,
      videoItem: null,
    }
    record.details.forEach((content) => {
      switch (content.type) {
        case 1:
          contentList.push({
            tag: '思考',
            type: 'warning',
            text: content.val,
            imgs: [],
            videos: [],
          })
          break
        case 5:
          let pictureItem = grouping.pictureItem
          if (!pictureItem) {
            pictureItem = {
              tag: '照片',
              type: 'cyan',
              text: '',
              imgs: [],
              videos: [],
            }
            contentList.push(pictureItem)
          }
          pictureItem.imgs.push({
            url: content.val,
          })
          break
        case 10:
          let drawingItem = grouping.drawingItem
          if (!drawingItem) {
            drawingItem = {
              tag: '手写',
              type: '',
              text: '',
              imgs: [],
              videos: [],
            }
            contentList.push(drawingItem)
          }
          drawingItem.imgs.push({
            url: content.val,
          })

          break
        case 15:
          let videoItem = grouping.videoItem
          if (!videoItem) {
            videoItem = {
              tag: '视频',
              type: '',
              text: '',
              imgs: [],
              videos: [],
            }
            contentList.push(videoItem)
          }
          videoItem.videos.push({
            url: content.val,
          })
          break
      }
    })
    return {
      name: '课程记录' + (index + 1),
      text,
      contentList,
    }
  })
})
</script>
<template>
  <div class="ListenRecordDetails">
    <!-- <video src="http://39.134.115.163:8080/PLTV/88888910/224/3221225618/index.m3u8"></video> -->
    <InfoBox title="课程信息" :data="courseInfoData"></InfoBox>
    <CardPlus title2="听课评价">
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
    <CardPlus title2="过程记录">
      <div v-for="(recordItem, key) of recordList" :key="key">
        <TitleContent :title="recordItem.name + '：'">
          {{ recordItem.text }}
        </TitleContent>

        <LabelContent
          v-for="(conent, k) of recordItem.contentList"
          :key="k"
          :label="conent.tag"
          :type="conent.type"
        >
          <div>{{ conent.text }}</div>
          <ImgList v-if="conent.imgs.length" :deletable="false" :list="conent.imgs"></ImgList>
          <VideoList
            v-if="conent.videos.length"
            :deletable="false"
            :list="conent.videos"
          ></VideoList>
        </LabelContent>
      </div>
    </CardPlus>
  </div>
</template>

<style lang="scss">
page {
  background-color: #f6f6f6;
}
.ListenRecordDetails {
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
  // .tags-list:first-child {
  //   margin-top: 0;
  // }

  .LabelContent {
    margin: 15px 0;
  }
}
</style>

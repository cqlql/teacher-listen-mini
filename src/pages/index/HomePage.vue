<script lang="ts" setup>
// import { getVideoList } from '@/api/video';

import Taro, { useDidShow } from '@tarojs/taro'
import ListLoad from '@/components/ListLoad/ListLoad.vue'
import FixedButtons from './comps/FixedButtons.vue'
import ButtonSelect from '@/components/Button/ButtonSelect.vue'
import OneWeekPicker from '@/components/OneWeek/OneWeekPicker.vue'
import useWeekDateSelect from './hook/useWeekDateSelect'
import { getStorage, setStorage } from '@/utils/storage'
import useLoadData from './hook/useLoadData'
import { ref } from 'vue'
import type { CourseItemType } from './types'

const { isExpanded, weekDate, weekBtnText, isToday, weekItems } = useWeekDateSelect()
const { vListLoad, myCourseList, reqList, handleWeekDayChange, goToday } = useLoadData(weekDate)

// getVideoList({
//   video_type: 'boutique',
//   offset: '0',
//   list_mun: '10',
// });

if (process.env.NODE_ENV !== 'production') {
  let url = ''
  let tabUrl = ''

  // tabUrl = '/pages/profile/index'
  // tabUrl = '/pages/demo/DemoLot'
  // tabUrl = '/pages/ListenEvaluationRecord/ListenEvaluationRecord'

  // url = '/pages/DingEvaluationRecord/DingEvaluationRecord'
  // url = '/packageECharts/pages/EvaluationStatistics/MyEvaluationStatistics'
  // url = '/packageECharts/pages/EvaluationStatistics/AllEvaluationStatistics'
  // tabUrl = '/pages/WantListen/WantListen'

  if (url) {
    Taro.navigateTo({ url })
  } else if (tabUrl) {
    Taro.switchTab({
      url: tabUrl,
    })
  }
}

function toCreateListen() {
  Taro.navigateTo({
    url: '/pages/CreateListen/CreateListen',
  })
}

function toCreatedCourseRecord() {
  Taro.redirectTo({
    url: '/pages/CreatedCourseRecord/CreatedCourseRecord',
  })
}

function toProcessRecord(course: CourseItemType) {
  const currentUserId = getStorage('userId')
  // console.log(
  //   `/pages/ListenEvaluation/ListenEvaluation?user_id=${currentUserId}&course_id=${course.course_id}&subject_id=${course.subject_id}&grade_id=${course.grade_id}&live_url=${course.live_url}`,
  // )
  Taro.navigateTo({
    url: `/pages/ListenEvaluation/ListenEvaluation?id=${
      course.id
    }&user_id=${currentUserId}&course_id=${course.course_id}&subject_id=${
      course.subject_id
    }&grade_id=${course.grade_id}&live_url=${
      course.live_url ? encodeURIComponent(course.live_url) : ''
    }`,
  })
}

useDidShow(() => {
  // 从 CreateListen 页面过来需清掉 pageTemp
  // 防止 ListenApplicationRecord 触发两次请求
  setStorage('pageTemp', '')
})

const vFixedButtons = ref({
  outsideClose() {},
})
</script>
<template>
  <div @click="vFixedButtons.outsideClose">
    <div class="HomePage_top">
      <ButtonSelect v-model:isExpanded="isExpanded">
        {{ isToday ? '今天' : weekBtnText }}
      </ButtonSelect>
      <nut-button v-show="!isToday" class="todayBtn" @click="goToday">回今日</nut-button>
    </div>
    <ListLoad
      class="HomePage_listLoad"
      ref="vListLoad"
      :reqList="reqList"
      refresher-background="#fff"
      :scrollLowerEnabled="false"
    >
      <template #default>
        <div class="HomePage">
          <div class="HomePage_banners">
            <div
              v-for="course of myCourseList"
              :key="course.course_id"
              class="container"
              :class="course.type.type"
            >
              <div class="title">
                <span class="tag" :class="course.type.type">{{ course.sujectTag }}</span>
                <span class="title-name">《{{ course.name }}》</span>
              </div>

              <div class="main-info">
                <span class="time">{{ course.start_time }}</span>
                <!-- <span class="date">{{ course.startDate }}</span> -->
                <span class="teacher">{{ course.user_name }}老师</span>
              </div>
              <!-- <div class="info-row">{{ course.school_name }}{{ course.campus_name }}</div> -->
              <div class="info-row">授课班级：{{ course.grade_name }}{{ course.class_name }}</div>
              <div class="info-row">授课地点：{{ course.class_room_name }}</div>

              <div v-if="course.files.length" class="files">
                <span v-for="file of course.files" :key="file.id" class="file">{{
                  file.name
                }}</span>
              </div>

              <span class="status" :class="course.status.type">{{ course.status.label }}</span>

              <div class="bottom">
                <div class="tags">
                  <span class="tag" :class="course.type.type">
                    <nut-icon name="mask-close"></nut-icon>
                    <span>{{ course.type.label }}</span>
                  </span>
                  <!-- <span class="tag">
                    <nut-icon name="mask-close"></nut-icon>
                    <span>公开课</span>
                  </span> -->
                </div>
                <div class="btn">
                  <nut-button
                    v-if="course.status.id === '2'"
                    type="primary"
                    size="small"
                    @click="toProcessRecord(course)"
                    >听课记录</nut-button
                  >
                  <nut-button v-else type="primary" size="small" @click="toProcessRecord(course)"
                    >进入听课</nut-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </ListLoad>
    <FixedButtons
      ref="vFixedButtons"
      @click-one="toCreateListen"
      @click-two="toCreatedCourseRecord"
    />
    <OneWeekPicker
      ref="vOneWeekPickerRef"
      v-model:visible="isExpanded"
      v-model:date="weekDate"
      v-model:itemsData="weekItems"
      @change="handleWeekDayChange"
    ></OneWeekPicker>
  </div>
</template>

<style lang="scss">
$openColor: #3aa6ff;
$openBc: #eaf0fe;
$insideColor: #ffb21f;
$insideBc: #fff5dc;
$outsideColor: #d295e4;
$outsideBc: #fbf5ff;
.HomePage_top {
  padding: 0 12px;
  display: inline-flex;
  .ButtonSelect {
  }
  .todayBtn {
    line-height: 1;
    height: 30px;
    margin-left: 10px;
  }
}

.HomePage_listLoad {
  // background-color: #f5f5f5;
  // padding: 10px;
  // text-align: center;
  top: 45px;
}

.HomePage_banners {
  padding: 0 15px;

  .container {
    background-color: $openBc;
    border-radius: 10px;
    padding: 12px 12px 15px;
    position: relative;
    // overflow: hidden;
    margin-bottom: 15px;
    // background-image: linear-gradient(0deg, #eaf0fe 0%, #d3e0ff 100%);

    &.inside {
      background-color: $insideBc;
    }
    &.outside {
      background-color: $outsideBc;
      // background-image: linear-gradient(180deg, #f7dcff 0%, #fff 100%);
    }
  }

  .title {
    // line-height: 25px;
    .tag {
      width: 22px;
      height: 22px;
      background-color: $openColor;
      line-height: 22px;
      color: #fff;
      border-radius: 22px;
      display: inline-block;
      // font-size: 14px;
      text-align: center;
      vertical-align: middle;

      &.inside {
        background-color: $insideColor;
      }
      &.outside {
        background-color: $outsideColor;
      }
    }
  }

  .title-name {
    font-size: 18px;
    vertical-align: middle;
  }

  .main-info {
    // display: flex;
    // padding: 5px 0;
    padding-top: 10px;
    // display: flex;
  }

  .time {
    font-size: 26px;
  }

  // .date {
  //   padding-left: 8px;
  // }

  .teacher {
    // font-size: 14px;
    // line-height: 36px;
    padding-left: 8px;
    // vertical-align: 2px;
  }

  .info-row {
    // font-size: 14px;
    color: #3a3a3a;
    padding: 6px 0;
    line-height: 18px;
    padding-top: 8px;
  }

  .files {
    padding-top: 8px;
  }

  .file {
    // font-size: 14px;
    text-decoration: underline;
    word-break: break-all;
  }

  .status {
    position: absolute;
    top: 0;
    right: 12px;
    width: 50px;
    height: 30px;
    line-height: 26px;
    background-color: #ffb21f;
    border-radius: 0 0 2px 2px;
    color: #fff;
    font-size: 10px;
    text-align: center;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      border-style: solid;
      border-width: 0 25px 4px 25px;
      border-color: transparent transparent #d5effb transparent;
    }

    &.success {
      background-color: #4fc08d;
    }

    &.info {
      background-color: #e9e9e9;
      color: #999;
    }
  }

  .bottom {
    padding-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $primary-color;

    .tag.warning {
      color: $warning-color;
    }
    .tag.info {
      color: $outsideColor;
    }
    .tag > .nut-icon {
      vertical-align: middle;
      font-size: 8px;
    }
    .tag > .h5-span {
      vertical-align: middle;
    }
    .tag + .tag {
      margin-left: 5px;
    }
  }
}
</style>

<script lang="ts" setup>
import ListLoad from '@/components/ListLoad/ListLoad.vue'
import Taro from '@tarojs/taro'
import useRouterParams from '@/hooks/useRouterParams'
import { allRecordList } from '@/api/course'
import { ref } from 'vue'
import type { LessonRecordResult } from '@/api/model/courseModel'

let routeQuery = useRouterParams<{ courseId: string }>()

const list = ref<LessonRecordResult[]>([])

async function reqList() {
  return allRecordList({
    course_id: routeQuery.courseId,
  }).then((result) => {
    list.value = result.lessonRecordList
  })
}
function to(item: LessonRecordResult) {
  Taro.navigateTo({
    url: `/pages/ListenEvaluationDetails/ListenEvaluationDetails?courseId=${routeQuery.courseId}&userId=${item.user_id}&userName=${item.user_name}`,
  })
}
</script>
<template>
  <div class="ListeningTeacherList">
    <div class="topInfo"> 听课老师名单：{{ list.length }}人 </div>
    <div class="list">
      <ListLoad :scrollLowerEnabled="false" :reqList="reqList">
        <template #default>
          <div class="item" v-for="item of list" :key="item.user_id" @click="to(item)">
            <div class="avatar-icon">
              <nut-icon font-class-name="iconfont" class-prefix="icon" name="user-full"></nut-icon>
            </div>
            <div class="name">{{ item.user_name }}</div>
            <div class="arrow-icon">
              <nut-icon name="right"></nut-icon>
            </div>
          </div>
        </template>
      </ListLoad>
    </div>
  </div>
</template>

<style lang="scss">
.ListeningTeacherList {
  .topInfo {
    height: 42px;
    line-height: 42px;
    font-size: 18px;
    color: #0096ff;
    background-color: #f8f8f8;
    padding: 0 28px;
  }

  .list {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 42px;
    .LoadBar {
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
  .item {
    display: flex;
    line-height: 40px;
    padding: 10px 0;
    border-top: 1px solid #f8f8f8;
  }
  .item:first-child {
    border-top: none;
  }
  .avatar-icon {
    padding: 0 28px;
  }
  .name {
    flex: 1;
    font-size: 17px;
    color: #333;
    // line-height: 40px;
  }
  .icon-user-full {
    width: 40px;
    height: 40px;
    background-color: #3aa6ff;
    color: #fff;
    border-radius: 40px;
    font-size: 22px;
    display: block;
  }
  .arrow-icon {
    // line-height: 40px;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
}
</style>

<template>
  <ListLoad
    ref="vListLoad"
    :immediate="false"
    :startPage="0"
    :reqList="reqList"
    refresher-background="#f1f9fe"
    :scrollLowerEnabled="false"
  >
    <template #default="{ list: listCurrent }">
      <div class="OpenClassList">
        <AllOpenClassItem
          v-for="(item, index) of listCurrent"
          :key="item.id"
          :data="item"
          type="all"
          @refresh="refresh"
        >
          <template #btns>
            <nut-button
              v-if="item.user_course_id !== '0'"
              size="small"
              type="danger"
              plain
              @click="onDeleteUserCourse(item, listCurrent, index)"
              >移出计划</nut-button
            >
          </template>
        </AllOpenClassItem>
      </div>
    </template>
  </ListLoad>
</template>

<script lang="ts" setup>
import { delUserCourse, getUserCourse } from '@/api/course'
import ListLoad from '@/components/ListLoad/ListLoad.vue'
// import OnceCallback from '@/utils/once-callback'
import { nextTick } from '@tarojs/taro'
import dayjs from 'dayjs'
import { ref, watch } from 'vue'
import type CourseItem from '../types'
import AllOpenClassItem from './AllOpenClassItem.vue'

const vListLoad = ref({
  firstPageLoad() {},
})

// const onceCallback = new OnceCallback(init)

const props = defineProps<{
  active: boolean
  type: 'my'
}>()

watch(
  () => props.active,
  (active) => {
    if (active) {
      // onceCallback.execute()
      init()
    }
  },
  {
    immediate: true,
  },
)
function init() {
  nextTick(() => {
    vListLoad.value.firstPageLoad()
  })
}

function refresh() {
  vListLoad.value.firstPageLoad()
}

function reqList({ page }) {
  return getUserCourse({
    pageIndex: page,
    pageSize: 10,
    dateRange: dayjs().format('YYYY/MM/DD') + '-' + dayjs().add(6, 'day').format('YYYY/MM/DD'),
    keyword: '',
  }).then((res) => {
    let newList: CourseItem[] = res.courselist.map((item) => {
      return {
        // 新增用
        course_id: item.course_id,
        user_id: item.user_id,
        start_time: item.start_time,
        date_time: item.lesson_date, // 上课日期
        user_course_id: item.user_course_id,

        subject: item.subject_name[0],
        userName: item.user_name,
        courseName: item.name,
        place: item.class_room_name,
        date: item.lesson_date.split('T')[0],
        time: item.start_time.substring(0, 5),
        gradClass: item.grade_name + item.class_name,
      }
    })
    return newList
  })
}

function onDeleteUserCourse(item: CourseItem, list: CourseItem[], index: number) {
  delUserCourse(item.user_course_id).then(() => {
    list.splice(index, 1)
    if (list.length === 0) {
      vListLoad.value.firstPageLoad()
    }
  })
}
</script>
<!-- <style lang="scss">
.OpenClassList {
  // padding: 16px 0 16px;
}
</style> -->

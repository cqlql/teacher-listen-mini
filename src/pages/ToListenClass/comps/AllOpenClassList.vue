<template>
  <ListLoad ref="vListLoad" :startPage="0" :reqList="reqList" refresher-background="#f1f9fe">
    <template #default="{ list: listCurrent }">
      <div class="OpenClassList">
        <OpenClassPassedItem
          v-for="(item, index) of listCurrent"
          :key="item.id"
          :data="item"
          type="all"
          @refresh="refresh"
        >
          <template #btns>
            <nut-button
              size="small"
              type="primary"
              plain
              @click="onAddUserCourse(item, listCurrent, index)"
            >
              添加到听课
            </nut-button>
          </template>
        </OpenClassPassedItem>
      </div>
    </template>
  </ListLoad>
</template>

<script lang="ts" setup>
import { addUserCourse, openCourseListV1 } from '@/api/course'
import ListLoad from '@/components/ListLoad/ListLoad.vue'
// import OnceCallback from '@/utils/once-callback'
// import { nextTick } from '@tarojs/taro'
import { inject, ref } from 'vue'
import type CourseItem from '../ToListenClass'
import type { TopSearchParams } from '../types'
import OpenClassPassedItem from './AllOpenClassItem.vue'

const vListLoad = ref({
  firstPageLoad() {},
})

const topSearchParams = inject('topSearchParams') as TopSearchParams

topSearchParams.search = () => {
  vListLoad.value.firstPageLoad()
}

// // const onceCallback = new OnceCallback(init)

// const props = defineProps<{
//   active: boolean
// }>()

// watch(
//   () => props.active,
//   (active) => {
//     if (active) {
//       // onceCallback.execute()
//       init()
//     }
//   },
//   {
//     immediate: true,
//   },
// )
// function init() {
//   nextTick(() => {
//     vListLoad.value.firstPageLoad()
//   })
// }

function refresh() {
  vListLoad.value.firstPageLoad()
}

function reqList({ page }: { page: number }) {
  return openCourseListV1({
    is_history: 0,
    list_mun: 10,
    offset: page * 10,
    status: '2',
    date: topSearchParams.date,
    subject_id: topSearchParams.subject,
  }).then((res) => {
    let newList = res.listenList.map((item) => {
      return {
        // 新增用
        course_id: item.id,
        user_id: item.user_id,
        start_time: item.start_time,

        // 上课日期
        // date_time: item.lesson_date,
        date: item.lesson_date.split('T')[0],
        time: item.start_time.substring(0, 5),

        subject: item.subject_name[0],
        userName: item.user_name,
        courseName: item.name,
        place: item.class_room_name,

        gradClass: item.grade_name + item.class_name,
      }
    })
    return newList
  })
}

function onAddUserCourse(item: CourseItem, list: CourseItem[], index: number) {
  addUserCourse({
    course_id: item.course_id,
    user_id: item.user_id,
    date: item.date,
    start_time: item.start_time,
    status: '0',
  }).then(() => {
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

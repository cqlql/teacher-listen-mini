<template>
  <ListLoad ref="vListLoad" :startPage="0" :reqList="reqList" refresher-background="#f1f9fe">
    <template #default="{ list }: { list: CourseItem[] }">
      <div class="OpenClassList">
        <OpenClassPassedItem
          v-for="(item, index) of list"
          :key="item.course_id"
          :data="item"
          type="all"
          @refresh="refresh"
        >
          <template #btns>
            <nut-button v-if="item.is_add === 0" size="small" disabled type="default"
              >已添加</nut-button
            >
            <nut-button
              v-else
              size="small"
              type="primary"
              plain
              @click="onAddUserCourse(item, list, index)"
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
import type { CourseItem } from '../types'
import type { TopSearchParams } from '../types'
import OpenClassPassedItem from './AllOpenClassItem.vue'
import getGrade from '@/data/getGrade'
import useToastInject from '@/hooks/useToastInject'
const { toastSuccess } = useToastInject()
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

// function objectRemoveUndefined<T>(obj: T) {
//   obj.keys
//   return obj
// }

function reqList({ page }: { page: number }) {
  let dateRange: string | undefined
  if (topSearchParams.startDate) {
    dateRange = topSearchParams.startDate + '-' + topSearchParams.endDate
  }

  return openCourseListV1(
    {
      pageSize: 10,
      pageIndex: page,
      dateRange,
      subjectId: Number(topSearchParams.subject),
      status: 10,
    },
    {
      reqDataRemoveUndefined: true,
    },
  ).then((res) => {
    let newList: CourseItem[] = res.map((item) => {
      return {
        // 新增用
        course_id: String(item.id),
        user_id: String(item.teacher_id),
        start_time: item.s_time,

        // 上课日期
        // date_time: item.lesson_date,
        date: item.s_time.replace(/:\d\d$/, ''),

        subject: item.subject_name[0],
        userName: item.teacher_name,
        courseName: item.name,
        place: item.class_room_address,

        gradClass: getGrade(item.period, item.years) + item.class_name,

        is_add: item.is_add,
      }
    })
    return newList
  })
}

function onAddUserCourse(item: CourseItem, list: CourseItem[], index: number) {
  addUserCourse({
    courses_id: item.course_id,
    // user_id: item.user_id,
    // date: item.date,
    // start_time: item.start_time,
    // status: '0',
  }).then(() => {
    list.splice(index, 1)
    if (list.length === 0) {
      vListLoad.value.firstPageLoad()
    }
    toastSuccess('添加成功')
  })
}
</script>
<!-- <style lang="scss">
.OpenClassList {
  // padding: 16px 0 16px;
}
</style> -->

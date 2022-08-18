<template>
  <ListLoad :startPage="0" ref="vListLoad" :immediate="false" :reqList="reqList">
    <template #default="{ list: listCurrent }">
      <div class="OpenClassPassedList">
        <OpenCourseItem
          v-for="item of listCurrent"
          :key="item.id"
          :data="item"
          :type="type"
          @refresh="refresh"
        />
      </div>
    </template>
  </ListLoad>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import { inject, ref, watch } from 'vue'
import OnceCallback from '@/utils/once-callback'
import { openCourseList } from '@/api/course'
import dayjs from 'dayjs'

import ListLoad from '@/components/ListLoad/ListLoad.vue'
import OpenCourseItem from './CreatedCourseItem.vue'
import type { ApprovalStatus } from '../types'
import { nextTick } from '@tarojs/taro'

const vListLoad = ref({
  firstPageLoad() {},
})

const onceCallback = new OnceCallback(init)

const props = defineProps<{
  active: boolean
  type: ApprovalStatus
}>()

watch(
  () => props.active,
  (active) => {
    if (active) {
      onceCallback.execute()
    }
  },
  {
    immediate: true,
  },
)

const needRefreshType: Ref<ApprovalStatus | ''> | undefined = inject('needRefreshType')
watch(
  () => (needRefreshType as Ref<ApprovalStatus | ''>).value,
  (tp) => {
    if (tp === props.type) {
      onceCallback.clear()
      if (props.active) {
        onceCallback.execute()
      }

      // 复位，解决无法触发情况，比如撤销后切换到刷新列，再次回到撤销列撤销，再回来 needRefreshType 并没有改变
      ;(needRefreshType as Ref<ApprovalStatus | ''>).value = ''
    }
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

function reqList({ page }: { page: number }) {
  let statusMap: {
    pending: '0'
    failed: '1'
    passed: '2'
  } = {
    pending: '0',
    failed: '1',
    passed: '2',
  }
  // getCreatedCourseRecord
  return openCourseList({
    is_history: 0,
    list_mun: 10,
    offset: page * 10,
    status: statusMap[props.type],
  }).then((res) => {
    let newList = res.listenList.map((item) => {
      let date = item.lesson_date.split('T')[0]
      let dateTime = dayjs(date + ' ' + item.start_time).format('YYYY年MM月DD日_HH时mm分')

      let dateTimeArr = dateTime.split('_')

      return {
        id: item.id,
        courseName: item.name,
        userName: item.user_name,
        subjectName: item.subject_name,
        gradeNme: item.grade_name,
        className: item.class_name,
        date: date,
        dateLocal: dateTimeArr[0],
        time: dateTimeArr[1],
        rawData: item,
      }
    })
    return newList
  })
}

defineExpose({
  refresh,
})
</script>
<style lang="scss">
.OpenClassPassedList {
  padding: 16px 0;
}
</style>

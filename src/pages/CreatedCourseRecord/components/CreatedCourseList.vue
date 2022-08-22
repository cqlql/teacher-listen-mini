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
import { openCourseListV1 } from '@/api/course'
import dayjs from 'dayjs'

import ListLoad from '@/components/ListLoad/ListLoad.vue'
import OpenCourseItem from './CreatedCourseItem.vue'
import type { ApprovalStatus } from '../types'
import { nextTick } from '@tarojs/taro'
import getGrade from '@/data/getGrade'

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
    pending: 0
    failed: 2
    passed: 10
  } = {
    pending: 0,
    failed: 2,
    passed: 10,
  }
  // getCreatedCourseRecord
  return openCourseListV1({
    pageSize: 10,
    pageIndex: page,

    status: statusMap[props.type],
  }).then((res) => {
    let newList = res.map((item) => {
      return {
        id: item.id,
        courseName: item.name,
        userName: item.teacher_name,
        subjectName: item.subject_name,
        gradeName: getGrade(item.period, item.years),
        className: item.class_name,
        date: item.s_time.split(' ')[0],
        dateTimeLocal: dayjs(item.s_time).format('YYYY年MM月DD日 HH时mm分'),

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

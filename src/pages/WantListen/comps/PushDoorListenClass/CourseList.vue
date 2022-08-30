<script lang="ts" setup>
import { addUserCourse } from '@/api/course'
import ListLoad from '@/components/ListLoad/ListLoad.vue'

import Taro from '@tarojs/taro'
import { ref, watch } from 'vue'
import type { PushDoorCourseItemByTeacher } from '../../types'

const vListLoad = ref({
  firstPageLoad() {},
})

defineProps<{
  type: 'grade' | 'teacher'
  reqList: (params: { page: number }) => Promise<any>
}>()

const emit = defineEmits<{
  (e: 'update:search', fn: () => void)
}>()

watch(vListLoad, (vListLoad) => {
  emit('update:search', () => {
    vListLoad.firstPageLoad()
  })
})

function toProcessRecord(item: PushDoorCourseItemByTeacher) {
  // const currentUserId = getStorage('userId')
  Taro.navigateTo({
    url: `/pages/ListenEvaluation/ListenEvaluation?id=${item.eval_id}&live_url=`,
  })
}

function onAddUserCourse(item: PushDoorCourseItemByTeacher) {
  addUserCourse({
    timetable_id: Number(item.id),
  }).then(() => {
    // list.splice(index, 1)
    // if (list.length === 0) {
    //   vListLoad.value.firstPageLoad()
    // }

    Taro.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 2000,
    })

    vListLoad.value.firstPageLoad()
  })
}
</script>
<template>
  <ListLoad :startPage="0" ref="vListLoad" class="PushDoorListenClassList" :reqList="reqList">
    <template #default="{ list }: { list: PushDoorCourseItemByTeacher[] }">
      <div v-for="item of list" :key="item.id" class="row">
        <span v-if="type === 'grade'" class="cell">
          <nut-tag type="primary" plain>{{ item.subjectName[0] }}</nut-tag></span
        >
        <span class="cell name">{{ item.teacherName }}</span>
        <span class="cell" v-if="type === 'teacher'">{{ item.className }}</span>
        <span class="cell">{{ item.lessonName }}</span>
        <span class="cell">
          <nut-button
            v-if="item.eval_id === '0'"
            plain
            type="primary"
            size="mini"
            @click="onAddUserCourse(item)"
            >添加到听课</nut-button
          >
          <nut-button v-else plain type="primary" size="mini" @click="toProcessRecord(item)"
            >进入听课</nut-button
          >

          <!-- <nut-button v-if="item.is_add === 1" size="small" disabled type="default"
            >已添加</nut-button
          >
          <nut-button v-else size="small" type="primary" plain @click="onAddUserCourse(item)">
            添加到听课
          </nut-button> -->
          <!-- <nut-button plain type="primary" size="mini" @click="toProcessRecord(item)"
            >进入听课</nut-button
          > -->
        </span>
      </div>
    </template>
  </ListLoad>
</template>

<style lang="scss">
.PushDoorListenClassList {
  .row {
    display: flex;
    justify-content: space-around;
    height: 50px;
    // line-height: 50px;
  }
  .cell {
    display: flex;
    // justify-content: center;
    align-items: center;
  }
  .name {
    font-weight: bold;
  }
}
</style>

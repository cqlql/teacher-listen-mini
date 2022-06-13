<script lang="ts" setup>
import type { OpenCourseItemResult } from '@/api/model/courseModel'
import ListLoad from '@/components/ListLoad/ListLoad.vue'
import { getStorage } from '@/utils/storage'
import Taro from '@tarojs/taro'
import { ref, watch } from 'vue'

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
  if (vListLoad) {
    emit('update:search', () => {
      vListLoad.firstPageLoad()
    })
  }
})

function toProcessRecord(item: OpenCourseItemResult) {
  const currentUserId = getStorage('userId')
  Taro.navigateTo({
    url: `/pages/ListenEvaluation/ListenEvaluation?user_id=${currentUserId}&course_id=${
      item.id
    }&subject_id=${item.subject_id}&grade_id=${item.grade_id}&live_url=${encodeURIComponent(
      item.live_url,
    )}`,
  })
}
</script>
<template>
  <ListLoad :startPage="0" ref="vListLoad" class="ListenClassCategoryList" :reqList="reqList">
    <template #default="{ list }: { list: OpenCourseItemResult[] }">
      <div v-for="item of list" :key="item.id" class="row">
        <span v-if="type === 'grade'" class="cell">
          <nut-tag type="primary" plain>{{ item.subject_name[0] }}</nut-tag></span
        >
        <span class="cell name">{{ item.user_name }}</span>
        <span class="cell" v-if="type === 'teacher'">{{ item.grade_name + item.class_name }}</span>
        <span class="cell">{{ item.lesson_name }}</span>
        <span class="cell">
          <!-- <nut-button plain type="primary" size="mini" @click="onAddUserCourse(item, list, index)"
            >添加到听课</nut-button
          > -->
          <nut-button plain type="primary" size="mini" @click="toProcessRecord(item)"
            >进入听课</nut-button
          >
          <!-- <nut-button type="primary" size="small" @click="toProcessRecord(course)"
            >进入听课</nut-button
          > -->
        </span>
      </div>
    </template>
  </ListLoad>
</template>

<style lang="scss">
.ListenClassCategoryList {
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

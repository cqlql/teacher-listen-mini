<script lang="ts" setup>
import { addUserCourse } from '@/api/course'
import type { OpenCourseItemResult } from '@/api/model/courseModel'
import ListLoad from '@/components/ListLoad/ListLoad.vue'
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

function onAddUserCourse(item: OpenCourseItemResult, list: OpenCourseItemResult[], index: number) {
  addUserCourse({
    course_id: item.id,
    user_id: item.user_id,
    date: item.lesson_date.split('T')[0],
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
<template>
  <ListLoad :startPage="0" ref="vListLoad" class="ListenClassCategoryList" :reqList="reqList">
    <template #default="{ list }: { list: OpenCourseItemResult[] }">
      <div v-for="(item, index) of list" :key="item.id" class="row">
        <span v-if="type === 'grade'" class="cell">
          <nut-tag type="primary" plain>{{ item.subject_name[0] }}</nut-tag></span
        >
        <span class="cell name">{{ item.user_name }}</span>
        <span class="cell" v-if="type === 'teacher'">{{ item.grade_name + item.class_name }}</span>
        <span class="cell">第一节</span>
        <span class="cell">
          <nut-button plain type="primary" size="mini" @click="onAddUserCourse(item, list, index)"
            >添加到听课</nut-button
          >
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

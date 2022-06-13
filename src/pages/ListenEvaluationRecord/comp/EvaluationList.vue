<script lang="ts" setup>
import ListLoad from '@/components/ListLoad/ListLoad.vue'
import type { Ref } from 'vue'
import { computed } from 'vue'
import { inject, ref, watch } from 'vue'

import EvaluationItem from './EvaluationItem.vue'
import SearchBarSelect2 from '@/components/SearchBarSelect2.vue'
import { coursesRecordList } from '@/api/course'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { EvaluationDataItem, SearchOptions } from '../types'
import Taro from '@tarojs/taro'
import type { CoursesRecordListResultItem } from '@/api/model/courseModel'

const searchOptions = inject('searchOptions') as Ref<SearchOptions>

const vListLoad = ref<{
  firstPageLoad: () => void
}>()

const props = defineProps<{
  type: 'listen' | 'teaching'
  active: boolean
  noSearch?: boolean
}>()

const searchOption = computed(() => {
  return searchOptions.value[props.type]
})

watch(vListLoad, () => {
  firstPageLoad()
})

watch(
  () => props.active,
  () => {
    firstPageLoad()
  },
)

function firstPageLoad() {
  if (props.active) {
    vListLoad.value?.firstPageLoad()
    searchOption.value.search = firstPageLoad
  }
}

function resolveCoursesList(resultItem: CoursesRecordListResultItem) {
  if (resultItem.is_open_courses === 'true') {
    return '公开课'
  }
  if (resultItem.is_self === 'true') {
    return '校内课'
  }

  return '校外课'
}

async function reqList({ page }) {
  let searchOptionValue = searchOption.value

  return coursesRecordList({
    list_mun: 10,
    page: page * 10,
    course_type: props.type === 'listen' ? '1' : '0',
    role_type: '0',
    power: '0',
    user_id: searchOptionValue.userId,
    search_name: searchOptionValue.keyword,
    start_date: searchOptionValue.dateStart,
    end_date: searchOptionValue.dateEnd,
  }).then((res) => {
    return res.coursesList.map((resultItem) => {
      return {
        id: resultItem.id,
        dateTime: resultItem.lesson_date + ' ' + resultItem.start_time,
        type: resolveCoursesList(resultItem), // 公开课
        subjectShort: resultItem.subject_name[0],
        name: resultItem.name,
        teacher: resultItem.user_name,
        className: resultItem.grade_name + resultItem.class_name,
        userId: resultItem.user_id,
      }
    })
  })
}

function to(item: EvaluationDataItem) {
  let urlParams = `?id=${item.id}&name=${item.name}&dateTime=${item.dateTime}&className=${item.className}&teacher=${item.teacher}`
  Taro.navigateTo({
    url:
      props.type === 'listen'
        ? '/pages/ListenEvaluationDetails/ListenRecordDetails' + urlParams
        : '/pages/TeachingRecordDetails/TeachingRecordDetails' + urlParams,
  })
}
</script>
<template>
  <div class="EvaluationRecordList">
    <SearchBarSelect2
      v-if="!noSearch"
      v-model:isExpanded="searchOption.visible"
      v-model="searchOption.keyword"
      :selectedName="searchOption.selectedName"
      @search="searchOption.search"
    ></SearchBarSelect2>
    <div class="container">
      <ListLoad ref="vListLoad" :immediate="false" :startPage="0" :reqList="reqList">
        <template #default="{ list }: { list: EvaluationDataItem[] }">
          <EvaluationItem v-for="item of list" :key="item.id" :data="item" @click="to(item)">
          </EvaluationItem>
        </template>
      </ListLoad>
    </div>
  </div>
</template>

<style lang="scss">
.EvaluationRecordList {
  .container {
    height: calc(100vh - 96px);
    position: relative;
    padding: 0 10px;
  }
  .SearchBarSelect2 {
    // padding: 10px 16px;
  }
}
</style>

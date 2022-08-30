<script lang="ts" setup>
import ListLoad from '@/components/ListLoad/ListLoad.vue'
import type { Ref } from 'vue'
import { computed } from 'vue'
import { inject, ref, watch } from 'vue'

import EvaluationItem from './EvaluationItem.vue'
import SearchBarSelect2 from '@/components/SearchBarSelect2.vue'
import { getUserTeach, getUserCourse } from '@/api/course'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { EvaluationDataItem, SearchOptions } from '../types'
import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
import getCourseTypeMap from '@/data/get-course-type-map'
import getGrade from '@/data/getGrade'
import keywordSafeSign from '@/utils/http/keywordSafeSign'

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

async function reqList({ page }) {
  let searchOptionValue = searchOption.value
  const typeMap = getCourseTypeMap()
  let reqParams = {
    pageSize: 10,
    pageIndex: page,
    keyword: keywordSafeSign(searchOptionValue.keyword),
    dateRange:
      dayjs(searchOptionValue.dateStart).format('YYYY/MM/DD') +
      '-' +
      dayjs(searchOptionValue.dateEnd).format('YYYY/MM/DD'),
  }
  if (props.type === 'listen') {
    return getUserCourse(reqParams).then((res) =>
      res.map((resultItem) => {
        return {
          id: resultItem.id,
          dateTime: resultItem.s_time,
          type: typeMap[resultItem.type].label, // 公开课
          subjectShort: resultItem.subject_name[0],
          name: resultItem.courses_name,
          teacher: resultItem.teacher_name,
          className: getGrade(resultItem.period, resultItem.years),
          userId: resultItem.teacher_user_id,
        }
      }),
    )
  }
  return getUserTeach(reqParams).then((res) =>
    res.map((resultItem) => {
      return {
        id: resultItem.id,
        dateTime: resultItem.s_time,
        type: typeMap[resultItem.type].label, // 公开课
        subjectShort: resultItem.subject_name[0],
        name: resultItem.name,
        teacher: resultItem.teacher_name,
        className: getGrade(resultItem.period, resultItem.years),
        userId: resultItem.teacher_id,
      }
    }),
  )
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

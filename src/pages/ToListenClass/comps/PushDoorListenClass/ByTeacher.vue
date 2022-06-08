<script lang="ts" setup>
// import { reactive } from 'vue'

import ListenClassCategoryList from '../ListenClassCategoryList/ListenClassCategoryList.vue'
import SearchBarSelect from '@/components/SearchBarSelect.vue'
import TabButtons from '@/components/TabButtons/TabButtons.vue'
import LayoutView from './LayoutView.vue'
import { computed, inject, reactive, ref, watch } from 'vue'
import SelectCheckPopup from '@/components/SelectCheck/SelectCheckPopup.vue'

import usePeriodSubjectData from '@/hooks/usePeriodSubjectData'
import { getCourseList } from '@/api/course'
import type { TopSearchParams } from '../../types'
const topSearchParams = inject('topSearchParams') as TopSearchParams

interface OptionType {
  label: string
  value: string
}
let list: OptionType[] = []
for (let index = 0; index < 30; index++) {
  const element: OptionType = {
    label: '语文' + String(index),
    value: String(index),
  }
  list.push(element)
}

// 学段选择按钮是否展开
const isExpanded = ref(false)

const searchOptions = reactive({
  keyword: '',
  subject: '',
  period: '',
  periodName: '',
  search() {},
})

const { periodOptions, subjectData } = usePeriodSubjectData()

const subjectList = computed(() => {
  return (
    subjectData.value[searchOptions.period]?.map((item) => {
      return {
        label: item.subject_name,
        value: item.subject_id,
      }
    }) || []
  )
})

function setInitValue() {
  watch(periodOptions, (periodOptionsValue) => {
    let period = periodOptionsValue[0]
    if (period) {
      searchOptions.period = period.id
      searchOptions.periodName = period.name
    }
  })

  watch(
    () => searchOptions.period,
    () => {
      let subjectItem = subjectList.value[0]
      if (subjectItem) {
        searchOptions.subject = subjectItem.value
      }
      search()
    },
  )
}

function search() {
  searchOptions.search()
}

function reqList({ page }) {
  return getCourseList({
    list_mun: 10,
    page,
    subject_id: searchOptions.subject,
    period_id: searchOptions.period,
    user_name: searchOptions.keyword,
    lesson_date: topSearchParams.date,
  }).then((res) => {
    return res.getCurriculum
  })
}

setInitValue()

topSearchParams.search = search
</script>
<template>
  <div class="ToListenClassByTeacher">
    <SearchBarSelect
      v-model:searchValue="searchOptions.keyword"
      :selectedValue="searchOptions.periodName"
      v-model:isExpanded="isExpanded"
      placeholder="请输入老师姓名"
      @search="search"
    >
    </SearchBarSelect>

    <LayoutView>
      <template #leftNav>
        <TabButtons
          class="vertical"
          v-model="searchOptions.subject"
          :list="subjectList"
          @change="search"
        ></TabButtons>
      </template>
      <template #rightList>
        <ListenClassCategoryList
          v-if="searchOptions.subject"
          type="teacher"
          v-model:search="searchOptions.search"
          :reqList="reqList"
        >
        </ListenClassCategoryList>
      </template>
    </LayoutView>
  </div>
  <SelectCheckPopup
    v-model="searchOptions.period"
    v-model:label="searchOptions.periodName"
    v-model:visible="isExpanded"
    :options="periodOptions"
  ></SelectCheckPopup>
</template>

<style lang="scss">
.ToListenClassByTeacher {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .TabButtons.vertical {
    height: 100%;

    .item {
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>

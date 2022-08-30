<script lang="ts" setup>
import { provide, ref } from 'vue'
import EvaluationList from './comp/EvaluationList.vue'
import TabsText from '@/components/Tabs/TabsText.vue'
import ToastProvider from '@/components/ToastProvider/ToastProvider.vue'
import SemesterRangePicker from './comp/SemesterRangePicker.vue'
import type { SearchOptions } from './types'
import { getStorage } from '@/utils/storage'
import { getListenAndTeachStatistics } from '@/api/course'
import useSemesterRangeRemoteData from '@/hooks/useSemesterRangeRemoteData'

const searchOptions = ref<SearchOptions>({
  listen: {
    dateStart: '',
    dateEnd: '',
    keyword: '',
    selectedName: '请选择',
    defaultIndex: 0,
    visible: false,
    search: () => {},
  },
  teaching: {
    dateStart: '',
    dateEnd: '',
    keyword: '',
    selectedName: '请选择',
    defaultIndex: 0,
    visible: false,
    search: () => {},
  },
})

if (process.env.NODE_ENV !== 'production') {
  searchOptions.value.listen.dateStart = '2022/07/01'
  searchOptions.value.listen.dateEnd = '2022/09/01'
  searchOptions.value.listen.defaultIndex = -1
  searchOptions.value.teaching.dateStart = '2022/07/01'
  searchOptions.value.teaching.dateEnd = '2022/09/01'
  searchOptions.value.teaching.defaultIndex = -1
}

provide('searchOptions', searchOptions)

const tabList = ref([
  {
    name: '听课记录',
    value: '共(-)节',
  },
  {
    name: '授课记录',
    value: '共(-)节',
  },
])

getListenAndTeachStatistics({}).then((res) => {
  let user = res[0]
  tabList.value[0].value = `共(${user.listen_num_tot})节`
  tabList.value[1].value = `共(${user.give_num_tot})节`
})
const { semesterSelectDataLoading, semesterSelectOptions } = useSemesterRangeRemoteData()
</script>

<template>
  <ToastProvider ref="vToastProvider">
    <div class="ListenEvaluationRecord">
      <TabsText v-if="!semesterSelectDataLoading" :tabs="tabList">
        <template #0="{ active }">
          <EvaluationList :active="active" type="listen"></EvaluationList>
        </template>
        <template #1="{ active }">
          <EvaluationList :active="active" type="teaching"></EvaluationList>
        </template>
      </TabsText>
    </div>
    <SemesterRangePicker
      v-model:start="searchOptions.listen.dateStart"
      v-model:end="searchOptions.listen.dateEnd"
      v-model:label="searchOptions.listen.selectedName"
      v-model:visible="searchOptions.listen.visible"
      v-model:defaultIndex="searchOptions.listen.defaultIndex"
      :options="semesterSelectOptions"
      @ok="searchOptions.listen.search"
    ></SemesterRangePicker>
    <SemesterRangePicker
      v-model:start="searchOptions.teaching.dateStart"
      v-model:end="searchOptions.teaching.dateEnd"
      v-model:label="searchOptions.teaching.selectedName"
      v-model:visible="searchOptions.teaching.visible"
      v-model:defaultIndex="searchOptions.listen.defaultIndex"
      :options="semesterSelectOptions"
      @ok="searchOptions.teaching.search"
    ></SemesterRangePicker>
  </ToastProvider>
</template>

<style lang="scss">
.ListenEvaluationRecord {
  .nut-tabpane {
    padding: 0;
  }
  .nut-tabs__titles {
    padding: 0;
  }
}
</style>

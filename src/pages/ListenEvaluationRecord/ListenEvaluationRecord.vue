<script lang="ts" setup>
import { provide, ref } from 'vue'
import EvaluationList from './comp/EvaluationList.vue'
import TabsText from '@/components/Tabs/TabsText.vue'
import ToastProvider from '@/components/ToastProvider/ToastProvider.vue'
import SemesterRangePicker from './comp/SemesterRangePicker.vue'
import type { SearchOptions } from './types'

const searchOptions = ref<SearchOptions>({
  listen: {
    dateStart: '',
    dateEnd: '',
    keyword: '',
    selectedName: '请选择',
    visible: false,
    search: () => {},
  },
  teaching: {
    dateStart: '',
    dateEnd: '',
    keyword: '',
    selectedName: '请选择',
    visible: false,
    search: () => {},
  },
})

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
</script>

<template>
  <ToastProvider>
    <div class="ListenEvaluationRecord">
      <TabsText :tabs="tabList">
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
      @ok="searchOptions.listen.search"
    ></SemesterRangePicker>
    <SemesterRangePicker
      v-model:start="searchOptions.teaching.dateStart"
      v-model:end="searchOptions.teaching.dateEnd"
      v-model:label="searchOptions.teaching.selectedName"
      v-model:visible="searchOptions.teaching.visible"
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

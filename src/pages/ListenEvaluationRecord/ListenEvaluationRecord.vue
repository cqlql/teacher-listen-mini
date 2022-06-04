<script lang="ts" setup>
import { provide, ref } from 'vue'
import EvaluationList from './comp/EvaluationList.vue'
import TabsText from '@/components/Tabs/TabsText.vue'
import ToastProvider from '@/components/ToastProvider/ToastProvider.vue'
import SemesterRangePicker from './comp/SemesterRangePicker.vue'
import type { SearchOptions } from './types'
import { getStorage } from '@/utils/storage'
import { getListenAndTeachStatistics } from '@/api/course'

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

getListenAndTeachStatistics({
  user_id: getStorage('userId'),
}).then((res) => {
  let user = res.course_frequence_list[0]
  if (user) {
    tabList.value[0].value = `共(${user.listen_num})节`
    tabList.value[1].value = `共(${user.teaching_num})节`
  }
})
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
      v-model:defaultIndex="searchOptions.listen.defaultIndex"
      @ok="searchOptions.listen.search"
    ></SemesterRangePicker>
    <SemesterRangePicker
      v-model:start="searchOptions.teaching.dateStart"
      v-model:end="searchOptions.teaching.dateEnd"
      v-model:label="searchOptions.teaching.selectedName"
      v-model:visible="searchOptions.teaching.visible"
      v-model:defaultIndex="searchOptions.listen.defaultIndex"
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

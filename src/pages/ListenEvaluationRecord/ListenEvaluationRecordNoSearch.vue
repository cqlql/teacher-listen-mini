<script lang="ts" setup>
import { provide, ref } from 'vue'
import EvaluationList from './comp/EvaluationList.vue'
import TabsText from '@/components/Tabs/TabsText.vue'
import ToastProvider from '@/components/ToastProvider/ToastProvider.vue'
// import type { SearchOptions } from './types'
import useRouterParams from '@/hooks/useRouterParams'

interface ParamsType {
  dateStart: string
  dateEnd: string
  userId: string
}

interface SearchOptions {
  listen: ParamsType
  teaching: ParamsType
}

let routeQuery = useRouterParams<ParamsType>()

const searchOptions = ref<SearchOptions>({
  listen: routeQuery,
  teaching: routeQuery,
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
          <EvaluationList noSearch :active="active" type="listen"></EvaluationList>
        </template>
        <template #1="{ active }">
          <EvaluationList noSearch :active="active" type="teaching"></EvaluationList>
        </template>
      </TabsText>
    </div>
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

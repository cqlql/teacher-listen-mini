<script lang="ts" setup>
import { provide, ref } from 'vue'
import TabsColorBlack from '@/components/Tabs/TabsColorBlack.vue'
import ProcessRecord from './comp/ProcessRecord/ProcessRecord.vue'
import EvaluationScore from './comp/EvaluationScore/EvaluationScore.vue'
import { clickOutside } from './comp/ProcessRecord/hooks/usePopoverTool'
import useListenEvaluationStore from './hooks/useListenEvaluationStore'

const listenEvaluationStore = useListenEvaluationStore()
provide('listenEvaluationStore', listenEvaluationStore)

provide('processRecordStore', listenEvaluationStore.processRecordStore)

const tabIndex = ref(0)
// if (process.env.NODE_ENV !== 'production') {
//   tabIndex.value = 1
// }

const tabOptions = ref([
  {
    name: '听课记录',
  },
  {
    name: '听课评价',
  },
])
</script>
<template>
  <div @click="clickOutside">
    <TabsColorBlack class="ListenEvaluation" v-model="tabIndex" :options="tabOptions">
      <template #pane0>
        <ProcessRecord></ProcessRecord>
      </template>
      <template #pane1>
        <EvaluationScore></EvaluationScore>
      </template>
    </TabsColorBlack>
  </div>
</template>

<style lang="scss">
.ListenEvaluation {
  .nut-tabs__content {
    position: absolute;
    top: 35px;
    bottom: 0;
    left: 0;
    right: 0;
    /* stylelint-disable-next-line declaration-block-no-duplicate-properties */
    bottom: constant(safe-area-inset-bottom);
    /* stylelint-disable-next-line declaration-block-no-duplicate-properties */
    bottom: env(safe-area-inset-bottom);
  }
  .nut-tabpane {
    padding: 0;
    position: relative;
  }
}
</style>

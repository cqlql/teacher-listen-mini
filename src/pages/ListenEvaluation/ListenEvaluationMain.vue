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

const { liveClassUrl } = listenEvaluationStore

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
  <div class="ListenEvaluation" :class="{ hasLive: liveClassUrl }" @click="clickOutside">
    <div class="video">
      <!-- <video src="http://39.134.115.163:8080/PLTV/88888910/224/3221225618/index.m3u8"></video> -->
      <video :src="liveClassUrl"></video>
    </div>

    <TabsColorBlack v-model="tabIndex" :options="tabOptions">
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

  & > .video {
    margin-top: 35px;
    display: none;
    video {
      width: 100%;
    }
  }

  &.hasLive {
    & > .video {
      display: block;
    }
    .nut-tabs__titles {
      position: absolute;
      width: 100%;
      top: 0;
    }
    .nut-tabs__content {
      top: 260px;
    }
  }
}
</style>

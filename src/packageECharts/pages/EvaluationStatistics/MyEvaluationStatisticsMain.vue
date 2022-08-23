<script lang="ts" setup>
import CardPlus from '@/components/CardPlus.vue'
import EChart from '@/packageECharts/components/EChart.vue'
import ChartBarCustom from '@/components/ChartBarCustom.vue'
import { ref } from 'vue'
import { getStorage } from '@/utils/storage'
import { Empty } from '@nutui/nutui-taro'
import useToastInject from '@/hooks/useToastInject'
import useCountStatistics from './hooks/useCountStatistics'
import useEvaluationStatistics from './hooks/useEvaluationStatistics'
import type { DateRangeType } from '@/api/statistic'
const { toastLoading, toastClose } = useToastInject()

const rangeType = ref<DateRangeType>(3)
const userId = getStorage('userId')

const {
  empty: countEmpty,
  update: countUpdate,
  chartOptions: countChartOptions,
} = useCountStatistics(userId)

const {
  empty: chartBarEmpty,
  chartBarData,
  update: updateChartBar,
} = useEvaluationStatistics(userId)

function tabChange() {
  toastLoading()
  Promise.all([countUpdate(rangeType.value), updateChartBar(rangeType.value)]).finally(() => {
    toastClose()
  })
}

tabChange()
</script>
<template>
  <div class="EvaluationStatistics">
    <nut-tabs class="nut-tabs3 blue" v-model="rangeType" @change="tabChange">
      <nut-tabpane :pane-key="3" title="本学期"></nut-tabpane>
      <nut-tabpane :pane-key="2" title="本月"></nut-tabpane>
      <nut-tabpane :pane-key="1" title="本周"></nut-tabpane>
    </nut-tabs>
    <CardPlus title2="听授课次数统计：">
      <Empty v-if="countEmpty"></Empty>
      <EChart v-else ref="vEChart" :option="countChartOptions"> </EChart>
    </CardPlus>

    <CardPlus title2="授课评价统计：">
      <div class="safe-padding-bottom">
        <div class="teaching">
          <!-- <div class="personnel-list">
            <nut-tag type="warning" class="item" v-for="v of 5" :key="v">张三</nut-tag>
            <nut-tag type="info" class="item" v-for="v of 5" :key="v">张三</nut-tag>
          </div> -->
          <Empty v-if="chartBarEmpty"></Empty>

          <ChartBarCustom v-else :data="chartBarData"></ChartBarCustom>
        </div>
      </div>
    </CardPlus>
  </div>
</template>

<style lang="scss">
.EvaluationStatistics {
  .nut-tabs__titles {
    background-color: #fff;
    height: 40px;
  }

  .nut-tabs__content {
    display: none;
  }
  .box {
    // height: 100px;
  }
  .tit-bar {
    padding: 10px 10px 0;
  }
  .charBar {
    height: 300px;
  }

  .teaching {
    padding: 0 10px;

    .personnel-list {
      display: inline-flex;
      gap: 10px;
      flex-wrap: wrap;

      .nut-tag {
        border-radius: 50px;
        padding: 2px 6px;
      }
    }
    .CustomChartBar {
      padding-top: 20px;
    }
  }
}
</style>

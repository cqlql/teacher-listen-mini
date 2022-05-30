<script lang="ts" setup>
import CardPlus from '@/components/CardPlus.vue'
import EChart from '@/packageECharts/components/EChart.vue'
import ChartBarCustom from '@/components/ChartBarCustom.vue'
import { ref } from 'vue'
import { getEvaluationStatistics, getListenAndTeachStatistics } from '@/api/course'
import { getStorage } from '@/utils/storage'
import { Empty } from '@nutui/nutui-taro'
import type { ChartBarCustomItem } from '@/components/ChartBarCustom'
import type { GetListenAndTeachStatisticsParams } from '@/api/model/courseModel'
import useToastInject from '@/hooks/useToastInject'
const { toastLoading, toastClose } = useToastInject()
const rangeType = ref<GetListenAndTeachStatisticsParams['range_type']>('this_semester')

const userId = getStorage('userId')

const chartOption = ref()
const empty = ref(false)

const chartBarData = ref<ChartBarCustomItem[]>([])

function updateEChart() {
  toastLoading()
  getListenAndTeachStatistics({
    user_id: userId,
    range_type: rangeType.value,
  })
    .then((res) => {
      let list = res.course_frequence_list
      if (list.length) {
        let item = list[0]
        chartOption.value = {
          legend: {
            bottom: '0',
          },
          series: [
            {
              // name: 'Access From',
              type: 'pie',
              radius: '80%',
              // top: '0',
              center: ['50%', '45%'],
              label: {
                position: 'inside',
                formatter: '{c}',
                color: '#fff',
              },
              data: [
                { value: item.listen_num, name: '听课次数' },
                { value: item.teaching_num, name: '授课次数' },
              ],
              // emphasis: {
              //   itemStyle: {
              //     shadowBlur: 10,
              //     shadowOffsetX: 0,
              //     shadowColor: 'rgba(0, 0, 0, 0.5)',
              //   },
              // },
            },
          ],
        }
      } else {
        empty.value = true
      }
    })
    .finally(() => {
      toastClose()
    })
}

function updateChartBar() {
  getEvaluationStatistics({
    user_id: userId,

    range_type: rangeType.value,
  }).then((res) => {
    let list: ChartBarCustomItem[] = []
    res.evaluation_count.forEach((item) => {
      item.evaluation_counts.forEach((childItem) => {
        list.push({
          name: childItem.dimension_item_name,
          count: Number(childItem.count),
        })
      })
    })
    chartBarData.value = list
  })
}

function tabChange() {
  updateEChart()
  updateChartBar()
}

tabChange()
</script>
<template>
  <div class="EvaluationStatistics">
    <nut-tabs class="nut-tabs3 blue" v-model="rangeType" @change="tabChange">
      <nut-tabpane pane-key="this_semester" title="本学期"></nut-tabpane>
      <nut-tabpane pane-key="this_month" title="本月"></nut-tabpane>
      <nut-tabpane pane-key="this_week" title="本周"></nut-tabpane>
    </nut-tabs>
    <!-- <button @click="test">换数据</button> -->
    <CardPlus title2="听授课次数统计：">
      <Empty v-if="empty"></Empty>
      <EChart v-else ref="vEChart" :option="chartOption"> </EChart>
    </CardPlus>

    <CardPlus title2="授课评价统计：">
      <div class="safe-padding-bottom">
        <div class="teaching">
          <!-- <div class="personnel-list">
            <nut-tag type="warning" class="item" v-for="v of 5" :key="v">张三</nut-tag>
            <nut-tag type="info" class="item" v-for="v of 5" :key="v">张三</nut-tag>
          </div> -->

          <ChartBarCustom :data="chartBarData"></ChartBarCustom>
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

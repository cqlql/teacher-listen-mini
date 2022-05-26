<script lang="ts" setup>
import CardPlus from '@/components/CardPlus.vue'
import EChart from '@/packageECharts/components/EChart.vue'
import ChartBarCustom from '@/components/ChartBarCustom.vue'
import { ref } from 'vue'

async function getOption() {
  return {
    // title: {
    //   text: 'Referer of a Website',
    //   subtext: 'Fake Data',
    //   left: 'center',
    // },
    // tooltip: {
    //   trigger: 'item',
    // },
    legend: {
      // orient: 'vertical',
      // top: '10px',
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
          { value: 735, name: '听课次数' },
          { value: 580, name: '授课次数' },
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
}

function getOption2() {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve({
        legend: {
          // orient: 'vertical',
          // top: '10px',
          bottom: '0',
        },
        tooltip: {},
        dataset: {
          source: [
            ['product', '听课', '授课'],
            ['张三', 43.3, 85.8],
            ['李四', 83.1, 73.4],
          ],
        },
        xAxis: { type: 'category' },
        yAxis: {
          name: '次数',
          nameTextStyle: {
            align: 'right',
          },
          // nameLocation: 'start',
          // show: false,
          // type: 'log',
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }],
      })
    }, 1000)
  })
}
const chartOption = ref()
// function test() {
//   const label = {
//     normal: {
//       fontSize: 14,
//     },
//   }

//   chartOption.value = {
//     backgroundColor: '#ffffff',
//     series: [
//       {
//         label: {
//           show: false,
//         },
//         labelLine: {
//           show: false,
//         },
//         type: 'pie',
//         center: ['50%', '50%'],
//         radius: 100,
//         itemStyle: {
//           opacity: 0.5,
//         },
//         silent: true,

//         data: [
//           {
//             value: 72,
//           },
//           {
//             value: 72,
//           },
//           {
//             value: 72,
//           },
//           {
//             value: 72,
//           },
//           {
//             value: 72,
//           },
//         ],
//       },
//       {
//         label,
//         labelLine: {
//           show: false,
//         },
//         type: 'pie',
//         center: ['50%', '50%'],
//         radius: 50,

//         data: [
//           {
//             value: 72,
//             name: '北京',
//             labelLine: {
//               show: true,
//               length: 60,
//             },
//           },
//           {
//             value: 72,
//             itemStyle: {
//               opacity: 0,
//             },
//           },
//           {
//             value: 72,
//             itemStyle: {
//               opacity: 0,
//             },
//           },
//           {
//             value: 72,
//             itemStyle: {
//               opacity: 0,
//             },
//           },
//           {
//             value: 72,
//             itemStyle: {
//               opacity: 0,
//             },
//           },
//         ],
//       },

//       {
//         label,
//         labelLine: {
//           show: false,
//         },
//         type: 'pie',
//         center: ['50%', '50%'],
//         radius: 30,

//         data: [
//           {
//             value: 72,
//             itemStyle: {
//               opacity: 0,
//             },
//           },
//           {
//             value: 72,
//             name: '上海',
//             labelLine: {
//               show: true,
//               length: 80,
//             },
//           },
//           {
//             value: 72,
//             itemStyle: {
//               opacity: 0,
//             },
//           },
//           {
//             value: 72,
//             itemStyle: {
//               opacity: 0,
//             },
//           },
//           {
//             value: 72,
//             itemStyle: {
//               opacity: 0,
//             },
//           },
//         ],
//       },
//     ],
//   }
// }
</script>
<template>
  <div class="EvaluationStatistics">
    <nut-tabs class="nut-tabs3 blue" modelValue="0">
      <nut-tabpane title="本学期"></nut-tabpane>
      <nut-tabpane title="本月"></nut-tabpane>
      <nut-tabpane title="本周"></nut-tabpane>
    </nut-tabs>
    <!-- <button @click="test">换数据</button> -->
    <CardPlus title2="科组听授课次数统计：">
      <EChart :getOption="getOption" :option="chartOption"> </EChart>
    </CardPlus>

    <CardPlus title2="科组人员听授课次数统计：">
      <EChart class="charBar" :getOption="getOption2"> </EChart>
    </CardPlus>
    <CardPlus title2="科组人员授课评价统计：">
      <div class="safe-padding-bottom">
        <div class="teaching">
          <div class="personnel-list">
            <nut-tag type="warning" class="item" v-for="v of 5" :key="v">张三</nut-tag>
            <nut-tag type="info" class="item" v-for="v of 5" :key="v">张三</nut-tag>
          </div>

          <ChartBarCustom></ChartBarCustom>
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

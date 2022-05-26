<template>
  <div class="echarts">
    <ec-canvas id="mychart-dom-area" canvas-id="mychart-area" :ec="ec" />
  </div>
</template>

<script>
import * as echarts from 'echarts'

function initChart(canvas, width, height, dpr) {
  console.log('🚀 -- initChart -- canvas', canvas)
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr, // new
  })
  canvas.setChart(chart)

  const label = {
    normal: {
      fontSize: 14,
    },
  }

  var option = {
    backgroundColor: '#ffffff',
    series: [
      {
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        type: 'pie',
        center: ['50%', '50%'],
        radius: 100,
        itemStyle: {
          opacity: 0.5,
        },
        silent: true,

        data: [
          {
            value: 72,
          },
          {
            value: 72,
          },
          {
            value: 72,
          },
          {
            value: 72,
          },
          {
            value: 72,
          },
        ],
      },
      {
        label,
        labelLine: {
          show: false,
        },
        type: 'pie',
        center: ['50%', '50%'],
        radius: 50,

        data: [
          {
            value: 72,
            name: '北京',
            labelLine: {
              show: true,
              length: 60,
            },
          },
          {
            value: 72,
            itemStyle: {
              opacity: 0,
            },
          },
          {
            value: 72,
            itemStyle: {
              opacity: 0,
            },
          },
          {
            value: 72,
            itemStyle: {
              opacity: 0,
            },
          },
          {
            value: 72,
            itemStyle: {
              opacity: 0,
            },
          },
        ],
      },

      {
        label,
        labelLine: {
          show: false,
        },
        type: 'pie',
        center: ['50%', '50%'],
        radius: 30,

        data: [
          {
            value: 72,
            itemStyle: {
              opacity: 0,
            },
          },
          {
            value: 72,
            name: '上海',
            labelLine: {
              show: true,
              length: 80,
            },
          },
          {
            value: 72,
            itemStyle: {
              opacity: 0,
            },
          },
          {
            value: 72,
            itemStyle: {
              opacity: 0,
            },
          },
          {
            value: 72,
            itemStyle: {
              opacity: 0,
            },
          },
        ],
      },
    ],
  }

  chart.setOption(option)
  return chart
}
export default {
  data() {
    return {
      ec: {
        onInit: initChart,
      },
    }
  },
}
</script>

<!-- <script setup lang="ts">
const es={
  onInit:function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);

  var option = {
    ...
  };
  chart.setOption(option);
  return chart;
}
}
</script> -->

<!-- <script setup lang="ts"></script> -->

<style>
.echarts {
  height: 300px;
}
</style>

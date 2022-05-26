<template>
  <div class="echarts">
    <ec-canvas :ec="{ onInit }" />
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  props: {
    getOption: Function,
    option: Object,
  },
  watch: {
    option(option) {
      if (option && this.chart) {
        this.chart.setOption(option)
      }
    },
  },
  methods: {
    onInit(canvas, width, height, dpr) {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr, // new
      })
      canvas.setChart(chart)

      let option = this.option
      if (option) {
        chart.setOption(option)
      } else if (this.getOption) {
        chart.showLoading()
        this.getOption()
          .then((option) => {
            chart.setOption(option)
          })
          .finally(() => {
            chart.hideLoading()
          })
      }

      this.chart = chart
      return chart
    },
  },
}
</script>

<style>
.echarts {
  height: 200px;
}
</style>

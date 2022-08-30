import type { GetSchoolEvaluationStatisticsResult } from '@/api/statistic'
import { reactive } from 'vue'

export default function useSubjectGroupBar() {
  const subjectGroupBar = reactive({
    empty: false,
    chartOptions: {},
  })

  function updateSubjectGroupBar(rawData: GetSchoolEvaluationStatisticsResult) {
    const barDataSource: string[][] = []

    const totalNumber = barDataSource.length
    const showNumber = 4
    subjectGroupBar.empty = true
    if (rawData.group_total.length) {
      subjectGroupBar.empty = false
      barDataSource.unshift(['group', '听课', '授课'])

      subjectGroupBar.chartOptions = {
        legend: {
          // orient: 'vertical',
          // top: '10px',
          bottom: '0',
        },
        tooltip: {},
        dataset: {
          source: barDataSource,
        },
        grid: {
          height: '52%',
        },
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            interval: 0,
            rotate: 20,
          },
        },
        yAxis: {
          name: '次数',
          nameTextStyle: {
            align: 'right',
          },

          // nameLocation: 'start',
          // show: false,
          // type: 'log',
        },
        dataZoom: [
          {
            show: true,
            start: 0,
            end: (showNumber / totalNumber) * 100,
            height: 25,
            zoomLock: true, //
            brushSelect: false,
            bottom: 22,
          },
        ],
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              position: 'inside',
            },
          },
          {
            type: 'bar',
            label: {
              show: true,
              position: 'inside',
            },
          },
        ],
      }

      rawData.group_total.forEach((item) => {
        barDataSource.push([item.role_name, String(item.listen_num), String(item.give_num)])
      })
    }
  }
  return {
    subjectGroupBar,
    updateSubjectGroupBar,
  }
}

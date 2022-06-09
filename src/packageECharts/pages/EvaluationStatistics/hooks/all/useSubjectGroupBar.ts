import { getSubjectGroupsStatistics } from '@/api/course'
import type { GetListenAndTeachStatisticsParams } from '@/api/model/courseModel'
import { reactive } from 'vue'

export default function useSubjectGroupBar() {
  const subjectGroupBar = reactive({
    empty: false,
    chartOptions: {},
  })

  function updateSubjectGroupBar(rangeType: GetListenAndTeachStatisticsParams['range_type']) {
    return getSubjectGroupsStatistics({
      range_type: rangeType,
    }).then((result) => {
      const barDataSource: string[][] = []

      result.course_frequence.forEach((item) => {
        barDataSource.push([item.evaluation_group_name, item.listen_num, item.teaching_num])
      })
      const totalNumber = barDataSource.length
      const showNumber = 3
      if (barDataSource.length) {
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
          xAxis: {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              interval: 0,
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
      } else {
        subjectGroupBar.empty = true
      }
    })
  }
  return {
    subjectGroupBar,
    updateSubjectGroupBar,
  }
}

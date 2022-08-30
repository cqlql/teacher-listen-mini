import type { GetDepartmentEvaluationStatisticsResult } from '@/api/statistic'
import { reactive } from 'vue'
import { ref } from 'vue'

export default function useCountStatistics() {
  const empty = ref(false)
  // const chartOptions = ref<any>()
  const countStatistics = reactive({
    empty: false,
    pie: {
      chartOptions: {},
    },
    bar: {
      chartOptions: {},
    },
  })

  function update(result: GetDepartmentEvaluationStatisticsResult) {
    const barDataSource: any[] = [['product', '听课', '授课']]
    const totalNumber = result.group_total.length
    const showNumber = 5
    countStatistics.empty = result.group_total.length === 0

    let listenTotal = 0
    let teachTotal = 0
    result.total.forEach((item) => {
      listenTotal += Number(item.listen_num_tot)
      teachTotal += Number(item.give_num_tot)
    })

    result.group_total.forEach((item) => {
      barDataSource.push([item.teacher_name, item.listen_num, item.give_num])
      // barDataSource.push([
      //   String(~~(Math.random() * 10)),
      //   String(Math.random() * 10),
      //   String(Math.random() * 10),
      // ])
    })

    countStatistics.pie.chartOptions = {
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
            { value: listenTotal || 0, name: '听课次数' },
            { value: teachTotal || 0, name: '授课次数' },
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

    countStatistics.bar.chartOptions = {
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
  }

  return {
    empty,
    // chartOptions,
    update,

    countStatistics,
  }
}

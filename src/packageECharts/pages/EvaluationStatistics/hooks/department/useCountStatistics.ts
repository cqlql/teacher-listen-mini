import { getListenAndTeachStatistics } from '@/api/course'
import type {
  GetListenAndTeachStatisticsParams,
  GetListenAndTeachStatisticsResult,
} from '@/api/model/courseModel'
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

  function chartOptionsGenerate(list: GetListenAndTeachStatisticsResult['course_frequence_list']) {
    const barDataSource: any[] = [['product', '听课', '授课']]
    const totalNumber = list.length
    const showNumber = 5
    let listenTotal = 0
    let teachTotal = 0
    list.forEach((item) => {
      listenTotal += Number(item.listen_num)
      teachTotal += Number(item.teaching_num)

      barDataSource.push([item.user_name, item.listen_num, item.teaching_num])
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
            { value: listenTotal, name: '听课次数' },
            { value: teachTotal, name: '授课次数' },
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
      dataZoom: [
        {
          show: true,
          start: 0,
          end: (showNumber / totalNumber) * 100,
          zoomLock: true, //
          brushSelect: false,
        },
        // {
        //   show: true,
        //   yAxisIndex: 0,
        //   filterMode: 'empty',
        //   width: 30,
        //   height: '80%',
        //   showDataShadow: false,
        //   left: '93%'
        // }
      ],
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [{ type: 'bar' }, { type: 'bar' }],
    }
  }

  function update(rangeType: GetListenAndTeachStatisticsParams['range_type'], groupId: string) {
    return getListenAndTeachStatistics({
      group_id: groupId,
      range_type: rangeType,
    }).then((res) => {
      const list = res.course_frequence_list
      if (list.length) {
        chartOptionsGenerate(list)
      } else {
        countStatistics.empty = true
      }
    })
  }

  return {
    empty,
    // chartOptions,
    update,

    countStatistics,
  }
}

import { getListenAndTeachStatistics } from '@/api/course'
import type { GetListenAndTeachStatisticsParams } from '@/api/model/courseModel'
import { reactive } from 'vue'

export default function useCountPieChart() {
  const countPieState = reactive({
    empty: false,
    chartOptions: {},
  })

  function updateCountPie(rangeType: GetListenAndTeachStatisticsParams['range_type']) {
    return getListenAndTeachStatistics({
      range_type: rangeType,
    }).then(({ course_frequence_list: userList }) => {
      countPieState.empty = userList.length === 0

      let listenTotal = 0
      let teachTotal = 0

      userList.forEach((teacher) => {
        listenTotal += Number(teacher.listen_num)
        teachTotal += Number(teacher.teaching_num)
      })

      countPieState.chartOptions = {
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
    })
  }

  return {
    countPieState,
    updateCountPie,
  }
}

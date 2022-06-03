import { getListenAndTeachStatistics } from '@/api/course'
import type { GetListenAndTeachStatisticsParams } from '@/api/model/courseModel'
import type { Ref } from 'vue'
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

  function picChartOptionsGenerate(list: any[]) {}
  function barChartOptionsGenerate(list: any[]) {}

  function update(rangeType: GetListenAndTeachStatisticsParams['range_type'], groupId: string) {
    return getListenAndTeachStatistics({
      group_id: groupId,
      range_type: rangeType,
    }).then((res) => {
      const list = res.course_frequence_list
      if (list.length) {
        const item = list[0]
        picChartOptionsGenerate(list)
        barChartOptionsGenerate(list)
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
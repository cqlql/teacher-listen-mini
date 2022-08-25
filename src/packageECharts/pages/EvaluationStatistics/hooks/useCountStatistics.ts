import type { GetMyEvaluationStatisticsResult } from '@/api/statistic'
import { ref } from 'vue'

export default function useCountStatistics(userId) {
  const empty = ref(false)
  const chartOptions = ref<any>()

  function update(rawData: GetMyEvaluationStatisticsResult) {
    chartOptions.value = {
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
            { value: rawData.listen_num, name: '听课次数' },
            { value: rawData.give_num, name: '授课次数' },
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

  return {
    empty,
    chartOptions,
    update,
  }
}

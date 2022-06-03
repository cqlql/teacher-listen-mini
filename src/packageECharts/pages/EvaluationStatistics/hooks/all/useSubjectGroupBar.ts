import { getFullCourseStatistics } from '@/api/course'
import type { GetListenAndTeachStatisticsParams } from '@/api/model/courseModel'
import { reactive } from 'vue'

export default function useSubjectGroupBar() {
  const subjectGroupBar = reactive({
    empty: false,
    chartOptions: {},
  })

  function updateSubjectGroupBar(rangeType: GetListenAndTeachStatisticsParams['range_type']) {
    return getFullCourseStatistics({
      range_type: rangeType,
    }).then((result) => {
      const barDataSource: string[][] = []
      result.statisticsFrequency = [
        {
          campus_id: '5255421148254165520',
          campus_name: '主校区',
          subject_info: [
            {
              subject_id: '4922709411091722138',
              subject_name: '数学',
              course_info: {
                teaching_num: '27',
                listen_num: '2',
              },
            },
            {
              subject_id: '5338970627030348993',
              subject_name: '领导',
              course_info: {
                teaching_num: '2',
                listen_num: '2',
              },
            },
            {
              subject_id: '4679665164583612636',
              subject_name: '语文科组',
              course_info: {
                teaching_num: '2',
                listen_num: '26',
              },
            },
            {
              subject_id: '4691583378878836367',
              subject_name: '物化生',
              course_info: {
                teaching_num: '13',
                listen_num: '35',
              },
            },
          ],
        },
        {
          campus_id: '5255421148254165521',
          campus_name: '副校区',
          subject_info: [
            {
              subject_id: '4922709411091722131',
              subject_name: '数学1',
              course_info: {
                teaching_num: '27',
                listen_num: '2',
              },
            },
            {
              subject_id: '5338970627030348991',
              subject_name: '领导1',
              course_info: {
                teaching_num: '2',
                listen_num: '2',
              },
            },
            {
              subject_id: '4679665164583612631',
              subject_name: '语文科组1',
              course_info: {
                teaching_num: '2',
                listen_num: '26',
              },
            },
            {
              subject_id: '4691583378878836361',
              subject_name: '物化生1',
              course_info: {
                teaching_num: '13',
                listen_num: '35',
              },
            },
          ],
        },
      ]
      const labels: string[] = []
      result.statisticsFrequency.forEach((campus) => {
        campus.subject_info.forEach((subjectGroup) => {
          barDataSource.push([
            subjectGroup.subject_name,
            subjectGroup.course_info.listen_num,
            subjectGroup.course_info.teaching_num,
          ])
          labels.push(subjectGroup.subject_name)
        })
      })
      const totalNumber = barDataSource.length
      const showNumber = 5
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

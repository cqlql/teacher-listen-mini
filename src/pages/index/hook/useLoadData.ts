import { getUserCourse } from '@/api/course'
import getGrade from '@/data/getGrade'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { CourseItemType } from '../types'

function useGetList(weekDate: Ref<Dayjs>) {
  const myCourseList = ref<CourseItemType[]>([])

  function reqList() {
    const date = weekDate.value.format('YYYY/MM/DD')

    return getUserCourse({
      pageIndex: 0,
      pageSize: 10,
      dateRange: date + '-' + date,
      keyword: '',
    }).then((courselist) => {
      const statusMap = {
        0: {
          id: '0',
          type: 'warning',
          label: '未开始',
        },
        1: {
          id: '1',
          type: 'success',
          label: '正在授课',
        },
        2: {
          id: '2',
          type: 'info',
          label: '已结束',
        },
      }

      const nowDate = dayjs()

      return (myCourseList.value = courselist.map((item) => {
        const start = dayjs(item.s_time)
        const end = dayjs(item.e_time)

        let status = statusMap[1]

        if (end.isBefore(nowDate)) {
          status = statusMap[2]
        } else if (start.isAfter(nowDate)) {
          status = statusMap[0]
        }

        return {
          id: item.id,
          sujectTag: item.subject_name[0],
          name: item.courses_name,
          user_id: item.teacher_user_id,
          user_name: item.teacher_name,
          course_id: item.courses_id,
          subject_id: item.subject_id,
          grade_id: item.grade_id,
          // startDate: item.lesson_date.split('T')[0],
          start_time: start.format('HH:mm'),
          // end_time: item.e_time,
          // school_name: item.school_name,
          // campus_name: item.campus_name,
          grade_name: getGrade(item.period, item.years),
          class_name: item.classes_name,
          class_room_name: item.class_room_address,
          // files: item.LA,
          files: [],
          status,
          type: item.type
            ? {
                type: 'warning',
                label: '校外课',
              }
            : {
                type: 'success',
                label: '校内课',
              },
          live_url: item.playback_address,
        }
      }))
    })
  }

  return {
    myCourseList,
    reqList,
  }
}

export default function useHomePage(weekDate: Ref<Dayjs>) {
  const vListLoad = ref<{ firstPageLoad: () => void }>()
  const { myCourseList, reqList } = useGetList(weekDate)

  function handleWeekDayChange() {
    vListLoad.value?.firstPageLoad()
  }

  function goToday() {
    weekDate.value = dayjs()
    handleWeekDayChange()
  }

  return { vListLoad, myCourseList, handleWeekDayChange, reqList, goToday }
}

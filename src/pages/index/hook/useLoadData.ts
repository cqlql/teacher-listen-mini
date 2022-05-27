import { getUserCourse } from '@/api/course'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { Ref } from 'vue'
import { ref } from 'vue'

function useGetList(weekDate: Ref<Dayjs>) {
  const myCourseList = ref([
    {
      sujectTag: '',
      name: '',
      user_id: '',
      user_name: '',
      course_id: '',
      subject_id: '',
      grade_id: '',
      // startDate: '',
      start_time: '',
      end_time: '',
      school_name: '',
      campus_name: '',
      grade_name: '',
      class_name: '',
      class_room_name: '',
      live_url: '',
      files: [
        {
          id: '',
          name: '',
          url: '',
        },
      ],
      status: {
        id: '',
        type: '',
        label: '',
      },
      type: {
        type: '',
        label: '',
      },
    },
  ])

  function reqList() {
    const date = weekDate.value.format('YYYY-MM-DD')

    return getUserCourse({
      order_desc: 'true',
      start_date: date,
      end_date: date,
    }).then(({ courselist }) => {
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
        const startDate = item.lesson_date.split('T')[0]
        const start_time = item.start_time
        const end_time = item.end_time

        const start = dayjs(startDate + ' ' + start_time)
        const end = dayjs(startDate + ' ' + end_time)

        let status = statusMap[1]
        let type = {
          type: 'warning',
          label: '校外课',
        }

        if (end.isBefore(nowDate)) {
          status = statusMap[2]
        } else if (start.isAfter(nowDate)) {
          status = statusMap[0]
        }

        if (item.is_self) {
          type = {
            type: 'success',
            label: '校内课',
          }
        }

        return {
          sujectTag: item.subject_name[0],
          name: item.name,
          user_id: item.user_id,
          user_name: item.user_name,
          course_id: item.course_id,
          subject_id: item.subject_id,
          grade_id: item.grade_id,
          // startDate: item.lesson_date.split('T')[0],
          start_time: item.start_time.substring(0, 5),
          end_time: item.end_time,
          school_name: item.school_name,
          campus_name: item.campus_name,
          grade_name: item.grade_name,
          class_name: item.class_name,
          class_room_name: item.class_room_name,
          files: item.LA,
          status,
          type,
          live_url: item.live_url,
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

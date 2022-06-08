import dayjs from 'dayjs'

export default function useSemesterDate() {
  // const nowDate = dayjs()
  const nowDate = dayjs('2022-4-1')

  const nowYear = nowDate.year()
  const nowMonth = nowDate.month() + 1
  // const nowDay = nowDate.date()

  let currentSemesterStart = nowDate
  let currentSemesterEnd = nowDate
  let prevSemesterStart = nowDate
  let prevSemesterEnd = nowDate
  let currentYearStart = nowDate
  let currentYearEnd = nowDate
  let prevYearStart = nowDate
  let prevYearEnd = nowDate

  // 当前是否是上学期
  let isFirst = true
  // let isSecond = false
  // let isHoliday = true

  // 不算放假
  // if (nowMonth >= 9 || (nowMonth === 1 && nowDay <= 20)) {
  //   isFirst = true
  //   // isHoliday = false
  // } else if (nowDate.isAfter(dayjs(`${nowYear}-2-14`)) && nowDate.isBefore(`${nowYear}-7-30`)) {
  //   isSecond = true
  //   // isHoliday = false
  // }

  // 算上放假
  if (nowDate.isAfter(dayjs(`${nowYear}-2-15`)) && nowDate.isBefore(`${nowYear}-9-1`)) {
    isFirst = false
  }

  if (isFirst) {
    let year
    let nextYear
    if (nowMonth === 1) {
      year = nowYear - 1
      nextYear = nowYear
    } else {
      year = nowYear
      nextYear = nowYear + 1
    }
    currentSemesterStart = dayjs(`${year}-9-1`)
    currentSemesterEnd = dayjs(`${nextYear}-1-20`)

    prevSemesterStart = dayjs(`${year}-2-15`)
    prevSemesterEnd = dayjs(`${year}-7-30`)

    currentYearStart = dayjs(`${year}-9-1`)
    currentYearEnd = dayjs(`${year + 1}-7-30`)

    prevYearStart = dayjs(`${year - 1}-9-1`)
    prevYearEnd = dayjs(`${year}-7-30`)
  } else {
    currentSemesterStart = dayjs(`${nowYear}-2-15`)
    currentSemesterEnd = dayjs(`${nowYear}-7-30`)

    prevSemesterStart = dayjs(`${nowYear - 1}-9-1`)
    prevSemesterEnd = dayjs(`${nowYear}-1-20`)

    currentYearStart = dayjs(`${nowYear - 1}-9-1`)
    currentYearEnd = dayjs(`${nowYear}-7-30`)

    prevYearStart = dayjs(`${nowYear - 2}-9-1`)
    prevYearEnd = dayjs(`${nowYear - 1}-7-30`)
  }
  return {
    list: [
      {
        label: '本学期',
        start: currentSemesterStart.format('YYYY-MM-DD'),
        end: currentSemesterEnd.format('YYYY-MM-DD'),
      },
      {
        label: '上学期',
        start: prevSemesterStart.format('YYYY-MM-DD'),
        end: prevSemesterEnd.format('YYYY-MM-DD'),
      },
      {
        label: '本学年',
        start: currentYearStart.format('YYYY-MM-DD'),
        end: currentYearEnd.format('YYYY-MM-DD'),
      },
      {
        label: '上学年',
        start: prevYearStart.format('YYYY-MM-DD'),
        end: prevYearEnd.format('YYYY-MM-DD'),
      },
    ],
  }
}

import dayjs from 'dayjs'

// 当前是上学期还是下学期
function currentSemesterType(): 'first' | 'second' {
  const nowDate = dayjs()
  const nowYear = nowDate.year()
  // const nowMonth = nowDate.month() + 1
  if (nowDate.isAfter(dayjs(`${nowYear}-2-15`)) && nowDate.isBefore(`${nowYear}-9-1`)) {
    return 'second'
  }
  return 'first'
}

export function semesterRange() {
  const nowDate = dayjs()
  // const nowDate = dayjs('2022-4-1')

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

  if (currentSemesterType() === 'first') {
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
  return [
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
  ]
}

export function semesterRangeUseName() {
  const nowDate = dayjs()
  // const nowDate = dayjs('2022-4-1')

  const nowYear = nowDate.year()
  const nowMonth = nowDate.month() + 1
  // const nowDay = nowDate.date()

  let currentSemesterStart = nowDate
  let currentSemesterEnd = nowDate
  // const currentYearStart = nowDate
  // const currentYearEnd = nowDate

  const isFirst = currentSemesterType() === 'first'

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

    // currentYearStart = dayjs(`${year}-9-1`)
    // currentYearEnd = dayjs(`${year + 1}-7-30`)
  } else {
    currentSemesterStart = dayjs(`${nowYear}-2-15`)
    currentSemesterEnd = dayjs(`${nowYear}-7-30`)

    // currentYearStart = dayjs(`${nowYear - 1}-9-1`)
    // currentYearEnd = dayjs(`${nowYear}-7-30`)
  }

  return [
    {
      label: '本学期',
      value: 'this_semester',
      start: currentSemesterStart.format('YYYY-MM-DD'),
      end: currentSemesterEnd.format('YYYY-MM-DD'),
    },

    // {
    //   label: '本学年',
    //   value: 'full_semester',
    //   start: currentYearStart.format('YYYY-MM-DD'),
    //   end: currentYearEnd.format('YYYY-MM-DD'),
    // },
    {
      label: '本月',
      value: 'this_month',
      start: nowDate.startOf('month').format('YYYY-MM-DD'),
      end: nowDate.endOf('month').format('YYYY-MM-DD'),
    },
    {
      label: '本周',
      value: 'this_week',
      start: nowDate.startOf('week').add(1, 'day').format('YYYY-MM-DD'),
      end: nowDate.endOf('week').add(1, 'day').format('YYYY-MM-DD'),
    },
  ]
}

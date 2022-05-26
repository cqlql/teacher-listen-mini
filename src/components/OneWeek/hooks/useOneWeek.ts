import { ref, reactive } from 'vue'
import type { DateItem } from '../typing'

function generateHead(sundayFirst: boolean) {
  const head = ['一', '二', '三', '四', '五', '六']
  if (sundayFirst) {
    head.unshift('日')
  } else {
    head.push('日')
  }
  return head
}

function each(num: number, cb: (i: number) => void) {
  for (let i = 0; i < num; i++) {
    cb(i)
  }
}

function grouping<T>(list: any[], num: number, cb: (item: any) => any) {
  let row: any[]
  const rows: T[][] = []

  list.forEach((item, index) => {
    const rowIndex = index % num
    if (rowIndex === 0) {
      row = []
      rows.push(row)
    }

    row.push(cb(item))
  })

  return rows
}

export default function useOneWeek() {
  const sundayFirst = true

  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const d = currentDate.getDate()
  const day = currentDate.getDay()

  const selectedItem = ref<DateItem>({
    isToday: false,
    value: '',
    date: currentDate,
    info: '',
  })

  const list: any[] = []

  // 今天前补全
  each(day - (sundayFirst ? 0 : 1), () => {
    list.push(null)
  })

  list.push(currentDate)

  // 补充 从 currentDate 开始的6天
  each(6, (i) => {
    list.push(new Date(year, month, d + i + 1))
  })

  // 7天后补全
  each(7 - day - (sundayFirst ? 0 : 1), () => {
    list.push(null)
  })

  // 分组，7项为一组
  const rows = grouping<DateItem>(list, 7, (date: Date) => {
    let value = ''
    if (date) {
      const d = date.getDate()
      value = (d < 10 ? '0' : '') + d
    }
    return {
      isToday: date === currentDate,
      value,
      date,
      info: '',
    }
  })

  return { head: generateHead(sundayFirst), rows: reactive(rows), selectedItem }
}

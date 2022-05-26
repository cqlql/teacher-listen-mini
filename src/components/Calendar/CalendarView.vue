<template>
  <div class="calendar-contain">
    <div class="c-head c-row">
      <div v-for="(v, key) of head" :key="key" class="c-cell">
        {{ v }}
      </div>
    </div>
    <div v-for="(row, key) of rows" :key="key" class="c-row">
      <div
        v-for="item of row"
        :key="item.value"
        class="c-cell"
        :class="{
          other: item.notCurrentMonth,
          today: item.isToday,
          selected: item.selected,
        }"
        @click="onSelect(item)"
      >
        <div class="v">
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CalendarVue',
}
</script>
<script lang="ts" setup>
import { computed } from 'vue'
import type { DateItem } from './typing'

const props = withDefaults(
  defineProps<{
    sundayFirst?: boolean
    selectedDate: Date
    displayedDate?: Date
    todayDate?: Date
    /**可以通过修改 dateItem 更改当前显示 */
    dateHandle?: (dateItem: DateItem) => void
  }>(),
  {
    todayDate: () => new Date(),
    displayedDate: () => new Date(),
  },
)

const emits = defineEmits<{
  (e: 'select', dateItem: DateItem): void
  (e: 'change', dateItem: DateItem): void
  (e: 'update:selectedDate', date: Date): void
  (e: 'update:displayedDate', date: Date): void
}>()

const displayedYear = computed(() => props.displayedDate.getFullYear())
const displayedMonth = computed(() => props.displayedDate.getMonth())

function getDateInstanceLast(year: number, month: number) {
  return new Date(year, month, 0)
}

function isEqual(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

// 上月天要显示总数
const lastMonthDayTotal = computed(() => {
  return 7 - firstWeekDay.value + (props.sundayFirst ? 1 : 0)
})
// 上月天总数
const lastMonthDayTotalFull = computed(() => {
  return lastMonthDateLast.value.getDate()
})
// 剩下的要显示的下月天数
const nextMonthDayTotal = computed(() => {
  return 42 - lastMonthDayTotal.value - dayTotal.value
})
// 当月天数
const dayTotal = computed(() => {
  return dateLast.value.getDate()
})
// 当月1号星期几
const firstWeekDay = computed(() => {
  return dateFirst.value.getDay()
})
// 当月 date，第一天
const dateFirst = computed(() => {
  return new Date(displayedYear.value, displayedMonth.value, 1)
})
// 当月 date，最后一天
const dateLast = computed(() => {
  return getDateInstanceLast(displayedYear.value, displayedMonth.value + 1)
})
// 上月 date，最后一天
const lastMonthDateLast = computed(() => {
  return getDateInstanceLast(displayedYear.value, displayedMonth.value)
})
const head = computed(() => {
  const head = ['一', '二', '三', '四', '五', '六']
  if (props.sundayFirst) {
    head.unshift('日')
  } else {
    head.push('日')
  }
  return head
})
// 日期格子数据
const rows = computed(() => {
  let wholeIndex = 0

  const body: DateItem[][] = [[], [], [], [], [], []]

  let lastMonthDayTotalValue = lastMonthDayTotal.value
  let lastMonthDayTotalFullValue = lastMonthDayTotalFull.value
  let dayTotalValue = dayTotal.value
  let nextMonthDayTotalValue = nextMonthDayTotal.value

  let { todayDate, selectedDate, displayedDate, dateHandle } = props
  let displayedYear = displayedDate.getFullYear()
  let displayedMonth = displayedDate.getMonth()

  // 显示:部分上月
  for (let index = 0; index < lastMonthDayTotalValue; index++) {
    let value = lastMonthDayTotalFullValue - lastMonthDayTotalValue + index + 1
    body[0].push({
      notCurrentMonth: true,
      value,
      date: new Date(displayedYear, displayedMonth - 1, value),
    })
    wholeIndex++
  }

  // 显示:当前月
  for (let index = 0; index < dayTotalValue; index++) {
    let value = index + 1
    let displayedMoment = new Date(displayedYear, displayedMonth, value)
    let dateItem = {
      value,
      isToday: isEqual(todayDate, displayedMoment),
      selected: isEqual(selectedDate, displayedMoment),
      date: displayedMoment,
    }
    if (dateHandle) {
      dateHandle(dateItem)
    }
    body[~~(wholeIndex / 7)].push(dateItem)
    wholeIndex++
  }

  // 显示:部分下月
  for (let index = 0; index < nextMonthDayTotalValue; index++) {
    let value = index + 1
    body[~~(wholeIndex / 7)].push({
      notCurrentMonth: true,
      value,
      date: new Date(displayedYear, displayedMonth + 1, value),
    })
    wholeIndex++
  }

  return body
})

function onSelect(dateItem: DateItem) {
  if (!isEqual(props.selectedDate, dateItem.date)) {
    emits('change', dateItem)
    emits('update:selectedDate', dateItem.date)
    if (dateItem.notCurrentMonth) {
      emits('update:displayedDate', dateItem.date)
    }
  }

  emits('select', dateItem)
}
</script>

<style lang="scss">
$color: #3aa6ff;

.calendar-contain {
  // border: 1px solid #ddd;

  .c-row {
    display: flex;
  }

  .c-cell {
    flex: 1;
    height: 40px;
    // border: 1px solid red;
    // box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .v {
      width: 30px;
      height: 30px;
      box-sizing: border-box;
      line-height: 30px;
      text-align: center;
      border: solid 1px #fff;
      border-radius: 30px;
    }

    &.other {
      color: #aaa;
    }

    &.today {
      .v {
        border: solid 1px $color;
      }
    }

    &:hover {
      .v {
        color: $color;
      }
    }

    &.selected {
      .v {
        background-color: $color;
        color: #fff;
      }
    }
  }
}
</style>

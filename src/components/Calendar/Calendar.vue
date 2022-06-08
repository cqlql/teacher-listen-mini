<script lang="ts" setup>
import CalendarView from './CalendarView.vue'
import dayjs from 'dayjs'
import { computed, ref, watch } from 'vue'
import type { DateItem } from './typing'
const displayedDate = ref(new Date())
const displayedDatePlus = ref(dayjs(displayedDate.value))
const selectedDate = ref(new Date())

const displayDateText = computed(() => {
  return dayjs(displayedDate.value).format('YYYY年M月')
})

watch(displayedDate, (value) => {
  displayedDatePlus.value = dayjs(value)
})

const emit = defineEmits<{
  (e: 'select', dateItem: DateItem)
}>()

function onPrevMonth() {
  displayedDate.value = displayedDatePlus.value.subtract(1, 'M').toDate()
}
function onNextMonth() {
  displayedDate.value = displayedDatePlus.value.add(1, 'M').toDate()
}

function onToToday() {
  const today = (displayedDate.value = selectedDate.value = new Date())

  emit('select', {
    date: today,
  })
}
function dateHandle(_dateItem: DateItem) {}
function onSelect(dateItem: DateItem) {
  emit('select', dateItem)
}
function onChange(_dateItem: DateItem) {}
</script>
<template>
  <div class="CalendarDate">
    <div class="CalendarDate_header">
      <div class="l">{{ displayDateText }}</div>
      <div class="r">
        <nut-button @click="onPrevMonth" plain type="primary" icon="left"></nut-button>
        <nut-button @click="onNextMonth" plain type="primary" icon="right"></nut-button>
        <nut-button @click="onToToday" plain type="primary">今</nut-button>
        <!-- <nut-button plain type="primary">确认</nut-button> -->
      </div>
    </div>

    <CalendarView
      v-model:selectedDate="selectedDate"
      v-model:displayedDate="displayedDate"
      :dateHandle="dateHandle"
      @select="onSelect"
      @change="onChange"
    ></CalendarView>
  </div>
</template>

<style lang="scss">
.CalendarDate {
}
.CalendarDate_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  border-bottom: 1px solid #ddd;
  // height: 58px;
  box-sizing: border-box;
  .nut-button {
    // width: 38px;
    height: 38px;
    padding: 0 10px;
    border: none;
  }
  .nut-button + .nut-button {
    // margin-left: 10px;
  }
  .l {
    font-size: 20px;
  }
  .r {
    display: flex;
  }
}
</style>

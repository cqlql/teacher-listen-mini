<script lang="ts" setup>
// import Calendar from '@/components/Calendar/Calendar.vue'
import { Calendar as NutCalendar } from '@nutui/nutui-taro'
// import type { DateItem } from '@/components/Calendar/typing'
import dayjs from 'dayjs'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    // modelValue: string
    visible: boolean
    valueFormat?: string
    startDate: string
    endDate: string
  }>(),
  {
    valueFormat: 'YYYY-MM-DD',
  },
)

const emit = defineEmits<{
  // (e: 'update:modelValue', date: string)
  (e: 'update:startDate', date: string)
  (e: 'update:endDate', date: string)
  (e: 'update:visible', visible: boolean)
  // (e: 'select', dateItem: DateItem)
  (e: 'select')
}>()

// function select(dateItem: DateItem) {
//   emit('update:modelValue', dayjs(dateItem.date).format(props.valueFormat))
//   emit('select', dateItem)
//   emit('update:visible', false)
// }

const defaultValue = computed(() => {
  if (props.startDate && props.endDate) {
    return [dayjs(props.startDate).format('YYYY-MM-DD'), dayjs(props.endDate).format('YYYY-MM-DD')]
  }
  return undefined
})

const viewStart = computed(() => {
  return dayjs().subtract(1, 'year').format('YYYY-MM-DD')
})

function updateVisible(v: boolean) {
  emit('update:visible', v)
}

function close() {
  updateVisible(false)
}

function setChooseValue(dateRange) {
  let start = dayjs(dateRange[0][3])
  let end = dayjs(dateRange[1][3])
  emit('update:startDate', start.format(props.valueFormat))
  emit('update:endDate', end.format(props.valueFormat))
  emit('select')
  emit('update:visible', false)
}

function allDateRange() {
  emit('update:startDate', '')
  emit('update:endDate', '')
  emit('select')
  emit('update:visible', false)
}
</script>
<template>
  <!-- <nut-popup
    class="DatePicker"
    :visible="visible"
    :z-index="100"
    position="bottom"
    @update:visible="(v) => $emit('update:visible', v)"
  >
    <Calendar @select="select"></Calendar>
  </nut-popup> -->

  <nut-calendar
    :visible="visible"
    type="range"
    :default-value="defaultValue"
    @close="close"
    @choose="setChooseValue"
    @update:visible="updateVisible"
    :start-date="viewStart"
    :is-auto-back-fill="true"
  >
    <template #btn>
      <div>
        <nut-button size="mini" @click="allDateRange">选择全部时间段</nut-button>
      </div>
    </template>
  </nut-calendar>
</template>

<style lang="scss">
.DatePicker {
  .nut-popup {
    // padding: 10px 10px;
    // box-sizing: border-box;
  }
}
</style>

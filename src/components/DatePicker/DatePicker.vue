<template>
  <picker
    mode="multiSelector"
    @change="onMultiPickerChange"
    @columnchange="onMultiPickerColumnChange"
    :value="selectedIndexs"
    :range="rangeDate"
    range-key="name"
  >
    <slot v-if="$slots.default"></slot>
    <SelectBar v-else :name="nameFinal" :placeholder="placeholder" />
  </picker>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import dayjs from 'dayjs'

import SelectBar from '../Select/SelectBar.vue'

import useRangeDate from './hooks/useRangeDate'
import useToastInject from '@/hooks/useToastInject'

const { toastFail } = useToastInject()

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    format?: string
    valueFormat?: string
    startDate?: string
    endDate?: string
  }>(),
  {
    format: 'YYYY-MM-DD',
    valueFormat: 'YYYY-MM-DD',
  },
)

const emits = defineEmits<{
  (e: 'update:modelValue', v: string): void
}>()

const { rangeDate, updateDay, updateSelectedIndexs, selectedIndexs } = useRangeDate()

const nameFinal = computed(() => {
  let v = props.modelValue
  if (v) {
    return dayjs(v).format(props.format)
  }

  return ''
})

// const selectedIndexs = [0, 0, 0];

const currDate = ref<number[]>([])

watch(
  () => props.modelValue,
  (v) => {
    let d = dayjs(v || undefined)
    let arrVal = (currDate.value = d.toArray())
    updateDay(arrVal)
    updateSelectedIndexs(arrVal)
  },
  {
    immediate: true,
  },
)

function onMultiPickerChange({ detail }) {
  let dateArr: number[] = []
  let rangeDateVal = rangeDate.value
  detail.value.forEach((index, column) => {
    dateArr.push(rangeDateVal[column][index].id as number)
  })
  let [year, month, day] = dateArr
  let d = dayjs(new Date(year, month, day))

  if (props.startDate && d.isBefore(props.startDate)) {
    toastFail('不能小于开始时间')
    return
  }
  if (props.endDate && d.isAfter(props.endDate)) {
    toastFail('不能大于结束时间')
    return
  }

  emits('update:modelValue', d.format(props.valueFormat))
}
function onMultiPickerColumnChange({ detail }) {
  if (detail.column < 2) {
    currDate.value[detail.column] = rangeDate.value[detail.column][detail.value].id as number
    updateDay(currDate.value)
  }
}
</script>
<!-- <style lang="scss"></style> -->

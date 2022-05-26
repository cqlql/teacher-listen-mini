<script lang="ts" setup>
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import OneWeek from './OneWeek.vue'
import type { DateItem } from './typing'

const vOneWeekRef = ref(null)
const props = defineProps<{
  visible: boolean
  date: Dayjs
}>()

const emits = defineEmits<{
  (e: 'update:visible', visible: boolean): void
  (e: 'update:date', date: Dayjs): void
  (e: 'update:itemsData', itemsData: DateItem[][]): void
  (e: 'change', date: Dayjs): void
}>()

const dateValue = computed(() => {
  return props.date.date()
})

function close() {
  emits('update:visible', false)
}

function change(d: DateItem) {
  const dayDate = dayjs(d.date)
  emits('update:date', dayDate)
  emits('change', dayDate)
}
function select() {
  close()
}

defineExpose(vOneWeekRef)
</script>
<template>
  <nut-popup position="bottom" :visible="visible" @close="close">
    <OneWeek
      :value="dateValue"
      @change="change"
      @select="select"
      @update:itemsData="(items) => emits('update:itemsData', items)"
    />
  </nut-popup>
</template>

<!-- <style lang="scss"></style> -->

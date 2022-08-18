<script lang="ts" setup>
import Calendar from '@/components/Calendar/Calendar.vue'
import type { DateItem } from '@/components/Calendar/typing'
import dayjs from 'dayjs'

defineProps<{
  modelValue: string
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', date: string)
  (e: 'update:visible', visible: boolean)
  (e: 'select', dateItem: DateItem)
}>()

function select(dateItem: DateItem) {
  emit('update:modelValue', dayjs(dateItem.date).format('YYYY-MM-DD'))
  emit('select', dateItem)
  emit('update:visible', false)
}
</script>
<template>
  <nut-popup
    class="DatePicker"
    :visible="visible"
    :z-index="100"
    position="bottom"
    @update:visible="(v) => $emit('update:visible', v)"
  >
    <Calendar @select="select"></Calendar>
  </nut-popup>
</template>

<style lang="scss">
.DatePicker {
  .nut-popup {
    // padding: 10px 10px;
    // box-sizing: border-box;
  }
}
</style>

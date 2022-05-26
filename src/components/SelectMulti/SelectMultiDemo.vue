<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script lang="ts" setup>
defineProps<{
  range: any[]
  modelValue: number[]
}>()
const emits = defineEmits<{
  (type: 'update:modelValue', value: number[]): void
  (type: 'columnChange', e: any)
}>()

// 确定回调
function onMultiPickerChange({ detail }) {
  emits('update:modelValue', detail.value)
}

// 滚动回调
function onMultiPickerColumnChange(e) {
  emits('columnChange', e)
}
</script>
<template>
  <picker
    v-bind="$attrs"
    mode="multiSelector"
    @change="onMultiPickerChange"
    @columnchange="onMultiPickerColumnChange"
    :value="modelValue"
    :range="range"
  >
    选择
  </picker>
</template>

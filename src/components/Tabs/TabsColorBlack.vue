<script lang="ts" setup>
import type { TabOption } from './types'

defineProps<{
  modelValue: number
  options: TabOption[]
}>()
defineEmits<{
  (e: 'update:modelValue', v: number): void
}>()
</script>
<template>
  <nut-tabs
    v-bind="$attrs"
    class="nut-tabs2"
    :modelValue="modelValue"
    @update:model-value="(v) => $emit('update:modelValue', v)"
  >
    <nut-tabpane v-for="(item, index) of options" :title="item.name" :key="index" :pane-key="index">
      <slot :name="'pane' + index"></slot>
    </nut-tabpane>
  </nut-tabs>
</template>

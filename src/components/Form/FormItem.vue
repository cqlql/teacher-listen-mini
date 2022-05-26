<template>
  <div class="FormItem" @click="click">
    <div class="FormItem_label" :style="{ width: labelWidth }">{{ label }}</div>
    <div class="FormItem_value">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label: string
  labelWidth?: string
}>()
const emits = defineEmits<{
  (e: 'click'): void
}>()
function click() {
  emits('click')
}
</script>

<style lang="scss">
.FormItem {
  display: flex;
  border-bottom: 1px solid #f7f7f7;
  // padding: 6px 0;
}

.FormItem_label {
  width: 60px;
  color: #666;
  line-height: 38px;
  height: 38px;
}

.FormItem_value {
  flex: 1;
  // border: 1px solid red;

  // 插槽元素高度控制
  input,
  .SelectBar {
    line-height: 38px;
    height: 38px;
  }
}
</style>

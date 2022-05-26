<template>
  <FixedBottom class="FixedBottom_andbtn">
    <div class="FixedBottom_andbtn-left">
      <slot name="left"></slot>
    </div>
    <nut-button block type="danger" @click="$emit('confirm')">{{ btnText }}</nut-button>
  </FixedBottom>
</template>

<script lang="ts" setup>
// import FixedBottom from './index.vue'
defineProps<{
  btnText?: string
}>()
defineEmits<{
  (e: 'confirm'): void
}>()
</script>

<style lang="scss">
.FixedBottom_andbtn {
  // padding: 8px;
  display: flex;

  .nut-button {
    width: 120px;
    border-radius: 0;
  }
}

.FixedBottom_andbtn-left {
  flex: 1;
}
</style>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<script lang="ts" setup>
defineProps<{
  linearGradient?: boolean
}>()
</script>
<template>
  <div class="ButtonBlock">
    <nut-button
      :class="{ 'btn-linear-gradient': linearGradient }"
      block
      type="primary"
      v-bind="$attrs"
    >
      <slot></slot>
    </nut-button>
  </div>
</template>

<style lang="scss">
.ButtonBlock {
  letter-spacing: 2px;
  text-indent: 5px;
  padding: 0 20px;

  .nut-button {
    font-size: 17px;
  }
}
</style>

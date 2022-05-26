<template>
  <FixedBottom>
    <nut-button v-bind="$attrs" class="FixedBottom-onlybtn" block><slot></slot></nut-button>
  </FixedBottom>
</template>

<script lang="ts">
export default {
  components: {
    FixedBottom,
  },
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import FixedBottom from '@/components/FixedBottom/FixedBottom.vue'
</script>
<style lang="scss">
.FixedBottom-onlybtn {
  border: none;
  border-radius: 0;
}
</style>

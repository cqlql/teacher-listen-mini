<script lang="ts" setup>
defineProps<{
  icon: string
}>()
</script>
<template>
  <button class="RoundButton">
    <nut-icon :name="icon"></nut-icon>
  </button>
</template>

<style lang="scss">
.RoundButton {
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: #3aa1ff;
  text-align: center;
  padding: 0;
  line-height: 32px;
  color: #fff;

  .nut-icon {
    height: 32px;
  }
}
</style>

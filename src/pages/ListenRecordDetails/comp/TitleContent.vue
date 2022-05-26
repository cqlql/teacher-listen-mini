<script lang="ts" setup>
defineProps<{ title: string }>()
</script>
<template>
  <div class="TitleContent">
    <div class="titleBar">
      <nut-icon name="success"></nut-icon>
      <span>{{ title }}</span>
    </div>
    <div class="cont">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.TitleContent {
  & > .titleBar {
    // font-size: 14px;
    color: #000;
    display: flex;
    align-items: center;
    line-height: 20px;
    padding-bottom: 5px;
    padding-top: 8px;

    .nut-icon {
      color: #f00;
      margin-right: 4px;
      margin-left: -4px;
    }
  }

  & > .cont {
    // font-size: 12px;
  }
}
</style>

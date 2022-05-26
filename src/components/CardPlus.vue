<script lang="ts" setup>
defineProps<{
  title2: string
}>()
</script>
<template>
  <div class="CardPlus">
    <div v-if="$slots.title" class="tit">
      <slot name="title"></slot>
    </div>
    <div class="tit-bar">
      <span class="l">
        <nut-icon name="mask-close"></nut-icon>
        <span class="t">{{ title2 }}</span></span
      >
      <div v-if="$slots.title2Right" class="tit">
        <slot name="title2Right"></slot>
      </div>
    </div>
    <div class="box"> <slot></slot> </div>
  </div>
</template>

<style lang="scss">
.CardPlus {
  & > .tit {
    font-size: 16px;
    color: #000;
    text-align: center;
    // padding-bottom: 5px;
    margin-bottom: -8px;
    padding-top: 10px;
    font-weight: bold;
  }
  & > .tit-bar {
    display: flex;
    justify-content: space-between;
    padding: 12px 0 10px;

    .l {
      display: flex;
      align-items: center;
      line-height: 20px;
      color: #000;
      font-size: 15px;
    }

    .nut-icon-mask-close {
      font-size: 8px;
      color: #3aa6ff;
    }
  }

  & > .box {
    background-color: #fff;
    border-radius: 4px;
    padding: 10px;
  }
}
</style>

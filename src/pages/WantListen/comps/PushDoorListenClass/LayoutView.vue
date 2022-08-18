<script lang="ts" setup></script>
<template>
  <div class="ToListenClassLayoutView">
    <div class="left">
      <slot name="leftNav"></slot>
    </div>
    <div class="right">
      <slot name="rightList"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.ToListenClassLayoutView {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 44px;
  display: flex;
  & > .left {
    width: 63px;
  }

  & > .right {
    flex: 1;
    position: relative;
  }
}
</style>

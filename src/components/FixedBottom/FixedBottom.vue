<template>
  <div class="fixed-bottom">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  // width: 100%;
  background-color: #fff;
  z-index: 2;
  height: 35px;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>

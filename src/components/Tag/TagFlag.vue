<template>
  <div class="TagFlag"> <slot></slot> </div>
</template>

<style lang="scss">
.TagFlag {
  right: 12px;
  width: 50px;
  height: 30px;
  line-height: 26px;
  background-color: #ffb21f;
  border-radius: 0 0 2px 2px;
  color: #fff;
  font-size: 10px;
  text-align: center;
  position: relative;
  clip-path: path(
    'M0,0v28.24C0.04,29.2,0.76,29.96,1.67,30L25,25.6L48.33,30c0.91-0.04,1.64-0.8,1.67-1.76V0H0z'
  );

  &.success {
    background-color: #4fc08d;
  }

  &.info {
    background-color: #e9e9e9;
    color: #999;
  }
}
</style>

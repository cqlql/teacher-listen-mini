<template>
  <div class="TagFlag"> <slot></slot> </div>
</template>

<style lang="scss">
.TagFlag {
  right: 12px;
  width: 50px;
  height: 28px;
  line-height: 26px;
  background-color: #ffb21f;
  border-radius: 0 0 2px 2px;
  color: #fff;
  font-size: 10px;
  text-align: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    border-style: solid;
    border-width: 0 25px 4px 25px;
    border-color: transparent transparent #fff transparent;
  }

  &.success {
    background-color: #4fc08d;
  }

  &.info {
    background-color: #e9e9e9;
    color: #999;
  }
}
</style>

<script lang="ts" setup></script>
<template>
  <div class="PopoverBox"> <slot></slot> </div>
</template>

<style lang="scss">
$size: 10px;
$borderColor: #d5d5d5;

.PopoverBox {
  position: relative;
  border: 1px solid $borderColor;
  box-shadow: 0 0 10px #0000004f;

  &::before {
    content: '';
    position: absolute;
    right: 6px;
    top: -$size;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 $size $size $size;
    border-color: transparent transparent $borderColor transparent;
  }

  &::after {
    content: '';
    position: absolute;
    right: 6px;
    top: 2px - $size;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 $size $size $size;
    border-color: transparent transparent #fff transparent;
  }
}
</style>

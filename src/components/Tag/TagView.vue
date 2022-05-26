<script lang="ts" setup></script>
<template>
  <span class="LabelView">
    <slot></slot>
  </span>
</template>

<style lang="scss">
.LabelView {
  height: 36px;
  background-color: #489aff;
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  color: #fff;
  padding: 0 6px;

  &.warning {
    background-color: #ffb21f;
  }

  &.cyan {
    background-color: #01d3d5;
  }
  &.purple {
    background-color: #bc80de;
  }
}
</style>

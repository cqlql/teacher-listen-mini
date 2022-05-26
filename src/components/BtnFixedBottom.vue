<script lang="ts" setup></script>
<template>
  <a class="BtnFixedBottom"> <slot></slot> </a>
</template>

<style lang="scss">
.BtnFixedBottom {
  position: fixed;
  right: 10px;
  bottom: 20px;
  width: 46px;
  height: 46px;
  z-index: 1;
  background-color: #81b3fd;
  opacity: 0.63;
  font-size: 12px;
  color: #fff;
  text-align: center;
  border-radius: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 8px;
}
</style>

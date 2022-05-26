<script lang="ts" setup></script>
<template>
  <button class="ButtonVue">
    <slot></slot>
  </button>
</template>

<style lang="scss">
.ButtonVue {
  display: inline-flex;
  align-items: center;
  // justify-content: center;
  width: auto;
}
</style>

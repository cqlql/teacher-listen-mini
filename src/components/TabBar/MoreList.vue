<script lang="ts" setup></script>
<template>
  <div>
    <div class="list">
      <div class="item">拍照</div>
      <div class="item">语音</div>
      <div class="item">视频</div>
    </div>
  </div>
</template>

<style lang="scss">
.list {
  // position: absolute;
  // top: -2px;
  // transform: translateY(-100%);
  border: 1px solid #ccc;
  padding: 2px 0;

  .item {
    padding: 6px 8px;
  }

  .item + .item {
    border-top: 1px solid #ccc;
  }
}
</style>

<template>
  <div class="EmptyApplet">
    <div class="EmptyApplet_wrap">
      <img :src="empty" mode="aspectFit" />
      <div class="text">暂无数据</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'VEmpty',
}
</script>

<script lang="ts" setup>
import empty from '@/static/img/empty.png'
</script>

<style scss="EmptyApplet" lang="scss">
.EmptyApplet {
  text-align: center;
  color: #8c8c8c;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 120px;

  img {
    height: 90px;
    display: block;
  }
  .text {
    margin-top: 20px;
    font-size: 18px;
    color: #b7b7b7;
  }
}
</style>

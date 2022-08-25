<script lang="ts" setup>
import outsideBg from '@/static/img/course/outside-bg.png'
import insideBg from '@/static/img/course/inside-bg.png'
import openBg from '@/static/img/course/open-bg.png'
const bgMap = {
  open: openBg,
  inside: insideBg,
  outside: outsideBg,
}

defineProps<{
  type: 'open' | 'inside' | 'outside'
}>()
</script>
<template>
  <div class="bg">
    <img :src="bgMap[type]" />
  </div>
</template>

<style lang="scss">
.bg {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 0;
  right: 0;
  height: 0;
  padding-top: 28%;
  opacity: 0.6;
  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>

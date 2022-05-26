<template>
  <div class="LoadBar">
    <!-- 小程序这里用 v-show 会导致邻近的 元素无法显示，但不影响文本 -->
    <nut-icon v-show="status === 'loading'" name="loading" />
    {{ text }}
    <Empty v-if="status === 'noData'" />
    <!-- <span class="LoadBar_text">{{ text }}</span> -->
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Empty from '../Empty/Empty.vue'

export type statusType = '' | 'loading' | 'noData' | 'noMore'
const props = defineProps<{
  status: statusType
}>()

const text = computed(() => {
  const map = {
    loading: '努力加载中',
    noMore: '没有更多了',
    '': '',
  }
  return map[props.status]
})
</script>
<style lang="scss">
.LoadBar {
  height: 30px;
  line-height: 30px;
  text-align: center;

  .nut-icon {
    vertical-align: middle;
  }

  // .LoadBar_text {
  //   // font-size: 16px;
  //   // line-height: 40px;
  //   padding-left: 5px;
  //   vertical-align: middle;
  // }
}
</style>

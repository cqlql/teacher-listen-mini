<!--
  针对请求返回不同的数据格式，对 ListLoad 进行二次封装。
-->
<script lang="ts" setup>
import { ref } from 'vue'
import ListLoad from './ListLoad.vue'

withDefaults(
  defineProps<{
    reqList: ({ page: number }) => Promise<any>
    immediate?: boolean
    scrollLowerEnabled?: boolean
    startPage?: number
    handleResult?: ({ resData, page, noDataCb, finishCb }) => any[]
  }>(),
  {
    // 是否立即执行
    immediate: true,

    // 是否开启滚动底部触发
    scrollLowerEnabled: true,

    handleResult: ({ resData, page, startPage, noDataCb, finishCb }) => {
      let empty = resData.length === 0

      if (page === startPage && empty) {
        // 没有任何数据
        noDataCb()
      } else if (empty) {
        // 到底了
        finishCb()
      }

      return resData
    },
  },
)

const vListLoad = ref({
  firstPageLoad() {},
})

defineExpose({
  firstPageLoad() {
    return vListLoad.value.firstPageLoad()
  },
})
</script>

<template>
  <ListLoad v-bind="$props" ref="vListLoad" v-slot="{ list }">
    <slot :list="list"></slot>
  </ListLoad>
</template>

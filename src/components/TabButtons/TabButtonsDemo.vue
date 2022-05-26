<script lang="ts" setup>
import { ref } from 'vue'
import TabButtons from './TabButtons.vue'
const tabValue = ref('all')
const tabList = ref([
  {
    label: '首页',
    value: 'all',
  },
  {
    label: '线路',
    value: 'line',
  },
  {
    label: '商品',
    value: 'general',
  },
  {
    label: '卡',
    value: 'card',
  },
])

const tabValue2 = ref('0')
let list: typeof tabList.value = []
for (let index = 0; index < 30; index++) {
  const element = {
    label: 'Tab' + String(index),
    value: String(index),
  }
  list.push(element)
}
const tabList2 = ref(list)
</script>
<template>
  <div>
    <TabButtons v-model="tabValue" :list="tabList"></TabButtons>

    <div class="line"></div>

    <TabButtons class="scroll" v-model="tabValue2" :list="tabList2"></TabButtons>

    <div class="line"></div>

    <TabButtons class="vertical" v-model="tabValue" :list="tabList"></TabButtons>
  </div>
</template>

<style lang="scss" scoped>
.line {
  height: 2px;
  background: #ebebeb;
  margin: 20px 0;
}
</style>

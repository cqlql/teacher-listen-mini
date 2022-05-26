---
title: ListLoad
---

## 基本使用

```vue
<script lang="ts" setup>
import ListLoad from '@/components/ListLoad/ListLoad.vue'
const vListLoad = ref<{ firstPageLoad: () => void }>()
function reqList() {}
</script>
<template>
  <ListLoad ref="vListLoad" :reqList="reqList">
    <template #default="{ list: listCurrent }">
      <GoodsItem
        v-for="item of listCurrent"
        :key="item.sku_id"
        :data="item"
        @click="toDetail(item)"
      />
    </template>
  </ListLoad>
</template>
```

## 不使用插槽 Prop

```vue
<template>
  <ListLoad :reqList="reqList">
    <template #default>
      <GoodsItem v-for="item of 10" :key="item" :data="item" @click="toDetail(item)" />
    </template>
  </ListLoad>
</template>

<script lang="ts" setup>
async function reqList() {
  return [1]
}

function toDetail() {}
</script>
<style lang="scss"></style>
```

## 可优化建议

可以拆分，先实现一个基础的，再扩展定制

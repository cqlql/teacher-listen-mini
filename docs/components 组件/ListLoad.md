---
title: ListLoad
---

## 基本使用

```vue
<script lang="ts" setup>
import ListLoad from '@/components/ListLoad/ListLoad.vue'
const vListLoad = ref<{ firstPageLoad: () => void }>()
async function reqList() {
  return [
    {
      id: 1,
    },
  ]
}
</script>
<template>
  <ListLoad ref="vListLoad" :reqList="reqList">
    <template #default="{ list: listCurrent }">
      <GoodsItem v-for="item of listCurrent" :key="item.id" :data="item" @click="toDetail(item)" />
    </template>
  </ListLoad>
</template>
```

## 不使用插槽值

```vue
<template>
  <ListLoad :reqList="reqList">
    <template #default>
      <GoodsItem v-for="item of campusList" :key="item" :data="item" @click="toDetail(item)" />
    </template>
  </ListLoad>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const campusList = ref([])
async function reqList({ page }) {
  let list = await getCampus({ pageIndex: page, pageSize: 20 })
  campusList.value = campusList.value.concat(list)
  return list
}

function toDetail() {}
</script>
<style lang="scss"></style>
```

## ListLoad 属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| immediate | 是否组件初始化后立即请求列表数据。如果为 false 不立即请求，则需执行组件实例的 `firstPageLoad()` 手动请求 | boolean | true |
| startPage | 起始页 | number | 1 |
| reqList | 必须返回当前页的列表（数组类型）数据，用来给默认的 handleResultSelf 函数处理是否还有下一页，否则需定制 handleResultSelf 函数 | function | - |
| handleResultSelf | 处理是否还有下一页 | function | 默认的处理规则 |

## ListLoad 方法

| 方法名        | 说明                             | 参数 |
| ------------- | -------------------------------- | ---- |
| firstPageLoad | 进行第一次加载。相当于重置并加载 | -    |

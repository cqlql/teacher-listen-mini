---
title: useSearch
---

## 说明

加入了防抖

## 使用示例

```vue
<script lang="ts" setup>
import { SearchBar as NutSearchbar } from '@nutui/nutui-taro'
import useSearch from '@/hooks/useSearch'

const { searchValue } = useSearch(() => {
  console.log('触发搜索')
})
</script>
<template>
  <div>
    <nut-searchbar v-model="searchValue">
      <template #leftin>
        <nut-icon size="14" name="search2"></nut-icon>
      </template>
    </nut-searchbar>
  </div>
</template>
```

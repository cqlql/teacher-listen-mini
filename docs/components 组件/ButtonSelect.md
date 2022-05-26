---
title: ButtonSelect
---

```vue
<template>
  <div>
    <ButtonSelect v-model:isExpanded="isExpanded"> 全部 </ButtonSelect>
  </div>
</template>

<script lang="ts" setup>
import ButtonSelect from '@/components/Button/ButtonSelect.vue'
const isExpanded = ref(false)
</script>
<style lang="scss"></style>
```

---
title: DatePicker
---

## 使用

```vue
<template>
  <div>
    <DatePicker v-model="startDate" :endDate="endDate" valueFormat="YYYY-MM-DD">
      <SelectValue :value="startDate" placeholder="开始时间"></SelectValue>
    </DatePicker>
  </div>
</template>

<script lang="ts" setup>
import SelectValue from '@/components/Select/SelectValue.vue'
import DatePicker from '@/components/DatePicker/DatePicker.vue'

const startDate = ref('')
const endDate = ref('')
</script>
```

## Api

### props

| 参数     | 说明                         | 类型   | 默认值 |
| :------- | ---------------------------- | :----- | ------ |
| v-model  | 绑定的值                     | string |        |
| starDate | 限制，选择值必须大于开始时间 | string |        |
| endDate  | 限制，选择值必须小于结束时间 | string |        |

### slots

| 名称    | 说明                         |
| ------- | ---------------------------- |
| default | 自定义显示值、触发选择的元素 |

## 需求

1. [x] 考虑不需要初始值情况

---
title: ECahrt
---

## 使用示例

```vue
<template>
  <div>
    <EChart :getOption="getOption"> </EChart>
  </div>
</template>

<script lang="ts" setup>
import EChart from '@/packageECharts/components/EChart.vue'
async function getOption() {
  return {
    legend: {
      bottom: '0',
    },
    series: [
      {
        type: 'pie',
        radius: '80%',
        center: ['50%', '45%'],
        label: {
          position: 'inside',
          formatter: '{c}',
          color: '#fff',
        },
        data: [
          { value: 735, name: '听课次数' },
          { value: 580, name: '授课次数' },
        ],
      },
    ],
  }
}
</script>
```

## Api

### Prop

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| option | <br />重新设置会更新图表,与 getOption 同时使用, option 优先级更高 | Promise &lt;ChartOption&gt; |
| getOption | 重新设置不会更新图表,支持异步 | Promise &lt;ChartOption&gt; |

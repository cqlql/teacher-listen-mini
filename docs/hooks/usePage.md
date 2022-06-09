---
title: usePage
---

## 父子页面互传参数

父页面 跳转

```vue
<script lang="ts" setup>
Taro.navigateTo({
  url: '/pages/ListenEvaluationDetails/DingListenDetails',
  success: function (res) {
    // 向子页面传值
    res.eventChannel.emit('acceptPageParams', data)
  },
})
</script>
<style lang="scss"></style>
```

子页面 接收

```vue
<script lang="ts" setup>
import usePage from '@/hooks/usePage'

let { pageOn } = usePage()

pageOn<DingListenItem>('acceptPageParams', (data) => {
  console.log('🚀 -- data', data)
})
</script>
```

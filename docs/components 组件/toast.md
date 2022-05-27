---
title: Toast 轻提醒
---

## 注入方式共享使用

实现根页面的所有子页面组件都能方便调用 toast

某根页面 Provider

```vue
<script lang="ts" setup>
import ToastProvider from '@/components/ToastProvider/ToastProvider.vue'
</script>
<template>
  <ToastProvider>
    <SomethingComp />
  </ToastProvider>
</template>
```

根页面中的某深层次组件 SomethingComp 使用 toast

```vue
<script lang="ts" setup>
import useToastInject from '@/hooks/useToastInject'
const { toastLoading, toastClose } = useToastInject()

function showLoading() {
  toastLoading('加载中...')
}
</script>

<template>
  <div>
    <button @click="showLoading">弹出加载框</button>
  </div>
</template>
```

useToastInject 返回类型

```ts
interface UseToastReturn {
  toast: UnwrapNestedRefs<ToastOptions>
  toastFail: (msg: string) => void
  toastSuccess: (msg: string) => void
  toastLoading: (msg: string) => void
  toastClose: () => void
  loading: Ref<boolean>
}
```

## loading 弹出并不能阻止多次点击

所以还是需要如下方式手动处理

```js
let { toast, loading } = useToast()
function reviewBefore() {
  toast.msg = '努力处理中...'
  if (loading.value) return
  loading.value = true
}
```

## 一般使用示例

```vue
<template>
  <nut-toast v-bind="toast" v-model:visible="toast.show" />
</template>

<script setup lang="ts">
import useToast from '@/hooks/useToast'

let { toast, toastFail, toastSuccess, toastLoading, loading, toastClose } = useToast()

// 开始加载
loading.value = true

toastSuccess('成功')
toastFail('失败')
// 手动调用 loading，默认 '努力加载中...'
toastLoading('加载中')

// 关闭
toastClose()
</script>
```

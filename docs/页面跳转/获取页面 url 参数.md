---
title: 获取页面 url 参数
---

```ts
import useRouterParams from '@/hooks/useRouterParams'

// 某 url:
// pages/EvaluationRecord/EvaluationRecord?id=10086

// 获取
let routeQuery = useRouterParams<{ id: string }>()
console.log(routeQuery.id)
```

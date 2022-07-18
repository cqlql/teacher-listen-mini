---
title: OncePromise 只执行一次
---

```ts
import OncePromise from '@/utils/once/once-promise'
const oncePromise = new OncePromise(() => {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, 1000)
  })
})

async function test() {
  oncePromise.clear()
  await oncePromise.execute()
}
```

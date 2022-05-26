---
title: ios 安全区域
---

```css
.test {
  bottom: calc(50px + constant(safe-area-inset-bottom));
  padding-bottom: constant(safe-area-inset-bottom);
  /* iOS 11.2 beta及其后 */
  bottom: calc(50px + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom);
}
```

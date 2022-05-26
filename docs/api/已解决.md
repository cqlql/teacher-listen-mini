---
title: 已解决
---

## 获取科目

```ts
import { getCampusGradeSelect } from '@/api/select'
getCampusGradeSelect().then((resData) => {})
```

## 获取授课、评课记录

### 列表

`/lecture/v1/coursesrecordlist` [获取授课、评课记录](https://doc.shenduedu.com/#/小π智听/公开课/获取授课、评课记录)

搜索参数 `range_type` 可设置的值：

- this_semester 本学期
- first_semester 上学期
- second_semester 下学期
- full_semester 整个学年
- this_week 本周
- last_week 上周
- start_year 年份

### 详情

`/lecture/v1/list` [公开课/听课评价我的评价](https://doc.shenduedu.com/#/小π智听/公开课/听课评价我的评价)

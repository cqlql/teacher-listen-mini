---
title: 首页
home: true
heroText: false
tagline: false
---

## 待办

钉钉听评课记录、全校听评课记录

授课记录 -> 查看详情 -> 听课老师名单页

推门听课过滤

钉钉评课记录 https://app.shenduedu.com/lecture/v1/courses_with_recording_resource

once-promise 泛型

## 问题速记

- api 问题
  - /lecture/v1/statisticsv1 [全校 - 科组统计次数] 空数据，明明是有数据的
  - /lecture/v1/list?course_id=5567019870354718065&user_id=467067 需要 dimension_item_name 字段，显示需要，涉及到的页面 pages/ListenRecordDetails/ListenRecordDetails 、 pages/ListenEvaluationDetails/ListenEvaluationDetails

## 导航

<HomeView></HomeView>

<script lang="ts" setup>
import HomeView from '!/components/HomeView.vue'
</script>

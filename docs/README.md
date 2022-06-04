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

科组统计 -> 科组人员听授课次数统计（按成员统计次数）相关接口：[/lecture/v3/queryEvaluationGroupMember](https://doc.shenduedu.com/#/%E5%B0%8F%CF%80%E6%99%BA%E5%90%AC/%E7%A7%91%E7%BB%84/%E6%A0%B9%E6%8D%AE%E7%A7%91%E7%BB%84%E6%9F%A5%E8%AF%A2%E6%88%90%E5%91%98%E4%BF%A1%E6%81%AF)

钉钉评课记录 https://app.shenduedu.com/lecture/v1/courses_with_recording_resource

如何知道用户有查看科组统计权限，或者查看全校统计权限

[当前用户的角色类型 /lecture/v1/role](https://doc.shenduedu.com/#/%E5%B0%8F%CF%80%E6%99%BA%E5%90%AC/%E6%9F%A5%E8%AF%A2%E5%BD%93%E5%89%8D%E7%94%A8%E6%88%B7%E7%9A%84%E8%A7%92%E8%89%B2%E5%88%97%E8%A1%A8)

once-promise 泛型

## 问题速记

- api 问题
  - /lecture/v1/statisticsv1 [全校 - 科组统计次数] 空数据，明明是有数据的

## 导航

<HomeView></HomeView>

<script lang="ts" setup>
import HomeView from '!/components/HomeView.vue'
</script>

<script lang="ts" setup>
import TagFlag from '@/components/Tag/TagFlag.vue'
import type { EvaluationDataItem } from '../types'

defineProps<{
  data: EvaluationDataItem
}>()
</script>
<template>
  <div class="EvaluationRecordItem">
    <div class="top">
      <div class="date"> {{ data.dateTime }} </div>
      <TagFlag v-if="data.type" class="type">{{ data.type }}</TagFlag>
    </div>

    <div class="tit">
      <span v-if="data.subjectShort" class="subject">{{ data.subjectShort }}</span>
      <span class="name">{{ data.name }}</span>
    </div>
    <div class="rows">
      <div class="row-text"> 授课老师：{{ data.teacher }} </div>
      <div class="row-text"> 授课班级：{{ data.className }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.EvaluationRecordItem {
  background-color: #f4faff;
  border-radius: 17px;
  padding: 0 15px 8px;
  margin-top: 12px;
  // position: relative;
  .top {
    position: relative;
  }
  .date {
    // padding: 10px 0 0;
    padding-top: 10px;
  }
  .type {
    position: absolute;
    top: 0;
    right: 0;
    // height: 22px;
    // background-color: #3aa3ff;
    // border-radius: 0 0 2px 2px;
  }
  .tit {
    font-size: 17px;
    padding: 10px 0;
  }
  .subject {
    font-size: 12px;
    background-image: linear-gradient(0deg, #3aa0ff 0%, #3bd8ff 100%),
      linear-gradient(#558dff, #558dff);
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    display: inline-block;
    text-align: center;
    line-height: 20px;
    vertical-align: middle;
    margin-right: 4px;
  }
  .name {
    vertical-align: middle;
    font-weight: 600;
  }
  // .rows {}
  .row-text {
    font-size: 12px;
    padding-bottom: 5px;
  }

  .TagFlag::after {
    border-color: transparent transparent #f4faff transparent;
  }
}
</style>

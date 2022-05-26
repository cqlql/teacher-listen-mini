<script lang="ts" setup>
import ProcessRecordItem from './ProcessRecordItem.vue'
import type { ListenEvaluationStore } from '../../types'
import { inject } from 'vue'
import ButtonBlock from '@/components/Button/ButtonBlock.vue'

const { processRecordStore, save } = inject('listenEvaluationStore') as ListenEvaluationStore

const { processRecordList, addRecord } = processRecordStore
</script>
<template>
  <div class="ProcessRecord">
    <ProcessRecordItem v-for="(item, index) of processRecordList" :key="item.id" :index="index">
    </ProcessRecordItem>
    <nut-button class="addBtn" @click="addRecord">新增过程记录</nut-button>
    <div class="ProcessRecord_footer">
      <ButtonBlock linear-gradient @click="save">保存</ButtonBlock>
    </div>
  </div>
</template>

<style lang="scss">
.ProcessRecord {
  margin: 10px;
  margin-bottom: 50px;

  .addBtn {
    height: 25px;
    color: #3aa1ff;
    border-color: #3aa1ff;
  }

  .ProcessRecord_footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 5px 20px 0;
    background: #fff;
    z-index: 1;
  }
}
</style>

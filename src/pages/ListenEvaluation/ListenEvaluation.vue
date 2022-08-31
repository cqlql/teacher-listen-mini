<script lang="ts" setup>
import ToastProvider from '@/components/ToastProvider/ToastProvider.vue'
import { ref } from 'vue'
import ListenEvaluationMain from './ListenEvaluationMain.vue'
const v = ref('1111')

function onClick() {
  v.value = 'xxxxxxxxxxx'
}
const vVal = '22222'
</script>
<template>
  {{ v }}{{ vVal }}
  <ToastProvider @click="onClick">
    <ListenEvaluationMain> </ListenEvaluationMain>
  </ToastProvider>
</template>

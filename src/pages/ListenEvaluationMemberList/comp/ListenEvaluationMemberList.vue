<script lang="ts" setup>
import ToastProvider from '@/components/ToastProvider/ToastProvider.vue'
import ListenEvaluationMemberListMain from './ListenEvaluationMemberListMain.vue'
</script>

<template>
  <ToastProvider>
    <ListenEvaluationMemberListMain v-bind="$attrs" />
  </ToastProvider>
</template>

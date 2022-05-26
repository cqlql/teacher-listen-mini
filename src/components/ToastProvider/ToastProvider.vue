<script lang="ts" setup>
import { provide } from 'vue'
import useToast from '@/hooks/useToast'

let toastOptions = useToast()
let { toast } = toastOptions

provide('toast', toastOptions)
</script>
<template>
  <slot></slot>
  <nut-toast v-bind="toast" v-model:visible="toast.show" />
</template>

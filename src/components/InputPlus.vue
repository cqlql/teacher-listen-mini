<template>
  <input :value="modelValue" type="text" @input="input" />
</template>

<script lang="ts" setup>
// import { ref } from 'vue';

defineProps<{
  modelValue: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', v): void
}>()

// const val = ref('');
function input(e: any) {
  emits('update:modelValue', e.detail.value)
}
</script>
<!-- <style lang="scss"></style> -->

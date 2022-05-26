<script lang="ts" setup>
import RoundButton from '@/components/Button/RoundButton.vue'

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'showAdd'): void
  (e: 'update:modelValue', v: string): void
}>()

function onInput(e) {
  emit('update:modelValue', e.detail.value)
}
</script>
<template>
  <div class="row defIpt">
    <div class="l">
      <input
        :value="modelValue"
        placeholder="请输入文字"
        class="ipt"
        type="text"
        @input="onInput"
      />
    </div>
    <div class="r">
      <RoundButton icon="uploader" @click="$emit('showAdd')"></RoundButton>
    </div>
  </div>
</template>

<!-- <style lang="scss" scoped></style> -->

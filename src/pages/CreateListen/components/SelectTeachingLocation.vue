<template>
  <SelectBar :name="nameFinal" :placeholder="placeholder" icon="category" @click-icon="click">
    <input type="text" :value="valueIpt" @input="handleInput" />
  </SelectBar>
  <SelectListPopup v-model:visible="visible" :resList="resList" @select="select" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

import SelectBar from '@/components/Select/SelectBar.vue'
import SelectListPopup from '@/components/SelectListPopup/SelectListPopup.vue'
import type { CreateListenSelectDataResult } from '@/api/model/selectModel'

const props = defineProps<{
  value: string
  label: string
  placeholder?: string
  classRoomsRawDate: CreateListenSelectDataResult['classRooms']
}>()

const emits = defineEmits<{
  (e: 'update:value', v: string): void
  (e: 'update:label', v: string): void
}>()
const visible = ref(false)

const nameFinal = ref('')
const valueIpt = ref('')

watch(
  () => props.label,
  (label) => {
    valueIpt.value = label
  },
  {
    immediate: true,
  },
)

async function resList() {
  return props.classRoomsRawDate.map((room) => {
    return {
      id: String(room.id),
      name: room.address,
    }
  })
}

function handleInput({ detail }: any) {
  let val = (valueIpt.value = detail.value)
  emits('update:value', '')
  emits('update:label', val)
}
function click() {
  visible.value = true
}
function select({ value, label }) {
  emits('update:value', value)
  emits('update:label', label)
}
</script>
<!-- <style lang="scss"></style> -->

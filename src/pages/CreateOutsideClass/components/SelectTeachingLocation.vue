<template>
  <SelectBar :name="nameFinal" :placeholder="placeholder" icon="category" @click-icon="click">
    <input type="text" :value="valueIpt" @input="handleInput" />
  </SelectBar>
  <SelectListPopup
    v-model:visible="visible"
    :resList="resList"
    @select="select"
    idProp="class_room_id"
    nameProp="class_room_name"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import useTeachingLocation from '../hooks/useTeachingLocation'

import SelectBar from '@/components/Select/SelectBar.vue'
import SelectListPopup from '@/components/SelectListPopup/SelectListPopup.vue'

const props = defineProps<{
  value: string
  label: string
  placeholder?: string
}>()

const emits = defineEmits<{
  (e: 'update:value', v: string): void
  (e: 'update:label', v: string): void
}>()

const { visible, resList } = useTeachingLocation()

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

<template>
  <picker
    mode="multiSelector"
    @change="onMultiPickerChange"
    @columnchange="onMultiPickerColumnChange"
    :value="selectedIndexs"
    :range="range"
    range-key="name"
  >
    <SelectBar :name="nameFinal" :placeholder="placeholder" />
  </picker>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import SelectBar from '../Select/SelectBar.vue'

interface OptionType {
  id: string
  name: string
  children: OptionType[]
}

const props = withDefaults(
  defineProps<{
    modelValue?: string[]
    options?: OptionType[]
    idProp?: string
    nameProp?: string
    placeholder?: string
  }>(),
  {
    options: () => [],
    idProp: 'id',
    nameProp: 'name',
  },
)

const emits = defineEmits<{
  (e: 'update:modelValue', values: string[]): void
}>()

const selectedIndexs = ref<number[]>([0, 0])
const nameFinal = ref('')

const range = computed(() => {
  const newList: OptionType[][] = []

  let children = props.options
  selectedIndexs.value.some((index, columnIndex) => {
    newList[columnIndex] = children
    const next = children[index]
    if (next) {
      children = children[index].children
      return false
    }
    return true
  })
  return newList
})

function onMultiPickerChange({ detail }) {
  let children = props.options
  let values: string[] = []
  let names: string[] = []
  detail.value.forEach((index) => {
    let item = children[index]
    values.push(item.id)
    names.push(item.name)
    children = item.children
  })
  nameFinal.value = names.join(' ')
  emits('update:modelValue', values)
}

function onMultiPickerColumnChange({ detail }) {
  selectedIndexs.value[detail.column] = detail.value
}
</script>
<style lang="scss"></style>

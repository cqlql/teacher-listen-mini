<template>
  <picker
    mode="selector"
    :value="selectedIndex"
    :range="options"
    @change="onChange"
    range-key="name"
  >
    <SelectBar :name="name" />
  </picker>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { OptionType } from './Select'
import SelectBar from './SelectBar.vue'
// import { Picker as NutPicker } from '@nutui/nutui';

const emits = defineEmits<{
  (e: 'update:modelValue', v: string): void
}>()
const props = withDefaults(
  defineProps<{
    modelValue: string
    icon?: string
    options: string[] | OptionType[]
  }>(),
  {
    modelValue: '',
    options: () => [],
  },
)

// const show = ref(false);

// const id = ref('')
const name = ref('')

const selectedIndex = ref(0)

/* const dict =  */ computed(() => {
  let dict = {}

  props.options.forEach((option) => {
    if (typeof option === 'string') {
      dict[option] = option
    } else {
      dict[option.id] = option
    }
  })

  return props.options
})

function onChange(e) {
  console.log(e)
  emits('update:modelValue', e.datail.value)
}

// function popCampus() {
//   show.value = true;
// }
</script>
<!-- <style lang="scss"></style> -->

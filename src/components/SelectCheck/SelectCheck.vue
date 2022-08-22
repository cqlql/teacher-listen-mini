<template>
  <SelectBar @click="barClick" :name="nameFinal" :placeholder="placeholder" />

  <SelectCheckPopup
    :modelValue="modelValue"
    v-model:visible="visible"
    :options="options"
    :idProp="idProp"
    :nameProp="nameProp"
    @confirm="confirm"
    @change="change"
  >
  </SelectCheckPopup>
</template>

<script lang="ts" setup>
import SelectBar from '../Select/SelectBar.vue'

import { computed, ref } from 'vue'
import SelectCheckPopup from './SelectCheckPopup.vue'

type OptionType = {
  [key: string]: string
}

const props = withDefaults(
  defineProps<{
    modelValue?: string
    options?: OptionType[] | []
    idProp?: string
    nameProp?: string

    popTitle?: string
    placeholder?: string
    selectBefore?: () => boolean
  }>(),
  {
    options: () => [],
    idProp: 'id',
    nameProp: 'name',
    popTitle: '',
    selectBefore: () => true,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', id): void
  (e: 'change', id): void
}>()

function change(id: string) {
  emit('update:modelValue', id)
}

const visible = ref(false)

const idRecord = computed(() => {
  let idRecord = {}
  let { idProp } = props

  props.options.forEach((item) => {
    idRecord[item[idProp]] = item
  })
  return idRecord
})

const nameFinal = computed(() => {
  // let { modelValue, name } = props

  // return modelValue === '' || modelValue === undefined ? '' : selectedName.value || name

  if (props.modelValue) {
    return idRecord.value[props.modelValue]?.[props.nameProp]
  }
  return ''
})

function confirm() {}

function barClick() {
  if (props.selectBefore() === false) return
  visible.value = true
}
</script>
<style lang="scss">
.SelectCheck_popup {
  .checked {
    background-color: red;
  }
}

.SelectCheck_top-btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

  .h5-a {
    padding: 10px;
  }
}

.SelectCheck_popup-title {
  font-size: 16px;
  color: $gray-8;
}

.SelectCheck_confirm-btn {
  color: $primary-color;
}

.SelectCheck_option-list {
  padding: 10px;
}

.SelectCheck_option {
  display: inline-block;
  // height: 38px;
  padding: 0 10px;
  // margin: 10px 0 10px 10px;
  margin: 5px;
  line-height: 2;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  border: 1px solid #f6f6f6;
  color: #666;
  background-color: #f6f6f6;
}

.SelectCheck_option.checked {
  color: #e96036;
  background-color: #fff7f5;
  border-color: #e96036;
}
</style>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import SearchBarSelect2 from '@/components/SearchBarSelect2.vue'
import { Picker as NutPicker } from '@nutui/nutui-taro'
const visible = ref(false)
const selectedValue = ref('')
const selectedName = ref('')

// const columns = ref([
//   { text: '南京市', value: 'NanJing' },
//   { text: '无锡市', value: 'WuXi' },
//   { text: '海北藏族自治区', value: 'ZangZu' },
//   { text: '北京市', value: 'BeiJing' },
//   { text: '连云港市', value: 'LianYunGang' },
//   { text: '浙江市', value: 'ZheJiang' },
//   { text: '江苏市', value: 'JiangSu' },
// ])

const props = defineProps<{
  modelValue: string
  keyword: string
  placeholder: string
  columns: { text: string; value: string }[]
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', v: string): void
  (e: 'update:keyword', v: string): void
  (e: 'confirm', data: any): void
  (e: 'search', keyword: string): void
}>()

watch(
  () => props.columns,
  (columns) => {
    if (columns.length) {
      // 默认第一个
      let firstColumn = columns[0]
      selectedValue.value = firstColumn.value
      selectedName.value = firstColumn.text
    }
  },
  {
    immediate: true,
  },
)

function change() {}
function confirm({ selectedValue: values, selectedOptions }) {
  let v = (selectedValue.value = values[0])
  let selectedOption = selectedOptions[0]
  selectedName.value = selectedOption.text
  emits('update:modelValue', v)
  emits('confirm', { selectedValue, selectedOption })
}
</script>
<template>
  <div>
    <SearchBarSelect2
      v-model:isExpanded="visible"
      :modelValue="keyword"
      :selectedName="selectedName"
      :placeholder="placeholder"
      @search="
        (v) => {
          $emit('search', v as unknown as string)
        }
      "
      @update:model-value="(v) => $emit('update:keyword', v)"
    ></SearchBarSelect2>
    <nut-picker
      :modelValue="[modelValue]"
      v-model:visible="visible"
      :columns="columns"
      @change="change"
      @confirm="confirm"
    >
    </nut-picker>
    <!-- <nut-popup position="bottom" :style="{ height: '20%' }" v-model:visible="visible"> </nut-popup> -->
  </div>
</template>

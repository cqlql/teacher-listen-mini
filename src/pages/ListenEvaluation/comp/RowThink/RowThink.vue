<script lang="ts" setup>
/* eslint-disable vue/no-mutating-props */
import LabelView from '../../../../components/Tag/TagView.vue'
import RoundButton from '@/components/Button/RoundButton.vue'
import type { ProcessRecordStore } from '../../hooks/useProcessRecordStore'
import { inject, ref, watch } from 'vue'
import type { ThinkItem } from '../../types'

const { removeRecordItem, processRecordList } = inject('processRecordStore') as ProcessRecordStore
const props = defineProps<{
  recordIndex: number
  index: number
}>()

const data = ref<ThinkItem>({
  id: '',
  type: 'think',
  text: '',
})

watch(
  [() => props.recordIndex, () => props.index],
  () => {
    data.value = processRecordList.value[props.recordIndex].list[props.index] as ThinkItem
  },
  {
    immediate: true,
  },
)

function onDelete() {
  removeRecordItem(props.recordIndex, props.index)
}
</script>
<template>
  <div class="row defIpt thinkIpt">
    <div class="first">
      <LabelView class="warning">思考</LabelView>
    </div>
    <div class="l">
      <input v-model="data.text" class="ipt" type="text" />
    </div>
    <div class="r">
      <RoundButton @click="onDelete" style="background: #f00" icon="del2"></RoundButton>
    </div>
  </div>
</template>

<!-- <style lang="scss" scoped></style> -->

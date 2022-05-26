<script lang="ts" setup>
import BottomOkButtons from '@/components/Button/BottomOkButtons.vue'
import DatePicker from '@/components/DatePicker/DatePicker.vue'

import { ref, watch } from 'vue'
import SelectValue from '@/components/Select/SelectValue.vue'

import useSemesterDate from '../useSemesterDate'
const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:start', v: string)
  (e: 'update:end', v: string)
  (e: 'update:label', v: string)
  (e: 'update:visible', v: boolean)
  (e: 'ok')
}>()

const startDate = ref('')
const endDate = ref('')
const selectedIndex = ref(-1)
const currentSelectedIndex = ref(-1)
let isCustom = false

const { list } = useSemesterDate()

watch(
  () => props.visible,
  (visible) => {
    if (!visible) {
      // 关闭时复位
      currentSelectedIndex.value = selectedIndex.value
    }
  },
)

watch([startDate, endDate], ([startDate, endDate]) => {
  if (startDate && endDate) {
    isCustom = true
  }
})

watch(currentSelectedIndex, () => {
  isCustom = false
})

function select(index: number) {
  currentSelectedIndex.value = index
}

function ok() {
  if (isCustom) {
    emit('update:start', startDate.value)
    emit('update:end', endDate.value)
    emit('update:label', '自定义')
  } else {
    let index = currentSelectedIndex.value
    selectedIndex.value = index
    let item = list[index]

    if (item) {
      emit('update:start', item.start)
      emit('update:end', item.end)
      emit('update:label', item.label)
    }
  }

  emit('ok')
  emit('update:visible', false)
}
</script>
<template>
  <nut-popup
    position="bottom"
    :visible="visible"
    closeable
    class="SemesterRangePicker"
    @update:visible="(v) => $emit('update:visible', v)"
  >
    <div class="SemesterRangePicker_list">
      <div class="list">
        <div
          v-for="(item, index) of list"
          :key="index"
          class="item"
          :class="{ active: currentSelectedIndex === index }"
          @click="select(index)"
          >{{ item.label }}（{{ item.start }}-{{ item.end }}）<nut-icon name="Check" />
        </div>
      </div>

      <div class="dateRange">
        <div class="tit"> 自定义时间： </div>
        <div class="dateInput">
          <div class="l">
            <DatePicker v-model="startDate" :endDate="endDate" valueFormat="YYYY-MM-DD">
              <SelectValue :value="startDate" placeholder="开始时间"></SelectValue>
            </DatePicker>
          </div>
          <div class="r">
            <!-- <input type="text" placeholder="结束时间" /> -->
            <DatePicker v-model="endDate" :startDate="startDate" valueFormat="YYYY-MM-DD">
              <SelectValue :value="endDate" placeholder="结束时间"></SelectValue>
            </DatePicker>
          </div>
        </div>
      </div>

      <BottomOkButtons @ok="ok" @cancel="$emit('update:visible', false)"></BottomOkButtons>
    </div>
  </nut-popup>
</template>

<style lang="scss">
.SemesterRangePicker {
  .nutui-popup__close-icon--top-right {
    top: 8px;
    right: 8px;
  }
}

.SemesterRangePicker_list {
  padding: 25px 0 30px;
  .list {
    padding: 10px 0 20px;
  }
  .item {
    text-align: center;
    position: relative;
    padding: 10px 0;
  }
  .nut-icon {
    position: absolute;
    display: none;
  }

  .active {
    color: #3aa6ff;
    .nut-icon {
      display: inline-block;
    }
  }
  .nut-button {
    padding: 0 44px;
  }

  .dateRange {
    padding: 0 30px;
    .tit {
      color: #000;
    }
    .dateInput {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
    }

    .SelectValue {
      width: 127px;
      height: 28px;
      line-height: 28px;
      background-color: #f8f8f8;
      text-align: center;
    }
  }
}
</style>

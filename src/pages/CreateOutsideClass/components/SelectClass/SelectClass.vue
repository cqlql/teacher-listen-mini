<script lang="ts" setup>
import { getCampusinfo } from '@/api/select'
import type { EventChange, EventColumnchange } from '@/types/components/picker'
import { ref, watch } from 'vue'
import type { IdRecordItem, SelectOption } from './typing'
import SelectBar from '@/components/Select/SelectBar.vue'
// import SelectMulti2 from '@/components/SelectMulti/SelectMulti2.vue'

const props = defineProps<{
  modelValue: string[]
  placeholder?: string
}>()

const emits = defineEmits<{
  (type: 'update:modelValue', value: string[]): void
}>()

const gradeList: SelectOption[] = []
const selectedIndexs = ref<number[]>([0, 0])
const currentIndex = ref<number[]>([0, 0])
const range = ref<SelectOption[][]>([[], []])
const idRecord = ref<Record<string, IdRecordItem>>({})
const name = ref<string>('')

watch([() => props.modelValue, idRecord.value], ([modelValue, idRecordValue]) => {
  let [gradeId, classId] = modelValue
  let classObject = idRecordValue[gradeId + classId]
  if (classObject) {
    name.value = classObject.item.grade_name + ' ' + classObject.item.class_name

    selectedIndexs.value = [classObject.gradeIndex, classObject.classIndex]
  } else {
    name.value = ''
    selectedIndexs.value = [0, 0]
  }
})

getCampusinfo().then((res) => {
  res.schoolClasses.reduce((newDict, item) => {
    let classList = newDict[item.grade_id]
    if (!classList) {
      classList = newDict[item.grade_id] = []
      gradeList.push({
        id: item.grade_id,
        name: item.grade_name,
        children: classList,
      })
    }

    classList.push({
      id: item.class_id,
      name: item.class_name,
    })

    idRecord.value[item.grade_id + item.class_id] = {
      // 交给排序后初始
      gradeIndex: 0,
      classIndex: 0,

      item,
    }

    return newDict
  }, {})

  // 排序
  gradeClassSort()

  // 更新下拉列数据
  updateRang()
})

function gradeClassSort() {
  let reg = /[一二三四五六七八九]/g

  let map = {
    一: 1,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9,
  }

  function zhNumToNum(zhNum) {
    return zhNum.replace(reg, (a) => {
      return map[a]
    })
  }

  gradeList
    .sort((a, b) => {
      a = zhNumToNum(a.name)
      b = zhNumToNum(b.name)
      if (a < b) return -1 // 小于0即可，可以不为-1
      if (a > b) return 1 // 大于0即可，可以不为1
      return 0 // 相等，不处理
    })
    .forEach((item, index) => {
      // 班级是阿拉伯数字
      item.children
        .sort((a, b) => {
          return parseInt(a.name) - parseInt(b.name)
        })
        .forEach((child, childIndex) => {
          let gradeRecordObject = idRecord.value[item.id + child.id]
          gradeRecordObject.gradeIndex = index
          gradeRecordObject.classIndex = childIndex
        })
    })
}

function updateRang() {
  let [c1] = currentIndex.value

  range.value = [gradeList, gradeList[c1].children]
}

// 滚动回调
function onMultiPickerColumnChange({ detail }: EventColumnchange) {
  currentIndex.value[detail.column] = detail.value
  updateRang()
}

// 确定回调
function onMultiPickerChange({ detail }: EventChange) {
  let [c1Index, c2Index] = (selectedIndexs.value = detail.value)
  emits('update:modelValue', [range.value[0][c1Index].id, range.value[1][c2Index].id])
}
</script>
<template>
  <picker
    mode="multiSelector"
    @change="onMultiPickerChange"
    @columnchange="onMultiPickerColumnChange"
    :value="selectedIndexs"
    :range="range"
    range-key="name"
  >
    <SelectBar :name="name" :placeholder="placeholder" />
  </picker>
</template>

<!-- <style lang="scss"></style> -->

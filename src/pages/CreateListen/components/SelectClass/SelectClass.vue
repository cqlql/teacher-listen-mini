<script lang="ts" setup>
// import { getCampusinfo } from '@/api/select'
import type { EventChange, EventColumnchange } from '@/types/components/picker'
import { ref, watch } from 'vue'
import type { SelectOption } from './typing'
import SelectBar from '@/components/Select/SelectBar.vue'
import getGrade from '@/data/getGrade'
import type { CreateListenSelectDataResult } from '@/api/model/selectModel'
// import SelectMulti2 from '@/components/SelectMulti/SelectMulti2.vue'
interface IdRecordItem {
  gradeIndex: number
  classIndex: number
  item: any
}

const props = defineProps<{
  period: string
  modelValue: string[]
  placeholder?: string
  classRawData: CreateListenSelectDataResult['schoolGradeClasses']
  selectBefore?: () => boolean
}>()

const emits = defineEmits<{
  (type: 'update:modelValue', value: string[]): void
}>()

const gradeListRef = ref<SelectOption[]>([])
const selectedIndexs = ref<number[]>([0, 0])
const currentIndex = ref<number[]>([0, 0])
const range = ref<SelectOption[][]>([[], []])
const idRecord = ref<Record<string, IdRecordItem>>({})
const periodIdRecord = ref<Record<string, any>>({})
const gradeIdRecord = ref<Record<string, any>>({})
const name = ref<string>('')

// const gradeListRef = computed(() => {
//   let list = periodIdRecord.value[props.period]
//   return list || []
// })

watch(
  () => props.period,
  () => {
    gradeListRef.value = periodIdRecord.value[props.period]

    updateRang()

    // 清理
    name.value = ''
    emits('update:modelValue', [])
  },
)

watch([() => props.modelValue, idRecord.value], ([modelValue, idRecordValue]) => {
  let [gradeId, classId] = modelValue
  let classObject = idRecordValue[gradeId + classId]
  if (classObject) {
    name.value = gradeIdRecord[gradeId].name + ' ' + classObject.item.name

    selectedIndexs.value = [classObject.gradeIndex, classObject.classIndex]
  } else {
    name.value = ''
    selectedIndexs.value = [0, 0]
  }
})

watch(
  () => props.classRawData,

  (classRawData) => {
    classRawData.reduce((newDict, item) => {
      let classList = newDict[item.grade_id]
      if (!classList) {
        classList = newDict[item.grade_id] = []
        let gradeId = String(item.grade_id)
        let gradeName = getGrade(item.period, item.years)

        let gradeItem = (gradeIdRecord[gradeId] = {
          id: gradeId,
          name: gradeName, // item.grade_name,
          children: classList,
        })

        let gradeList = periodIdRecord.value[item.period]
        if (!gradeList) {
          gradeList = periodIdRecord.value[item.period] = []
        }

        gradeList.push(gradeItem)
      }

      classList.push({
        id: String(item.id),
        name: item.name,
      })

      idRecord.value[String(item.grade_id) + String(item.id)] = {
        // 交给排序后初始
        gradeIndex: 0,
        classIndex: 0,

        item,
      }

      return newDict
    }, {})

    // 排序
    gradeClassSort()

    updateRang()
  },
)

function gradeClassSort() {
  for (let [, gradeList] of Object.entries(periodIdRecord.value)) {
    gradeList
      // .sort((a, b) => {
      //   a = zhNumToNum(a.name)
      //   b = zhNumToNum(b.name)
      //   if (a < b) return -1 // 小于0即可，可以不为-1
      //   if (a > b) return 1 // 大于0即可，可以不为1
      //   return 0 // 相等，不处理
      // })
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
}

/**更新下拉列数据 */
function updateRang() {
  let [c1] = currentIndex.value

  range.value = [gradeListRef.value, gradeListRef.value[c1]?.children || []]
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

function selectBefore() {
  if (props.selectBefore) {
    props.selectBefore()
  }
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
    <SelectBar :name="name" :placeholder="placeholder" @click="selectBefore" />
  </picker>
</template>

<!-- <style lang="scss"></style> -->

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Radio as NutRadio, RadioGroup as NutRadiogroup } from '@nutui/nutui-taro'
import { getCampusGradeSelect } from '@/api/select'

const props = defineProps<{
  modelValue: string
  visible: boolean
}>()
const emit = defineEmits<{
  (e: 'change', v: string)
  (e: 'select', v: string)
  (e: 'update:visible', v: boolean)
  (e: 'update:modelValue', v: string)
  (e: 'update:name', v: string)
  (e: 'update:shortName', v: string)
}>()
const selectedValue = ref('')
function onCancel() {}
function onOk() {
  let id = selectedValue.value
  if (props.modelValue !== id) {
    emit('update:modelValue', id)
    emit('change', id)
  }
  emit('select', id)
}

watch(
  () => props.modelValue,
  (id) => {
    let name = idRecord.value[id].name
    emit('update:name', name)
    emit('update:shortName', name[0])
  },
)

interface ItemType {
  id: string
  name: string
}

const list = ref<ItemType[]>([])
const idRecord = ref<Record<string, ItemType>>({})
getCampusGradeSelect().then((resData) => {
  // 去重复
  const newSubjects: ItemType[] = []
  idRecord.value = resData.subjects.reduce((dict, subject) => {
    let has = dict[subject.subject_id]
    if (!has) {
      let newSubjectItem = (dict[subject.subject_id] = {
        id: subject.subject_id,
        name: subject.subject_name,
      })
      newSubjects.push(newSubjectItem)
    }

    return dict
  }, {})
  list.value = newSubjects

  // 默认选第一个
  // emit('update:modelValue', (selectedValue.value = newSubjects[0].id))
})
</script>
<template>
  <div class="SelectSubjectDialog">
    <nut-dialog
      title="选择科目"
      :visible="visible"
      close-on-click-overlay
      @cancel="onCancel"
      @ok="onOk"
      @update:visible="(v) => $emit('update:visible', v)"
    >
      <nut-radiogroup v-model="selectedValue" direction="horizontal">
        <nut-radio v-for="item of list" :key="item.id" :label="item.id">{{ item.name }}</nut-radio>
      </nut-radiogroup>
    </nut-dialog>
  </div>
</template>

<style lang="scss">
.SelectSubjectDialog {
  .nut-popup {
    width: 90%;
  }
  .nut-dialog {
    padding: 15px 15px 16px;
    width: 100%;
  }
  .nut-radiogroup {
    display: block;

    .nut-radio {
      // margin-bottom: 12px;
      padding: 0;
      width: 25%;
      margin-right: 0;
      margin-bottom: 10px;
      box-sizing: border-box;
    }
  }
}
</style>

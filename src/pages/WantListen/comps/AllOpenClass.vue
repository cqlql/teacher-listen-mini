<template>
  <div class="AllOpenClass">
    <div class="navBar2">
      <nut-radiogroup v-model="classType" direction="horizontal">
        <nut-radio shape="button" label="open">公开课</nut-radio>
        <nut-radio shape="button" label="pushDoor">推门听课</nut-radio>
      </nut-radiogroup>

      <div class="rBtns">
        <nut-button v-if="classType === 'open'" class="tSubject" @click="showSelectSubject">{{
          topSearchParams.subjectShortName
        }}</nut-button>
        <nut-button class="date" icon="date" @click="showDatePicker"></nut-button>
      </div>
    </div>

    <div class="container">
      <AllOpenClassList v-if="classType === 'open'"></AllOpenClassList>
      <PushDoorListenClass v-else></PushDoorListenClass>
    </div>
  </div>
  <SelectSubjectDialog
    v-model="topSearchParams.subject"
    v-model:shortName="topSearchParams.subjectShortName"
    v-model:visible="selectSubjectVisible"
    :subjectsRawData="subjectsRawData"
    @change="topSearchParams.search"
  />
  <DatePicker
    v-model:startDate="topSearchParams.startDate"
    v-model:endDate="topSearchParams.endDate"
    v-model:visible="datePickerVisible"
    valueFormat="YYYY/MM/DD"
    @select="topSearchParams.search"
  />
</template>

<script lang="ts" setup>
import { provide, reactive, ref } from 'vue'
import { Radio as NutRadio, RadioGroup as NutRadiogroup } from '@nutui/nutui-taro'
import useSelectSubjectDialog from '../hooks/useSelectSubjectDialog'
import useShowDatePicker from '../hooks/useShowDatePicker'
import AllOpenClassList from './AllOpenClassList.vue'
import PushDoorListenClass from './PushDoorListenClass/PushDoorListenClass.vue'
import SelectSubjectDialog from './SelectSubjectDialog.vue'
import DatePicker from './DatePicker.vue'
import type { TopSearchParams } from '../types'
import useGradeClassData from './PushDoorListenClass/useGradeClassData'

const classType = ref<'open' | 'pushDoor'>('open')
const topSearchParams = reactive<TopSearchParams>({
  subject: '0',
  subjectShortName: '全',
  startDate: '',
  endDate: '',
  search() {},
})

if (process.env.NODE_ENV !== 'production') {
  // classType.value = 'pushDoor'
}

defineProps<{
  active: boolean
  type: 'all'
}>()

provide('topSearchParams', topSearchParams)

let gradeClassData = useGradeClassData()
let { subjectsRawData } = gradeClassData
provide('gradeClassData', gradeClassData)

const { show: showSelectSubject, visible: selectSubjectVisible } = useSelectSubjectDialog()
const { show: showDatePicker, visible: datePickerVisible } = useShowDatePicker()
</script>
<style lang="scss">
.AllOpenClass {
  // padding: 16px 0 16px;

  .navBar2 {
    display: flex;
    padding: 12px;
    .nut-radiogroup {
      flex: 1;
    }
    .nut-radio__button {
      border: 0;
      background-color: #aaa;
      color: #fff;
    }
    .nut-radio__button--active {
      background: #ffb21f;
    }
    .rBtns {
      .nut-button {
        padding: 0;
        width: 24px;
        height: 24px;
        border: 0;
      }

      .tSubject {
        background-color: #3aa1ff;
        color: #fff;
      }
      .date {
        color: #3aa1ff;
        margin-left: 10px;
      }
    }
  }

  .container {
    position: absolute;
    top: 55px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>

<script lang="ts" setup>
import FormItem from '@/components/Form/FormItem.vue'
import FormList from '@/components/Form/FormList.vue'
// import SelectBar from '@/components/Select/SelectBar.vue';
// import SelectPlus from '@/components/Select/SelectPlus.vue';
import InputPlus from '@/components/InputPlus.vue'
import SelectCheck from '@/components/SelectCheck/SelectCheck.vue'

import useCreateOutsideClass from './hooks/useCreateOutsideClass'
import useEditInit from './hooks/useEditInit'
import ButtonBlock from '@/components/Button/ButtonBlock.vue'
import useGradeSubectData from '../CreateListen/hooks/useGradeSubectData'
import DatetimePicker from '@/components/DatePicker/DatetimePicker.vue'
import useInitDate from './hooks/useInitDateOutside'
import { ref } from 'vue'
import type { OutsideCourseForm } from './types'
import useToast from '@/hooks/useToast'
// import dayjs from 'dayjs'

const form = ref<OutsideCourseForm>({
  /**公开课名称ID */
  // course_id: '',
  /**'公开课测试'; // 公开课名称 */
  course_name: '',
  /**授课学校 */
  school_name: '',
  /**授课老师 */
  teacher_name: '',
  /**学段ID */
  period: '',
  /**'1'; // 科目ID */
  subject_id: '',
  /**'2018-01-10 10:20:00''; // 开课日期时间 */
  dateTime: '',
  // 授课班级
  teach_target: '',
  /**授课地点 */
  class_room_name: '',
})
let { toast, toastFail, toastSuccess, toastWarn } = useToast()
const { periodOptions, subjectData, subjectGroups, classRawData, classRoomsRawDate } =
  useInitDate(form)

let { isLoading, confirm, promptPopup, periodChange } = useCreateOutsideClass(
  {
    subjectData,
  },
  form,
)

useEditInit(form)

function periodSelectBefore() {
  if (form.value.period) {
    return true
  }
  toastWarn('必须先选学段')
  return false
}

// 自动填充
if (process.env.NODE_ENV !== 'production') {
  // console.s = function () {
  form.value = {
    course_name: '校外课 test' + require('dayjs')().format('YYYY-MM-DD HH:mm'),
    period: '1001',
    school_name: '超人学校',
    teacher_name: '超人A',
    subject_id: '1',
    teach_target: '二年级三班',
    dateTime: require('dayjs')(new Date()).add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    class_room_name: '实验室',
  }
  // }
}
</script>

<template>
  <div class="CreateListen">
    <FormList label-width="130rpx">
      <FormItem label="课程名称">
        <InputPlus v-model="form.course_name" placeholder="请输入课程名称" />
      </FormItem>
      <FormItem label="授课学校">
        <InputPlus v-model="form.school_name" placeholder="请输入学校" />
      </FormItem>
      <FormItem label="授课老师">
        <InputPlus v-model="form.teacher_name" placeholder="请输入授课老师" />
      </FormItem>
      <FormItem label="学段">
        <SelectCheck
          v-model="form.period"
          :options="periodOptions"
          placeholder="请选择学段"
          pop-title="选择学段"
          @change="periodChange"
        />
      </FormItem>
      <FormItem label="科目">
        <SelectCheck
          v-model="form.subject_id"
          :options="(subjectData[form.period] as any)"
          :selectBefore="periodSelectBefore"
          placeholder="请选择科目"
        />
      </FormItem>
      <FormItem label="授课班级">
        <InputPlus v-model="form.teach_target" placeholder="请输入授课班级" />
      </FormItem>
      <FormItem label="授课时间">
        <DatetimePicker v-model="form.dateTime" placeholder="请选择授课时间" />
      </FormItem>
      <!-- <FormItem label="授课学校">
        <DatePicker v-model="form.school_name" placeholder="请选择授课时间" />
      </FormItem> -->
      <FormItem label="授课地点">
        <InputPlus v-model="form.class_room_name" placeholder="请输入授课地点" />
      </FormItem>
    </FormList>
    <div class="CreateListen_bot-btn">
      <ButtonBlock :loading="isLoading" @click="confirm">提交</ButtonBlock>
    </div>
    <nut-toast v-bind="toast" v-model:visible="toast.show" />
    <nut-dialog
      no-cancel-btn
      title=""
      :content="promptPopup.content"
      v-model:visible="promptPopup.visible"
    />
  </div>
</template>

<style lang="scss">
.CreateListen {
  padding: 10px;
}

.CreateListen_bot-btn {
  padding-top: 20px;
}
</style>

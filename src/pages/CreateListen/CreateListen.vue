<script lang="ts" setup>
import FormItem from '@/components/Form/FormItem.vue'
import FormList from '@/components/Form/FormList.vue'
// import SelectBar from '@/components/Select/SelectBar.vue';
// import SelectPlus from '@/components/Select/SelectPlus.vue';
import InputPlus from '@/components/InputPlus.vue'
import SelectCheck from '@/components/SelectCheck/SelectCheck.vue'
import SelectTeachingLocation from './components/SelectTeachingLocation.vue'
import DatetimePicker from '@/components/DatePicker/DatetimePicker.vue'
import FileUpload from '@/components/FileUpload/FileUpload.vue'
import SelectClass from './components/SelectClass/SelectClass.vue'

import useToast from '@/hooks/useToast'
import useCreateListen from './hooks/useCreateListen'
import useEditInit from './hooks/useEditInit'
import ButtonBlock from '@/components/Button/ButtonBlock.vue'
import useInitSelectDate from './hooks/useInitSelectDate'
// import dayjs from 'dayjs'

let { toast, toastFail, toastSuccess, toastWarn } = useToast()

// const { periodOptions, subjectData, subjectGroups } = useGradeSubectData()

const { periodOptions, subjectData, subjectGroups, classRawData, classRoomsRawDate } =
  useInitSelectDate()

let { form, isLoading, confirm, promptPopup, periodChange } = useCreateListen({
  toastFail,
  toastSuccess,
  subjectData,
})

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
  form.value = {
    course_name: 'test',
    period: '1001',
    subject_id: '3',
    gradeClass: ['52', '2124'],
    dateTime: require('dayjs')(new Date()).add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    class_room_id: '17',
    class_room_name: '六（7）班',
    subject_group_id: '4',
    files: [
      {
        name: 'GKtmpMHEsNuR3b8b12cbf9436ae636d67b108dbdfe27.webp',
        url: 'https://s3-cn-south-1.qiniucs.com/smallpi/3b8b12cbf9436ae636d67b108dbdfe27.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=FlOuHhYOGakSvFFka9eBRf5emNuGpEcCEZmtNsLd%2F20220304%2Fcn-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220304T033536Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6a85cea80d11f607d414c192c7f402d2f3eabb729ce0a65a049a512225432a1f',
        type: '51',
      },
    ],
  }
}
</script>

<template>
  <div class="CreateListen">
    <FormList label-width="130rpx">
      <FormItem label="课程名称">
        <InputPlus v-model="form.course_name" placeholder="请输入课程名称" />
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
      <FormItem label="授课对象">
        <SelectClass
          :classRawData="classRawData"
          :period="form.period"
          :selectBefore="periodSelectBefore"
          v-model="form.gradeClass"
          placeholder="请选择授课对象"
        />
      </FormItem>
      <FormItem label="授课时间">
        <DatetimePicker v-model="form.dateTime" placeholder="请选择授课时间" />
      </FormItem>
      <FormItem label="授课地点">
        <SelectTeachingLocation
          :classRoomsRawDate="classRoomsRawDate"
          v-model:value="form.class_room_id"
          v-model:label="form.class_room_name"
          placeholder="输入或选择授课地点"
        />
      </FormItem>
      <FormItem label="所属科组">
        <SelectCheck
          v-model="form.subject_group_id"
          :options="subjectGroups"
          placeholder="请选择所属科组"
        />
      </FormItem>
      <FormItem label="附件">
        <FileUpload v-model="form.files" />
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

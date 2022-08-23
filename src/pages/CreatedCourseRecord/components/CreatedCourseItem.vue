<template>
  <div class="OpenCourseItem">
    <div class="OpenCourseItem_left-line">
      <div class="line"></div>
      <div class="line-bottom"></div>
    </div>
    <div class="OpenCourseItem_right-wrap">
      <div class="OpenCourseItem_main">
        <div class="h-time-wrap">
          <span class="h-time-icon">
            <nut-icon font-class-name="iconfont" class-prefix="icon" name="clock-fill" />
          </span>
          <span class="h-time">{{ data.date }}</span>
        </div>
        <div class="time-val">{{ data.dateTimeLocal }} </div>
        <div class="u-name-wrap">
          <span class="u-name-icon"> </span>
          <span class="u-name-tag">{{ data.subjectName[0] }}</span>
          <span class="u-name">{{ data.userName }}</span>
          <span class="u-grade-class">{{ data.gradeName }}{{ data.className }}</span>
        </div>
        <div class="name"> 《{{ data.courseName }}》 </div>
      </div>
      <div class="OpenCourseItem_r-oper">
        <nut-button
          v-if="isLeader && type !== 'passed'"
          type="success"
          plain
          size="small"
          @click="onPassed"
        >
          通过
        </nut-button>
        <nut-button v-if="type !== 'passed'" type="primary" plain size="small" @click="onEdit">
          编辑
        </nut-button>
        <nut-button
          v-if="isLeader && type === 'pending'"
          type="danger"
          plain
          size="small"
          @click="onRefuse"
        >
          拒绝
        </nut-button>
        <nut-button v-if="isLeader && type === 'passed'" plain size="small" @click="onRevoke">
          撤销
        </nut-button>
      </div>
    </div>
    <nut-toast v-bind="toast" v-model:visible="toast.show" />
  </div>
</template>

<script lang="ts" setup>
import type { ApprovalStatus, CreatedCourseItem } from '../types'

import useToast from '@/hooks/useToast'
import { approveOpenCourse } from '@/api/course'
import Taro from '@tarojs/taro'
import type { Ref } from 'vue'
import { inject } from 'vue'

let { toast, toastSuccess, loading, toastClose } = useToast()

const props = withDefaults(
  defineProps<{
    data: CreatedCourseItem
    type: ApprovalStatus
  }>(),
  {
    data() {
      return {
        id: '',
        courseName: '', //'《沁园春》',
        userName: '', //'张古山',
        subjectName: '', //'语文',
        gradeName: '', //'一年级',
        className: '', //'4班',
        date: '2021-12-12',
        dateTimeLocal: '2021年12月12日 12时12分',
      }
    },
  },
)

const emits = defineEmits<{
  (e: 'refresh'): void
}>()

const isLeader = inject('isLeader')
const needRefreshType: Ref<ApprovalStatus> = inject('needRefreshType') as Ref<ApprovalStatus>

function reviewBefore() {
  toast.msg = '努力处理中...'
  if (loading.value) return
  loading.value = true
}

// function showErrMsg(type: 0 | 1 | 2 | 3) {
//   toastFail(['没有审批权限', '提交的课程ID不存在', '审批有效时间已过', '后台发生异常'][type])
// }

function onEdit() {
  Taro.navigateTo({
    url: '/pages/CreateListen/CreateListen?id=' + props.data.id,
    success: function (res) {
      // 向子页面传值
      res.eventChannel.emit('transferData', props.data.rawData)
    },
  })
}

async function onPassed() {
  reviewBefore()

  await approveOpenCourse({
    status: 10,
    id: props.data.id,
  }).finally(toastClose)
  emits('refresh')
  needRefreshType.value = 'passed'
  toastSuccess('通过成功')
}

async function onRefuse() {
  reviewBefore()
  await approveOpenCourse({
    status: 2,
    id: props.data.id,
  }).finally(toastClose)
  emits('refresh')
  needRefreshType.value = 'failed'
  toastSuccess('拒绝成功')
}
async function onRevoke() {
  reviewBefore()
  await approveOpenCourse({
    status: 0,
    id: props.data.id,
  }).finally(toastClose)
  emits('refresh')
  needRefreshType.value = 'failed'
  toastSuccess('撤销成功')
}
</script>
<style lang="scss">
// $primary-color: #81b3fa;
$primary-color: #70abff;
$gray-color: #888;

.OpenCourseItem {
  display: flex;
}

.OpenCourseItem_left-line {
  width: 50px;
  // background-color: #eee;
  position: relative;

  .line {
    position: absolute;
    width: 2px;
    height: 100%;
    left: 24px;
    background-color: $primary-color;
  }
}

.OpenCourseItem:last-child {
  .line-bottom {
    position: absolute;
    height: 2px;
    bottom: 0;
    background-color: $primary-color;
    width: 16%;
    left: 21px;
  }
}

.OpenCourseItem_right-wrap {
  flex: 1;
  display: flex;
  padding-bottom: 6px;
}

.OpenCourseItem_main {
  flex: 1;

  .h-time-wrap {
    position: relative;
  }

  .h-time-icon {
    position: absolute;
    left: -36px;
    color: #70abff;
    height: 20px;
    display: inline-block;
    // overflow: hidden;
    font-size: 20px;
    line-height: 20px;

    .iconfont {
      font-size: 20px;
      background-color: #fff;
    }
  }

  .h-time {
    color: $primary-color;
    font-size: 16px;
  }

  .time-val {
    color: $gray-color;
    padding: 8px 0;
  }

  .u-name-wrap {
    position: relative;
  }

  .u-name-icon {
    position: absolute;
    top: 5px;
    left: -32px;
    border: 2px solid $primary-color;
    background-color: #fff;
    width: 8px;

    /* display: inline-block; */
    height: 8px;
    border-radius: 10px;
  }

  .u-name-tag {
    color: $primary-color;
    border: 1px solid $primary-color;
    display: inline-block;
    padding: 1px 5px;
    border-radius: 4px;
  }

  .u-name {
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    margin: 0 5px;
  }

  .u-grade-class {
    color: $gray-color;
    padding: 0 2px;
  }

  .name {
    padding: 8px 0;
  }
}

.OpenCourseItem_r-oper {
  width: 80px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  .nut-button {
    margin: 4px 0;
  }
}
</style>

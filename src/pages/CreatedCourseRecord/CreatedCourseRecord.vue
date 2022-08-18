<template>
  <div class="OpenClassApply">
    <BtnFixedBottom @click="toCreateListen">
      <div>我要</div>
      开课</BtnFixedBottom
    >
    <!-- <a class="OpenClassApply_add" @click="toCreateListen"> 我要开课 </a> -->
    <nut-tabs class="nut-tabs2" v-model="tabVal">
      <nut-tabpane title="待审批" pane-key="pending">
        <OpenClassList ref="vOpenClassList1" :active="tabVal === 'pending'" type="pending" />
      </nut-tabpane>
      <nut-tabpane title="未通过" pane-key="failed">
        <OpenClassList ref="vOpenClassList2" :active="tabVal === 'failed'" type="failed" />
      </nut-tabpane>
      <nut-tabpane title="已通过" pane-key="passed">
        <OpenClassList ref="vOpenClassList3" :active="tabVal === 'passed'" type="passed" />
      </nut-tabpane>
    </nut-tabs>
  </div>
</template>

<script lang="ts" setup>
// import { getVideoList } from '@/api/video';
import type { ApprovalStatus } from './types'

import Taro, { useDidShow } from '@tarojs/taro'
import { provide, ref } from 'vue'
import { reqIsLeader } from '@/api/course'
import { getStorage, setStorage } from '@/utils/storage'

import OpenClassList from './components/CreatedCourseList.vue'
import BtnFixedBottom from '@/components/BtnFixedBottom.vue'

const tabVal = ref<ApprovalStatus>('pending')
const vOpenClassList1 = ref({ refresh() {} })
const vOpenClassList2 = ref({ refresh() {} })
const vOpenClassList3 = ref({ refresh() {} })

// 是否有审批权限
const isLeader = ref(false)
provide('isLeader', isLeader)
reqIsLeader().then((res) => {
  isLeader.value = res.is_leader
})

// 需要刷新的列表类型
const needRefreshType = ref<ApprovalStatus | ''>('')
provide('needRefreshType', needRefreshType)

// getVideoList({
//   video_type: 'boutique',
//   offset: '0',
//   list_mun: '10',
// });

function toCreateListen() {
  Taro.navigateTo({
    url: '/pages/CreateListen/CreateListen',
  })
}

useDidShow(() => {
  // 添加开课申请，back 后，需要重新加载
  if (getStorage('pageTemp') === 'needReload') {
    switch (tabVal.value) {
      case 'pending':
        vOpenClassList1.value.refresh()
        break
      case 'failed':
        vOpenClassList2.value.refresh()
        break
      case 'passed':
        vOpenClassList3.value.refresh()
        break
    }

    setStorage('pageTemp', '')
  }
})
</script>

<style lang="scss">
.OpenClassApply {
  background-color: #f5f5f5;
  // padding: 10px;
  .nut-tabpane {
    padding: 0;
    background-color: transparent;
    position: relative;
  }

  .nut-tabs__content {
    height: calc(100vh - 46px);
  }
}

// .OpenClass_tabpane {
//   position: absolute;
//   bottom: 0;
//   top: 0;
//   width: 100%;
// }
</style>

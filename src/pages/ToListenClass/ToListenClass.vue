<template>
  <ToastProvider>
    <div class="OpenClass">
      <TabsColorBlack v-model="tabVal" :options="tabList">
        <template #pane0>
          <AllOpenClass :active="tabVal === 0" type="all" />
        </template>
        <template #pane1>
          <AddedOpenClassList :active="tabVal === 1" type="my" />
        </template>
      </TabsColorBlack>
      <!-- <nut-tabs v-model="tabVal" type="smile">
      <nut-tabpane title="所有的课" pane-key="all">
        <AllOpenClass :active="tabVal === 'all'" type="all" />
      </nut-tabpane>
      <nut-tabpane title="已添加的课" pane-key="my">
        <AddedOpenClassList :active="tabVal === 'my'" type="my" />
      </nut-tabpane>
    </nut-tabs> -->
      <BtnFixedBottom @click="toCreateListen">添加校外课</BtnFixedBottom>
    </div>
  </ToastProvider>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import AllOpenClass from './comps/AllOpenClass.vue'
import AddedOpenClassList from './comps/AddedOpenClassList.vue'
import TabsColorBlack from '@/components/Tabs/TabsColorBlack.vue'
import ToastProvider from '@/components/ToastProvider/ToastProvider.vue'
import BtnFixedBottom from '@/components/BtnFixedBottom.vue'
import Taro from '@tarojs/taro'

// const tabVal = ref<'my' | 'all'>('all')
const tabVal = ref(0)

const tabList = ref([
  {
    name: '所有的课',
  },
  {
    name: '已添加的课',
  },
])

function toCreateListen() {
  Taro.navigateTo({
    url: '/pages/CreateOutsideClass/CreateOutsideClass',
  })
}
</script>

<style lang="scss">
page {
  // background-color: #f1f9fe;
}

.OpenClass {
  background-color: #f5f5f5;
  // padding: 10px;

  & > .nut-tabs > .nut-tabs__content {
    position: absolute;
    top: 35px;
    bottom: 0;
    left: 0;
    right: 0;
    & > .nut-tabpane {
      padding: 0;
      // background-color: transparent;
      position: relative;
    }
  }

  // .nut-tabs__titles {
  //   background-color: #81b3fd;
  // }

  // .nut-tabs__titles-item__text {
  //   color: #fff;
  // }

  // .nut-tabs__titles-item__smile .nut-icon {
  //   color: #fff;
  // }

  .OpenClassPassedItem {
    margin-bottom: 15px;
  }
}

// .OpenClass_tabpane {
//   position: absolute;
//   bottom: 0;
//   top: 0;
//   width: 100%;
// }
</style>

<script lang="ts" setup>
import { ref } from 'vue'
import TabsColorBlack from '@/components/Tabs/TabsColorBlack.vue'

const tab1value = ref(0)
const tab1value2 = ref(0)

const tabList = ref([
  {
    name: '听课记录',
  },
  {
    name: '授课记录',
  },
])

const tabList2 = ref([
  {
    name: '待审批',
  },
  {
    name: '未通过',
  },
  {
    name: '已通过',
  },
])
</script>
<template>
  <TabsColorBlack v-model="tab1value" :options="tabList">
    <template #pane0>1</template>
    <template #pane1>2</template>
  </TabsColorBlack>

  <TabsColorBlack v-model="tab1value2" :options="tabList2"></TabsColorBlack>
  <nut-tabs class="nut-tabs3" v-model="tab1value2">
    <nut-tabpane v-for="item in tabList2" :title="item.name"> Tab {{ item.name }} </nut-tabpane>
  </nut-tabs>
</template>

<style lang="scss">
.tab-s2 {
  .nut-tabs__titles {
    height: 35px;
    padding: 0;
  }
  .nut-tabs__titles-item {
    // text-align: center;
    // border-bottom: 3px solid #fff;

    &.active {
      color: #fff;
      background-image: linear-gradient(-90deg, #3aa0ff 0%, #3bd8ff 100%),
        linear-gradient(#f8f8f8, #f8f8f8);
      // border-color: #3aa6ff;
    }
  }
  .nut-tabs__titles-item__line {
    display: none;
  }
}
</style>

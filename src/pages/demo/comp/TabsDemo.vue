<script lang="ts" setup>
import TabsText from '@/components/Tabs/TabsText.vue'
import { ref } from 'vue'
const tabList = ref([
  {
    name: '听课记录',
    value: '共(12)节',
  },
  {
    name: '授课记录',
    value: '共(9)节',
  },
])
</script>
<template>
  <div>
    <TabsText :tabs="tabList">
      <template #0>0</template>
      <template #1>1</template>
    </TabsText>
  </div>
</template>

<style lang="scss" scoped></style>

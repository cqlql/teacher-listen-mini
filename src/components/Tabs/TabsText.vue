<script lang="ts" setup>
import { ref } from 'vue'

interface ItemType {
  name: string
  value: string
}

defineProps<{
  tabs: ItemType[]
}>()

const tab1value = ref(0)

function handleSelect(k: number) {
  tab1value.value = k
}
</script>
<template>
  <nut-tabs class="TabsText" v-model="tab1value">
    <template #titles>
      <div
        v-for="(item, index) of tabs"
        :key="index"
        class="nut-tabs__titles-item"
        :class="{ active: tab1value === index }"
        @click="handleSelect(index)"
      >
        <div>{{ item.name }}</div>
        <div class="extra">{{ item.value }}</div>
      </div>
    </template>
    <nut-tabpane v-for="(_item, index) of tabs" :key="index" :pane-key="index">
      <slot :name="index" :active="tab1value === index"></slot>
    </nut-tabpane>
  </nut-tabs>
</template>

<style lang="scss">
.TabsText {
  .nut-tabs__titles {
    background-color: #fff;
    height: 50px;
  }
  .nut-tabs__titles-item {
    flex-direction: column;
    // text-align: center;
    border-bottom: 3px solid #fff;

    .extra {
      font-size: 12px;
    }

    &.active {
      color: #3aa6ff;
      border-color: #3aa6ff;
    }
  }
}
</style>

<script lang="ts" setup>
import ListLoad from '@/components/ListLoad/ListLoad.vue'

import { SearchBar as NutSearchbar } from '@nutui/nutui-taro'
import useSearch from '@/hooks/useSearch'
import { ref } from 'vue'

const vListLoadRef = ref({
  firstPageLoad() {},
})

const { searchValue } = useSearch(() => {
  vListLoadRef.value.firstPageLoad()
  console.log('触发搜索')
})

async function reqList() {
  return []
}
</script>
<template>
  <div class="SearchPage">
    <nut-searchbar v-model="searchValue">
      <template #leftin>
        <nut-icon size="14" name="search2"></nut-icon>
      </template>
    </nut-searchbar>
    <ListLoad ref="vListLoadRef" :reqList="reqList">
      <template #default>
        <!-- <div v-for="item of 10" :key="item" :data="item">{{ item }}</div> -->
      </template>
    </ListLoad>
  </div>
</template>

<style lang="scss">
.SearchPage {
  .nut-searchbar {
    background-color: #f8f8f8;
  }
  .nut-searchbar__search-input {
    background-color: #fff;
  }
  .ListLoad {
    top: 50px;
  }
}
</style>

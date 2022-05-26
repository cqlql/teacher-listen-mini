<script lang="ts" setup>
import ButtonSelect from '@/components/Button/ButtonSelect.vue'

import { ref } from 'vue'
import { SearchBar as NutSearchbar } from '@nutui/nutui-taro'

defineProps<{
  isExpanded: boolean
}>()

defineEmits<{
  (e: 'update:isExpanded', v: boolean): void
}>()

const searchValue = ref('')
</script>
<template>
  <nut-searchbar class="MenuAndSearch" v-model="searchValue">
    <template #leftout>
      <ButtonSelect
        :isExpanded="isExpanded"
        @update:isExpanded="(v) => $emit('update:isExpanded', v)"
        >1班</ButtonSelect
      >
    </template>
    <template #leftin>
      <nut-icon size="14" name="search2"></nut-icon>
    </template>
  </nut-searchbar>
</template>

<style lang="scss">
$bc: #f8f8f8;
.MenuAndSearch {
  background: $bc;
  padding: 0 16px;
  .nut-menu__bar {
    border: none;
    background: $bc;
  }
  .nut-searchbar__search-input .nut-searchbar__input-inner .h5-input {
    min-width: auto;
  }

  .nut-searchbar__search-input {
    background: #fff;
  }
}
</style>

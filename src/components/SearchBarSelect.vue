<script lang="ts" setup>
import { SearchBar as NutSearchbar } from '@nutui/nutui-taro'
import ButtonSelect from '@/components/Button/ButtonSelect.vue'
import Debounce from '@/utils/perf/debounce'
import { watch } from 'vue'
const debounce = new Debounce()
const props = defineProps<{
  searchValue: string
  selectedValue: string
  isExpanded: boolean
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:searchValue', searchValue: string)
  (e: 'update:isExpanded', isExpanded: boolean)
  (e: 'search')
}>()

watch(
  () => props.searchValue,
  () => {
    debounce.exec(() => {
      emit('search')
    })
  },
)
</script>
<template>
  <div>
    <nut-searchbar
      class="SearchBarSelect"
      :modelValue="searchValue"
      :placeholder="placeholder"
      @update:model-value="(v) => $emit('update:searchValue', v)"
    >
      <template #leftin>
        <nut-icon size="14" name="search2"></nut-icon>
      </template>
      <template #rightin>
        <ButtonSelect
          :isExpanded="isExpanded"
          @update:is-expanded="(v) => $emit('update:isExpanded', v)"
          >{{ selectedValue || '选择' }}</ButtonSelect
        >
      </template>
    </nut-searchbar>
  </div>
</template>

<style lang="scss">
.SearchBarSelect.nut-searchbar {
  background-color: #f8f8f8;
  // background-color: rgb(0, 89, 255);
  padding: 6px 16px;
  .nut-searchbar__search-input {
    background: #fff;
    // padding-left: 0;
    .nut-searchbar__search-icon {
    }
    .nut-searchbar__iptleft-search-icon {
      // height: 100%;
      // background: #f7f7f7;
      // margin-right: 0;
      // padding-left: 12px;
      // padding-right: 12px;
      // border-radius: 50px 0 0 50px;
    }
    .nut-searchbar__input-inner {
      // background: #f7f7f7;
      height: 100%;
      .h5-input {
        min-width: auto;
      }
    }
    .nut-searchbar__iptright-sarch-icon {
      margin-right: 0;
      height: 100%;
    }
    .ButtonSelect {
      border-left: 1px solid #f8f8f8;
      box-shadow: none;
      height: 100%;
      border-radius: 0 50px 50px 0;
      font-size: 12px;
      padding-left: 6px;
      padding-right: 0;
      width: 60px;
      background: #fff;
      color: #000;
      .arrow {
        font-size: 10px;
      }
    }
  }
}
</style>

<script lang="ts" setup>
import { SearchBar as NutSearchbar } from '@nutui/nutui-taro'
import ButtonSelect from '@/components/Button/ButtonSelect.vue'
import Debounce from '@/utils/perf/debounce'
import { watch } from 'vue'

const debounce = new Debounce()

const props = defineProps<{
  modelValue: string
  isExpanded: boolean
  selectedName: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string)
  (e: 'update:isExpanded', v: boolean)
  (e: 'search')
}>()

watch(
  () => props.modelValue,
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
      class="SearchBarSelect2"
      :modelValue="modelValue"
      @update:model-value="(v) => $emit('update:modelValue', v)"
    >
      <template #leftout>
        <ButtonSelect
          style2
          :isExpanded="isExpanded"
          @update:is-expanded="(v) => $emit('update:isExpanded', v)"
          >{{ selectedName }}</ButtonSelect
        >
      </template>
      <template #leftin>
        <nut-icon size="14" name="search2"></nut-icon>
      </template>
    </nut-searchbar>
  </div>
</template>

<style lang="scss">
.SearchBarSelect2.nut-searchbar {
  background-color: #f8f8f8;
  padding: 10px 16px;
  // padding-left: 0;

  .nut-searchbar__search-icon {
    margin-right: 0;
  }
  .nut-searchbar__search-input {
    background: #fff;
    .nut-searchbar__input-inner {
      height: 100%;
      .h5-input {
        min-width: auto;
      }
    }
  }
}
</style>

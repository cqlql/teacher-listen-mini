<template>
  <nut-popup
    position="right"
    :visible="visible"
    :style="{ height: '100%', width: '80%' }"
    pop-class="SelectListPopup-popup"
    @close="close"
  >
    <div class="SelectListPopup">
      <SearchBar v-model="searchValue" :placeholder="searchPlaceholder" @change="onInputSearch" />
      <Loading v-if="listStatus === 'loading'" />
      <scroll-view class="SelectListPopup_contain" :scroll-y="true">
        <ul>
          <li v-for="item of list" :key="item[idProp]" @click="onSelect(item)">
            {{ item[nameProp] }}
          </li>
        </ul>
        <div v-if="listStatus === 'none'" class="SelectListPopup_contain-none"> 没有数据 </div>
      </scroll-view>
    </div>
  </nut-popup>
</template>

<script lang="ts" setup>
import useInitOnce from '@/hooks/useInitOnce'
import { SearchBar } from '@nutui/nutui-taro'
import { ref, watch } from 'vue'

import Loading from '../Loading/Loading.vue'
import useSelectListSearch from './hooks/useSelectListSearch'

const initOnce = useInitOnce()

const props = withDefaults(
  defineProps<{
    visible: boolean
    resList: () => Promise<any>
    searchPlaceholder?: string
    idProp: string
    nameProp: string
  }>(),
  {
    searchPlaceholder: '请输入关键字搜索',
    idProp: 'id',
    nameProp: 'name',
  },
)

const emits = defineEmits<{
  (e: 'update:visible', v: boolean): void
  (e: 'select', item): void
}>()

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      initOnce().then(() => {
        props
          .resList()
          .then((res) => {
            list.value = allList.value = res
            if (res.length === 0) {
              listStatus.value = 'none'
            } else {
              listStatus.value = 'complete'
            }

            return res
          })
          .catch(() => {
            listStatus.value = 'complete'
          })
      })
    }
  },
)

// const isInitList = false;

// 列表状态
// start 第一次进入时的状态，此时可以使用骨架屏
// loading 加载中
// complete 加载完成
// none 没有数据
const listStatus = ref<'start' | 'loading' | 'complete' | 'none'>('start')

listStatus.value = 'loading'

// type OptionType = { id: string; name: string };

const allList = ref<any[]>([])

const { searchValue, onInputSearch, list } = useSelectListSearch(allList, props.nameProp)

function onSelect(item) {
  emits('select', {
    value: item[props.idProp],
    label: item[props.nameProp],
  })
  emits('update:visible', false)
}

// function initList() {
//   if (isInitList) return;
//   isInitList = true;
// }

function close() {
  console.log('123')
  emits('update:visible', false)
}
</script>

<style lang="scss">
.SelectListPopup-popup {
  & > .h5-div {
    height: 100%;
  }
}
.SelectListPopup {
  position: relative;
  height: 100%;

  li:first-child {
    border-top: 1px solid $gray-5;
  }

  li {
    border-bottom: 1px solid $gray-5;
    padding: 10px;
  }
}

.SelectListPopup_contain {
  // overflow: auth;
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
}

.SelectListPopup_contain-none {
  text-align: center;
  padding: 10px;
}
</style>

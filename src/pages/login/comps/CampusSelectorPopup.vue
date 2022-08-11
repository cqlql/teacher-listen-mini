<script lang="ts" setup>
import type { Campus } from '@/api/login'
import { getCampus } from '@/api/login'
import { SearchBar } from '@nutui/nutui-taro'
import { ref, watch } from 'vue'
import ListLoad from '@/components/ListLoad/ListLoad.vue'
import Debounce from '@/utils/perf/debounce'

const props = defineProps<{
  visible: boolean
  value: Campus
}>()

const vListLoad = ref<{
  firstPageLoad: () => void
}>()

const emit = defineEmits<{
  (e: 'update:visible', v: boolean): void
  (e: 'update:value', v: Campus): void
}>()

const debounce = new Debounce()
const searchValue = ref('')

let listInitialized = false

// let campusListAll: Campus[] = []
const campusList = ref<Campus[]>([])
// const selectedCampus = ref<Campus>({
//   id: 0,
//   name: '',
//   school_id: 0,
//   school_name: '',
// })

watch(
  () => props.visible,
  async (visible) => {
    if (visible) {
      // campusListAll = await getCampus()
      // if (campusList.value.length === 0) {
      //   campusList.value = await getCampus()
      // }

      if (!listInitialized) {
        listInitialized = true
        vListLoad.value?.firstPageLoad()
      }
    }
  },
)

function onInput() {
  debounce.exec(() => {
    vListLoad.value?.firstPageLoad()
  })
}

function onSelect(item: Campus) {
  // selectedCampus.value = item
  emit('update:value', item)
  emit('update:visible', false)
}

async function reqList({ page }) {
  // console.log('🚀 -- reqList -- params', params)
  let list = await getCampus({ pageIndex: page, pageSize: 20, keyword: searchValue.value })
  campusList.value = page === 0 ? list : campusList.value.concat(list)
  return list
}
</script>
<template>
  <nut-popup
    position="right"
    pop-class="campus-selector-popup"
    :visible="visible"
    @update:visible="(v) => $emit('update:visible', v)"
    :style="{ height: '100%', width: '80%' }"
  >
    <div class="campus-list">
      <SearchBar v-model="searchValue" placeholder="学校名称" @change="onInput" />
      <ListLoad
        ref="vListLoad"
        :immediate="false"
        :startPage="0"
        class="campus-list_contain"
        :reqList="reqList"
      >
        <template #default>
          <ul v-if="campusList">
            <li v-for="campus of campusList" :key="campus.id" @click="onSelect(campus)">
              {{ campus.school_name }} {{ campus.name }}
            </li>
          </ul>
        </template>
      </ListLoad>
    </div>
  </nut-popup>
</template>

<style lang="scss">
.campus-selector-popup {
  & > .h5-div {
    height: 100%;
  }
}

.campus-list {
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

.campus-list_contain {
  // overflow: auth;
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: constant(safe-area-inset-bottom);

  /* iOS 11.2 beta及其后 */
  bottom: env(safe-area-inset-bottom);
}
</style>

<template>
  <SelectBar @click="clickSelf" :name="name" />
  <nut-popup
    pop-class="SelectRemote_popup"
    position="bottom"
    v-model:visible="visible"
    style="height: 338px"
  >
    <div class="SelectRemote_top-btns" style="height: 38px">
      <a @click="close">取消</a>
      <span class="SelectRemote_popup-title">选择科目</span>
      <a @click="confirm" class="SelectRemote_confirm-btn">确定</a>
    </div>
    <nut-icon v-show="loading" name="loading" />
    <picker-view
      class="SelectRemote_picker-view"
      indicator-style="height: 30px;"
      style="width: 100%; height: 300px"
      :value="ids"
      @change="onChange"
    >
      <picker-view-column>
        <div v-for="item in options" :key="item[idProp]">
          {{ item[nameProp] }}
        </div>
      </picker-view-column>
    </picker-view>
  </nut-popup>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import useInit from './composables/useInit'
import type { OptionType } from './Select'
import SelectBar from './SelectBar.vue'
const props = withDefaults(
  defineProps<{
    req: () => Promise<any>
    value: string
    label?: string
    idProp?: string
    nameProp?: string
    // 是否触发click 弹出选择列表
    noClickPop?: boolean
  }>(),
  {
    idProp: 'id',
    nameProp: 'name',
  },
)

const emits = defineEmits<{
  (e: 'update:value', value: string): void
  (e: 'update:label', label: string): void
  (e: 'change', item: any): void
}>()

const loading = ref(false)
const ids = ref([0])
const name = ref<string>(props.label || '')
const options = ref<OptionType[]>([])
const visible = ref(false)
let index = 0 // 当前选择

const optionsDict = computed(() => {
  let { idProp } = props
  return options.value.reduce((newDict, option, index) => {
    newDict[option[idProp]] = {
      index,
      option,
    }
    return newDict
  }, {})
})

const { init } = useInit(async () => {
  loading.value = true
  let list = await props.req().finally(() => {
    loading.value = false
  })
  options.value = list

  setTimeout(() => {
    selectById(props.value)
  }, 1)
})

function selectById(thisId) {
  const item = optionsDict.value[thisId]
  if (item) {
    ids.value = [item.index]
  }
}

function popDialog() {
  visible.value = true
  init()
}

function onChange(e) {
  if (loading.value) return
  index = e.detail.value[0]
}

function close() {
  visible.value = false
}

function confirm() {
  let { idProp, nameProp } = props
  const option = options.value[index]
  let value = option[idProp]
  let label = (name.value = option[nameProp])
  emits('update:value', option[idProp])
  emits('update:label', option[nameProp])
  emits('change', { value, label, option })
  close()
}

function clickSelf() {
  if (props.noClickPop) return
  popDialog()
}

// 由其他元素触发 click, 此时 noClickPop 应该设为 true
defineExpose({
  click() {
    popDialog()
  },
})
</script>
<style lang="scss">
.SelectRemote_popup {
  .nut-icon-loading {
    position: absolute;
    z-index: 1;
    width: 100%;
  }
}

.SelectRemote_top-btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

  .h5-a {
    padding: 10px;
  }
}

.SelectRemote_popup-title {
  font-size: 16px;
  color: $gray-8;
}

.SelectRemote_confirm-btn {
  color: $primary-color;
}

.SelectRemote_picker-view {
  text-align: center;
}
</style>

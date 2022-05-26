<template>
  <scroll-view
    class="ListLoad"
    :scrollY="true"
    :refresherEnabled="true"
    :refresherTriggered="refresherTriggered"
    @scrolltolower="scrollToLower"
    @refresherrefresh="refresherRefresh"
    :enable-back-to-top="true"
    refresher-background="#eee"
  >
    <!-- <div class="ListLoad_refresh" style="">
      <div class="ListLoad_refresh_view" style=""> 下拉刷新 </div>
    </div> -->

    <slot :list="list"></slot>
    <LoadBar :status="loadBarStatus" />
    <!-- <LoadingCover v-if="firstLoading" /> -->
    <nut-toast v-bind="toast" v-model:visible="toast.show" />
  </scroll-view>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro'
import type { Ref } from 'vue'
import { watch } from 'vue'
import { ref } from 'vue'
import type { statusType } from './LoadBar.vue'
import LoadBar from './LoadBar.vue'
// import LoadingCover from '../Loading/LoadingCover.vue'
import useToast from '@/hooks/useToast'

let { toast, loading: firstLoading } = useToast()

// const firstLoading = ref(false) // 只限第一次加载

const status: Ref<statusType> = ref('') // 所有情况的状态
const loadBarStatus: Ref<statusType> = ref('') // 底部加载条的状态

const props = withDefaults(
  defineProps<{
    reqList: ({ page: number }) => Promise<any>
    /**起始页 */
    startPage?: number
    /**是否立即执行 */
    immediate?: boolean
    /**是否开启滚动底部触发 */
    scrollLowerEnabled?: boolean
    handleResult?: ({ resData, page, startPage, noDataCb, finishCb }) => any[]
  }>(),
  {
    // 起始页
    startPage: 1,

    // 是否立即执行
    immediate: true,

    // 是否开启滚动底部触发
    scrollLowerEnabled: true,

    // 可根据不同数据情况配置
    handleResult: ({ resData, page, startPage, noDataCb, finishCb }) => {
      let empty = resData.length === 0

      if (page === startPage && empty) {
        // 没有任何数据
        noDataCb()
      } else if (empty) {
        // 到底了
        finishCb()
      }

      return resData
    },
  },
)

let page = 1
watch(
  () => props.startPage,
  (start) => {
    page = start
  },
  {
    immediate: true,
  },
)

const list = ref<any[]>([])

const refresherTriggered = ref(true)

if (props.immediate) {
  firstPageLoad()
}

defineExpose({
  firstPageLoad,
})

async function scrollToLower() {
  if (!props.scrollLowerEnabled) return
  if (status.value) return

  page += 1
  loadBarStatus.value = 'loading'
  const ls = await getList(page)
  list.value = list.value.concat(ls)
}

// 内部处理结果
function handleResultSelf(resData, page) {
  return props.handleResult({
    resData,
    startPage: props.startPage,
    page,

    noDataCb: () => {
      // 没有任何数据
      loadBarStatus.value = status.value = 'noData'
    },
    finishCb: () => {
      // 到底了
      loadBarStatus.value = status.value = 'noMore'
    },
  })
}

async function getList(page) {
  status.value = 'loading'
  let resData = await props.reqList({ page }).finally(() => {
    loadBarStatus.value = status.value = ''
  })
  return handleResultSelf(resData, page)
}

async function firstPageLoad() {
  page = props.startPage
  firstLoading.value = true
  list.value = await getList(page).finally(() => {
    firstLoading.value = false
  })
}

function refresherRefresh() {
  page = props.startPage
  refresherTriggered.value = true
  return getList(page)
    .then((res) => {
      list.value = res
      Taro.showToast({
        title: '刷新成功',
        icon: 'none',
        duration: 400,
      })
    })
    .finally(() => {
      refresherTriggered.value = false
    })
}

// 下拉刷新被下拉 会触发多次
// function refresherpulling() {
//   console.log('下拉刷新被下拉');
// }
// 下拉刷新复位
// function refresherrestore() {
//   console.log('下拉刷新复位');
// }
</script>
<style lang="scss">
.ListLoad {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

// .ListLoad_refresh {
//   position: absolute;
//   width: 100%;
//   height: 26px;
//   // background: blue;
//   // align-items: center;
//   transform: translateY(-100%);
// }

// .ListLoad_refresh_view {
//   text-align: center;
//   // height: 26px;
// }
</style>

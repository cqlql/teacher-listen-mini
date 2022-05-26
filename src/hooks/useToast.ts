import { nextTick } from '@tarojs/taro'
import type { Ref, UnwrapNestedRefs } from 'vue'
import { reactive, ref, watch } from 'vue'

export interface UseToast {
  toast: UnwrapNestedRefs<ToastOptions>
  toastFail: (msg: string) => void
  toastWarn: (msg: string) => void
  toastSuccess: (msg: string) => void
  toastLoading: (msg: string) => void
  toastClose: () => void
  loading: Ref<boolean>
}

export default function useToast(): UseToast {
  const loading = ref(false)
  const loadingMsg = '努力加载中...'
  const duration = 2000

  const toast = reactive<ToastOptions>({
    msg: '',
    show: false,
    type: 'text',
  })
  watch(loading, (loadingVal) => {
    if (loadingVal) {
      toastLoading(toast.msg)
    } else {
      toastClose()
    }
  })

  function toastLoading(msg: string = loadingMsg) {
    safeOpen(() => {
      toast.type = 'loading'
      toast.msg = msg
      toast.duration = 0
      toast.show = true
    })
  }

  function toastClose() {
    toast.show = false
  }

  // 避免与 loading 冲突，由于共用一个 Toast，而 loading 是不自动关闭的
  function safeOpen(cb) {
    if (toast.show) {
      toast.show = false

      nextTick(() => {
        cb()
      })
    } else {
      cb()
    }
  }

  function generalShow(msg: string, type: typeof toast['type']) {
    safeOpen(() => {
      toast.type = type
      toast.msg = msg
      toast.show = true
      toast.duration = duration
    })
  }

  return {
    toast,
    toastFail(msg: string) {
      generalShow(msg, 'fail')
    },
    toastWarn(msg: string) {
      generalShow(msg, 'warn')
    },
    toastSuccess(msg: string) {
      console.log('🚀 -- toastSuccess -- string')
      generalShow(msg, 'success')
    },
    toastLoading,
    toastClose,
    loading,
  }
}

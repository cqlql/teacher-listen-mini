import { watch } from 'vue'

export default function useLoading(loading, toast) {
  watch(loading, (isLoading) => {
    if (isLoading) {
      toast.show = true
      toast.msg = ''
      toast.type = 'loading'
    } else {
      toast.show = false
    }
  })
}

import { ref } from 'vue'

export default function useSelectSubjectDialog() {
  const visible = ref(false)
  function show() {
    visible.value = true
  }
  return {
    show,
    visible,
  }
}

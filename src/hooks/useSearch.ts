import Debounce from '@/utils/perf/debounce'
import { ref, watch } from 'vue'

export default function useSearch(search: () => void) {
  const searchValue = ref('')
  const debounce = new Debounce()

  watch(searchValue, () => {
    debounce.exec(() => {
      search()
    })
  })
  return {
    searchValue,
  }
}

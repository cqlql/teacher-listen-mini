import { ref } from 'vue'
import Search from './search'

export default function useSearch(searchList: string[], debounceTime = 300) {
  const s = new Search()
  const keyword = ref('')

  const resultList = ref<string[] | null>([])

  function search() {
    s.to(
      keyword.value,
      searchList,
      (result) => {
        resultList.value = result
      },
      debounceTime,
    )
  }

  return {
    keyword,
    resultList,
    search,
  }
}

import { ref } from 'vue'
import SearchCustom from '../searchExec'

export default function useSelectListSearch(allList, nameProp) {
  const searchCustom = new SearchCustom()
  const searchValue = ref('')
  const list = ref<any[] | null>([])
  function onInputSearch() {
    searchCustom.to<any>(
      searchValue.value,
      allList.value,
      (resultList) => {
        list.value = resultList
      },
      (item: any) => {
        return item[nameProp]
      },
    )
  }

  return {
    list,
    searchValue,
    onInputSearch,
  }
}

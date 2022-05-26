import type { Campus } from '@/api/login'
import { getCampus } from '@/api/login'
import { ref } from 'vue'
import SearchCustom from '../searchExec'
// import useSearch from '@/utils/search/useSearch';

export default function useSelectCampus() {
  const popupVisible = ref(false)
  const searchValue = ref('')

  const searchCustom = new SearchCustom()

  const selectedCampus = ref<Campus>({
    campus_id_str: '',
    campus_name: '',
    school_name: '',
  })

  // const { keyword, search, resultList } = useSearch(searchList);

  let campusListAll: Campus[] = []
  const campusList = ref<Campus[] | null>([])

  function onInput() {
    searchCustom.to<Campus>(
      searchValue.value,
      campusListAll,
      (resultList) => {
        campusList.value = resultList
      },
      (item: Campus) => {
        return item.school_name + ' ' + item.campus_id_str
      },
    )
  }

  return {
    selectedCampus,
    async popCampus() {
      popupVisible.value = true

      campusListAll = await getCampus()

      campusList.value = campusListAll
    },
    popupVisible,
    searchValue,
    campusList,
    onInput,
    onSelect(item: Campus) {
      selectedCampus.value = item
      popupVisible.value = false
    },
  }
}

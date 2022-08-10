import type { Campus } from '@/api/login'
import { ref } from 'vue'

// import useSearch from '@/utils/search/useSearch';

export default function useSelectCampus() {
  const popupVisible = ref(false)

  const selectedCampus = ref<Campus>({
    id: 0,
    name: '',
    school_id: 0,
    school_name: '',
  })

  // const { keyword, search, resultList } = useSearch(searchList);

  return {
    selectedCampus,
    async popCampus() {
      popupVisible.value = true

      // campusListAll = await getCampus()

      // campusList.value = campusListAll
    },
    popupVisible,
  }
}

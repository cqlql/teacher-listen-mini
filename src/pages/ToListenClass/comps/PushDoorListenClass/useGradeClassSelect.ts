import { computed, reactive, watch } from 'vue'
import useGradeClassData from './useGradeClassData'

export default function useGradeClassSelect() {
  const { gradeData, gradeList } = useGradeClassData()
  const searchOptions = reactive({
    grade: '',
    class: '',
    search() {},
  })

  function search() {
    searchOptions.search()
  }

  const classList = computed(() => {
    return gradeData.value[searchOptions.grade] || []
  })

  watch(gradeList, (gradeListValue) => {
    const first = gradeListValue[0]
    if (first) {
      searchOptions.grade = first.value
    }
  })

  watch(classList, (classListValue) => {
    const classInfo = classListValue[0]
    if (classInfo) {
      searchOptions.class = classInfo.value
    }
    search()
  })

  return {
    searchOptions,
    gradeList,
    classList,
    search,
  }
}

import { computed, inject, reactive, watch } from 'vue'
import type { GradeClassDataType } from './useGradeClassData'
// import useGradeClassData from './useGradeClassData'

export default function useGradeClassSelect() {
  const { gradeData, gradeList } = inject('gradeClassData') as GradeClassDataType
  // const { gradeData, gradeList } = useGradeClassData()
  const searchOptions = reactive({
    grade: '',
    class: '',
    period: '',
    search() {},
  })

  function search(selectedClass: any) {
    searchOptions.period = selectedClass.period
    searchOptions.search()
  }

  const classList = computed(() => {
    return gradeData.value[searchOptions.grade] || []
  })

  watch(
    gradeList,
    (gradeListValue) => {
      const first = gradeListValue[0]
      if (first) {
        searchOptions.grade = first.value
      }
    },
    {
      immediate: true,
    },
  )

  watch(classList, (classListValue) => {
    const classInfo = classListValue[0]
    if (classInfo) {
      searchOptions.class = classInfo.value
      search(classInfo)
    }
  })

  return {
    searchOptions,
    gradeList,
    classList,
    search,
  }
}

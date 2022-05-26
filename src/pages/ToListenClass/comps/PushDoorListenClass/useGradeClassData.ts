import { getCampusinfo } from '@/api/select'
import { ref } from 'vue'
interface OptionType {
  value: string
  label: string
}
export default function useGradeClassData() {
  const gradeData = ref<Record<string, OptionType[]>>({})
  const gradeList = ref<OptionType[]>([])

  getCampusinfo().then((resData) => {
    const gradeListNew: OptionType[] = []
    gradeData.value = resData.schoolClasses.reduce((newDict, item) => {
      let classListTemp: any[] | undefined = newDict[item.grade_id]
      if (!classListTemp) {
        classListTemp = newDict[item.grade_id] = []
        gradeListNew.push({
          value: item.grade_id,
          label: item.grade_name,
        })
      }
      classListTemp.push({
        value: item.class_id,
        label: item.class_name,
      })
      return newDict
    }, {})

    // 排序
    gradeListNew.sort((a, b) => {
      return Number(a.value) - Number(b.value)
    })
    Object.entries(gradeData.value).forEach(([, classList]) => {
      classList.sort((a, b) => {
        return parseInt(a.label) - parseInt(b.label)
      })
    })

    gradeList.value = gradeListNew
  })

  return {
    gradeData,
    gradeList,
  }
}

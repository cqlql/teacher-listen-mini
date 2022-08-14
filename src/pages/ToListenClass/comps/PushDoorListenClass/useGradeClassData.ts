import { getCampusinfo } from '@/api/select'
import { ref } from 'vue'
interface OptionType {
  value: string
  label: string
  grade: number
}

function numberToGradeName(v: number) {
  const dict = ' 一二三四五六七八九十'

  return dict[v] + '年级'
}
export default function useGradeClassData() {
  const gradeData = ref<Record<string, OptionType[]>>({})
  const gradeList = ref<OptionType[]>([])
  const gradeInfoRecord: Record<number, { gradeName: string; grade: number }> = {}

  getCampusinfo().then((resData) => {
    resData.grades.reduce((acc, val) => {
      const grade = val.start_level + val.level
      acc[val.id] = {
        gradeName: numberToGradeName(val.start_level + val.level),
        grade,
      }
      return acc
    }, gradeInfoRecord)

    const gradeListNew: OptionType[] = []
    gradeData.value = resData.classes.reduce((newDict, item) => {
      const gradeId = item.grade_id
      let classListTemp: any[] | undefined = newDict[gradeId]
      if (!classListTemp) {
        classListTemp = newDict[gradeId] = []
        const gradeInfo = gradeInfoRecord[gradeId]
        gradeListNew.push({
          value: String(gradeId),
          label: gradeInfo.gradeName,
          grade: gradeInfo.grade,
        })
      }
      classListTemp.push({
        value: String(item.id),
        label: item.name,
      })
      return newDict
    }, {})

    // grade 排序
    gradeListNew.sort((a, b) => {
      return a.grade - b.grade
    })
    // class 排序
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

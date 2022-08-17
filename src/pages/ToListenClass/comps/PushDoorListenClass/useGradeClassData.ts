import type { CampusinfoResult } from '@/api/model/selectModel'
import { getCampusinfo } from '@/api/select'
import getPeriodMap from '@/data/get-period-map'
import type { Ref } from 'vue'
import { ref } from 'vue'
interface PeriodType {
  value: string
  label: string
}
interface SubjectType {
  value: string
  label: string
}
interface GradeType {
  value: string
  label: string
  grade: number
}

interface ClassInfoType {
  value: string
  label: string
  period: number
}

export interface GradeClassDataType {
  gradeData: Ref<Record<string, ClassInfoType[]>>
  gradeList: Ref<GradeType[]>
  periodList: Ref<PeriodType[]>
  subjectListByPeriodKey: Ref<Record<string, SubjectType[]>>
}

function numberConvertGradeName(v: number) {
  const dict = ' 一二三四五六七八九十'

  return dict[v] + '年级'
}

function initGradeClassData(resData: CampusinfoResult) {
  const gradeDataNew: Record<string, ClassInfoType[]> = {}

  const gradeInfoRecord: Record<number, { gradeName: string; grade: number }> = {}

  resData.grades.reduce((acc, val) => {
    const grade = val.start_level + val.level
    acc[val.id] = {
      gradeName: numberConvertGradeName(val.start_level + val.level),
      grade,
    }
    return acc
  }, gradeInfoRecord)

  const gradeListNew: GradeType[] = []
  resData.classes.reduce((newDict, item) => {
    const gradeId = item.grade_id
    let classListTemp: ClassInfoType[] | undefined = newDict[gradeId]
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
      period: item.period,
    })
    return newDict
  }, gradeDataNew)

  // grade 排序
  gradeListNew.sort((a, b) => {
    return a.grade - b.grade
  })
  // class 排序
  Object.entries(gradeDataNew).forEach(([, classList]) => {
    classList.sort((a, b) => {
      return parseInt(a.label) - parseInt(b.label)
    })
  })

  return {
    gradeDataNew,
    gradeListNew,
  }
}

function initPeriodsData(resData: CampusinfoResult) {
  const periodsRecord = getPeriodMap()
  // const subjectByPeriodKey = resData.subjects.reduce<Record<string, SubjectType[]>>(
  //   (acc, subject) => {
  //     const periodId = subject.period
  //     let subjectListTemp: SubjectType[] | undefined = acc[periodId]
  //     if (!subjectListTemp) {
  //       subjectListTemp = acc[periodId] = []
  //     }
  //     subjectListTemp.push({
  //       value: String(subject.subject_id),
  //       label: subject.subject_name,
  //     })
  //     return acc
  //   },
  //   {},
  // )
  return {
    periodListNew: resData.periods.map((item) => {
      const periodId = item.period
      return {
        value: String(periodId),
        label: periodsRecord[periodId],
      }
    }),
    subjectListByPeriodKeyNew: resData.subjects.reduce<Record<string, SubjectType[]>>(
      (acc, subject) => {
        const periodId = subject.period
        let subjectListTemp: SubjectType[] | undefined = acc[periodId]
        if (!subjectListTemp) {
          subjectListTemp = acc[periodId] = []
        }
        subjectListTemp.push({
          value: String(subject.subject_id),
          label: subject.subject_name,
        })
        return acc
      },
      {},
    ),
  }
}

export default function useGradeClassData(): GradeClassDataType {
  const gradeData = ref<Record<string, ClassInfoType[]>>({})
  const gradeList = ref<GradeType[]>([])

  const periodList = ref<PeriodType[]>([])
  const subjectListByPeriodKey = ref<Record<string, SubjectType[]>>({})

  getCampusinfo().then((resData) => {
    const { gradeDataNew, gradeListNew } = initGradeClassData(resData)
    gradeData.value = gradeDataNew
    gradeList.value = gradeListNew

    const { periodListNew, subjectListByPeriodKeyNew } = initPeriodsData(resData)
    periodList.value = periodListNew
    subjectListByPeriodKey.value = subjectListByPeriodKeyNew
  })

  return {
    gradeData,
    gradeList,
    periodList,
    subjectListByPeriodKey,
  }
}

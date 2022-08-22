export default function getGrade(period: number, years: number) {
  //当前年份
  const grade_num = new Date().getFullYear() - years

  switch (period) {
    //小学
    case 1001:
      switch (grade_num) {
        case 0:
          return '一年级'
        case 1:
          return '二年级'
        case 2:
          return '三年级'
        case 3:
          return '四年级'
        case 4:
          return '五年级'
        case 5:
          return '六年级'

        default:
          return '小学已毕业'
      }

    //初中
    case 1002:
      switch (grade_num) {
        case 0:
          return '七年级'
        case 1:
          return '八年级'
        case 2:
          return '九年级'

        default:
          return '初中已毕业'
      }

    //高中
    case 1003:
      switch (grade_num) {
        case 0:
          return '高一'
        case 1:
          return '高二'
        case 2:
          return '高三'

        default:
          return '高中已毕业'
      }

    //大学
    case 1004:
      switch (grade_num) {
        case 0:
          return '大一'
        case 1:
          return '大二'
        case 2:
          return '大三'
        case 3:
          return '大四'

        default:
          return '大学已毕业'
      }

    default:
      return ''
  }
}

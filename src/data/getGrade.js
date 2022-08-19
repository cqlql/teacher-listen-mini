export default function getGrade(period, years) {
  //当前年份
  var grade_num = new Date().getFullYear() - years
  switch (period) {
    //小学
    case 1001:
      switch (grade_num) {
        case 0:
          return '小学一年级'
        case 1:
          return '小学二年级'
        case 2:
          return '小学三年级'
        case 3:
          return '小学四年级'
        case 4:
          return '小学五年级'
        case 5:
          return '小学六年级'

        default:
          return '小学已毕业'
      }

    //初中
    case 1002:
      switch (grade_num) {
        case 0:
          return '初中一年级'
        case 1:
          return '初中二年级'
        case 2:
          return '初中三年级'

        default:
          return '初中已毕业'
      }

    //高中
    case 1003:
      switch (grade_num) {
        case 0:
          return '高中一年级'
        case 1:
          return '高中二年级'
        case 2:
          return '高中三年级'

        default:
          return '高中已毕业'
      }

    //大学
    case 1004:
      switch (grade_num) {
        case 0:
          return '大学一年级'
        case 1:
          return '大学二年级'
        case 2:
          return '大学三年级'
        case 3:
          return '大学四年级'

        default:
          return '大学已毕业'
      }

    default:
      return ''
  }
}

export default function () {
  const formSetting = {
    // "公开课测试", // 公开课名称
    course_name: {
      label: '课程名称',
    },
    period_id: {
      label: '学段',
    },
    // 1, // 科目ID
    subject_id: {
      label: '科目',
    },
    // 5601661057566615964, // 年级ID
    grade_id: {
      label: '年级',
    },
    // 5015483610072272084, // 班级ID
    class_id: {
      label: '班级',
    },
    // "2018-01-10", // 开课日期
    lesson_date: {
      label: '开课日期',
    },
    // "10:20:00", // 开课时间
    start_time: {
      label: '开课时间',
    },
    // 1016730, // 教室ID, 与 `class_room_name`选一个参数提交
    class_room_id: {
      label: '教室',
    },
    // "录播室", // 教室名（上课地点）
    class_room_name: {
      label: '教室名',
    },
    // 4679665164583612636, // 科组ID
    subject_group_id: {
      label: '科组',
    },
    oca: {
      label: '附件',
    },
    // false 普通公开课　true 区级优质观摩课
    is_prior: {
      label: '类型',
    },
  }

  return {
    formSetting,
  }
}

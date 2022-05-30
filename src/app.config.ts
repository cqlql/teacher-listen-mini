export default {
  pages: (function () {
    const pages = [
      'pages/login/auth',
      'pages/login/index',
      'pages/profile/index',
      'pages/index/HomePage',
      // 我要听课
      'pages/ToListenClass/ToListenClass',
      // 听评课记录（听课、授课）
      'pages/ListenEvaluationRecord/ListenEvaluationRecord',
      // 开课记录 开课审批
      'pages/ListenApplicationRecord/ListenApplicationRecord',
      // 创建听课
      'pages/CreateListen/CreateListen',
      // 创建校外课
      'pages/CreateOutsideClass/CreateOutsideClass',
      // 听课评价 过程记录
      'pages/ListenEvaluation/ListenEvaluation',
      // 听课记录详情
      'pages/ListenRecordDetails/ListenRecordDetails',
      // 听课老师听课评价详情
      'pages/ListenEvaluationDetails/ListenEvaluationDetails',
      // 授课记录详情
      'pages/TeachingRecordDetails/TeachingRecordDetails',
      // 听课老师名单
      'pages/ListeningTeacherList/ListeningTeacherList',
      // 科组/ 听课记录
      'pages/ListenEvaluationList/ListenEvaluationList',
      // 画笔
      'pages/DrawPage/DrawPage',
      // 搜索
      'pages/SearchPage/SearchPage',
    ]
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line prefer-const
      let firstKeyword = ''

      // firstKeyword = 'ListenEvaluationRecord'

      pages.push('pages/demo/DemoLot')
      pages.some((path, index) => {
        if (path.includes(firstKeyword)) {
          pages.unshift(pages.splice(index, 1)[0])
          return true
        }
      })
    }
    return pages
  })(),
  subpackages: [
    {
      root: 'packageECharts',
      pages: [
        // 评课统计
        'pages/EvaluationStatistics/EvaluationStatistics',
        // 我的评课统计
        'pages/EvaluationStatistics/MyEvaluationStatistics',
      ],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    // "custom": true,
    color: '#666',
    selectedColor: '#81b3fd',
    borderStyle: 'black',
    backgroundColor: '#fff',
    list: (() => {
      const tabs = [
        {
          pagePath: 'pages/index/HomePage',
          iconPath: 'static/img/today-course.png',
          selectedIconPath: 'static/img/today-course-active.png',
          text: '今日公开课',
        },
        {
          pagePath: 'pages/ToListenClass/ToListenClass',
          iconPath: 'static/img/add-plan.png',
          selectedIconPath: 'static/img/add-plan-active.png',
          text: '我要听课',
        },
        {
          pagePath: 'pages/ListenEvaluationRecord/ListenEvaluationRecord',
          iconPath: 'static/img/course-record.png',
          selectedIconPath: 'static/img/course-record-active.png',
          text: '听评课记录',
        },
        {
          pagePath: 'pages/profile/index',
          iconPath: 'static/img/my.png',
          selectedIconPath: 'static/img/my-active.png',
          text: '我的',
        },
      ]
      if (process.env.NODE_ENV === 'development') {
        tabs.push({
          pagePath: 'pages/demo/DemoLot',
          iconPath: 'static/img/my.png',
          selectedIconPath: 'static/img/my-active.png',
          text: 'DemoLot',
        })
      }
      return tabs
    })(),
  },

  lazyCodeLoading: 'requiredComponents',
}

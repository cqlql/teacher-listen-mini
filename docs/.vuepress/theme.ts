import { hopeTheme } from 'vuepress-theme-hope'
import navbar from './navbar'
// import sidebar from './sidebar'

export default hopeTheme({
  hostname: 'http://docs.cqlql.top',

  author: {
    name: 'Mr.Joly',
    url: '',
  },

  iconPrefix: 'iconfont icon-',

  // logo: '/logo.svg',

  // repo: 'https://gitee.com/cqlql/teacher-listen-mini/tree/master/vuepress',
  repo: 'https://gitee.com/cqlql/teacher-listen-mini/tree/master/vuepress',

  // docsDir: 'docs',

  editLinkPattern: 'https://gitee.com/cqlql/teacher-listen-mini/edit/master/vuepress/docs/:path',

  // navbar
  // navbar: navbar,

  // sidebar
  sidebar: navbar,

  displayFooter: true,

  pageInfo: ['Author', 'Original', 'Date', 'Category', 'Tag', 'ReadingTime'],
})

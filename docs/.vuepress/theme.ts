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

  // github
  // repo: 'cqlql/teacher-listen-mini',
  // docsDir: 'docs',

  // gitee
  repo: 'https://gitee.com/cqlql/teacher-listen-mini.git',
  editLinkPattern: 'https://gitee.com/cqlql/teacher-listen-mini/edit/docs/docs/:path',

  // navbar
  // navbar: navbar,

  // sidebar
  sidebar: navbar,

  displayFooter: true,

  pageInfo: ['Author', 'Original', 'Date', 'Category', 'Tag', 'ReadingTime'],
})

import { navbar } from 'vuepress-theme-hope'
import navDataGen from './utils/nav-data-generate'

const navbarConfig = ['/']

export default navbar(navbarConfig.concat(navDataGen))

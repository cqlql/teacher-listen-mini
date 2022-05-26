import path from 'path'
import { defineUserConfig } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
import theme from './theme'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '智听小程序开发文档',
  // description: 'welcome',

  base: '/teacher-listen-mini/',

  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css',
      },
    ],
  ],
  alias: {
    '@': path.resolve(__dirname, '../../../src'),
    '!': __dirname,
  },

  theme,
  plugins: [searchPlugin()],
})

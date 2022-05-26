import fs from 'fs'
import path from 'path'
import readdir from './utils/readdir'

const settingMap = {
  vue: {
    icon: 'vue',
  },
  nodejs: {
    icon: 'nodeJS',
  },
}

const navbarConfig = []

readdir({
  rootPath: path.resolve(__dirname, '../'),
  ignore: ['.vuepress', 'image'],
  callback: (params) => {
    let { dirname, parentDir, parentDirname, isDirectory } = params
    if (dirname === 'README.md') return

    let text = dirname.replace(/^\d+_/, '')

    if (isDirectory) {
      let setting = settingMap[text]
      return {
        text: setting?.text || text,
        icon: setting?.icon,
        prefix: parentDirname ? `${dirname}/` : `/${dirname}/`,
      }
    }
    text = text.replace(/^\d+_|\.md$/g, '')
    let setting = settingMap[text]
    return {
      text: setting?.text || text,
      link: dirname,
      fullLink: parentDir + '/' + dirname,
    }
  },
  initValue: navbarConfig,
})

fs.writeFileSync(
  path.resolve(__dirname, './components/data.json'),
  JSON.stringify(navbarConfig),
  'utf8',
)

export default navbarConfig

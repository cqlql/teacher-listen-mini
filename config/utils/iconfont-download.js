const path = require('path')
const fs = require('fs')
const https = require('https')

const config = [
  {
    // css url
    cssUrl: `
    //at.alicdn.com/t/font_2952033_68sphpcroyq.css
    `,
    // 目标位置
    dir: 'src/styles',
  },
]

function download(url, filePath, cb, isWrite) {
  https.get(url, function (res) {
    if (isWrite) {
      var file = fs.createWriteStream(filePath)
      res.pipe(file)
    }
    console.log('下载成功：', filePath)
    cb?.(res)
  })
}
config.forEach((d) => {
  let { cssUrl, dir } = d
  let fontFilePath = path.resolve(__dirname, '../../', dir, 'iconfont.ttf')
  let cssFilePath = path.resolve(__dirname, '../../', dir, 'iconfont.css')

  function writeFile(content) {
    let url = 'https:' + content.match(/\/\/.+?\.ttf/)[0]
    fs.writeFileSync(
      cssFilePath,
      content.replace(/url\('.+?'\)/, "url('./iconfont.ttf')")
      // 给[微信支付]图标加颜色
      //.replace(/\.icon-wechat-pay::?before\s*{/, '$&\r\n  color: #09BB07;'),
      'utf8',
    )
    download(url, fontFilePath, null, true)
  }

  download('https:' + cssUrl.trim(), cssFilePath, (res) => {
    var content = ''
    res.on('data', (data) => {
      content += data
    })
    res.on('end', () => {
      // fs.writeFileSync('note_data/hello.txt', 'hello','utf8');
      writeFile(content)
    })
  })
})

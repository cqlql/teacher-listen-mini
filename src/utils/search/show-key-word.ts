/**
 * 将关键字用 <b> 包裹，并返回
 * 搜索用
 */
import { escapeRegChar } from '@/utils/reg'

// 避免输出 html 标签
function htmlToText(html: string) {
  const el = document.createElement('div')
  el.textContent = html
  return el.innerHTML
}

export default function showKeyWrod(text: string, keyword: string) {
  if (keyword) {
    keyword = escapeRegChar(keyword) // 转义正则符号
    keyword = keyword.trim().replace(/ +/g, '|') // 支持空格分隔字符串
    const reg = new RegExp(keyword, 'g')
    text = text.replace(reg, (findStr) => `_$$_${findStr}_/$$_`)

    const textConent = htmlToText(text)
    return textConent.replace(/_\$\$_(.+?)_\/\$\$_/g, '<b>$1</b>')
  }

  return htmlToText(text)
}

// export default function search (keyword:string, list:string[], debounceTime:number) {
//   return null
// }

import Debounce from '../perf/debounce'
import createSearchRegExp from './create-search-regexp'
import showKeyWrod from './show-key-word'

export default class Search {
  debounce
  constructor() {
    this.debounce = new Debounce()
  }

  /**
   *
   * @param keyword
   * @param list
   * @returns {null} 没找到
   * @returns {string[]} 找到并且有标记，或者空字符串输出所有
   */
  to(
    keyword: string,
    list: string[],
    debounceCallback: (resultList: string[] | null) => void,
    debounceTime: number,
  ) {
    this.debounce.exec(() => {
      let resultList: string[] = []
      if (keyword) {
        const reg = createSearchRegExp(keyword)
        list.forEach((content) => {
          if (reg.test(content)) {
            resultList.push(showKeyWrod(content, keyword))
          }
        })
      } else {
        resultList = list
      }
      if (resultList.length === 0) {
        debounceCallback(null)
      } else {
        debounceCallback(resultList)
      }
    }, debounceTime)
  }
}

import Debounce from '@/utils/perf/debounce'
import createSearchRegExp from '@/utils/search/create-search-regexp'
// import showKeyWrod from '@/utils/search/show-key-word';

export default class SearchCustom {
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
  to<T>(
    keyword: string,
    list: T[],
    debounceCallback: (resultList: T[] | null) => void,
    getContent: (item: T) => string,
    // setNewItem: (item: T, resultContext: string) => void,
    debounceTime = 300,
  ) {
    this.debounce.exec(() => {
      let resultList: T[] = []
      if (keyword) {
        const reg = createSearchRegExp(keyword)
        list.forEach((item) => {
          const content = getContent(item)
          if (reg.test(content)) {
            // setNewItem(item, showKeyWrod(content, keyword));
            resultList.push(item)
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

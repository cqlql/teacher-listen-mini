export interface Result<T = any> {
  code: number
  type: 'success' | 'error' | 'warning'
  message: string
  result: T
}

export interface ResultList<T = any> {
  pages: {
    currentPage: number
    totalNumber: number
    totalpages: number
  }
  list: T[]
}

export interface RequestConfig {
  /**错误回调 */
  fail?(msg: string): void

  urlPrefixName?: 'api'
  hasUrlPrefix?: boolean
}

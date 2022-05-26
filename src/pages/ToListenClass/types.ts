export interface TopSearchParams {
  subject: string
  subjectShortName: string
  date: string
  // 执行搜索
  search: () => void
}

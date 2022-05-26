export interface DateItem {
  value?: number
  isToday?: boolean
  selected?: boolean
  notCurrentMonth?: boolean
  date: Date
}

export interface DateHandleParams {
  dateItem: DateItem
  date: Date
}

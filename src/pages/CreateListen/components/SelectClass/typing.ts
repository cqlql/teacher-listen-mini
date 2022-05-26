export interface SelectOption {
  id: string
  name: string
  children: SelectOption[]
}

export interface IdRecordItem {
  gradeIndex: number
  classIndex: number
  item: any
}

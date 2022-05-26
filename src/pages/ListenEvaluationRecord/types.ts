export interface EvaluationDataItem {
  id: string
  dateTime: string
  type: string
  subjectShort: string
  name: string
  teacher: string
  className: string
}

export interface SearchOptions {
  listen: {
    dateStart: string
    dateEnd: string
    keyword: string
    selectedName: string
    visible: boolean
    search: () => void
  }
  teaching: {
    dateStart: string
    dateEnd: string
    keyword: string
    selectedName: string
    visible: boolean
    search: () => void
  }
}

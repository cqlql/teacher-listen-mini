export interface EvaluationDataItem {
  id: string
  dateTime: string
  type?: string
  subjectShort?: string
  name: string
  teacher: string
  className: string
  userId: string
}

export interface DingListenItem {
  id: string
  dateTime: string
  type?: string
  subjectShort?: string
  name: string
  teacher: string
  className: string
  videos: {
    file_id: string
    play_url: string
  }[]
}

interface SearchItem {
  dateStart: string
  dateEnd: string
  keyword: string
  selectedName: string
  defaultIndex: number
  visible: boolean
  userId?: string
  search: () => void
}

export interface SearchOptions {
  listen: SearchItem
  teaching: SearchItem
}

export interface SemesterRangeOption {
  label: string
  value?: string
  start: string
  end: string
}

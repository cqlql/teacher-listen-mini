export interface EvaluationDataItem {
  id: string
  dateTime: string
  type?: string
  subjectShort?: string
  name: string
  teacher: string
  className: string
}

export interface DingListenItem extends EvaluationDataItem {
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
  search: () => void
}

export interface SearchOptions {
  listen: SearchItem
  teaching: SearchItem
}

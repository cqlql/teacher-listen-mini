import type { Ref } from 'vue'
import type { ProcessRecordStore } from './hooks/useProcessRecordStore'
export type typeName = 'think' | 'album' | 'camera' | 'video' | 'drawing'

interface FileInfo {
  id: string
  url: string
}

export interface ThinkItem {
  id: string
  type: 'think'
  text: string
}

export interface PictureItem {
  id: string
  type: 'picture'
  files: FileInfo[]
}

export interface VideoItem {
  id: string
  type: 'video'
  files: FileInfo[]
}

export interface DrawingItem {
  id: string
  type: 'drawing'
  files: FileInfo[]
}

export type RecordChildItem = ThinkItem | PictureItem | DrawingItem | VideoItem

export interface RecordItem {
  id: string
  text: string

  thinkItem?: ThinkItem
  pictureItem?: PictureItem
  videoItem?: VideoItem
  drawingItem?: DrawingItem

  list: RecordChildItem[]
}

export interface ScoreItem {
  id: string
  name: string
  /* 选择项 */
  ids: string[]
  weight: string
  options: {
    id: string
    name: string
  }[]
}

export interface EvaluationScore {
  reviews: string
  scoreList: ScoreItem[]
}

export interface ListenEvaluationStore {
  save: () => void
  saveEvaluationScore: () => void
  liveClassUrl: string
  evaluationScore: Ref<EvaluationScore>
  processRecordStore: ProcessRecordStore
}

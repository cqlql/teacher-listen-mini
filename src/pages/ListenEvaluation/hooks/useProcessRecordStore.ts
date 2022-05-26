import type { GetEvaluationListResult } from '@/api/model/courseModel'
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { RecordChildItem, RecordItem } from '../types'

export interface ProcessRecordStore {
  processRecordList: Ref<RecordItem[]>
  addRecord: () => void
  removeRecordItem: (recordIndex: number, itemIndex: number) => void
  editInit: (res: any) => void
}

export function getTempId() {
  return String(Date.now())
}

export default function useProcessRecordStore(): ProcessRecordStore {
  const processRecordList = ref<RecordItem[]>([])

  // 增加一条记录
  function addRecord() {
    processRecordList.value.push({
      id: getTempId(),
      text: '',
      list: [],
    })
  }

  // 删除某记录内容项
  function removeRecordItem(recordIndex, itemIndex) {
    const record = processRecordList.value[recordIndex]
    const item = record.list.splice(itemIndex, 1)

    switch (item[0].type) {
      case 'picture':
        delete record.pictureItem
        break
      case 'video':
        delete record.videoItem
        break
      case 'drawing':
        delete record.drawingItem
        break
    }
  }

  return {
    processRecordList,
    addRecord,
    removeRecordItem,
    editInit(res: GetEvaluationListResult) {
      const newProcessRecordList: RecordItem[] = []
      res.lessonRecordList?.forEach((record) => {
        record.lesson_records.forEach((recordItem) => {
          const newRecordItem: RecordItem = {
            id: getTempId(),
            text: '',
            list: [],
          }
          recordItem.contents.forEach((content) => {
            switch (content.content_label_type) {
              case 'body':
                newRecordItem.text = content.content
                break
              case 'think':
                newRecordItem.list.push({
                  id: getTempId(),
                  type: 'think',
                  text: content.content,
                })
                break
              case 'picture':
                const pictureItem: RecordChildItem = {
                  id: getTempId(),
                  type: 'picture',
                  files: content.contents.map((item) => {
                    return {
                      id: item.file_id,
                      url: item.url,
                    }
                  }),
                }
                newRecordItem.list.push(pictureItem)
                newRecordItem.pictureItem = pictureItem
                break
              case 'handwriting':
                const drawingItem: RecordChildItem = {
                  id: getTempId(),
                  type: 'drawing',
                  files: content.contents.map((item) => {
                    return {
                      id: item.file_id,
                      url: item.url,
                    }
                  }),
                }
                newRecordItem.list.push(drawingItem)
                newRecordItem.drawingItem = drawingItem
                break
              case 'video':
                const videoItem: RecordChildItem = {
                  id: getTempId(),
                  type: 'video',
                  files: content.contents.map((item) => {
                    return {
                      id: item.file_id,
                      url: item.url,
                    }
                  }),
                }
                newRecordItem.list.push(videoItem)
                newRecordItem.videoItem = videoItem
                break
            }
          })

          newProcessRecordList.push(newRecordItem)
        })
      })

      processRecordList.value = newProcessRecordList

      // 默认有一条
      if (!newProcessRecordList.length) {
        addRecord()
      }
    },
  }
}

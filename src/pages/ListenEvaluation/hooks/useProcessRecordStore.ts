import type { SaveListenProcessParams } from '@/api/model/courseModel'
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { RecordItem } from '../types'

export interface ProcessRecordStore {
  processRecordList: Ref<RecordItem[]>
  addRecord: () => void
  removeRecordItem: (recordIndex: number, itemIndex: number) => void
  editInit: (res: SaveListenProcessParams) => void
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
    editInit(res: SaveListenProcessParams) {
      const newProcessRecordList: RecordItem[] = []
      res.process_list.forEach((recordItem) => {
        // record.lesson_records.forEach((recordItem) => {})

        const newRecordItem: RecordItem = {
          id: getTempId(),
          text: recordItem.title,
          list: [],
        }

        recordItem.details.forEach((detail) => {
          switch (detail.type) {
            case 1:
              newRecordItem.list.push({
                id: getTempId(),
                type: 'think',
                text: detail.val,
              })
              break
            case 2:
              let pictureItem = newRecordItem.pictureItem
              if (!pictureItem) {
                pictureItem = {
                  id: getTempId(),
                  type: 'picture',
                  files: [],
                }
                newRecordItem.list.push(pictureItem)
                newRecordItem.pictureItem = pictureItem
              }

              pictureItem.files.push({
                id: '',
                url: detail.val,
              })
              break
            // case 'handwriting':
            //   const drawingItem: RecordChildItem = {
            //     id: getTempId(),
            //     type: 'drawing',
            //     files: content.contents.map((item) => {
            //       return {
            //         id: item.file_id,
            //         url: item.url,
            //       }
            //     }),
            //   }
            //   newRecordItem.list.push(drawingItem)
            //   newRecordItem.drawingItem = drawingItem
            //   break
            case 3:
              let videoItem = newRecordItem.videoItem
              if (!videoItem) {
                videoItem = {
                  id: getTempId(),
                  type: 'video',
                  files: [],
                }
                newRecordItem.list.push(videoItem)
                newRecordItem.videoItem = videoItem
              }

              videoItem.files.push({
                id: '',
                url: detail.val,
              })
              break
          }
        })

        newProcessRecordList.push(newRecordItem)
      })

      processRecordList.value = newProcessRecordList

      // 默认有一条
      if (!newProcessRecordList.length) {
        addRecord()
      }
    },
  }
}

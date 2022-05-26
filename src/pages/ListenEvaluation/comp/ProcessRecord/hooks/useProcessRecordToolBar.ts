import type { UseToast } from '@/hooks/useToast'
import type { RecordItem, typeName } from '@/pages/ListenEvaluation/types'
import type { Ref } from 'vue'
import { inject } from 'vue'
import useAddRecord from './useAddRecord'
import type { PopoverType } from './usePopoverTool'

export default function useProcessRecordToolBar(data: Ref<RecordItem>, popoverTool: PopoverType) {
  const dataValue = data.value
  function checkPictureNumber(): boolean | void {
    if (dataValue.pictureItem) {
      if (dataValue.pictureItem.files.length >= 6) {
        toast.toastWarn('图片最多上传6张')
        return false
      }
    }
  }
  function checkVideoNumber(): boolean | void {
    if (dataValue.videoItem) {
      if (dataValue.videoItem.files.length >= 3) {
        toast.toastWarn('视频最多上传3个')
        return false
      }
    }
  }
  function checkDrawingNumber(): boolean | void {
    if (dataValue.drawingItem) {
      if (dataValue.drawingItem.files.length >= 3) {
        toast.toastWarn('手写图片最多上传3个')
        return false
      }
    }
  }

  const { addThink, addAlbum, addCamera, addVideo, addDrawing } = useAddRecord(data)
  const toast = inject('toast') as UseToast
  function onSelect(type: typeName) {
    switch (type) {
      case 'think':
        addThink()
        popoverTool.hide()
        break
      case 'camera':
        addCamera()
        break
      case 'album':
        addAlbum(checkPictureNumber, checkVideoNumber)
        break
      case 'video':
        addVideo()
        break
      case 'drawing':
        addDrawing()
        break
    }
  }
  function selectBefore(type: typeName) {
    switch (type) {
      case 'camera':
        return checkPictureNumber()

      case 'video':
        return checkVideoNumber()

      case 'drawing':
        return checkDrawingNumber()
    }
  }
  return {
    selectBefore,
    onSelect,
  }
}

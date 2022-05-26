import type { UploadResult } from '@/api/upload'
import useFileUpload from '@/hooks/useFileUpload'
import useToastInject from '@/hooks/useToastInject'
import { getTempId } from '@/pages/ListenEvaluation/hooks/useProcessRecordStore'
import type { RecordItem } from '@/pages/ListenEvaluation/types'
import Taro from '@tarojs/taro'
import type { Ref } from 'vue'
import useDrawPage from './useDrawPage'

export default function useAddRecord(data: Ref<RecordItem>) {
  const { toast, toastLoading, toastClose, toastFail } = useToastInject()
  const { fileUpload } = useFileUpload()

  const dataValue = data.value

  function fileUploadLoading(tempFilePath: string, cb: (fileInfo: UploadResult) => void) {
    toastLoading('上传开始')
    return fileUpload(tempFilePath, (res) => {
      toast.msg = `上传文件：${res.progress * 0.99}%`
    })
      .then(cb)
      .catch((e) => {
        toastFail('上传失败 ' + e)
      })
      .finally(() => {
        toastClose()
      })
  }

  const { toDrawPage } = useDrawPage((fileInfo: UploadResult) => {
    let drawingItem = dataValue.drawingItem
    if (!drawingItem) {
      drawingItem = dataValue.drawingItem = {
        id: getTempId(),
        type: 'drawing',
        files: [],
      }
      dataValue.list.push(drawingItem)
    }
    drawingItem.files.push(fileInfo)
  })

  function addThink() {
    dataValue.list.push({
      id: getTempId(),
      type: 'think',
      text: '',
    })
  }

  function addPicture(fileInfo: UploadResult) {
    let pictureItem = dataValue.pictureItem
    if (!pictureItem) {
      pictureItem = dataValue.pictureItem = {
        id: getTempId(),
        type: 'picture',
        files: [],
      }
      dataValue.list.push(pictureItem)
    }
    pictureItem.files.push(fileInfo)
  }

  function addVideoSuccess(fileInfo: UploadResult) {
    let videoItem = dataValue.videoItem
    if (!videoItem) {
      videoItem = dataValue.videoItem = {
        id: getTempId(),
        type: 'video',
        files: [],
      }
      dataValue.list.push(videoItem)
    }
    videoItem.files.push(fileInfo)
  }

  function addCamera() {
    // if (process.env.NODE_ENV !== 'production') {
    //   addPicture(
    //     'https://img13.360buyimg.com/pop/s590x470_jfs/t1/149300/24/24635/32895/62426077Ef3aad09b/783a62f49bd90b04.jpg.webp',
    //   )
    //   return
    // }
    Taro.chooseMedia({
      mediaType: ['image'],
      sourceType: ['camera'],

      success(res) {
        fileUploadLoading(res.tempFiles[0].tempFilePath, addPicture)
      },
    })
  }

  type CheckNumber = () => boolean | void
  function addAlbum(checkPictureNumber: CheckNumber, checkVideoNumber: CheckNumber) {
    function fileUploadBefore(fileType: 'image' | 'video') {
      if (fileType === 'image') {
        return checkPictureNumber()
      } else if (fileType === 'video') {
        return checkVideoNumber()
      }
    }

    Taro.chooseMedia({
      count: 6,
      mediaType: ['image', 'video'],
      sourceType: ['album'],

      async success(res) {
        const { tempFiles } = res

        for (let i = 0, len = tempFiles.length; i < len; i++) {
          const tempFile = tempFiles[i] as any as {
            fileType: 'image' | 'video'
            tempFilePath: string
          }

          if (fileUploadBefore(tempFile.fileType) === false) {
            continue
          }

          await fileUploadLoading(tempFile.tempFilePath, (fileInfo: UploadResult) => {
            console.log(tempFile.fileType)
            switch (tempFile.fileType) {
              case 'image':
                addPicture(fileInfo)
                break
              case 'video':
                addVideoSuccess(fileInfo)
                break
            }
          })
        }
      },
    })
  }
  function addVideo() {
    if (process.env.NODE_ENV !== 'production') {
      addVideoSuccess({
        id: '1',
        url: 'https://jvod.300hu.com/vod/product/017305b8-c709-4138-ae66-95467d4ce866/e3cac3724b1f4f4ba0cb402eb0d09262.mp4?source=2&h265=h265/18799/5b226fbc521d4102afc40ef977a53a17.mp4',
      })
      return
    }

    Taro.chooseMedia({
      mediaType: ['video'],
      sourceType: ['camera'],

      success(res) {
        fileUploadLoading(res.tempFiles[0].tempFilePath, addVideoSuccess)
      },
    })
  }

  function addDrawing() {
    toDrawPage()
  }

  return {
    addThink,
    addCamera,
    addDrawing,
    addAlbum,
    addVideo,
  }
}

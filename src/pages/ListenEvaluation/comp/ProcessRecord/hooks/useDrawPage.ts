import type { UploadResult } from '@/api/upload'
import Taro from '@tarojs/taro'

export default function useDrawPage(success: (imgInfo: UploadResult) => void) {
  return {
    // onDrawConfirm() {},
    // drawPopupVisible() {},
    toDrawPage() {
      Taro.navigateTo({
        url: '/pages/DrawPage/DrawPage',
        events: {
          // 接收子页面的传值
          confirm: function (imgInfo) {
            success(imgInfo)
            Taro.navigateBack()
          },
        },
        // success: function (res) {
        //   // 向子页面传值
        //   // res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test3' })
        // },
      })
    },
  }
}

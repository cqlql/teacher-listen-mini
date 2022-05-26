export default function usePage() {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] // 当前子页面
  const eventChannel = currentPage.getOpenerEventChannel()
  return {
    eventChannel,
    pageOn<T = any>(eventName: string, cb: (data: T) => void) {
      eventChannel.on?.(eventName, function (data: T) {
        cb(data)
      })
    },
  }
}

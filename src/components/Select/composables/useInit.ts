export default function useInit(cb) {
  let isInit = false
  function init() {
    if (isInit) return
    isInit = true
    return cb()
  }
  return { init }
}

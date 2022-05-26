export default function useInitOnce() {
  let isInit = false
  return async function initOnce() {
    if (isInit) return Promise.reject('已经加载过了')
    isInit = true
  }
}

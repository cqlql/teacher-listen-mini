/**
 * 节流
 * 高频执行情况，实现按指定间隔执行
 */

export default class Throttle {
  /**
   *
   * @param {boolean} immediate exec后立即callback
   */
  constructor({ callback, time = 300, immediate } = {}) {
    this.cb = callback
    this.time = time
    this.immediate = immediate
  }

  exec(cb = this.cb, time = this.time) {
    if (this.status) return
    this.status = 1

    if (this.immediate) {
      cb()
      setTimeout(() => {
        this.status = 0
      }, time)
    } else {
      setTimeout(() => {
        cb()
        this.status = 0
      }, time)
    }
  }
}

export function throttleInit(options) {
  if (typeof options === 'number') {
    options = {
      time: options,
      immediate: false,
    }
  }
  const throttle = new Throttle(options)
  return function (cb, time) {
    throttle.exec(cb, time)
  }
}

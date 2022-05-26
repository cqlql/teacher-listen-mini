/**
 * 定时器
 *
 * 需求：
 * - 可配置立即
 *
 */

export default class Timer {
  time = 1000
  private timeId: number | undefined

  constructor({ time, fn }: { time?: number; fn?: () => void } = {}) {
    if (time !== undefined) {
      this.time = time
    }
    if (fn !== undefined) {
      this.fn = fn
    }
  }

  fn() {}

  start() {
    this.stop()
    this.timeId = (setInterval as Window['setInterval'])(() => {
      this.fn()
    }, this.time)
  }
  stop() {
    clearInterval(this.timeId)
  }
}

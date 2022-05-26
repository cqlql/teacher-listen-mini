// 计时
export default class Timing {
  stopId?: number
  constructor() {
    // this.stopId = undefined;
  }
  // 顺计时，默认0起始
  start(update, second = 0) {
    this.stop() // 开始前结束，避免开启2次

    // let time = 0
    this.stopId = (setInterval as Window['setInterval'])(() => {
      second++
      update(second) === false && this.stop()
    }, 1000)
    update(second) === false && this.stop()
  }
  stop() {
    if (this.stopId) clearInterval(this.stopId)
  }
  // 倒计时
  timeDown(update, finish, secondTotal) {
    this.start((s) => {
      const v = secondTotal - s
      update(v)
      if (!v) {
        this.stop()
        finish()
      }
    })
  }
}

export default class TimeRecord {
  start() {
    if (this.time) return
    this.time = Date.now()
  }

  end() {
    const time = Date.now() - this.time
    this.time = null
    return time + 'ms'
  }
}

export default class OnceCallback {
  cb: () => void
  isExecuted = false
  constructor(cb: () => void) {
    this.cb = cb
  }

  execute() {
    if (this.isExecuted) return
    this.isExecuted = true
    this.cb()
  }

  clear() {
    this.isExecuted = false
  }
}

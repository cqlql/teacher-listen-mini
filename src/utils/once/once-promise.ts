type Result = any

type PromiseFnType = () => Promise<any>

export default class OncePromise {
  cache: any | null = null
  success = false
  loading = false
  resolveFn = (_value: any) => {}
  rejectFn = (_error: any) => {}
  promiseFn: PromiseFnType
  constructor(promiseFn: PromiseFnType) {
    this.promiseFn = promiseFn
  }
  execute() {
    if (this.success) {
      return Promise.resolve(this.cache)
    }

    const setPromise = () => {
      return new Promise((resolve, reject) => {
        this.resolveFn = resolve
        this.rejectFn = reject
      })
    }

    if (this.loading) {
      this.rejectFn('新的调用已产生')
      return setPromise()
    }
    this.loading = true
    this.promiseFn()
      .then((result: Result) => {
        this.success = true
        this.cache = result
        this.resolveFn(result)
        return result
      })
      .catch((error: any) => {
        this.rejectFn(error)
      })
      .finally(() => {
        this.loading = false
      })

    return setPromise()
  }

  clear() {
    this.cache = null
    this.success = false
    this.loading = false
  }
}

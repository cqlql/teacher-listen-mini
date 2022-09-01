type CbFn = (item: any, key: string) => void | boolean

export default function eachObj(obj: any, cb: CbFn) {
  for (let k in obj) {
    if (obj.hasOwnProperty(k) && cb(obj[k], k) === false) break
  }
}

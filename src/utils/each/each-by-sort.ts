import eachObj from './each-obj'

export default function eachBySort(
  obj: any,
  cb: (value: any, key: string) => void | false,
  keySort: string[],
) {
  const keySortMap = keySort.reduce<Record<string, string>>((acc, v) => {
    acc[v] = v
    return acc
  }, {})

  keySort.some((key) => {
    if (key in obj) {
      return cb(obj[key], key) === false
    }
  })

  eachObj(obj, (item, key) => {
    if (keySortMap[key]) {
      return
    }

    return cb(item, key)
  })
}

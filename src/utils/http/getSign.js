import md5 from 'crypto-js/md5'

//获取签名
export default function getSign(data, token) {
  // const token = ''

  function dataSort(obj) {
    if (obj instanceof Array) {
      return obj.map((currObj) => {
        return dataSort(currObj)
      })
    }
    if (obj instanceof Object) {
      return objSort(obj)
    }
    return obj
  }

  function objSort(obj) {
    const newObj = {}
    Object.keys(obj)
      .sort((a, b) => a.localeCompare(b))
      .forEach(function (key) {
        newObj[key] = dataSort(obj[key])
      })
    return newObj
  }

  let sortedData = dataSort(data)

  let dataStr = ''
  if (sortedData !== undefined) {
    dataStr = JSON.stringify(sortedData)
  }

  return md5(dataStr + ')(4AzEdr5J6a`@#$*%' + token).toString()
}

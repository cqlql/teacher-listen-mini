import md5 from 'crypto-js/md5'

//获取签名

export default function getSign(obj, token) {
  // const token = ''
  // 递归排序
  function sort(obj) {
    if (obj instanceof Array) {
      //如果数组里面存放的为对象,通过map更改数组结构，排序
      obj = obj.map((ele) => {
        if (ele instanceof Object) {
          const newObj = {}
          Object.keys(ele)
            .sort()
            .forEach(function (key) {
              let o = ele[key]
              if (o instanceof Object) {
                o = sort(o)
              }
              newObj[key] = o
            })
          ele = newObj
        }
        return ele
      })
      return obj
    }

    const newObj = {}
    //默认情况下，对字符串排序，是按照ASCII的大小比较的，排序忽略大小写按照字母序排序。
    Object.keys(obj)
      .sort()
      .forEach(function (key) {
        let o = obj[key]
        if (o instanceof Object) {
          o = sort(o)
        }
        newObj[key] = o
      })
    return newObj
  }

  let dataStr = ''
  if (obj !== undefined) {
    dataStr = JSON.stringify(sort(obj))
  }

  return md5(dataStr + ')(4AzEdr5J6a`@#$*%' + token).toString()
}

import md5 from 'crypto-js/md5'

//获取签名

export default function getSign(obj = {}, token) {
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
      .sort((s1, s2) => {
        const x1 = s1.toUpperCase()
        const x2 = s2.toUpperCase()
        if (x1 < x2) {
          return -1
        }
        if (x1 > x2) {
          return 1
        }
        return 0
      })
      .forEach(function (key) {
        let o = obj[key]
        if (o instanceof Object) {
          o = sort(o)
        }
        newObj[key] = o
      })
    return newObj
  }

  const sign_data = {
    Data: obj,
    Global: { IMEI: '', IMSI: '', IP: '', OS: 3, Sign: '', Token: token },
  }

  return {
    Data: obj,
    Global: {
      //设备唯一码
      IMEI: '',
      //国际移动用户识别码
      IMSI: '',
      IP: '',
      //1:安卓、2:IOS、3:小程序
      OS: 3,
      //当前token
      Token: token,
      Sign: md5(JSON.stringify(sort(sign_data)) + ')(4AzEdr5J6a`@#$*%').toString(),
    },
  }
}
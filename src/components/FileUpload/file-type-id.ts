export default function fileTypeId(filePath: string) {
  // 返回String对象中子字符串最后出现的位置.
  const seat = filePath.lastIndexOf('.')
  // 返回位于String对象中指定位置的子字符串并转换为小写.
  const extension = filePath.substring(seat).toLowerCase()

  const imagAllowed = ['.jpg', '.gif', '.png', '.jpeg']
  for (let i = 0; i < imagAllowed.length; i++) {
    if (imagAllowed[i] === extension) {
      return '41'
    }
  }

  const documentAllowed = [
    '.txt',
    '.doc',
    '.docx',
    '.xls',
    '.xlsx',
    '.pdf',
    '.ppt',
    '.pptx',
    '.rar',
    '.zip',
  ]
  for (let i = 0; i < documentAllowed.length; i++) {
    if (documentAllowed[i] === extension) {
      return '31'
    }
  }

  const videoAllowed = [
    '.flv',
    '.3gp',
    '.avi',
    '.rmvb',
    '.rm',
    '.divx',
    '.mpg',
    '.mpeg',
    '.mpe',
    '.wmv',
    '.mp4',
    '.mkv',
    '.vob',
  ]
  for (let i = 0; i < videoAllowed.length; i++) {
    if (videoAllowed[i] === extension) {
      return '11'
    }
  }

  const soundAllowed = ['.cd', '.ogg', '.mp3', '.asf', '.wma', '.wav', '.mp3pro', '.midi', '.vqf']
  for (let i = 0; i < soundAllowed.length; i++) {
    if (soundAllowed[i] === extension) {
      return '21'
    }
  }
  return '51'
}

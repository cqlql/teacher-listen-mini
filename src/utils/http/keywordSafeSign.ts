export default function keywordSafeSign(keyword: string) {
  keyword = keyword && keyword.trim()
  if (keyword) {
    const keywordNumber = Number(keyword)

    return isNaN(keywordNumber) ? keyword : keywordNumber
  }

  return ''
}

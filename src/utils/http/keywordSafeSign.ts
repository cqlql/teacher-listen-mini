export default function keywordSafeSign(keyword: string) {
  if (keyword) {
    const keywordNumber = Number(keyword)

    return isNaN(keywordNumber) ? keyword : keywordNumber
  }

  return ''
}

export default function keywordSafeSign(keyword: string) {
  const keywordNumber = Number(keyword)

  return isNaN(keywordNumber) ? keyword : keywordNumber
}

import createSearchRegexp from './create-search-regexp'

export default function testKeyword(keyword: string, content: string) {
  const reg = createSearchRegexp(keyword)

  return reg.test(content)
}

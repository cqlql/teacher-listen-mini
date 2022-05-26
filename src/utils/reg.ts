// 正则表达式相关

// 转义正则表达式特殊字符
export function escapeRegChar(str: string) {
  return str.replace(
    /[\x5E\x24\x2A\x2B\x3F\x2E\x28\x29\x3A\x3D\x21\x7C\x7B\x7D\x2C\x5C\x5B\x5D]/g,
    '\\$&',
  )
}

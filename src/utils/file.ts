export function getFileNameByPath(path: string) {
  return path.match(/[^/]+$/)?.[0] || 'file'
}

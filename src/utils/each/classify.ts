/**
 * 列表分类
 * 根据指定字段的相同值进行分类，返回此字段值作为key的对象
 * @param list
 * @param key
 * @param cb
 * @param cbItem
 * @returns 返回一个对象，字段值作为 key, 值就是某一类的列表
 */

export default function classify<ItemType>(
  list: ItemType[],
  key: keyof ItemType,
  cb: (item: ItemType) => any,
  cbItem: (item: ItemType) => any,
) {
  const record: Record<string, any> = {}
  list.forEach((item) => {
    const id = item[key] as unknown as string
    let recordItem = record[id]
    if (!recordItem) {
      recordItem = record[id] = cb(item)
    }
    recordItem.push(cbItem(item))
  })
  return record
}

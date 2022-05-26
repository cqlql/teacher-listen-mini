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

## classify 分类

```ts
interface LessonScoreItem {
  dimension_id: string //主维度ID
  dimension_name: string //主维度
  dimension_item_id: string //维度子项 ，0 时为主维度ID
}

const scoreList = [
  {
    dimension_id: '593',
    dimension_name: '学生学习',
    dimension_item_id: '2223',
  },
  {
    dimension_id: '593',
    dimension_name: '学生学习',
    dimension_item_id: '2224',
  },
  {
    dimension_id: '593',
    dimension_name: '学生学习',
    dimension_item_id: '2226',
  },
  {
    dimension_id: '595',
    dimension_name: '课程性质',
    dimension_item_id: '2234',
  },
  {
    dimension_id: '596',
    dimension_name: '课堂文化',
    dimension_item_id: '2239',
  },
]

type PointList = {
  name: string
  children: {
    type: string
    name: string
  }[]
}[]

let data: Record<string, LessonScoreItem> = classify<LessonScoreItem>(
  // 原列表
  scoreList,
  // 要分类的字段名
  'dimension_id',
  // 容器
  (item) => {
    let children = []
    newList.push({
      name: item.dimension_name,
      children,
    })
    return children
  },
  // 容器项
  (item) => {
    return {
      type: '',
      name: item.dimension_item_id,
    }
  },
)
```

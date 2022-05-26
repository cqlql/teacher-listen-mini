## classify 分类

```ts
interface LessonScoreItem {
  dimension_id: string //主维度ID
  dimension_name: string //主维度
  dimension_item_id: string //维度子项 ，0 时为主维度ID
  score: string //打分，dimensionitemId = 0，记录平均分
}

const scoreList = [
  {
    dimension_id: '593',
    dimension_name: '学生学习',
    score: '25',
    sii: null,
    weight: '25',
    mun: '0',
    dimension_item_id: '2223',
  },
  {
    dimension_id: '593',
    dimension_name: '学生学习',
    score: '25',
    sii: null,
    weight: '25',
    mun: '0',
    dimension_item_id: '2224',
  },
  {
    dimension_id: '593',
    dimension_name: '学生学习',
    score: '25',
    sii: null,
    weight: '25',
    mun: '0',
    dimension_item_id: '2226',
  },
  {
    dimension_id: '593',
    dimension_name: '学生学习',
    score: '25',
    sii: null,
    weight: '25',
    mun: '0',
    dimension_item_id: '2222',
  },
  {
    dimension_id: '593',
    dimension_name: '学生学习',
    score: '25',
    sii: null,
    weight: '25',
    mun: '0',
    dimension_item_id: '2225',
  },
  {
    dimension_id: '595',
    dimension_name: '课程性质',
    score: '25',
    sii: null,
    weight: '25',
    mun: '0',
    dimension_item_id: '2234',
  },
  {
    dimension_id: '596',
    dimension_name: '课堂文化',
    score: '25',
    sii: null,
    weight: '25',
    mun: '0',
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

let newList: PointList = []

classify<LessonScoreItem>(
  scoreList,
  'dimension_id',
  (item) => {
    let children = []
    newList.push({
      name: item.dimension_name,
      children,
    })
    return children
  },
  (item) => {
    return {
      type: '',
      name: item.dimension_item_id,
    }
  },
)
```

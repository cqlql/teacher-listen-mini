export default function getCourseTypeMap() {
  return {
    0: {
      type: 'open',
      label: '公开课',
    },
    1: {
      type: 'inside',
      label: '校内课',
    },
    2: {
      type: 'outside',
      label: '校外课',
    },
  }
}

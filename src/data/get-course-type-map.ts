export default function getCourseTypeMap() {
  return {
    0: {
      type: 'success',
      label: '公开课',
    },
    1: {
      type: 'warning',
      label: '校内课',
    },
    2: {
      type: 'info',
      label: '校外课',
    },
  }
}

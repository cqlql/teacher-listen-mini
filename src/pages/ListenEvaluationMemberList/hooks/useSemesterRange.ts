import type { SemesterRangeOption } from '@/pages/ListenEvaluationRecord/types'

export default function useSemesterRange(): SemesterRangeOption[] {
  return [
    {
      label: '本学期',
      value: '3',
      start: '',
      end: '',
    },
    {
      label: '本月',
      value: '2',
      start: '',
      end: '',
    },
    {
      label: '本周',
      value: '1',
      start: '',
      end: '',
    },
  ]
}

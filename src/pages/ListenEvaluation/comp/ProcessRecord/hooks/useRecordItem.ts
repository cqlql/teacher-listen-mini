import type { UnwrapRef } from 'vue'
import { inject, ref, watch } from 'vue'
import type { ProcessRecordStore } from '../../../hooks/useProcessRecordStore'

interface RecordProps {
  recordIndex: number
  index: number
}

export default function useRecordItem<T = any>(props: RecordProps, initValue: T) {
  const { processRecordList, removeRecordItem } = inject('processRecordStore') as ProcessRecordStore
  const recordItem = ref<T>(initValue)
  watch(
    [() => props.recordIndex, () => props.index],
    () => {
      recordItem.value = processRecordList.value[props.recordIndex].list[
        props.index
      ] as unknown as UnwrapRef<T>
    },
    {
      immediate: true,
    },
  )

  return {
    recordItem,
    removeRecordItem() {
      removeRecordItem(props.recordIndex, props.index)
    },
  }
}

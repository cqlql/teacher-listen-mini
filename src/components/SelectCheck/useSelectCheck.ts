import { computed, ref, watch } from 'vue'
import type { EmitType, PropsType } from './types'

export default function useSelectCheck(props: PropsType, emit: EmitType) {
  const selectedName = ref('')
  const selectedId = ref<string>('')
  function close() {
    updateVisible(false)
  }
  function updateVisible(v: boolean) {
    emit('update:visible', v)
  }

  watch(
    () => props.modelValue,
    (v) => {
      selectedId.value = v || ''
    },
    {
      immediate: true,
    },
  )

  const idRecord = computed(() => {
    const idRecord = {}
    const { idProp } = props

    props.options.forEach((item) => {
      idRecord[item[idProp]] = item
    })
    return idRecord
  })

  // const nameFinal = computed(() => {
  //   // let { modelValue, name } = props

  //   // return modelValue === '' || modelValue === undefined ? '' : selectedName.value || name
  //   console.log(idRecord.value[props.modelValue]?.[props.nameProp])
  //   if (props.modelValue) {
  //     return idRecord.value[props.modelValue]?.[props.nameProp]
  //   }
  //   return ''
  // })

  function getLabel(id: string) {
    if (id) {
      return idRecord.value[id]?.[props.nameProp]
    }
    return ''
  }

  return {
    close,
    confirm() {
      const id = selectedId.value
      if (props.modelValue !== id) {
        emit('update:modelValue', id)
        emit('update:label', getLabel(id))
        emit('change', id)
      }
      emit('confirm', id)
      close()
    },

    selectedName,
    select(id) {
      selectedId.value = id
    },
    selectedId,
    updateVisible,
  }
}

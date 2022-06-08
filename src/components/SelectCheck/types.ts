type OptionType = {
  [key: string]: string
}

export interface PropsType {
  visible: boolean
  modelValue?: string
  options: OptionType[] | []
  idProp: string
  nameProp: string
  loading?: boolean

  popTitle?: string
  placeholder?: string
}

export interface EmitType {
  (e: 'update:modelValue', id: string): void
  (e: 'update:label', name: string): void
  (e: 'change', id: string): void
  (e: 'confirm', id: string): void
  (e: 'update:visible', visible: boolean): void
}

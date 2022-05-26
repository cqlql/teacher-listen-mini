export interface EventChange {
  detail: { value: number[] }
}
export interface EventColumnchange {
  detail: {
    column: number
    value: number
  }
}
export interface OptionType {
  id: number | string
  name: string
  children?: OptionType[]
}
// export interface OptionType {
//   id: string
//   name: string
//   children?: OptionType[]
// }

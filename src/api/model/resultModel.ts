interface ResultTypeV3 {
  code: '200' | '500'
  data: any
  message: string
  success: boolean
}

interface ResultTypeV2 {
  Basis: { Code: number; Msg: string }
  Result: any
}

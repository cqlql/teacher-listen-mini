import type picker from './picker.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    // 微信 picker 组件，否则会有类型错误提示
    picker: typeof picker
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const Component: DefineComponent<{}, {}, any>
  export default Component
}

declare module '*.svg' {
  const content: any
  export default content
}
declare module '*.png' {
  const content: any
  export default content
}

// declare module 'moment/dist/locale/*' {
//   import { LocaleSpecification } from 'moment';
//   const locale: LocaleSpecification & ReadonlyRecordable;
//   export default locale;
// }

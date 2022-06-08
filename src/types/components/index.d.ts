import type { TabPane } from '@nutui/nutui-taro'
import type picker from './picker.vue'
import type Empty from '@/components/Empty/Empty.vue'
// import type { ScrollView } from '@tarojs/components'
import type { ScrollView } from '@tarojs/components'
import type { Navigator } from '@tarojs/components'

// import { navigator } from '@tarojs/taro'

import type NutPopup from './NutPopup.vue'

declare module 'vue' {
  export interface GlobalComponents {
    // 微信 picker 组件，否则会有类型错误提示
    picker: typeof picker

    VEmpty: typeof Empty

    Navigator: typeof Navigator
    ScrollView: typeof ScrollView

    NutTabpane: typeof TabPane
  }
}

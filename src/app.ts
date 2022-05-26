import { createApp } from 'vue'

import '@nutui/nutui-taro/dist/styles/themes/default.scss'
import '@/styles/nutui-reset.scss'
import '@/styles//app.scss'
import '@/styles/iconfont.css'
import './dayjsInit.ts'
import registerGlobComp from './registerGlobComp' // 注册组件为全局

// import { hasLogin } from './utils/auth';

const App = createApp({
  // onShow(/* options */) {
  //   if (!hasLogin()) {
  //     Taro.navigateTo({
  //       url: '/pages/login/index',
  //     });
  //   }
  // },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(registerGlobComp)

export default App

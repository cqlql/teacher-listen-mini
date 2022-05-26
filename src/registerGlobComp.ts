import type { App, Plugin } from 'vue'
// import { h } from 'vue';
// 全局组件
import {
  Button,
  Toast,
  Icon,
  Layout,
  Row,
  Col,
  Cell,
  CellGroup,
  Avatar,
  Checkbox,
  Switch,
  Input,
  Popup,
  Elevator,
  Tag,
  Dialog,
  Tabs,
  TabPane,
  Menu,
  MenuItem,
} from '@nutui/nutui-taro'

import VEmpty from '@/components/Empty/Empty.vue'

// // 全局指令
// import loading from '@/components/Loading/loading-directive.js'

function registerNutComp(app: App) {
  app
    .use(Button)
    .use(Toast)
    .use(Icon)
    .use(Layout)
    .use(Row)
    .use(Col)
    .use(Cell)
    .use(CellGroup)
    .use(Avatar)
    .use(Checkbox)
    .use(Switch)
    .use(Input)
    .use(Popup)
    .use(Elevator)
    .use(Tag)
    .use(Dialog)
    .use(Tabs)
    .use(TabPane)
    .use(Menu)
    .use(MenuItem)
}

function registerComp(app: App) {
  app.component('VEmpty', VEmpty)
}

const globalRegister: Plugin = {
  install: (app: App) => {
    registerNutComp(app)
    registerComp(app)
  },
}

export default globalRegister

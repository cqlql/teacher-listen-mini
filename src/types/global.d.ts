declare interface ToastOptions {
  msg: string
  show: boolean
  type: 'text' | 'success' | 'fail' | 'warn' | 'loading'
  cover?: boolean
  /**
   * 展示时长（毫秒）
   * 值为 0 时，toast 不会自动消失（loading类型默认为0，其他类型默认 2000）
   */
  duration?: number
}

declare namespace NodeJS {
  interface Process {
    env: {
      NODE_ENV: 'production' | 'development'
    }
  }
}

// 扩展 Taro 缺失的类型
declare namespace Taro {
  interface TaroStatic {
    getWindowInfo: () => {
      windowWidth: number
      windowHeight: number
    }
  }
}

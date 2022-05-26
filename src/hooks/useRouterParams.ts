import { getCurrentInstance } from '@tarojs/taro'

export default function useRouterParams<T>() {
  return getCurrentInstance().router?.params as T
}

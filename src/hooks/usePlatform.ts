import { ref } from 'vue'
// const isIos = ref(false);
import Taro from '@tarojs/taro'

// export default function () {
//   const isIos = ref(false);
//   Taro.getSystemInfo({
//     success: function (res) {
//       isIos.value = res.platform === 'ios';
//     },
//   });
//   return {
//     isIos,
//   };
// }

export const isIos = ref(false)

Taro.getSystemInfo({
  success: function (res) {
    isIos.value = res.platform === 'ios'
  },
})

import type { Campus } from '@/api/login'
import { login } from '@/api/login'
import type { UseToast } from '@/hooks/useToast'
import { setStorage } from '@/utils/storage'
import Taro from '@tarojs/taro'
import type { Ref } from 'vue'
import { ref } from 'vue'

export default function useLogin(
  selectedCampus: Ref<Campus>,
  toastFail: UseToast['toastFail'],
  // toastSuccess: (msg: string) => void,
) {
  const wkno = ref('')
  const password = ref('')
  return {
    wkno,
    password,
    async login() {
      const campusId = selectedCampus.value.campus_id_str
      const result = await login(
        {
          campus_id_str: campusId,
          no: wkno.value,
          password: password.value,
          role: 2,
        },
        {
          fail(e) {
            toastFail(e)
          },
        },
      )
      setStorage('token', result.token)
      setStorage('userId', result.uid)
      setStorage('campusId', campusId)
      Taro.switchTab({
        url: '/pages/index/HomePage',
      })
    },
  }
}

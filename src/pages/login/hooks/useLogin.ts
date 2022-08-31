import type { Campus } from '@/api/login'
import { login } from '@/api/login'
import type { UserDataType } from '@/utils/auth/token-parse'
import { tokenParse } from '@/utils/auth/token-parse'
// import type { UseToast } from '@/hooks/useToast'
import { setStorage } from '@/utils/storage'
import Taro from '@tarojs/taro'
import type { Ref } from 'vue'
import { ref } from 'vue'

export default function useLogin(
  selectedCampus: Ref<Campus>,
  // toastFail: UseToast['toastFail'],
  // toastSuccess: (msg: string) => void,
) {
  const wkno = ref('')
  const password = ref('')
  return {
    wkno,
    password,
    async login() {
      const campusId = selectedCampus.value.id
      const result = await login(
        {
          campusId: campusId,
          schoolId: selectedCampus.value.school_id,
          loginName: wkno.value,
          pwd: password.value,
        },
        // {
        //   fail(e) {
        //     toastFail(e)
        //   },
        // },
      )

      setStorage('token', result.accessToken)
      setStorage('refreshToken', result.refreshtoken)
      setStorage('roleCodes', tokenParse<UserDataType>(result.accessToken).role_codes)

      // setStorage('userId', result.uid)
      setStorage('campusId', campusId)
      Taro.switchTab({
        url: '/pages/index/HomePage',
      })
    },
  }
}

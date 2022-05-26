<template>
  <div class="auth-page">
    {{ msg }}
    <nut-toast v-bind="toast" v-model:visible="toast.show" />
  </div>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro'
import useToast from '@/hooks/useToast'

import { getStorage } from '@/utils/storage'
import { ref } from 'vue'
let { toast } = useToast()

const msg = ref('')
function toHomePage() {
  Taro.switchTab({
    url: '/pages/index/HomePage',
  })
}

function toLoginPage() {
  Taro.redirectTo({
    url: '/pages/login/index',
  })
}

if (getStorage('token')) {
  toHomePage()
} else {
  toLoginPage()
}
</script>

<style lang="scss">
.auth-page {
  padding: 60px 0;
  text-align: center;
  color: $color-red;
  font-size: 20px;
}
</style>

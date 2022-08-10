<template>
  <div class="login-page">
    <div class="logo">
      <img :src="logoSrc" />
    </div>
    <div class="cell" @click="popCampus">
      <div class="icon">
        <nut-icon font-class-name="iconfont" class-prefix="icon" name="building" />
      </div>
      <div class="cont">
        <span v-if="selectedCampus.id">
          {{ selectedCampus.school_name }} {{ selectedCampus.name }}
        </span>
        <span class="l-placeholder" v-else> 请选择学校 </span>
      </div>
      <div class="arrows">
        <nut-icon name="right" size="12" />
      </div>
    </div>

    <div class="cell">
      <div class="icon">
        <nut-icon font-class-name="iconfont" class-prefix="icon" name="user" />
      </div>
      <div class="cont">
        <input type="text" placeholder="请输入工号" v-model="wkno" />
      </div>
      <div class="arrows">
        <!-- <nut-icon name="right" size="12" /> -->
      </div>
    </div>
    <div class="cell">
      <div class="icon">
        <nut-icon font-class-name="iconfont" class-prefix="icon" name="pwd" />
      </div>
      <div class="cont">
        <input type="password" placeholder="请输入密码" v-model="password" />
      </div>
      <div class="arrows">
        <!-- <nut-icon name="arrow-right" size="12" /> -->
      </div>
    </div>
    <div class="footer-btn">
      <nut-button type="primary" @click="login" block>登录</nut-button>
    </div>

    <CampusSelectorPopup
      v-model:visible="popupVisible"
      v-model:value="selectedCampus"
    ></CampusSelectorPopup>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LoginIndex',
}
</script>

<script lang="ts" setup>
import useSelectCampus from './hooks/useSelectCampus'
import useLogin from './hooks/useLogin'
import logoSrc from '@/static/img/logo.png'
import CampusSelectorPopup from './comps/CampusSelectorPopup.vue'

let { selectedCampus, popCampus, popupVisible } = useSelectCampus()

let { wkno, password, login } = useLogin(selectedCampus)

if (process.env.NODE_ENV !== 'production') {
  selectedCampus.value = {
    name: '主校区',
    school_id: 0,
    school_name: '深圳市南山区西丽小学',
    id: 0,
  }
  wkno.value = 'xlx-zhongailan'
  // wkno.value = 't001';

  selectedCampus.value = {
    name: '主校区',
    school_id: 0,
    school_name: '深圳市龙岗区扬美实验学校',
    id: 0,
  }
  // wkno.value = 'ym001' // 校长
  // wkno.value = 'ym115' // 语文科组长
  wkno.value = 'admin' // 语文科组长

  password.value = '111111'
}
</script>

<style lang="scss">
.login-page {
  padding: 50px 26px;
  // text-align: center;

  .logo {
    text-align: center;
    padding: 20px 0 50px;

    img {
      width: 93px;
      height: 92px;
    }
  }

  // .nut-icon {
  //   // border: 1px solid red;
  // }

  .cell {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #eee;

    // input {
    //   // border: 1px solid #ddd;
    //   // height: 24px;
    //   // line-height: 24px;
    // }

    .icon {
      width: 30px;
      // border: 1px solid red;
      display: inline-flex;
      align-items: center;
      color: #8ab7fd;
    }

    .cont {
      flex: 1;
      // display: inline-flex;
      // align-items: center;
      // border: 1px solid red;
      // height: 24px;
      // line-height: 24px;
    }

    .arrows {
      // border: 1px solid red;
      display: inline-flex;
      align-items: center;
      color: #ddd;
      // font-size: 12px;
    }
  }

  .footer-btn {
    padding-top: 30px;
    text-align: center;
  }

  .l-placeholder {
    color: $gray-7;
  }
}
</style>

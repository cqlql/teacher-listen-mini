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
        <span v-if="selectedCampus.campus_id_str">
          {{ selectedCampus.school_name }} {{ selectedCampus.campus_name }}
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
    <nut-toast v-bind="toast" v-model:visible="toast.show" />

    <nut-popup
      position="right"
      pop-class="campus-select-popup"
      v-model:visible="popupVisible"
      :style="{ height: '100%', width: '80%' }"
    >
      <div class="campus-list">
        <SearchBar v-model="searchValue" placeholder="学校名称" @change="onInput" />
        <scroll-view class="campus-list_contain" :scroll-y="true">
          <ul v-if="campusList">
            <li v-for="campus of campusList" :key="campus.campus_id_str" @click="onSelect(campus)">
              {{ campus.school_name }} {{ campus.campus_name }}
            </li>
          </ul>
          <div v-else class="campus-list_contain-none">没有相关学校</div>
        </scroll-view>
      </div>
    </nut-popup>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LoginIndex',
}
</script>

<script lang="ts" setup>
import { SearchBar } from '@nutui/nutui-taro'
import useToast from '@/hooks/useToast'
import useSelectCampus from './composables/useSelectCampus'
import useLogin from './composables/useLogin'
import logoSrc from '@/static/img/logo.png'

let { toast, toastFail } = useToast()

let { selectedCampus, popCampus, popupVisible, searchValue, campusList, onInput, onSelect } =
  useSelectCampus()

let { wkno, password, login } = useLogin(selectedCampus, toastFail)

if (process.env.NODE_ENV !== 'production') {
  selectedCampus.value = {
    campus_name: '主校区',
    school_name: '深圳市南山区西丽小学',
    campus_id_str: '4892271197889314468',
  }
  wkno.value = 'xlx-zhongailan'
  // wkno.value = 't001';

  selectedCampus.value = {
    campus_name: '主校区',
    school_name: '深圳市龙岗区扬美实验学校',
    campus_id_str: '4667067775646393604',
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

.campus-select-popup {
  & > .h5-div {
    height: 100%;
  }
}

.campus-list {
  position: relative;
  height: 100%;

  li:first-child {
    border-top: 1px solid $gray-5;
  }

  li {
    border-bottom: 1px solid $gray-5;
    padding: 10px;
  }
}

.campus-list_contain {
  // overflow: auth;
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
}

.campus-list_contain-none {
  text-align: center;
  padding: 10px;
}
</style>

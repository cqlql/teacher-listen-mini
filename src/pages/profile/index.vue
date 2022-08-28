<template>
  <div>
    <div class="profilePage__top">
      <div class="top-row">
        <nut-avatar size="large" :icon="userInfo.avatar || avatarDefault" />

        <div class="r">
          <div class="name">{{ userInfo.name }}</div>
          <div class="info">
            <div>工号：</div>
            <div>{{ userInfo.teacher_code }}</div>
          </div>
          <div class="info">
            <div>学校：</div>
            <div>{{ userInfo.school }}</div>
          </div>
          <div class="info">
            <div class="label">科组：</div>
            <div class="values">
              <nut-tag plain type="primary" v-for="(v, i) of subjectGroups" :key="i">{{
                v
              }}</nut-tag>
            </div>
          </div>
        </div>
      </div>
    </div>

    <nut-cell-group>
      <nut-cell
        title="我的评课统计"
        is-link
        @click="to('/packageECharts/pages/EvaluationStatistics/MyEvaluationStatistics')"
      ></nut-cell>
      <!-- <template v-if="userRole === '1'"> -->
      <nut-cell
        title="科组评课统计"
        is-link
        @click="to('/packageECharts/pages/EvaluationStatistics/DepartmentEvaluationStatistics')"
      ></nut-cell>
      <nut-cell
        title="科组听评课记录"
        is-link
        @click="to('/pages/ListenEvaluationMemberList/SubjectGroupMemberList')"
      ></nut-cell>
      <!-- </template> -->
      <!-- <template v-if="userRole === '2'"> -->
      <nut-cell
        title="全校评课统计"
        is-link
        @click="to('/packageECharts/pages/EvaluationStatistics/AllEvaluationStatistics')"
      ></nut-cell>
      <nut-cell
        title="全校听评课记录"
        is-link
        @click="to('/pages/ListenEvaluationMemberList/AllMemberList')"
      ></nut-cell>
      <!-- </template> -->
    </nut-cell-group>

    <nut-cell-group>
      <nut-cell
        title="钉钉听评课记录"
        is-link
        @click="to('/pages/DingEvaluationRecord/DingEvaluationRecord')"
      ></nut-cell>
    </nut-cell-group>

    <div class="profilePage__bottom">
      <ButtonBlock @click="logout">退出登录</ButtonBlock>
      <!-- <nut-button type="primary" @click="logout">退出登录</nut-button> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { getRoleType, /*  profile, */ userSubjectGroups } from '@/api/user'
import { getStorage, removeStorage } from '@/utils/storage'
import Taro from '@tarojs/taro'
import { onMounted, reactive, ref } from 'vue'
import avatarDefault from '@/static/img/avatar.png'
import ButtonBlock from '@/components/Button/ButtonBlock.vue'
import base64url from 'base64url'
const userInfo = reactive({
  avatar: '',
  name: '',
  teacher_code: '',
  school: '',
})

const userRole = ref('-1')

const subjectGroups = ref<string[]>([])

initUserInfoByToken()

onMounted(() => {
  // profile().then((res) => {
  //   let { teacherInfo } = res
  //   userInfo.avatar = teacherInfo.avatar_url
  //   userInfo.name = teacherInfo.name
  //   userInfo.teacher_code = teacherInfo.teacher_code
  //   userInfo.school = teacherInfo.school_name
  // })
  // userSubjectGroups().then((res) => {
  //   subjectGroups.value = res.subject_groups.map((group) => {
  //     return group.subject_group_name
  //   })
  // })
})

// getRoleType().then((res) => {
//   userRole.value = res.role[0]?.role_type || '-1'
// })

function logout() {
  removeStorage('openid')
  removeStorage('token')
  Taro.reLaunch({
    url: '/pages/login/index',
  })
}

function to(url) {
  Taro.navigateTo({
    url,
  })
}

function initUserInfoByToken() {
  let token = getStorage('token')
  if (token) {
    let infoStr = token.split('.')[1]
    let userData: {
      // aud: "http://lecture.api.shendu.com"
      campus_name: string //"主校区"
      // exp: 1660232677
      // http://schemas.microsoft.com/ws/2008/06/identity/claims/role: "TingAPIRole"
      id: string // '7842'
      // iss: "http://lecture.api.shendu.com"
      login_name: string // "ym001"
      mobile: string
      name: string //"陈理"
      // nbf: 1660232077
      roles: string
      school_name: string //"深圳市龙岗区扬美实验学校"
    } = JSON.parse(base64url.decode(infoStr))

    userInfo.name = userData.name
    console.log('🚀 -- initUserInfoByToken -- userData', userData)
    userInfo.teacher_code = userData.login_name
    userInfo.school = userData.school_name

    subjectGroups.value = userData.roles.split(',')
  }
}
</script>

<style lang="scss">
page {
  background-color: $page-bc;
}

.profilePage__top {
  background-color: #fff;
  padding: 10px;
  padding-left: 20px;
  .top-row {
    display: inline-flex;
    // align-items: center;
  }
  .nut-avatar {
    margin-top: 5px;
  }
  .r {
    margin-left: 20px;
  }
  .name {
    font-size: 18px;
    color: #000;
    padding-bottom: 2px;
  }
  .info {
    padding: 2px 0;
    display: flex;
  }

  .values {
    gap: 5px;
    display: inline-flex;
  }
}

.profilePage__bottom {
  margin: 20px;
  margin-top: 80px;
  text-align: center;
}
</style>

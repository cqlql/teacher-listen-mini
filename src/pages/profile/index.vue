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
      <nut-cell
        title="科组评课统计"
        is-link
        @click="to('/packageECharts/pages/EvaluationStatistics/DepartmentEvaluationStatistics')"
      ></nut-cell>
      <nut-cell
        title="科组听评课记录"
        is-link
        @click="to('/packageECharts/pages/EvaluationStatistics/EvaluationStatistics')"
      ></nut-cell>
      <nut-cell
        title="全校评课统计"
        is-link
        @click="to('/packageECharts/pages/EvaluationStatistics/AllEvaluationStatistics')"
      ></nut-cell>
    </nut-cell-group>

    <nut-cell-group>
      <nut-cell
        title="钉钉听评课记录"
        is-link
        @click="to('/packageECharts/pages/EvaluationStatistics/EvaluationStatistics')"
      ></nut-cell>
    </nut-cell-group>

    <div class="profilePage__bottom">
      <ButtonBlock @click="logout">退出登录</ButtonBlock>
      <!-- <nut-button type="primary" @click="logout">退出登录</nut-button> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { profile, userSubjectGroups } from '@/api/user'
import { removeStorage } from '@/utils/storage'
import Taro from '@tarojs/taro'
import { onMounted, reactive, ref } from 'vue'
import avatarDefault from '@/static/img/avatar.png'
import ButtonBlock from '@/components/Button/ButtonBlock.vue'

const userInfo = reactive({
  avatar: '',
  name: '',
  teacher_code: '',
  school: '',
})

const subjectGroups = ref<string[]>([])

onMounted(() => {
  profile().then((res) => {
    let { teacherInfo } = res
    userInfo.avatar = teacherInfo.avatar_url
    userInfo.name = teacherInfo.name
    userInfo.teacher_code = teacherInfo.teacher_code
    userInfo.school = teacherInfo.school_name
  })

  userSubjectGroups().then((res) => {
    subjectGroups.value = res.subject_groups.map((group) => {
      return group.subject_group_name
    })
  })
})

function logout() {
  removeStorage('openid')
  removeStorage('token')
  Taro.reLaunch({
    url: '/pages/login/index',
  })
}

function to(url) {
  console.log('🚀 -- to -- url', url)
  Taro.navigateTo({
    url,
  })
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

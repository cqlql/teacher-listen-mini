<script lang="ts" setup>
import { computed, provide, ref } from 'vue'
import ByGrade from './ByGrade.vue'
import ByTeacher from './ByTeacher.vue'
// import useGradeClassData from './useGradeClassData'

type ActiveType = 'grade' | 'teacher'

let activeType = ref<ActiveType>('grade')
let isByGrade = computed(() => {
  return activeType.value === 'grade'
})

// if (process.env.NODE_ENV !== 'production') {
//   activeType.value = 'teacher'
// }

// const gradeClassData = useGradeClassData()

// provide('gradeClassData', useGradeClassData())
</script>
<template>
  <div class="PushDoorListenClass">
    <div class="btnNavBar3">
      <nut-button @click="activeType = 'grade'" :class="{ active: isByGrade }" icon="mask-close"
        >按班级</nut-button
      >
      <nut-button @click="activeType = 'teacher'" :class="{ active: !isByGrade }" icon="mask-close"
        >按老师</nut-button
      >
    </div>

    <div class="container">
      <ByGrade v-if="isByGrade"></ByGrade>
      <ByTeacher v-else></ByTeacher>
    </div>
  </div>
</template>

<style lang="scss">
.PushDoorListenClass {
  .btnNavBar3 {
    padding: 12px;
    padding-top: 0;
    .nut-button {
      height: 26px;
      padding: 0 10px;
      border-color: #aaa;
      color: #aaa;

      &.active {
        border-color: #ffb21f;
        color: #ffb21f;
      }
    }
    .nut-button + .nut-button {
      margin-left: 10px;
    }
    .nut-icon {
      font-size: 8px;
      width: 10px;
    }
  }

  .container {
    top: 40px !important;
  }
}
</style>

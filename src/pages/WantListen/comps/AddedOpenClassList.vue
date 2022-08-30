<script lang="ts" setup>
import { delUserCourse, getUserCourse } from '@/api/course'
import ListLoad from '@/components/ListLoad/ListLoad.vue'
import getGrade from '@/data/getGrade'
// import OnceCallback from '@/utils/once-callback'
import Taro, { nextTick, useDidShow } from '@tarojs/taro'
import dayjs from 'dayjs'
import { ref, watch } from 'vue'
import type { AddedCourseItem } from '../types'
import AllOpenClassItem from './AllOpenClassItem.vue'
import TagFlag from '@/components/Tag/TagFlag.vue'
import { getStorage, setStorage } from '@/utils/storage'
import useToastInject from '@/hooks/useToastInject'
const { toastFail } = useToastInject()
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const vListLoad = ref({
  firstPageLoad() {},
})

// const onceCallback = new OnceCallback(init)

const props = defineProps<{
  active: boolean
  type: 'my'
}>()

watch(
  () => props.active,
  (active) => {
    if (active) {
      // onceCallback.execute()
      init()
    }
  },
  {
    immediate: true,
  },
)
function init() {
  nextTick(() => {
    vListLoad.value.firstPageLoad()
  })
}

function refresh() {
  vListLoad.value.firstPageLoad()
}

function reqList({ page }) {
  return getUserCourse({
    pageIndex: page,
    pageSize: 10,
    dateRange: dayjs().format('YYYY/MM/DD') + '-' + dayjs().add(6, 'day').format('YYYY/MM/DD'),
    keyword: '',
  }).then((res) => {
    let newList: AddedCourseItem[] = res.map((item) => {
      return {
        // 新增用
        id: String(item.id),
        courses_id: String(item.courses_id),
        user_id: String(item.teacher_user_id),
        teacher_name: item.teacher_name,

        subject: item.subject_name[0],
        subject_id: String(item.subject_id),
        period: String(item.period),
        userName: item.teacher_name,
        school_name: item.school_name,
        courseName: item.courses_name,
        place: item.class_room_address,
        date: item.s_time.replace(/:\d\d$/, ''),
        // time: item.start_time.substring(0, 5),
        gradClass:
          item.type === 2
            ? item.classes_name
            : getGrade(item.period, item.years) + item.classes_name,

        type: ['open', 'inside', 'outside'][item.type] as AddedCourseItem['type'],
        typeName: ['公开课', '校内课', '校外课'][item.type] as AddedCourseItem['type'],
      }
    })
    return newList
  })
}

function onDeleteUserCourse(item: AddedCourseItem, list: AddedCourseItem[], index: number) {
  delUserCourse(Number(item.id), {
    showErrorToast: false,
    fail: toastFail,
  }).then(() => {
    list.splice(index, 1)
    if (list.length === 0) {
      vListLoad.value.firstPageLoad()
    }
  })
}

function onEditOutsideCourse(item: AddedCourseItem) {
  Taro.navigateTo({
    url: '/pages/EditOutsideClass/EditOutsideClass?id=' + item.id,
    success: function (res) {
      // 向子页面传值
      res.eventChannel.emit('transferData', item)
    },
  })
}

useDidShow(() => {
  // 添加开课申请，back 后，需要重新加载
  if (getStorage('pageTemp') === 'needReload') {
    vListLoad.value.firstPageLoad()
  }

  setStorage('pageTemp', '')
})
</script>
<template>
  <ListLoad
    ref="vListLoad"
    :immediate="false"
    :startPage="0"
    :reqList="reqList"
    refresher-background="#f1f9fe"
    :scrollLowerEnabled="false"
  >
    <template #default="{ list: listCurrent }: { list: AddedCourseItem[] }">
      <div class="OpenClassList">
        <AllOpenClassItem
          v-for="(item, index) of listCurrent"
          :key="item.id"
          :data="item"
          type="all"
          :class="item.type"
          @refresh="refresh"
        >
          <template #btns>
            <TagFlag :class="item.type">{{ item.typeName }}</TagFlag>
            <nut-button
              size="small"
              type="danger"
              plain
              @click="onDeleteUserCourse(item, listCurrent, index)"
              >移出计划</nut-button
            >
            <nut-button
              v-if="item.type === 'outside'"
              size="small"
              plain
              @click="onEditOutsideCourse(item)"
              >修改</nut-button
            >
          </template>
        </AllOpenClassItem>
      </div>
    </template>
  </ListLoad>
</template>

<style lang="scss">
$openColor: #3aa6ff;
$openBc: #eaf0fe;
$insideColor: #ffb21f;
$insideBc: #fff5dc;
$outsideColor: #d295e4;
$outsideBc: #fbf5ff;
.OpenClassList {
  // padding: 16px 0 16px;

  .OpenClassPassedItem {
    // position: relative;
    padding-right: 5px;

    // &.open {
    //   background-color: $openBc;
    // }
    // &.inside {
    //   background-color: $insideBc;
    // }
    // &.outside {
    //   background-color: $outsideBc;
    // }
  }

  .TagFlag {
    // position: absolute;
    right: 0;
    top: -10px;

    &.open {
      background-color: $openColor;

      &::after {
        border-bottom-color: $openBc;
      }
    }
    &.inside {
      background-color: $insideColor;
      &::after {
        border-bottom-color: $insideBc;
      }
    }
    &.outside {
      background-color: $outsideColor;
      &::after {
        border-bottom-color: $outsideBc;
      }
    }
  }

  .nut-button {
    height: 23px;
    width: 80px;
    padding: 0 8px;
  }
}
</style>

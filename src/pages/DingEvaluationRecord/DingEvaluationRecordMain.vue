<script lang="ts" setup>
import ListLoad from '@/components/ListLoad/ListLoad.vue'
import { reactive, ref } from 'vue'
import SemesterRangePicker from '../ListenEvaluationRecord/comp/SemesterRangePicker.vue'
import SearchBarSelect2 from '@/components/SearchBarSelect2.vue'
import { getDingListenRecord } from '@/api/course'
import Taro from '@tarojs/taro'

import EvaluationItem from '../ListenEvaluationRecord/comp/EvaluationItem.vue'
import type { DingListenItem } from '../ListenEvaluationRecord/types'

const vListLoad = ref<{
  firstPageLoad: () => void
}>()

const searchOption = reactive({
  dateStart: '',
  dateEnd: '',
  selectedName: '请选择',
  defaultIndex: 0,
  visible: false,
  keyword: '',
  search() {
    vListLoad.value?.firstPageLoad()
  },
})

async function reqList({ page }) {
  let pageSize = 10
  return getDingListenRecord({
    date_start: searchOption.dateStart,
    date_end: searchOption.dateEnd,
    search_name: searchOption.keyword,
    offset: page * pageSize,
    list_mun: pageSize,
  }).then((res) => {
    return res.data.courses.map((resultItem) => {
      return {
        id: resultItem.id,
        dateTime: resultItem.lesson_date.split('T')[0] + ' ' + resultItem.start_time,
        // type: resolveCoursesList(resultItem), // 公开课
        // subjectShort: resultItem.subject_name[0],
        name: resultItem.name,
        teacher: resultItem.user_name,
        className: resultItem.grade_name + resultItem.class_name,
        videoUrl: resultItem.recording_resources[0]?.play_url,
      }
    })
  })
}

function to(item: DingListenItem) {
  let urlParams = `?id=${item.id}&name=${item.name}&dateTime=${item.dateTime}&className=${item.className}&teacher=${item.teacher}&videoUrl=${item.videoUrl}`
  Taro.navigateTo({
    url: '/pages/ListenEvaluationDetails/DingListenDetails' + urlParams,
  })
}
</script>
<template>
  <SemesterRangePicker
    v-model:start="searchOption.dateStart"
    v-model:end="searchOption.dateEnd"
    v-model:label="searchOption.selectedName"
    v-model:visible="searchOption.visible"
    :defaultIndex="searchOption.defaultIndex"
    @ok="searchOption.search"
  ></SemesterRangePicker>
  <div class="EvaluationRecordList">
    <div class="top">
      <SearchBarSelect2
        v-model:isExpanded="searchOption.visible"
        v-model="searchOption.keyword"
        :selectedName="searchOption.selectedName"
        placeholder="请输入课程或老师名称搜索"
        @search="searchOption.search"
      ></SearchBarSelect2>
    </div>
    <div class="list">
      <ListLoad ref="vListLoad" :startPage="0" :reqList="reqList">
        <template #default="{ list }: { list: DingListenItem[] }">
          <EvaluationItem v-for="item of list" :key="item.id" :data="item" @click="to(item)">
          </EvaluationItem>
        </template>
      </ListLoad>
    </div>
  </div>
</template>

<style lang="scss">
.EvaluationRecordList {
  .list {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 50px;

    .LoadBar {
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
}
</style>

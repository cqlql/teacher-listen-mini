<script lang="ts" setup>
import ListLoad from '@/components/ListLoad/ListLoad.vue'
import { reactive, ref } from 'vue'
import SemesterRangePicker from '../../ListenEvaluationRecord/comp/SemesterRangePicker.vue'
import SearchBarSelect2 from '@/components/SearchBarSelect2.vue'
import Taro from '@tarojs/taro'
import type { GetSchoolAllEvaluationRecordResult } from '@/api/statistic'
import { getSchoolAllEvaluationRecord } from '@/api/statistic'
import useSemesterRangeRemoteData from '@/hooks/useSemesterRangeRemoteData'
import dayjs from 'dayjs'

defineProps<{
  // 是列出科组还是全校
  range?: 'subjectGroup'
}>()

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
const { semesterSelectOptions, semesterSelectDataLoading } = useSemesterRangeRemoteData()
async function reqList({ page }) {
  return getSchoolAllEvaluationRecord({
    pageIndex: page,
    pageSize: 10,
    keyword: '',
    dateRange:
      dayjs(searchOption.dateStart).format('YYYY/MM/DD') +
      '-' +
      dayjs(searchOption.dateEnd).format('YYYY/MM/DD'),
  }).then((res) => res.data)
}

function toListenEvaluationRecord(item: GetSchoolAllEvaluationRecordResult['data'][0]) {
  let params = `?dateStart=${searchOption.dateStart}&dateEnd=${searchOption.dateEnd}&userId=${item.id}&listen_num=${item.listen_num}&teaching_num=${item.give_num}`

  Taro.navigateTo({
    url: '/pages/ListenEvaluationRecord/ListenEvaluationRecordNoSearch' + params,
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
    :options="semesterSelectOptions"
    @ok="searchOption.search"
  ></SemesterRangePicker>
  <div class="ListenEvaluationList">
    <div class="top">
      <SearchBarSelect2
        v-model:isExpanded="searchOption.visible"
        v-model="searchOption.keyword"
        :selectedName="searchOption.selectedName"
        placeholder="请输入老师名称搜索"
        @search="searchOption.search"
      ></SearchBarSelect2>
    </div>
    <div v-if="!semesterSelectDataLoading" class="list">
      <ListLoad ref="vListLoad" :startPage="0" :reqList="reqList">
        <template #default="{ list }: { list: GetSchoolAllEvaluationRecordResult['data'] }">
          <div
            class="item"
            v-for="item of list"
            :key="item.id"
            @click="toListenEvaluationRecord(item)"
          >
            <div class="avatar-icon">
              <nut-icon font-class-name="iconfont" class-prefix="icon" name="user-full"></nut-icon>
            </div>
            <div class="name">{{ item.teacher_name }}</div>
            <div class="number"
              >听课 <span class="blue">{{ item.listen_num }}</span> 次/授课
              <span class="red">{{ item.give_num }}</span> 次</div
            >
            <div class="arrow-icon">
              <nut-icon name="right"></nut-icon>
            </div>
          </div>
        </template>
      </ListLoad>
    </div>
  </div>
</template>

<style lang="scss">
.ListenEvaluationList {
  .top {
    // height: 42px;
    // line-height: 42px;
    // font-size: 18px;
    // color: #0096ff;
    // background-color: #f8f8f8;
    // padding: 0 28px;
  }

  .list {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 60px;

    .LoadBar {
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
  .item {
    display: flex;
    line-height: 40px;
    padding: 10px 0;
    border-top: 1px solid #f8f8f8;
  }
  .item:first-child {
    border-top: none;
  }
  .avatar-icon {
    padding: 0 28px;
  }
  .name {
    font-size: 17px;
    color: #333;
    width: 90px;
    // line-height: 40px;
  }
  .number {
    flex: 1;
  }
  .icon-user-full {
    width: 40px;
    height: 40px;
    background-color: #3aa6ff;
    color: #fff;
    border-radius: 40px;
    font-size: 22px;
    display: block;
  }
  .arrow-icon {
    // line-height: 40px;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  .blue {
    color: $primary-color;
  }
  .red {
    color: $danger-color;
  }
}
</style>

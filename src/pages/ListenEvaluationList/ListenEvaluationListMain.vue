<script lang="ts" setup>
import ListLoad from '@/components/ListLoad/ListLoad.vue'
import { reactive } from 'vue'
import SemesterRangePicker from '../ListenEvaluationRecord/comp/SemesterRangePicker.vue'
import SearchBarSelect2 from '@/components/SearchBarSelect2.vue'

const searchOption = reactive({
  dateStart: '',
  dateEnd: '',
  selectedName: '',
  visible: false,
  keyword: '',
  search() {},
})

async function reqList(page) {
  console.log('🚀 -- reqList -- page', page)
  return [1]
}
</script>
<template>
  <div class="ListenEvaluationList">
    <div class="top">
      <SearchBarSelect2
        v-model:isExpanded="searchOption.visible"
        v-model="searchOption.keyword"
        :selectedName="searchOption.selectedName"
        @search="searchOption.search"
      ></SearchBarSelect2>
    </div>
    <div class="list">
      <ListLoad :reqList="reqList">
        <template #default>
          <div class="item" v-for="v of 19" :key="v">
            <div class="avatar-icon">
              <nut-icon font-class-name="iconfont" class-prefix="icon" name="user-full"></nut-icon>
            </div>
            <div class="name">张三</div>
            <div class="number"
              >听课 <span class="blue">15</span> 次/授课 <span class="red">2</span> 次</div
            >
            <div class="arrow-icon">
              <nut-icon name="right"></nut-icon>
            </div>
          </div>
        </template>
      </ListLoad>
    </div>
  </div>

  <SemesterRangePicker
    v-model:start="searchOption.dateStart"
    v-model:end="searchOption.dateEnd"
    v-model:label="searchOption.selectedName"
    v-model:visible="searchOption.visible"
    @ok="searchOption.search"
  ></SemesterRangePicker>
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

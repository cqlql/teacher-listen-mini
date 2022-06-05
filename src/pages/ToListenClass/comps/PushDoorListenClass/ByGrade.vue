<script lang="ts" setup>
import { getCourseList } from '@/api/course'
import TabButtons from '@/components/TabButtons/TabButtons.vue'
import { inject } from 'vue'
import ListenClassCategoryList from '../ListenClassCategoryList/ListenClassCategoryList.vue'
import LayoutView from './LayoutView.vue'
import useGradeClassSelect from './useGradeClassSelect'

const { searchOptions, gradeList, classList, search } = useGradeClassSelect()

const topSearchParams = inject('topSearchParams') as {
  date: string
  search: () => void
}
topSearchParams.search = search

function reqList({ page }) {
  return getCourseList({
    grade_id: searchOptions.grade,
    class_id: searchOptions.class,
    list_mun: 10,
    page: page,
    date: topSearchParams.date,
  }).then((res) => {
    return res.getCurriculum
  })
}
</script>
<template>
  <div class="ToListenClassByGrade">
    <TabButtons
      class="scroll"
      v-model="searchOptions.grade"
      :list="gradeList"
      @change="search"
    ></TabButtons>
    <LayoutView>
      <template #leftNav>
        <TabButtons
          class="vertical"
          v-model="searchOptions.class"
          :list="classList"
          @change="search"
        ></TabButtons>
      </template>
      <template #rightList>
        <ListenClassCategoryList
          v-if="searchOptions.class"
          type="grade"
          v-model:search="searchOptions.search"
          :reqList="reqList"
        >
        </ListenClassCategoryList>
      </template>
    </LayoutView>
  </div>
</template>

<style lang="scss">
.ToListenClassByGrade {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .TabButtons.vertical {
    height: 100%;

    .item {
      height: 50px;
      line-height: 50px;
    }
  }

  & > .TabButtons {
    height: 44px;

    .item {
      line-height: 44px;
    }
  }
}
</style>

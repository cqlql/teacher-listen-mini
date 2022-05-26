<script lang="ts" setup>
import { openCourseListV1 } from '@/api/course'
import TabButtons from '@/components/TabButtons/TabButtons.vue'
import { inject } from 'vue'
import ListenClassCategoryList from '../ListenClassCategoryList/ListenClassCategoryList.vue'
import LayoutView from './LayoutView.vue'
import useGradeClassSelect from './useGradeClassSelect'

const { searchOptions, gradeList, classList, search } = useGradeClassSelect()

const topSearchParams = inject('topSearchParams') as {
  subject: string
  date: string
  search: () => void
}

topSearchParams.search = search

function reqList({ page }) {
  return openCourseListV1({
    less_type: 1,
    status: '2',
    grade_id: searchOptions.grade,
    list_mun: 10,
    offset: page * 10,
    is_history: 1,
  }).then((res) => {
    return res.listenList
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

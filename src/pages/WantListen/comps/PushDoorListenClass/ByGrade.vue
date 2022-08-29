<script lang="ts" setup>
import { getPushDoorCourseList } from '@/api/course'
import TabButtons from '@/components/TabButtons/TabButtons.vue'
import getGrade from '@/data/getGrade'
import { inject } from 'vue'
import ListenClassCategoryList from './CourseList.vue'
import LayoutView from './LayoutView.vue'
import useGradeClassSelect from './useGradeClassSelect'

const { searchOptions, gradeList, classList, search } = useGradeClassSelect()

const topSearchParams = inject('topSearchParams') as {
  date: string
  search: (item: any) => void
}
topSearchParams.search = search

function reqList({ page }) {
  return getPushDoorCourseList({
    classId: Number(searchOptions.class),
    period: Number(searchOptions.period),
    pageSize: 10,
    pageIndex: page,
    teacher_name: '',
  }).then((rawList) =>
    rawList.map((item) => {
      return {
        id: String(item.id),
        className: getGrade(item.period, item.years) + item.classes_name,
        lessonName: item.section_name,
        liveUrl: '',
        subjectName: item.subject_name,
        teacherName: item.teacher_name,
      }
    }),
  )
}
</script>
<template>
  <div class="ToListenClassByGrade">
    <TabButtons class="scroll" v-model="searchOptions.grade" :list="gradeList"></TabButtons>
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

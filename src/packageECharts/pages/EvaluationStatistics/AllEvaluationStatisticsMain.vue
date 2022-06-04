<script lang="ts" setup>
import CardPlus from '@/components/CardPlus.vue'
import EChart from '@/packageECharts/components/EChart.vue'
import ChartBarCustom from '@/components/ChartBarCustom.vue'
import { ref } from 'vue'
import { getStorage } from '@/utils/storage'
import { Empty } from '@nutui/nutui-taro'
import type { GetListenAndTeachStatisticsParams } from '@/api/model/courseModel'
import useToastInject from '@/hooks/useToastInject'

import useEvaluationStatistics from './hooks/all/useEvaluationStatistics'
import { RadioGroup as NutRadiogroup, Radio as NutRadio } from '@nutui/nutui-taro'

// import SearchBarSelect2 from '@/components/SearchBarSelect2.vue'
import useCountPieChart from './hooks/all/useCountPieChart'
import useSubjectGroupBar from './hooks/all/useSubjectGroupBar'
import GroupSelectAndUserSearch from './components/GroupSelectAndUserSearch.vue'
const { toastLoading, toastClose } = useToastInject()

const rangeType = ref<GetListenAndTeachStatisticsParams['range_type']>('this_semester')
const userId = getStorage('userId')

const groupId = ref('')

const {
  empty: chartBarEmpty,
  chartBarData,
  updateEvaluation,
  subjectGroups,
} = useEvaluationStatistics(userId)

// const subjectGroups = ref<{ id: string; name: string }[]>([])

const { countPieState, updateCountPie } = useCountPieChart()

const { subjectGroupBar, updateSubjectGroupBar } = useSubjectGroupBar()

function reload() {
  toastLoading()
  let rangeTypeValue = rangeType.value
  Promise.all([
    updateCountPie(rangeTypeValue),
    updateSubjectGroupBar(rangeTypeValue),
    updateEvaluation(rangeTypeValue),
  ]).finally(() => {
    toastClose()
  })
}

reload()
</script>
<template>
  <div class="EvaluationStatistics">
    <nut-tabs class="nut-tabs3 blue" v-model="rangeType" @change="reload">
      <nut-tabpane pane-key="this_semester" title="本学期"></nut-tabpane>
      <nut-tabpane pane-key="this_month" title="本月"></nut-tabpane>
      <nut-tabpane pane-key="this_week" title="本周"></nut-tabpane>
    </nut-tabs>

    <!-- <div style="padding: 10px"> -->
    <!-- <nut-radiogroup v-model="groupId" direction="horizontal">
      <nut-radio v-for="group of subjectGroups" :key="group.id" shape="button" :label="group.id">{{
        group.name
      }}</nut-radio>
    </nut-radiogroup> -->
    <!-- </div> -->

    <CardPlus title2="全校听授课次数统计：">
      <Empty v-if="countPieState.empty"></Empty>
      <EChart v-else ref="vEChart" :option="countPieState.chartOptions"> </EChart>
    </CardPlus>

    <CardPlus title2="各科组听授课次数统计：">
      <Empty v-if="subjectGroupBar.empty"></Empty>
      <EChart v-else class="charBar" :option="subjectGroupBar.chartOptions"> </EChart>
    </CardPlus>

    <CardPlus title2="授课评价统计：">
      <!-- 已规划设计 -->
      <GroupSelectAndUserSearch :columns="subjectGroups"></GroupSelectAndUserSearch>
      <!-- <GroupSelectAndUserSearch
        v-model:groupId="evaluationState.groupId"
        v-model:searchKeyword="evaluationState.searchKeyword"
        :groupList="evaluationState.list"
        @groupChange="evaluationGroupChange"
        @search="evaluationTearchSearch"
      ></GroupSelectAndUserSearch> -->
      <!-- <SearchBarSelect2 
          v-model:isExpanded="searchOption.visible"
      v-model="searchOption.keyword"
      :selectedName="searchOption.selectedName"
      @search="searchOption.search"
      :isExpanded="false"></SearchBarSelect2> -->
      <div class="safe-padding-bottom">
        <div class="teaching">
          <!-- <div class="personnel-list">
            <nut-tag type="warning" class="item" v-for="v of 5" :key="v">张三</nut-tag>
            <nut-tag type="info" class="item" v-for="v of 5" :key="v">张三</nut-tag>
          </div> -->
          <Empty v-if="chartBarEmpty"></Empty>

          <ChartBarCustom v-else :data="chartBarData"></ChartBarCustom>
        </div>
      </div>
    </CardPlus>
  </div>
</template>

<style lang="scss" src="./EvaluationStatistics.scss"></style>
<style lang="scss">
.nut-radiogroup {
  padding: 10px;
}
</style>

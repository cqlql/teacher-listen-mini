<script lang="ts" setup>
import CardPlus from '@/components/CardPlus.vue'
import EChart from '@/packageECharts/components/EChart.vue'
// import ChartBarCustom from '@/components/ChartBarCustom.vue'
import { ref } from 'vue'
import { Empty } from '@nutui/nutui-taro'
import useToastInject from '@/hooks/useToastInject'

// import useEvaluationStatistics from './hooks/all/useEvaluationStatistics'
// import { RadioGroup as NutRadiogroup, Radio as NutRadio } from '@nutui/nutui-taro'

// import SearchBarSelect2 from '@/components/SearchBarSelect2.vue'
import useCountPieChart from './hooks/all/useCountPieChart'
// import useSubjectGroupBar from './hooks/all/useSubjectGroupBar'
// import GroupSelectAndUserSearch from './components/GroupSelectAndUserSearch.vue'
import type { DateRangeType } from '@/api/statistic'
import { getSchoolEvaluationStatistics } from '@/api/statistic'
const { toastLoading, toastClose } = useToastInject()

const rangeType = ref<DateRangeType>(2)

// const {
//   empty: chartBarEmpty,
//   chartBarData,
//   updateEvaluation,
//   subjectGroups,
//   subjectGroupMembersSearchResults,
//   subjectGroupMemberId,
//   evaluationState,
//   evaluationGroupConfirm,
//   evaluationTearchSearch,
//   subjectGroupMemberChange,
// } = useEvaluationStatistics(rangeType)

const { countPieState, updateCountPie } = useCountPieChart()

// const { subjectGroupBar, updateSubjectGroupBar } = useSubjectGroupBar()

function reload() {
  toastLoading()
  let rangeTypeValue = rangeType.value
  getSchoolEvaluationStatistics({ dateRange: rangeTypeValue })
    .then((result) => {
      updateCountPie(result)
      // updateSubjectGroupBar(rangeTypeValue),
      // updateEvaluation(),
    })
    .finally(() => {
      toastClose()
    })
  // Promise.all([
  //   updateCountPie(rangeTypeValue),
  //   updateSubjectGroupBar(rangeTypeValue),
  //   updateEvaluation(),
  // ]).finally(() => {
  //   toastClose()
  // })
}

reload()
</script>
<template>
  <div class="EvaluationStatistics">
    <nut-tabs class="nut-tabs3 blue" v-model="rangeType" @change="reload">
      <nut-tabpane :pane-key="3" title="本学期"></nut-tabpane>
      <nut-tabpane :pane-key="2" title="本月"></nut-tabpane>
      <nut-tabpane :pane-key="1" title="本周"></nut-tabpane>
    </nut-tabs>

    <CardPlus title2="全校听授课次数统计：">
      <Empty v-if="countPieState.empty"></Empty>
      <EChart v-else ref="vEChart" :option="countPieState.chartOptions"> </EChart>
    </CardPlus>

    <!-- <CardPlus title2="各科组听授课次数统计：">
      <Empty v-if="subjectGroupBar.empty"></Empty>
      <EChart v-else class="charBar" :option="subjectGroupBar.chartOptions"> </EChart>
    </CardPlus>

    <CardPlus title2="授课评价统计：">
      <GroupSelectAndUserSearch
        v-model="evaluationState.groupId"
        v-model:keyword="evaluationState.keyword"
        :columns="subjectGroups"
        placeholder="请输入老师名称搜索"
        @confirm="evaluationGroupConfirm"
        @search="evaluationTearchSearch"
      ></GroupSelectAndUserSearch>
      <nut-radiogroup
        v-model="subjectGroupMemberId"
        @change="subjectGroupMemberChange"
        direction="horizontal"
      >
        <nut-radio
          v-for="group of subjectGroupMembersSearchResults"
          :key="group.id"
          shape="button"
          :label="group.id"
          >{{ group.name }}</nut-radio
        >
      </nut-radiogroup>
      <div class="safe-padding-bottom">
        <div class="teaching">
          <Empty v-if="chartBarEmpty"></Empty>
          <ChartBarCustom v-else :data="chartBarData"></ChartBarCustom>
        </div>
      </div>
    </CardPlus> -->
  </div>
</template>

<style lang="scss" src="./EvaluationStatistics.scss"></style>
<style lang="scss">
.nut-radiogroup {
  padding: 10px;
}
</style>

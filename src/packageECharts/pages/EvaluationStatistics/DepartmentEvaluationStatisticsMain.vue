<script lang="ts" setup>
import CardPlus from '@/components/CardPlus.vue'
import EChart from '@/packageECharts/components/EChart.vue'
import ChartBarCustom from '@/components/ChartBarCustom.vue'
import { ref, watch } from 'vue'
import { Empty } from '@nutui/nutui-taro'

import useToastInject from '@/hooks/useToastInject'
import useCountStatistics from './hooks/department/useCountStatistics'
import useEvaluationStatistics from './hooks/department/useEvaluationStatistics'
import { RadioGroup as NutRadiogroup, Radio as NutRadio } from '@nutui/nutui-taro'

import type { DateRangeType } from '@/api/statistic'
import { getDepartmentEvaluationStatistics } from '@/api/statistic'

const { toastLoading, toastClose } = useToastInject()

const rangeType = ref<DateRangeType>(3)

const {
  empty: chartBarEmpty,
  groupId,
  subjectGroups,
  chartBarData,
  updateEvaluation: updateChartBar,
  subjectGroupMemberId,
  subjectGroupMembers,
  subjectGroupMemberChange: memberChange,
} = useEvaluationStatistics(rangeType)

const {
  update: countUpdate,
  // chartOptions: countChartOptions,
  countStatistics,
} = useCountStatistics()

watch(groupId, async () => {
  if (isFirst) {
    isFirst = false
    return
  }
  reload()
})

async function reload() {
  await updateDepartmentEvaluationStatistics()
  return updateChartBar()
}

function updateDepartmentEvaluationStatistics(
  cb?: (groups: { id: string; name: string }[]) => void,
) {
  toastLoading()

  return getDepartmentEvaluationStatistics({
    roleId: Number(groupId.value),
    dateRange: rangeType.value,
  })
    .then((result) => {
      countUpdate(result)

      const groups = (subjectGroups.value = result.roles.map((group) => {
        return {
          id: String(group.role_id),
          name: group.role_name,
        }
      }))
      cb?.(groups)
    })
    .finally(toastClose)
}

let isFirst = true
updateDepartmentEvaluationStatistics((groups) => {
  groupId.value = groups[0].id
  updateChartBar()
})
</script>
<template>
  <div class="EvaluationStatistics">
    <nut-tabs class="nut-tabs3 blue" v-model="rangeType" @change="reload">
      <nut-tabpane :pane-key="3" title="本学期"></nut-tabpane>
      <nut-tabpane :pane-key="2" title="本月"></nut-tabpane>
      <nut-tabpane :pane-key="1" title="本周"></nut-tabpane>
    </nut-tabs>
    <!-- <div style="padding: 10px"> -->
    <nut-radiogroup direction="horizontal" v-model="groupId">
      <nut-radio v-for="group of subjectGroups" :key="group.id" shape="button" :label="group.id">{{
        group.name
      }}</nut-radio>
    </nut-radiogroup>
    <!-- </div> -->

    <CardPlus title2="科组听授课次数统计：">
      <EChart :option="countStatistics.pie.chartOptions"> </EChart>
    </CardPlus>

    <CardPlus title2="科组人员听授课次数统计：">
      <Empty v-if="countStatistics.empty"></Empty>
      <EChart v-else class="charBar" :option="countStatistics.bar.chartOptions"> </EChart>
    </CardPlus>

    <CardPlus title2="授课评价统计：">
      <div class="safe-padding-bottom">
        <div class="teaching">
          <!-- <div class="personnel-list">
            <nut-tag type="warning" class="item" v-for="v of 5" :key="v">张三</nut-tag>
            <nut-tag type="info" class="item" v-for="v of 5" :key="v">张三</nut-tag>
          </div> -->
          <nut-radiogroup
            v-model="subjectGroupMemberId"
            @change="memberChange"
            direction="horizontal"
          >
            <nut-radio
              v-for="group of subjectGroupMembers"
              :key="group.id"
              shape="button"
              :label="group.id"
              >{{ group.name }}</nut-radio
            >
          </nut-radiogroup>
          <Empty v-if="chartBarEmpty"></Empty>

          <ChartBarCustom v-else :data="chartBarData"></ChartBarCustom>
        </div>
      </div>
    </CardPlus>
  </div>
</template>

<style lang="scss" src="./EvaluationStatistics.scss"></style>
<style lang="scss">
.EvaluationStatistics {
  & > .nut-radiogroup {
    padding: 10px;
  }
  .CustomChartBar {
    min-height: 238px;
  }
}
</style>

<script lang="ts" setup>
import CardPlus from '@/components/CardPlus.vue'
import EChart from '@/packageECharts/components/EChart.vue'
import ChartBarCustom from '@/components/ChartBarCustom.vue'
import { ref, watch } from 'vue'
import { getStorage } from '@/utils/storage'
import { Empty } from '@nutui/nutui-taro'
import type { GetListenAndTeachStatisticsParams } from '@/api/model/courseModel'
import useToastInject from '@/hooks/useToastInject'
import useCountStatistics from './hooks/department/useCountStatistics'
import useEvaluationStatistics from './hooks/department/useEvaluationStatistics'
import { RadioGroup as NutRadiogroup, Radio as NutRadio } from '@nutui/nutui-taro'
import { userSubjectGroups } from '@/api/user'
import { getUserListDepartment } from '@/api/course'
const { toastLoading, toastClose } = useToastInject()

const rangeType = ref<GetListenAndTeachStatisticsParams['range_type']>('this_semester')
const userId = getStorage('userId')

const groupId = ref('')

const {
  empty: countEmpty,
  update: countUpdate,
  chartOptions: countChartOptions,
} = useCountStatistics(groupId)

const {
  empty: chartBarEmpty,
  chartBarData,
  update: updateChartBar,
} = useEvaluationStatistics(userId)

watch(groupId, reload)

function reload() {
  if (groupId.value) {
    toastLoading()
    Promise.all([countUpdate(rangeType.value), updateChartBar(rangeType.value)]).finally(() => {
      toastClose()
    })
  }
}

const subjectGroups = ref<{ id: string; name: string }[]>([])
userSubjectGroups().then((res) => {
  const groups = (subjectGroups.value = res.subject_groups.map((group) => {
    return {
      id: group.subject_group_id,
      name: group.subject_group_name,
    }
  }))
  if (groups[0]) {
    groupId.value = groups[0].id

    reload()
  }
})

// getUserListDepartment({
//   group_id: item
// })
// const groupList = ref([])
// const userList = ref<string[]>([])
// function changeRangeDate(rangeType) {
//   fetchOnce(()=> {

//   }).then((

//   ))
// }
</script>
<template>
  <div class="EvaluationStatistics">
    <nut-tabs class="nut-tabs3 blue" v-model="rangeType" @change="reload">
      <nut-tabpane pane-key="this_semester" title="本学期"></nut-tabpane>
      <nut-tabpane pane-key="this_month" title="本月"></nut-tabpane>
      <nut-tabpane pane-key="this_week" title="本周"></nut-tabpane>
    </nut-tabs>

    <!-- <div style="padding: 10px"> -->
    <nut-radiogroup v-model="groupId" direction="horizontal">
      <nut-radio v-for="group of subjectGroups" :key="group.id" shape="button" :label="group.id">{{
        group.name
      }}</nut-radio>
    </nut-radiogroup>
    <!-- </div> -->

    <CardPlus title2="听授课次数统计：">
      <Empty v-if="countEmpty"></Empty>
      <EChart v-else ref="vEChart" :option="countChartOptions"> </EChart>
    </CardPlus>

    <CardPlus title2="授课评价统计：">
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

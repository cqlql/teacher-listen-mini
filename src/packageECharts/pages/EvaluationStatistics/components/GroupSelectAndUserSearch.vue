<script lang="ts" setup>
import { ref } from 'vue'
import SearchBarSelect2 from '@/components/SearchBarSelect2.vue'
import { Popup as NutPopup, Picker as NutPicker } from '@nutui/nutui-taro'
const visible = ref(false)
const keyword = ref('')
const selectedName = ref('')

// const columns = ref([
//   { text: '南京市', value: 'NanJing' },
//   { text: '无锡市', value: 'WuXi' },
//   { text: '海北藏族自治区', value: 'ZangZu' },
//   { text: '北京市', value: 'BeiJing' },
//   { text: '连云港市', value: 'LianYunGang' },
//   { text: '浙江市', value: 'ZheJiang' },
//   { text: '江苏市', value: 'JiangSu' },
// ])

defineProps<{
  columns: { text: string; value: string }[]
}>()

function search() {}
function change() {}
function confirm() {}
</script>
<template>
  <div>
    <SearchBarSelect2
      v-model:isExpanded="visible"
      v-model="keyword"
      :selectedName="selectedName"
      @search="search"
    ></SearchBarSelect2>
    <nut-picker
      v-model:visible="visible"
      :columns="columns"
      title="城市选择"
      @change="change"
      @confirm="confirm"
    >
    </nut-picker>
    <!-- <nut-popup position="bottom" :style="{ height: '20%' }" v-model:visible="visible"> </nut-popup> -->
  </div>
</template>

<style lang="scss"></style>

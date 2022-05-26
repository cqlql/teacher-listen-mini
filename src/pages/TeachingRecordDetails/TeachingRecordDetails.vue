<script lang="ts" setup>
import InfoBox from '@/components/InfoBox.vue'
import CardPlus from '@/components/CardPlus.vue'
import ChartBarCustom from '@/components/ChartBarCustom.vue'
</script>
<template>
  <div class="ListenRecordDetails">
    <InfoBox></InfoBox>
    <CardPlus title2="授课评价">
      <template #title2Right>
        <navigator class="navigator" url="/pages/ListeningTeacherList/ListeningTeacherList"
          >查看详情</navigator
        >
      </template>
      <template #title>
        <div> 听评课人数： <em>16</em> 人 </div>
      </template>
      <ChartBarCustom></ChartBarCustom>
    </CardPlus>
  </div>
</template>

<style lang="scss">
page {
  background-color: #f6f6f6;
}
.ListenRecordDetails {
  padding: 10px;
  em {
    display: inline-block;
    width: 42px;
    height: 42px;
    background-color: #3aa6ff;
    font-size: 24px;
    line-height: 42px;
    border-radius: 42px;
    color: #fff;
    text-align: center;
  }

  .box {
    padding-bottom: 30px;
  }

  .navigator {
    color: $primary-color;
  }
}
</style>

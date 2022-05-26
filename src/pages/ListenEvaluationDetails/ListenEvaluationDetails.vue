<script lang="ts" setup>
import CardPlus from '@/components/CardPlus.vue'
import TitleContent from '../ListenRecordDetails/comp/TitleContent.vue'
import TagView from '@/components/Tag/TagView.vue'
</script>
<template>
  <div class="ListenEvaluationDetails">
    <CardPlus title2="查看详情">
      <TitleContent title="已选亮点：">
        <div class="tags-list">
          <span class="name">课堂任务:</span>
          <TagView class="">标签</TagView>
          <TagView class="warning">标签</TagView>
          <!-- <div class="tags"></div> -->
        </div>
      </TitleContent>
      <TitleContent title="点评：">
        今天这堂课讲的实在是太精彩了！这里是很多文字描述这里
        是很多文字描述这里是很多文字描述这里是很多文字描述这
        里是很多文字描述这里是很多文字描述这里是很多文字描述 这里是很多文字描述这里是很多文字描述。
      </TitleContent>
    </CardPlus>
  </div>
</template>

<style lang="scss">
page {
  background-color: #f6f6f6;
}
.ListenEvaluationDetails {
  padding: 10px;
  margin-bottom: 30px;

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
    padding-top: 2px;
    padding-bottom: 30px;
  }

  .tags-list {
    .name {
      // margin-right: 10px;
    }

    .LabelView {
      margin-left: 5px;
      border-radius: 100px;
    }
  }

  .LabelContent {
    margin: 15px 0;
  }
}
</style>

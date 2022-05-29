<template>
  <div class="EvaluationScore">
    <scroll-view class="EvaluationScore_list" :scroll-y="true">
      <div class="item">
        <h2 class="tit">请选择该课堂教师做得好的1-5点</h2>
        <div class="cont">
          <div
            v-for="item of evaluationScore.scoreList"
            :key="item.id"
            class="EvaluationScore_item"
          >
            <div class="name">{{ item.name }}：</div>
            <nut-checkboxgroup v-model="item.ids" direction="horizontal">
              <nut-checkbox
                v-for="option of item.options"
                :key="option.id"
                :label="option.id"
                icon-size="12"
                >{{ option.name }}</nut-checkbox
              >
            </nut-checkboxgroup>
          </div>
        </div>
      </div>
      <div class="item">
        <h2 class="tit">请对这堂课做点评（50-150字）：</h2>
        <nut-textarea
          v-model="evaluationScore.reviews"
          class="ipt"
          placeholder="请输入文字"
          max-length="150"
          limit-show
        ></nut-textarea>
      </div>
    </scroll-view>

    <div class="EvaluationScore_footer">
      <!-- <div class="EvaluationScore_tip"> 注：请选择该课堂教师做得好的1-5点 </div> -->
      <ButtonBlock linear-gradient @click="onConfirm">保存</ButtonBlock>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Checkbox as NutCheckbox,
  CheckboxGroup as NutCheckboxgroup,
  TextArea as NutTextarea,
} from '@nutui/nutui-taro'
import { inject } from 'vue'
import type { ListenEvaluationStore } from '../../types'
import ButtonBlock from '@/components/Button/ButtonBlock.vue'

const { evaluationScore, save } = inject('listenEvaluationStore') as ListenEvaluationStore

function onConfirm() {
  save()
}
</script>
<style lang="scss">
.EvaluationScore {
  // padding: 15px;
  position: absolute;
  left: 15px;
  right: 15px;
  bottom: 15px;
  top: 0;
}

.EvaluationScore_list {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 50px;

  .item {
    padding-top: 15px;
  }
  .item:last-child {
    padding-bottom: 15px;
  }
  .tit {
    color: #000;
    margin-bottom: 10px;
    &::before {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 10px;
      background-image: linear-gradient(-90deg, #3aa0ff 0%, #3bd8ff 100%),
        linear-gradient(#3aa2ff, #3aa2ff);
      margin-right: 10px;
    }
  }

  .tit + .EvaluationScore_item {
    .name {
      padding-top: 0;
    }
  }

  .ipt {
    background: #f8f8f8;
    border-radius: 3px;
  }

  .cont {
    padding-left: 20px;
  }
}

.EvaluationScore_item {
  &:first-child {
    .name {
      padding-top: 0;
    }
  }
  .name {
    font-size: 14px;
    padding: 5px 0;
    color: #000;
    font-weight: bold;
  }

  .nut-checkboxgroup {
    display: block;

    .nut-checkbox {
      // margin-bottom: 12px;
      padding: 6px;
      width: 33%;
      margin-right: 0;
      box-sizing: border-box;
      display: inline-flex;
    }
  }

  .nut-checkbox__icon {
    color: #6da5ff;
  }

  .nut-radio__label {
    // font-size: 12px;
  }
}

// .EvaluationScore_tip {
//   color: #f3812e;
//   margin-bottom: 10px;
// }

.EvaluationScore_footer {
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>

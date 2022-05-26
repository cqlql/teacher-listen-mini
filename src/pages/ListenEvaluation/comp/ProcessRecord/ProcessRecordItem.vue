<script lang="ts" setup>
/* eslint-disable vue/no-mutating-props */
import ToolBar from '../ToolBar/ToolBar.vue'
import PopoverBox from '@/components/PopoverBox/PopoverBox.vue'
import RowInput from '../RowInput/RowInput.vue'

import useProcessRecordToolBar from './hooks/useProcessRecordToolBar'

// import ChildItem from './ChildItem.vue'
import ChildItem from './ChildItem'

import { inject, ref, watch } from 'vue'
import usePopoverTool from './hooks/usePopoverTool'
import type { RecordItem } from '../../types'
import type { ProcessRecordStore } from '../../hooks/useProcessRecordStore'

const props = defineProps<{
  index: number
}>()

const data = ref<RecordItem>({
  id: '',
  text: '',
  list: [],
})

const { processRecordList } = inject('processRecordStore') as ProcessRecordStore

watch(
  () => props.index,
  () => {
    data.value = processRecordList.value[props.index]
  },
  {
    immediate: true,
  },
)

const popoverTool = usePopoverTool()

const { selectBefore, onSelect } = useProcessRecordToolBar(data, popoverTool)
</script>
<template>
  <div class="ProcessRecordItem">
    <div class="row tit"> 过程记录 {{ index + 1 }} </div>
    <PopoverBox v-show="popoverTool.visible">
      <ToolBar :select-before="selectBefore" @select="onSelect"></ToolBar>
    </PopoverBox>
    <RowInput v-model="data.text" @show-add="popoverTool.trigger"></RowInput>
    <ChildItem
      v-for="(item, i) of data.list"
      :key="item.id"
      :type="item.type"
      :recordIndex="index"
      :index="i"
    ></ChildItem>
  </div>
</template>

<style lang="scss">
.ProcessRecordItem {
  padding-bottom: 5px;
  position: relative;

  .row {
    padding: 5px 0;

    .LabelView {
      margin-right: 10px;
      width: 40px;
      box-sizing: border-box;
    }
  }

  .tit {
    font-size: 15px;
    color: #000;
    font-weight: bold;
  }

  .defIpt {
    display: flex;
    align-items: center;

    // .first {    }

    .l {
      flex: 1;
    }

    .r {
      padding-left: 8px;
    }

    .ipt {
      height: 36px;
      background-color: #fff;
      border: solid 1px #d5d5d5;
      padding: 0 10px;
      box-sizing: border-box;
    }
  }

  // .thinkIpt {  }

  .pictureRow {
    display: flex;
  }

  // .wrote {  }

  .videoRow {
    display: flex;
  }

  .PopoverBox {
    position: absolute;
    width: 100%;
    top: 82px;
    z-index: 3;

    &::after {
      border-color: transparent transparent #f9fcff transparent;
    }
  }
}
</style>

<template>
  <div class="tab-bar">
    <div class="tab-bar-item suggest" @click="$emit('suggest')">
      <div class="icon">
        <nut-icon font-class-name="iconfont" class-prefix="icon" name="suggest" />
      </div>
      <div class="name">思考建议</div>
    </div>
    <div class="tab-bar-item">
      <div class="icon">
        <nut-icon name="edit" />
      </div>
      <div class="name">画板</div>
    </div>
    <div class="tab-bar-item" @click="onMore">
      <div class="icon">
        <nut-icon name="more-s" />
      </div>
      <div class="name">更多</div>
    </div>
    <div class="tab-bar-item success" @click="$emit('scoring')">
      <div class="icon">
        <nut-icon font-class-name="iconfont" class-prefix="icon" name="scoring" />
      </div>
      <div class="name">打分</div>
    </div>
    <div class="tab-bar-item success" @click="$emit('save')">
      <div class="icon">
        <nut-icon name="Check" />
      </div>
      <div class="name">提交</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let moreVisible = ref(false)

function onMore() {
  moreVisible.value = !moreVisible.value
}
</script>

<style lang="scss">
.tab-bar {
  display: flex;
  background-color: #def6ff;
  height: 52px;
}

.tab-bar-item {
  text-align: center;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  flex: 1;
  position: relative;

  .icon {
    border: 1px solid #999;
    // background-color: #50d89e;
    color: #999;
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    border-radius: 30px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .iconfont {
    font-size: 20px;
  }

  .name {
    color: #999;
    font-size: 12px;
  }

  &.suggest {
    background-color: #effbff;
    // padding: 0 20px;

    .icon {
      border-color: #50d89e;
      background-color: #50d89e;
      color: #fff;
    }
  }

  &.success {
    background-color: #effbff;
    // padding: 0 20px;

    .icon {
      border-color: #6da5ff;
      background-color: #6da5ff;
      color: #fff;
    }
  }
}
</style>

<script lang="ts" setup></script>
<template>
  <div class="CustomChartBar">
    <div v-for="v of 10" :key="v" class="row">
      <div class="icon-cont">
        <nut-icon name="tips"></nut-icon>
      </div>
      <div class="name">目标</div>
      <div class="bar-cont">
        <div class="bar" :style="{ width: v * 10 + '%' }">
          <span class="v">3</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.CustomChartBar {
  line-height: 14px;
  .row {
    display: flex;
    height: 28px;
  }
  .icon-cont {
    width: 30px;
  }
  .nut-icon {
    height: 14px;
    line-height: inherit;
    font-size: inherit;
  }
  .name {
    width: 50px;
  }
  .bar-cont {
    flex: 1;
    border-left: 1px solid #3aa6ff;
    margin-right: 10px;
  }
  .bar {
    height: 14px;
    background-color: #3aa6ff;
    position: relative;
    .v {
      position: absolute;
      right: -2px;
      transform: translateX(100%);
    }
  }
  .row:last-child {
    .bar-cont {
      border-bottom: 1px solid #3aa6ff;
      position: relative;
      &::before,
      &::after {
        content: '次数';
        position: absolute;
        left: 0;
        bottom: -4px;
        transform: translateY(100%);
      }
      &::after {
        // content: '次数';
        // position: absolute;
        left: auto;
        right: 0;
      }
    }
  }
}
</style>

<template>
  <div class="LoadingVue">
    <nut-icon name="loading" />
    <span class="LoadingVue_text">努力加载中</span>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="scss">
.LoadingVue {
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);

  .nut-icon {
    line-height: 28px;
    vertical-align: middle;
  }

  .nut-icon + .LoadingVue_text {
    margin-left: 6px;
  }
}

// .LoadingVue_cont {
// }

.LoadingVue_text {
  line-height: 28px;
  display: inline-block;
  vertical-align: middle;
}
</style>

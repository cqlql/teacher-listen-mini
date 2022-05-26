<template>
  <div class="LoadingVue">
    <nut-icon name="loading" />
    <span class="LoadingVue_text">加载中</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoadingVue',
})
</script>
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
  background-color: rgba(0, 0, 0, 0.1);

  .nut-icon {
    line-height: 28px;
    vertical-align: middle;
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

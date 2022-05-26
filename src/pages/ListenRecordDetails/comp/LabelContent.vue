<script lang="ts" setup>
import TagView from '@/components/Tag/TagView.vue'
defineProps<{
  label: string
  type?: '' | 'warning' | 'cyan' | 'purple'
}>()
</script>
<template>
  <div class="LabelContent">
    <div class="l">
      <TagView :class="type">{{ label }}</TagView>
    </div>
    <div class="r">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.LabelContent {
  display: flex;

  & > .l {
    // width: 40px;
    margin-right: 8px;
  }
  & > .r {
    flex: 1;
    display: flex;
    align-items: center;
  }
}
</style>

<script lang="ts" setup>
defineProps<{
  icon: string
  type?: 'custom'
}>()
</script>
<template>
  <a class="IconLink">
    <template v-if="icon">
      <nut-icon
        v-if="type === 'custom'"
        font-class-name="iconfont"
        class-prefix="icon"
        :name="icon"
      />
      <nut-icon v-else :name="icon" />
    </template>
    <slot></slot>
  </a>
</template>

<style lang="scss">
.IconLink {
  display: inline-flex;
  align-items: center;
  & > .nut-icon {
    margin-right: 4px;
  }
}
</style>

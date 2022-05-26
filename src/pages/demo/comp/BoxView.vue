<script lang="ts" setup>
defineProps<{
  title?: string
}>()
</script>
<template>
  <div v-if="title" style="margin: 10px 0 6px">{{ title }}</div>
  <div class="BoxView"> <slot></slot> </div>
</template>

<style lang="scss">
.BoxView {
  padding: 10px;
  border: 1px solid rgb(235, 235, 235);
  margin-bottom: 10px;
}
</style>

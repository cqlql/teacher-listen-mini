<script lang="ts" setup>
import VideoView from './VideoView.vue'
const emit = defineEmits<{
  (e: 'delete', index: number): void
}>()

withDefaults(
  defineProps<{
    list: { url: string }[]
    deletable?: boolean
  }>(),
  {
    deletable: true,
  },
)

function onDelete(index: number) {
  emit('delete', index)
}
</script>
<template>
  <div class="VideoList">
    <VideoView
      v-for="({ url }, i) of list"
      :key="i"
      :index="i"
      :url="url"
      :deletable="deletable"
      @close="onDelete(i)"
    ></VideoView>
  </div>
</template>
<style lang="scss">
.VideoList {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>

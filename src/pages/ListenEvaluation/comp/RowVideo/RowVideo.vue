<script lang="ts" setup>
import TagView from '@/components/Tag/TagView.vue'
import useRecordItem from '../ProcessRecord/hooks/useRecordItem'
import type { PictureItem } from '../../types'
import VideoList from '@/components/VideoView/VideoList.vue'

const props = defineProps<{
  recordIndex: number
  index: number
}>()

const { recordItem, removeRecordItem } = useRecordItem<PictureItem>(props, {
  id: '',
  type: 'picture',
  files: [],
})

function onDelete(index: number) {
  let files = recordItem.value.files
  files.splice(index, 1)
  if (files.length === 0) {
    removeRecordItem()
  }
}
</script>
<template>
  <div class="row videoRow">
    <div class="l">
      <TagView class="purple">视频</TagView>
    </div>
    <div class="r">
      <VideoList :list="recordItem.files" @delete="onDelete"></VideoList>
    </div>
  </div>
</template>

<!-- <style lang="scss" scoped></style> -->

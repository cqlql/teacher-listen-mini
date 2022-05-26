<script lang="ts" setup>
import TagView from '@/components/Tag/TagView.vue'
import useRecordItem from '../ProcessRecord/hooks/useRecordItem'
import type { DrawingItem } from '../../types'
import ImgList from '@/components/ImgView/ImgList.vue'

const props = defineProps<{
  recordIndex: number
  index: number
}>()

const { recordItem, removeRecordItem } = useRecordItem<DrawingItem>(props, {
  id: '',
  type: 'drawing',
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
  <div class="row pictureRow wrote">
    <div class="l">
      <TagView>手写</TagView>
    </div>
    <div class="r">
      <ImgList :list="recordItem.files" @delete="onDelete"></ImgList>
    </div>
  </div>
</template>

<!-- <style lang="scss" scoped></style> -->

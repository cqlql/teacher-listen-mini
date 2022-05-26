<script lang="ts" setup>
import TagView from '@/components/Tag/TagView.vue'
import useRecordItem from '../ProcessRecord/hooks/useRecordItem'
import type { PictureItem } from '../../types'
import ImgList from '@/components/ImgView/ImgList.vue'

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
  <div class="row pictureRow">
    <div class="l">
      <TagView style="background-color: #01d3d5">照片</TagView>
    </div>
    <div class="r">
      <ImgList :list="recordItem.files" @delete="onDelete"></ImgList>
    </div>
  </div>
</template>

<!-- <style lang="scss" scoped></style> -->

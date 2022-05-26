<script lang="ts" setup>
import ImgView from '../ImgView/ImgView.vue'

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
  <div class="ImgList">
    <ImgView
      v-for="({ url }, i) of list"
      :key="i"
      :index="i"
      :url="url"
      :deletable="deletable"
      @close="onDelete(i)"
    ></ImgView>
  </div>
</template>

<style lang="scss">
.ImgList {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>

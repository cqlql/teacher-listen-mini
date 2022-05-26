<script lang="ts" setup>
import Taro from '@tarojs/taro'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const props = withDefaults(
  defineProps<{
    url: string
    deletable?: boolean
  }>(),
  {
    deletable: true,
  },
)

function onClose() {
  emit('close')
}

function preview() {
  Taro.previewMedia({
    sources: [
      {
        url: props.url,
      },
    ],
  })
}
</script>
<template>
  <div class="ImgView">
    <img @click="preview" :src="url" />
    <div v-if="deletable" class="close">
      <nut-icon name="close" @click="onClose"></nut-icon>
    </div>
  </div>
</template>

<style lang="scss">
.ImgView {
  width: 76px;
  height: 56px;
  background-color: #fff;
  color: #fff;
  position: relative;
  border-radius: 5px;
  // text-align: center;
  // display: flex;
  // align-items: center;
  // justify-content: center;

  .close {
    position: absolute;
    right: -3px;
    top: -3px;
    color: #fff;
    background-color: red;
    padding: 2px;
    border-radius: 100px;

    .nut-icon {
      display: block;
      font-size: 6px;
      width: 10px;
      height: 10px;
    }
  }
}
</style>

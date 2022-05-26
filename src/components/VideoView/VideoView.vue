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

function onClose(e) {
  e.stopPropagation()
  emit('close')
}

function preview() {
  Taro.previewMedia({
    sources: [
      {
        url: props.url,
        type: 'video',
      },
    ],
  })
}
</script>
<template>
  <div class="VideoView" @click="preview">
    <video :controls="false" :show-center-play-btn="false" :src="url"></video>
    <nut-icon class="i-play" name="play-start"></nut-icon>
    <!-- <div class="time">00:10</div> -->
    <div v-if="deletable" class="close">
      <nut-icon name="close" @click="onClose"></nut-icon>
    </div>
  </div>
</template>

<style lang="scss">
.VideoView {
  width: 76px;
  height: 56px;
  background-color: #000;
  color: #fff;
  position: relative;
  text-align: center;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  border-radius: 5px;

  video {
    width: 100%;
    height: 100%;
  }

  .i-play {
    font-size: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-shadow: 0 0 4px #333;
  }

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

  // .time {
  //   position: absolute;
  //   right: 4px;
  //   bottom: 0;
  //   font-size: 12px;
  // }
}
</style>

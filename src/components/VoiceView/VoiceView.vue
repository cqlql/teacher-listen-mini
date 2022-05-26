<template>
  <div class="voice-view">
    <div class="voice-view_icon" :class="className"></div>
    <span class="voice-view_text">6s</span>
  </div>
</template>

<script lang="ts" setup>
import Timer from '@/utils/timer/Timer'
import { ref } from 'vue'

let classNames: ['', 'two', 'three'] = ['', 'two', 'three']

const className = ref<'' | 'two' | 'three'>('three')

const timer = new Timer({ time: 600 })

let index = 2

timer.fn = function () {
  let i = index + 1
  if (i > 2) {
    i = 0
  }
  set(i)
}

function set(i: number) {
  index = i
  className.value = classNames[index]
}

// function start() {
//   set(0)
//   timer.start()
// }
// function stop() {
//   timer.stop()
//   set(2)
// }
</script>
<style lang="scss">
.voice-view {
  // width: 50px;
  padding: 0 10px;
  height: 38px;
  background-color: #e0e0e0;
  border-radius: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  // .nut-icon {
  //   // background-color: #c3c3c3;
  //   color: #fff;
  //   font-size: 50px;
  //   line-height: 50px;
  //   // display: inline-block;
  //   height: 50px;
  // }
}
$scale: 10.2;

.voice-view_icon {
  // display: inline-block;
  background: url('./voices.png') no-repeat (-414px / $scale) 0;
  background-size: auto 100%;
  width: (203px / $scale);
  height: (278px / $scale);

  &.two {
    background-position-x: (-207px / $scale);
  }

  &.three {
    background-position-x: 0;
  }
}

.voice-view_text {
  margin-left: 10px;
}
</style>

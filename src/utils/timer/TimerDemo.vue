<template>
  <div>
    {{ time }}

    <p>
      <button @click="start">开始</button>
      <button @click="stop">停止</button>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Timer from './Timer'
const timer = new Timer()

const time = ref('')

timer.fn = () => {
  time.value = new Date().toString()
}

timer.start()

function stop() {
  timer.stop()
}

function start() {
  timer.start()
}
</script>

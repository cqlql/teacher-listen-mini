<template>
  <div>
    <p>
      <input type="text" @input="onInput" />
    </p>

    <p v-for="v of values" :key="v">{{ v }}</p>
  </div>
</template>

<script>
import { throttleInit } from '../throttle'
import TimeRecord from './TimeRecord'
export default {
  name: 'ThrottleDemo',
  data() {
    return {
      timeRecord: new TimeRecord(),
      values: [],
      throttle: throttleInit(),
    }
  },
  methods: {
    onInput({ target }) {
      this.timeRecord.start()
      this.throttle(() => {
        this.value = target.value

        this.values.push(this.value + '-' + this.timeRecord.end())
      })
    },
  },
}
</script>

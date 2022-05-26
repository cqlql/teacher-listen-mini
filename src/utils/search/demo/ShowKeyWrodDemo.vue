<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="ShowKeyWrodDemo">
    <input type="text" v-model="keyword" />
    <div class="ShowKeyWrodDemo_result" v-html="result"> </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import showKeyWrod from '@/utils/search/show-key-word'

const keyword = ref('你 世')
const result = computed(() => {
  return showKeyWrod('你好，世界', keyword.value)
})
</script>
<style lang="scss" scoped>
.ShowKeyWrodDemo {
  padding: 10px;
}

.ShowKeyWrodDemo_result {
  padding: 10px 0;
}

.ShowKeyWrodDemo::v-deep b {
  background-color: yellow;
}
</style>

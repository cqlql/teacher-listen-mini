<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="SearchDemo">
    <input type="text" v-model="keyword" @input="onInput" />
    <ul>
      <li v-for="(content, key) of resultList" v-html="content" :key="key"></li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Search from '@/utils/search/search'
const s = new Search()
let contentData = [
  '朋友带我去看一位收藏家的收藏',
  '据说他收藏的都是顶级的东西',
  '随便拿一件来都是价逾千万。',
]

const keyword = ref('收')

const resultList = ref<string[] | null>([])

function onInput() {
  s.to(
    keyword.value,
    contentData,
    (result) => {
      resultList.value = result
    },
    300,
  )
}
onInput()
</script>
<style lang="scss" scoped>
.SearchDemo::v-deep b {
  background-color: yellow;
}
</style>

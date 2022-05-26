<template>
  <div class="SearchDemo">
    <input type="text" v-model="keyword" @input="onInput" />
    <ul class="SearchDemo_result">
      <li v-for="(cont, key) of resultList" :key="key">
        {{ cont }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import createSearchRegExp from '@/utils/search/create-search-regExp'

const keyword = ref('收')

let contentData = [
  '朋友带我去看一位收藏家的收藏',
  '据说他收藏的都是顶级的东西',
  '随便拿一件来都是价逾千万。',
]

let resultList = ref<string[]>([])

function onInput() {
  const reg = createSearchRegExp(keyword.value)
  resultList.value = contentData.filter((content) => {
    return reg.test(content)
  })
}
onInput()
</script>
<style lang="scss" scoped>
.SearchDemo {
  padding: 10px;
}

// .SearchDemo_result {
//   // padding: 10px 0;
// }
</style>

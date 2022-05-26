<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="UseSearchDemo">
    <input type="text" v-model="keyword" @input="search" />
    <ul v-if="resultList">
      <li v-for="(content, key) of resultList" v-html="content" :key="key"></li>
    </ul>
    <div v-else> 没有数据 </div>
  </div>
</template>

<script lang="ts" setup>
import useSearch from '@/utils/search/useSearch'

let searchList = [
  '朋友带我去看一位收藏家的收藏',
  '据说他收藏的都是顶级的东西',
  '随便拿一件来都是价逾千万。',
]

const { keyword, search, resultList } = useSearch(searchList)

search()
</script>
<style lang="scss" scoped>
.UseSearchDemo::v-deep b {
  background-color: yellow;
}
</style>

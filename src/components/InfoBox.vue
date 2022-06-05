<script lang="ts" setup>
import IconLink from './IconLink.vue'

withDefaults(
  defineProps<{
    title: string
    filesTitle?: string
    data: {
      label: string
      value: string
    }[]
    files?: { name: string }[]
  }>(),
  {
    files: () => [],
  },
)
</script>
<template>
  <div class="InfoBox">
    <div class="tit"> {{ title }} </div>
    <div class="ls">
      <div v-for="(item, i) of data" class="item" :key="i">
        <div class="lb">{{ item.label }}：</div>
        <div class="val">{{ item.value }}</div>
      </div>
      <!-- 附件 -->
      <div v-if="files.length" class="item">
        <div class="lb">{{ filesTitle }}：</div>
        <div class="childList">
          <div v-for="(file, index) of files" :key="index" class="childItem">
            <div>
              <IconLink icon="pdf" type="custom">{{ file.name }}</IconLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.InfoBox {
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
  .tit {
    font-size: 16px;
    color: #000;
    padding-bottom: 4px;
    font-weight: bold;
    // letter-spacing: 2px;
  }
  .ls {
    padding-left: 2px;
  }
  .item {
    display: flex;
    padding: 2px 0;
  }
  .lb {
    min-width: 70px;
    white-space: nowrap;
  }
  .val {
    flex: 1;
  }

  .childList {
    color: $primary-color;
  }
  .childItem + .childItem {
    padding-top: 2px;
  }
}
</style>

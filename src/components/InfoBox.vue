<script lang="ts" setup>
// import IconLink from './IconLink.vue'

defineProps<{
  title: string
  data: {
    label: string
    value: string
  }[]
}>()
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
      <!-- <div class="item">
        <div class="lb">名称：</div>
        <div class="childList">
          <div class="childItem">
            <IconLink icon="pdf" type="custom">xxx.pdf</IconLink>
          </div>
          <div class="childItem">
            <IconLink icon="pdf" type="custom">xxx.pdf</IconLink>
          </div>
        </div>
      </div> -->
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
    width: 70px;
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

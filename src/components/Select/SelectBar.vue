<template>
  <div class="SelectBar">
    <div class="cont">
      <slot v-if="$slots.default"></slot>
      <SelectValue v-else :value="name" :placeholder="placeholder"></SelectValue>
    </div>
    <div class="icon" @click="$emit('clickIcon')">
      <nut-icon :name="icon" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SelectValue from './SelectValue.vue'
withDefaults(
  defineProps<{
    icon?: string
    placeholder?: string
    name?: string
  }>(),
  {
    icon: 'right',
  },
)
defineEmits<{
  (e: 'clickIcon'): void
}>()
</script>
<style lang="scss">
.SelectBar {
  display: flex;
  // padding: 10px 0;
  // border-bottom: 1px solid #eee;

  // .start-icon {
  //   width: 30px;
  //   display: inline-flex;
  //   align-items: center;
  //   color: #8ab7fd;
  //   // border: 1px solid red;
  // }

  .cont {
    flex: 1;
    // border: 1px solid red;
  }

  .icon {
    width: 38px;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    color: #ccc;
    // border: 1px solid red;
  }
}

.SelectBar_placeholder {
  color: #777;
}
</style>

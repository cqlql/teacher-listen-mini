<script lang="ts" setup>
import ButtonVue from './ButtonVue.vue'

const props = defineProps<{
  isExpanded?: boolean
  style2?: boolean
}>()

const emits = defineEmits<{
  (e: 'update:isExpanded', isExpanded: boolean): void
}>()

function handleClick() {
  emits('update:isExpanded', !props.isExpanded)
}
</script>
<template>
  <ButtonVue class="ButtonSelect" :class="{ style2 }" @click="handleClick">
    <span><slot></slot></span>
    <nut-icon class="arrow" :class="{ expanded: isExpanded }" name="arrow-down" />
  </ButtonVue>
</template>

<style lang="scss">
.ButtonSelect {
  line-height: 1;
  height: 30px;
  border-radius: 50px;
  background-image: linear-gradient(-90deg, #3aa0ff 0%, #3bd8ff 100%),
    linear-gradient(#ffc600, #ffc600);
  box-shadow: 0 1px 4px 0 rgba(202, 142, 1, 0.2);
  color: #fff;
  font-size: 16px;

  &::after {
    display: none;
  }

  .arrow {
    transition: transform 0.3s;
    transform: rotate(0);
    font-size: 12px;
    margin-left: 2px;
  }

  .arrow.expanded {
    transform: rotate(180deg);
  }

  &.style2 {
    color: #000;
    background: transparent;
    box-shadow: none;
    .arrow {
      font-size: 10px;
    }
  }
}
</style>

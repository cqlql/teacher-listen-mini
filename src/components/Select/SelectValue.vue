<template>
  <div class="SelectValue">
    <slot v-if="$slots.default"></slot>
    <template v-else>
      <span v-if="value">
        {{ value }}
      </span>
      <span class="SelectValue_placeholder" v-else> {{ placeholder }} </span>
    </template>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  placeholder?: string
  value?: string
}>()

defineEmits<{
  (e: 'clickIcon'): void
}>()
</script>
<style lang="scss">
.SelectValue {
}

.SelectValue_placeholder {
  color: #777;
}
</style>

<script lang="ts" setup>
defineEmits<{
  (e: 'ok')
  (e: 'cancel')
}>()
</script>
<template>
  <div class="BottomOkButtons">
    <nut-button @click="$emit('cancel')">取消</nut-button>
    <nut-button @click="$emit('ok')" type="primary">确认</nut-button>
  </div>
</template>

<style lang="scss">
.BottomOkButtons {
  display: flex;
  justify-content: space-between;
  padding: 0 60px;
}
</style>
